/* 5.1 · Section 4: operational playbooks, runbooks and tabletop simulations (data poisoning, model tampering) */
module.exports = {
  title: 'Playbooks, runbooks and tabletop exercises', covers: [4],
  blocks: [
    { type: 'video', title: 'Rehearsing the bad day', kicker: 'Module 5.1 · Video 4 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.1 · AI SecOps foundations', title: 'Rehearsing the bad day', sub: 'Playbooks, runbooks and tabletop simulations', icon: 'book',
        say: 'Nobody wants to work out for the first time, mid-incident, how to tell whether a model has been poisoned, or how to roll back a tampered one. | This video covers the operational playbooks, runbooks and tabletop exercises that prepare teams for AI incidents.' },
      { t: 'compare', title: 'Playbooks and runbooks', labels: ['Level', 'Audience', 'Example', 'Contents'],
        cols: [{ h: 'Playbook', icon: 'book', k: 'human' }, { h: 'Runbook', icon: 'list', k: 'control' }],
        rows: [
          ['What to do, and who decides', 'Exactly how to do one task'],
          ['Incident leads and managers', 'Engineers on call'],
          ['Suspected training data poisoning', 'Roll back to the last signed model'],
          ['Triggers, roles, decisions, comms', 'Commands, checks, expected results'] ],
        say: 'Playbooks and runbooks work together. | A playbook describes what to do in a type of incident, and who decides. A runbook describes exactly how to carry out one task. | Playbooks are for incident leads and managers. Runbooks are for the engineers on call. | For example, a playbook covers suspected training data poisoning, and it calls a runbook for rolling back to the last signed model. | Playbooks contain triggers, roles, decision points and communications. Runbooks contain commands, checks and the results to expect at each step.' },
      { t: 'bullets', title: 'AI playbooks to have ready', layout: 'grid', cols: 2, items: [
          { icon: 'bug', h: 'Data poisoning', d: 'Suspect data or behaviour shift', k: 'threat' },
          { icon: 'hash', h: 'Model tampering or theft', d: 'Weights altered or copied', k: 'model' },
          { icon: 'chat', h: 'Prompt injection abuse', d: 'Jailbreaks, hijacked agents', k: 'data' },
          { icon: 'eye', h: 'Sensitive data leakage', d: 'Outputs exposing data', k: 'human' },
          { icon: 'robot', h: 'Agent misbehaviour', d: 'Harmful or runaway actions', k: 'neutral' },
          { icon: 'cloud', h: 'Provider failure', d: 'Outage or unsafe update', k: 'control' } ],
        say: 'Six AI playbooks cover most scenarios. | Data poisoning: suspicious data, or an unexplained shift in model behaviour. | Model tampering or theft: weights altered in storage, or copied out. | Prompt injection abuse: jailbreaks, or agents hijacked through the content they read. | Sensitive data leakage through outputs. | Agent misbehaviour: harmful, unauthorised or runaway actions. | And provider failure: an outage, or an update that makes a hosted model unsafe.' },
      { t: 'flow', title: 'Outline of a data poisoning playbook',
        nodes: [
          { id: 'sig', x: 220, y: 330, icon: 'siren', label: 'Signal', sub: 'drift, canaries, reports', k: 'threat', w: 290 },
          { id: 'tri', x: 680, y: 330, icon: 'search', label: 'Triage and scope', sub: 'lineage: which data, models', k: 'human', w: 320 },
          { id: 'con', x: 1150, y: 330, icon: 'lock', label: 'Contain', sub: 'freeze pipeline, roll back', k: 'control', w: 300 },
          { id: 'inv', x: 1150, y: 690, icon: 'fingerprint', label: 'Investigate', sub: 'data diffs, access logs', k: 'data', w: 290 },
          { id: 'era', x: 680, y: 690, icon: 'filter', label: 'Eradicate', sub: 'clean data, retrain', k: 'model', w: 280 },
          { id: 'rec', x: 220, y: 690, icon: 'cycle', label: 'Recover and learn', sub: 'monitor, review', k: 'neutral', w: 290 } ],
        edges: [{ from: 'sig', to: 'tri', k: 'threat' }, { from: 'tri', to: 'con', k: 'human' }, { from: 'con', to: 'inv', k: 'control' }, { from: 'inv', to: 'era', k: 'data' }, { from: 'era', to: 'rec', k: 'model' }],
        steps: [
          { show: 'sig', hi: 'sig', mark: { sig: 'alert' } },
          { show: 'tri sig-tri', flow: 'sig-tri', hi: 'tri' },
          { show: 'con tri-con', flow: 'tri-con', hi: 'con', mark: { con: 'lock' } },
          { show: 'inv con-inv', flow: 'con-inv', hi: 'inv' },
          { show: 'era inv-era', flow: 'inv-era', hi: 'era' },
          { show: 'rec era-rec', flow: 'era-rec', hi: 'rec', mark: { rec: 'ok' } } ],
        say: 'Here is the outline of a data poisoning playbook. It starts with a signal: unexplained drift, failing canary tests, a backdoor-like trigger found by red teamers, or a report from a data supplier. | Triage uses lineage to scope the problem: which datasets are affected, and which models were trained on them. | Containment freezes the affected pipelines and rolls back to the last model trained before the suspect data arrived. | Investigation compares data versions and reviews access logs, to find what changed, when and by whom. | Eradication removes or repairs the bad data, and retrains from clean sources. | And recovery restores service with extra monitoring, followed by a review that updates the playbook itself.' },
      { t: 'bullets', title: 'Running a useful tabletop exercise', layout: 'grid', cols: 2, items: [
          { icon: 'target', h: 'A realistic scenario', d: 'Based on your real systems', k: 'data' },
          { icon: 'users', h: 'Every role present', d: 'SecOps, MLOps, data, legal, comms', k: 'human' },
          { icon: 'bolt', h: 'Injects', d: 'New facts that force decisions', k: 'threat' },
          { icon: 'clock', h: 'Real time pressure', d: 'Regulatory clocks included', k: 'neutral' },
          { icon: 'doc', h: 'Capture gaps', d: 'What was missing or unclear', k: 'model' },
          { icon: 'check', h: 'Close the actions', d: 'Owners and dates for fixes', k: 'control' } ],
        say: 'A tabletop exercise walks the team through an incident in a meeting room, without touching production. Six ingredients make it useful. | A realistic scenario based on your own systems, such as tampered weights found in the model registry. | Every role present: security operations, MLOps, data science, the model owner, legal and communications. | Injects: new facts introduced during the exercise, such as a journalist’s call or evidence the backdoor has been live for a month. | Real time pressure, including regulatory notification clocks. | A careful record of gaps: missing runbooks, unclear decision rights, absent logs. | And actions with owners and dates, followed through to completion.' },
      { t: 'summary', items: ['Playbooks decide and coordinate; runbooks execute', 'Prepare for poisoning, tampering, injection, leakage, agents, providers', 'Use lineage to scope; roll back to a clean, signed model', 'Exercise with all roles, injects and time pressure; close the gaps'],
        say: 'To recap. | Playbooks set out decisions and coordination; runbooks give the exact steps. | Prepare playbooks for poisoning, tampering, injection, leakage, agent misbehaviour and provider failure. | In poisoning cases, use lineage to scope the damage, and roll back to a clean, signed model. | And exercise the plans with every role, realistic injects and time pressure, then close the gaps you find.' } ] },
    { type: 'text', md: `### Playbook contents
A good AI incident playbook includes:
- **Triggers and indicators:** what starts it (detections, reports, threshold breaches).
- **Severity criteria** and the AI-specific triage taxonomy (Module 5.5).
- **Roles and decision rights**, including who can contain without further approval (Section 2).
- **Decision points:** for example, *roll back or restrict? retrain or unlearn? notify now or after investigation?*
- **Containment options** with links to runbooks: switch to fallback, disable an agent, freeze a pipeline, revoke keys, block a tool.
- **Evidence to preserve:** model weights and versions, configurations, prompts, logs, dataset snapshots (Module 5.5).
- **Communications:** internal, customer and regulatory, with clocks such as GDPR’s 72 hours for personal data breaches, NIS2’s 24-hour early warning, and EU AI Act serious incident reporting for high-risk systems.

### Runbooks
Runbooks are **specific, tested and current**: model rollback to the last signed version; registry quarantine of a suspect model; revoking and rotating model provider keys; disabling an agent identity; freezing training pipelines; restoring a vector index from a clean snapshot. Automate the safe ones in SOAR (Module 5.2), keep a human approval step for destructive actions, and test them in game days (Module 4.4).

### Tabletop exercises
- Follow an exercise programme (NIST SP 800-84 describes test, training and exercise programmes for IT plans).
- Start with discussion-based tabletops, then progress to functional exercises in test environments.
- Useful AI scenarios: poisoned data from a labelling vendor; tampered weights in the registry; an agent leaking data after reading a malicious email; theft of a fine-tuned model; a provider update that removes safety behaviour; a deepfake of an executive used to authorise a payment.
- Collaborate across organisations where possible: in 2024, CISA’s Joint Cyber Defense Collaborative ran an AI-focused tabletop exercise with industry partners, and in January 2025 it published an AI Cybersecurity Collaboration Playbook for sharing information about AI incidents.
- After each exercise, update playbooks and runbooks, and track actions to closure.` },
    { type: 'callout', kind: 'exam', title: 'Preparation questions', md: `Look for preparation that is **specific to AI** (lineage-based scoping, rollback to signed models, evidence such as weights and dataset snapshots), **exercised** with all roles, and **improved** after each exercise. A generic IT incident plan with no AI scenarios is a gap.` },
    { type: 'check', q: { q: 'A tabletop exercise on model tampering reveals that nobody knows how to confirm whether production weights match the approved version. What is the BEST follow-up?', o: ['Record the finding in the exercise report, and repeat exactly the same exercise again next year', 'Write and test a runbook that checks weights against signed registry hashes; update the playbook', 'Ask the vendor of the registry tool to provide detailed training to the whole engineering team', 'Replace the production model with a new one straight away, because it may have been tampered with'], a: 1, b: 4,
      why: 'Exercises exist to find and close gaps: a tested verification runbook, referenced in the playbook, fixes this one. Just recording it leaves the gap, vendor training is incomplete, and replacing the model isn’t justified by an exercise finding.' } }
  ]
};
