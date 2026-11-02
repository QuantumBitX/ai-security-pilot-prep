/* 6.6 · Section 5: continuous monitoring for residual risks */
module.exports = {
  title: 'Monitoring residual risk', covers: [5],
  blocks: [
    { type: 'video', title: 'The risk that remains', kicker: 'Module 6.6 · Video 5 of 6', scenes: [
      { t: 'title', kicker: 'Module 6.6 · Mitigations', title: 'The risk that remains', sub: 'Continuous monitoring for residual risk', icon: 'eye',
        say: 'After every mitigation, some risk remains. With AI, that residual risk doesn’t stay still: models are updated, attackers publish new techniques, and agents gain new tools. Risk that was acceptable last quarter may not be acceptable today. | This video covers continuous monitoring for residual risk.' },
      { t: 'bullets', title: 'Signals of residual risk', layout: 'grid', cols: 2, items: [
          { icon: 'filter', h: 'Guardrail activity', d: 'Block rates and near misses', k: 'control' },
          { icon: 'attacker', h: 'Attack attempts', d: 'Detections and patterns in logs', k: 'threat' },
          { icon: 'cycle', h: 'Scheduled testing', d: 'Automated red teaming on a timer', k: 'model' },
          { icon: 'key', h: 'Production canaries', d: 'Honeytokens that should never fire', k: 'data' },
          { icon: 'globe', h: 'Threat intelligence', d: 'New techniques and incidents', k: 'neutral' },
          { icon: 'megaphone', h: 'User reports', d: 'Feedback and bug bounty', k: 'human' } ],
        say: 'Six kinds of signal show how residual risk is moving. | Guardrail activity: block rates and near misses, and sudden changes in either. | Attack attempts: detections and suspicious patterns in logs, as Domain 5 described. | Scheduled testing: automated red teaming that reruns the regression suite and new techniques on a timer. | Production canaries: honeytokens and canary records that should never appear in an output or a request. If one fires, something is wrong. | Threat intelligence: newly published techniques, and incidents at other organisations. | And user reports, from in-product feedback to bug bounty submissions.' },
      { t: 'cycle', title: 'The residual risk loop', center: 'Residual', centerSub: 'owned and watched', intro: 'Accepted risk is reviewed, not forgotten.',
        stages: [
          { icon: 'pen', label: 'Accept', d: 'Owner signs, within appetite.' },
          { icon: 'chart', label: 'Monitor', d: 'Key risk indicators.' },
          { icon: 'alert', label: 'Detect change', d: 'Thresholds and triggers.' },
          { icon: 'search', label: 'Reassess', d: 'Re-test and re-rate.' },
          { icon: 'shield', label: 'Treat', d: 'New or tuned mitigations.' },
          { icon: 'calendar', label: 'Review', d: 'Scheduled, even if quiet.' } ],
        say: 'Residual risk moves through a loop. | Accept: an owner with authority signs off the remaining risk, within the risk appetite. | Monitor: key risk indicators track it, such as attack success in scheduled tests. | Detect change: thresholds and triggers flag when an indicator moves, or when something changes, such as a model update or a new tool. | Reassess: re-test, and re-rate the risk. | Treat: add or tune mitigations if the risk has grown. | And review on a schedule, even when everything looks quiet, because acceptance should expire rather than last forever.' },
      { t: 'timeline', title: 'Residual risk that grew', events: [
          { y: 'Month 0', h: 'Accepted', d: 'Injection risk at 2% in tests, signed off' },
          { y: 'Month 2', h: 'New technique', d: 'A multi-turn method is published' },
          { y: '+3 days', h: 'KRI breached', d: 'Scheduled tests show 11%' },
          { y: '+1 week', h: 'Treated', d: 'New mitigation, new regression cases' },
          { y: 'Month 3', h: 'Back in appetite', d: '1.5%; acceptance renewed' } ],
        say: 'Here is residual risk that grew, and was caught. | In month zero, an injection risk is accepted at a two per cent success rate in testing, with an owner and a review date. | In month two, researchers publish a new multi-turn technique. | Three days later, the scheduled tests include it, and attack success jumps to eleven per cent, breaching the key risk indicator threshold. | Within a week, the team adds a new mitigation, and new cases join the regression suite. | By month three, the rate is back to one and a half per cent, and the owner renews the acceptance. Without monitoring, the eleven per cent would have been found by an attacker instead.' },
      { t: 'summary', items: ['Residual risk changes as models, tools and attackers change', 'Watch guardrails, attacks, scheduled tests, canaries, intel, reports', 'Set KRIs with thresholds and triggers for reassessment', 'Acceptance has an owner and an expiry date'],
        say: 'To recap. | Residual risk changes as models, tools and attackers change. | Watch guardrail activity, attack attempts, scheduled tests, production canaries, threat intelligence and user reports. | Set key risk indicators with thresholds, and triggers that force reassessment. | And make sure every acceptance has an owner, and an expiry date.' } ] },
    { type: 'text', md: `### Residual risk
**Residual risk** is the risk left after mitigations (Module 2.3). It is recorded in the risk register with its owner, the rationale for accepting it, the controls it depends on, and a review date. For AI, residual risk drifts because the system and the threat landscape keep changing.

### Key risk indicators
| Indicator | Example threshold | Action when breached |
|---|---|---|
| **Attack success in scheduled tests** | Above 5% for any high-severity category | Reassess; treat; gate releases |
| **Guardrail block rate** | Doubles week on week, or falls sharply after an update | Investigate an attack campaign or a broken filter |
| **Canary or honeytoken hits** | Any hit | Treat as a potential incident (Module 5.5) |
| **Agent action anomalies** | Tool calls far above baseline | Throttle or pause the agent (Module 5.7) |
| **False refusal rate** | Above the agreed level | Retune, so the control isn’t switched off |
| **Open findings past deadline** | Any P1 past its date | Escalate to the risk owner |

### Triggers for reassessment
- **Changes:** model or provider updates, fine-tuning, new tools, data sources or permissions, and major prompt or guardrail changes (Module 6.2).
- **Threats:** new techniques, new ATLAS case studies, and incidents involving similar systems (Module 6.1).
- **Signals:** a breached indicator, a canary hit, or a credible user or bug bounty report.
- **Time:** scheduled reviews, even when all is quiet; acceptance should expire, not roll over silently.

### Continuous validation
- Run **automated red teaming on a schedule** in a production-equivalent environment, including new techniques as they are published (Module 6.4).
- Place **canaries and honeytokens** in production data, prompts and tools, so misuse reveals itself.
- Feed confirmed issues back into the **regression suite** and the **threat model**, closing the loop between monitoring, testing and mitigation.
- Report residual risk trends to leadership alongside other key risks, in the same language and scales (Module 6.5).` },
    { type: 'match', title: 'Signal and response', pairs: [
      ['A canary customer record appears in an assistant’s output', 'Treat as a potential incident and investigate'],
      ['A new jailbreak technique is published by researchers', 'Add it to scheduled tests and reassess the risk'],
      ['Guardrail block rates fall sharply after a provider update', 'Check whether the filter still works'],
      ['An accepted risk reaches its review date with no incidents', 'Review and renew, adjust or close it'],
      ['False refusals climb after a new safety control', 'Retune, so that the control isn’t abandoned'] ] },
    { type: 'callout', kind: 'exam', title: 'Residual risk questions', md: `Residual risk is **owned, accepted within appetite, monitored and reviewed**. Expect the best answers to use **key risk indicators with thresholds**, **scheduled automated testing**, **canaries**, and **triggers** such as model updates or newly published techniques. "Accepted once, never revisited" is a trap.` },
    { type: 'check', q: { q: 'An organisation accepted a residual prompt injection risk six months ago. Since then, the model provider has updated the model twice and the agent has gained two new tools. What should happen?', o: ['Nothing, because the risk was formally accepted by its owner six months ago', 'Reassess: re-run the tests on the current system, re-rate it, renew or treat', 'Remove the two new tools, since adding tools always invalidates acceptance', 'Ask the provider to confirm that its updates didn’t affect the risk level'], a: 1, b: 5,
      why: 'Model updates and new tools are triggers for reassessment. Re-testing the current system shows whether the accepted risk still holds, so the owner can renew, adjust or treat it.' } }
  ]
};
