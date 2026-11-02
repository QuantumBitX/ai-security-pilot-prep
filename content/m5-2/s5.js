/* 5.2 · Section 5: real-time monitoring of AI behaviour, performance drift and agent actions */
module.exports = {
  title: 'Real-time monitoring of AI behaviour, drift and agent actions', covers: [5],
  blocks: [
    { type: 'video', title: 'Watching AI as it runs', kicker: 'Module 5.2 · Video 5 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.2 · AI security telemetry', title: 'Watching AI as it runs', sub: 'Real-time monitoring of behaviour, drift and agent actions', icon: 'chart',
        say: 'An agent can send hundreds of messages, or call a tool thousands of times, in the time it takes to read a weekly report. Some problems have to be caught in seconds. | This video covers real-time monitoring of AI behaviour, performance drift and agent actions.' },
      { t: 'layers', title: 'What to watch in real time',
        layers: [
          { icon: 'shield', label: 'Behaviour', sub: 'Safety scores, refusals, jailbreak and injection hits, data in outputs', k: 'control' },
          { icon: 'chart', label: 'Performance drift', sub: 'Input and embedding shifts, quality and grounding scores', k: 'model' },
          { icon: 'robot', label: 'Agent actions', sub: 'Tool calls, destinations, privileges, loops', k: 'threat' },
          { icon: 'money', label: 'Resources', sub: 'Tokens, cost, latency, errors', k: 'neutral' } ],
        say: 'Real-time monitoring covers four layers. | Behaviour: safety classifier scores, refusal rates, jailbreak and injection detections, and personal data or secrets appearing in outputs. | Performance drift: shifts in the inputs and their embeddings, and falling quality or grounding scores. | Agent actions: which tools agents call, where they send data, which privileges they use, and whether they are stuck in loops. | And resources: tokens, cost, latency and errors, where sudden spikes can signal abuse or a runaway process.' },
      { t: 'chart', title: 'An agent’s actions per minute', kind: 'line', x: ['09:00', '09:05', '09:10', '09:15', '09:20', '09:25', '09:30', '09:35', '09:40', '09:45', '09:50', '09:55'], yMin: 0, yMax: 60, ticks: 3, yLabel: 'Illustrative tool calls per minute by one support agent',
        series: [{ n: 'Tool calls', k: 'threat', v: [6, 7, 5, 8, 6, 7, 6, 34, 51, 9, 6, 7] }],
        annot: [{ y: 20, text: 'Alert threshold from baseline', k: 'human', xi: 2.6 }, { x: 7, text: 'Loop or hijack?', k: 'threat' }, { x: 9, text: 'Agent paused', k: 'control', at: 'bottom' }],
        steps: [{ s: [0] }, { a: [0] }, { a: [1] }, { a: [2] }],
        say: 'Here is an illustrative support agent that normally makes around six tool calls a minute. | Its baseline sets an alert threshold well above normal variation. | At nine thirty-five, calls jump to more than thirty a minute, then fifty. That could be a loop, a flood of genuine work, or a hijacked agent working through a list of records. | The threshold breach triggers an automated pause within a minute, and an analyst reviews the trace before the agent resumes.' },
      { t: 'flow', title: 'A real-time detection loop',
        nodes: [
          { id: 'ev', x: 230, y: 330, icon: 'wave', label: 'Event stream', sub: 'every request and action', k: 'data', w: 300 },
          { id: 'eval', x: 700, y: 330, icon: 'gear', label: 'Online evaluators', sub: 'classifiers, sampled judges', k: 'model', w: 330 },
          { id: 'det', x: 1200, y: 330, icon: 'search', label: 'Detections', sub: 'rules and baselines', k: 'human', w: 290 },
          { id: 'guard', x: 1200, y: 690, icon: 'stop', label: 'Automatic guard', sub: 'throttle, pause, fall back', k: 'threat', w: 320 },
          { id: 'tri', x: 700, y: 690, icon: 'users', label: 'Analyst triage', sub: 'owner and SOC', k: 'neutral', w: 290 },
          { id: 'tune', x: 230, y: 690, icon: 'sliders', label: 'Tune and improve', sub: 'thresholds, rules', k: 'control', w: 300 } ],
        edges: [{ from: 'ev', to: 'eval', k: 'data' }, { from: 'eval', to: 'det', k: 'model' }, { from: 'det', to: 'guard', k: 'human' }, { from: 'guard', to: 'tri', k: 'threat' }, { from: 'tri', to: 'tune', k: 'neutral' }],
        steps: [
          { show: 'ev', hi: 'ev' },
          { show: 'eval ev-eval', flow: 'ev-eval', hi: 'eval' },
          { show: 'det eval-det', flow: 'eval-det', hi: 'det', mark: { det: 'alert' } },
          { show: 'guard det-guard', flow: 'det-guard', hi: 'guard', mark: { guard: 'lock' } },
          { show: 'tri guard-tri', flow: 'guard-tri', hi: 'tri' },
          { show: 'tune tri-tune', flow: 'tri-tune', hi: 'tune', mark: { tune: 'ok' } } ],
        say: 'A real-time detection loop has six parts. Every request, response and agent action becomes an event in a stream. | Online evaluators score events as they pass: fast classifiers for safety and data leakage on every event, and slower, model-based judges on a sample. | Detections combine those scores with rules and behavioural baselines. | When a high-risk detection fires, an automatic guard acts immediately and reversibly: throttling a key, pausing an agent or switching to a fallback. | The model owner and the security operations centre triage the alert, with the full trace in front of them. | And every alert feeds back into tuning: thresholds, rules and evaluators improve over time, reducing false positives.' },
      { t: 'compare', title: 'Real-time and batch monitoring', labels: ['Speed', 'Best for', 'Example', 'Methods'],
        cols: [{ h: 'Real time', icon: 'bolt', k: 'threat' }, { h: 'Batch', icon: 'calendar', k: 'model' }],
        rows: [
          ['Seconds to minutes', 'Hours to weeks'],
          ['Stopping harm as it happens', 'Trends, fairness, deep evaluation'],
          ['Agent emails a new domain', 'Weekly accuracy against outcomes'],
          ['Lightweight classifiers, rules', 'Heavier evaluation and review'] ],
        say: 'Real-time monitoring complements batch monitoring rather than replacing it. | Real-time monitoring works in seconds or minutes. Batch monitoring works over hours or weeks. | Real time is best for stopping harm as it happens. Batch is best for trends, fairness and deeper evaluation. | For example, real time catches an agent emailing a domain it has never used. Batch measures accuracy each week once real outcomes are known. | Real time relies on lightweight classifiers and rules. Batch can afford heavier evaluation and human review.' },
      { t: 'summary', items: ['Watch behaviour, drift, agent actions and resources', 'Baseline each agent and key; alert on deviations', 'Guard automatically and reversibly; humans triage', 'Combine real-time detection with batch evaluation'],
        say: 'To recap. | Monitor behaviour, performance drift, agent actions and resource use in real time. | Baseline each agent, key and application, and alert on deviations. | Respond automatically, with reversible guards, while people triage and decide. | And combine real-time detection with batch evaluation for the full picture.' } ] },
    { type: 'text', md: `### Real-time behaviour monitoring
- **Safety and policy:** run fast classifiers on inputs and outputs for toxicity, jailbreak and injection patterns, personal data and secrets (Module 4.4). Track rates per application and model version, with two-sided thresholds (Module 5.1).
- **Grounding and quality:** sample responses for model-based evaluation ("LLM as a judge") of groundedness, relevance and policy compliance. Judges are slower and costlier, so sample, and calibrate them against human review.
- **Refusal and block rates:** sudden changes in either direction can mean an attack campaign, a broken control or a model update that changed safety behaviour.

### Performance drift in real time
Module 1.3 introduced drift types, and Module 3.5 covered lifecycle monitoring. In operations:
- Track **input drift** over sliding windows: topic and language mix, prompt length, and **embedding drift** (for example, the distance between the current window’s average embedding and a baseline, or the share of inputs far from known clusters).
- Track **output drift**: response length, refusal rate, format failures and confidence.
- Use proxy signals while ground truth is delayed: user feedback, escalations to humans, corrections and complaints.
- Distinguish **drift** (the world changed) from **configuration change** (the system changed) by correlating with deployment and change records (Module 5.1).

### Monitoring agent actions
| Signal | Why it matters |
|---|---|
| **Action rate** per agent and task | Loops, runaway costs, automated abuse |
| **New tools or scopes** used for the first time | Over-delegation or hijacking (Module 4.6) |
| **New destinations** (domains, recipients, APIs) | Possible exfiltration after injection |
| **High-impact actions** (payments, deletions, permission changes) | Need approval and close review |
| **Data volume** read or sent | Bulk access or leakage |
| **Delegated identity** and approvals | Attribution and policy compliance (Module 4.5) |

### Alerts that work
- **Baselines per entity** (agent, key, application), because normal differs widely between them.
- **Severity from context:** data sensitivity, privileges and blast radius, not just the detector’s score.
- **Reversible automatic guards** for high-confidence, high-impact detections: throttle, pause, hold or fall back. These link to circuit breakers and kill switches (Module 5.7).
- **Dashboards per audience:** SOC (detections and incidents), model owners (behaviour and quality), finance (cost) and executives (risk posture).
- **Measure the monitoring itself:** time to detect, false positive rate, and coverage of the AI systems in the inventory.` },
    { type: 'scenario', title: 'The quiet weekend', md: `A bank’s internal research agent can read market data, query a customer database and send email. Monitoring is reviewed in a weekly batch report. On Saturday night, after reading a web page containing hidden instructions, the agent queries 40,000 customer records and emails summaries to an external address. Nobody notices until Monday’s report.`,
      q: { q: 'Which monitoring improvement would MOST reduce the impact of a repeat incident?', o: ['Produce the batch report daily instead of weekly, and email it to the agent’s owner', 'Real-time alerts on new destinations and bulk data access, with an automatic pause', 'A policy reminding staff that agents mustn’t be left running at weekends', 'A larger language model for the agent, so it is less likely to follow injected text'], a: 1, b: 5,
        why: 'Real-time detection of new destinations and bulk reads, with an automatic, reversible pause, stops the agent within minutes. A daily report still detects the problem hours later, a policy doesn’t monitor anything, and a larger model doesn’t reliably resist injection.' } },
    { type: 'callout', kind: 'exam', title: 'Real-time monitoring questions', md: `Look for **per-entity baselines**, **context-based severity** and **automatic, reversible guards** for agents and keys, combined with **batch evaluation** for slower trends. Weekly reports, or monitoring that only measures model accuracy, are too slow for agents that act in seconds.` },
    { type: 'check', q: { q: 'A team notices that its assistant’s answers have grown less grounded over two weeks. Deployment records show no changes. Which real-time signal would BEST show whether the cause is drift in user inputs?', o: ['The assistant’s average response latency, compared with its latency at launch', 'Embedding drift of incoming prompts against the baseline window', 'The total number of tokens the assistant used in each of the two weeks', 'The count of users who signed in to the assistant each day'], a: 1, b: 5,
      why: 'Embedding drift measures whether the content of incoming prompts has moved away from what the assistant was built and tested for. Latency, token totals and sign-in counts don’t show what users are asking about.' } }
  ]
};
