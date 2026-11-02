/* 5.7 · Section 4: post-incident reviews, lessons learned and TTP register updates */
module.exports = {
  title: 'Post-incident reviews, lessons learned and TTP registers', covers: [4],
  blocks: [
    { type: 'video', title: 'Learning from every incident', kicker: 'Module 5.7 · Video 4 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.7 · Recovery and continuity', title: 'Learning from every incident', sub: 'Post-incident reviews, lessons learned and TTP registers', icon: 'book',
        say: 'An incident that doesn’t change anything will happen again. The post-incident review turns a painful experience into stronger defences. | This video covers post-incident reviews, turning lessons into actions, and updating the register of attacker tactics, techniques and procedures.' },
      { t: 'flow', title: 'A post-incident review',
        nodes: [
          { id: 'sch', x: 230, y: 330, icon: 'calendar', label: 'Schedule promptly', sub: 'within days, not months', k: 'neutral', w: 320 },
          { id: 'ev', x: 700, y: 330, icon: 'clock', label: 'Gather the record', sub: 'timeline, evidence, decisions', k: 'data', w: 330 },
          { id: 'mtg', x: 1200, y: 330, icon: 'users', label: 'Blameless review', sub: 'every role present', k: 'human', w: 300 },
          { id: 'find', x: 1200, y: 690, icon: 'search', label: 'Findings', sub: 'what worked, what didn’t', k: 'model', w: 300 },
          { id: 'act', x: 700, y: 690, icon: 'list', label: 'Actions', sub: 'owners, dates, verification', k: 'control', w: 320 },
          { id: 'share', x: 230, y: 690, icon: 'megaphone', label: 'Share and track', sub: 'to closure', k: 'threat', w: 290 } ],
        edges: [{ from: 'sch', to: 'ev', k: 'neutral' }, { from: 'ev', to: 'mtg', k: 'data' }, { from: 'mtg', to: 'find', k: 'human' }, { from: 'find', to: 'act', k: 'model' }, { from: 'act', to: 'share', k: 'control' }],
        steps: [
          { show: 'sch', hi: 'sch' },
          { show: 'ev sch-ev', flow: 'sch-ev', hi: 'ev' },
          { show: 'mtg ev-mtg', flow: 'ev-mtg', hi: 'mtg' },
          { show: 'find mtg-find', flow: 'mtg-find', hi: 'find' },
          { show: 'act find-act', flow: 'find-act', hi: 'act' },
          { show: 'share act-share', flow: 'act-share', hi: 'share', mark: { share: 'ok' } } ],
        say: 'A post-incident review follows six steps. Schedule it promptly, within days of the incident closing, while memories are fresh. | Gather the record: the timeline, evidence, decisions log and root cause analysis. | Hold a blameless review with every role that took part, from the SOC to legal and communications. | Agree the findings: what worked, what didn’t, and why. | Turn them into actions, each with an owner, a due date and a way to verify it. | And share the lessons, then track every action to closure.' },
      { t: 'bullets', title: 'Questions a good AI review asks', layout: 'grid', cols: 2, items: [
          { icon: 'eye', h: 'How was it detected?', d: 'And how could it be detected sooner?', k: 'data' },
          { icon: 'lock', h: 'How fast was containment?', d: 'What slowed it down?', k: 'control' },
          { icon: 'book', h: 'Did the playbooks fit?', d: 'Were AI scenarios covered?', k: 'human' },
          { icon: 'users', h: 'Did escalation work?', d: 'Roles, authority, timing', k: 'neutral' },
          { icon: 'gavel', h: 'Were duties met?', d: 'Notification clocks, contracts', k: 'model' },
          { icon: 'shield', h: 'What would have prevented it?', d: 'Controls, design, process', k: 'threat' } ],
        say: 'A good AI post-incident review asks six questions. | How was the incident detected, and how could it have been detected sooner? | How quickly was it contained, and what slowed containment down? | Did the playbooks fit, and did they cover this AI scenario? | Did escalation work: were roles, authority and timing clear? | Were legal duties met, including notification clocks and contractual commitments? | And what would have prevented it: which controls, design changes or processes?' },
      { t: 'code', title: 'Updating the TTP register', file: 'ttp-register/TTP-AI-017.yaml',
        code: `id: TTP-AI-017
name: Indirect injection via supplier pages
atlas: LLM Prompt Injection (indirect)
first_seen: 2026-10-12
targets: research agents with web.fetch
detections: R-311 carrier scan; R-207 egress
mitigations: content isolation; email allow-list
tests: replay set RS-44 in CI
shared: sector ISAC (TLP:AMBER)`,
        hl: [null, [1, 4], [5, 5], [6, 7], [8, 8], [9, 9]],
        notes: [{ h: 'One entry per technique', d: 'The TTP register records how attackers have operated against you.' }, { h: 'What and when', d: 'A name, its ATLAS mapping and when it was first seen.', k: 'data' }, { h: 'Where it applies', d: 'Which systems are exposed to this technique.', k: 'human' }, { h: 'Defences', d: 'The detections and mitigations now in place.', k: 'control' }, { h: 'Proof', d: 'Regression tests that run on every release.', k: 'model' }, { h: 'Shared', d: 'Intelligence passed to peers, with sharing limits.', k: 'neutral' }],
        say: 'A TTP register records how attackers have actually operated against you, and what you have done about it. | Each entry names the technique, maps it to MITRE ATLAS and records when it was first seen. | It records which systems are exposed: here, research agents that can fetch web pages. | It lists the detections and mitigations now in place. | It points to regression tests, such as the incident replay set, that run on every release. | And it records what was shared with peers, here a sector ISAC, under traffic light protocol amber.' },
      { t: 'compare', title: 'Lessons learned or lessons applied?', labels: ['Report', 'Playbooks', 'Detection', 'Intelligence'],
        cols: [{ h: 'Learned', icon: 'doc', k: 'neutral' }, { h: 'Applied', icon: 'check', k: 'control' }],
        rows: [
          ['Report filed', 'Actions tracked to closure'],
          ['Playbook unchanged', 'Playbook updated and exercised'],
          ['Gap noted', 'New rule deployed and tested'],
          ['Kept internal', 'Shared with ISACs and partners'] ],
        say: 'The difference between lessons learned and lessons applied is follow-through. | Filing a report isn’t enough; actions must be tracked to closure. | A playbook left unchanged repeats the same mistakes; update it, and exercise the change. | Noting a detection gap doesn’t close it; deploy and test a new rule. | And intelligence kept internal helps nobody else; share it with ISACs and partners.' },
      { t: 'summary', items: ['Review promptly, blamelessly, with every role', 'Ask about detection, containment, playbooks, escalation, duties, prevention', 'Turn findings into owned, dated, verified actions', 'Update the TTP register, threat models and detections; share'],
        say: 'To recap. | Review every significant incident promptly and blamelessly, with every role involved. | Ask about detection, containment, playbooks, escalation, legal duties and prevention. | Turn findings into actions with owners, dates and verification, and track them to closure. | And update the TTP register, threat models, detections and tests, and share what you learned.' } ] },
    { type: 'text', md: `### Post-incident reviews
NIST SP 800-61 Revision 3 (2025) aligns incident response with the NIST Cybersecurity Framework 2.0 and treats lessons learned as part of **continuous improvement** across all functions, not a single final step. In practice:
- **Timing:** hold the review within days to two weeks of closure; for long incidents, hold interim reviews.
- **Participants:** the incident lead, SecOps, MLOps, data science, model and data owners, legal, privacy, communications and any key suppliers.
- **Blameless:** focus on systems, controls and decisions under real conditions; people speak openly only if they aren’t punished for honest mistakes (Module 5.6).
- **Metrics:** time to detect, time to contain, time to recover, notification timeliness, and impact (data, users, cost).
- **Outputs:** a short report, a prioritised action list with owners and dates, and updates to playbooks, runbooks, threat models, risk registers, training and exercises.

### What to update after an AI incident
| Artefact | Typical updates |
|---|---|
| **TTP register** | New or changed techniques, mapped to ATLAS and ATT&CK, linked to detections, mitigations and tests |
| **Threat models** | New attack paths and assumptions that failed (Module 6.1) |
| **Detections** | New rules and baselines; tuning to reduce noise (Modules 5.2 and 5.3) |
| **Regression suites** | Incident replay sets added permanently (Module 5.6) |
| **Playbooks and runbooks** | Steps that were missing, slow or unclear (Module 5.1) |
| **Risk and vulnerability registers** | Updated likelihood and impact; new findings (Module 5.4) |
| **Training and exercises** | Scenarios based on what actually happened |
| **Supplier management** | Contract, assessment and monitoring changes for providers involved (Module 6.3) |

### The TTP register
A **TTP register** is an internal catalogue of adversary tactics, techniques and procedures observed against the organisation or its sector. Each entry records the technique, its ATLAS or ATT&CK mapping, exposed systems, detections, mitigations, regression tests and sharing status. It connects incidents to defences and keeps knowledge from leaving with individual staff.

### Sharing lessons
Share indicators and techniques through ISACs, partners and, where appropriate, AI providers, using **STIX and TAXII** and the **Traffic Light Protocol (TLP)** to signal how widely information may be passed on (Module 5.2). Remove personal and sensitive data first, and follow legal advice.` },
    { type: 'flip', title: 'Post-incident terms', cards: [
      ['Post-incident review', 'A structured, blameless review of an incident that produces owned, dated and verified improvement actions.'],
      ['TTP register', 'An internal catalogue of attacker techniques seen against you, linked to detections, mitigations and tests.'],
      ['Traffic Light Protocol (TLP)', 'Labels such as TLP:CLEAR, GREEN, AMBER and RED that tell recipients how widely they may share information.'],
      ['Time to contain', 'The time from detection to stopping an incident from causing further harm; a key response metric.'],
      ['Lessons applied', 'Findings that have led to verified changes, not just a report.'] ] },
    { type: 'callout', kind: 'exam', title: 'Post-incident questions', md: `The best answers hold a **prompt, blameless** review, produce **owned, dated, verified actions**, and update **playbooks, detections, regression tests, threat models and the TTP register**. Sharing with **ISACs** using **TLP** is good practice. A report that sits on a shelf, or a review that looks for someone to blame, is the classic wrong answer.` },
    { type: 'check', q: { q: 'Six months after an AI incident, the same type of attack succeeds again. The post-incident report had recommended a new detection rule. What is the MOST likely failure?', o: ['The original post-incident review was held too soon after the incident', 'The action had no owner, date or verification, so it was never applied', 'The attackers were noticeably more skilled and better prepared the second time', 'The report was too long for busy managers to read through in full'], a: 1, b: 4,
      why: 'Lessons only help when actions are owned, scheduled, verified and tracked to closure. Without that, recommendations stay on paper and the same gap is exploited again.' } }
  ]
};
