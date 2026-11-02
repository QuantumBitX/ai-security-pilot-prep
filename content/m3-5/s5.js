/* 3.5 · Section 5: security lifecycle monitoring (drift, bias tracking, anomaly detection) */
module.exports = {
  title: 'Security lifecycle monitoring: drift, bias and anomalies', covers: [5],
  blocks: [
    { type: 'video', title: 'Is the model still behaving?', kicker: 'Module 3.5 · Video 5 of 6', scenes: [
      { t: 'title', kicker: 'Module 3.5 · Model lifecycle', title: 'Is the model still behaving?', sub: 'Drift, bias tracking and anomaly detection', icon: 'wave',
        say: 'Approval is a snapshot of a model on one day. Production is everything that happens afterwards: the world changes, users change, and attackers start probing. | This video covers monitoring across the lifecycle: drift, bias tracking and anomaly detection, and how monitoring feeds back into governance.' },
      { t: 'bullets', title: 'What to monitor in production', layout: 'grid', cols: 2, items: [
          { icon: 'drop', h: 'Data drift', d: 'Inputs move away from training data', k: 'data' },
          { icon: 'target', h: 'Performance', d: 'Accuracy once outcomes are known', k: 'model' },
          { icon: 'scale', h: 'Fairness', d: 'Outcomes and errors by group', k: 'human' },
          { icon: 'chat', h: 'Output behaviour', d: 'Refusals, toxicity, groundedness', k: 'neutral' },
          { icon: 'attacker', h: 'Security signals', d: 'Probing, extraction, abuse', k: 'threat' },
          { icon: 'clock', h: 'Operations', d: 'Latency, errors, cost', k: 'control' } ],
        say: 'Monitoring covers six areas. | Data drift: inputs moving away from what the model was trained on. Module 1.3 covers the drift types and the statistics used to measure them. | Performance, measured against real outcomes once they are known, which can take weeks or months. | Fairness: outcomes and error rates for each relevant group. | Output behaviour, such as refusal rates, toxicity and, for generative systems, how well answers are grounded in sources. | Security signals: probing, extraction attempts and abuse. | And operations: latency, errors and cost, where sudden changes can also signal an attack.' },
      { t: 'chart', title: 'Bias can drift too', kind: 'line', x: ['M0', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9'], yMin: 0, yMax: 8, ticks: 4, unit: ' pt', yLabel: 'Illustrative gap in approval rates between two groups, in percentage points',
        series: [{ n: 'Approval-rate gap', k: 'human', v: [2.0, 2.1, 2.3, 2.2, 2.8, 3.4, 4.3, 4.9, 5.6, 6.2] }],
        annot: [{ y: 4, text: 'Tolerance set at approval', k: 'threat', xi: 1.6 }, { x: 6, text: 'Alert', k: 'human', at: 'bottom' }],
        steps: [{ s: [0] }, { a: [0] }, { a: [1] }],
        say: 'Fairness isn’t fixed at approval. In this illustrative chart, the gap in approval rates between two groups starts small, then widens as the applicant population and economic conditions change. | When the model was approved, its owner set a tolerance of four percentage points, recorded in the monitoring plan. | In month six the gap crosses the tolerance and an alert goes to the owner. The first job is to find out why: has the population shifted, has a data pipeline broken, or has the model degraded for one group?' },
      { t: 'bullets', title: 'Anomalies worth an alert', items: [
          { icon: 'bars', h: 'Volume spikes from one identity', d: 'Possible extraction or abuse', k: 'threat' },
          { icon: 'copy', h: 'Systematic, near-duplicate queries', d: 'Probing decision boundaries', k: 'data' },
          { icon: 'compass', h: 'Out-of-distribution inputs', d: 'Unlike anything seen in training', k: 'model' },
          { icon: 'alert', h: 'Unusual outputs', d: 'Leaked data, refusals, policy hits', k: 'human' },
          { icon: 'robot', h: 'Unexpected agent behaviour', d: 'New tools, data or destinations', k: 'control' } ],
        say: 'Security monitoring looks for anomalies against a baseline. | A spike in query volume from one account or API key can signal model extraction or abuse. | Many systematic, near-duplicate queries suggest someone probing the model’s decision boundaries. | Inputs far from the training distribution may be adversarial, or a sign the model is being used outside its approved scope. | Unusual outputs, such as leaked personal data, sudden changes in refusals, or repeated policy violations, need investigation. | And agents that call new tools, touch unfamiliar data or send data to new destinations should raise an alert.' },
      { t: 'flow', title: 'Monitoring feeds governance',
        nodes: [
          { id: 'plan', x: 230, y: 330, icon: 'doc', label: 'Monitoring plan', sub: 'metrics, thresholds, owner', k: 'neutral', w: 300 },
          { id: 'mon', x: 640, y: 330, icon: 'eye', label: 'Monitor', sub: 'drift, fairness, security', k: 'data', w: 290 },
          { id: 'alert', x: 1040, y: 330, icon: 'siren', label: 'Alert', sub: 'threshold crossed', k: 'threat', w: 260 },
          { id: 'tri', x: 1340, y: 560, icon: 'user', label: 'Owner triage', sub: 'find the cause', k: 'human', w: 280 },
          { id: 'act', x: 960, y: 700, icon: 'tool', label: 'Act', sub: 'retrain, restrict or roll back', k: 'control', w: 340 },
          { id: 'gov', x: 500, y: 700, icon: 'book', label: 'Update governance', sub: 'records, re-approval', k: 'model', w: 330 } ],
        edges: [{ from: 'plan', to: 'mon', k: 'neutral' }, { from: 'mon', to: 'alert', k: 'data' }, { from: 'alert', to: 'tri', k: 'threat' }, { from: 'tri', to: 'act', k: 'human' }, { from: 'act', to: 'gov', k: 'control' }],
        steps: [
          { show: 'plan', hi: 'plan' },
          { show: 'mon plan-mon', flow: 'plan-mon', hi: 'mon' },
          { show: 'alert mon-alert', flow: 'mon-alert', hi: 'alert' },
          { show: 'tri alert-tri', flow: 'alert-tri', hi: 'tri' },
          { show: 'act tri-act', flow: 'tri-act', hi: 'act' },
          { show: 'gov act-gov', flow: 'act-gov', hi: 'gov', mark: { gov: 'ok' } } ],
        say: 'Monitoring only matters if it changes decisions. It starts at approval, with a monitoring plan that names the metrics, the thresholds and the owner. | Monitoring then runs continuously across drift, fairness, security and operations. | When a threshold is crossed, an alert fires. | It goes to the model owner, who leads triage to find the cause. | The response might be retraining, recalibrating, restricting use or rolling back. | And governance records catch up: the registry, the risk record and the model card are updated, and a material change goes back through validation and approval.' },
      { t: 'summary', items: ['Monitor drift, performance, fairness, behaviour, security and operations', 'Set metrics, thresholds and owners at approval', 'Baseline normal use; alert on anomalies such as probing', 'Feed results into the registry, risk records and re-approval'],
        say: 'To recap. | Monitor drift, performance, fairness, output behaviour, security signals and operations. | Set the metrics, thresholds and owner at approval, in a monitoring plan. | Baseline normal use, and alert on anomalies such as volume spikes and systematic probing. | And feed what you find back into the registry, the risk records and, when needed, re-approval.' } ] },
    { type: 'text', md: `### Monitoring across the lifecycle
Monitoring starts at approval: the **monitoring plan** (part of the approval record and model card) names the metrics, thresholds, review frequency and accountable owner. Module 1.3 explains the drift types (data, concept, label) and measures such as the population stability index.

| Area | Example signals |
|---|---|
| **Data drift** | Input distribution shifts, new categories, changes in prompt topics or languages, embedding drift |
| **Performance** | Accuracy, precision and recall once outcomes arrive; proxy measures while labels are delayed |
| **Fairness** | Selection rates and error rates (false positives, false negatives) by group, against tolerances |
| **Output behaviour** | Refusal rates, toxicity, hallucination or groundedness scores on sampled outputs, output length |
| **Security** | Query volume and patterns per identity, out-of-distribution inputs, prompt injection detections, data leakage in outputs, agent tool use |
| **Operations** | Latency, error rates, token use and cost; sudden spikes can indicate abuse or denial of service |

### Bias tracking
- Define the **groups and fairness metrics** at approval, with **tolerances** (for example, a maximum gap in approval rates or in false negative rates).
- Track them on a schedule that fits the risk, and investigate when tolerances are breached. Possible causes include population change, broken pipelines, proxy variables and feedback loops.
- Data about protected characteristics is often sensitive or missing. Use privacy-preserving approaches, such as aggregate analysis in a restricted environment, with legal advice on what may be collected.
- For high-risk systems, the EU AI Act requires providers to run a **post-market monitoring system** (Article 72) and deployers to monitor operation according to the instructions for use (Article 26). ISO/IEC 42001 (Clause 9, performance evaluation) and the NIST AI RMF *Measure* and *Manage* functions expect the same continuous measurement.

### Anomaly detection
- **Baseline** normal behaviour per user, API key, application and agent, then alert on deviations: volume spikes, unusual hours, high query diversity or systematic variation (signs of extraction or boundary probing; Module 3.6).
- **Out-of-distribution detection:** flag inputs whose features or embeddings are far from the training data.
- **Output monitors:** detect personal data, secrets, policy violations and canary strings planted to reveal leakage of training data or system prompts.
- **Agent monitoring:** new tools, unusual data volumes, new destinations or privilege changes.
- Send AI detections to the **security operations centre** alongside other telemetry, with runbooks for AI incidents (Modules 5.2 and 5.3).

### Closing the loop
Alerts route to the **model owner**. Responses include retraining or recalibrating, tightening guardrails, restricting use, rolling back (Section 4) or retiring the model. Results update the **registry, risk register and model card**. A material change in behaviour, data or use triggers **revalidation and re-approval**, and every model gets a periodic review whose frequency depends on its risk tier.` },
    { type: 'check', q: { q: 'A credit model was approved with a 2-point gap in approval rates between two groups and a 4-point tolerance. Monitoring now shows a gap of 4.6 points. What should happen FIRST?', o: ['Retrain the model straight away on the most recent applications, then redeploy it', 'The model owner investigates the cause under the monitoring plan and decides on interim steps', 'Raise the tolerance to 5 points, because the applicant population has clearly changed since approval', 'Stop collecting group data, so that the gap can no longer be measured or disclosed'], a: 1, b: 5,
      why: 'A breached tolerance triggers the agreed response: the accountable owner investigates the cause and decides on interim measures. Retraining without a diagnosis may repeat the problem, moving the threshold hides it, and dropping measurement removes the control.' } }
  ]
};
