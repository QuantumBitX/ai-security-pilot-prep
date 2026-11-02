/* 5.6 · Section 5: safety regression testing prior to production reintroduction */
module.exports = {
  title: 'Safety regression testing before reintroduction', covers: [5],
  blocks: [
    { type: 'video', title: 'Proving it’s safe to return', kicker: 'Module 5.6 · Video 5 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.6 · Investigation and eradication', title: 'Proving it’s safe to return', sub: 'Safety regression testing before reintroduction', icon: 'shieldcheck',
        say: 'After an incident, there is pressure to bring the AI system back quickly. Bringing it back too early, with the weakness still there or a new problem introduced, can be worse than the original incident. | This video covers safety regression testing before an AI system returns to production.' },
      { t: 'bullets', title: 'What to test before reintroduction', layout: 'grid', cols: 2, items: [
          { icon: 'rollback', h: 'Incident replay', d: 'The attack that worked must now fail', k: 'threat' },
          { icon: 'shield', h: 'Security suites', d: 'Injection, jailbreak, leakage tests', k: 'control' },
          { icon: 'alert', h: 'Safety evaluations', d: 'Harmful content and refusals', k: 'human' },
          { icon: 'chart', h: 'Quality and accuracy', d: 'No unacceptable degradation', k: 'model' },
          { icon: 'scale', h: 'Fairness', d: 'Group metrics within tolerances', k: 'neutral' },
          { icon: 'robot', h: 'Agent permissions', d: 'Tools, scopes and approvals as designed', k: 'data' } ],
        say: 'Six kinds of test gate a return to production. | Incident replay: the exact attack, and close variants of it, must now fail. | Security suites: prompt injection, jailbreak and data leakage tests. | Safety evaluations: harmful content, and appropriate refusals. | Quality and accuracy: cleaning and retraining must not cause unacceptable degradation. | Fairness: group metrics must remain within their approved tolerances. | And agent permissions: tools, scopes and approval steps must work as designed.' },
      { t: 'chart', title: 'Attack success on the incident replay set', kind: 'bar', x: ['v3.1 (before)', 'v3.2 (incident)', 'v3.3 (fixed)'], yMin: 0, yMax: 80, ticks: 4, unit: '%', yLabel: 'Illustrative share of replayed attack prompts that succeed',
        series: [{ n: 'Attack success', k: 'threat', v: [4, 62, 1], ck: ['neutral', 'threat', 'control'] }],
        annot: [{ y: 5, text: 'Release threshold', k: 'control', xi: 0.5 }],
        steps: [{ s: [0] }, { a: [0] }],
        say: 'Here is an illustrative replay result. The incident version succumbed to sixty-two per cent of replayed attack prompts. The version before it, four per cent, and the fixed version, one per cent. | The release threshold, agreed before testing began, was five per cent. The fixed version passes, but only alongside the other suites: a model that blocks everything would pass this test and fail on quality.' },
      { t: 'flow', title: 'The reintroduction gate',
        nodes: [
          { id: 'b', x: 230, y: 330, icon: 'box', label: 'Fixed build', sub: 'signed, versioned', k: 'neutral', w: 280 },
          { id: 'auto', x: 700, y: 330, icon: 'check', label: 'Regression suites', sub: 'replay, security, quality', k: 'control', w: 320 },
          { id: 'rt', x: 1200, y: 330, icon: 'target', label: 'Red team retest', sub: 'try to break the fix', k: 'threat', w: 300 },
          { id: 'sh', x: 1200, y: 690, icon: 'eye', label: 'Shadow, then canary', sub: 'real traffic, limited', k: 'human', w: 310 },
          { id: 'mon', x: 700, y: 690, icon: 'chart', label: 'Tight monitoring', sub: 'lower thresholds', k: 'model', w: 300 },
          { id: 'ok', x: 230, y: 690, icon: 'pen', label: 'Sign-off', sub: 'owner, security, lead', k: 'data', w: 300 } ],
        edges: [{ from: 'b', to: 'auto', k: 'neutral' }, { from: 'auto', to: 'rt', k: 'control' }, { from: 'rt', to: 'sh', k: 'threat' }, { from: 'sh', to: 'mon', k: 'human' }, { from: 'mon', to: 'ok', k: 'model' }],
        steps: [
          { show: 'b', hi: 'b' },
          { show: 'auto b-auto', flow: 'b-auto', hi: 'auto' },
          { show: 'rt auto-rt', flow: 'auto-rt', hi: 'rt' },
          { show: 'sh rt-sh', flow: 'rt-sh', hi: 'sh' },
          { show: 'mon sh-mon', flow: 'sh-mon', hi: 'mon' },
          { show: 'ok mon-ok', flow: 'mon-ok', hi: 'ok', mark: { ok: 'ok' } } ],
        say: 'Here is a reintroduction gate. It starts with a fixed build: signed, versioned and recorded in the registry. | Automated regression suites run: incident replay, security, safety, quality and fairness. | Red teamers retest, actively trying to break the fix with new variants. | The system runs in shadow mode, then as a canary on a small share of real traffic. | Monitoring uses tighter thresholds than usual for several weeks. | And release needs sign-off from the model owner, security and the incident lead, based on the evidence.' },
      { t: 'compare', title: 'A normal release and a release after an incident', labels: ['Tests', 'Sign-off', 'Rollout', 'Monitoring'],
        cols: [{ h: 'Normal release', icon: 'flag', k: 'neutral' }, { h: 'After an incident', icon: 'siren', k: 'threat' }],
        rows: [
          ['Standard suites', 'Plus incident replay and red team retest'],
          ['Model owner', 'Model owner, security and incident lead'],
          ['Canary', 'Shadow first, then a cautious canary'],
          ['Normal thresholds', 'Tighter thresholds for weeks'] ],
        say: 'A release after an incident is stricter than a normal release. | Tests add incident replay and a red team retest to the standard suites. | Sign-off involves security and the incident lead, not just the model owner. | Rollout starts in shadow mode before a cautious canary. | And monitoring uses tighter thresholds for several weeks, because attackers often return to see whether the fix holds.' },
      { t: 'summary', items: ['Test replay, security, safety, quality, fairness and permissions', 'Set pass criteria before testing; compare with the old baseline', 'Red team retest, shadow, canary, tight monitoring', 'Make the replay set a permanent regression test'],
        say: 'To recap. | Before reintroduction, test incident replay, security, safety, quality, fairness and agent permissions. | Set pass criteria before testing, and compare results with the pre-incident baseline. | Add a red team retest, then shadow and canary deployment with tighter monitoring. | And add the incident’s attack cases to the permanent regression suite, so the same weakness can never quietly return.' } ] },
    { type: 'text', md: `### Safety regression testing
A **regression test** checks that a change hasn’t broken something that used to work. After an AI incident, regression testing has two jobs: proving the **fix works** (the attack now fails) and proving the fix **hasn’t harmed** anything else (safety, quality, fairness, functionality).

### Building the test plan
- **Incident replay set:** the original attack inputs, triggers and carrier content, plus variants (rephrased, translated, encoded, split across turns), run against the fixed system in a sandbox. Keep this set permanently in the regression suite.
- **Security suites:** prompt injection (direct and indirect), jailbreaks, data and system prompt leakage, tool misuse. Open-source tools such as garak, PyRIT and promptfoo can automate parts of this (Module 6.4).
- **Safety evaluations:** harmful content categories and refusal behaviour, including over-refusal of legitimate requests.
- **Quality and fairness:** task accuracy, groundedness and group metrics against the approved baselines and tolerances (Module 3.5).
- **Backdoor checks** for poisoning incidents: test the known trigger and look for other unusual trigger behaviour (Section 2).
- **Agent permission tests:** confirm tools, scopes, rate limits and approvals behave as designed (Module 4.6).

### Doing it rigorously
- **Agree pass criteria in advance,** with the model owner and security, so results aren’t interpreted to fit a deadline.
- **Test the whole system,** not just the model: prompts, guardrails, retrieval, tools and configuration, as they will run in production.
- **Allow for non-determinism:** run enough samples per test to give confidence, and compare with the pre-incident baseline.
- **Use independent testers** for the red team retest where possible, so the people who built the fix aren’t the only ones testing it.
- **Record the evidence** in the incident record, registry and model card, and update the risk register.

### Staged reintroduction
Use **shadow deployment** (the fixed system runs on real inputs without users seeing outputs), then a **canary** with a small share of traffic, automatic rollback triggers, and tighter monitoring thresholds for an agreed period (Modules 5.2 and 6.2). Only then restore full service. Attackers often return to test whether a fix holds, so keep detections for the original technique active.` },
    { type: 'scenario', title: 'Back by Friday', md: `After a jailbreak incident, an engineering team fixes a customer assistant’s guardrails on Wednesday and wants it back in full service by Friday. They have tested the fix against the five prompts used in the incident, and all were blocked. No other tests have been run, and the product manager says that "the fix clearly works".`,
      q: { q: 'What should the security lead require before full reintroduction?', o: ['Nothing more, because all five incident prompts were blocked by the new guardrails', 'Variant replay, full regression suites, a red team retest and a staged rollout', 'A written promise from the engineering team that the fix is complete', 'A delay of six months so that the assistant can be completely rebuilt'], a: 1, b: 5,
        why: 'Five exact prompts prove little: attackers use variants, and guardrail changes can break quality or cause over-refusal. Broader regression testing, an independent retest and staged rollout give real evidence. Promises aren’t evidence, and a six-month rebuild is disproportionate.' } },
    { type: 'callout', kind: 'exam', title: 'Reintroduction questions', md: `The best answers require **incident replay with variants**, **full regression** (security, safety, quality, fairness), **pass criteria set in advance**, an **independent retest** and **staged rollout with tighter monitoring**. Reintroducing after testing only the exact incident inputs, or under deadline pressure without evidence, is the classic wrong answer.` },
    { type: 'check', q: { q: 'Why should the incident’s attack cases be added permanently to the regression suite?', o: ['To make the regression suite larger, which always makes testing more accurate', 'So that future changes can’t quietly reintroduce the same weakness again', 'Because regulators require every attack to be stored in a test suite', 'So the attacker’s inputs can be shared publicly with other organisations'], a: 1, b: 5,
      why: 'Later model updates, prompt changes or guardrail tuning can reopen an old weakness. Keeping the replay set in every release’s tests catches that automatically.' } }
  ]
};
