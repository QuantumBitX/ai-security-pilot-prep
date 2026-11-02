/* 1.2 · Section 7: agents and agentic AI */
module.exports = {
  title: 'Autonomous systems, agents and agentic AI', covers: [5],
  blocks: [
    { type: 'video', title: 'From chatbots to agents', kicker: 'Module 1.2 · Video 7 of 7', scenes: [
      { t: 'title', kicker: 'Module 1.2 · Generative AI', title: 'From chatbots to agents', sub: 'Planning, tools, memory, and agents working with other agents', icon: 'robot',
        say: 'A chatbot answers. An agent acts. | This video explains how AI agents plan and use tools, how they remember, how they work with other agents, and why every new capability is also new attack surface.' },
      { t: 'cycle', title: 'The agent loop', center: 'Agent loop', centerSub: 'repeats until the goal is met', intro: 'An agent pursues a goal over many steps, choosing its own actions along the way.',
        stages: [
          { icon: 'target', label: 'Take a goal', d: 'A task from a person or another system, plus its context.' },
          { icon: 'list', label: 'Plan', d: 'The model breaks the goal into steps and picks the next one.' },
          { icon: 'tool', label: 'Act', d: 'It calls a tool: an API, a search, code, a file or a browser.' },
          { icon: 'eye', label: 'Observe', d: 'The tool’s result comes back into its context.' },
          { icon: 'memory', label: 'Remember', d: 'Useful results are kept for later steps or sessions.' } ],
        say: 'Every agent runs the same basic loop. | It takes a goal, from a person or another system. | It plans, breaking the goal into steps and choosing the next one. | It acts, by calling a tool: an API, a search, some code, a file or a web browser. | It observes the result, which flows back into its context. | And it remembers what is useful, for later steps or later sessions. | Then the loop repeats until the goal is met, or a limit is reached. The model decides each step itself. That autonomy is the whole point, and the whole risk.' },
      { t: 'flow', title: 'Anatomy of an agent system',
        nodes: [
          { id: 'user', x: 180, y: 470, icon: 'user', label: 'User', k: 'human', w: 220 },
          { id: 'agent', x: 560, y: 470, icon: 'robot', label: 'Agent', sub: 'model plus orchestration', k: 'model', w: 280 },
          { id: 'gate', x: 1020, y: 300, icon: 'shieldcheck', label: 'Policy gate', sub: 'checks each tool call', k: 'control', w: 270 },
          { id: 'tools', x: 1385, y: 300, icon: 'tool', label: 'Tools', sub: 'APIs, code, browser, files', k: 'neutral', w: 250 },
          { id: 'mem', x: 560, y: 760, icon: 'memory', label: 'Memory', sub: 'session and long-term', k: 'data', w: 260 },
          { id: 'peer', x: 1250, y: 650, icon: 'network', label: 'Other agents', sub: 'agent-to-agent', k: 'model', w: 270 } ],
        edges: [{ from: 'user', to: 'agent', k: 'human' }, { from: 'agent', to: 'gate', label: 'tool call', k: 'model', ly: -34 }, { from: 'gate', to: 'tools', k: 'control' }, { from: 'agent', to: 'mem', k: 'data', both: true }, { from: 'agent', to: 'peer', label: 'delegate', k: 'model', both: true }],
        steps: [
          { show: 'user agent user-agent', flow: 'user-agent' },
          { show: 'gate tools agent-gate gate-tools', flow: 'agent-gate gate-tools', hi: 'gate' },
          { show: 'mem agent-mem', flow: 'agent-mem', hi: 'mem' },
          { show: 'peer agent-peer', flow: 'agent-peer', hi: 'peer' },
          { hi: 'gate', note: { x: 1010, y: 160, w: 460, text: 'High-impact actions wait for a person to approve', k: 'human' } },
          { flow: 'user-agent agent-gate gate-tools agent-mem agent-peer' } ],
        say: 'Here is a typical agent system. A user gives the agent a goal. The agent is a language model wrapped in orchestration code that runs the loop. | When the model decides to use a tool, it emits a structured tool call. In a well-designed system, a policy gate checks every call against what this agent, for this user, is allowed to do, before the tool runs. | The agent reads from and writes to memory, both for the current session and over the longer term. | It may delegate work to other agents, which have their own tools and permissions. | For high-impact actions, such as payments, deletions or messages sent externally, the gate can pause and wait for a person to approve. | Every arrow here crosses a trust boundary, and every one needs identity, authorisation and logging.' },
      { t: 'compare', title: 'How agents remember', cols: [{ h: 'Short-term', icon: 'chat', k: 'neutral' }, { h: 'Long-term', icon: 'database', k: 'data' }, { h: 'Shared', icon: 'network', k: 'model' }],
        labels: ['Where', 'Lifetime', 'Risk'], rows: [
          ['The context window, this session', 'A database or vector store', 'A store several agents use'],
          ['Until the session ends or is trimmed', 'Persists across sessions', 'Persists and spreads between agents'],
          ['Overflow can drop instructions', 'Poisoned memories keep coming back', 'One compromised agent misleads the rest'] ],
        say: 'Memory is what lets an agent work across many steps, and it comes in three forms. | Short-term memory is the context window for the current session. Long-term memory lives in a database or vector store. Shared memory is a store that several agents read and write. | Short-term memory lasts until the session ends or is trimmed. Long-term memory persists across sessions. Shared memory persists and spreads between agents. | Each has a characteristic risk. Overflow can push instructions out of short-term memory. A poisoned long-term memory keeps influencing future sessions. And in shared memory, one compromised agent can mislead all the others.' },
      { t: 'bullets', title: 'How agents connect', items: [
          { icon: 'plug', h: 'Tool calling', d: 'The model emits a structured request; your code executes it' },
          { icon: 'link', h: 'Model Context Protocol (MCP)', d: 'An open standard for connecting AI apps to tools and data' },
          { icon: 'network', h: 'Agent-to-agent (A2A)', d: 'A protocol for agents to discover and delegate to each other' },
          { icon: 'key', h: 'Session persistence', d: 'State, memory and credentials carried across turns' } ],
        say: 'Agents connect to the world in four ways. | Through tool calling, the model emits a structured request, and your code decides whether, and how, to execute it. The model never runs the tool itself. | The Model Context Protocol, or MCP, is an open standard for connecting AI applications to tools and data sources through MCP servers. | Agent-to-agent protocols, such as A2A, let agents discover one another’s capabilities and delegate tasks between them. | And session persistence carries state, memory and credentials across turns and sessions, so a task can resume where it left off. Each of these is covered from a security angle in Domain 4.' },
      { t: 'bullets', title: 'Levels of autonomy', items: [
          { icon: 'bulb', h: 'Suggests', d: 'The agent proposes; a person decides and acts', k: 'control' },
          { icon: 'hitl', h: 'Acts with approval', d: 'Each consequential action waits for a person', k: 'control' },
          { icon: 'eye', h: 'Acts within limits', d: 'Works alone inside boundaries; people monitor', k: 'human' },
          { icon: 'robot', h: 'Fully autonomous', d: 'No routine human involvement', k: 'threat' } ],
        say: 'Autonomy is a dial, not a switch. | At the lowest level, the agent only suggests, and a person decides and acts. | Next, it acts, but each consequential action waits for a person’s approval. This is human in the loop. | Then it acts on its own within set boundaries, while people monitor and can intervene. This is human on the loop. | At the top, it runs with no routine human involvement. The higher the autonomy, the stronger the boundaries, monitoring and kill switches it needs.' },
      { t: 'shield', title: 'Containing an agent', target: 'Systems and data the agent can reach', targetIcon: 'database',
        layers: ['Least-privilege tools and credentials', 'Approval for high-impact actions', 'Sandboxed execution', 'Monitoring, budgets and a kill switch'],
        attacks: [{ t: 'Over-broad permissions', stop: 0 }, { t: 'Unapproved payment', stop: 1 }, { t: 'Harmful generated code', stop: 2 }, { t: 'Runaway loop', stop: 3 }],
        say: 'Containing an agent takes layers, because its model can be manipulated or simply wrong. | Give each agent only the tools and credentials its task needs, so a hijacked agent has little it can reach. | Require approval for high-impact actions, so a manipulated decision to make a payment stops at a person. | Run any code the agent writes inside a sandbox, isolated from the systems around it. | And monitor everything, with budgets, step limits and a kill switch, so a runaway loop is stopped before it does damage.' },
      { t: 'summary', items: [
          'Agents loop: goal, plan, act with tools, observe, remember',
          'Memory is short-term, long-term or shared, and each can be poisoned',
          'MCP connects tools and data; A2A connects agents to agents',
          'Least privilege, approvals, sandboxes and monitoring contain agents' ],
        say: 'To recap. | Agents loop through a goal, a plan, actions with tools, observation, and memory. | Memory can be short-term, long-term or shared, and each can be poisoned. | MCP connects agents to tools and data, and A2A connects agents to each other. | And least privilege, approvals, sandboxes and monitoring keep agents contained.' }
    ] },
    { type: 'text', md: `### What makes AI "agentic"

An **AI agent** is a system in which a model pursues a goal over multiple steps, deciding for itself which actions to take. A simple chatbot maps one input to one output. An agent plans, calls tools, observes results, remembers, and continues until it finishes or hits a limit. **Agentic AI** describes systems built this way, from a coding assistant that edits files and runs tests to a fleet of cooperating agents handling an end-to-end business process.

**Autonomous systems** more broadly include any system that senses, decides and acts without moment-to-moment human direction, such as robots, autonomous vehicles and automated trading systems. LLM-based agents bring that autonomy to knowledge work.

An agent typically has four components:

- **A model** that reasons about the goal and decides the next action.
- **Tools**: functions the agent can call, such as APIs, databases, search, code execution, browsers, email or payment systems. With **tool (function) calling**, the model outputs a structured request naming the tool and its arguments, and the application decides whether to execute it. The model itself never touches the tool.
- **Memory**: short-term (the context window), long-term (facts, preferences and past results stored in a database or vector store), and sometimes **shared** memory used by several agents. Memory types are sometimes described as *semantic* (facts), *episodic* (records of past interactions) and *procedural* (learned ways of doing things).
- **Orchestration**: the code that runs the loop, manages state, enforces limits and connects everything. Planning patterns include breaking tasks into sub-tasks, and **ReAct**, in which the model alternates between reasoning about what to do and acting.

### Multi-agent systems and agent-to-agent communication

Complex work is often split across several specialised agents. In an **orchestrator–worker** pattern, a coordinating agent delegates sub-tasks to workers. In peer patterns, agents negotiate or hand off work directly.

Standards are emerging for these connections. The **Model Context Protocol (MCP)**, introduced by Anthropic in late 2024, standardises how AI applications connect to tools and data sources: MCP servers expose tools, resources and prompts that any compatible client can use. **Agent-to-agent (A2A)** protocols standardise how agents discover each other’s capabilities and delegate tasks. Google’s Agent2Agent protocol, introduced in 2025 and now managed under the Linux Foundation, uses published "agent cards" describing what each agent can do.

### Session persistence

**Session persistence** means keeping an agent’s state across turns and across sessions: the conversation, intermediate results, memory and the credentials it uses. It lets long tasks pause and resume. It also means session identifiers, tokens and stored memory become targets. Sessions must be bound to the right user, isolated from other users' sessions, expired appropriately, and protected like any other authenticated session.` },
    { type: 'accordion', title: 'How agents go wrong', items: [
      ['Excessive agency (OWASP LLM06)', `The agent has more functionality, permissions or autonomy than its task requires: a mailbox tool that can also delete, a database credential with write access, or the ability to act without approval. When the model is manipulated or mistaken, that excess becomes the damage.`],
      ['Goal manipulation through injected instructions', `Content the agent reads, such as a web page, an email, a document or another agent’s output, carries instructions that redirect it. Because agents act, indirect prompt injection can now cause actions, not just misleading text.`],
      ['Tool misuse and confused deputy', `The agent uses a legitimate tool in a harmful way, or performs an action on behalf of someone who couldn’t perform it directly, because the agent’s own permissions are broader than the requester’s.`],
      ['Memory poisoning', `False or malicious information is written into long-term or shared memory, then retrieved and trusted in later sessions or by other agents.`],
      ['Cascading failures', `In multi-agent systems, one agent’s error or compromise propagates as others act on its output. A single hallucinated fact can be amplified through a chain of agents.`],
      ['Identity spoofing between agents', `Without strong identities and authentication, a malicious agent or service can impersonate a trusted one and receive delegated tasks or data.`],
      ['Runaway consumption', `Loops that never converge, or agents that spawn more agents, consume compute and money and can overwhelm downstream systems.`],
      ['Repudiation', `Without detailed logs of the agent’s reasoning steps and tool calls, nobody can reconstruct what it did or why, which breaks accountability and incident response.`] ] },
    { type: 'table', title: 'Agent controls at a glance', head: ['Control', 'What it limits', 'Where in the course'], rows: [
      ['Least-privilege, scoped credentials per agent', 'What a compromised agent can reach', 'Modules 4.5 and 4.6'],
      ['Allow-listed tools with validated arguments', 'Which actions are possible at all', 'Module 4.4'],
      ['Human approval thresholds', 'High-impact actions without a person', 'Module 2.6'],
      ['Sandboxed code execution', 'Damage from generated code', 'Module 4.2'],
      ['Budgets, rate limits and step limits', 'Runaway loops and cost', 'Modules 3.6 and 4.7'],
      ['Memory hygiene: validation, provenance, expiry', 'Poisoned memories', 'Modules 3.3 and 5.3'],
      ['Per-agent identity and mutual authentication', 'Impersonation between agents', 'Module 4.5'],
      ['Full logging of steps and tool calls', 'Untraceable actions', 'Module 5.2'],
      ['Circuit breakers and kill switches', 'Incidents that are already under way', 'Module 5.7'] ] },
    { type: 'callout', kind: 'exam', title: 'The model never runs the tool', md: `In tool calling, the model only *requests* an action. Your application decides whether to execute it. That decision point is where authorisation, validation and approval belong. If an exam option relies on the model to refuse an unsafe action, and another enforces the check in the orchestration layer, the second is stronger.` },
    { type: 'flip', title: 'Agent vocabulary', cards: [
      ['AI agent', 'A system in which a model pursues a goal over multiple steps, choosing and taking actions with tools.'],
      ['Tool (function) calling', 'The model outputs a structured request to use a tool; the application decides whether to execute it.'],
      ['Model Context Protocol (MCP)', 'An open standard for connecting AI applications to external tools and data sources.'],
      ['Agent-to-agent (A2A)', 'Protocols that let agents discover each other’s capabilities and delegate tasks.'],
      ['Session persistence', 'Keeping an agent’s state, memory and credentials across turns and sessions.'],
      ['Excessive agency', 'Giving an AI system more functionality, permissions or autonomy than its task requires.'] ] },
    { type: 'scenario', title: 'The helpful finance agent', md: `A finance team deploys an agent that reads supplier emails, matches invoices to purchase orders and schedules payments. To keep things simple, it uses one service account with full access to the payment system and schedules payments of any value automatically.`,
      q: { q: 'Which change MOST reduces the risk of a manipulated email causing a fraudulent payment?', o: ['Add a sentence to the system prompt telling the agent to ignore any email that looks suspicious', 'Scope the agent’s credentials to the minimum and require human approval for large payments or new payees', 'Switch to a larger, more capable model that is better at recognising manipulative emails', 'Give the agent long-term memory of past suppliers so that it notices whenever a supplier’s payment details change'], a: 1, b: 5,
        why: 'The danger comes from excessive agency: full payment access and no approval step. Least-privilege credentials plus human approval for high-risk payments stop a manipulated decision from becoming a loss. Prompt instructions and larger models don’t enforce anything.' } }
  ]
};
