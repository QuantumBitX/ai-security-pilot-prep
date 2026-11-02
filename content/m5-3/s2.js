/* 5.3 · Section 2: AI access and agency misuse (unauthorised identities, over-privileged agents) */
module.exports = {
  title: 'Detecting AI access and agency misuse', covers: [2],
  blocks: [
    { type: 'video', title: 'Right identity, wrong behaviour', kicker: 'Module 5.3 · Video 2 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.3 · Runtime detection', title: 'Right identity, wrong behaviour', sub: 'Detecting unauthorised identities and over-privileged agents', icon: 'id',
        say: 'Many AI incidents don’t involve clever prompts at all. Someone uses a key they shouldn’t have, or an agent uses permissions it should never have been given. | This video covers how to detect AI access misuse and agency misuse at runtime.' },
      { t: 'bullets', title: 'Signs of access misuse', layout: 'grid', cols: 2, items: [
          { icon: 'key', h: 'Keys outside their app', d: 'A service key used from a laptop', k: 'threat' },
          { icon: 'globe', h: 'New locations or networks', d: 'Impossible travel, unusual hosting', k: 'human' },
          { icon: 'user', h: 'Unknown identities', d: 'Callers missing from the inventory', k: 'data' },
          { icon: 'users', h: 'Shared credentials', d: 'One key, many clients', k: 'neutral' },
          { icon: 'clock', h: 'Odd timing', d: 'Activity outside normal patterns', k: 'model' },
          { icon: 'search', h: 'Systematic querying', d: 'Extraction-like patterns', k: 'control' } ],
        say: 'Access misuse shows up in six common ways. | Keys used outside their application: a service key that should only be used by a backend suddenly appears from someone’s laptop or a script. | New locations or networks, including impossible travel and unfamiliar hosting providers. | Callers that don’t appear in the identity inventory at all. | One credential shared across many clients, which destroys attribution. | Activity at unusual times, for that identity. | And systematic querying, such as high volumes of varied inputs that look like an attempt to copy the model’s behaviour.' },
      { t: 'flow', title: 'When an agent goes off-script',
        nodes: [
          { id: 'prof', x: 230, y: 330, icon: 'doc', label: 'Purpose profile', sub: 'approved tools and data', k: 'data', w: 300 },
          { id: 'base', x: 700, y: 330, icon: 'chart', label: 'Behaviour baseline', sub: 'normal tools, volumes', k: 'neutral', w: 320 },
          { id: 'dev', x: 1200, y: 330, icon: 'alert', label: 'Deviation', sub: 'new tool, new data domain', k: 'threat', w: 320 },
          { id: 'pol', x: 1200, y: 690, icon: 'scale', label: 'Policy check', sub: 'allowed for this task?', k: 'human', w: 300 },
          { id: 'con', x: 700, y: 690, icon: 'stop', label: 'Block or step up', sub: 'deny, or ask a human', k: 'control', w: 300 },
          { id: 'inv', x: 230, y: 690, icon: 'search', label: 'Investigate', sub: 'trace, prompts, sources', k: 'model', w: 300 } ],
        edges: [{ from: 'prof', to: 'base', k: 'data' }, { from: 'base', to: 'dev', k: 'neutral' }, { from: 'dev', to: 'pol', k: 'threat' }, { from: 'pol', to: 'con', k: 'human' }, { from: 'con', to: 'inv', k: 'control' }],
        steps: [
          { show: 'prof', hi: 'prof' },
          { show: 'base prof-base', flow: 'prof-base', hi: 'base' },
          { show: 'dev base-dev', flow: 'base-dev', hi: 'dev', mark: { dev: 'alert' } },
          { show: 'pol dev-pol', flow: 'dev-pol', hi: 'pol' },
          { show: 'con pol-con', flow: 'pol-con', hi: 'con', mark: { con: 'lock' } },
          { show: 'inv con-inv', flow: 'con-inv', hi: 'inv' } ],
        say: 'Here is how to detect an agent going off-script. Every agent has a purpose profile, recorded when it was approved: the tools and data it needs for its job. | Monitoring builds a behaviour baseline: which tools it normally calls, how often, and with how much data. | A deviation appears: a new tool, a new data domain, or far more records than usual. | A policy check asks whether this action is allowed for the current task and user. | If not, the call is blocked, or escalated to a human for step-up approval. | And investigators examine the trace: what the agent read, which prompts or documents preceded the change, and on whose behalf it was acting.' },
      { t: 'compare', title: 'Two kinds of misuse', labels: ['What it is', 'Key signal', 'First response'],
        cols: [{ h: 'Unauthorised', icon: 'attacker', k: 'threat' }, { h: 'Over-privileged', icon: 'robot', k: 'human' }],
        rows: [
          ['Someone using access they shouldn’t have', 'A legitimate agent with more rights than it needs'],
          ['Unknown caller, location or client', 'Granted rights far exceed rights used'],
          ['Revoke and rotate the credential', 'Restrict scope; review recent actions'] ],
        say: 'It helps to separate two kinds of misuse. | An unauthorised identity is someone using access they shouldn’t have, such as a stolen key. An over-privileged agent is a legitimate agent holding more rights than its job needs. | The unauthorised identity shows up as an unknown caller, location or client. The over-privileged agent shows up as a large gap between the rights it was granted and the rights it actually uses, and becomes dangerous the moment it is manipulated. | The first response to an unauthorised identity is to revoke and rotate the credential. For an over-privileged agent, restrict its scope, and check whether its extra rights have already been used.' },
      { t: 'timeline', title: 'A stolen agent token', events: [
          { y: '02:14', h: 'Token used from new network', d: 'Not the agent’s usual host' },
          { y: '02:15', h: 'Scope request rises', d: 'Asks for write access to CRM' },
          { y: '02:16', h: 'Bulk export attempted', d: '10× normal record volume' },
          { y: '02:16', h: 'Policy denies; alert', d: 'Correlated: token misuse' },
          { y: '02:20', h: 'Token revoked', d: 'Agent re-issued; hunt begins' } ],
        say: 'Here is a short example, from the middle of the night. | At fourteen minutes past two in the morning, an agent’s token is used from a network the agent has never run from. | A minute later, the caller asks for write access to the customer system, beyond the agent’s profile. | It then attempts a bulk export of ten times the agent’s normal record volume. | Policy denies the export, and the SIEM correlates all three signals into one token-misuse alert. | Within minutes, the token is revoked, the agent is issued fresh credentials, and a threat hunt starts to find where the token was stolen from.' },
      { t: 'summary', items: ['Watch for keys outside their app, unknown callers and odd locations', 'Profile each agent’s purpose; baseline its tools and volumes', 'Block or step up deviations; investigate the trace', 'Close the gap between granted and used rights'],
        say: 'To recap. | Watch for keys used outside their application, unknown callers and unusual locations. | Give every agent a purpose profile, and baseline its tools, data and volumes. | Block deviations, or escalate them for human approval, and investigate the trace behind them. | And keep closing the gap between the rights agents are granted and the rights they actually use.' } ] },
    { type: 'text', md: `### Detecting unauthorised identities
- **Bind credentials to context:** record which workload, network and client each key or token is expected to come from. Alert when that changes. Proof-of-possession tokens make stolen tokens harder to replay (Module 4.5).
- **Compare callers with the inventory:** every identity calling AI services should be in the identity inventory with an owner (Module 4.7). Unknown callers are either shadow AI or an attacker.
- **Use identity threat detection:** impossible travel, token replay, unusual consent grants and new OAuth applications requesting AI scopes.
- **Watch for extraction patterns:** high volumes of systematically varied queries, requests for full probability outputs, or coverage of the input space that no real user needs (Module 3.6).
- **Detect leaked keys outside:** secret scanning services and threat intelligence report AI provider keys exposed in public repositories and paste sites (Section 3).

### Detecting agency misuse
Excessive agency (OWASP LLM06) becomes an incident when an agent’s permissions, autonomy or functionality are used beyond its purpose, whether through manipulation, error or misconfiguration (Module 4.6).
| Signal | Possible meaning |
|---|---|
| First use of a tool or scope | Hijacking, over-delegation or a configuration change |
| Data accessed outside the agent’s domain | Lateral movement or a confused deputy |
| Action volumes far above baseline | Loops, automation abuse or bulk exfiltration |
| High-impact action without the expected approval | Bypassed control or policy gap |
| Actions on behalf of a user who didn’t start a session | Token misuse or broken delegation |
| Delegation chains longer than designed | Agents recruiting other agents beyond intent |

### Responding to findings
Unauthorised identities: **revoke and rotate**, then hunt for related activity. Over-privileged agents: **reduce scope** to what the agent uses, **review recent actions** taken with the excess rights, and fix the provisioning process that granted them. Both feed the access review and ISPM processes in Module 4.7.` },
    { type: 'flip', title: 'Misuse signals', cards: [
      ['Key used outside its application', 'A credential appearing from a host, network or client it was never issued to: a likely leak.'],
      ['Granted versus used rights', 'A large gap shows an over-privileged identity, dangerous if it is manipulated or stolen.'],
      ['First use of a tool', 'A new tool or scope for an agent can mean hijacking, over-delegation or an unapproved change.'],
      ['Confused deputy', 'An agent with broad rights is tricked into using them for someone who lacks those rights.'],
      ['Extraction pattern', 'High-volume, systematically varied queries that map the model’s behaviour rather than serve a user.'] ] },
    { type: 'callout', kind: 'exam', title: 'Misuse questions', md: `Distinguish **unauthorised identities** (revoke and rotate) from **over-privileged agents** (reduce scope, review actions). Strong detection compares behaviour with each identity’s **expected context and purpose**. Granting more permissions to stop an agent "failing" is a classic wrong answer.` },
    { type: 'check', q: { q: 'Monitoring shows that a document-summarising agent has started calling a payments API it was granted at launch but has never used before. What should happen FIRST?', o: ['Allow the calls, because the agent was formally granted the permission at launch', 'Block or hold the calls, alert the owner and SOC, and investigate the trace', 'Delete the agent and rebuild it from scratch with a different model', 'Ask the payments team whether the amounts involved look reasonable to them'], a: 1, b: 2,
      why: 'A first use of a high-risk tool outside the agent’s purpose is a strong misuse signal, so contain it and investigate. Having the permission doesn’t make the use legitimate, deleting the agent destroys evidence, and checking amounts misses the point.' } }
  ]
};
