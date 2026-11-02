/* 6.4 · Section 1: scope, objectives and test scenarios for AI security assessments */
module.exports = {
  title: 'Scoping AI security assessments', covers: [1],
  blocks: [
    { type: 'video', title: 'Planning an AI security assessment', kicker: 'Module 6.4 · Video 1 of 5', scenes: [
      { t: 'title', kicker: 'Module 6.4 · AI security testing', title: 'Planning an AI security assessment', sub: 'Scope, objectives and test scenarios', icon: 'target',
        say: 'An AI security test is only as good as its plan. Test the wrong thing, in the wrong environment, without clear objectives, and you get a pile of interesting outputs and no answers. | This video covers how to scope AI security assessments, set objectives, and design test scenarios that tell you something real.' },
      { t: 'bullets', title: 'Test the system, not just the model', layout: 'grid', cols: 2, items: [
          { icon: 'model', h: 'Model', d: 'Behaviour, refusals, leakage', k: 'model' },
          { icon: 'chat', h: 'Application', d: 'Prompts, guardrails, output handling', k: 'human' },
          { icon: 'database', h: 'Data and retrieval', d: 'Sources, indexes, permissions', k: 'data' },
          { icon: 'tool', h: 'Agents and tools', d: 'Scopes, approvals, memory', k: 'threat' },
          { icon: 'server', h: 'Infrastructure', d: 'Serving, pipelines, keys', k: 'neutral' },
          { icon: 'users', h: 'People and process', d: 'Reviewers, monitoring, response', k: 'control' } ],
        say: 'Scope the whole system, not just the model, because most real failures happen where components meet. | The model: its behaviour, its refusals, and any leakage of training or system data. | The application: system prompts, guardrails, and how outputs are handled downstream. | Data and retrieval: sources, indexes, and whether retrieval respects permissions. | Agents and tools: scopes, approval steps and memory. | Infrastructure: serving endpoints, pipelines and keys, where traditional testing still applies. | And people and process: whether human reviewers, monitoring and incident response catch what gets through.' },
      { t: 'flow', title: 'From threat model to test plan',
        nodes: [
          { id: 'tm', x: 230, y: 330, icon: 'target', label: 'Threat model', sub: 'actors, assets, paths', k: 'threat', w: 290 },
          { id: 'obj', x: 700, y: 330, icon: 'flag', label: 'Objectives', sub: 'impacts to prove or rule out', k: 'human', w: 320 },
          { id: 'scn', x: 1200, y: 330, icon: 'list', label: 'Scenarios', sub: 'actor, entry, technique, target', k: 'model', w: 330 },
          { id: 'crit', x: 1200, y: 690, icon: 'ruler', label: 'Success criteria', sub: 'measurable thresholds', k: 'control', w: 300 },
          { id: 'roe', x: 700, y: 690, icon: 'gavel', label: 'Rules of engagement', sub: 'authority and limits', k: 'neutral', w: 320 },
          { id: 'plan', x: 230, y: 690, icon: 'doc', label: 'Test plan', sub: 'cases, repeats, schedule', k: 'data', w: 290 } ],
        edges: [{ from: 'tm', to: 'obj', k: 'threat' }, { from: 'obj', to: 'scn', k: 'human' }, { from: 'scn', to: 'crit', k: 'model' }, { from: 'crit', to: 'roe', k: 'control' }, { from: 'roe', to: 'plan', k: 'neutral' }],
        steps: [
          { show: 'tm', hi: 'tm' },
          { show: 'obj tm-obj', flow: 'tm-obj', hi: 'obj' },
          { show: 'scn obj-scn', flow: 'obj-scn', hi: 'scn' },
          { show: 'crit scn-crit', flow: 'scn-crit', hi: 'crit' },
          { show: 'roe crit-roe', flow: 'crit-roe', hi: 'roe', mark: { roe: 'lock' } },
          { show: 'plan roe-plan', flow: 'roe-plan', hi: 'plan', mark: { plan: 'ok' } } ],
        say: 'Good scenarios come from the threat model, built as Module 6.1 described: who might attack, what they want, and how they could get in. | Turn that into objectives: the impacts you want to prove or rule out, such as leaking customer data or triggering an unauthorised refund. | Each objective becomes one or more scenarios, naming an actor, an entry point, a class of technique and a target. | Define success criteria in advance, such as the highest acceptable attack success rate for each category. | Agree rules of engagement: who authorised the test, what is in scope, and the limits testers must respect. | Then write the test plan: the cases, how many times each will be repeated, and the schedule.' },
      { t: 'compare', title: 'Choosing the assessment type', labels: ['Goal', 'Style', 'Output'],
        cols: [{ h: 'Automated evals', icon: 'gear', k: 'neutral' }, { h: 'Penetration test', icon: 'search', k: 'data' }, { h: 'Red team exercise', icon: 'attacker', k: 'threat' }],
        rows: [
          ['Measure known risks at scale', 'Find exploitable flaws in scope', 'Pursue a real adversary’s goals'],
          ['Suites and benchmarks, every release', 'Systematic and time-boxed', 'Creative, objective-led, end to end'],
          ['Scores and trends', 'Findings with severities', 'Attack paths and detection gaps'] ],
        say: 'Choose the assessment type that fits the question. | Automated evaluations measure known risks at scale. A penetration test looks for exploitable flaws within a defined scope. A red team exercise pursues a real adversary’s goals, wherever they lead within the rules. | Automated evaluations run suites and benchmarks on every release. Penetration tests are systematic and time-boxed. Red teams are creative, objective-led and end to end. | Automated evaluations produce scores and trends. Penetration tests produce findings with severities. Red teams produce attack paths, and show where detection and response failed. Mature programmes use all three.' },
      { t: 'code', title: 'Rules of engagement', file: 'rules-of-engagement.yaml',
        code: `engagement: support assistant, Q4 red team
authorised: CISO and system owner, signed
targets: staging assistant, copy of RAG index
out of scope: production, real customer data
objectives: leak canary records; unapproved refund
approach: grey box, manual and automated
limits: canary data only; 5 requests a second
stop rule: real data seen -> halt, call lead
window: 3-14 Nov, 09:00-18:00 UTC
critical findings: reported within 24 hours`,
        hl: [null, [1, 2], [3, 4], [5, 6], [7, 8], [9, 10]],
        notes: [
          { h: 'Agreed before testing starts', d: 'Everyone knows what is allowed.' },
          { h: 'Authority', d: 'Signed by the people who own the risk.', k: 'human' },
          { h: 'Scope', d: 'Targets and exclusions, stated explicitly.', k: 'data' },
          { h: 'Objectives and approach', d: 'What to prove, and how much testers know.', k: 'model' },
          { h: 'Limits and stop rules', d: 'Canary data, rate caps, halt conditions.', k: 'threat' },
          { h: 'Timing and reporting', d: 'When testing runs; how fast criticals go out.', k: 'control' } ],
        say: 'Rules of engagement are agreed and signed before any testing starts, so everyone knows what is allowed. | They name who authorised the test: here, the CISO and the system owner, who own the risk. | They define the targets, and what is explicitly out of scope, such as production and real customer data. | They state the objectives and the approach. Grey box means testers get some inside knowledge, such as the architecture and system prompt, so their time goes on finding weaknesses rather than guessing. | They set limits and stop rules: only planted canary data, a cap on request rates, and an instruction to halt if real data ever appears. | And they fix the testing window, and how quickly critical findings must be reported.' },
      { t: 'summary', items: ['Scope the whole system: model, app, data, agents, infrastructure, people', 'Derive objectives and scenarios from the threat model', 'Set measurable success criteria, and repeat every test', 'Agree signed rules of engagement, with limits and stop rules'],
        say: 'To recap. | Scope the whole system: model, application, data, agents, infrastructure and people. | Derive objectives and scenarios from the threat model. | Set measurable success criteria in advance, and repeat every test, because AI systems are stochastic. | And agree signed rules of engagement, with clear limits and stop rules.' } ] },
    { type: 'text', md: `### Scoping an AI security assessment
- **System, not model:** include the application, retrieval pipeline, agents and tools, infrastructure, and the human processes around them. Many serious findings sit at the joins, such as retrieved content reaching a tool call (Module 4.1).
- **Assets and entry points:** list what must be protected (data, credentials, actions, safety properties) and every way content gets in: user input, files, retrieved documents, tool outputs, memory and other agents.
- **Third parties:** hosted models, tools and connectors have their own terms. Check that the provider allows security testing, use its testing or bug bounty route where one exists, and never test another organisation’s systems without permission (Module 6.3).
- **Environment:** test in a staging environment that matches production (the same model version, prompts, guardrails, tools and permissions) but holds **synthetic or canary data**. Test in production only with explicit approval and tight limits.

### Objectives and scenarios
Objectives state the impacts to prove or rule out, derived from the threat model (Module 6.1):
| Category | Example objective |
|---|---|
| **Confidentiality** | Can a user retrieve another customer’s records, or the system prompt? |
| **Integrity** | Can planted content change answers or decisions? |
| **Agency** | Can the agent be steered into an action it isn’t authorised to take? |
| **Availability and cost** | Can inputs drive runaway loops or token consumption? |
| **Safety and misuse** | Can safeguards against harmful output be bypassed? |

Each **scenario** names an actor (an external user, an insider, a poisoned data source or a compromised tool), an entry point, a technique class such as indirect prompt injection, a target, and the evidence that proves success. Draw technique classes from the **OWASP Top 10 for LLM Applications**, the **OWASP Top 10 for Agentic Applications**, **MITRE ATLAS** and your own incident history, and track them in a **coverage matrix**.

### Designing tests for stochastic systems
- **Repeat each case** many times at production settings, because the same input can succeed on one attempt and fail on the next. Report an **attack success rate** (Module 1.3), not a single pass or fail.
- **Pin and record versions** of the model, prompts, guardrails and tools, so results can be compared and reproduced (Module 6.5).
- **Include multi-turn and multimodal cases:** many attacks build up over a conversation, or hide in images, audio and documents.
- **Set success criteria in advance**, such as a maximum attack success rate for high-severity categories, so results lead to decisions.

### Assessment types and knowledge levels
| Type | Best for |
|---|---|
| **Automated evaluation** | Known risks, at scale, on every release (Module 6.6) |
| **Penetration test** | Exploitable flaws in a defined scope and time box |
| **Red team exercise** | Realistic adversary objectives end to end, including whether detection and response work |
| **Bug bounty** | Continuous, diverse external testing, once the basics are in place |

Testers may get no internal knowledge (**black box**), some, such as the architecture and system prompts (**grey box**), or full access, including code and weights (**white box**). More knowledge finds more in the time available.

### Rules of engagement
Signed authorisation from risk owners; scope and exclusions; objectives; methods; limits such as canary data only and rate caps; **stop rules** for real data exposure or harm; testing windows; communication and escalation paths; handling of harmful outputs and tester wellbeing; and reporting timelines.` },
    { type: 'scenario', title: 'The production shortcut', md: `A team plans to red team its new claims-handling agent before launch. To save time, the team lead proposes testing directly in production, using real claims data and without written approval, because “staging doesn’t have the latest prompts”.`,
      q: { q: 'What should the security lead require FIRST?', o: ['Testing in production, with testers asked to take care with any real claims data they see', 'Signed rules of engagement, and a production-matching staging environment with canary data', 'Cancelling the red team, since agents can’t be tested safely while their prompts keep changing', 'Testing in production overnight, when fewer customers are likely to be affected by problems'], a: 1, b: 1,
        why: 'Testing needs written authorisation, a clear scope and limits, and an environment that matches production without exposing real data. Bringing staging up to date with the latest prompts fixes the stated problem. Asking for care, cancelling or testing overnight doesn’t address authorisation or data exposure.' } },
    { type: 'callout', kind: 'exam', title: 'Scoping questions', md: `Strong answers **scope the whole system**, derive **objectives and scenarios from the threat model**, set **measurable success criteria**, and run tests under **signed rules of engagement** in a **production-like environment with canary data**. Remember that AI is stochastic: one passing attempt proves little, so **repeat tests and report rates**.` },
    { type: 'check', q: { q: 'A red team runs each prompt injection test case once and reports that the assistant "passed". Why is this result unreliable?', o: ['Prompt injection tests are only valid when external testers run them', 'Outputs vary between attempts, so cases need repeating to estimate a rate', 'Single tests are fine, provided they are run at weekends to avoid traffic', 'The assistant should have been tested by the developers who built it'], a: 1, b: 1,
      why: 'The same input can succeed on one attempt and fail on another. Repeating each case at production settings gives an attack success rate, which is the meaningful measure.' } }
  ]
};
