/* 1.3 · Section 2: lifecycle degradation and drift */
module.exports = {
  title: 'Lifecycle degradation: model, data and behavioural drift', covers: [2],
  blocks: [
    { type: 'video', title: 'Why good models go bad', kicker: 'Module 1.3 · Video 2 of 6', scenes: [
      { t: 'title', kicker: 'Module 1.3 · Limitations and performance', title: 'Why good models go bad', sub: 'Data drift, concept drift and behavioural drift', icon: 'thermo',
        say: 'A model that passed every test on launch day can quietly get worse, without a single line of code changing. | This video explains why models degrade, the main kinds of drift, and how to detect and respond to them.' },
      { t: 'chart', title: 'Performance after deployment', kind: 'line', x: ['M0', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9'], yMin: 60, yMax: 100, ticks: 4, unit: '%', yLabel: 'Fraud model precision by month',
        series: [
          { n: 'Without monitoring', k: 'threat', v: [92, 91, 90, 87, 84, 80, 77, 74, 72, 70], dy: 56 },
          { n: 'Monitored and retrained', k: 'control', v: [92, 91, 90, 88, 91, 91, 90, 89, 91, 91] } ],
        annot: [{ x: 3, text: 'Drift begins', k: 'human' }, { x: 4, text: 'Retrained', k: 'control' }],
        steps: [{ s: [0] }, { a: [0] }, { s: [1], a: [1] }],
        say: 'Here is a fraud model’s precision over its first ten months. On launch it is excellent, and then it slowly declines, month after month. | Nothing in the code changed. The world changed: customers, products and fraudsters all moved on, and the patterns the model learned stopped matching reality. | With monitoring in place, the decline is spotted early and the model is retrained on recent data, restoring its performance.' },
      { t: 'bullets', title: 'Four kinds of drift', layout: 'grid', cols: 2, items: [
          { icon: 'chart', h: 'Data drift', d: 'The inputs change: new customers, devices, languages or products', k: 'data' },
          { icon: 'branch', h: 'Concept drift', d: 'The meaning changes: the same inputs now lead to different outcomes', k: 'model' },
          { icon: 'bars', h: 'Label (prior) drift', d: 'The mix of outcomes changes, such as fraud becoming more common', k: 'human' },
          { icon: 'chat', h: 'Behavioural drift', d: 'An AI system’s outputs change: updates, prompts, retrieval, tools', k: 'threat' } ],
        say: 'Drift comes in four main kinds. | Data drift, also called covariate shift, means the inputs change. New customer groups, devices, languages or products appear that the model rarely saw in training. | Concept drift means the relationship itself changes. The same inputs now lead to a different outcome, for example when fraudsters switch tactics so that yesterday’s safe pattern is today’s fraud. | Label drift, or prior shift, means the mix of outcomes changes, such as fraud becoming twice as common. | And behavioural drift is the change you see in a generative AI system’s outputs when the model, prompts, retrieved content or tools change underneath it.' },
      { t: 'chart', title: 'Spotting data drift', kind: 'bar', x: ['18–24', '25–34', '35–44', '45–54', '55–64', '65+'], yMin: 0, yMax: 40, ticks: 4, unit: '%', yLabel: 'Share of applicants by age band',
        series: [
          { n: 'Training data', k: 'neutral', v: [8, 22, 26, 22, 14, 8] },
          { n: 'Production this month', k: 'data', v: [31, 30, 17, 11, 7, 4] } ],
        notes: [{ h: 'Compare distributions', d: 'Statistics such as PSI or a Kolmogorov–Smirnov test flag significant shifts.', k: 'data' }, { h: 'No labels needed', d: 'Input drift is visible immediately, long before outcomes are known.', k: 'control' }],
        steps: [{ s: [0] }, { s: [1] }],
        say: 'Data drift is the easiest to spot, because you only need the inputs. Here is the age profile of the applicants the model was trained on. | And here is this month’s production traffic, after a new mobile app attracted far younger applicants. Statistical measures such as the population stability index, or a Kolmogorov–Smirnov test, compare the two distributions and raise an alert when the shift is significant. You don’t need to wait for outcomes to know the model is now working outside its experience.' },
      { t: 'bullets', title: 'Behavioural drift in generative AI', items: [
          { icon: 'cycle', h: 'Provider updates', d: 'A new model version behind the same name', k: 'threat' },
          { icon: 'pen', h: 'Prompt and configuration edits', d: 'A “small” system-prompt change shifts many answers', k: 'human' },
          { icon: 'database', h: 'Knowledge base changes', d: 'New, removed or poisoned documents change retrieval', k: 'data' },
          { icon: 'users', h: 'New users and uses', d: 'People use the system for things it was never tested on', k: 'neutral' } ],
        say: 'Generative AI systems drift in their own ways. | Hosted providers improve and replace models, sometimes behind the same name. A study in twenty twenty-three found one major model’s behaviour on some tasks changed markedly within three months. | A seemingly small edit to a system prompt or configuration can shift thousands of answers. | Changes to the knowledge base change what is retrieved, and a poisoned document changes it deliberately. | And users find new uses the system was never evaluated for.' },
      { t: 'flow', title: 'From detection to response',
        nodes: [
          { id: 'prod', x: 210, y: 330, icon: 'server', label: 'Production', sub: 'inputs, outputs, outcomes', k: 'neutral', w: 280 },
          { id: 'mon', x: 600, y: 330, icon: 'chart', label: 'Monitoring', sub: 'drift tests, golden sets', k: 'data', w: 280 },
          { id: 'alert', x: 990, y: 330, icon: 'alert', label: 'Threshold alert', k: 'human', w: 270 },
          { id: 'tri', x: 1360, y: 330, icon: 'search', label: 'Diagnose', sub: 'natural or adversarial?', k: 'threat', w: 270 },
          { id: 'fix', x: 1360, y: 690, icon: 'gear', label: 'Respond', sub: 'retrain, recalibrate, roll back', k: 'model', w: 300 },
          { id: 'val', x: 920, y: 690, icon: 'check', label: 'Re-validate', sub: 'same tests as launch', k: 'control', w: 270 } ],
        edges: [{ from: 'prod', to: 'mon', k: 'data' }, { from: 'mon', to: 'alert', k: 'data' }, { from: 'alert', to: 'tri', k: 'human' }, { from: 'tri', to: 'fix', k: 'model' }, { from: 'fix', to: 'val', k: 'model' }, { from: 'val', to: 'prod', k: 'control', label: 'redeploy' }],
        steps: [
          { show: 'prod mon prod-mon', flow: 'prod-mon', hi: 'mon' },
          { show: 'alert mon-alert', flow: 'mon-alert', hi: 'alert' },
          { show: 'tri alert-tri', flow: 'alert-tri', hi: 'tri' },
          { show: 'fix tri-fix', flow: 'tri-fix', hi: 'fix' },
          { show: 'val fix-val val-prod', flow: 'fix-val val-prod', hi: 'val', mark: { val: 'ok' } } ],
        say: 'Detection and response form a pipeline. Production inputs, outputs and eventual outcomes feed monitoring, which runs drift statistics and replays a fixed golden test set against the live system. | When a metric crosses a threshold agreed in advance, an alert fires. | Someone diagnoses the cause, including the security question: is this natural change, or is someone manipulating the inputs or poisoning the data? | The response might be retraining on recent data, recalibrating a threshold, or rolling back to the previous version. | And every fix is re-validated with the same tests used at launch before it is redeployed.' },
      { t: 'summary', items: ['Models degrade because the world changes, not the code', 'Data, concept, label and behavioural drift', 'Monitor inputs now; outcomes when labels arrive', 'Diagnose natural vs adversarial; re-validate every fix'],
        say: 'To recap. | Models degrade because the world changes around them, even when the code doesn’t. | Watch for data drift, concept drift, label drift and, in generative systems, behavioural drift. | Monitor input distributions immediately, and performance as soon as true outcomes arrive. | Diagnose whether drift is natural or adversarial, and re-validate every fix before it goes back into production.' } ] },
    { type: 'text', md: `### Why models degrade
A trained model is a snapshot of the relationships in its training data. Production is not a snapshot. Customers change, products launch, regulations shift, adversaries adapt, and the model’s assumptions slowly stop matching reality. This **lifecycle degradation** usually happens without any change to the model or code, which is why it so often goes unnoticed.

The COVID-19 pandemic was a dramatic example. In 2020, spending, travel and demand patterns changed almost overnight, and many demand-forecasting and fraud models that had been accurate for years started producing poor results within weeks.

### The kinds of drift
| Drift | What changes | Example | How you see it |
|---|---|---|---|
| **Data drift** (covariate shift) | The distribution of inputs | A new app brings younger applicants | Input statistics shift; no labels needed |
| **Concept drift** | The relationship between inputs and outcome | Fraudsters change tactics; old “safe” patterns now indicate fraud | Performance falls once outcomes are known |
| **Label drift** (prior shift) | The mix of outcomes | Fraud rate doubles during a holiday season | Outcome rates change; thresholds misfire |
| **Model drift** | The model’s performance (the symptom) | Precision falls from 92% to 70% | Monitored performance metrics |
| **Behavioural drift** | A generative system’s outputs | A provider update changes refusal behaviour | Golden-set regression tests, output monitoring |

**Model drift** is best thought of as the *symptom*, declining performance, while data, concept and label drift are *causes*. Concept drift can be **sudden** (a new regulation), **gradual** (slowly changing customer behaviour), **incremental**, or **recurring** (seasonal patterns).

### Behavioural drift in generative AI
LLM applications drift in ways traditional models don’t:
- **Provider updates.** Hosted models are improved, re-tuned and replaced. A widely cited 2023 study comparing versions of the same major model a few months apart found large changes in performance on some tasks, including code generation and following formatting instructions.
- **Configuration changes.** System prompts, temperature, safety settings, tool definitions and retrieval parameters are all part of behaviour. Each change can shift outputs across thousands of conversations.
- **Knowledge base changes.** In RAG systems, adding, editing or deleting documents changes answers, and a poisoned document changes them deliberately.
- **Usage drift.** People find new uses, such as a support assistant being used for HR questions, that were never evaluated.

The main controls are **version pinning** (choose when to move to a new model version, rather than having it chosen for you), **change management** for prompts and configuration, and a **golden test set**: a fixed set of representative and adversarial prompts with expected behaviour, re-run on every change and on a schedule.

### Detecting drift
- **Input monitoring.** Compare production inputs to the training baseline with statistics such as the **population stability index (PSI)**, the Kolmogorov–Smirnov test or Jensen–Shannon divergence. For text and images, compare the distribution of embeddings. This needs no labels, so it gives early warning.
- **Output monitoring.** Watch the distribution of predictions, confidence scores, refusal rates, answer lengths and the rate of “I don’t know” responses.
- **Performance monitoring.** Compute accuracy, precision and recall once true outcomes arrive. Outcomes are often delayed (a loan default may take months to appear), so combine late labels with leading indicators such as analyst override rates and complaint volumes.
- **Thresholds and ownership.** Agree alert thresholds, owners and response times before launch, not after the first incident.

### Drift and security
Drift is a security signal as well as a quality one. A sudden shift in inputs might be a marketing campaign, or an attacker probing a model; a sudden change in a RAG system’s answers might be a content update, or poisoning. Every drift investigation should ask whether the change is **natural or adversarial**. Significant drift, model updates and disclosed vulnerabilities are also standard **reassessment triggers** for the risk assessments covered in Domain 2.

### Responding
Typical responses, from lightest to heaviest: recalibrate thresholds; retrain on recent data; roll back to a previous version while investigating; restrict the model’s use to the population it still handles well; or retire it. Whatever the fix, re-run the launch validation suite, including safety and fairness tests, before redeploying.`, },
    { type: 'tabs', title: 'Drift scenarios', items: [
      ['Credit scoring', 'A lender’s new mobile app attracts many younger applicants with thin credit histories. Input monitoring shows a large PSI on age and credit-history length within two weeks. **Drift type:** data drift. **Response:** flag the affected segment for manual review, collect outcomes, and retrain once enough labelled data exists.'],
      ['Phishing detection', 'Attackers start using AI-written emails with perfect grammar, which the classifier had learned to treat as a sign of legitimacy. Input statistics look normal, but missed phishing reports rise. **Drift type:** concept drift, adversarially driven. **Response:** retrain with new examples, add features that don’t depend on writing quality, and share indicators with threat intelligence.'],
      ['Support assistant', 'After the provider moves the “latest” alias to a new model, the assistant starts answering questions it previously declined, including some outside policy. **Drift type:** behavioural drift. **Response:** pin the previous version, run the golden test set against the new one, and adopt it only after it passes.'],
      ['Seasonal retail', 'Return-fraud rates triple every January. The model’s fixed threshold produces a flood of false negatives. **Drift type:** label (prior) drift, recurring. **Response:** seasonal thresholds or retraining that includes previous Januaries, with monitoring tuned to the season.'] ] },
    { type: 'callout', kind: 'remember', title: 'Causes and symptom', md: `Data, concept and label drift are **causes**. Falling performance (model drift) is the **symptom**. Input monitoring detects some causes early; performance monitoring confirms the symptom, but only once outcomes are known.` },
    { type: 'check', q: { q: 'A fraud model’s precision falls steadily for three months. Input feature distributions are unchanged, but fraud analysts report new scam patterns the model misses. Which drift is MOST likely?', o: ['Data drift', 'Concept drift', 'Label drift', 'No drift; the model has a coding error'], a: 1, b: 2,
      why: 'The inputs look the same, but their relationship to the outcome has changed because fraudsters changed tactics. That is concept drift. Data drift would show in the input distributions.' } }
  ]
};
