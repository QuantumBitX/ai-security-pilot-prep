/* 6.2 · Section 4: staged rollouts and rollback procedures (canary deployments) */
module.exports = {
  title: 'Staged rollouts and rollback procedures', covers: [4],
  blocks: [
    { type: 'video', title: 'Releasing AI a little at a time', kicker: 'Module 6.2 · Video 4 of 4', scenes: [
      { t: 'title', kicker: 'Module 6.2 · Secure AI lifecycle', title: 'Releasing AI a little at a time', sub: 'Staged rollouts and rollback procedures', icon: 'branch',
        say: 'No test suite captures everything real users will do. Staged rollouts let a new AI version meet real traffic gradually, with automatic brakes if it misbehaves. | This video covers staged rollout patterns, such as canary deployments, and the rollback procedures that make them safe.' },
      { t: 'bullets', title: 'Staged rollout patterns', layout: 'grid', cols: 2, items: [
          { icon: 'eye', h: 'Shadow', d: 'Runs on real inputs; users see nothing', k: 'neutral' },
          { icon: 'target', h: 'Canary', d: 'A small share of real traffic first', k: 'threat' },
          { icon: 'split', h: 'A/B test', d: 'Compare versions on outcomes', k: 'data' },
          { icon: 'copy', h: 'Blue-green', d: 'Two environments; instant switch', k: 'model' },
          { icon: 'sliders', h: 'Feature flags', d: 'Turn capabilities on per group', k: 'control' },
          { icon: 'users', h: 'Rings', d: 'Staff, then pilots, then everyone', k: 'human' } ],
        say: 'Six patterns support staged rollouts. | Shadow deployment: the new version runs on real inputs, but users never see its outputs, so you can compare it safely. | Canary: a small share of real traffic goes to the new version first. | A/B testing: versions are compared on real outcomes. | Blue-green: two complete environments, with an instant switch between them. | Feature flags: capabilities, such as a new agent tool, are turned on for chosen groups. | And rings: staff first, then pilot customers, then everyone.' },
      { t: 'chart', title: 'A canary with automatic rollback', kind: 'line', x: ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h'], yMin: 0, yMax: 4, ticks: 4, unit: '%', yLabel: 'Illustrative share of responses flagged by safety classifiers', legend: true,
        series: [{ n: 'Current version', k: 'control', v: [0.8, 0.9, 0.8, 0.9, 0.8, 0.9, 0.8, 0.9] }, { n: 'Canary (5% of traffic)', k: 'threat', v: [0.9, 1.0, 1.6, 2.4, 3.1, 0.9, 0.8, 0.9] }],
        annot: [{ y: 2, text: 'Rollback trigger', k: 'human', xi: 0.6 }, { x: 4, text: 'Auto rollback', k: 'control', at: 'bottom' }],
        steps: [{ s: [0] }, { s: [1] }, { a: [0, 1] }],
        say: 'Here is an illustrative canary. The current version’s safety flag rate sits steadily below one per cent. | The canary, serving five per cent of traffic, starts similarly, then climbs from the second hour. | When it crosses the agreed rollback trigger of two per cent, automation routes all traffic back to the current version within minutes, and the team investigates. Only five per cent of users were exposed, for a short time.' },
      { t: 'flow', title: 'A rollback procedure',
        nodes: [
          { id: 'trg', x: 230, y: 330, icon: 'alert', label: 'Trigger', sub: 'metric breach or decision', k: 'threat', w: 310 },
          { id: 'route', x: 700, y: 330, icon: 'arrow', label: 'Route traffic back', sub: 'to the last good release', k: 'control', w: 320 },
          { id: 'bundle', x: 1200, y: 330, icon: 'list', label: 'Restore the bundle', sub: 'model, prompt, index, config', k: 'model', w: 330 },
          { id: 'state', x: 1200, y: 690, icon: 'memory', label: 'Handle state', sub: 'sessions, memory, data', k: 'data', w: 290 },
          { id: 'ver', x: 700, y: 690, icon: 'check', label: 'Verify', sub: 'metrics back to normal', k: 'human', w: 300 },
          { id: 'rec', x: 230, y: 690, icon: 'book', label: 'Record and review', sub: 'why it failed', k: 'neutral', w: 300 } ],
        edges: [{ from: 'trg', to: 'route', k: 'threat' }, { from: 'route', to: 'bundle', k: 'control' }, { from: 'bundle', to: 'state', k: 'model' }, { from: 'state', to: 'ver', k: 'data' }, { from: 'ver', to: 'rec', k: 'human' }],
        steps: [
          { show: 'trg', hi: 'trg', mark: { trg: 'alert' } },
          { show: 'route trg-route', flow: 'trg-route', hi: 'route' },
          { show: 'bundle route-bundle', flow: 'route-bundle', hi: 'bundle' },
          { show: 'state bundle-state', flow: 'bundle-state', hi: 'state' },
          { show: 'ver state-ver', flow: 'state-ver', hi: 'ver', mark: { ver: 'ok' } },
          { show: 'rec ver-rec', flow: 'ver-rec', hi: 'rec' } ],
        say: 'A rollback procedure has six steps. It starts with a trigger: a metric breaching its threshold, or a decision by the model owner. | Traffic is routed back to the last good release. | The whole release bundle is restored, not just the model: the prompt, index and configuration that went with it. | State is handled: in-flight sessions, agent memory written by the new version, and any data or schema changes. | The team verifies that metrics have returned to normal. | And the rollback is recorded and reviewed, so the problem is understood before the next attempt.' },
      { t: 'compare', title: 'What to watch during a rollout', labels: ['Safety', 'Quality', 'Operations', 'Business'],
        cols: [{ h: 'Signal', icon: 'chart', k: 'model' }, { h: 'Typical trigger', icon: 'bolt', k: 'threat' }],
        rows: [
          ['Safety flags, refusals, injection hits', 'Above baseline band'],
          ['Grounding, task success, feedback', 'Below agreed threshold'],
          ['Latency, errors, cost per request', 'Above limit for the tier'],
          ['Escalations, complaints, conversions', 'Significant change'] ],
        say: 'Rollouts need agreed signals and triggers before they start. | Safety signals: safety classifier flags, refusals and injection detections, triggering when they rise above the baseline band. | Quality signals: grounding scores, task success and user feedback, triggering when they fall below thresholds. | Operational signals: latency, errors and cost per request. | And business signals: escalations to humans, complaints and conversions, where a significant change prompts a pause.' },
      { t: 'summary', items: ['Shadow, canary, A/B, blue-green, feature flags, rings', 'Agree signals and rollback triggers before rollout', 'Roll back the whole bundle, and handle state', 'Test rollback before you need it'],
        say: 'To recap. | Use staged patterns: shadow, canary, A/B testing, blue-green, feature flags and rings. | Agree the signals and rollback triggers before the rollout starts. | Roll back the whole release bundle, and handle state such as sessions, memory and data changes. | And test the rollback procedure before you need it.' } ] },
    { type: 'text', md: `### Staged rollout patterns
| Pattern | How it works | Strengths | Watch out for |
|---|---|---|---|
| **Shadow** | New version processes real inputs; outputs are logged, not shown | Zero user exposure; realistic comparison | No side effects allowed: shadow agents must not act |
| **Canary** | A small percentage of traffic goes to the new version | Real feedback with limited exposure | Choose a representative slice; enough volume for signals |
| **A/B test** | Traffic split to compare outcomes | Measures real impact | Needs ethical and privacy review when outcomes affect people |
| **Blue-green** | Two full environments; switch traffic between them | Instant cutover and rollback | Cost; state and data compatibility |
| **Feature flags** | Capabilities enabled per user group | Fine-grained control, such as new agent tools | Flag sprawl; flags need ownership and removal |
| **Rings** | Internal staff, then pilots, then general availability | Gradual widening of exposure | Staff behaviour may differ from customers |

### Rollback procedures for AI
- **Roll back the bundle:** model, prompt, guardrails, retrieval index and tool configuration from the release manifest (Section 3). Rolling back only the model can leave an incompatible prompt or index.
- **Automate triggers:** agreed thresholds on safety, quality, operational and business signals switch traffic back automatically (Module 5.7 circuit breakers).
- **Handle state:** in-flight sessions, agent memory and notes written by the new version, cached answers, and data or schema migrations. Design changes to be **backward compatible**, so rollback doesn’t corrupt data.
- **Hosted models:** keep the previous model version available until the new one is proven; providers retire versions on schedules, so plan ahead (Module 5.7).
- **Practise:** test rollbacks in staging and game days, and measure how long they take (Module 4.4).
- **Learn:** record why a rollout failed, and fix the cause before trying again (Module 5.7).` },
    { type: 'scenario', title: 'The big-bang upgrade', md: `A retailer plans to switch its customer assistant from one model version to a new one for all customers at 9am on Black Friday, its busiest day. The new version passed offline evaluations. There is no canary, the previous version’s configuration has been deleted to "keep things tidy", and nobody has defined what would trigger a rollback.`,
      q: { q: 'What should the security lead recommend?', o: ['Proceed as planned, because the new version passed its offline evaluations', 'Restore the previous bundle, define triggers, and canary on a quieter day', 'Delay the upgrade indefinitely, until a perfect evaluation suite exists', 'Proceed, but ask customers to report any problems through a survey'], a: 1, b: 4,
        why: 'A rollback point, agreed triggers and a canary at low-risk times make the upgrade reversible and limit exposure. Offline evaluations don’t capture everything, indefinite delay isn’t practical, and surveys are too slow.' } },
    { type: 'callout', kind: 'exam', title: 'Rollout questions', md: `Prefer **staged rollouts** (shadow, canary, rings, flags) with **pre-agreed rollback triggers** and **automated rollback** of the **whole release bundle**. Remember **shadow agents must not take real actions**, and that **state** (sessions, memory, data migrations) complicates rollback. A big-bang release with no rollback point is the classic wrong answer.` },
    { type: 'check', q: { q: 'A team wants to test a new agent version on real traffic in shadow mode. What is the MOST important precaution?', o: ['Show the shadow agent’s answers to users, so their feedback can be collected', 'Ensure the shadow agent can’t take real actions, such as sending emails or payments', 'Give the shadow agent broader permissions, so that it can be tested much more fully', 'Run the shadow agent only at night, when fewer users are online'], a: 1, b: 4,
      why: 'Shadow mode compares outputs without side effects. A shadow agent that can act would cause real, duplicated or unapproved actions. Showing outputs defeats shadow mode, broader permissions add risk, and timing doesn’t remove side effects.' } }
  ]
};
