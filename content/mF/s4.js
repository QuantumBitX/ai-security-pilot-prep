/* F · Section 4: high-yield review of Domains 5 and 6 */
module.exports = {
  title: 'Domains 5 and 6: high-yield review', covers: [],
  blocks: [
    { type: 'video', title: 'Operations, threats and testing, revisited', kicker: 'Final review · Video 4 of 4', scenes: [
      { t: 'title', kicker: 'Final review', title: 'Operations, threats and testing, revisited', sub: 'High-yield review of Domains 5 and 6', icon: 'siren',
        say: 'Domain five, secure AI operations and incident response, is nineteen per cent of the exam. Domain six, AI threats, testing and lifecycle management, is seventeen per cent. They test whether you can run AI securely day to day, and find and fix its weaknesses. | This video revisits the ideas from both domains that questions return to most often.' },
      { t: 'bullets', title: 'Domain 5: operations and incident response', layout: 'grid', cols: 2, items: [
          { icon: 'gear', h: 'Readiness', d: 'Roles, RACI, runbooks, release criteria', k: 'neutral' },
          { icon: 'pipeline', h: 'Telemetry', d: 'Prompts, retrieval, tools, one trace ID', k: 'data' },
          { icon: 'eye', h: 'Detection', d: 'Inputs, retrieval, outputs, agents, cost', k: 'model' },
          { icon: 'bug', h: 'Vulnerabilities', d: 'Register, prioritise by context, patch', k: 'human' },
          { icon: 'siren', h: 'Containment', d: 'Ladder: guardrails up to offline', k: 'threat' },
          { icon: 'rollback', h: 'Recovery and review', d: 'Clean versions, RTO, blameless PIR', k: 'control' } ],
        say: 'Domain five in six ideas. | Readiness: named roles in a RACI, playbooks and runbooks, pre-agreed authority to stop a model, and release criteria that include monitoring and rollback. | Telemetry: prompts, outputs, retrieval, tool calls and guardrail decisions, joined by one trace ID, with sensitive content masked at collection and logs protected from tampering. | Detection across inputs, retrieved content, outputs, agent behaviour and cost, combining rules, classifiers and baselines. | Vulnerability management: a register covering models, data and agents, prioritised by exposure and consequence rather than base scores alone. | Containment climbs a ladder, from tighter guardrails through throttling, restriction, isolation and rollback to taking a system offline, preserving evidence throughout. | And recovery: restore only verified clean versions, meet recovery objectives, and run blameless post-incident reviews that update playbooks and the threat register.' },
      { t: 'bullets', title: 'Domain 6: threats, testing and lifecycle', layout: 'grid', cols: 2, items: [
          { icon: 'target', h: 'Threat modelling', d: 'STRIDE, PASTA, MAESTRO; ATLAS', k: 'threat' },
          { icon: 'cycle', h: 'Secure lifecycle', d: 'Gates, versioning, staged rollouts', k: 'model' },
          { icon: 'fingerprint', h: 'Supply chain', d: 'Assurance, licences, provenance, AIBOM', k: 'data' },
          { icon: 'attacker', h: 'Testing', d: 'Scoped, repeated, red-teamed', k: 'human' },
          { icon: 'doc', h: 'Findings', d: 'Triage, classify, map, reproduce, report', k: 'neutral' },
          { icon: 'shieldcheck', h: 'Mitigations', d: 'Targeted, prioritised, validated', k: 'control' } ],
        say: 'Domain six in six ideas. | Threat modelling: STRIDE for categories, PASTA for risk, MAESTRO for agentic layers, drawing threats from MITRE ATLAS and the OWASP lists. | Secure lifecycle: security gates in MLOps and LLMOps pipelines, every behaviour-changing component versioned in a release manifest, and staged rollouts with tested rollback. | Supply chain: read assurance evidence critically, check licences along the pedigree, verify provenance with hashes and signatures, and maintain AI bills of materials. | Testing: scope the whole system under rules of engagement, test every entry point safely, repeat tests and report success rates, and combine human red teaming with automation. | Findings: triage by severity, exploitability, reproducibility and impact; separate vulnerabilities from model limitations; map to frameworks; and communicate for each audience. | And mitigations: target root causes, prioritise by risk and feasibility, validate with regression tests, and monitor residual risk.' },
      { t: 'summary', items: ['Prepare roles and runbooks; collect joined, protected telemetry', 'Contain first, preserve evidence, recover to clean versions', 'Model threats, gate the lifecycle, verify the supply chain', 'Test safely and repeatedly; fix root causes; watch residual risk'],
        say: 'To recap. | Prepare roles and runbooks, and collect joined, protected telemetry. | In incidents, contain first, preserve evidence, and recover only to verified clean versions. | Model threats, gate the lifecycle, and verify the supply chain. | And test safely and repeatedly, fix root causes, and keep watching the residual risk.' } ] },
    { type: 'text', md: `### Domain 5: secure AI operations and incident response (19%)
| Topic | Remember |
|---|---|
| **Readiness** | No standing production access; RACI with named deputies; pre-agreed authority to stop a model; playbooks decide, runbooks execute (Module 5.1) |
| **Telemetry** | Collect prompts, outputs, retrieval, tool calls and guardrail decisions; one trace ID; mask at collection; protect log integrity (Module 5.2) |
| **Detection** | Scan retrieved content, not just prompts; baseline agents; treat cost anomalies as security signals; verify model and data integrity at runtime (Module 5.3) |
| **Vulnerabilities** | Register model, data, configuration, supply chain and agent weaknesses; prioritise with context (CVSS, EPSS, KEV, SSVC); AIBOM matching (Module 5.4) |
| **Response** | Classify (injection, jailbreak, poisoning, theft, leakage, agent misuse); severity; legal early for notification clocks; containment ladder; suspend pipelines; terminate agents safely (Module 5.5) |
| **Investigation** | AI kill chains mapped to ATLAS; one UTC timeline; root causes; attribution with stated confidence; eradicate across data, models, indexes and memory (Module 5.6) |
| **Recovery** | Roll back, restore or rebuild to verified versions; RTO and RPO; circuit breakers and kill switches; blameless reviews; secure decommissioning (Module 5.7) |

### Domain 6: AI threats, testing and lifecycle management (17%)
| Topic | Remember |
|---|---|
| **Threat modelling** | STRIDE, PASTA, MAESTRO; actors including insiders and non-human actors; adversarial ML attacks; GenAI, RAG and agent threats; availability and cost attacks (Module 6.1) |
| **Lifecycle and change** | Security at every stage; environment separation; everything that changes behaviour is a change; release manifests; canaries and rollback of the whole bundle (Module 6.2) |
| **Supply chain** | Read SOC 2 scope, exceptions and CUECs; data ownership and licences along the pedigree; hashes, signatures and attestations; AIBOMs with VEX (Module 6.3) |
| **Testing** | Scope, objectives, scenarios and rules of engagement; canaries; attack success rates; red teaming cycle and frameworks; AI-assisted tools with calibrated judges (Module 6.4) |
| **Findings** | Triage factors; vulnerability versus limitation; ATLAS, OWASP and CWE mapping; reproduction packages; audience-specific reporting (Module 6.5) |
| **Mitigations** | Targeted controls and injection-resistant design patterns; filtering, sandboxing, rate limiting, watermarking; prioritisation with interim controls; regression gates; residual risk monitoring (Module 6.6) |` },
    { type: 'match', title: 'Which step comes first?', pairs: [
      ['An agent is making unexpected changes in production', 'Contain it, preserving evidence'],
      ['A new AI feature is proposed for a high-risk use', 'Threat model and tier it'],
      ['A red team finding has been fixed', 'Retest with variants before closing'],
      ['A provider announces a model retirement', 'Raise a change and evaluate the replacement'],
      ['A public dataset you used is reported as poisoned', 'Query AIBOMs and lineage to find affected models'] ] },
    { type: 'check', q: { q: 'Testing shows a fix reduced attack success from 30% to 2%. The team wants to close the finding. What should ALSO be confirmed?', o: ['That the original tester personally agrees with the team’s choice of fix', 'That utility holds, variants fail, and the cases join a regression gate', 'That the model vendor has published a public statement about the attack', 'That the finding has been open for at least a full quarter of the year'], a: 1, b: 4,
      why: 'Validation needs held-out variants, preserved utility and ongoing regression protection, so the fix generalises and stays effective.' } }
  ]
};
