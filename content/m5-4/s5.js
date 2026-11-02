/* 5.4 · Section 5: continuous AI security reviews and posture assurance metrics */
module.exports = {
  title: 'Continuous security reviews and posture assurance metrics', covers: [5],
  blocks: [
    { type: 'video', title: 'Are we getting more secure?', kicker: 'Module 5.4 · Video 5 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.4 · Vulnerabilities and posture', title: 'Are we getting more secure?', sub: 'Continuous AI security reviews and posture assurance metrics', icon: 'chart',
        say: 'A security review at launch tells you how things looked on one day. AI systems, threats and usage change every week. | This video covers continuous AI security reviews, and the posture metrics that show whether security is actually improving.' },
      { t: 'bullets', title: 'AI security posture management', layout: 'grid', cols: 2, items: [
          { icon: 'search', h: 'Discover AI assets', d: 'Models, endpoints, agents, shadow AI', k: 'data' },
          { icon: 'network', h: 'Map data flows', d: 'What each system can reach', k: 'neutral' },
          { icon: 'gear', h: 'Check configurations', d: 'Against secure baselines', k: 'human' },
          { icon: 'split', h: 'Find attack paths', d: 'Chains from exposure to data', k: 'threat' },
          { icon: 'target', h: 'Prioritise risks', d: 'By context and consequence', k: 'model' },
          { icon: 'check', h: 'Track remediation', d: 'Owners, deadlines, verification', k: 'control' } ],
        say: 'AI security posture management tools and processes do six things. | They discover AI assets: models, endpoints, agents, and shadow AI that nobody registered. | They map data flows, showing what each AI system can reach. | They check configurations against secure baselines. | They find attack paths: chains from an exposed endpoint, through an over-privileged identity, to sensitive data. | They prioritise risks by context and consequence. | And they track remediation, with owners, deadlines and verification.' },
      { t: 'flow', title: 'A continuous review cycle',
        nodes: [
          { id: 'trg', x: 230, y: 330, icon: 'bolt', label: 'Triggers', sub: 'change, threat, schedule', k: 'threat', w: 300 },
          { id: 'rev', x: 700, y: 330, icon: 'search', label: 'Review', sub: 'threat model, configs, tests', k: 'human', w: 320 },
          { id: 'reg', x: 1200, y: 330, icon: 'list', label: 'Register findings', sub: 'with owners and dates', k: 'neutral', w: 320 },
          { id: 'fix', x: 1200, y: 690, icon: 'tool', label: 'Remediate', sub: 'fix, mitigate, accept', k: 'control', w: 300 },
          { id: 'met', x: 700, y: 690, icon: 'chart', label: 'Measure', sub: 'posture metrics', k: 'model', w: 280 },
          { id: 'gov', x: 230, y: 690, icon: 'gavel', label: 'Report', sub: 'to governance', k: 'data', w: 280 } ],
        edges: [{ from: 'trg', to: 'rev', k: 'threat' }, { from: 'rev', to: 'reg', k: 'human' }, { from: 'reg', to: 'fix', k: 'neutral' }, { from: 'fix', to: 'met', k: 'control' }, { from: 'met', to: 'gov', k: 'model' }],
        steps: [
          { show: 'trg', hi: 'trg' },
          { show: 'rev trg-rev', flow: 'trg-rev', hi: 'rev' },
          { show: 'reg rev-reg', flow: 'rev-reg', hi: 'reg' },
          { show: 'fix reg-fix', flow: 'reg-fix', hi: 'fix' },
          { show: 'met fix-met', flow: 'fix-met', hi: 'met' },
          { show: 'gov met-gov', flow: 'met-gov', hi: 'gov', mark: { gov: 'ok' } } ],
        say: 'Continuous review runs as a cycle. Reviews are triggered by significant changes, such as a new model or new tools for an agent, by new threats, and by a schedule based on risk tier. | Each review refreshes the threat model, checks configurations and permissions, and samples the system with targeted tests. | Findings go into the vulnerability register, with owners and dates. | They are remediated: fixed, mitigated or formally accepted. | Progress is measured with posture metrics. | And results are reported to governance, which sets priorities and funding for the next cycle.' },
      { t: 'chart', title: 'Posture metrics over a year', kind: 'line', x: ['Q1', 'Q2', 'Q3', 'Q4'], yMin: 0, yMax: 100, ticks: 4, unit: '%', yLabel: 'Illustrative posture metrics for an organisation’s AI estate', legend: true,
        series: [{ n: 'AI assets with owner and current review', k: 'control', v: [42, 61, 78, 91] }, { n: 'Critical findings past due date', k: 'threat', v: [38, 27, 12, 6] }],
        steps: [{ s: [0] }, { s: [1] }],
        say: 'Good metrics show direction over time. In this illustrative example, the share of AI assets with a named owner and a current security review rises from forty-two per cent to ninety-one per cent over a year. | Meanwhile, the share of critical findings still open past their due date falls from thirty-eight per cent to six. Together, these show both coverage and follow-through improving.' },
      { t: 'compare', title: 'Vanity metrics and meaningful metrics', labels: ['Activity', 'Findings', 'Policy', 'Training'],
        cols: [{ h: 'Vanity', icon: 'star', k: 'neutral' }, { h: 'Meaningful', icon: 'target', k: 'control' }],
        rows: [
          ['Number of scans run', 'Share of AI assets assessed this quarter'],
          ['Findings raised', 'Critical findings past due date'],
          ['Policies published', 'Agents verified as least-privilege'],
          ['Courses completed', 'Shadow AI use found, and its trend'] ],
        say: 'Choose metrics that show risk, not just activity. | The number of scans run is a vanity metric. The share of AI assets actually assessed this quarter is meaningful. | Counting findings raised says little. Counting critical findings past their due date shows whether risk is being reduced. | Policies published is activity. The share of agents verified as least-privilege is outcome. | And courses completed matters less than whether shadow AI use is falling.' },
      { t: 'summary', items: ['Discover assets, map flows, check configs, find attack paths', 'Review continuously: on change, new threats and schedule', 'Measure coverage, hygiene, exposure and remediation', 'Report meaningful metrics to governance'],
        say: 'To recap. | Posture management discovers AI assets, maps data flows, checks configurations and finds attack paths. | Review continuously: on significant change, when new threats emerge, and on a risk-based schedule. | Measure coverage, hygiene, exposure and remediation. | And report meaningful metrics, not activity counts, to governance.' } ] },
    { type: 'text', md: `### Continuous security reviews
- **Triggers:** new or materially changed models, new data sources or tools, new agent permissions, provider model updates, significant incidents, new threat intelligence (for example, a new injection technique), and periodic reviews by risk tier.
- **Scope:** refresh the threat model (Module 6.1), verify configurations and permissions against baselines (Module 5.1), check exposure, sample with targeted adversarial tests (Module 6.4), and confirm monitoring coverage (Module 5.2).
- **Automation:** AI security posture management (AI-SPM) and related tools continuously discover AI assets and shadow AI, check configurations, detect exposed endpoints and secrets, and map attack paths across cloud, identity and data. Use their findings as inputs to human-led reviews.
- **Continuous control monitoring:** automated tests confirm that key controls (authentication on endpoints, logging enabled, guardrails active, signed-model enforcement) are operating, not just designed.

### Posture assurance metrics
| Area | Example metrics |
|---|---|
| **Coverage** | Share of AI assets in the inventory with an owner, risk tier and current security review; shadow AI discovered |
| **Hygiene** | Share of models signed and verified; endpoints with strong authentication; agents with least-privilege verified; secrets in vaults |
| **Exposure** | Internet-facing AI endpoints; critical attack paths; open exceptions and their age |
| **Vulnerability management** | Open findings by priority; share past due date; mean time to remediate by priority |
| **Detection and response** | AI systems with monitoring in the SIEM; mean time to detect and contain AI incidents (Modules 5.2 and 5.5) |
| **Resilience** | AI systems with tested rollback and recovery; exercise findings closed (Module 5.7) |

Distinguish **key performance indicators** (how well the programme performs, such as remediation time) from **key risk indicators** (early warnings of rising risk, such as growth in internet-facing endpoints or overdue critical findings). Set targets and thresholds for each, and show trends rather than snapshots.

### Reporting and assurance
Report posture to the AI governance committee and board in business terms (Module 2.6), with clear decisions requested: funding, risk acceptance or retiring systems. Frameworks expect this loop: ISO/IEC 42001 Clause 9 (performance evaluation) and Clause 10 (improvement), the NIST AI RMF *Measure* and *Manage* functions, and the NIST CSF 2.0 *Govern* function. Internal audit and independent assessments provide further assurance that the metrics are accurate.` },
    { type: 'flip', title: 'Posture terms', cards: [
      ['AI-SPM', 'AI security posture management: continuous discovery of AI assets, configuration checks, attack path analysis and risk prioritisation.'],
      ['Attack path', 'A chain of weaknesses an attacker could link, such as an exposed endpoint, an over-privileged identity and sensitive data.'],
      ['Key risk indicator (KRI)', 'A metric that gives early warning of rising risk, such as overdue critical findings.'],
      ['Continuous control monitoring', 'Automated tests that confirm key controls are operating, not just designed.'],
      ['Mean time to remediate', 'The average time from discovering a finding to verifying its fix, tracked by priority.'] ] },
    { type: 'callout', kind: 'exam', title: 'Posture questions', md: `Prefer **continuous, trigger-based reviews** over one-off launch assessments, and **outcome metrics** (coverage, past-due critical findings, least privilege verified, time to remediate) over **activity counts**. Metrics should be **trended**, have **targets**, and be reported to **governance** with decisions attached.` },
    { type: 'check', q: { q: 'A CISO wants one metric to show the board whether AI vulnerability management is reducing risk. Which is MOST meaningful?', o: ['The total number of AI vulnerability scans run each month across the estate', 'The share of critical AI findings past their due date, shown as a trend', 'The number of AI security policies published during the last year', 'The total number of AI vulnerabilities discovered since the programme began'], a: 1, b: 5,
      why: 'Overdue critical findings, trended over time, show whether the most important risks are actually being reduced. Scan counts, policy counts and cumulative discoveries measure activity, not risk.' } }
  ]
};
