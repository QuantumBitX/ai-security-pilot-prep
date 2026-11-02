/* 4.1 · Section 5: secure integration for tools, APIs and plugins (MCP, A2A) */
module.exports = {
  title: 'Secure integration for tools, APIs, MCP and A2A', covers: [5],
  blocks: [
    { type: 'video', title: 'Every tool is a door', kicker: 'Module 4.1 · Video 5 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.1 · Secure AI design', title: 'Every tool is a door', sub: 'Securing tools, APIs, plugins, MCP and agent-to-agent links', icon: 'plug',
        say: 'Tools are what turn a model into an agent, and every tool is a door into your systems. | This video covers how to integrate tools, APIs and plugins securely, including connections made through the Model Context Protocol and between agents.' },
      { t: 'flow', title: 'How MCP connects an assistant to tools',
        zones: [
          { id: 'zd', x: 60, y: 200, w: 420, h: 650, label: 'Your device or app', k: 'control' },
          { id: 'zt', x: 590, y: 200, w: 920, h: 650, label: 'Remote services', k: 'neutral' } ],
        nodes: [
          { id: 'host', x: 270, y: 365, icon: 'chat', label: 'AI application', sub: 'MCP host and clients', k: 'model', w: 300 },
          { id: 'local', x: 270, y: 700, icon: 'gear', label: 'Local MCP server', sub: 'files, commands', k: 'threat', w: 300 },
          { id: 'remote', x: 840, y: 365, icon: 'server', label: 'Remote MCP server', sub: 'tools over HTTPS', k: 'data', w: 300 },
          { id: 'auth', x: 840, y: 700, icon: 'key', label: 'Authorisation server', sub: 'scoped OAuth tokens', k: 'human', w: 320 },
          { id: 'api', x: 1310, y: 365, icon: 'database', label: 'Backend API', sub: 'data and actions', k: 'neutral', w: 280 } ],
        edges: [{ from: 'host', to: 'local', k: 'threat' }, { from: 'host', to: 'remote', k: 'data' }, { from: 'host', to: 'auth', k: 'human' }, { from: 'remote', to: 'api', k: 'neutral' }],
        steps: [
          { show: 'zd host', hi: 'host' },
          { show: 'local host-local', flow: 'host-local', hi: 'local', mark: { local: 'warn' } },
          { show: 'zt remote host-remote', flow: 'host-remote', hi: 'remote' },
          { show: 'auth host-auth', flow: 'host-auth', hi: 'auth', mark: { auth: 'key' } },
          { show: 'api remote-api', flow: 'remote-api', hi: 'api', mark: { api: 'lock' } } ],
        say: 'Here is how the Model Context Protocol fits together. An AI application acts as the MCP host, running clients that connect to servers. Each server offers tools, resources and prompts. | Local servers run on the same machine, often with access to files or commands. That is powerful, and dangerous if a server is malicious or manipulated. | Remote servers are reached over the network, and may be run by you or by a third party. | Remote servers should require OAuth access tokens, issued specifically for that server, carrying only the scopes the task needs. | And when the server calls a backend API, it uses its own credentials for that API. It must never simply pass the user’s token through.' },
      { t: 'bullets', title: 'Integration threats', layout: 'grid', cols: 2, items: [
          { icon: 'text', h: 'Tool poisoning', d: 'Hidden instructions in tool descriptions', k: 'threat' },
          { icon: 'cycle', h: 'Rug pulls', d: 'Definitions change after approval', k: 'human' },
          { icon: 'copy', h: 'Tool shadowing', d: 'One server steers another’s tools', k: 'model' },
          { icon: 'key', h: 'Token passthrough', d: 'Confused deputy, misused tokens', k: 'data' },
          { icon: 'unlock', h: 'Over-broad scopes', d: 'Read-write when read was enough', k: 'neutral' },
          { icon: 'doc', h: 'Injected tool results', d: 'Responses carrying instructions', k: 'control' } ],
        say: 'Tool integrations bring their own threats. | Tool poisoning: hidden instructions placed in a tool’s description, which users rarely see but the model reads. | Rug pulls: a tool definition that changes after it has been reviewed and approved. | Tool shadowing: a malicious server’s descriptions influencing how the model uses another server’s tools. | Token passthrough and confused deputies, where tokens are accepted or reused for services they weren’t issued for. | Over-broad scopes, such as read-write access when read-only would do. | And tool results that carry instructions, which is indirect prompt injection arriving through the tool channel.' },
      { t: 'bullets', title: 'Controls for tools and servers', layout: 'grid', cols: 2, items: [
          { icon: 'list', h: 'Allow-list servers', d: 'An internal registry of vetted ones', k: 'control' },
          { icon: 'hash', h: 'Pin tool definitions', d: 'Review them; alert on change', k: 'data' },
          { icon: 'key', h: 'Scoped tokens per server', d: 'Audience-bound; no passthrough', k: 'human' },
          { icon: 'box', h: 'Sandbox local servers', d: 'Containers, limited files, no egress', k: 'neutral' },
          { icon: 'check', h: 'Validate and approve calls', d: 'Schemas; humans for high impact', k: 'threat' },
          { icon: 'audit', h: 'Log every call', d: 'Who, which tool, which arguments', k: 'model' } ],
        say: 'The controls follow from the threats. | Allow-list approved servers through an internal registry, and block everything else. | Pin tool definitions after review, and alert on any change before it is used. | Issue scoped tokens for each server, bound to that server as their audience, and never pass tokens through. | Run local servers in sandboxes: containers with limited file access and no unnecessary network egress. | Validate every tool call’s arguments against a schema, and require human approval for high-impact actions. | And log every call: who requested it, which tool, which arguments, and what came back.' },
      { t: 'bullets', title: 'Agent-to-agent delegation', items: [
          { icon: 'id', h: 'Verify agent identity', d: 'Trusted registries, mutual authentication', k: 'control' },
          { icon: 'key', h: 'Delegate least privilege', d: 'Task-scoped, short-lived tokens', k: 'human' },
          { icon: 'stop', h: 'Don’t forward user credentials', d: 'Each hop gets its own grant', k: 'threat' },
          { icon: 'doc', h: 'Treat results as untrusted', d: 'Validate before acting', k: 'data' },
          { icon: 'branch', h: 'Limit chains and trace them', d: 'Depth limits, correlation IDs', k: 'neutral' } ],
        say: 'Agents increasingly delegate work to other agents, for example through the Agent-to-Agent protocol, where agents advertise their capabilities in agent cards. | Verify who you are talking to, using trusted registries and mutual authentication, rather than trusting any agent card you find. | Delegate least privilege: task-scoped, short-lived tokens. | Don’t forward user credentials down a chain of agents; each hop should get its own limited grant. | Treat another agent’s results as untrusted input, and validate them before acting. | And limit how long delegation chains can grow, tracing each request end to end with correlation identifiers.' },
      { t: 'summary', items: ['Every tool, server and agent link extends the attack surface', 'Allow-list servers; pin and review tool definitions', 'Scoped, audience-bound tokens; no passthrough or forwarding', 'Validate calls and results; approve high-impact actions; log everything'],
        say: 'To recap. | Every tool, server and agent connection extends the attack surface. | Allow-list servers, and pin and review tool definitions. | Use scoped, audience-bound tokens, and never pass tokens through or forward user credentials. | And validate tool calls and results, require approval for high-impact actions, and log everything.' } ] },
    { type: 'text', md: `### The Model Context Protocol
MCP, introduced by Anthropic in late 2024 and now widely adopted, standardises how AI applications (**hosts**) use **clients** to connect to **servers** that expose **tools** (actions), **resources** (data) and **prompts** (templates). Servers run locally, typically communicating over standard input and output, or remotely over HTTP.

**Authorisation:** for remote servers, the specification builds on OAuth 2.1. The MCP server acts as an OAuth resource server and must accept only tokens issued for it. **Token passthrough**, where a server accepts a client’s token and forwards it to a downstream API, is explicitly forbidden, because it breaks audit trails and lets tokens be used beyond their intended audience. The specification’s security guidance also describes **confused deputy** risks in proxy servers that use static client credentials.

### Threats to tool integrations
| Threat | What happens | Controls |
|---|---|---|
| **Tool poisoning** | Instructions hidden in a tool’s description or metadata steer the model, such as reading files or sending data elsewhere (demonstrated by security researchers in 2025) | Vet servers; review full tool definitions, not just names; prefer servers from trusted publishers |
| **Rug pull** | A previously approved tool changes its definition or behaviour | Pin definitions by hash; alert on and re-review changes |
| **Tool shadowing** | One server’s descriptions alter how the model uses another server’s tools | Isolate high-risk tools in separate sessions; limit how many servers are active together |
| **Token passthrough and confused deputy** | Tokens accepted or reused for the wrong audience; a server acts with more authority than the requester | Audience-bound tokens; per-client consent; delegated access |
| **Excessive agency** | Tools with more permissions or autonomy than needed (OWASP LLM06:2025) | Least privilege, read-only by default, approvals, rate limits (Module 4.6) |
| **Indirect prompt injection via results** | Tool outputs, web pages or emails carry instructions | Treat results as data; restrict what results can trigger; output validation |
| **Malicious or vulnerable servers** | Typosquatted packages, compromised updates, servers with command injection flaws | Allow-lists, an internal registry, pinned versions, scanning, sandboxing (Module 3.7) |

### Agent-to-agent connections
The **Agent2Agent (A2A)** protocol, introduced by Google in 2025 and now hosted by the Linux Foundation, lets agents discover one another through **agent cards** (descriptions of an agent’s capabilities, endpoint and authentication requirements) and delegate **tasks**. Risks include impersonated agents, poisoned agent cards, task messages carrying injected instructions, over-delegation, and trust that silently extends along chains of agents. Controls: trusted registries, mutual authentication, scoped and short-lived delegation, no credential forwarding, validation of results, delegation depth limits, and end-to-end tracing. Module 4.5 covers machine-to-machine authentication, and Module 4.6 covers authorisation and over-delegation.

### Tools are APIs
Every tool ultimately calls an API, so standard API security still applies: strong authentication, **object-level authorisation** (the most common API weakness in the OWASP API Security Top 10), input validation, rate limiting, and avoiding excessive data in responses. An AI caller makes these weaknesses easier to find and exploit at speed.

### A secure integration checklist
1. Register each tool and server with an owner, purpose, data access and risk rating.
2. Review its full definition and code or publisher, then pin the reviewed version.
3. Grant the minimum scopes, using delegated, audience-bound tokens.
4. Sandbox local servers and restrict network egress.
5. Validate call arguments and results; require approval for irreversible or high-impact actions.
6. Log all calls with correlation identifiers, and monitor for anomalies (Module 5.3).
7. Re-review on any change of definition, version, publisher or scope.` },
    { type: 'callout', kind: 'exam', title: 'Tool integration questions', md: `The strongest answers limit **what a tool can do** (least privilege, scoped tokens, approvals, sandboxing) and **which tools exist** (allow-lists, pinned definitions), rather than relying on the model to use tools wisely. Treat every tool description and tool result as potentially hostile input.` },
    { type: 'match', title: 'Match the control to the threat', pairs: [
      ['Tool poisoning', 'Review full tool definitions before approval'],
      ['Rug pull', 'Pin definitions and alert on any change'],
      ['Token passthrough', 'Audience-bound tokens for each server'],
      ['Malicious local server', 'A sandbox with no unnecessary network egress'],
      ['Injected tool results', 'Treat results as data and validate them'] ] },
    { type: 'check', q: { q: 'An organisation lets staff connect any MCP server from the internet to their AI desktop assistant. Which control BEST reduces the risk?', o: ['A system prompt telling the assistant to ignore any suspicious instructions found in tools', 'An allow-list of vetted servers, with pinned, reviewed tool definitions and least-privilege scopes', 'A rule that staff may connect only servers with large numbers of stars or downloads on code-hosting sites', 'Quarterly awareness training explaining the risks of connecting unknown MCP servers'], a: 1, b: 5,
      why: 'Allow-listing vetted servers, pinning reviewed definitions and limiting scopes directly controls which tools exist and what they can do. Prompt instructions can be overridden by poisoned descriptions, popularity isn’t vetting, and training alone doesn’t prevent a risky connection.' } }
  ]
};
