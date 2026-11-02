/* 5.2 · Section 2: AI event correlation across SIEM, SOAR and threat intelligence pipelines */
module.exports = {
  title: 'Correlating AI events across SIEM, SOAR and threat intelligence', covers: [2],
  blocks: [
    { type: 'video', title: 'Joining the dots', kicker: 'Module 5.2 · Video 2 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.2 · AI security telemetry', title: 'Joining the dots', sub: 'Correlating AI events across SIEM, SOAR and threat intelligence', icon: 'link',
        say: 'A single AI event rarely proves an attack. A suspicious prompt, an unusual tool call and a large outbound message might each look harmless alone. Together, they tell a story. | This video covers how to correlate AI events across security information and event management, security orchestration and response, and threat intelligence.' },
      { t: 'flow', title: 'An AI-aware detection pipeline',
        nodes: [
          { id: 'src', x: 230, y: 330, icon: 'layers', label: 'AI telemetry', sub: 'gateway, agents, tools', k: 'data', w: 290 },
          { id: 'enr', x: 700, y: 330, icon: 'tag', label: 'Normalise and enrich', sub: 'identity, asset, model', k: 'neutral', w: 330 },
          { id: 'siem', x: 1200, y: 330, icon: 'search', label: 'SIEM correlation', sub: 'rules and analytics', k: 'human', w: 310 },
          { id: 'soar', x: 1200, y: 690, icon: 'gear', label: 'SOAR playbook', sub: 'enrich, decide, act', k: 'control', w: 290 },
          { id: 'act', x: 700, y: 690, icon: 'lock', label: 'Response', sub: 'contain, notify, case', k: 'threat', w: 280 },
          { id: 'ti', x: 230, y: 690, icon: 'globe', label: 'Threat intelligence', sub: 'indicators and TTPs', k: 'model', w: 310 } ],
        edges: [{ from: 'src', to: 'enr', k: 'data' }, { from: 'enr', to: 'siem', k: 'neutral' }, { from: 'siem', to: 'soar', k: 'human' }, { from: 'soar', to: 'act', k: 'control' }, { from: 'ti', to: 'enr', k: 'model' }],
        steps: [
          { show: 'src', hi: 'src' },
          { show: 'enr src-enr', flow: 'src-enr', hi: 'enr' },
          { show: 'siem enr-siem', flow: 'enr-siem', hi: 'siem' },
          { show: 'soar siem-soar', flow: 'siem-soar', hi: 'soar' },
          { show: 'act soar-act', flow: 'soar-act', hi: 'act', mark: { act: 'lock' } },
          { show: 'ti ti-enr', flow: 'ti-enr', hi: 'ti' } ],
        say: 'Here is an AI-aware detection pipeline. It starts with AI telemetry from gateways, agents, retrieval and tools. | Events are normalised into a common schema, then enriched: which person or agent is this, which application, which model version, and how sensitive is the data involved? | The SIEM correlates events using rules and analytics, raising alerts when patterns match. | A SOAR playbook then gathers more context, applies decision logic and takes action. | Responses include containment, such as disabling an agent or revoking a key, notifying the model owner, and opening a case. | Threat intelligence feeds the pipeline throughout, adding known bad indicators and attacker techniques to enrichment and detection.' },
      { t: 'timeline', title: 'Three weak signals, one incident', events: [
          { y: '10:02', h: 'Injection detector', d: 'Retrieved web page flagged (low)' },
          { y: '10:03', h: 'New tool use', d: 'Agent emails an unknown domain (medium)' },
          { y: '10:03', h: 'DLP match', d: 'Customer records in the message (high)' },
          { y: '10:04', h: 'Correlated incident', d: 'Same trace ID: critical alert' },
          { y: '10:05', h: 'SOAR acts', d: 'Agent paused, email held, case opened' } ],
        say: 'Here is why correlation matters, in an incident that unfolds over three minutes. | At two minutes past ten, the injection detector flags a web page that a research agent retrieved. On its own, that is a low-severity alert, and detectors like this fire often. | A minute later, the same agent sends an email to a domain it has never contacted before. Unusual, but explainable. | The data loss prevention system finds customer records in that email. | Because all three events share the same trace identifier, the SIEM joins them into one critical incident: injected content, followed by exfiltration. | Within seconds, a SOAR playbook pauses the agent, holds the email and opens a case for the analyst.' },
      { t: 'compare', title: 'SIEM, SOAR and threat intelligence', labels: ['Main job', 'AI example', 'Output'],
        cols: [{ h: 'SIEM', icon: 'search', k: 'human' }, { h: 'SOAR', icon: 'gear', k: 'control' }, { h: 'Threat intel', icon: 'globe', k: 'model' }],
        rows: [
          ['Collect, correlate, alert', 'Automate response', 'Gather and share indicators'],
          ['Injection, then data egress', 'Pause agent, revoke key', 'Known extraction sources'],
          ['Alerts and incidents', 'Actions and case records', 'Enrichment, blocklists'] ],
        say: 'Each platform has a distinct job. | The SIEM collects and correlates events and raises alerts. SOAR automates response steps. Threat intelligence gathers and shares information about attackers. | For AI, the SIEM might detect an injection followed by data leaving. SOAR pauses the agent and revokes its key. Threat intelligence supplies known sources of model extraction or abuse. | Their outputs are alerts and incidents; actions and case records; and enrichment data and blocklists.' },
      { t: 'bullets', title: 'Threat intelligence for AI', layout: 'grid', cols: 2, items: [
          { icon: 'network', h: 'Abusive infrastructure', d: 'IPs and networks behind extraction or abuse', k: 'threat' },
          { icon: 'key', h: 'Leaked credentials', d: 'Exposed AI provider keys and tokens', k: 'human' },
          { icon: 'hash', h: 'Malicious model files', d: 'Hashes of backdoored or unsafe models', k: 'model' },
          { icon: 'box', h: 'Poisoned packages', d: 'Compromised AI libraries and datasets', k: 'data' },
          { icon: 'target', h: 'Techniques and campaigns', d: 'Mapped to MITRE ATLAS', k: 'neutral' },
          { icon: 'chat', h: 'Attack patterns', d: 'Signatures of known injection styles', k: 'control' } ],
        say: 'Threat intelligence for AI covers six kinds of information. | Infrastructure linked to model extraction, abuse or automated attacks. | Leaked credentials, such as AI provider keys exposed in code repositories. | Hashes of malicious or backdoored model files on public hubs. | Compromised AI libraries, packages and datasets. | Attacker techniques and campaigns, mapped to MITRE ATLAS, so detections can be aligned with real tactics. | And descriptions of known prompt injection and jailbreak styles, turned into detection signatures.' },
      { t: 'summary', items: ['Normalise and enrich AI events with identity, asset and model context', 'Correlate weak signals by trace ID, identity and time', 'Automate safe responses with SOAR; humans for the rest', 'Feed and share AI threat intelligence, mapped to ATLAS'],
        say: 'To recap. | Normalise AI events and enrich them with identity, asset and model context. | Correlate weak signals by trace identifier, identity and time, to reveal attacks that no single event shows. | Automate safe, reversible responses with SOAR, and keep humans in the loop for the rest. | And consume and share AI threat intelligence, mapped to MITRE ATLAS.' } ] },
    { type: 'text', md: `### Making AI events usable in the SIEM
- **Normalise** events into the SIEM’s common schema, with consistent fields for identity, application, model, trace ID, action and outcome. Vendor-neutral schemas such as OCSF (Open Cybersecurity Schema Framework) help.
- **Enrich** with context: the identity provider (who is this user or agent, and who sponsors it?), the asset inventory and model registry (which application, which model version, what risk tier?) and data classification (how sensitive is what was accessed?).
- **Correlate** using several techniques:

| Technique | AI example |
|---|---|
| **Single-event rule** | A guardrail blocks an attempt to retrieve a system prompt from a production assistant |
| **Threshold** | More than 200 refusals for one API key in ten minutes |
| **Sequence** | Injection detection, then a new tool or destination, then a DLP match, within one trace |
| **Cross-domain** | An AI agent’s token used from an IP address seen in threat intelligence |
| **Anomaly (UEBA)** | A service account’s query diversity suddenly rises, suggesting model extraction (Module 5.3) |

### SOAR for AI incidents
SOAR playbooks automate **enrichment** (look up the agent’s owner, recent changes and data access), **triage** (score severity using data sensitivity and blast radius) and **response**. Automate actions that are **safe and reversible**, such as pausing an agent, holding an outbound message, throttling a key or switching to a fallback model. Keep a **human approval** step for disruptive or irreversible actions, such as deleting data, rolling back a model for all customers or notifying regulators (Module 5.5).

### Threat intelligence pipelines
- **Sources:** commercial feeds, ISACs, CERTs, open-source vulnerability databases (CVE, OSV), model-hub security advisories, AI provider threat reports on misuse, and MITRE ATLAS case studies.
- **Formats:** share indicators and techniques with **STIX 2.1** over **TAXII 2.1**, so platforms can exchange them automatically.
- **Use:** block or flag known bad infrastructure at the gateway, add hashes of malicious models to registry and pipeline checks (Module 6.3), and turn reported techniques into detections and red-team scenarios (Module 6.4).
- **Share back:** report AI incidents and indicators through sector ISACs and partners. In the US, the 2025 AI Action Plan called for an AI Information Sharing and Analysis Center (AI-ISAC) led by DHS, which was still being developed in early 2026. CISA’s JCDC AI Cybersecurity Collaboration Playbook (January 2025) describes voluntary sharing of AI incident information.

Map detections and incidents to **MITRE ATLAS** techniques (and ATT&CK for conventional steps). A shared vocabulary helps with coverage analysis ("which ATLAS techniques can we detect?"), reporting and intelligence sharing.` },
    { type: 'flip', title: 'Correlation techniques', cards: [
      ['Sequence rule', 'Events in a set order within a time window or trace: for example, injection detected, then a new destination, then a DLP match.'],
      ['Threshold rule', 'A count crossing a limit: for example, hundreds of refusals for one key in minutes.'],
      ['Enrichment', 'Adding context to events, such as the agent’s owner, the model’s risk tier or the data’s classification.'],
      ['UEBA', 'User and entity behaviour analytics: baselines per user, agent or key, with alerts on deviations.'],
      ['STIX and TAXII', 'A standard language for threat intelligence (STIX) and a protocol for exchanging it automatically (TAXII).'] ] },
    { type: 'callout', kind: 'exam', title: 'Correlation questions', md: `Look for answers that **join weak signals** (by trace ID, identity and time), **enrich** them with model and data context, and **automate safe, reversible containment**. Isolated alerts reviewed one by one, or SOAR playbooks that take irreversible actions with no human approval, are weaker choices.` },
    { type: 'check', q: { q: 'A SOC receives thousands of low-severity prompt injection alerts each week and has started ignoring them. Which improvement would BEST help it find the injections that matter?', o: ['Switch off the prompt injection detector, because its alerts are mostly noise', 'Correlate injection alerts with later tool calls, new destinations and DLP events', 'Ask the model provider to retrain its model so that it ignores injected text', 'Hire more analysts, so every individual alert can be reviewed by hand'], a: 1, b: 2,
      why: 'Correlation raises the alerts where an injection was followed by risky actions, and leaves isolated detections at low priority. Disabling the detector loses signal, retraining isn’t a SOC control, and more analysts don’t fix the noise.' } }
  ]
};
