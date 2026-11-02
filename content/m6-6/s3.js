/* 6.6 · Section 3: mitigation prioritisation based on risk, feasibility and business context */
module.exports = {
  title: 'Prioritising mitigations', covers: [3],
  blocks: [
    { type: 'video', title: 'Which fix first?', kicker: 'Module 6.6 · Video 3 of 6', scenes: [
      { t: 'title', kicker: 'Module 6.6 · Mitigations', title: 'Which fix first?', sub: 'Prioritising mitigations by risk, feasibility and business context', icon: 'flag',
        say: 'There are always more possible mitigations than time, money and people to build them. Prioritising well means getting the most risk reduction, soonest, without breaking the business. | This video covers how to prioritise mitigations by risk reduction, feasibility and business context.' },
      { t: 'matrix', title: 'Risk reduction and effort', rows: ['Large risk reduction', 'Small risk reduction'], cols: ['Hard to do', 'Easy to do'], xLabel: 'Feasibility', yLabel: 'Risk reduction',
        heat: true,
        items: [{ r: 0, c: 1, t: 'Do now: quick wins', k: 'control' }, { r: 0, c: 0, t: 'Plan and fund: strategic', k: 'human' }, { r: 1, c: 1, t: 'Do when convenient', k: 'model' }, { r: 1, c: 0, t: 'Defer or drop', k: 'neutral' }],
        say: 'Start by placing each candidate mitigation on two axes: how much risk it removes, and how feasible it is. | Large risk reduction and easy to do: these are quick wins, so do them now. | Large risk reduction but hard to do: plan and fund them as strategic work, with interim controls in the meantime. | Small risk reduction and easy: do them when convenient. | And small risk reduction, hard to do: defer or drop them, and record why.' },
      { t: 'bullets', title: 'What feasibility really means', layout: 'grid', cols: 2, items: [
          { icon: 'gear', h: 'Technical fit', d: 'Works with this architecture', k: 'neutral' },
          { icon: 'money', h: 'Cost', d: 'Build, run and compute overhead', k: 'model' },
          { icon: 'clock', h: 'Time', d: 'How long the exposure stays open', k: 'human' },
          { icon: 'users', h: 'Skills', d: 'People who can build and run it', k: 'data' },
          { icon: 'building', h: 'Vendor dependency', d: 'Needs a provider to act', k: 'threat' },
          { icon: 'chat', h: 'User impact', d: 'Friction, false refusals, delays', k: 'control' } ],
        say: 'Feasibility has six parts. | Technical fit: does the mitigation work with this architecture, or does it need a redesign? | Cost: not just building it, but running it, including extra compute for classifiers and judges. | Time: how long the exposure stays open while the fix is built. | Skills: whether you have people who can build and operate it. | Vendor dependency: whether it needs a provider to act, on their timetable. | And user impact: friction, false refusals and delays, which can quietly destroy the value of the product.' },
      { t: 'code', title: 'A mitigation plan', file: 'F-07-mitigation-plan.yaml',
        code: `finding: F-07 (P1) injected email -> refunds
interim: refund tool off for the agent (today)
m1: human approval for every refund (2 days)
m2: plan-then-execute redesign (3 weeks)
m3: isolate email content as data (1 week)
m4: tune injection classifier (ongoing)
residual: low after m1 and m3; CFO accepts
review: 30 days after m2 goes live`,
        hl: [null, [1, 2], [3, 3], [4, 5], [6, 6], [7, 8]],
        notes: [
          { h: 'A plan, not a single fix', d: 'Layers, in a deliberate order.' },
          { h: 'Interim control first', d: 'Close the exposure today.', k: 'threat' },
          { h: 'Quick win', d: 'Large risk reduction, easy to do.', k: 'control' },
          { h: 'Strategic fixes', d: 'Address the root cause.', k: 'model' },
          { h: 'Supporting control', d: 'Useful, but not relied on alone.', k: 'neutral' },
          { h: 'Residual risk, owned', d: 'Accepted by the right person; reviewed.', k: 'human' } ],
        say: 'Here is a prioritised plan for finding F-07, where injected email text could trigger refunds. It is a plan, not a single fix. | First, an interim control closes the exposure today: the refund tool is switched off for the agent. | The quick win comes next: human approval for every refund, in two days. | Then the strategic fixes address the root cause: isolating email content as data within a week, and redesigning the agent as plan-then-execute over three weeks. | Classifier tuning continues as a supporting control, useful but never relied on alone. | And the residual risk is stated, accepted by the person who owns it, here the CFO, with a review date.' },
      { t: 'summary', items: ['Weigh risk reduction against feasibility', 'Feasibility: fit, cost, time, skills, vendors, user impact', 'Close exposure now with interim controls', 'Record decisions; residual risk needs an owner'],
        say: 'To recap. | Weigh how much risk each mitigation removes against how feasible it is. | Judge feasibility by technical fit, cost, time, skills, vendor dependency and user impact. | Close the exposure now with interim controls, while strategic fixes are built. | And record every decision, with an owner who accepts the residual risk.' } ] },
    { type: 'text', md: `### Prioritisation factors
| Factor | Questions |
|---|---|
| **Risk reduction** | How much does it lower likelihood or impact for the findings it addresses? Does it fix the root cause or a symptom? Does it cover several findings at once? |
| **Feasibility** | Technical fit, build and running cost (including compute), time to deliver, skills, and dependence on vendors |
| **Business context** | Risk appetite, launch dates, customer and revenue impact, contractual commitments, and the product’s value if the control adds friction |
| **Regulatory drivers** | Deadlines and duties, such as EU AI Act obligations for high-risk or general-purpose AI, or data protection requirements |
| **Side effects** | False refusals, latency, reduced capability, new attack surface |

### Building the plan
- **Interim controls first:** when a serious finding can’t be fixed quickly, contain it now by disabling a tool, adding human approval, narrowing access or tightening limits (Module 5.5).
- **Quick wins, then strategic fixes:** take cheap, high-value steps immediately, and fund root-cause fixes, such as redesigning an agent, as planned work.
- **Layer controls:** avoid relying on a single mitigation, especially a probabilistic one such as a classifier.
- **Group by root cause:** one architectural fix can close many findings, which often makes it the best value even if it is harder.

### Risk treatment and acceptance
Every finding ends in a recorded **treatment decision**, in line with risk management standards such as ISO/IEC 27005 and ISO/IEC 42001: **modify** the risk with mitigations, **avoid** it by not doing the risky thing (for example, removing a capability), **share** it, for example through contracts or insurance, or **retain** it. Retained and residual risk must be **accepted by an owner with the authority to do so**, within the risk appetite, and given a **review date** (Module 2.3). If the residual risk exceeds the appetite and no interim control exists, the right answer may be **not to launch**.` },
    { type: 'scenario', title: 'The four-month fix', md: `A red team finds that a customer-facing agent can be steered into revealing other customers’ order histories. The root-cause fix, rebuilding retrieval with per-user permissions, will take four months. Launch is planned for next week, and the product director wants to launch on time and fix it later.`,
      q: { q: 'What is the BEST way forward?', o: ['Launch on time, and schedule the four-month fix for after the launch', 'Apply interim controls that close the exposure now, then fund the full fix', 'Cancel the product, since no AI system can ever be fully secured anyway', 'Launch on time, but add a disclaimer telling customers not to ask for data'], a: 1, b: 3,
        why: 'Exposing customers’ data is outside any reasonable risk appetite, so the exposure must be closed before launch, for example by removing order history from the agent’s reach until per-user permissions exist. The root-cause fix then follows as planned work. Launching exposed, cancelling outright or relying on a disclaimer are all poor choices.' } },
    { type: 'callout', kind: 'exam', title: 'Prioritisation questions', md: `The best answers **contain serious exposure immediately** with interim controls, take **quick wins** next, and **plan root-cause fixes**, weighing **risk reduction against feasibility and business context**. Residual risk is **accepted by an accountable owner** within appetite, with a review date. "Launch now, fix later" for a serious, exploitable flaw is a trap.` },
    { type: 'check', q: { q: 'Two mitigations are proposed for the same risk: a classifier that blocks 80% of attacks, live in a day, and an architectural change that removes the attack path, live in six weeks. What is the BEST plan?', o: ['Deploy the classifier only, since 80% protection arriving in a day is good enough', 'Deploy the classifier now as an interim layer, and build the architectural fix', 'Build only the architectural fix, leaving the system exposed for six weeks', 'Do neither, since the two options can’t both be afforded within the budget'], a: 1, b: 3,
      why: 'Layering a quick interim control with the root-cause fix reduces risk immediately and removes the attack path later. Relying on the classifier alone leaves residual risk, and waiting six weeks leaves the system exposed.' } }
  ]
};
