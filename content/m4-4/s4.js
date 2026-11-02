/* 4.4 · Section 4: stress testing and exception handling validation */
module.exports = {
  title: 'Stress testing and exception handling validation', covers: [4],
  blocks: [
    { type: 'video', title: 'Break it before attackers do', kicker: 'Module 4.4 · Video 4 of 4', scenes: [
      { t: 'title', kicker: 'Module 4.4 · Guardrails and testing', title: 'Break it before attackers do', sub: 'Stress testing and exception handling validation', icon: 'bolt',
        say: 'Systems rarely fail under normal conditions. They fail at the edges: under extreme load, with malformed input, when a dependency goes quiet, or when the model says something unexpected. | This video covers stress testing and validating that an AI system handles exceptions safely.' },
      { t: 'bullets', title: 'Kinds of stress test', layout: 'grid', cols: 2, items: [
          { icon: 'bars', h: 'Spike', d: 'Sudden surges in traffic', k: 'threat' },
          { icon: 'clock', h: 'Soak', d: 'Sustained load for hours or days', k: 'data' },
          { icon: 'chart', h: 'Breakpoint', d: 'Increase load until it fails', k: 'human' },
          { icon: 'text', h: 'Input extremes', d: 'Huge, malformed or odd inputs', k: 'model' },
          { icon: 'plug', h: 'Dependency failure', d: 'Slow or missing services', k: 'neutral' },
          { icon: 'robot', h: 'Agent edge cases', d: 'Loops, tool errors, dead ends', k: 'control' } ],
        say: 'Stress tests push the system beyond normal conditions. | Spike tests send sudden surges of traffic. | Soak tests apply sustained load for hours or days, revealing memory leaks and slow degradation. | Breakpoint tests increase load until something fails, so you know where the limit is and how failure looks. | Input extremes: very long, malformed or unusual inputs, such as strange encodings or empty fields. | Dependency failures: slow, erroring or missing services. | And agent edge cases: loops, tool errors, and tasks with no valid path forward.' },
      { t: 'flow', title: 'Injecting failures on purpose',
        nodes: [
          { id: 'hyp', x: 230, y: 330, icon: 'bulb', label: 'Hypothesis', sub: 'fails closed, degrades', k: 'neutral', w: 290 },
          { id: 'inj', x: 640, y: 330, icon: 'bolt', label: 'Inject a fault', sub: 'slow model, 429s, outage', k: 'threat', w: 300 },
          { id: 'obs', x: 1060, y: 330, icon: 'eye', label: 'Observe', sub: 'behaviour, logs, users', k: 'data', w: 280 },
          { id: 'cmp', x: 1340, y: 620, icon: 'scale', label: 'Compare', sub: 'expected or not?', k: 'human', w: 250 },
          { id: 'fix', x: 920, y: 740, icon: 'tool', label: 'Fix and retest', sub: 'add to the suite', k: 'control', w: 280 },
          { id: 'rep', x: 470, y: 700, icon: 'cycle', label: 'Repeat', sub: 'game days, in pipeline', k: 'model', w: 280 } ],
        edges: [{ from: 'hyp', to: 'inj', k: 'neutral' }, { from: 'inj', to: 'obs', k: 'threat' }, { from: 'obs', to: 'cmp', k: 'data' }, { from: 'cmp', to: 'fix', k: 'human' }, { from: 'fix', to: 'rep', k: 'control' }],
        steps: [
          { show: 'hyp', hi: 'hyp' },
          { show: 'inj hyp-inj', flow: 'hyp-inj', hi: 'inj', mark: { inj: 'warn' } },
          { show: 'obs inj-obs', flow: 'inj-obs', hi: 'obs' },
          { show: 'cmp obs-cmp', flow: 'obs-cmp', hi: 'cmp' },
          { show: 'fix cmp-fix', flow: 'cmp-fix', hi: 'fix', mark: { fix: 'ok' } },
          { show: 'rep fix-rep', flow: 'fix-rep', hi: 'rep' } ],
        say: 'Chaos engineering applies the scientific method to failure. Start with a hypothesis: for example, if the moderation service fails, replies are held rather than sent unchecked. | Inject a fault deliberately: make the model slow, return rate-limit errors, or take the vector database offline. | Observe what actually happens: system behaviour, logs, alerts, and what users see. | Compare the result with the hypothesis. | Fix anything that didn’t behave as expected, and add the scenario to the regular test suite. | And repeat, through scheduled game days and automated tests in the pipeline.' },
      { t: 'bullets', title: 'What safe exception handling looks like', layout: 'grid', cols: 2, items: [
          { icon: 'lock', h: 'Fails closed', d: 'Security checks never skipped on error', k: 'control' },
          { icon: 'eye', h: 'Reveals nothing', d: 'No stack traces or system prompts', k: 'threat' },
          { icon: 'cycle', h: 'Retries with limits', d: 'Backoff, then stop and escalate', k: 'human' },
          { icon: 'check', h: 'Handles bad model output', d: 'Invalid JSON, refusals, nonsense', k: 'model' },
          { icon: 'rollback', h: 'No half-finished actions', d: 'Roll back or flag partial work', k: 'data' },
          { icon: 'audit', h: 'Logs and alerts', d: 'Every exception visible to operators', k: 'neutral' } ],
        say: 'Exception handling validation checks six behaviours. | The system fails closed: an error in a security check never means the check is skipped. | Errors reveal nothing useful to an attacker: no stack traces, internal addresses or system prompts in messages. | Retries use backoff and limits, then stop and escalate, rather than looping forever. | Bad model output is handled: invalid structured output, unexpected refusals and nonsense are caught, not passed on. | Partial work is rolled back or clearly flagged, so an agent never leaves half-finished actions behind. | And every exception is logged and, where it matters, alerts the operators.' },
      { t: 'summary', items: ['Spike, soak, breakpoint, input-extreme, dependency and agent tests', 'Inject faults deliberately and compare against a hypothesis', 'Fail closed, reveal nothing, retry with limits, handle bad output', 'Roll back partial work; log and alert on exceptions'],
        say: 'To recap. | Use spike, soak, breakpoint, input-extreme, dependency and agent edge-case tests. | Inject faults deliberately, and compare the result against a stated hypothesis. | Make sure the system fails closed, reveals nothing in errors, retries within limits, and handles bad model output. | And roll back partial work, while logging and alerting on every exception that matters.' } ] },
    { type: 'text', md: `### Stress testing
| Test | Purpose | AI-specific angle |
|---|---|---|
| **Spike** | Behaviour under sudden surges | Autoscaling lag for GPU capacity, which can take minutes; provider rate limits |
| **Soak (endurance)** | Behaviour over long periods | Memory growth in inference servers and caches; slow drift in agent memory |
| **Breakpoint** | Where and how the system fails | Whether it degrades gracefully (Module 3.6) or collapses |
| **Input extremes** | Robustness to unusual inputs | Maximum-length prompts, huge files, malformed encodings, many attachments, deeply nested structures |
| **Dependency failure** | Resilience to outages and slowdowns | Model API timeouts and HTTP 429 rate-limit responses, vector database outages, tool failures |
| **Agent edge cases** | Safe behaviour when tasks go wrong | Tool errors, contradictory results, impossible goals, loops, exhausted budgets |

**Chaos engineering** makes failure testing systematic: state a hypothesis about steady-state behaviour, inject a fault in a controlled way (starting in test environments, with a limited blast radius), observe, and fix gaps. **Game days** rehearse failures with the operations team, including AI-specific runbooks (Domain 5).

### Exception handling validation
Write explicit test cases for each failure mode, each with the expected safe behaviour:
- **Fail closed** for security functions: if moderation, DLP or authorisation is unavailable, hold or refuse rather than proceed (Module 3.6).
- **Safe error messages:** no stack traces, file paths, internal hostnames, system prompts or configuration in user-facing errors; detailed diagnostics go to logs only. Error messages are a common source of system prompt and infrastructure leakage.
- **Bounded retries** with exponential backoff and jitter, circuit breakers, and escalation after a limit.
- **Robust parsing of model output:** validate structured output against schemas; handle refusals, truncation at token limits, and hallucinated tool names or arguments; never pass malformed output downstream.
- **Transactional behaviour for agents:** compensate or roll back partial actions, or flag them clearly for human follow-up; make actions idempotent where possible, so retries don’t duplicate payments or messages.
- **Timeouts everywhere**, including on tool calls and agent runs.
- **Observability:** log exceptions with correlation IDs, alert on unusual error rates, and include them in post-incident reviews.

### Fuzzing
Fuzz inputs, prompts and tool outputs with random and structured variations to find crashes, parsing errors and unsafe behaviours. LLM-generated test inputs can widen coverage, and adversarial variants overlap with AI red teaming (Module 6.4).

### Making it routine
Put stress and failure tests in the pipeline where practical, run larger exercises before major releases and on a schedule, and track findings to closure. Each incident and red-team finding should add a regression test.` },
    { type: 'callout', kind: 'exam', title: 'Exception handling questions', md: `The safest behaviour under failure is usually **fail closed, reveal nothing, stop and escalate**. Watch for distractors that keep the service running by **skipping a security check**, show **detailed errors** to users, or **retry indefinitely**.` },
    { type: 'match', title: 'Which test would find this?', pairs: [
      ['Memory use on inference servers creeps up over three days', 'Soak test'],
      ['A product launch triples traffic within five minutes', 'Spike test'],
      ['Load is raised step by step until requests start failing', 'Breakpoint test'],
      ['A prompt full of broken encoding crashes the request parser', 'Input-extreme test (fuzzing)'],
      ['The vector database is switched off during a test window', 'Dependency failure test (chaos engineering)'] ] },
    { type: 'scenario', title: 'The retry storm', md: `During a traffic spike, a model provider starts returning HTTP 429 rate-limit errors. Every client of an internal AI service retries each failed request immediately, and the platform also retries on the clients’ behalf. Traffic to the provider multiplies, the rate limiting lasts far longer than the spike, and users see failures for an hour.`,
      q: { q: 'Which change BEST addresses this?', o: ['Retry immediately but from more servers, so that the backlog clears faster', 'Exponential backoff with jitter, retry limits, one retry layer and a circuit breaker', 'Remove rate limits from the provider contract, so 429 errors can never occur', 'Show users the provider’s raw error message so that they know to wait'], a: 1, b: 4,
        why: 'Backoff with jitter spreads retries out, limits and a single retry layer stop amplification, and a circuit breaker pauses calls to a struggling dependency. Faster retries make the storm worse, and the other options don’t fix the behaviour.' } },
    { type: 'check', q: { q: 'During a failure test, the vector database behind a support assistant is taken offline. The assistant keeps answering, inventing policy details, and shows users an error containing the database’s internal hostname. What should be fixed?', o: ['Nothing, because the assistant stayed available throughout the test', 'Fail safely without retrieval, and return a generic error with details logged internally', 'Show the full error to users so that they can report the problem to support', 'Add a second vector database in another region, so that this test can no longer cause any failures'], a: 1, b: 4,
      why: 'Without retrieval the assistant should decline or degrade to a safe mode, not invent answers, and user-facing errors should reveal nothing internal while diagnostics go to logs. Availability with wrong answers isn’t success, and redundancy alone doesn’t fix unsafe failure behaviour.' } }
  ]
};
