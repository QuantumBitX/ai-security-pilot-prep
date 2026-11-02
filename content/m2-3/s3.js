/* 2.3 · Section 3: use-case risk tiers */
module.exports = {
  title: 'Use-case risk tiers', covers: [3],
  blocks: [
    { type: 'video', title: 'Not every chatbot is a crisis', kicker: 'Module 2.3 · Video 3 of 4', scenes: [
      { t: 'title', kicker: 'Module 2.3 · AI risk management', title: 'Not every chatbot is a crisis', sub: 'Tiering AI use cases by human impact and technical complexity', icon: 'layers',
        say: 'If every AI use case gets the full assessment treatment, governance becomes a bottleneck and people route around it. If none do, harm slips through. | Risk tiers solve this, by matching the depth of scrutiny to the size of the risk. This video shows how to build them.' },
      { t: 'matrix', title: 'Two dimensions, four tiers', rows: ['High', 'Medium', 'Low'], cols: ['Low', 'Medium', 'High'], xLabel: 'Technical complexity', yLabel: 'Human impact', heat: true,
        cells: [['Tier 3', 'Tier 4', 'Tier 4'], ['Tier 2', 'Tier 3', 'Tier 3'], ['Tier 1', 'Tier 1', 'Tier 2']], cellSize: 38,
        items: [],
        notes: [{ h: 'Human impact', d: 'How much the system can affect people’s rights, safety, money or opportunities.', k: 'human' }, { h: 'Technical complexity', d: 'How hard the system is to predict, control and secure: autonomy, opacity, untrusted inputs.', k: 'model' }, { h: 'Tier drives controls', d: 'Higher tiers need deeper assessment, more oversight and senior approval.', k: 'control' }],
        say: 'A practical approach rates each use case on two dimensions. The first is human impact: how much the system can affect people’s rights, safety, finances or opportunities. | The second is technical complexity: how hard the system is to predict, control and secure, including its autonomy, opacity and exposure to untrusted inputs. | Combining them gives a tier. A simple, low-impact tool is tier one. A complex, high-impact system, such as an agent that makes decisions about people, is tier four. And the tier decides how much assessment, oversight and approval the use case needs.' },
      { t: 'bullets', title: 'Rating human impact', layout: 'grid', cols: 2, items: [
          { icon: 'gavel', h: 'Decisions about people', d: 'Jobs, credit, housing, benefits, healthcare', k: 'human' },
          { icon: 'shield', h: 'Safety', d: 'Physical harm or critical services', k: 'threat' },
          { icon: 'users', h: 'Scale and vulnerability', d: 'How many people; children or vulnerable groups', k: 'data' },
          { icon: 'rollback', h: 'Reversibility', d: 'Can errors be noticed and undone?', k: 'model' },
          { icon: 'fingerprint', h: 'Sensitive data', d: 'Health, biometrics, finances, children', k: 'neutral' },
          { icon: 'globe', h: 'Visibility', d: 'Customer-facing or public outputs', k: 'control' } ],
        say: 'Human impact is rated on factors like these. | Does the system make or influence decisions about people, such as jobs, credit, housing, benefits or healthcare? | Could it cause physical harm, or disrupt critical services? | How many people does it affect, and are any of them children or otherwise vulnerable? | Can errors be noticed and reversed? | Does it process sensitive data, such as health, biometric or financial information? | And are its outputs visible to customers or the public?' },
      { t: 'bullets', title: 'Rating technical complexity', layout: 'grid', cols: 2, items: [
          { icon: 'robot', h: 'Autonomy and tools', d: 'Does it act, or only suggest?', k: 'model' },
          { icon: 'mask', h: 'Opacity', d: 'Can its behaviour be explained and predicted?', k: 'neutral' },
          { icon: 'globe', h: 'Untrusted inputs', d: 'Web content, emails, uploads, external RAG sources', k: 'threat' },
          { icon: 'plug', h: 'Integration depth', d: 'How many systems it can reach', k: 'data' },
          { icon: 'building', h: 'Third-party dependence', d: 'Hosted models, plugins, opaque training data', k: 'human' },
          { icon: 'sparkle', h: 'Novelty', d: 'New techniques with little operational history', k: 'control' } ],
        say: 'Technical complexity has its own factors. | Autonomy and tool access: does the system act, or only suggest? | Opacity: can its behaviour be explained and predicted? | Untrusted inputs: does it process web content, emails, uploaded files or external documents that an attacker could influence? | Integration depth: how many other systems can it reach? | Third-party dependence: does it rely on hosted models, plugins or training data you can’t inspect? | And novelty: is it built on new techniques with little operational history?' },
      { t: 'layers', title: 'What each tier requires (example)',
        layers: [
          { icon: 'siren', label: 'Tier 4: critical', sub: 'Committee approval, full assessments, red team, HITL, continuous monitoring', k: 'threat' },
          { icon: 'alert', label: 'Tier 3: high', sub: 'Impact assessment, bias and security testing, defined oversight, quarterly review', k: 'human' },
          { icon: 'eye', label: 'Tier 2: moderate', sub: 'Standard risk assessment, security review, owner sign-off, six-monthly review', k: 'data' },
          { icon: 'check', label: 'Tier 1: low', sub: 'Checklist, approved tools only, manager approval, annual review', k: 'control' } ],
        say: 'Each tier carries a defined set of requirements. Here is an example. | Tier four, critical: approval by the governance committee, the full set of impact, privacy and security assessments, red teaming, a human in the loop, and continuous monitoring. | Tier three, high: an impact assessment, bias and security testing, a defined oversight model and quarterly review. | Tier two, moderate: a standard risk assessment, a security review, sign-off by the business owner, and review every six months. | Tier one, low: a short checklist, use of approved tools only, manager approval and an annual review.' },
      { t: 'bullets', title: 'Tiering rules that keep it honest', items: [
          { icon: 'gavel', h: 'Law sets the floor', d: 'EU AI Act high-risk uses are never below tier 3; prohibited uses are never approved', k: 'threat' },
          { icon: 'target', h: 'Tier the use, not the tool', d: 'The same model can be tier 1 in one use and tier 4 in another', k: 'model' },
          { icon: 'cycle', h: 'Re-tier on change', d: 'New data, users, tools or autonomy mean a new rating', k: 'data' },
          { icon: 'users', h: 'Check the scoring', d: 'Independent review stops people gaming the questionnaire', k: 'control' } ],
        say: 'A few rules keep tiering honest. | The law sets the floor. A use case that the EU AI Act classes as high risk can never sit below tier three internally, and prohibited practices are never approved. | Tier the use, not the tool. The same model might be tier one for drafting marketing copy and tier four for screening job applicants. | Re-tier on change. New data, new users, new tools or more autonomy mean a new rating. | And check the scoring. A second line reviewer stops teams answering the questionnaire to get the answer they want.' },
      { t: 'summary', items: ['Tiers match scrutiny to risk', 'Human impact × technical complexity', 'Each tier has defined requirements and approvers', 'Law sets the floor; tier the use; re-tier on change'],
        say: 'To recap. | Risk tiers match the depth of scrutiny to the size of the risk. | Rate each use case on human impact and technical complexity. | Each tier carries defined requirements, approvers and review frequency. | And remember: the law sets the floor, you tier the use rather than the tool, and you re-tier whenever something material changes.' } ] },
    { type: 'text', md: `### Why tier?
Risk tiering applies the principle of **proportionality**: the effort spent on assessment and control should match the risk. Without tiers, organisations either drown low-risk tools in paperwork (driving shadow AI) or wave high-risk systems through. Tiers also make governance **predictable**: teams know in advance what a tier-3 system will need, and can plan for it.

### Building a tiering model
A common approach scores each use case on two dimensions.

**Human impact** (the potential consequences for people):

| Factor | Low (1) | Medium (2) | High (3) |
|---|---|---|---|
| Decisions about people | None | Supports decisions with human review | Makes or heavily shapes significant decisions |
| Safety and critical services | No effect | Indirect effect | Could cause physical harm or disrupt critical services |
| Scale and vulnerability | Few internal users | Many users or customers | Large populations or vulnerable groups |
| Reversibility | Errors trivial to fix | Errors fixable with effort | Errors hard or impossible to undo |
| Data sensitivity | Public or internal | Personal data | Special-category, financial or children’s data |

**Technical complexity** (how hard the system is to predict, control and secure):

| Factor | Low (1) | Medium (2) | High (3) |
|---|---|---|---|
| Autonomy | Suggests only | Acts with approval | Acts autonomously |
| Inputs | Trusted, internal | Mixed | Untrusted external content (web, email, uploads) |
| Integration | Standalone | Reads from systems | Writes to systems or controls other agents |
| Opacity | Interpretable | Partly explainable | Opaque foundation model |
| Dependence | In-house | Established vendor | Novel or opaque third-party components |

The scores combine into a tier, often with **override rules**: any “high” on decisions about people or safety makes the use case at least tier 3, regardless of the total.

### Tier requirements
Each tier specifies:
- **required assessments** (checklist, standard risk assessment, impact assessment, DPIA, bias testing, security testing, red teaming);
- **approval authority** (manager, business owner with second-line sign-off, governance committee, executive acceptance of residual risk);
- **oversight mode** (automated, human on the loop, human in the loop);
- **monitoring and review frequency**;
- **documentation** (inventory entry, model card, decision log).

### External classifications
Internal tiers must respect external rules. Under the **EU AI Act**, prohibited practices map to “not permitted”, high-risk systems to at least tier 3, and limited-risk systems carry mandatory transparency controls whatever their internal tier. Sector rules (financial model-risk guidance, medical device regulation) may add requirements. An internal tier can be **stricter** than the law, but never weaker.

### Common mistakes
- **Tiering the vendor or model instead of the use.** “We approved that model” says nothing about a new, higher-impact use of it.
- **Underestimating generative AI complexity.** A chatbot reading untrusted customer emails with tool access is technically complex, even if building it took a week.
- **Static tiers.** Adding a tool, a data source or more autonomy changes the tier.
- **Self-assessment without challenge.** Second-line review of high-tier and borderline classifications prevents gaming.`, },
    { type: 'match', title: 'Which tier? (using the example model)', pairs: [
      ['Marketing-copy assistant using approved tools; no personal data', 'Tier 1: low'],
      ['Internal policy Q&A over company documents, read-only', 'Tier 2: moderate'],
      ['Model that ranks job applicants, with recruiter review', 'Tier 3: high (at least, as EU AI Act high risk)'],
      ['Agent that autonomously approves insurance claims and pays out', 'Tier 4: critical'] ] },
    { type: 'callout', kind: 'exam', title: 'Proportionality is the point', md: `If a scenario says governance is “slowing everything down” or “being bypassed”, look for an answer that introduces **risk-based tiering**, so low-risk uses move fast and scrutiny concentrates on high-impact ones. If it says a high-risk system “went through the light-touch route”, look for **override rules, re-tiering on change, or second-line review** of the classification.` },
    { type: 'check', q: { q: 'A company approved a foundation model for drafting internal newsletters (tier 1). A team now wants to use the same model to make first-round decisions on loan applications. What should happen?', o: ['Nothing new; the model is already approved, so any team may use it for any purpose', 'Treat it as a new use case and tier it on its own impact, which will place it in a high tier', 'Approve it at tier 1, provided each loan decision carries a disclaimer that AI was involved', 'Ban the model across the organisation, since it has been used for a purpose it wasn’t approved for'], a: 1, b: 3,
      why: 'Tiers apply to uses, not tools. Lending decisions have high human impact (and are high risk under the EU AI Act), so the new use needs its own assessment and controls.' } }
  ]
};
