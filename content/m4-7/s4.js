/* 4.7 · Section 4: audit of AI resource utilisation (token accounting, rate limits, session time-outs) */
module.exports = {
  title: 'Auditing AI resource utilisation', covers: [4],
  blocks: [
    { type: 'video', title: 'Following the tokens', kicker: 'Module 4.7 · Video 4 of 4', scenes: [
      { t: 'title', kicker: 'Module 4.7 · Identity lifecycle', title: 'Following the tokens', sub: 'Token accounting, rate limits and session time-outs', icon: 'chart',
        say: 'Every AI request consumes tokens, compute and money, and each one is tied to an identity. Auditing that consumption reveals abuse, waste and compromise. | This video covers auditing AI resource utilisation: token accounting, rate limits and session time-outs.' },
      { t: 'flow', title: 'Token accounting',
        nodes: [
          { id: 'rq', x: 220, y: 330, icon: 'robot', label: 'Request', sub: 'user, app or agent', k: 'model', w: 280 },
          { id: 'gw', x: 680, y: 330, icon: 'filter', label: 'Gateway meters it', sub: 'tokens, model, cost', k: 'control', w: 310 },
          { id: 'at', x: 1150, y: 330, icon: 'tag', label: 'Attribution', sub: 'person, team, agent, project', k: 'data', w: 330 },
          { id: 'bd', x: 1150, y: 690, icon: 'money', label: 'Budgets and quotas', sub: 'alerts and caps', k: 'human', w: 300 },
          { id: 'an', x: 680, y: 690, icon: 'siren', label: 'Anomaly detection', sub: 'spikes and new patterns', k: 'threat', w: 320 },
          { id: 'rp', x: 220, y: 690, icon: 'doc', label: 'Reports', sub: 'showback, audit evidence', k: 'neutral', w: 290 } ],
        edges: [{ from: 'rq', to: 'gw', k: 'model' }, { from: 'gw', to: 'at', k: 'control' }, { from: 'at', to: 'bd', k: 'data' }, { from: 'bd', to: 'an', k: 'human' }, { from: 'an', to: 'rp', k: 'threat' }],
        steps: [
          { show: 'rq', hi: 'rq' },
          { show: 'gw rq-gw', flow: 'rq-gw', hi: 'gw' },
          { show: 'at gw-at', flow: 'gw-at', hi: 'at' },
          { show: 'bd at-bd', flow: 'at-bd', hi: 'bd' },
          { show: 'an bd-an', flow: 'bd-an', hi: 'an', mark: { an: 'alert' } },
          { show: 'rp an-rp', flow: 'an-rp', hi: 'rp', mark: { rp: 'ok' } } ],
        say: 'Token accounting starts with every request, whether it comes from a person, an application or an agent. | An AI gateway meters it: input and output tokens, the model and version, latency and cost. | Each request is attributed to an identity, and through it to a team, an agent and a project. | Budgets and quotas turn that data into control, with alerts and hard caps. | Anomaly detection looks for spikes and new patterns against each identity’s baseline. | And reports provide showback to teams and evidence for auditors. None of this needs the content of prompts, so accounting can be done without storing sensitive text.' },
      { t: 'chart', title: 'A leaked key shows up in the numbers', kind: 'line', x: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12'], yMin: 0, yMax: 40, ticks: 4, unit: 'M', yLabel: 'Illustrative daily tokens for one application’s API key, in millions',
        series: [{ n: 'Daily tokens', k: 'data', v: [3.1, 2.9, 3.4, 3.0, 3.2, 2.8, 3.3, 3.1, 19.5, 36.0, 2.0, 3.0] }],
        annot: [{ x: 8, text: 'Key leaked', k: 'threat' }, { x: 10, text: 'Revoked', k: 'control', at: 'bottom' }],
        steps: [{ s: [0] }, { a: [0] }, { a: [1] }],
        say: 'Here is why per-identity accounting matters. In this illustrative chart, one application’s API key uses about three million tokens a day, week after week. | On day nine, usage jumps sixfold, then more than tenfold the next day, at hours the application is normally quiet. The key has leaked, and someone else is using it. | Because usage is attributed to each key and compared with its baseline, an alert fires, the key is revoked, and usage drops straight back. Without per-key accounting, this would only have shown up on the monthly invoice.' },
      { t: 'bullets', title: 'Session time-outs for AI tools', layout: 'grid', cols: 2, items: [
          { icon: 'clock', h: 'Idle time-outs', d: 'Short for privileged consoles', k: 'neutral' },
          { icon: 'calendar', h: 'Absolute lifetimes', d: 'Sign in again after a set time', k: 'data' },
          { icon: 'shield', h: 'Step-up for sensitive actions', d: 'Exports, approvals, scope changes', k: 'control' },
          { icon: 'robot', h: 'Agent run limits', d: 'Maximum duration per task', k: 'model' },
          { icon: 'key', h: 'Token expiry', d: 'Short access, limited refresh', k: 'human' },
          { icon: 'power', h: 'Revoke on risk', d: 'End sessions when signals change', k: 'threat' } ],
        say: 'Sessions also need limits. | Idle time-outs, short for privileged consoles such as model platforms and training clusters. | Absolute session lifetimes, after which users must sign in again, however active they are. | Step-up authentication for sensitive actions, such as exporting data, approving agent actions or changing scopes. | Run-time limits for agents, so no task runs indefinitely. | Short-lived access tokens, with controlled refresh. | And revocation on risk: when signals change, such as a compromised device or a departure, sessions end everywhere at once.' },
      { t: 'bullets', title: 'What utilisation audits catch', layout: 'grid', cols: 2, items: [
          { icon: 'key', h: 'Leaked credentials', d: 'New volumes, places or hours', k: 'threat' },
          { icon: 'eye', h: 'Shadow usage', d: 'Unapproved apps on company accounts', k: 'neutral' },
          { icon: 'cycle', h: 'Runaway agents', d: 'Loops burning tokens', k: 'model' },
          { icon: 'copy', h: 'Model extraction', d: 'High-volume systematic querying', k: 'data' },
          { icon: 'money', h: 'Denial of wallet', d: 'Costs driven up deliberately', k: 'human' },
          { icon: 'gpu', h: 'Waste', d: 'Idle capacity, oversized models', k: 'control' } ],
        say: 'Regular utilisation audits catch six kinds of problem. | Leaked credentials, which show up as new volumes, locations or hours of use. | Shadow usage: unapproved applications running on company accounts. | Runaway agents stuck in loops, burning tokens. | Model extraction, visible as high-volume, systematic querying. | Denial of wallet, where costs are driven up deliberately. | And plain waste: idle reserved capacity, or expensive models used where smaller ones would do.' },
      { t: 'summary', items: ['Meter every request at the gateway and attribute it to an identity', 'Budgets, quotas and per-identity baselines turn data into control', 'Idle and absolute time-outs, step-up, agent run limits, revoke on risk', 'Audits catch leaks, shadow use, runaways, extraction, cost abuse, waste'],
        say: 'To recap. | Meter every AI request at the gateway, and attribute it to an identity, team, agent and project. | Use budgets, quotas and per-identity baselines to turn usage data into control. | Apply idle and absolute session time-outs, step-up for sensitive actions, agent run limits, and revocation on risk. | And audit utilisation regularly to catch leaked credentials, shadow use, runaway agents, extraction, cost abuse and waste.' } ] },
    { type: 'text', md: `### Token accounting
Record, per request: timestamp, identity (user, service, agent), application and project, model and version, input, output and cached tokens, latency, cost, rate-limit and policy decisions, and a correlation ID. **Prompt content isn’t needed** for accounting, so keep it out of accounting logs, or protect it as described in Module 3.5.

Uses:
- **Budgets and quotas** per identity, team and project, with alerts and hard caps (Module 3.6).
- **Baselines and anomaly detection:** sudden volume changes, new geographies, unusual hours, new models or endpoints.
- **Showback or chargeback:** costs visible to the teams that incur them, which also exposes unapproved use.
- **Evidence:** auditable records of who used which models, how much, and under which policies.

### Auditing rate limits and quotas
- Review configured limits against risk and actual need; remove "temporary" exemptions that became permanent.
- Track limit hits (HTTP 429 responses) by identity: frequent hits may mean abuse, a runaway agent or a limit that is too tight.
- Log every change to limits and quotas, with approver and reason.

### Session time-outs
- **Idle and absolute time-outs** proportionate to risk; for example, **PCI DSS v4.0** requires re-authentication after 15 minutes of inactivity for in-scope systems, and NIST SP 800-63B sets session limits that tighten with assurance level.
- **Step-up re-authentication** for sensitive operations (Module 4.5).
- **Agent sessions:** maximum run time, maximum steps and token expiry per task (Module 4.4).
- **Continuous access evaluation:** revoke sessions across applications when risk changes (Section 2).

### Making audits routine
Schedule monthly utilisation reviews for AI platforms, with exceptions investigated by the identity owner; send anomaly alerts to the SOC (Module 5.2); and keep accounting records for the period your policies and regulations require.` },
    { type: 'match', title: 'What does this usage pattern suggest?', pairs: [
      ['A key’s token use jumps tenfold overnight, from a new country', 'Leaked credential'],
      ['An agent makes the same tool call thousands of times in an hour', 'Runaway agent loop'],
      ['One customer sends millions of systematically varied queries', 'Possible model extraction'],
      ['Charges appear for an AI app nobody approved, on a company card', 'Shadow AI usage'],
      ['Reserved GPUs sit at 3% utilisation for a month', 'Waste'] ] },
    { type: 'callout', kind: 'exam', title: 'Utilisation audit questions', md: `Favour **per-identity attribution** at a gateway, **baselines with alerts**, and **budgets with caps**. A monthly invoice is not monitoring. For sessions, match time-outs to risk and add **step-up** for sensitive actions.` },
    { type: 'check', q: { q: 'An organisation discovers a leaked model provider key only when the monthly invoice arrives at five times the usual amount. Which control would have detected it MOST quickly?', o: ['A quarterly review of model provider invoices by the finance team', 'Per-key usage attribution with baselines and real-time alerts on spikes', 'A policy requiring developers to report any key they think may have leaked', 'Reducing the number of models the organisation is allowed to use'], a: 1, b: 4,
      why: 'Attributing usage to each key and alerting on deviations catches misuse within hours. Invoice reviews and self-reporting are slow or unreliable, and fewer models doesn’t detect anything.' } }
  ]
};
