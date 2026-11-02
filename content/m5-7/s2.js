/* 5.7 · Section 2: AI circuit breakers and kill switches */
module.exports = {
  title: 'AI circuit breakers and kill switches', covers: [2],
  blocks: [
    { type: 'video', title: 'Automatic brakes and the big red button', kicker: 'Module 5.7 · Video 2 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.7 · Recovery and continuity', title: 'Automatic brakes and the big red button', sub: 'AI circuit breakers and kill switches', icon: 'power',
        say: 'Some AI failures move faster than any person can react. Others need a deliberate decision to stop everything. Circuit breakers handle the first; kill switches handle the second. | This video covers AI circuit breakers and kill switches, and how to design them so they work when needed.' },
      { t: 'compare', title: 'Circuit breaker or kill switch?', labels: ['Trigger', 'Scope', 'Who acts', 'Reset'],
        cols: [{ h: 'Circuit breaker', icon: 'bolt', k: 'control' }, { h: 'Kill switch', icon: 'power', k: 'threat' }],
        rows: [
          ['Automatic, on thresholds', 'A deliberate human decision'],
          ['One path, feature or agent', 'A whole AI system or capability'],
          ['The system itself', 'Named people with authority'],
          ['Resets after health checks', 'Restart needs approval'] ],
        say: 'Circuit breakers and kill switches do different jobs. | A circuit breaker trips automatically when a threshold is crossed. A kill switch is pulled by a deliberate human decision. | A circuit breaker usually affects one path, feature or agent. A kill switch can stop a whole AI system or capability. | The system itself operates the circuit breaker. Named people with authority operate the kill switch. | And a circuit breaker resets after health checks pass, while restarting after a kill switch needs approval.' },
      { t: 'bullets', title: 'What an AI circuit breaker can watch', layout: 'grid', cols: 2, items: [
          { icon: 'shield', h: 'Harmful output rate', d: 'Safety classifier hits above a limit', k: 'threat' },
          { icon: 'robot', h: 'Agent action rate', d: 'Tool calls far above baseline', k: 'human' },
          { icon: 'money', h: 'Spend and tokens', d: 'Budget burn per hour', k: 'neutral' },
          { icon: 'arrow', h: 'Data leaving', d: 'Outbound volume or new destinations', k: 'data' },
          { icon: 'alert', h: 'Control failures', d: 'Guardrail or DLP unavailable', k: 'control' },
          { icon: 'clock', h: 'Errors and latency', d: 'The classic reliability triggers', k: 'model' } ],
        say: 'AI circuit breakers can watch more than errors. | Harmful output rates: trip when safety classifiers flag too many outputs. | Agent action rates: trip when tool calls rise far above baseline. | Spend and tokens: trip when budget burn per hour exceeds a limit. | Data leaving: trip on unusual outbound volume or new destinations. | Control failures: if a guardrail or data loss prevention service is unavailable, fail closed rather than run unprotected. | And the classic reliability triggers: error rates and latency.' },
      { t: 'cycle', title: 'Circuit breaker states', center: 'Breaker', centerSub: 'protects users and systems', intro: 'Trip fast, recover carefully.',
        stages: [
          { icon: 'check', label: 'Closed', d: 'Normal traffic; thresholds watched.' },
          { icon: 'bolt', label: 'Trip', d: 'A threshold is crossed.' },
          { icon: 'stop', label: 'Open', d: 'Traffic goes to the fallback.' },
          { icon: 'sliders', label: 'Half-open', d: 'A little trial traffic after a cool-down.' } ],
        say: 'A circuit breaker moves through states. | Closed is normal: traffic flows, and thresholds are watched. | When a threshold is crossed, the breaker trips. | Open: traffic is diverted to a fallback, such as a simpler model or a human queue, and an alert is raised. | After a cool-down, the breaker goes half-open, letting a little trial traffic through. | If the trial is healthy, it closes again. If not, it opens again, and people investigate.' },
      { t: 'bullets', title: 'Designing a kill switch that works', layout: 'grid', cols: 2, items: [
          { icon: 'network', h: 'Outside the model', d: 'Gateway, feature flag or identity', k: 'control' },
          { icon: 'bolt', h: 'Fast', d: 'Effective in seconds, everywhere', k: 'threat' },
          { icon: 'users', h: 'Clear authority', d: 'Who may pull it, at any hour', k: 'human' },
          { icon: 'stop', h: 'Defined safe state', d: 'What happens to work in flight', k: 'neutral' },
          { icon: 'hitl', h: 'Fallback ready', d: 'Manual process people know', k: 'model' },
          { icon: 'check', h: 'Tested regularly', d: 'Exercised, not just documented', k: 'data' } ],
        say: 'A kill switch only helps if it works under pressure. Six design points matter. | It works outside the model, at the gateway, a feature flag or the identity layer, so it doesn’t depend on the model cooperating. | It is fast, taking effect in seconds across every region and instance. | Authority is clear: named people, with deputies, may pull it at any hour. | The safe state is defined: what happens to queued and in-flight work. | A fallback is ready, and people know the manual process. | And it is tested regularly, in exercises, not just written down.' },
      { t: 'summary', items: ['Circuit breakers trip automatically; kill switches are deliberate', 'Watch harm, actions, spend, egress and control failures', 'Closed, trip, open, half-open: trip fast, recover carefully', 'Kill switches: outside the model, fast, authorised, safe, tested'],
        say: 'To recap. | Circuit breakers trip automatically on thresholds; kill switches are pulled deliberately by people with authority. | AI circuit breakers can watch harmful outputs, agent actions, spend, outbound data and control failures, as well as errors. | They move between closed, tripped, open and half-open states: trip fast, recover carefully. | And kill switches must work outside the model, act fast, have clear authority, define a safe state and be tested regularly.' } ] },
    { type: 'text', md: `### AI circuit breakers
Module 3.6 introduced circuit breakers as a reliability pattern for failing dependencies. For AI security and safety, the same pattern can trip on **behavioural** signals:
| Trigger | Example threshold | Breaker action |
|---|---|---|
| Harmful output rate | Safety classifier flags above 1% of outputs in 5 minutes | Route to a safer fallback model or a human queue |
| Agent action rate | Tool calls above 5× the agent’s baseline | Pause the agent; hold pending actions |
| Spend or tokens | Hourly budget exceeded | Throttle or suspend the key or application |
| Data egress | Outbound volume or destinations outside policy | Block outbound actions; alert the SOC |
| Control failure | Guardrail or DLP service unavailable | **Fail closed**: stop serving unprotected responses |

Thresholds come from baselines (Module 5.2) and the release thresholds agreed before launch (Module 5.1). Every trip should alert someone, and recurring trips are findings for the post-incident review.

### Kill switches
- **Independent of the model:** implemented at the gateway, feature flags, network or identity provider (revoking the system’s credentials), never by instructing the model.
- **Scoped options:** one agent, one capability (such as web browsing or payments), one application, or all AI use.
- **Authority and access:** named roles with deputies, available at any hour; pre-approved for defined conditions (Module 5.1).
- **Safe state:** define what happens to queued actions, in-flight sessions and users; switch to a known fallback.
- **Testing:** exercise kill switches in game days (Module 4.4), measure time to full effect, and fix what fails.
- **Records:** log who pulled it, when and why, and require approval to restore service after safety checks (Module 5.6).

The EU AI Act expects high-risk systems to let human overseers interrupt operation through a "stop" button or similar procedure that brings the system to a halt in a safe state (Article 14). Major AI developers’ frontier safety frameworks apply the same principle at the model level: they commit to pausing deployment or further development if a model reaches defined risk thresholds before adequate safeguards are in place.` },
    { type: 'match', title: 'Circuit breaker or kill switch?', pairs: [
      ['Harmful outputs exceed 1% for five minutes, so traffic moves to a fallback', 'Circuit breaker'],
      ['The CISO halts all agent payment capabilities after a confirmed compromise', 'Kill switch'],
      ['The DLP service goes down, so responses stop until it returns', 'Circuit breaker (fail closed)'],
      ['A regulator orders the company to stop using a scoring model', 'Kill switch, then decommissioning'],
      ['An agent’s tool calls exceed five times its baseline and it is paused', 'Circuit breaker'] ] },
    { type: 'callout', kind: 'exam', title: 'Brake questions', md: `**Circuit breakers** are automatic and threshold-based; **kill switches** are deliberate and authorised. Both must work **outside the model**, define a **safe state** and a **fallback**, and be **tested**. A kill switch that depends on the model obeying an instruction, or that nobody has tried, is a classic weak answer. When a protective control fails, **fail closed**.` },
    { type: 'check', q: { q: 'An organisation’s "kill switch" for its customer agent is an instruction in the system prompt telling the agent to stop if it receives a special phrase. What is the MAIN weakness?', o: ['The special phrase is too long for staff to remember during an incident', 'It depends on the model obeying, which a manipulated model may not do', 'System prompts can’t contain any instructions about stopping', 'The phrase might accidentally be typed by a customer one day'], a: 1, b: 2,
      why: 'A kill switch must work regardless of the model’s state, at the gateway, feature flag or identity layer. A manipulated or malfunctioning model may ignore the phrase. Memorability and accidental triggering are minor by comparison.' } }
  ]
};
