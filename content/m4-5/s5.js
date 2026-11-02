/* 4.5 · Section 5: secrets and key management for AI platforms */
module.exports = {
  title: 'Secrets and key management for AI platforms', covers: [5],
  blocks: [
    { type: 'video', title: 'Keeping secrets out of the conversation', kicker: 'Module 4.5 · Video 5 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.5 · Identity and authentication', title: 'Keeping secrets out of the conversation', sub: 'Secrets and key management for AI platforms', icon: 'lock',
        say: 'AI platforms run on secrets: model provider keys, database credentials, signing keys and tool tokens. They also create new places for secrets to leak, such as prompts, notebooks, agent configurations and logs. | This video covers secrets and key management for AI platforms.' },
      { t: 'bullets', title: 'Where AI secrets leak', layout: 'grid', cols: 2, items: [
          { icon: 'text', h: 'Prompts and system prompts', d: 'Models can be talked into revealing them', k: 'threat' },
          { icon: 'code', h: 'Notebooks and experiments', d: 'Keys pasted into cells and outputs', k: 'data' },
          { icon: 'gear', h: 'Agent and MCP configs', d: 'Tokens in plain text files', k: 'neutral' },
          { icon: 'database', h: 'Training data', d: 'Memorised, then regurgitated', k: 'model' },
          { icon: 'list', h: 'Logs and traces', d: 'Prompt logs capture credentials', k: 'human' },
          { icon: 'phone', h: 'Client apps', d: 'Keys shipped to every user', k: 'control' } ],
        say: 'AI platforms leak secrets in new places. | In prompts and system prompts, where a model can often be talked into repeating them. | In notebooks and experiment tracking, where keys get pasted into cells and saved in outputs. | In agent and MCP configuration files, which often hold tokens in plain text. | In training data: secrets in scraped code or documents can be memorised by a model and reproduced later. | In logs and traces, because prompt logging captures whatever users paste. | And in client apps, where a model API key embedded in a mobile app is effectively given to every user.' },
      { t: 'layers', title: 'A secrets architecture for AI',
        layers: [
          { icon: 'lock', label: 'Central vault, backed by hardware', sub: 'One governed home for every secret', k: 'control' },
          { icon: 'id', label: 'Workload identity to reach it', sub: 'No secret needed to get the secrets', k: 'data' },
          { icon: 'server', label: 'Runtime, server-side injection', sub: 'Never in images, code or prompts', k: 'neutral' },
          { icon: 'tool', label: 'Brokered access for agents', sub: 'The model never sees the credential', k: 'model' },
          { icon: 'clock', label: 'Short-lived, dynamic secrets', sub: 'Issued per task or session', k: 'human' },
          { icon: 'search', label: 'Scanning and monitoring', sub: 'Find leaks fast; watch usage', k: 'threat' } ],
        say: 'A sound secrets architecture for AI has six layers. | A central vault, backed by hardware security modules, as the one governed home for every secret. | Workloads reach the vault using workload identity, so no secret is needed to fetch the secrets. | Secrets are injected at runtime, on the server side, and never baked into images, code or prompts. | Agents get brokered access: a tool gateway attaches the credential to the outgoing call, so the model never sees it. | Secrets are short-lived and, where possible, generated dynamically for each task or session. | And everything is scanned and monitored, so leaks are found quickly and unusual use is spotted.' },
      { t: 'flow', title: 'Brokered credentials for agents',
        nodes: [
          { id: 'ag', x: 230, y: 330, icon: 'robot', label: 'Agent', sub: 'asks for an action', k: 'model', w: 260 },
          { id: 'gw', x: 690, y: 330, icon: 'filter', label: 'Tool gateway', sub: 'checks policy', k: 'control', w: 280 },
          { id: 'v', x: 1160, y: 330, icon: 'lock', label: 'Vault', sub: 'short-lived credential', k: 'data', w: 280 },
          { id: 'api', x: 1160, y: 690, icon: 'globe', label: 'External API', sub: 'called by the gateway', k: 'neutral', w: 290 },
          { id: 'res', x: 690, y: 690, icon: 'chat', label: 'Result only', sub: 'no secret returned', k: 'human', w: 280 } ],
        edges: [{ from: 'ag', to: 'gw', k: 'model' }, { from: 'gw', to: 'v', k: 'control' }, { from: 'v', to: 'api', k: 'data' }, { from: 'api', to: 'res', k: 'neutral' }],
        steps: [
          { show: 'ag', hi: 'ag' },
          { show: 'gw ag-gw', flow: 'ag-gw', hi: 'gw' },
          { show: 'v gw-v', flow: 'gw-v', hi: 'v', mark: { v: 'lock' } },
          { show: 'api v-api', flow: 'v-api', hi: 'api' },
          { show: 'res api-res', flow: 'api-res', hi: 'res', mark: { res: 'ok' } } ],
        say: 'Here is credential brokering in action. The agent decides it needs to call an external service, and asks for the action through a tool call. | A tool gateway checks the request against policy: is this agent allowed this action, with these arguments, right now? | If so, the gateway obtains a short-lived credential from the vault. | The gateway, not the agent, makes the call to the external API with that credential. | And only the result goes back to the agent. The secret never enters the model’s context, so no prompt injection can make the model reveal it.' },
      { t: 'bullets', title: 'When an AI key leaks', items: [
          { icon: 'stop', h: 'Revoke and replace now', d: 'Before investigating', k: 'threat' },
          { icon: 'chart', h: 'Review usage and cost', d: 'What was called, what was read', k: 'data' },
          { icon: 'search', h: 'Find the source', d: 'Repos, prompts, logs, apps', k: 'neutral' },
          { icon: 'trash', h: 'Purge copies', d: 'History, logs, datasets', k: 'human' },
          { icon: 'shield', h: 'Prevent a repeat', d: 'Scanning, brokering, short lifetimes', k: 'control' } ],
        say: 'When a model API key or other AI credential leaks, act in order. | Revoke it and issue a replacement immediately, before investigating, because automated scanners find exposed keys within minutes. | Review usage and cost: what was called, what data was read, and how much was spent. | Find the source: a repository, a prompt, a log, a notebook or an app. | Purge the copies from history, logs and any datasets that might be used for training. | And prevent a repeat with secret scanning, credential brokering and short-lived credentials.' },
      { t: 'summary', items: ['AI adds leak paths: prompts, notebooks, configs, training data, logs, apps', 'Vault plus workload identity; inject at runtime, server-side', 'Broker credentials so models never see them', 'Short-lived secrets, scanning, monitoring and a fast revoke playbook'],
        say: 'To recap. | AI platforms add new leak paths: prompts, notebooks, agent configurations, training data, logs and client apps. | Keep secrets in a hardware-backed vault, reach it with workload identity, and inject secrets at runtime on the server side. | Broker credentials for agents, so models never see them. | And use short-lived secrets, continuous scanning and monitoring, and a tested playbook for revoking leaked keys.' } ] },
    { type: 'text', md: `### Secrets in AI platforms
| Secret | Examples | Key practices |
|---|---|---|
| **Model provider keys** | Keys for hosted LLM APIs | Server-side only; per app and environment; spend limits; usage alerts |
| **Cloud and data credentials** | Storage, warehouse, vector database access | Workload identity; dynamic, short-lived database credentials |
| **Tool and connector tokens** | MCP servers, SaaS APIs, webhooks | Brokered through a gateway; scoped OAuth tokens; never in tool descriptions |
| **Signing keys** | Model signing (Module 3.6), container signing, request signing | HSM or KMS; separation of duties; keyless signing where suitable |
| **Encryption keys** | Data and weight encryption (Module 3.4) | KMS or HSM; customer-managed keys; rotation and destruction |
| **Watermark and fingerprint keys** | Ownership verification (Module 3.6) | Restricted access; trusted verification only |

### Principles
- **Eliminate first:** replace static secrets with workload identity and federation wherever possible (Section 3).
- **Centralise:** one vault or KMS, with access policies, audit logs and hardware protection for high-value keys (Module 3.4 covers the key lifecycle).
- **Never put secrets in prompts or model context.** System prompts can leak (OWASP LLM07), and anything in the context can be repeated by the model.
- **Broker credentials for agents:** the tool layer attaches credentials to outbound calls; the model only sees results.
- **Keep secrets server-side:** client apps go through your backend or AI gateway.
- **Short-lived and dynamic:** issue credentials per task or session, and revoke them when it ends.
- **Scan everywhere:** pre-commit hooks and push protection; CI pipelines; notebooks and experiment trackers; prompt and trace logs; and **datasets before training**. In 2025, researchers at Truffle Security reported finding nearly 12,000 live API keys and passwords in a single snapshot of Common Crawl, a web dataset widely used for training language models.
- **Monitor:** provider usage dashboards, spend alerts and anomaly detection on credential use.
- **Rehearse revocation:** a tested playbook to revoke and replace any secret quickly, including those embedded in partners’ systems.

### Common anti-patterns
- An agent configuration file with a provider key in plain text, committed to a repository.
- A "temporary" key in a notebook that ends up in a shared experiment log.
- A system prompt containing a database connection string "so the model can query it".
- The same model API key used by every team, with no way to attribute or limit use.` },
    { type: 'callout', kind: 'exam', title: 'Secrets questions', md: `If a secret appears in a **prompt, a client app, a notebook or a repository**, the best answer moves it **server-side into a vault**, ideally replaced by **workload identity** or **brokered** short-lived credentials. After a leak, **revoke first**, then investigate.` },
    { type: 'check', q: { q: 'A developer gives an agent a database password by including it in the agent’s system prompt, so it can run queries. What is the BEST alternative?', o: ['Encode the password in base64 inside the prompt, so the model can’t read it directly', 'Have a tool gateway run the queries with vault-issued credentials the model never sees', 'Tell the model in the prompt never to reveal the password to any user, under any circumstances', 'Use a longer, more complex password, so that it is much harder for attackers to guess'], a: 1, b: 5,
      why: 'Brokering keeps credentials out of the model’s context, so no injection or leak of the prompt can expose them, and the gateway can enforce policy on each query. Encoding isn’t protection, prompt instructions can be overridden, and password strength doesn’t help once it is disclosed.' } }
  ]
};
