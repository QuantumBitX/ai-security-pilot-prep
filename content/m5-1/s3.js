/* 5.1 · Section 3: release requirements (human override baselines, reject rate thresholds) */
module.exports = {
  title: 'Release requirements: override baselines and reject rate thresholds', covers: [3],
  blocks: [
    { type: 'video', title: 'Ready for production?', kicker: 'Module 5.1 · Video 3 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.1 · AI SecOps foundations', title: 'Ready for production?', sub: 'Release requirements, override baselines and reject rate thresholds', icon: 'flag',
        say: 'Before an AI system goes live, operations needs agreed answers to three questions: what does good look like, what does bad look like, and when do we stop? | This video covers release requirements, including human override baselines and reject rate thresholds.' },
      { t: 'bullets', title: 'Operational release requirements', layout: 'grid', cols: 2, items: [
          { icon: 'check', h: 'Evaluations passed', d: 'Quality, safety, fairness, security', k: 'control' },
          { icon: 'shield', h: 'Security sign-off', d: 'Findings fixed or formally accepted', k: 'threat' },
          { icon: 'eye', h: 'Monitoring live', d: 'Telemetry, alerts, dashboards', k: 'data' },
          { icon: 'book', h: 'Runbooks and on-call', d: 'People ready to respond', k: 'human' },
          { icon: 'rollback', h: 'Rollback tested', d: 'Previous version ready', k: 'neutral' },
          { icon: 'sliders', h: 'Thresholds agreed', d: 'Override, reject, error rates', k: 'model' } ],
        say: 'An operational release checklist covers six things. | Evaluations passed: quality, safety, fairness and security suites, against agreed thresholds. | Security sign-off, with red-team findings fixed or formally accepted by the risk owner. | Monitoring live: telemetry flowing, alerts configured and dashboards built, before the first user arrives. | Runbooks written and on-call staff trained. | Rollback tested, with the previous version ready to restore. | And operational thresholds agreed, such as human override rates, reject rates and error rates, with the action each breach triggers.' },
      { t: 'chart', title: 'Human override rate as a health signal', kind: 'line', x: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'], yMin: 0, yMax: 30, ticks: 3, unit: '%', yLabel: 'Illustrative share of AI recommendations overridden by reviewers, per week',
        series: [{ n: 'Override rate', k: 'human', v: [10, 11, 9, 10, 12, 10, 17, 23, 11, 10, 4, 2] }],
        annot: [{ y: 15, text: 'Upper threshold: is the model degrading?', k: 'threat', xi: 1.9 }, { y: 5, text: 'Lower threshold: are reviewers still checking?', k: 'human', xi: 2.1 }],
        steps: [{ s: [0] }, { a: [0] }, { a: [1] }],
        say: 'A human override baseline records how often reviewers overrule the AI when everything is working normally. In this illustrative chart it sits at around ten per cent. | An upper threshold catches the obvious problem: when overrides jump, as in weeks seven and eight, the model may be degrading, or the population may have changed. | A lower threshold catches the less obvious one: when overrides fall towards zero, as in weeks eleven and twelve, reviewers may have stopped checking and started rubber-stamping. That is automation bias, and it removes the human safeguard silently.' },
      { t: 'compare', title: 'Reject rates: too high or too low', labels: ['Guardrail block rate', 'Model refusal rate', 'Output rejection rate'],
        cols: [{ h: 'Too high', icon: 'stop', k: 'human' }, { h: 'Too low', icon: 'alert', k: 'threat' }],
        rows: [
          ['Over-blocking; users go elsewhere', 'Filter failing, or attacks getting through'],
          ['Unusable; policy too strict', 'Safety behaviour eroded'],
          ['Model or prompt broken', 'Validation not working'] ],
        say: 'Reject rate thresholds work in both directions, because either extreme signals a problem. | If the guardrail block rate is too high, legitimate users are being blocked and will drift to unapproved tools. Too low, and the filter may have failed, or attacks may be slipping through. | If the model refuses too often, it is unusable and the policy may be too strict. If refusals drop sharply, its safety behaviour may have been eroded, for example by a bad update. | And if output validation rejects too much, the model or prompt may be broken. If it rejects almost nothing, check that validation is still running at all.' },
      { t: 'summary', items: ['Release only with evaluations, sign-off, monitoring, runbooks and rollback', 'Baseline human override rates; alert on rises and falls', 'Set reject rate thresholds in both directions', 'Link every threshold to a defined action'],
        say: 'To recap. | Release only when evaluations, security sign-off, monitoring, runbooks and tested rollback are all in place. | Baseline the human override rate, and alert when it rises or falls outside its band. | Set reject rate thresholds in both directions for guardrails, refusals and output validation. | And link every threshold to a defined action, such as investigating, restricting or rolling back.' } ] },
    { type: 'text', md: `### A production readiness review
| Area | Typical requirement |
|---|---|
| **Evaluation** | Quality, safety, fairness and security suites passed against agreed thresholds (Modules 3.5 and 4.4) |
| **Security** | Threat model current; red-team findings fixed or accepted by the risk owner (Domain 6) |
| **Monitoring** | Telemetry, detections, dashboards and alert routing live (Module 5.2) |
| **Operations** | Runbooks, on-call rota, escalation paths and decision rights (Section 2) |
| **Resilience** | Rollback tested; fallbacks and degradation paths defined (Module 3.6) |
| **Thresholds** | Operational limits with defined actions, recorded in the monitoring plan |
| **Approval** | Sign-off by the model owner in line with the risk tier |

### Human override baselines
In systems with a human in or on the loop, the **override rate** (how often reviewers reject or change the AI’s output) is a key operational signal.
- **Measure a baseline** during pilots and early operation, by decision type and reviewer group.
- **Upper threshold:** rising overrides suggest model degradation, drift or a change in the population (Module 3.5).
- **Lower threshold:** overrides near zero, very fast approvals, or identical decisions across reviewers suggest **automation bias** and rubber-stamping. The EU AI Act (Article 14) requires human oversight measures that help overseers stay aware of the tendency to over-rely on AI output, and to be able to decide not to use it or to override it.
- **Responses:** investigate the model, sample decisions for audit, refresh reviewer training, add friction such as requiring reasons, and rotate reviewers.

### Reject rate thresholds
Track, with thresholds in both directions:
- **Guardrail block rates** on inputs and outputs (Module 4.4).
- **Model refusal rates** and abstentions.
- **Output validation failures** (schema, DLP, grounding checks).
- **Escalation rates** to humans, and **error and time-out rates**.

Set initial bands from pilot data, review them after changes, and tie each breach to an action: investigate, restrict use, switch to a fallback or roll back (Module 3.5). Record thresholds and actions in the monitoring plan so on-call staff don’t have to improvise.` },
    { type: 'scenario', title: 'The perfect approval rate', md: `A bank uses an AI model to recommend whether to approve small-business loans, with credit officers reviewing every recommendation. During the pilot, officers overrode about 12% of recommendations. Six months later, the override rate is 0.4%, the average review takes eleven seconds, and managers are pleased with the efficiency.`,
      q: { q: 'What is the MOST appropriate response?', o: ['Celebrate the result, because the model has clearly become more accurate over time', 'Treat it as a possible automation-bias signal: audit a sample of decisions and strengthen oversight', 'Remove the human review step, since officers are agreeing with the model almost every single time', 'Increase the number of applications each officer reviews, to make use of the extra time'], a: 1, b: 3,
        why: 'An override rate far below baseline with very short reviews suggests rubber-stamping, not necessarily a better model. Sampling decisions shows which is true, and oversight measures restore meaningful review. Removing or diluting review would make any problem worse.' } },
    { type: 'callout', kind: 'exam', title: 'Release threshold questions', md: `Thresholds should have **two sides** and **defined actions**. A falling override rate or a falling block rate isn’t automatically good news: it may mean **automation bias** or a **failing control**. The best answers investigate before celebrating.` },
    { type: 'check', q: { q: 'After a provider updates the underlying model, a customer chatbot’s refusal rate on known harmful test prompts falls from 98% to 70%. What should the operational thresholds trigger?', o: ['Nothing, because a lower refusal rate means the chatbot is more helpful to customers', 'The defined action for a safety breach, such as restricting use or rolling back, then investigating', 'A request to the provider to explain its update in its next quarterly business review', 'An adjustment to the threshold, so that 70% becomes the new normal for the chatbot'], a: 1, b: 3,
      why: 'A sharp fall in refusals of harmful prompts signals eroded safety behaviour, so the pre-agreed action applies: restrict or roll back, then investigate. Calling it helpfulness, waiting for a business review or moving the threshold all leave users exposed.' } }
  ]
};
