/* 6.6 · Section 4: mitigation validation via regression testing */
module.exports = {
  title: 'Validating mitigations with regression testing', covers: [4],
  blocks: [
    { type: 'video', title: 'Prove the fix works, and keeps working', kicker: 'Module 6.6 · Video 4 of 6', scenes: [
      { t: 'title', kicker: 'Module 6.6 · Mitigations', title: 'Prove the fix works, and keeps working', sub: 'Validating mitigations with regression testing', icon: 'check',
        say: 'A mitigation isn’t finished when it is deployed. It is finished when testing shows it works, without breaking the product, and when tests will catch it if it stops working. With AI, things stop working more often than you might think. | This video covers validating mitigations through regression testing.' },
      { t: 'flow', title: 'From finding to regression test',
        nodes: [
          { id: 'f', x: 230, y: 330, icon: 'doc', label: 'Finding', sub: 'reproduction package', k: 'neutral', w: 290 },
          { id: 'case', x: 700, y: 330, icon: 'list', label: 'Test case', sub: 'same conditions, many runs', k: 'data', w: 320 },
          { id: 'var', x: 1200, y: 330, icon: 'copy', label: 'Variants', sub: 'held out from tuning', k: 'model', w: 300 },
          { id: 'ben', x: 1200, y: 690, icon: 'users', label: 'Benign set', sub: 'normal requests', k: 'human', w: 280 },
          { id: 'run', x: 700, y: 690, icon: 'gear', label: 'Run the suite', sub: 'after every change', k: 'control', w: 300 },
          { id: 'gate', x: 230, y: 690, icon: 'stop', label: 'Release gate', sub: 'blocks regressions', k: 'threat', w: 290 } ],
        edges: [{ from: 'f', to: 'case', k: 'neutral' }, { from: 'case', to: 'var', k: 'data' }, { from: 'var', to: 'ben', k: 'model' }, { from: 'ben', to: 'run', k: 'human' }, { from: 'run', to: 'gate', k: 'control' }],
        steps: [
          { show: 'f', hi: 'f' },
          { show: 'case f-case', flow: 'f-case', hi: 'case' },
          { show: 'var case-var', flow: 'case-var', hi: 'var' },
          { show: 'ben var-ben', flow: 'var-ben', hi: 'ben' },
          { show: 'run ben-run', flow: 'ben-run', hi: 'run' },
          { show: 'gate run-gate', flow: 'run-gate', hi: 'gate', mark: { gate: 'lock' } } ],
        say: 'Every confirmed finding becomes a regression test. It starts from the finding’s reproduction package. | The test case repeats the original conditions, many times, so it measures a success rate. | Variants test whether the fix generalises, rather than just blocking the exact input that was reported. Keep some variants out of any tuning, so they stay a fair test. | A benign set of normal requests checks that the fix hasn’t broken legitimate use. | The whole suite runs after every change: model updates, prompt edits, guardrail changes and new tools. | And a release gate blocks any change that pushes a result past its threshold.' },
      { t: 'chart', title: 'A regression caught by the gate', kind: 'bar', x: ['Release 1', 'Release 2', 'Release 3', 'Release 4'], yMin: 0, yMax: 35, ticks: 7, unit: '%', yLabel: 'Illustrative results for the F-07 test suite', legend: true,
        series: [{ n: 'Attack success rate', k: 'threat', v: [31, 2, 9, 1.5] }, { n: 'Benign requests refused', k: 'control', v: [1, 1.4, 1.2, 1.3] }],
        annot: [{ y: 5, text: 'Release gate: 5%', k: 'human', xi: 0.05 }],
        steps: [{ s: [0] }, { a: [0] }, { s: [1] }],
        say: 'Here is the suite at work. Before the fix, in release one, the attack succeeded thirty-one per cent of the time. The fix in release two brought it down to two per cent. Then a provider model update in release three pushed it back up to nine per cent. | The release gate is set at five per cent, so release three was blocked automatically, before customers saw it, and the team re-tuned the mitigation for release four. | Meanwhile, refusals of ordinary requests stayed close to one per cent, so the fix protected users without getting in their way.' },
      { t: 'compare', title: 'Two questions for every fix', labels: ['Measure', 'Pass when', 'Watch for'],
        cols: [{ h: 'Does it stop attacks?', icon: 'shieldcheck', k: 'control' }, { h: 'Does it break things?', icon: 'users', k: 'human' }],
        rows: [
          ['Attack success on cases and variants', 'Task quality and false refusals'],
          ['Below the agreed threshold', 'No meaningful drop from baseline'],
          ['Overfitting to the reported input', 'Gradual, silent degradation'] ],
        say: 'Every fix must answer two questions. | Does it stop attacks? Measure attack success on the original cases and their variants. Does it break things? Measure task quality and false refusals. | It passes on security when attack success falls below the agreed threshold. It passes on utility when quality shows no meaningful drop from the baseline. | And watch for the classic failures: a fix that only blocks the exact input that was reported, and a product that slowly gets worse with every extra layer of protection.' },
      { t: 'summary', items: ['Turn every finding into a regression test', 'Test variants and benign requests, many times', 'Run the suite after every change, behind a release gate', 'Retest independently before closing serious findings'],
        say: 'To recap. | Turn every confirmed finding into a regression test. | Test variants and benign requests, many times each. | Run the suite after every change, behind a release gate. | And for serious findings, have the red team retest independently before closing them.' } ] },
    { type: 'text', md: `### Building regression suites from findings
- **Start from the reproduction package** (Module 6.5): the same versions, settings and inputs, repeated enough times to measure a success rate.
- **Add variants:** rephrasings, other languages and formats, multi-turn versions and different entry points, generated by people or attacker models (Module 6.4). Keep a **held-out set** that is never used to tune prompts, classifiers or training, so the suite stays an honest test.
- **Add benign baselines:** representative legitimate requests, including edge cases, to catch over-blocking and quality loss.
- **Use enough trials:** small samples hide differences. Decide the number of runs and the pass thresholds in advance.

### When to run the suite
Run it on **every behaviour-changing change**: model and provider updates, fine-tuning, prompt and template edits, retrieval index or embedding changes, guardrail and threshold changes, new tools or permissions, and dependency upgrades (Module 6.2). Provider-side updates can arrive without notice, so also run it **on a schedule** against production-equivalent settings.

### Release gates and closure
- **Gate releases** in the pipeline: a change that pushes any security or utility result past its threshold doesn’t ship without an approved exception (Module 6.2).
- **Independent retest:** for serious findings, the red team, not the builders, confirms the fix before closure, including attempts to bypass it.
- **Record results** against the finding, and keep trend data: rising attack success across releases is an early warning (Section 5).

### Common validation mistakes
- Testing only the exact input from the report, so the fix is **overfitted** to one string.
- Tuning on the test set, which **contaminates** it and inflates results.
- Declaring success from **one run** of a non-deterministic system.
- Ignoring **utility**: a fix that makes the product unusable will be switched off, which reintroduces the risk.` },
    { type: 'steps', title: 'Validating a fix for an injection finding', items: [
      ['Reproduce the baseline', 'Run the original case and its variants on the current release to confirm the attack success rate before the fix.'],
      ['Apply the mitigation', 'Deploy the fix to staging through the pipeline, with the release manifest updated.'],
      ['Re-run security tests', 'Run original cases, variants and held-out variants many times, and compare rates against the threshold.'],
      ['Re-run utility tests', 'Run the benign set and quality evaluations, and compare with the baseline.'],
      ['Retest independently and gate', 'Have the red team attempt bypasses, then add the cases to the release gate and close the finding.'] ] },
    { type: 'callout', kind: 'exam', title: 'Validation questions', md: `A fix is validated when **repeated tests** show attack success **below threshold on the original case and on held-out variants**, **utility is preserved**, and the cases are **in a regression suite** that runs on every change behind a **release gate**. One clean run, or a fix that only blocks the reported input, isn’t validation.` },
    { type: 'check', q: { q: 'After a fix, the exact prompt from a red team report no longer works, but testers haven’t tried any variants. Why is the finding NOT ready to close?', o: ['Findings can only be closed by the vendor of the underlying model', 'The fix may only block the reported input, not the underlying weakness', 'Every finding must stay open for at least ninety days after its fix', 'The red team must first publish the original prompt for peer review'], a: 1, b: 4,
      why: 'Without variants, including held-out ones, there is no evidence the fix addresses the weakness rather than one string. Repeated tests on variants, plus utility checks, are needed before closure.' } }
  ]
};
