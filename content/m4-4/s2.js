/* 4.4 · Section 2: architectural guardrails for autonomous AI behaviour (harness, orchestration) */
module.exports = {
  title: 'Architectural guardrails for autonomous agents', covers: [2],
  blocks: [
    { type: 'video', title: 'The harness, not the horse', kicker: 'Module 4.4 · Video 2 of 4', scenes: [
      { t: 'title', kicker: 'Module 4.4 · Guardrails and testing', title: 'The harness, not the horse', sub: 'Architectural guardrails for autonomous AI', icon: 'robot',
        say: 'You can’t make a model perfectly obedient, but you control everything around it: the code that runs its loop, executes its tools, and decides what it may do next. | This video covers architectural guardrails for autonomous AI: the agent harness, orchestration patterns, and the limits that keep agents safe.' },
      { t: 'layers', title: 'What the agent harness controls',
        layers: [
          { icon: 'list', label: 'Allowed actions', sub: 'Which tools exist, with which scopes', k: 'control' },
          { icon: 'check', label: 'Checks on every step', sub: 'Validate arguments and policy before execution', k: 'data' },
          { icon: 'users', label: 'Human checkpoints', sub: 'Approval for high-impact or irreversible steps', k: 'human' },
          { icon: 'clock', label: 'Budgets', sub: 'Steps, time, tokens, cost and tool calls', k: 'neutral' },
          { icon: 'stop', label: 'Stop conditions', sub: 'Kill switch, loop detection, escalation', k: 'threat' } ],
        say: 'The agent harness is the code that runs the agent loop. It, not the model, is where safety is enforced. | It defines which actions exist at all: which tools the agent has, and with which scopes. | It checks every step before execution: are the arguments valid, and does policy allow this action now? | It inserts human checkpoints for high-impact or irreversible steps. | It enforces budgets on steps, time, tokens, cost and tool calls. | And it applies stop conditions: a kill switch, loop detection, and escalation to a person when the agent is stuck or uncertain.' },
      { t: 'compare', title: 'Workflows and open-ended agents', labels: ['Who decides the steps', 'Predictability', 'Use when'],
        cols: [{ h: 'Workflow', icon: 'pipeline', k: 'control' }, { h: 'Open-ended agent', icon: 'robot', k: 'human' }],
        rows: [
          ['Your code, fixed in advance', 'The model, at run time'],
          ['High; easy to test', 'Lower; harder to test'],
          ['The task is well understood', 'Flexibility is truly needed'] ],
        say: 'An important design choice is how much freedom to give. | In a workflow, your code fixes the steps in advance, and the model fills in parts. In an open-ended agent, the model decides the steps at run time. | Workflows are highly predictable and easy to test. Open-ended agents are less predictable and much harder to test. | So prefer workflows wherever the task is well understood, and use open-ended agents only where their flexibility is genuinely needed.' },
      { t: 'flow', title: 'Keeping untrusted content away from control',
        zones: [{ id: 'zq', x: 860, y: 196, w: 640, h: 660, label: 'Quarantined: sees untrusted content', k: 'threat' }],
        nodes: [
          { id: 'u', x: 220, y: 410, icon: 'user', label: 'User request', k: 'human', w: 250 },
          { id: 'p', x: 620, y: 410, icon: 'model', label: 'Planner model', sub: 'never sees raw content', k: 'control', w: 300 },
          { id: 'q', x: 1180, y: 410, icon: 'model', label: 'Quarantined model', sub: 'reads emails, pages', k: 'threat', w: 320 },
          { id: 'v', x: 1180, y: 720, icon: 'database', label: 'Results as variables', sub: 'structured, validated', k: 'data', w: 320 },
          { id: 't', x: 620, y: 720, icon: 'tool', label: 'Tools', sub: 'called by the harness', k: 'neutral', w: 260 } ],
        edges: [{ from: 'u', to: 'p', k: 'human' }, { from: 'p', to: 'q', k: 'control' }, { from: 'q', to: 'v', k: 'threat' }, { from: 'v', to: 't', k: 'data' }],
        steps: [
          { show: 'u', hi: 'u' },
          { show: 'p u-p', flow: 'u-p', hi: 'p' },
          { show: 'zq q p-q', flow: 'p-q', hi: 'q', mark: { q: 'warn' } },
          { show: 'v q-v', flow: 'q-v', hi: 'v' },
          { show: 't v-t', flow: 'v-t', hi: 't', mark: { t: 'lock' } } ],
        say: 'One powerful pattern keeps untrusted content away from the part of the system that decides what to do. A user makes a request. | A planner model turns it into a plan, but never sees untrusted content such as emails or web pages. | A separate, quarantined model reads that untrusted content, for example to summarise an email, and has no ability to call tools. | Its results come back as structured values, validated and treated as data, not instructions. | And the harness calls tools according to the planner’s plan, so instructions hidden in the content have no route to control actions.' },
      { t: 'bullets', title: 'Guardrails for agent actions', layout: 'grid', cols: 2, items: [
          { icon: 'eye', h: 'Read before write', d: 'Read-only first; writes need more', k: 'data' },
          { icon: 'rollback', h: 'Prefer reversible actions', d: 'Drafts, soft deletes, dry runs', k: 'control' },
          { icon: 'users', h: 'Approve the irreversible', d: 'Payments, deletions, external sends', k: 'human' },
          { icon: 'money', h: 'Cap the impact', d: 'Limits on amounts and volumes', k: 'neutral' },
          { icon: 'audit', h: 'Trace every step', d: 'Plans, calls, results, decisions', k: 'model' },
          { icon: 'power', h: 'Stop quickly', d: 'Kill switches and circuit breakers', k: 'threat' } ],
        say: 'Six more guardrails shape what agents actually do. | Read before write: start agents with read-only tools, and require more assurance for anything that changes data. | Prefer reversible actions: drafts instead of sends, soft deletes, and dry runs that show what would happen. | Require human approval for irreversible actions, such as payments, deletions and messages to outside parties. | Cap the impact, with limits on amounts, volumes and recipients. | Trace every step: plans, tool calls, results and decisions, for monitoring and investigation. | And make sure agents can be stopped quickly, with kill switches and circuit breakers.' },
      { t: 'summary', items: ['The harness, not the model, enforces safety', 'Prefer workflows; use open-ended agents only where needed', 'Keep untrusted content away from planning and control', 'Read-only first, reversible actions, approvals, caps, tracing, stop'],
        say: 'To recap. | The harness around the model, not the model itself, is where safety is enforced. | Prefer fixed workflows, and use open-ended agents only where their flexibility is needed. | Keep untrusted content away from the components that plan and control actions. | And start read-only, prefer reversible actions, require approval for irreversible ones, cap impact, trace everything, and be able to stop.' } ] },
    { type: 'text', md: `### The agent harness
The **harness** (also called the scaffold or runtime) is the code that runs an agent: it sends prompts to the model, parses its proposed actions, executes tools, manages memory and state, and decides when to stop. Because the model only *proposes* actions, the harness is the natural enforcement point:
- **Action space:** the tools registered, their scopes and credentials (least privilege; Module 4.6).
- **Pre-execution checks:** schema validation of arguments, policy checks (for example, "refunds only to the customer’s own account, below £200"), and allow-lists for destinations.
- **Human-in-the-loop checkpoints** for high-impact, irreversible or unusual actions, with enough context for a real decision rather than a rubber stamp (Module 2.6).
- **Budgets:** maximum steps, wall-clock time, tokens, cost and tool calls per task; maximum delegation depth for multi-agent systems.
- **Stop conditions:** loop and repetition detection, confidence or error thresholds that trigger escalation, and an external kill switch (Module 5.7).
- **State and memory controls:** what is remembered between sessions, who can write to shared memory, and validation of memory contents (memory can be poisoned).
- **Observability:** structured traces of every plan, call and result.

### Orchestration patterns
| Pattern | Idea | Security benefit |
|---|---|---|
| **Workflow first** | Fixed steps in code; the model fills in parts | Predictable, testable, smaller action space |
| **Plan, then execute** | The plan is produced and checked before any tool runs | Policy can review the whole plan; injected content can’t add steps mid-run |
| **Dual model (privileged and quarantined)** | A planner that never sees untrusted content; a quarantined model that processes content but can’t act | Separates control flow from untrusted data; research systems such as Google DeepMind’s CaMeL (2025) build on this with capability tracking |
| **Supervisor or critic** | A separate component reviews proposed actions | Second check, though a model-based critic can also be fooled |
| **State machine** | Only defined transitions are allowed | Prevents agents jumping to unexpected actions |
| **Least-privilege sub-agents** | Specialised agents with narrow tools | Limits the blast radius of any one compromised agent |

### Design principles
- **Assume the model will sometimes be manipulated** (OWASP LLM01: Prompt Injection) and limit the consequences (OWASP LLM06: Excessive Agency).
- **Make the dangerous path hard:** high-impact tools need approval, separate credentials and stricter validation.
- **Fail safe:** on errors, timeouts or uncertainty, stop and escalate rather than retrying indefinitely or guessing (Section 4).
- **Keep humans meaningfully involved:** approvals must show what will happen, why, and with what data, so reviewers can catch problems.` },
    { type: 'callout', kind: 'exam', title: 'Agent guardrail questions', md: `When asked how to make an agent safer, prefer controls in the **harness**: fewer and narrower tools, policy checks before execution, approvals for irreversible actions, budgets and stop conditions. "Instruct the agent to be careful" is never the best answer.` },
    { type: 'match', title: 'Name the orchestration pattern', pairs: [
      ['Fixed steps in code; the model fills in parts', 'Workflow first'],
      ['The whole plan is checked before any tool runs', 'Plan-then-execute'],
      ['A planner never sees untrusted content; another model reads it but can’t act', 'Privileged and quarantined models'],
      ['Only defined transitions between states are allowed', 'State machine'],
      ['Specialised agents each get a narrow set of tools', 'Least-privilege sub-agents'] ] },
    { type: 'check', q: { q: 'An email-triage agent reads incoming messages and can forward emails and create calendar invites. Which architecture BEST limits the impact of instructions hidden in incoming emails?', o: ['A longer system prompt that warns the agent to watch for suspicious emails', 'A planner that never reads raw emails, a quarantined summariser, and approval for forwards', 'A second agent that reads every incoming email first and decides whether it looks malicious or safe', 'Giving the agent access to more tools, so that it can handle more cases itself'], a: 1, b: 2,
      why: 'Separating untrusted content from the component that controls actions, and requiring approval for external sends, means hidden instructions can’t steer tool use directly. Prompt warnings and a model-based gatekeeper can both be fooled, and more tools increase the blast radius.' } }
  ]
};
