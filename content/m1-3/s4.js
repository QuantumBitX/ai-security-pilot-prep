/* 1.3 · Section 4: evaluation metrics for predictive models */
module.exports = {
  title: 'Evaluation metrics for predictive models', covers: [4],
  blocks: [
    { type: 'video', title: 'Measuring a classifier', kicker: 'Module 1.3 · Video 4 of 6', scenes: [
      { t: 'title', kicker: 'Module 1.3 · Limitations and performance', title: 'Measuring a classifier', sub: 'Confusion matrices, precision, recall and the accuracy trap', icon: 'ruler',
        say: 'You can’t manage what you can’t measure, and with AI, choosing the wrong measure can hide a dangerous model behind a great-looking number. | This video covers the core metrics for classifiers, the kind of model behind malware detection, fraud scoring and alert triage.' },
      { t: 'matrix', title: 'The confusion matrix', rows: ['Actually malicious', 'Actually benign'], cols: ['Flagged', 'Not flagged'], xLabel: 'Model says', yLabel: 'Reality',
        cells: [['TP 90', 'FN 10'], ['FP 45', 'TN 9,855']], cellSize: 40, heat: false,
        items: [],
        notes: [{ h: '10,000 files', d: '100 are malicious, 1% of the total.', k: 'data' }, { h: 'True positives: 90', d: 'Malicious and caught.', k: 'control' }, { h: 'False negatives: 10', d: 'Malicious and missed. The dangerous error.', k: 'threat' }, { h: 'False positives: 45', d: 'Benign but flagged. Costs analyst time.', k: 'human' }, { h: 'True negatives: 9,855', d: 'Benign and correctly ignored.', k: 'neutral' }],
        say: 'Every metric starts from the confusion matrix. Here, a malware detector scans ten thousand files, of which one hundred are actually malicious. | Ninety malicious files are flagged. These are true positives. | Ten malicious files are missed. These false negatives are the dangerous error. | Forty-five harmless files are flagged by mistake. These false positives cost analyst time and erode trust. | And nine thousand eight hundred and fifty-five harmless files are correctly left alone. These are true negatives.' },
      { t: 'stat', kicker: 'The accuracy trap', num: { v: 99, suf: '%', label: 'accuracy for a “detector” that never flags anything at all' },
        def: 'When only 1% of files are malicious, flagging nothing is 99% accurate, and catches no malware.',
        ex: 'Our real detector scores 99.45% accuracy. The number tells you almost nothing about how well it finds malware.',
        say: 'Now a trap. A detector that never flags anything at all scores ninety-nine per cent accuracy on this data. | Because only one per cent of files are malicious, doing nothing is right ninety-nine times in a hundred, while catching no malware whatsoever. This is the accuracy paradox, and it applies to every rare-event problem in security. | Our real detector scores ninety-nine point four five per cent. That number barely distinguishes it from a detector that does nothing.' },
      { t: 'bullets', title: 'The metrics that matter', layout: 'grid', cols: 2, items: [
          { icon: 'target', h: 'Precision = TP ÷ (TP + FP)', d: '90 ÷ 135 = 67%. Of the alerts, how many are real?', k: 'human' },
          { icon: 'search', h: 'Recall = TP ÷ (TP + FN)', d: '90 ÷ 100 = 90%. Of the real threats, how many were caught?', k: 'control' },
          { icon: 'scale', h: 'F1 = harmonic mean', d: '2PR ÷ (P + R) = 77%. One number that balances the two', k: 'model' },
          { icon: 'siren', h: 'False positive rate = FP ÷ (FP + TN)', d: '45 ÷ 9,900 = 0.45%. Small rates still flood analysts at scale', k: 'threat' } ],
        say: 'Four metrics tell the real story. | Precision asks: of everything flagged, how much was really malicious? Ninety out of one hundred and thirty-five, or sixty-seven per cent. | Recall, also called sensitivity or the true positive rate, asks: of all the real malware, how much did we catch? Ninety out of a hundred, or ninety per cent. | F1 combines them, using the harmonic mean, so it is only high when both are high. Here it is seventy-seven per cent. | And the false positive rate is the share of harmless items wrongly flagged. Point four five per cent sounds tiny, but across ten million files a day, it is forty-five thousand false alarms.' },
      { t: 'chart', title: 'The threshold trade-off', kind: 'line', x: ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9'], yMin: 0, yMax: 100, ticks: 5, unit: '%', yLabel: 'As the alert threshold rises',
        series: [
          { n: 'Precision', k: 'human', v: [18, 30, 44, 56, 67, 76, 84, 90, 95], dy: 84 },
          { n: 'Recall', k: 'control', v: [99, 98, 96, 93, 90, 84, 75, 61, 42] } ],
        annot: [{ x: 3, text: 'Misses are costly', k: 'control', at: 'bottom' }, { x: 7, text: 'Alerts are costly', k: 'human', at: 'bottom' }],
        notes: [{ h: 'One model, many settings', d: 'Most classifiers output a score. The threshold turns it into a decision.', k: 'model' }, { h: 'Low threshold', d: 'Catches more threats, raises more false alarms.', k: 'control' }, { h: 'High threshold', d: 'Fewer, better alerts, but more misses.', k: 'human' }],
        steps: [{ s: [0, 1] }, { a: [0] }, { a: [1] }],
        say: 'Most classifiers output a score, and a threshold turns that score into a decision. Move the threshold, and precision and recall trade against each other. | Lower it, and you catch more threats at the cost of more false alarms. That suits problems where a miss is very costly, such as ransomware or fraud. | Raise it, and the alerts you get are more reliable, but more threats slip through. Choosing the threshold is a business and risk decision, not just a technical one.' },
      { t: 'compare', title: 'Which metric to prioritise', labels: ['Prioritise', 'When', 'Security example'],
        cols: [{ h: 'Recall', icon: 'search', k: 'control' }, { h: 'Precision', icon: 'target', k: 'human' }],
        rows: [
          ['Catch as many real cases as possible', 'Raise as few false alarms as possible'],
          ['Missing a case is very costly', 'Each alert is expensive to handle'],
          ['Ransomware, fraud, data exfiltration', 'Automated blocking of customer logins'] ],
        say: 'So which matters more? | Prioritise recall when you need to catch as many real cases as possible. Prioritise precision when you need as few false alarms as possible. | Recall wins when a miss is very costly. Precision wins when every alert is expensive, or when the system acts automatically. | Ransomware and exfiltration detection usually favour recall. A system that automatically blocks customer logins needs high precision, because every false positive locks out a real customer.' },
      { t: 'summary', items: ['Start from the confusion matrix: TP, FP, FN, TN', 'Accuracy misleads when the event is rare', 'Precision: alert quality; recall: threats caught', 'The threshold sets the trade-off; choose it by cost'],
        say: 'To recap. | Every metric comes from the confusion matrix: true positives, false positives, false negatives and true negatives. | Accuracy misleads whenever the event you care about is rare. | Precision measures the quality of alerts; recall measures how many real threats you catch. | And the threshold sets the trade-off between them, so choose it by the cost of each kind of error.' } ] },
    { type: 'text', md: `### The confusion matrix
For a binary classifier, every prediction lands in one of four cells. Using the malware example from the video (10,000 files, 100 malicious):

| | Flagged (predicted positive) | Not flagged (predicted negative) |
|---|---|---|
| **Actually malicious** | True positive (TP) = 90 | False negative (FN) = 10 |
| **Actually benign** | False positive (FP) = 45 | True negative (TN) = 9,855 |

A **false positive** is also called a *type I error*; a **false negative** is a *type II error*.

### The core metrics
| Metric | Formula | Example | Question it answers |
|---|---|---|---|
| Accuracy | (TP + TN) ÷ total | 9,945 ÷ 10,000 = 99.45% | How often is the model right overall? |
| Precision | TP ÷ (TP + FP) | 90 ÷ 135 = 66.7% | When it raises an alert, how often is it real? |
| Recall (sensitivity, TPR) | TP ÷ (TP + FN) | 90 ÷ 100 = 90% | Of the real threats, how many did it catch? |
| Specificity (TNR) | TN ÷ (TN + FP) | 9,855 ÷ 9,900 = 99.5% | Of the harmless items, how many were left alone? |
| False positive rate | FP ÷ (FP + TN) | 45 ÷ 9,900 = 0.45% | How often is a harmless item flagged? |
| F1 score | 2 × P × R ÷ (P + R) | 2 × 0.667 × 0.9 ÷ 1.567 = 76.6% | A single balance of precision and recall |

**Base rates matter.** Precision depends heavily on how common the positive class is. The same detector applied to a population where malware is ten times rarer would raise roughly the same number of false alarms but find a tenth of the threats, so its precision would collapse. Always evaluate on data with realistic proportions.

### Thresholds, ROC and PR curves
Most classifiers output a score between 0 and 1. The **decision threshold** converts it to a yes or no. Lowering the threshold raises recall and the false positive rate; raising it improves precision and lowers recall.

- A **ROC curve** plots the true positive rate against the false positive rate across all thresholds. The **area under the curve (AUC)** summarises it: 1.0 is perfect, 0.5 is no better than chance. AUC measures ranking quality independent of any one threshold.
- A **precision–recall (PR) curve** plots precision against recall. For rare events, the PR curve is more informative than ROC, because a tiny false positive rate can still mean many false alarms.
- Because the right threshold depends on the cost of each error, it should be set with the business owner. A security team might express it as: “maximise recall while keeping alert volume within the capacity of the analysts.”

### Beyond classification
- **Regression** (predicting a number, such as transaction value or capacity demand) uses **mean absolute error (MAE)**, the average size of errors, and **root mean squared error (RMSE)**, which penalises large errors more heavily.
- **Calibration** (Section 1) measures whether scores can be read as probabilities. A well-ranked model can still be badly calibrated.
- **Fairness metrics** compare error rates across groups. A model with excellent overall recall can still miss far more cases for one group than another. Domain 2 covers fairness measures.
- **Operational metrics** such as latency, throughput, cost per prediction and availability matter as much as accuracy in production.

### Evaluate honestly
Good evaluation uses a **held-out test set** that the model never saw in training or tuning, drawn from the same population the model will face in production. Splitting by time (train on older data, test on newer) is more realistic for security problems, because attackers change over time. Watch for **data leakage**, where information about the answer slips into the training features, producing results that look excellent and then fail in production.`, },
    { type: 'steps', title: 'Work the numbers: a phishing filter', items: [
      ['The data', 'A phishing filter is tested on 20,000 emails, of which 400 are phishing. It flags 500 emails, of which 360 are phishing.'],
      ['Fill the matrix', 'TP = 360. FP = 500 − 360 = 140. FN = 400 − 360 = 40. TN = 20,000 − 360 − 140 − 40 = 19,460.'],
      ['Precision', '360 ÷ 500 = 72%. Just over seven in ten flagged emails really are phishing.'],
      ['Recall', '360 ÷ 400 = 90%. The filter catches nine in ten phishing emails and misses 40.'],
      ['Accuracy', '(360 + 19,460) ÷ 20,000 = 99.1%. Impressive-sounding, and nearly useless as a guide.'],
      ['Decide', 'If the 40 missed emails could each lead to a breach, the team should lower the threshold to raise recall, then manage the extra alerts with triage automation or more analyst capacity.'] ] },
    { type: 'callout', kind: 'exam', title: 'Reading metric questions', md: `- “Of the alerts, how many were real?” is **precision**.
- “Of the real attacks, how many were detected?” is **recall** (sensitivity, true positive rate).
- “Rare event and high accuracy” is a warning sign: think **accuracy paradox**.
- “Costly misses” points to **recall**; “costly false alarms” or “automatic action” points to **precision**.` },
    { type: 'check', q: { q: 'A security team’s intrusion classifier reports 99.7% accuracy. Intrusions make up 0.3% of the events it sees. What should the team conclude?', o: ['The classifier is excellent and ready for production, since 99.7% exceeds the usual 95% benchmark for security tools', 'Accuracy says little here: predicting “no intrusion” every time would also score 99.7%, so check recall and precision', 'The classifier is overfitted to the training data and must be retrained on a balanced dataset before use', 'The classifier’s false positive rate must be exactly 0.3%, matching the share of events that are intrusions'], a: 1, b: 4,
      why: 'With a 0.3% base rate, a model that never detects anything scores 99.7% accuracy. Recall shows how many intrusions are caught, and precision shows how reliable the alerts are.' } }
  ]
};
