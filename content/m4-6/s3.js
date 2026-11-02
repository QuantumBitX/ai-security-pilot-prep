/* 4.6 · Section 3: execution boundaries and API scope limitations */
module.exports = {
  title: 'Execution boundaries and API scope limitations', covers: [3],
  blocks: [
    { type: 'video', title: 'Drawing the edges', kicker: 'Module 4.6 · Video 3 of 4', scenes: [
      { t: 'title', kicker: 'Module 4.6 · Authorisation', title: 'Drawing the edges', sub: 'Execution boundaries and API scope limitations', icon: 'ruler',
        say: 'An agent’s real power isn’t what its prompt says. It is what its code can execute, and what its credentials can reach. | This video covers execution boundaries and API scope limitations: the walls and fences that contain what AI components can do.' },
      { t: 'layers', title: 'Boundaries around an agent',
        layers: [
          { icon: 'list', label: 'Tool allow-list', sub: 'Only registered, reviewed tools exist', k: 'control' },
          { icon: 'ruler', label: 'Argument constraints', sub: 'Schemas, value limits, allowed targets', k: 'data' },
          { icon: 'box', label: 'Sandboxed execution', sub: 'Isolated, ephemeral, no secrets', k: 'model' },
          { icon: 'globe', label: 'Network egress control', sub: 'Allow-listed destinations only', k: 'neutral' },
          { icon: 'database', label: 'Data boundaries', sub: 'Tenant, row and purpose limits', k: 'human' },
          { icon: 'clock', label: 'Resource limits', sub: 'CPU, memory, time and cost caps', k: 'threat' } ],
        say: 'Execution boundaries work in layers. | A tool allow-list: only registered, reviewed tools exist for the agent at all. | Argument constraints: schemas, value limits and allowed targets for every call. | Sandboxed execution for any code the agent writes or runs: isolated, ephemeral, and with no secrets inside. | Network egress control, so the agent and its sandbox can reach only allow-listed destinations. | Data boundaries by tenant, row and purpose. | And resource limits on CPU, memory, time and cost, so a runaway task can’t consume everything.' },
      { t: 'compare', title: 'Broad and scoped tokens', labels: ['Actions', 'Resources', 'Lifetime', 'If misused'],
        cols: [{ h: 'Broad token', icon: 'unlock', k: 'threat' }, { h: 'Scoped token', icon: 'lock', k: 'control' }],
        rows: [
          ['Read, write and delete all', 'Specific actions only'],
          ['Every mailbox and file', 'One mailbox, one folder'],
          ['Months', 'The length of the task'],
          ['Organisation-wide breach', 'Small, contained impact'] ],
        say: 'The scope of a token sets the blast radius of a mistake. | A broad token can read, write and delete everything. A scoped token allows specific actions only. | A broad token covers every mailbox and file. A scoped token covers, say, one mailbox and one folder. | A broad token lasts for months. A scoped token lasts only as long as the task. | So if a broad token is misused by a manipulated agent, the result can be an organisation-wide breach. With a scoped token, the impact is small and contained.' },
      { t: 'bullets', title: 'Designing scopes for agents', layout: 'grid', cols: 2, items: [
          { icon: 'split', h: 'By action', d: 'Read, write and delete separately', k: 'data' },
          { icon: 'target', h: 'By resource', d: 'Tenant, folder or record', k: 'model' },
          { icon: 'money', h: 'By amount', d: 'Value and volume caps', k: 'human' },
          { icon: 'clock', h: 'By time', d: 'Expires with the task', k: 'neutral' },
          { icon: 'plug', h: 'By audience', d: 'Valid for one API only', k: 'control' },
          { icon: 'stop', h: 'Deny by default', d: 'Anything not granted is refused', k: 'threat' } ],
        say: 'Design scopes along six dimensions. | By action: separate read, write and delete rights. | By resource: a specific tenant, folder or record, not everything. | By amount: caps on payment values, record counts and message volumes. | By time: tokens that expire when the task ends. | By audience: tokens valid for one API only. | And deny by default, so anything not explicitly granted is refused.' },
      { t: 'summary', items: ['Real power = what code can run and credentials can reach', 'Allow-list tools; constrain arguments; sandbox code', 'Control egress, data boundaries and resource use', 'Scope tokens by action, resource, amount, time and audience'],
        say: 'To recap. | An agent’s real power is what its code can run and its credentials can reach, not what its prompt says. | Allow-list tools, constrain their arguments, and sandbox any code execution. | Control network egress, data boundaries and resource use. | And scope every token by action, resource, amount, time and audience, denying everything else.' } ] },
    { type: 'text', md: `### Execution boundaries
| Boundary | Examples |
|---|---|
| **Tool allow-list** | Agents see only registered, reviewed tools; MCP servers approved through an internal registry (Module 4.1) |
| **Argument constraints** | JSON schemas; allowed values and ranges; payee and domain allow-lists; maximum record counts |
| **Sandboxed code execution** | Code interpreters in containers or microVMs with no secrets, no access to internal networks, read-only base images and teardown after each task (Module 4.2) |
| **Browser and computer-use agents** | Isolated browser profiles, domain allow-lists, no saved passwords or payment details, human confirmation for purchases and submissions |
| **Network egress** | Deny by default; allow-listed destinations; proxies that log and inspect outbound calls |
| **File system** | Access only to a task workspace, never to home directories, credentials or system files |
| **Data and tenancy** | Per-tenant indexes or namespaces in vector databases; row-level security; purpose checks |
| **Resources** | Quotas on CPU, GPU, memory, run time, tokens and spend (Module 3.6) |
| **Cloud guardrails** | Permission boundaries and organisation-level policies that cap what any role, including agent roles, can ever be granted |

### API scope limitations
- **OAuth scopes:** request the narrowest scopes; prefer separate read and write scopes; avoid catch-all scopes such as full mailbox or full drive access.
- **Audience restriction:** resource indicators (RFC 8707) bind a token to one API, so it can’t be replayed elsewhere.
- **Fine-grained, transaction-level authorisation:** Rich Authorization Requests (RFC 9396) let a token describe a specific action, such as one payment of a stated amount to a stated payee, which suits agents acting on single tasks.
- **Server-side limits:** the API, not the agent, enforces value caps, rate limits and allowed operations.
- **Consent screens:** show users exactly what an agent will be allowed to do, in plain language.

### Common boundary failures
- A code-interpreter sandbox that can reach the cloud metadata service or internal APIs.
- A "read-only" agent whose token also includes write scopes because they were bundled.
- A browser agent logged in to an administrator’s session.
- A tool that accepts any URL, allowing server-side request forgery into internal systems.` },
    { type: 'scenario', title: 'The helpful code interpreter', md: `A data analysis assistant writes and runs Python in a container to answer questions about uploaded spreadsheets. During a test, a spreadsheet contains hidden instructions, and the generated code reads environment variables and sends them to an external address. The container holds the assistant’s cloud credentials and has unrestricted internet access.`,
      q: { q: 'Which change MOST directly removes the impact of this attack?', o: ['Add instructions to the system prompt telling the assistant never to read environment variables', 'Run the code in an ephemeral sandbox with no credentials and no outbound network access', 'Scan every uploaded spreadsheet with antivirus software before the assistant opens it', 'Limit the assistant to answering questions about spreadsheets smaller than one megabyte'], a: 1, b: 3,
        why: 'With no secrets inside and no egress, injected code has nothing to steal and nowhere to send it. Prompt instructions can be overridden, antivirus doesn’t detect natural-language instructions, and file size has nothing to do with the attack.' } },
    { type: 'callout', kind: 'exam', title: 'Boundary questions', md: `When an agent or code interpreter is tricked, ask **what it could reach**. The best answers shrink that reach: **sandbox without secrets**, **deny-by-default egress**, **narrow scopes** and **server-side limits**, rather than relying on the model to refuse.` },
    { type: 'check', q: { q: 'An email assistant needs to draft replies for a user to review. Its OAuth token currently grants full read, send and delete access to every mailbox in the organisation. What is the BEST scope?', o: ['Keep full access, because broad scopes avoid errors when the assistant needs something new', 'Read access and draft creation for that user’s mailbox only, with sending left to the user', 'Full access to the user’s own mailbox, including the rights to send and delete messages', 'Read-only access to every mailbox, so it can find related conversations across the company'], a: 1, b: 3,
      why: 'The task needs reading and drafting in one mailbox, so the token should allow exactly that, with the human sending. Other scopes add send, delete or organisation-wide reach the task doesn’t need.' } }
  ]
};
