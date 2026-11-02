/* 1.3 · Section 6: operational modes, HITL vs automated execution */
module.exports = {
  title: 'Operational modes: human in the loop or automated?', covers: [5],
  blocks: [
    { type: 'video', title: 'Who decides: person or machine?', kicker: 'Module 1.3 · Video 6 of 6', scenes: [
      { t: 'title', kicker: 'Module 1.3 · Limitations and performance', title: 'Who decides: person or machine?', sub: 'Human in the loop, on the loop, and fully automated', icon: 'hitl',
        say: 'Given everything we know about AI’s limits, how much should we let it decide on its own? | This video covers the operational modes for AI decisions, how to choose between them, and how to keep human oversight from becoming a rubber stamp.' },
      { t: 'bullets', title: 'Three operational modes', items: [
          { icon: 'hitl', h: 'Human in the loop (HITL)', d: 'The AI recommends; a person approves each decision before it takes effect', k: 'human' },
          { icon: 'eye', h: 'Human on the loop (HOTL)', d: 'The AI acts; people monitor and can intervene or override', k: 'model' },
          { icon: 'robot', h: 'Automated execution', d: 'No person reviews individual decisions; people set policy and audit', k: 'neutral' } ],
        say: 'There are three main operational modes. | With a human in the loop, the AI recommends and a person approves each decision before it takes effect. A credit analyst signing off a loan decision is the classic example. | With a human on the loop, the AI acts on its own while people monitor it and can step in, override or stop it, like a security team watching an automated blocking system. | With automated execution, no person reviews individual decisions. People still set policies, thresholds and limits, and audit results in aggregate, as with spam filtering.' },
      { t: 'matrix', title: 'Choosing the mode', rows: ['High impact', 'Low impact'], cols: ['Easy to reverse', 'Hard to reverse'], xLabel: 'Reversibility', yLabel: 'Impact on people',
        heat: true,
        items: [{ r: 0, c: 1, t: 'Human in the loop', k: 'human' }, { r: 0, c: 0, t: 'Human on the loop', k: 'model' }, { r: 1, c: 1, t: 'Human on the loop', k: 'model' }, { r: 1, c: 0, t: 'Automate and audit', k: 'control' }],
        say: 'How do you choose? Two questions do most of the work: how much impact does the decision have on people, and how easily can it be reversed? | High impact and hard to reverse, such as denying a benefit, firing an employee or deleting production data, calls for a human in the loop. | High impact but easy to reverse, such as temporarily holding a suspicious payment, can run with a human on the loop. | Low impact but hard to reverse still deserves monitoring, with a human on the loop. | And low impact, easily reversed decisions, such as routing a support ticket, can be automated and audited. Confidence, volume, regulation and the maturity of the model then fine-tune the choice.' },
      { t: 'flow', title: 'Routing by confidence and impact',
        nodes: [
          { id: 'in', x: 200, y: 520, icon: 'doc', label: 'Case arrives', k: 'neutral', w: 240 },
          { id: 'ai', x: 560, y: 520, icon: 'model', label: 'Model', sub: 'decision plus confidence', k: 'model', w: 270 },
          { id: 'rt', x: 940, y: 520, icon: 'split', label: 'Routing rules', sub: 'confidence × impact', k: 'control', w: 270 },
          { id: 'auto', x: 1350, y: 300, icon: 'bolt', label: 'Automatic action', sub: 'confident and low impact', k: 'neutral', w: 300 },
          { id: 'hum', x: 1350, y: 740, icon: 'user', label: 'Human review', sub: 'uncertain or high impact', k: 'human', w: 300 } ],
        edges: [{ from: 'in', to: 'ai', k: 'data' }, { from: 'ai', to: 'rt', k: 'model' }, { from: 'rt', to: 'auto', k: 'control' }, { from: 'rt', to: 'hum', k: 'human' }],
        steps: [
          { show: 'in ai in-ai', flow: 'in-ai', hi: 'ai' },
          { show: 'rt ai-rt', flow: 'ai-rt', hi: 'rt' },
          { show: 'auto rt-auto', flow: 'rt-auto', hi: 'auto' },
          { show: 'hum rt-hum', flow: 'rt-hum', hi: 'hum' },
          { hi: 'rt', note: { x: 110, y: 690, w: 560, text: 'Confidence routing only works if the model is calibrated.' } } ],
        say: 'Many systems mix the modes. A case arrives and the model produces a decision with a confidence score. | Routing rules combine confidence with the impact of the decision. | Confident, low-impact cases are actioned automatically, with a random sample audited by people. | Uncertain or high-impact cases go to a person, who sees the evidence behind the recommendation and has real authority to override it. | Remember Section 1: this only works if the model’s confidence is calibrated. An overconfident model routes its worst mistakes straight past the humans.' },
      { t: 'bullets', title: 'When oversight becomes a rubber stamp', items: [
          { icon: 'check', h: 'Automation bias', d: 'People defer to the machine, even when it is wrong', k: 'threat' },
          { icon: 'clock', h: 'No time to think', d: 'Hundreds of reviews an hour leaves seconds each', k: 'human' },
          { icon: 'eye', h: 'No evidence to judge', d: 'The reviewer sees the verdict but not the reasons', k: 'neutral' },
          { icon: 'gavel', h: 'No real authority', d: 'Overriding is discouraged, slow or penalised', k: 'model' } ],
        say: 'A human in the loop only helps if the human genuinely decides. Oversight degrades into a rubber stamp in four common ways. | Automation bias: people tend to defer to automated recommendations, even when they have evidence the machine is wrong. | No time to think: a reviewer handling hundreds of cases an hour has seconds for each. | No evidence: the reviewer sees the verdict but not the information behind it, so there is nothing to disagree with. | And no real authority: overriding the system is discouraged, slow, or counts against the reviewer.' },
      { t: 'bullets', title: 'Making oversight meaningful', items: [
          { icon: 'doc', h: 'Show the evidence', d: 'Reasons, sources and confidence alongside the recommendation', k: 'data' },
          { icon: 'cap', h: 'Train and empower reviewers', d: 'Competence, time, and the authority to say no', k: 'human' },
          { icon: 'chart', h: 'Measure overrides', d: 'Near-zero suggests rubber-stamping; very high suggests a poor model', k: 'control' },
          { icon: 'stop', h: 'Keep a stop button', d: 'Anyone overseeing can halt the system safely', k: 'threat' } ],
        say: 'Here is how to make oversight real. | Show the evidence: the reasons, sources and confidence behind each recommendation, not just a verdict. | Train reviewers, give them enough time, and make sure they have the authority to say no. | Measure override rates. A rate near zero suggests rubber-stamping; a very high rate suggests the model isn’t fit for purpose. Both deserve investigation. | And keep a stop button: overseers must be able to halt the system safely. The EU AI Act requires exactly these capabilities for high-risk systems, including awareness of automation bias and the ability to interrupt the system.' },
      { t: 'summary', items: ['HITL approves each decision; HOTL monitors and intervenes', 'Choose by impact and reversibility, then confidence', 'Beware automation bias and rubber-stamping', 'Evidence, authority, override metrics and a stop button'],
        say: 'To recap. | With a human in the loop, a person approves each decision; on the loop, people monitor and intervene; automated execution relies on policy and audit. | Choose the mode by impact and reversibility first, then by confidence, volume and regulation. | Beware automation bias and rubber-stamping. | And make oversight meaningful with evidence, trained and empowered reviewers, override metrics and a stop button.' } ] },
    { type: 'text', md: `### The modes in more detail
| Mode | Who decides each case | Typical uses | Main risk |
|---|---|---|---|
| **Human in the loop (HITL)** | A person, after reviewing the AI’s recommendation | Credit and benefit decisions, medical diagnosis support, high-value payments, agent actions with external effect | Rubber-stamping; slow throughput |
| **Human on the loop (HOTL)** | The AI, under real-time human supervision with power to intervene | Automated threat blocking, fraud holds, content moderation queues, agents acting within limits | Monitoring fatigue; intervention too late |
| **Automated execution** (human out of the loop) | The AI, within policies and limits set by people | Spam filtering, ticket routing, low-value recommendations | Unnoticed systematic errors |

Some frameworks also describe **human in command**: people retain overall control over whether, when and how a system is used, including the decision to switch it off. This applies whatever the per-decision mode.

### Choosing the mode
Start with two questions:
1. **Impact:** how badly can a wrong decision affect people, money, safety or rights?
2. **Reversibility:** can a wrong decision be undone quickly and completely?

Then refine with:
- **Confidence and calibration:** can the model reliably tell when it might be wrong?
- **Volume and speed:** can people realistically review every case, and does the decision need to happen faster than a person can act (for example, blocking malware in milliseconds)?
- **Regulation:** some decisions legally require human involvement.
- **Maturity:** a new model usually starts with more oversight and earns autonomy as evidence of performance builds up.

### A progression towards autonomy
Organisations rarely jump straight to automation. A common progression is:
1. **Shadow mode:** the model runs on live cases but takes no action; its decisions are compared with human decisions.
2. **Assist mode:** the model recommends; people decide every case (HITL).
3. **Supervised automation:** the model acts on confident, low-impact cases; people handle the rest and monitor (HOTL).
4. **Automated execution:** the model acts within limits; people audit samples and aggregate metrics.

Each step should be a governed decision with agreed criteria, such as accuracy on recent cases, override rates and incident history, and each step should be reversible if monitoring shows problems.

### What the law says
- **GDPR Article 22** gives people the right not to be subject to a decision based *solely* on automated processing that produces legal or similarly significant effects, subject to exceptions. Where such decisions are allowed, safeguards include the right to obtain human intervention, to express a point of view and to contest the decision. A token human who rubber-stamps every output does not make a decision any less “solely automated”.
- **EU AI Act Article 14** requires high-risk AI systems to be designed for effective human oversight, proportionate to the risks and the system’s level of autonomy. The people overseeing a system must be able to understand its capabilities and limitations, monitor its operation, **remain aware of automation bias**, correctly interpret its output, decide not to use it or to override or reverse its output, and **interrupt it through a stop button or similar procedure**. For certain remote biometric identification systems, a match must be separately verified by at least two people before action is taken.

### Agents raise the stakes
Agents (Module 1.2) take actions rather than give answers, often many per minute. Apply the same logic per *action*: reading a calendar can be automated; sending an external email might run on the loop; making a payment, deleting data or changing access rights should require approval. Domain 4 covers how to enforce this in the orchestration layer.`, },
    { type: 'tabs', title: 'Which mode would you choose?', items: [
      ['Blocking known malware', '**Automated execution, audited.** Decisions are needed in milliseconds, volumes are huge, and a wrongly quarantined file can be restored. Monitor false-positive reports and sample decisions.'],
      ['Holding a suspicious payment', '**Human on the loop.** Holding the payment for a few hours is reversible and limits loss. Analysts review holds promptly and release or confirm them.'],
      ['Denying a mortgage application', '**Human in the loop.** The decision has significant effects on a person and is subject to legal safeguards. The model informs; a trained underwriter decides, with the evidence in front of them.'],
      ['Agent deleting cloud resources', '**Human in the loop for each deletion.** Deletion is hard to reverse and can cause outages. The agent can propose a clean-up plan; a person approves the specific actions.'],
      ['Routing support tickets', '**Automated execution.** Low impact, easy to correct, high volume. Track misroutes and retrain when they rise.'] ] },
    { type: 'callout', kind: 'exam', title: 'Spotting the right answer', md: `When a scenario involves **significant effects on people** and **hard-to-reverse** outcomes, the best answer usually adds meaningful human review, not just *any* human. Look for options that give reviewers **evidence, time and authority**. Options that keep a human but add volume targets, hide the model’s reasoning or penalise overrides are traps.` },
    { type: 'scenario', title: 'The 99.8% approval rate', md: `An insurer uses a model to recommend whether claims should be paid. A claims handler must approve every recommendation before it takes effect. An audit finds that handlers accept 99.8% of recommendations, spending an average of eight seconds on each, and that handlers who overturned recommendations were flagged for “slow processing”.`,
      q: { q: 'What is the MOST significant problem, and the BEST fix?', o: ['The model is too accurate, so handlers disengage; deliberately reduce its accuracy so that humans stay alert', 'Oversight has become a rubber stamp; give handlers evidence, time and freedom to override, and monitor overrides', 'Remove the human step entirely, since handlers add no value and only slow down decisions that the model gets right', 'Add a second handler to approve every case in eight seconds, so that two people sign off every decision'], a: 1, b: 5,
        why: 'The pattern shows automation bias reinforced by incentives against overriding. The fix is to make oversight meaningful: evidence, time, authority and monitoring. Removing the human may also breach legal requirements for decisions with significant effects, and a second rushed reviewer adds cost without adding judgement.' } },
    { type: 'check', q: { q: 'An AI system acts on its own, while a team monitors its decisions in real time and can intervene, override or stop it. Which operational mode is this?', o: ['Human in the loop', 'Human on the loop', 'Shadow mode', 'Human out of the loop with no monitoring'], a: 1, b: 5,
      why: 'Human on the loop means the system acts autonomously under supervision, with people able to intervene. Human in the loop would require approval before each decision takes effect.' } }
  ]
};
