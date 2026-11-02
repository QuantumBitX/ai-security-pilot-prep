/* 2.3 · Section 4: risk treatments and reassessment triggers */
module.exports = {
  title: 'Risk treatment and reassessment triggers', covers: [4, 5],
  blocks: [
    { type: 'video', title: 'Deciding what to do about it', kicker: 'Module 2.3 · Video 4 of 4', scenes: [
      { t: 'title', kicker: 'Module 2.3 · AI risk management', title: 'Deciding what to do about it', sub: 'Treating AI risks, accepting what remains, and knowing when to look again', icon: 'sliders',
        say: 'Once a risk is understood, someone has to decide what to do about it. And because AI systems change, that decision has a shelf life. | This video covers the four risk treatments, AI-specific examples, residual risk acceptance, and the events that should trigger a fresh assessment.' },
      { t: 'bullets', title: 'Four ways to treat a risk', layout: 'grid', cols: 2, items: [
          { icon: 'stop', h: 'Avoid', d: 'Don’t do it, or remove the risky capability', k: 'threat' },
          { icon: 'shield', h: 'Mitigate', d: 'Add controls that reduce likelihood or impact', k: 'control' },
          { icon: 'branch', h: 'Transfer or share', d: 'Insurance or contracts; accountability stays with you', k: 'data' },
          { icon: 'check', h: 'Accept', d: 'Formally retain the risk, within appetite, by an authorised owner', k: 'human' } ],
        say: 'There are four classic treatments. | Avoid: don’t proceed with the use case, or remove the capability that creates the risk, such as an agent’s ability to send external email. | Mitigate: add controls that reduce the likelihood or the impact. This is the most common choice. | Transfer or share: shift some financial consequences through insurance or contract terms, such as a vendor’s indemnity. But accountability to regulators and affected people stays with you. | And accept: formally retain the risk, when it is within appetite, through a documented decision by someone with the authority to make it.' },
      { t: 'compare', title: 'AI risks and typical mitigations', labels: ['Indirect prompt injection', 'Biased outcomes', 'Hallucinated advice', 'Silent vendor model change'],
        cols: [{ h: 'Mitigation', icon: 'shield', k: 'control' }, { h: 'Reduces', icon: 'target', k: 'neutral' }],
        rows: [
          ['Isolate retrieved content; limit tools; approve high-impact actions', 'Likelihood and impact'],
          ['Better data, bias testing, human review of adverse decisions', 'Likelihood'],
          ['Grounding, citations, abstention, human verification', 'Likelihood and impact'],
          ['Version pinning, notice clauses, regression tests', 'Likelihood'] ],
        say: 'Mitigations should target the specific risk. | Indirect prompt injection is reduced by isolating and filtering retrieved content, limiting the tools an agent can use, and requiring approval for high-impact actions, which cuts both likelihood and impact. | Biased outcomes are reduced with better data, bias testing and human review of adverse decisions. | Hallucinated advice is reduced by grounding answers in sources, requiring citations, allowing the system to abstain, and verifying high-stakes outputs. | And silent changes to a vendor’s model are reduced by pinning versions, contract clauses requiring notice, and regression testing before accepting updates.' },
      { t: 'chart', title: 'Inherent and residual risk', kind: 'bar', x: ['Injection', 'Leakage', 'Bias', 'Theft'], yMin: 0, yMax: 25, ticks: 5, yLabel: 'Risk score (likelihood × impact, 1–25)',
        series: [
          { n: 'Inherent', k: 'threat', v: [20, 20, 16, 10] },
          { n: 'Residual', k: 'control', v: [8, 6, 6, 5] } ],
        annot: [{ y: 9, text: 'Appetite', k: 'human', xi: 3.42 }],
        notes: [{ h: 'Inherent', d: 'The risk before controls.', k: 'threat' }, { h: 'Residual', d: 'What remains after controls. It is never zero.', k: 'control' }, { h: 'Appetite', d: 'Residual risk below the threshold can be accepted by the owner; above it, escalate or treat further.', k: 'human' }],
        steps: [{ s: [0] }, { s: [1] }, { a: [0] }],
        say: 'This chart shows four risks before controls, the inherent risk. | And after controls, the residual risk. Notice that residual risk is never zero. | The organisation’s risk appetite sets a threshold. Residual risk below it can be accepted by the risk owner. Anything above it must be treated further, or escalated to someone with more authority to accept it.' },
      { t: 'bullets', title: 'Reassessment triggers', layout: 'grid', cols: 2, items: [
          { icon: 'cycle', h: 'Model or version change', d: 'Retraining, fine-tuning, a provider update', k: 'model' },
          { icon: 'thermo', h: 'Drift beyond thresholds', d: 'Performance, fairness or behaviour', k: 'data' },
          { icon: 'bug', h: 'New vulnerability or technique', d: 'Disclosures, threat intelligence, research', k: 'threat' },
          { icon: 'siren', h: 'Incident or near miss', d: 'Here, or in a similar system elsewhere', k: 'threat' },
          { icon: 'target', h: 'Change in scope', d: 'New purpose, users, data, tools or autonomy', k: 'human' },
          { icon: 'gavel', h: 'Regulatory or contract change', d: 'New law, guidance or vendor terms', k: 'neutral' },
          { icon: 'calendar', h: 'Scheduled review', d: 'The backstop when nothing else fires', k: 'control' } ],
        say: 'A risk assessment is a snapshot, so define in advance what makes you look again. | Any change to the model: retraining, fine-tuning, or a provider updating the model behind the API. | Drift beyond agreed thresholds, in performance, fairness or behaviour. | A newly disclosed vulnerability or attack technique that applies to your system. | An incident or near miss, in your system or in a similar system elsewhere. | A change in scope: new purpose, new users, new data, new tools or more autonomy. | A change in law, regulatory guidance or the vendor’s terms. | And a scheduled review date, as a backstop when nothing else fires.' },
      { t: 'flow', title: 'From trigger to updated decision',
        nodes: [
          { id: 'tr', x: 200, y: 450, icon: 'bolt', label: 'Trigger', sub: 'detected or reported', k: 'threat', w: 250 },
          { id: 'tri', x: 540, y: 450, icon: 'filter', label: 'Triage', sub: 'does it change the risk?', k: 'neutral', w: 270 },
          { id: 'ra', x: 900, y: 450, icon: 'audit', label: 'Reassess', sub: 'scoped to the change', k: 'human', w: 260 },
          { id: 'up', x: 1300, y: 450, icon: 'list', label: 'Update', sub: 'register, tier, controls, approval', k: 'control', w: 320 } ],
        edges: [{ from: 'tr', to: 'tri', k: 'threat' }, { from: 'tri', to: 'ra', k: 'neutral' }, { from: 'ra', to: 'up', k: 'human' }],
        steps: [
          { show: 'tr', hi: 'tr' },
          { show: 'tri tr-tri', flow: 'tr-tri', hi: 'tri' },
          { show: 'ra tri-ra', flow: 'tri-ra', hi: 'ra' },
          { show: 'up ra-up', flow: 'ra-up', hi: 'up', note: { x: 120, y: 660, w: 1000, text: 'Wire triggers into change management, monitoring and threat intelligence, so they fire automatically.' } } ],
        say: 'When a trigger fires, the process is light, but it must be reliable. | First, triage: does this change the risk? A cosmetic interface change probably doesn’t; a new tool for the agent certainly does. | If it does, reassess, scoped to what changed rather than starting from scratch. | Then update the register, the tier, the controls and, if needed, the approval. The best programmes wire triggers into change management, monitoring and threat intelligence, so they fire automatically rather than relying on memory.' },
      { t: 'summary', items: ['Avoid, mitigate, transfer or share, accept', 'Match mitigations to the specific AI risk', 'Residual risk is accepted formally, within appetite', 'Define reassessment triggers and wire them in'],
        say: 'To recap. | The four treatments are avoid, mitigate, transfer or share, and accept. | Match each mitigation to the specific AI risk it addresses. | Residual risk is never zero, and must be accepted formally, within appetite, by someone with the authority to do so. | And define reassessment triggers in advance, connected to change management, monitoring and threat intelligence.' } ] },
    { type: 'text', md: `### Treatment options
ISO 31000 lists several ways to treat risk, which collapse into the four you will see on the exam:

| Treatment | Meaning | AI examples |
|---|---|---|
| **Avoid** | Decide not to start or continue the activity, or remove the source of risk | Don’t deploy emotion recognition for staff evaluation; remove an agent’s ability to execute payments |
| **Mitigate (reduce)** | Change the likelihood or the consequences | Input and output filtering, least-privilege tools, human approval, grounding, bias testing, monitoring, rate limits |
| **Transfer (share)** | Share consequences with another party | Cyber or AI liability insurance; vendor indemnities for IP claims; contractual SLAs with service credits |
| **Accept (retain)** | Knowingly retain the risk within appetite | Accept residual hallucination risk for an internal drafting tool with human review |

Two cautions on **transfer**. First, insurance and contracts move *financial* consequences, not **accountability**: regulators, courts and customers still hold the organisation responsible. Second, insurance policies may exclude or limit AI-related losses, so check coverage explicitly.

### Choosing mitigations
Good mitigations are **specific** to the risk scenario, **layered** (defence in depth), and **verified** (tested to show they work). For AI they often combine:
- **preventive controls** (access restrictions, input isolation, approval gates);
- **detective controls** (monitoring, anomaly detection, audit logging);
- **corrective controls** (rollback, kill switches, incident playbooks);
- **directive controls** (policies, training, acceptable use).

Cost matters. Use the safeguard value formula from Section 1: **ALE before − ALE after − annual cost of the control**. A control that costs more than the loss it prevents is hard to justify, unless law, safety or ethics requires it.

### Residual risk and formal acceptance
After treatment, **residual risk** remains. Accepting it is a governance act, not a default:
- the acceptor must have **authority** proportionate to the level of risk (set out in the risk appetite statement);
- acceptance is **documented**, with the rationale, conditions and compensating controls;
- it is **time-bound**, with a review date, and recorded in an exception or risk-acceptance register;
- it is **revisited** when triggers fire.

Risk can’t be accepted beyond legal limits: you can’t “accept” operating a prohibited AI practice.

### Reassessment triggers
| Trigger | Examples | Typical response |
|---|---|---|
| **Model updates** | Retraining, fine-tuning, provider version change, new system prompt | Regression and safety tests; scoped reassessment |
| **Behavioural or performance drift** | Accuracy, fairness or refusal rates cross thresholds | Investigate cause; retrain, recalibrate or roll back |
| **Vulnerability disclosures** | New jailbreak technique, CVE in an inference server, poisoned public dataset | Assess exposure using the inventory and AIBOM; patch or apply compensating controls |
| **Incidents and near misses** | Your own or a peer organisation’s | Root cause analysis; update controls and assessments |
| **Change in scope** | New users, purpose, data, tools, integrations or autonomy | Re-tier; reassess impact and blast radius |
| **External change** | New regulation or guidance; vendor terms or ownership change | Gap assessment against new requirements |
| **Time** | Scheduled review by tier | Confirm assessment still valid |

The reassessment should be **proportionate**: a minor change gets a quick check, a major change a full reassessment. What matters is that triggers are **defined in advance, owned, and connected** to the processes that detect them (change management, model registry, monitoring, threat intelligence and vendor management).`, },
    { type: 'match', title: 'Name the treatment', pairs: [
      ['Removing an agent’s permission to make payments', 'Avoid (remove the source)'],
      ['Adding output filtering and human review', 'Mitigate'],
      ['Negotiating a vendor indemnity for IP claims on model outputs', 'Transfer (share)'],
      ['An executive signs off residual hallucination risk for an internal tool, with a review date', 'Accept'] ] },
    { type: 'scenario', title: 'The quiet model update', md: `A hosted model provider announces that its “latest” model alias now points to a new version with improved reasoning. An insurer’s claims assistant uses that alias. The assistant’s risk assessment was completed nine months ago, and its next scheduled review is in three months.`,
      q: { q: 'What should the insurer do?', o: ['Wait for the scheduled review in three months, since the risk assessment is still within its validity period', 'Treat the change as a trigger: pin the old version if possible, test the new one, and reassess before switching', 'Accept the update automatically, since the provider has tested it and says the new version performs better', 'Switch to a different provider whose model aliases never change, and repeat the procurement process'], a: 1, b: 5,
        why: 'A model version change is a standard reassessment trigger. Pinning, testing and a scoped reassessment let the insurer adopt the improvement safely. Waiting or accepting blindly leaves unknown behaviour changes in a system that affects customers.' } },
    { type: 'check', q: { q: 'An organisation buys insurance to cover losses from AI-related errors. Which statement is MOST accurate?', o: ['The organisation is no longer accountable for the outcomes, because the insurer now carries that risk', 'Insurance shifts some financial consequences, but legal and regulatory accountability stay with the organisation', 'Insurance removes the need for other controls, provided the policy covers the full value of potential losses', 'Insurance is a form of risk avoidance, because it stops AI-related losses from reaching the organisation'], a: 1, b: 4,
      why: 'Risk transfer shares financial impact; it never transfers accountability to regulators, customers or affected people, and it doesn’t replace mitigation.' } }
  ]
};
