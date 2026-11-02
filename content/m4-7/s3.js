/* 4.7 · Section 3: periodic access reviews and identity security posture management (ISPM) */
module.exports = {
  title: 'Access reviews and identity security posture management', covers: [3],
  blocks: [
    { type: 'video', title: 'Is this access still right?', kicker: 'Module 4.7 · Video 3 of 4', scenes: [
      { t: 'title', kicker: 'Module 4.7 · Identity lifecycle', title: 'Is this access still right?', sub: 'Periodic access reviews and identity security posture management', icon: 'search',
        say: 'Access that was right last year may be wrong today. People change roles, projects end, and agents gain tools. | This video covers periodic access reviews, and identity security posture management, which checks identity risk continuously between reviews.' },
      { t: 'flow', title: 'An access review cycle',
        nodes: [
          { id: 'sc', x: 220, y: 330, icon: 'target', label: 'Scope', sub: 'high-risk systems first', k: 'neutral', w: 290 },
          { id: 'co', x: 680, y: 330, icon: 'list', label: 'Collect', sub: 'effective access, incl. NHIs', k: 'data', w: 320 },
          { id: 'rv', x: 1150, y: 330, icon: 'user', label: 'Review', sub: 'owner decides, with context', k: 'human', w: 320 },
          { id: 'rm', x: 1150, y: 690, icon: 'tool', label: 'Remediate', sub: 'automatic revocation', k: 'control', w: 290 },
          { id: 'ev', x: 680, y: 690, icon: 'doc', label: 'Evidence', sub: 'decisions recorded', k: 'model', w: 280 },
          { id: 'me', x: 220, y: 690, icon: 'chart', label: 'Measure', sub: 'revocations, delays', k: 'threat', w: 270 } ],
        edges: [{ from: 'sc', to: 'co', k: 'neutral' }, { from: 'co', to: 'rv', k: 'data' }, { from: 'rv', to: 'rm', k: 'human' }, { from: 'rm', to: 'ev', k: 'control' }, { from: 'ev', to: 'me', k: 'model' }],
        steps: [
          { show: 'sc', hi: 'sc' },
          { show: 'co sc-co', flow: 'sc-co', hi: 'co' },
          { show: 'rv co-rv', flow: 'co-rv', hi: 'rv' },
          { show: 'rm rv-rm', flow: 'rv-rm', hi: 'rm', mark: { rm: 'ok' } },
          { show: 'ev rm-ev', flow: 'rm-ev', hi: 'ev' },
          { show: 'me ev-me', flow: 'ev-me', hi: 'me' } ],
        say: 'An effective review cycle has six steps. First, scope it by risk: privileged access, sensitive training data, production models and agent permissions come first. | Collect effective access for every identity in scope, including service accounts, keys and agents, not just people. | The reviewer, ideally the owner who understands the access, decides to keep, change or revoke it, with context such as when it was last used and how it compares with peers. | Revocations are applied automatically, not left as tickets that stall. | Decisions are recorded as evidence for auditors. | And the process is measured: how much was revoked, how long reviews took, and what was overdue.' },
      { t: 'compare', title: 'Rubber stamp or real review', labels: ['Information', 'Reviewer', 'Typical outcome', 'Follow-through'],
        cols: [{ h: 'Rubber stamp', icon: 'check', k: 'threat' }, { h: 'Effective review', icon: 'search', k: 'control' }],
        rows: [
          ['Long lists of names', 'Usage, risk, peer comparison'],
          ['Whoever is assigned', 'Someone who knows the access'],
          ['Approve everything', 'Remove unused, fix anomalies'],
          ['Tickets that stall', 'Automatic revocation'] ],
        say: 'Many access reviews are rubber stamps. Here is the difference. | A rubber-stamp review presents long lists of names and permissions. An effective review adds usage, risk and comparison with peers. | Rubber stamps go to whoever is assigned. Effective reviews go to someone who actually understands the access. | So rubber stamps approve everything, while effective reviews remove unused access and fix anomalies. | And instead of tickets that stall for weeks, effective reviews trigger automatic revocation.' },
      { t: 'chart', title: 'Most granted permissions go unused', kind: 'bar', x: ['People', 'Service accounts', 'AI agents'], yMin: 0, yMax: 100, ticks: 4, unit: '%', yLabel: 'Illustrative share of granted permissions used in the last 90 days', legend: true,
        series: [{ n: 'Granted', k: 'neutral', v: [100, 100, 100] }, { n: 'Used in 90 days', k: 'control', v: [42, 16, 21] }],
        steps: [{ s: [0] }, { s: [1] }, {}],
        say: 'Usage data is the most powerful input to a review. In this illustrative chart, each identity type starts with the permissions it was granted. | But only a fraction are used within ninety days, and for service accounts and agents the gap is often largest, because permissions are granted generously at creation and never trimmed. | Removing unused permissions, starting with privileged and non-human identities, shrinks the attack surface without affecting anyone’s work.' },
      { t: 'bullets', title: 'What ISPM watches continuously', layout: 'grid', cols: 2, items: [
          { icon: 'gear', h: 'Misconfigurations', d: 'MFA gaps, weak IdP settings', k: 'neutral' },
          { icon: 'shield', h: 'Excess privilege', d: 'Unused and risky permissions', k: 'human' },
          { icon: 'user', h: 'Stale identities', d: 'Orphaned and dormant accounts', k: 'threat' },
          { icon: 'key', h: 'Risky secrets', d: 'Old, exposed or shared keys', k: 'data' },
          { icon: 'split', h: 'Toxic combinations', d: 'Separation-of-duties conflicts', k: 'model' },
          { icon: 'cycle', h: 'Drift', d: 'Changes from approved baselines', k: 'control' } ],
        say: 'Identity security posture management, or ISPM, checks identity risk continuously, between periodic reviews. | It finds misconfigurations, such as accounts without MFA or weak identity provider settings. | Excess privilege: permissions that are unused or unusually risky. | Stale identities: orphaned and dormant accounts. | Risky secrets: old, exposed or shared keys. | Toxic combinations that break separation of duties. | And drift from approved baselines, such as an agent quietly granted a new scope.' },
      { t: 'summary', items: ['Review by risk; include service accounts, keys and agents', 'Give reviewers usage and peer context; revoke automatically', 'Remove unused permissions, especially for non-human identities', 'ISPM watches misconfiguration, privilege, staleness, secrets, SoD, drift'],
        say: 'To recap. | Scope reviews by risk, and include service accounts, keys and agents, not just people. | Give reviewers usage and peer context, and revoke automatically. | Remove unused permissions, especially for non-human identities. | And use ISPM to watch continuously for misconfiguration, excess privilege, stale identities, risky secrets, separation-of-duties conflicts and drift.' } ] },
    { type: 'text', md: `### Periodic access reviews
| Review type | Typical frequency | Focus |
|---|---|---|
| **Privileged access** | Quarterly or more often | Administrators of model platforms, registries, training clusters and identity systems |
| **Sensitive data and production AI** | Quarterly to semi-annually | Training data with personal data, production models, agent permissions |
| **Non-human identities** | At least semi-annually, plus event-driven | Service accounts, keys, agents, MCP servers: owner, need, scope, credential age |
| **General user access** | Semi-annually to annually | Access to AI tools and platforms |

Requirements vary by framework. For example, **PCI DSS v4.0** requires user accounts and access privileges to be reviewed at least every six months, and **ISO/IEC 27001** (Annex A 5.18) requires access rights to be reviewed regularly. **Event-driven micro-reviews**, triggered by a role change, a new scope for an agent or an anomaly, complement scheduled campaigns.

### Making reviews effective
- **Context:** last used, risk tier, peer comparison and recommendations (for example, "unused for 120 days: revoke").
- **Right reviewer:** the resource owner or sponsor, not just a line manager who can’t judge technical permissions.
- **Manageable volume:** pre-approve low-risk birthright access, and focus reviewer time on exceptions and high risk.
- **Closed loop:** revocations happen automatically, with exceptions time-limited and tracked.
- **Evidence:** decisions, reviewers and timing recorded for auditors.
- **AI assistance** can summarise usage and suggest decisions, but a person remains accountable for each decision.

### Identity security posture management (ISPM)
ISPM continuously assesses the security of identity infrastructure and identities: identity provider configuration, MFA coverage, privileged accounts, non-human identities, entitlements and secrets. It complements:
- **CIEM** (cloud infrastructure entitlement management): effective and unused cloud permissions.
- **ITDR** (identity threat detection and response): detecting attacks on identities in real time, such as token theft or abnormal sign-ins (Domain 5).
- **Secrets scanning** (Module 4.5) and **SaaS posture management** for OAuth grants to AI apps.

Typical ISPM findings drive remediation tickets or automatic fixes, and feed the next access review.` },
    { type: 'flip', title: 'Review and posture vocabulary', cards: [
      ['User access review', 'A periodic check by owners that each identity’s access is still needed and appropriate.'],
      ['Micro-review', 'A small, event-triggered review, such as after a role change or a new agent scope.'],
      ['ISPM', 'Identity security posture management: continuous assessment of identity configuration, privilege and hygiene.'],
      ['CIEM', 'Cloud infrastructure entitlement management: calculates effective and unused cloud permissions.'],
      ['ITDR', 'Identity threat detection and response: spots and responds to attacks on identities in real time.'] ] },
    { type: 'callout', kind: 'exam', title: 'Review questions', md: `Favour reviews that are **risk-based**, include **non-human identities**, give reviewers **usage context**, and end in **automatic remediation**. A review where managers approve 99% of access without information is a control failure, however well documented.` },
    { type: 'check', q: { q: 'In a quarterly access review, managers approved 99.6% of 4,000 entitlements on the AI platform in under a minute each. What is the BEST improvement?', o: ['Require managers to sign a declaration that they reviewed every entitlement carefully', 'Add usage and risk context, route items to owners, and revoke unused access automatically', 'Double the frequency of the reviews to monthly, so problems are found sooner', 'Move the review to a spreadsheet, so managers can see all entitlements at once'], a: 1, b: 3,
      why: 'Rubber-stamping comes from missing context and the wrong reviewers. Usage data, owner routing and automatic revocation make reviews meaningful. Declarations, more frequent rubber stamps and spreadsheets don’t fix the cause.' } }
  ]
};
