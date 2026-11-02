/* 5.6 · Section 2: root cause analysis (RCA), forensics and timeline tracking */
module.exports = {
  title: 'Root cause analysis, forensics and timeline tracking', covers: [2],
  blocks: [
    { type: 'video', title: 'Why did this really happen?', kicker: 'Module 5.6 · Video 2 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.6 · Investigation and eradication', title: 'Why did this really happen?', sub: 'Root cause analysis, forensics and timeline tracking', icon: 'search',
        say: 'Fixing the symptom of an AI incident is quick. Fixing its root cause, so it can’t happen again, takes careful analysis. | This video covers AI forensics, building a single trustworthy timeline, and root cause analysis.' },
      { t: 'bullets', title: 'AI forensic techniques', layout: 'grid', cols: 2, items: [
          { icon: 'hash', h: 'Weight comparison', d: 'Hash and diff against approved versions', k: 'model' },
          { icon: 'database', h: 'Dataset diffing', d: 'What changed between versions', k: 'data' },
          { icon: 'target', h: 'Influence analysis', d: 'Which records shaped a behaviour', k: 'human' },
          { icon: 'bug', h: 'Backdoor scanning', d: 'Search for hidden triggers', k: 'threat' },
          { icon: 'list', h: 'Trace analysis', d: 'Prompts, plans, tool calls', k: 'neutral' },
          { icon: 'gear', h: 'Configuration history', d: 'Prompt, guardrail and tool changes', k: 'control' } ],
        say: 'AI forensics adds six techniques to the usual toolkit. | Weight comparison: hashing model files and comparing them with approved versions, and analysing how they differ. | Dataset diffing: finding exactly what changed between dataset versions. | Influence analysis: estimating which training records most shaped a particular behaviour. | Backdoor scanning: searching for hidden trigger inputs that change a model’s output. | Trace analysis: following prompts, plans and tool calls through agent sessions. | And configuration history: reviewing changes to prompts, guardrails and tools around the time of the incident.' },
      { t: 'timeline', title: 'One timeline from many sources', events: [
          { y: '09:02', h: 'Data pipeline', d: 'Vendor batch 117 ingested' },
          { y: '11:40', h: 'Registry', d: 'Model v4.2 approved and signed' },
          { y: '12:05', h: 'Deployment', d: 'v4.2 live for all users' },
          { y: '15:31', h: 'Gateway', d: 'First trigger phrase seen' },
          { y: '15:48', h: 'SOC', d: 'Alert raised; incident opened' } ],
        say: 'Investigations need a single timeline built from many sources, each normalised to universal time. | At two minutes past nine, the data pipeline log shows vendor batch one hundred and seventeen being ingested. | At eleven forty, the model registry records version four point two being approved and signed. | At five past twelve, the deployment system shows it going live for all users. | At three thirty-one, the gateway logs the first request containing the trigger phrase. | And at three forty-eight, the SOC raises an alert. Seen together, the sequence points straight at batch one hundred and seventeen.' },
      { t: 'flow', title: 'Root cause analysis',
        nodes: [
          { id: 'def', x: 230, y: 330, icon: 'flag', label: 'Define the problem', sub: 'what, where, impact', k: 'threat', w: 320 },
          { id: 'tl', x: 700, y: 330, icon: 'clock', label: 'Build the timeline', sub: 'all sources, UTC', k: 'neutral', w: 310 },
          { id: 'cf', x: 1200, y: 330, icon: 'split', label: 'Causal factors', sub: 'what allowed each step', k: 'human', w: 310 },
          { id: 'rc', x: 1200, y: 690, icon: 'target', label: 'Root causes', sub: 'technical and process', k: 'model', w: 300 },
          { id: 'ca', x: 700, y: 690, icon: 'tool', label: 'Corrective actions', sub: 'owners and dates', k: 'control', w: 320 },
          { id: 'vf', x: 230, y: 690, icon: 'check', label: 'Verify', sub: 'did the fix work?', k: 'data', w: 280 } ],
        edges: [{ from: 'def', to: 'tl', k: 'threat' }, { from: 'tl', to: 'cf', k: 'neutral' }, { from: 'cf', to: 'rc', k: 'human' }, { from: 'rc', to: 'ca', k: 'model' }, { from: 'ca', to: 'vf', k: 'control' }],
        steps: [
          { show: 'def', hi: 'def' },
          { show: 'tl def-tl', flow: 'def-tl', hi: 'tl' },
          { show: 'cf tl-cf', flow: 'tl-cf', hi: 'cf' },
          { show: 'rc cf-rc', flow: 'cf-rc', hi: 'rc', mark: { rc: 'alert' } },
          { show: 'ca rc-ca', flow: 'rc-ca', hi: 'ca' },
          { show: 'vf ca-vf', flow: 'ca-vf', hi: 'vf', mark: { vf: 'ok' } } ],
        say: 'Root cause analysis follows a disciplined path. Define the problem precisely: what happened, where, and with what impact. | Build the timeline from every source. | Identify causal factors: for each step, what allowed it to happen, and which control was missing or failed? | Find the root causes, both technical and in processes, such as no validation of vendor data, or no review of agent permissions. | Agree corrective actions with owners and dates. | And verify that the fixes actually work, rather than assuming they do.' },
      { t: 'compare', title: 'Proximate cause and root cause', labels: ['Poisoning', 'Agent exfiltration', 'Prompt leak'],
        cols: [{ h: 'Proximate cause', icon: 'alert', k: 'threat' }, { h: 'Root cause', icon: 'target', k: 'control' }],
        rows: [
          ['Bad vendor labels in training data', 'No validation or provenance checks on vendor data'],
          ['Agent obeyed a web page', 'Untrusted content not separated; email tool unrestricted'],
          ['System prompt held an API key', 'No standard for keeping secrets out of prompts'] ],
        say: 'The difference between proximate and root causes matters. | In a poisoning incident, the proximate cause is bad labels from a vendor. The root cause is that vendor data was never validated or traced to its source. | In an agent exfiltration incident, the proximate cause is that the agent obeyed a web page. The root causes are that untrusted content wasn’t separated from instructions, and the email tool had no restrictions. | And in a prompt leak, the proximate cause is an API key in the system prompt. The root cause is the absence of any standard for keeping secrets out of prompts.' },
      { t: 'summary', items: ['Add AI forensics: weights, datasets, influence, backdoors, traces, configs', 'Build one timeline from every source, in UTC', 'Find causal factors, then technical and process root causes', 'Fix root causes with owners, and verify'],
        say: 'To recap. | Add AI forensic techniques: weight comparison, dataset diffing, influence analysis, backdoor scanning, trace analysis and configuration history. | Build one timeline from every source, in universal time. | Identify causal factors, then the technical and process root causes behind them. | And fix the root causes, with owners and dates, and verify that the fixes work.' } ] },
    { type: 'text', md: `### AI forensics in practice
| Technique | What it shows | Limits |
|---|---|---|
| **Weight hashing and comparison** | Whether a model file matches its approved version; where weights differ | Shows that something changed, not always what behaviour it causes |
| **Dataset diffing** | Records added, removed or altered between versions | Needs versioned, hashed datasets (Module 3.3) |
| **Influence and attribution analysis** | Which training examples most affect a given output | Approximate and costly for large models; results are estimates |
| **Backdoor and trigger scanning** | Inputs that cause unusual, confident output changes | No method finds every backdoor; absence of findings isn’t proof |
| **Trace and log analysis** | The sequence of prompts, retrievals, plans and actions (Section 1) | Only as complete as the telemetry collected (Module 5.2) |
| **Configuration history** | Changes to prompts, guardrails, tools and parameters | Needs configuration as code (Module 5.1) |
| **Behavioural testing** | Reproducing the behaviour on the preserved model in a sandbox | Outputs may vary between runs; test many times |

Always work on **preserved copies** in an isolated environment, never on production, and record every analysis step so it can be repeated (Module 5.2).

### Building the timeline
- **Normalise time** to UTC and check clock offsets between sources.
- **Merge sources:** data pipeline logs, registry and deployment records, configuration changes, gateway and agent telemetry, identity logs, cloud audit logs and SOC alerts.
- **Mark confidence:** facts, inferences and gaps. Gaps (missing logs) are findings in their own right.
- **Keep it live:** update the timeline as evidence arrives, and keep it in the incident record.

### Root cause analysis methods
- **Five whys:** ask "why?" repeatedly until you reach a cause that, if fixed, prevents recurrence.
- **Fishbone (Ishikawa) diagrams:** group causes by category, such as data, model, people, process, technology and suppliers.
- **Causal factor charting and fault trees:** map the events and conditions that combined to cause the incident.
- **Blameless approach:** focus on systems and controls, not individuals, so people share what really happened.

Good root causes usually include a **process** element (why didn’t a control exist or work?), not just a technical one. Corrective actions should address both, with owners, dates and a way to verify them.` },
    { type: 'steps', title: 'Five whys for a leaked system prompt', items: [
      ['Why did the prompt leak?', 'A user asked the assistant to repeat its instructions in another language, and it complied.'],
      ['Why did that matter?', 'The system prompt contained an internal API key and pricing rules.'],
      ['Why was the key in the prompt?', 'Developers added it so the model could call a pricing service directly.'],
      ['Why wasn’t that caught?', 'No standard or review checked prompts for secrets before release.'],
      ['Root cause and fixes', 'Missing secrets standard for prompts: move calls server-side, rotate the key, add prompt scanning to the pipeline.'] ] },
    { type: 'callout', kind: 'exam', title: 'RCA questions', md: `Look for answers that reach a **root cause** (often a missing process or control), not just the proximate technical fault, and that build **one normalised timeline** from all sources. Remember the limits of AI forensics: influence analysis is approximate, and **no backdoor scan proves a model is clean**.` },
    { type: 'check', q: { q: 'An investigation finds that an agent leaked data because it followed instructions in an email. Which finding is the BEST statement of root cause?', o: ['The agent followed instructions contained in an incoming email message', 'No separation of untrusted content, and no limits on outbound tools', 'The attacker who wrote the email was particularly skilled and persistent', 'The model used by the agent was not the newest version available'], a: 1, b: 2,
      why: 'Root causes identify the design and control gaps that allowed the harm. Following the email is the proximate cause, the attacker’s skill isn’t fixable, and model version alone wouldn’t prevent injection.' } }
  ]
};
