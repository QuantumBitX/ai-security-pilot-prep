/* 5.5 · Section 3: AI-specific containment actions (model rollback, endpoint isolation, rate limiting) */
module.exports = {
  title: 'AI-specific containment actions', covers: [3],
  blocks: [
    { type: 'video', title: 'Stopping the damage', kicker: 'Module 5.5 · Video 3 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.5 · AI incident response', title: 'Stopping the damage', sub: 'AI-specific containment actions', icon: 'lock',
        say: 'Containment buys time: it stops an incident getting worse while the team works out what happened. AI systems offer containment options that traditional systems don’t, from tightening guardrails to rolling back a model. | This video covers AI-specific containment actions, and how to choose between them.' },
      { t: 'layers', title: 'A ladder of containment options',
        layers: [
          { icon: 'filter', label: 'Tighten guardrails', sub: 'Block patterns, sources or topics', k: 'control' },
          { icon: 'sliders', label: 'Rate limit or throttle', sub: 'Per key, account, agent or source', k: 'data' },
          { icon: 'tool', label: 'Restrict features', sub: 'Disable tools, browsing, uploads, memory', k: 'human' },
          { icon: 'network', label: 'Isolate the endpoint', sub: 'Cut network paths, revoke credentials', k: 'neutral' },
          { icon: 'rollback', label: 'Fall back or roll back', sub: 'Safe fallback, or last known-good model', k: 'model' },
          { icon: 'power', label: 'Take it offline', sub: 'Kill switch, with a manual process', k: 'threat' } ],
        say: 'Think of containment as a ladder, from least to most disruptive. | Tighten guardrails: block the attack pattern, the malicious source or the risky topic. | Rate limit or throttle a key, account, agent or source address. | Restrict features: disable risky tools, web browsing, file uploads or long-term memory. | Isolate the endpoint: cut network paths and revoke credentials it uses. | Fall back to a safe alternative, such as a simpler model or a rule-based flow, or roll back to the last known-good model. | And, if necessary, take the system offline with its kill switch, switching to a manual process.' },
      { t: 'compare', title: 'Containment by incident type', labels: ['Prompt injection', 'Jailbreak campaign', 'Data poisoning', 'Model theft'],
        cols: [{ h: 'Contain with', icon: 'lock', k: 'control' }, { h: 'Watch out for', icon: 'alert', k: 'threat' }],
        rows: [
          ['Disable risky tools; quarantine the source', 'Only patching the system prompt'],
          ['Block accounts; tighten filters; rate limit', 'Over-blocking legitimate users'],
          ['Roll back; freeze data ingestion', 'Rolling back to a poisoned version'],
          ['Revoke access; isolate model storage', 'Tipping off before evidence is saved'] ],
        say: 'The right containment depends on the incident type. | For prompt injection, disable the risky tools and quarantine the malicious source content. Don’t rely on patching the system prompt alone. | For a jailbreak campaign, block the accounts involved, tighten filters and rate limit. Watch for over-blocking legitimate users. | For data poisoning, roll back the model and freeze data ingestion. Make sure the version you roll back to was trained before the poisoned data arrived. | And for model theft, revoke access and isolate model storage, taking care not to tip off the attacker before evidence is preserved.' },
      { t: 'flow', title: 'Choosing a containment action',
        nodes: [
          { id: 'br', x: 230, y: 330, icon: 'target', label: 'Assess blast radius', sub: 'data, actions, users', k: 'threat', w: 320 },
          { id: 'opt', x: 700, y: 330, icon: 'list', label: 'Pick the least', sub: 'disruptive option that works', k: 'human', w: 330 },
          { id: 'ev', x: 1200, y: 330, icon: 'archive', label: 'Preserve first', sub: 'snapshot what will change', k: 'data', w: 310 },
          { id: 'app', x: 1200, y: 690, icon: 'lock', label: 'Apply', sub: 'logged, with authority', k: 'control', w: 280 },
          { id: 'ver', x: 700, y: 690, icon: 'eye', label: 'Verify', sub: 'is the harm stopping?', k: 'model', w: 290 },
          { id: 'com', x: 230, y: 690, icon: 'megaphone', label: 'Communicate', sub: 'users, owners, partners', k: 'neutral', w: 310 } ],
        edges: [{ from: 'br', to: 'opt', k: 'threat' }, { from: 'opt', to: 'ev', k: 'human' }, { from: 'ev', to: 'app', k: 'data' }, { from: 'app', to: 'ver', k: 'control' }, { from: 'ver', to: 'com', k: 'model' }],
        steps: [
          { show: 'br', hi: 'br' },
          { show: 'opt br-opt', flow: 'br-opt', hi: 'opt' },
          { show: 'ev opt-ev', flow: 'opt-ev', hi: 'ev', mark: { ev: 'lock' } },
          { show: 'app ev-app', flow: 'ev-app', hi: 'app' },
          { show: 'ver app-ver', flow: 'app-ver', hi: 'ver' },
          { show: 'com ver-com', flow: 'ver-com', hi: 'com', mark: { com: 'ok' } } ],
        say: 'Choosing a containment action follows a short sequence. Assess the blast radius: what data, actions and users are at risk, and how fast it is spreading. | Pick the least disruptive option that will actually stop the harm. | Preserve evidence first for anything the action will change, such as snapshotting a model before rolling it back, unless waiting would cause serious harm. | Apply the action with the right authority, and log it in the decisions log. | Verify that the harm is actually stopping, using monitoring. | And communicate with users, owners and partners about what has changed.' },
      { t: 'timeline', title: 'Containing an injection, minute by minute', events: [
          { y: '14:02', h: 'Alert', d: 'Agent follows text in a supplier page' },
          { y: '14:04', h: 'Browsing disabled', d: 'For this agent only' },
          { y: '14:06', h: 'Source blocked', d: 'Page blocked at the gateway' },
          { y: '14:09', h: 'Evidence captured', d: 'Traces and memory snapshotted' },
          { y: '14:40', h: 'Restored, safely', d: 'Content scanning added first' } ],
        say: 'Here is containment in practice, for an injection incident. | At two minutes past two, an alert shows a research agent following instructions planted in a supplier’s web page. | Two minutes later, browsing is disabled for that agent only, leaving every other agent working. | The malicious page is blocked at the gateway, so no other agent can read it. | The agent’s traces and memory are captured as evidence. | And forty minutes after the alert, browsing is restored, with content scanning added in front of it.' },
      { t: 'summary', items: ['Climb the ladder: guardrails, throttle, restrict, isolate, roll back, offline', 'Match containment to the incident type', 'Roll back only to a verified clean version', 'Preserve evidence, apply with authority, verify, communicate'],
        say: 'To recap. | Use a ladder of containment options: tighten guardrails, throttle, restrict features, isolate, fall back or roll back, and take offline. | Match the containment to the incident type. | Roll back only to a version verified as clean. | And preserve evidence first, apply actions with proper authority, verify that they work, and communicate the changes.' } ] },
    { type: 'text', md: `### Containment options in detail
| Action | When it fits | Things to check |
|---|---|---|
| **Guardrail tightening** | Active injection or jailbreak campaigns, leakage of a known pattern | False positives; whether attackers simply rephrase |
| **Rate limiting and throttling** | Extraction, abuse, denial of wallet, automated attacks | Per-identity limits rather than global ones, so legitimate users keep working |
| **Feature restriction** | Agent misuse, injection through browsing or documents | Which business processes depend on the feature |
| **Credential revocation** | Stolen keys or tokens, compromised agents | Every credential type: API keys, OAuth grants, refresh tokens (Module 5.3) |
| **Endpoint isolation** | Compromised serving hosts, model theft in progress | Preserve volatile evidence first where possible |
| **Fallback** | Model unreliable but service needed | Fallbacks must be tested and safe (Module 3.6) |
| **Model rollback** | Poisoning, tampering, unsafe model or prompt update | Roll back to a version **verified** as predating the problem; roll back prompts, guardrails and indexes too if they changed |
| **Kill switch** | Severe, spreading harm with no safer option | Manual process ready; communication plan (Module 5.7) |

### Rollback is more than the model
An AI system’s behaviour depends on its model, system prompt, guardrail configuration, retrieval index and tools. A clean rollback restores **the combination** that was known to be good, which is why configuration as code and versioned indexes matter (Module 5.1). For poisoning, use lineage to find the last model trained before the suspect data arrived, and freeze pipelines so a scheduled retraining doesn’t redeploy the poison (Section 4).

### Containment and evidence
Containment often changes the evidence: rolling back overwrites the running model, cleaning an index deletes poisoned documents, and terminating an agent loses its memory. Where the harm allows, **snapshot first** (Section 5). Where it doesn’t, act, then record exactly what was done and when. For suspected theft or insider activity, consider **quiet containment** first: restrict and monitor while preserving evidence, rather than alerting the attacker.

### Authority and records
Pre-approved containment actions let on-call staff act at once (Module 5.1); more disruptive actions need the incident lead or model owner. Every action goes in the **decisions log**: who decided, what was done, when, and why.` },
    { type: 'scenario', title: 'The poisoned support model', md: `A retailer’s support model starts recommending a competitor’s website for certain product questions. Data science finds that 3,000 poisoned examples entered a fine-tuning dataset through a labelling vendor six weeks ago. Since then, the model has been retrained twice, and another retraining is scheduled for tonight.`,
      q: { q: 'What is the BEST containment approach?', o: ['Roll back to the latest version, then ask the vendor to remove the bad examples', 'Freeze retraining, snapshot evidence, then roll back to a model trained before the poisoning', 'Add a guardrail blocking the competitor’s name, and let tonight’s retraining run as planned', 'Delete the fine-tuning dataset immediately, so the poisoned examples can’t be used again'], a: 1, b: 3,
        why: 'Freezing the pipeline stops the poison being redeployed, the snapshot preserves evidence, and lineage identifies a clean model to restore. The latest versions are both poisoned, a name block is a narrow patch, and deleting the dataset destroys evidence.' } },
    { type: 'callout', kind: 'exam', title: 'Containment questions', md: `Choose the **least disruptive action that actually stops the harm**, matched to the incident type. For poisoning, the best answers **freeze pipelines** and **roll back to a verified clean version**. For theft or insiders, think about **preserving evidence** before alerting the attacker. Patching only the system prompt is rarely the best containment.` },
    { type: 'check', q: { q: 'An attacker is systematically querying a proprietary model’s API to copy its behaviour. Which containment action is MOST appropriate first?', o: ['Delete the model and retrain a new one with different data', 'Throttle and restrict the attacking identities while preserving logs', 'Make the API free to use, so the attacker loses their advantage', 'Publish the model weights openly, so that extraction no longer matters'], a: 1, b: 3,
      why: 'Targeted throttling and restriction of the identities involved stops further extraction without disrupting legitimate users, and preserved logs support investigation and legal action. The other options are disproportionate or self-defeating.' } }
  ]
};
