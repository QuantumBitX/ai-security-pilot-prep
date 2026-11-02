/* 5.4 · Section 4: compensating controls and strict usage restrictions for legacy models */
module.exports = {
  title: 'Compensating controls and restrictions for legacy models', covers: [4],
  blocks: [
    { type: 'video', title: 'When you can’t fix it', kicker: 'Module 5.4 · Video 4 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.4 · Vulnerabilities and posture', title: 'When you can’t fix it', sub: 'Compensating controls and usage restrictions for legacy models', icon: 'archive',
        say: 'Some AI systems can’t simply be patched or replaced. The model is out of support, retraining would take months, or a regulator validated this exact version. | This video covers compensating controls and strict usage restrictions for legacy models.' },
      { t: 'bullets', title: 'Why legacy models stay in service', layout: 'grid', cols: 2, items: [
          { icon: 'clock', h: 'Vendor end of life', d: 'No more fixes or updates', k: 'neutral' },
          { icon: 'money', h: 'Cost of replacement', d: 'Retraining or re-platforming', k: 'human' },
          { icon: 'gavel', h: 'Regulatory validation', d: 'Approved version, costly to re-approve', k: 'model' },
          { icon: 'database', h: 'Lost training data', d: 'Can’t retrain from scratch', k: 'data' },
          { icon: 'chip', h: 'Embedded in products', d: 'Devices and integrations', k: 'control' },
          { icon: 'building', h: 'Business dependency', d: 'Critical processes rely on it', k: 'threat' } ],
        say: 'Legacy models stay in service for six common reasons. | The vendor has ended support, so no more fixes are coming. | Replacement is expensive, because the model needs retraining or the platform needs rebuilding. | A regulator validated this exact version, and re-approval takes time and money. | The original training data has been lost or can no longer legally be used. | The model is embedded in devices or third-party integrations. | And critical business processes depend on it, so switching it off isn’t an option yet.' },
      { t: 'layers', title: 'Compensating controls around a legacy model',
        layers: [
          { icon: 'network', label: 'Isolation', sub: 'Separate network segment, no internet, no new integrations', k: 'neutral' },
          { icon: 'lock', label: 'Restricted access', sub: 'Named users, strong authentication, no anonymous use', k: 'control' },
          { icon: 'filter', label: 'Modern guardrails in front', sub: 'Input filtering, output validation at a gateway', k: 'data' },
          { icon: 'eye', label: 'Heightened monitoring', sub: 'Tighter thresholds, full logging, rate limits', k: 'human' },
          { icon: 'hitl', label: 'Human review', sub: 'People check outputs before they are used', k: 'model' } ],
        say: 'When a model can’t be fixed, surround it with compensating controls. | Isolation: put it in a separate network segment, with no internet access and no new integrations. | Restricted access: named users only, strong authentication, and no anonymous use. | Modern guardrails in front: a gateway that filters inputs and validates outputs, acting as a virtual patch for weaknesses the model can’t fix itself. | Heightened monitoring: tighter thresholds, full logging and rate limits. | And human review of outputs before anyone relies on them.' },
      { t: 'compare', title: 'Strict usage restrictions', labels: ['Users', 'Data', 'Use cases', 'Duration'],
        cols: [{ h: 'Allowed', icon: 'check', k: 'control' }, { h: 'Prohibited', icon: 'stop', k: 'threat' }],
        rows: [
          ['Named, trained staff', 'Public or anonymous users'],
          ['Internal, low-sensitivity data', 'Personal or regulated data'],
          ['Approved, low-impact tasks', 'Automated decisions about people'],
          ['Until the replacement date', 'Open-ended exceptions'] ],
        say: 'Usage restrictions narrow what a legacy model may be used for. | Allow named, trained staff. Prohibit public or anonymous users. | Allow internal, low-sensitivity data. Prohibit personal or regulated data. | Allow approved, low-impact tasks. Prohibit automated decisions about people. | And allow use only until a fixed replacement date. Open-ended exceptions are how temporary risks become permanent.' },
      { t: 'flow', title: 'A time-limited exception',
        nodes: [
          { id: 'id', x: 230, y: 330, icon: 'search', label: 'Identify gap', sub: 'can’t fix or replace yet', k: 'threat', w: 310 },
          { id: 'ra', x: 700, y: 330, icon: 'scale', label: 'Assess risk', sub: 'exposure and consequence', k: 'human', w: 320 },
          { id: 'cc', x: 1200, y: 330, icon: 'shield', label: 'Design controls', sub: 'meet the original intent', k: 'control', w: 310 },
          { id: 'acc', x: 1200, y: 690, icon: 'pen', label: 'Risk owner accepts', sub: 'with an expiry date', k: 'model', w: 320 },
          { id: 'mon', x: 700, y: 690, icon: 'eye', label: 'Monitor and review', sub: 'controls still working?', k: 'neutral', w: 320 },
          { id: 'ret', x: 230, y: 690, icon: 'trash', label: 'Replace or retire', sub: 'by the agreed date', k: 'data', w: 300 } ],
        edges: [{ from: 'id', to: 'ra', k: 'threat' }, { from: 'ra', to: 'cc', k: 'human' }, { from: 'cc', to: 'acc', k: 'control' }, { from: 'acc', to: 'mon', k: 'model' }, { from: 'mon', to: 'ret', k: 'neutral' }],
        steps: [
          { show: 'id', hi: 'id', mark: { id: 'alert' } },
          { show: 'ra id-ra', flow: 'id-ra', hi: 'ra' },
          { show: 'cc ra-cc', flow: 'ra-cc', hi: 'cc', mark: { cc: 'lock' } },
          { show: 'acc cc-acc', flow: 'cc-acc', hi: 'acc' },
          { show: 'mon acc-mon', flow: 'acc-mon', hi: 'mon' },
          { show: 'ret mon-ret', flow: 'mon-ret', hi: 'ret', mark: { ret: 'ok' } } ],
        say: 'Legacy risks are managed through a formal, time-limited exception. First, identify the gap: a weakness that can’t be fixed, or a model that can’t yet be replaced. | Assess the risk, considering exposure and consequence. | Design compensating controls that meet the intent of the control that can’t be applied. | The risk owner accepts the residual risk in writing, with an expiry date. | The controls are monitored and the exception reviewed regularly, checking that the controls still work. | And the model is replaced or retired by the agreed date, using the decommissioning process in Module 5.7.' },
      { t: 'summary', items: ['Legacy models persist for cost, regulatory and dependency reasons', 'Isolate, restrict, guard, monitor and review', 'Restrict users, data, use cases and duration', 'Formal, time-limited exceptions owned by the risk owner'],
        say: 'To recap. | Legacy models stay in service for cost, regulatory and dependency reasons, so plan for them. | Surround them with compensating controls: isolation, restricted access, modern guardrails, heightened monitoring and human review. | Restrict who may use them, with what data, for which tasks, and for how long. | And manage the remaining risk through formal, time-limited exceptions, owned by the risk owner.' } ] },
    { type: 'text', md: `### What makes a control "compensating"?
A **compensating control** is an alternative measure used when a required control can’t be applied. The idea is well established: PCI DSS, for example, requires compensating controls to meet the **intent and rigour** of the original requirement, provide a similar level of defence, and go beyond other existing requirements. Apply the same test to AI: if a legacy model can’t be patched against a known jailbreak technique, a gateway that detects and blocks that technique, combined with restricted access and output review, may compensate.

### Legacy AI risks
- **Unpatched components:** old frameworks and serving stacks with known CVEs (Section 3).
- **Outdated safety behaviour:** older models are typically more susceptible to jailbreaks and injection techniques discovered since their release.
- **No vendor support:** hosted models are retired on published schedules; after retirement, nothing is fixed.
- **Missing documentation:** no model card, unknown training data and unclear limitations make risk assessment harder (Module 3.5).
- **Unsafe formats:** older models may be stored in serialisation formats that can run code when loaded; convert them to safer formats where possible.

### Designing restrictions
| Restriction | Examples |
|---|---|
| **Access** | Named user groups, strong authentication, no external or anonymous access, no new API consumers |
| **Data** | No personal, special category or regulated data; no connection to sensitive retrieval sources |
| **Use cases** | Approved tasks only; no automated decisions with legal or similar effects on people; no agentic tool use |
| **Environment** | Isolated network segment, no internet egress, read-only storage for the model |
| **Oversight** | Human review of outputs, tighter monitoring thresholds, more frequent security reviews |
| **Time** | Exception expiry and a funded replacement or retirement plan |

### Governing exceptions
Record each exception in the risk register with the gap, compensating controls, residual risk, approving risk owner, **expiry date** and review frequency. Test compensating controls as rigorously as primary ones, because they are now the only protection. Report exceptions and their ages to governance (Section 5); an exception that is renewed repeatedly is a decision to keep the risk, and should be treated as one.` },
    { type: 'match', title: 'Which compensating control fits?', pairs: [
      ['The legacy model can’t be patched against a known jailbreak technique', 'Gateway detection and blocking of that technique'],
      ['The model’s serving stack has an unfixable remote flaw', 'Network isolation with no external access'],
      ['The model may produce unreliable outputs for some groups', 'Human review before outputs are used'],
      ['The vendor no longer provides abuse monitoring', 'Organisation-run logging and tighter alert thresholds'],
      ['The model was never assessed for personal data leakage', 'Prohibit personal data in prompts and retrieval'] ] },
    { type: 'callout', kind: 'exam', title: 'Legacy model questions', md: `The best answers keep legacy models running **only with compensating controls** (isolation, restricted access, guardrails, monitoring, human review), **strict usage restrictions**, and a **time-limited exception** approved by the **risk owner**, with a replacement plan. Indefinite exceptions and "it has always worked" reasoning are traps.` },
    { type: 'check', q: { q: 'A hospital relies on a legacy diagnostic support model that its vendor no longer supports. Replacement will take 18 months because of regulatory validation. What is the MOST appropriate approach?', o: ['Keep using it unchanged, because it was validated by the regulator originally', 'Restrict and isolate it, add monitoring and clinician review, under a time-limited exception', 'Switch it off immediately, even though clinicians depend on it for daily work', 'Fine-tune it on recent hospital data, so it behaves like a supported model again'], a: 1, b: 4,
      why: 'Compensating controls and restrictions manage the risk while the replacement is validated, and a time-limited exception keeps accountability. Unchanged use ignores new risks, an immediate shutdown harms care, and fine-tuning would invalidate the approved version.' } }
  ]
};
