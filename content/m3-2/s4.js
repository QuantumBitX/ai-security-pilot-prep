/* 3.2 · Section 4: AI-specific privacy challenges (unintentional bias, right to erasure) */
module.exports = {
  title: 'AI-specific privacy challenges: bias and erasure', covers: [4],
  blocks: [
    { type: 'video', title: 'Where privacy meets machine learning', kicker: 'Module 3.2 · Video 4 of 5', scenes: [
      { t: 'title', kicker: 'Module 3.2 · Privacy controls', title: 'Where privacy meets machine learning', sub: 'Memorisation, inference, false facts, unintentional bias and the right to erasure', icon: 'brain',
        say: 'Traditional privacy controls assume data sits in rows you can find, correct and delete. Machine learning breaks that assumption. | This video covers the privacy challenges specific to AI, focusing on unintentional bias and the right to erasure.' },
      { t: 'bullets', title: 'Six AI-specific privacy challenges', layout: 'grid', cols: 2, items: [
          { icon: 'copy', h: 'Memorisation', d: 'Models can reproduce training data', k: 'model' },
          { icon: 'search', h: 'Membership inference', d: 'Was this person in the training set?', k: 'threat' },
          { icon: 'eye', h: 'Attribute inference', d: 'Sensitive traits deduced from ordinary data', k: 'human' },
          { icon: 'alert', h: 'False facts about people', d: 'Hallucinated personal data', k: 'threat' },
          { icon: 'scale', h: 'Unintentional bias', d: 'Unequal outcomes nobody intended', k: 'data' },
          { icon: 'trash', h: 'Erasure and other rights', d: 'Hard to honour inside model weights', k: 'control' } ],
        say: 'Six challenges stand out. | Memorisation: models can reproduce fragments of their training data, including personal details. | Membership inference: testing whether a person’s record was in the training data, which can itself be sensitive, for example in a dataset of patients. | Attribute inference: deducing traits such as health conditions from ordinary data. Inferences about people are personal data. | False facts: a model states untrue things about a real person, breaching the accuracy principle. | Unintentional bias: unequal outcomes for groups of people that nobody intended. | And rights, especially erasure, are hard to honour once data is inside model weights.' },
      { t: 'chart', title: 'Removing the attribute didn’t remove the gap', kind: 'bar', x: ['Group A', 'Group B'], yMin: 0, yMax: 100, ticks: 5, unit: '%', yLabel: 'Illustrative loan approval rates',
        series: [
          { n: 'Attribute used', k: 'neutral', v: [72, 48] },
          { n: 'Attribute removed', k: 'human', v: [70, 51] },
          { n: 'Measured and mitigated', k: 'control', v: [67, 63] } ],
        notes: [{ h: 'A 24-point gap', d: 'The model approves Group B far less often.', k: 'neutral' }, { h: 'Proxies remain', d: 'Postcode, spending and job history stand in for the attribute.', k: 'human' }, { h: 'The tension', d: 'Measuring the gap needs the sensitive attribute, which minimisation restricts.', k: 'threat' }, { h: 'Managed, not avoided', d: 'Safeguarded testing and mitigation narrow the gap.', k: 'control' }],
        steps: [{ s: [0] }, { s: [1] }, {}, { s: [2] }],
        say: 'Unintentional bias often has a privacy twist. In this illustrative lending model, Group B is approved far less often than Group A. | The obvious fix is to remove the protected attribute, but the gap barely moves, because postcode, spending and job history act as proxies. Fairness through unawareness fails. | To measure bias you need to know who is in each group, which collides with minimisation and the extra protection for special category data. | With safeguarded use of that data for testing and mitigation, the gap narrows. The tension is managed, not avoided.' },
      { t: 'flow', title: 'Resolving the fairness–privacy tension',
        nodes: [
          { id: 'need', x: 230, y: 330, icon: 'scale', label: 'Need to test for bias', sub: 'requires group membership', k: 'data', w: 320 },
          { id: 'alt', x: 640, y: 330, icon: 'sparkle', label: 'Alternatives first', sub: 'synthetic, anonymised, aggregate', k: 'neutral', w: 320 },
          { id: 'basis', x: 1040, y: 330, icon: 'gavel', label: 'Legal basis', sub: 'strictly necessary, with conditions', k: 'human', w: 330 },
          { id: 'enc', x: 1400, y: 330, icon: 'lock', label: 'Segregated space', sub: 'restricted, no reuse', k: 'control', w: 280 },
          { id: 'test', x: 1400, y: 690, icon: 'chart', label: 'Measure and mitigate', sub: 'compare outcomes by group', k: 'model', w: 300 },
          { id: 'del', x: 1000, y: 690, icon: 'trash', label: 'Delete when done', sub: 'documented and audited', k: 'neutral', w: 290 } ],
        edges: [{ from: 'need', to: 'alt', k: 'data' }, { from: 'alt', to: 'basis', k: 'neutral' }, { from: 'basis', to: 'enc', k: 'human' }, { from: 'enc', to: 'test', k: 'control' }, { from: 'test', to: 'del', k: 'model' }],
        steps: [
          { show: 'need', hi: 'need' },
          { show: 'alt need-alt', flow: 'need-alt', hi: 'alt' },
          { show: 'basis alt-basis', flow: 'alt-basis', hi: 'basis' },
          { show: 'enc basis-enc', flow: 'basis-enc', hi: 'enc' },
          { show: 'test enc-test', flow: 'enc-test', hi: 'test' },
          { show: 'del test-del', flow: 'test-del', hi: 'del', mark: { del: 'ok' } } ],
        say: 'Here is how to resolve that tension. Start from a genuine need: you can’t detect bias against a group without knowing who is in it. | Try synthetic, anonymised or aggregate data first. | If real sensitive data is strictly necessary, establish a legal basis, such as a GDPR Article 9 condition. The EU AI Act permits this for bias detection in high-risk systems, and the twenty twenty-six Digital Omnibus extended it to other AI systems and models, under strict safeguards. | Process the data in a segregated, access-controlled environment, with no reuse for other purposes. | Measure outcomes by group, mitigate, and record what you changed. | Then delete the sensitive data and document the whole process.' },
      { t: 'compare', title: 'Erasure options for a trained model', labels: ['How it works', 'Assurance', 'Cost'],
        cols: [{ h: 'Retrain', icon: 'cycle', k: 'control' }, { h: 'Machine unlearning', icon: 'rollback', k: 'model' }, { h: 'Output suppression', icon: 'filter', k: 'threat' }],
        rows: [
          ['Rebuild without the data', 'Remove the data’s influence', 'Block outputs about the person'],
          ['Highest: data never seen', 'Varies; hard to verify', 'Lowest: data still in weights'],
          ['High for large models', 'Lower, if designed in', 'Low, but only a stopgap'] ],
        say: 'When someone asks for erasure and their data trained a model, there are three options. | Retrain without their data; use machine unlearning to remove its influence; or suppress outputs about them. | Retraining gives the highest assurance, because the new model never saw the data. Unlearning varies and is hard to verify. Suppression is lowest, because the data stays in the weights. | Costs run the other way, so many organisations suppress straight away, then remove the data at the next scheduled retraining.' },
      { t: 'flow', title: 'Designing for unlearning: SISA training',
        nodes: [
          { id: 'data', x: 220, y: 510, icon: 'database', label: 'Training data', k: 'data', w: 260 },
          { id: 's1', x: 660, y: 300, label: 'Shard 1', sub: 'trains its own sub-model', k: 'model', w: 300 },
          { id: 's2', x: 660, y: 510, label: 'Shard 2', sub: 'trains its own sub-model', k: 'model', w: 300 },
          { id: 's3', x: 660, y: 720, label: 'Shard 3', sub: 'trains its own sub-model', k: 'model', w: 300 },
          { id: 'agg', x: 1100, y: 510, icon: 'layers', label: 'Aggregate', sub: 'combine predictions', k: 'control', w: 270 } ],
        edges: [{ from: 'data', to: 's1', k: 'data' }, { from: 'data', to: 's2', k: 'data' }, { from: 'data', to: 's3', k: 'data' }, { from: 's1', to: 'agg', k: 'model' }, { from: 's2', to: 'agg', k: 'model' }, { from: 's3', to: 'agg', k: 'model' }],
        steps: [
          { show: 'data', hi: 'data' },
          { show: 's1 s2 s3 data-s1 data-s2 data-s3', flow: 'data-s1 data-s2 data-s3' },
          { show: 'agg s1-agg s2-agg s3-agg', flow: 's1-agg s2-agg s3-agg', hi: 'agg' },
          { hi: 's2 data-s2 s2-agg', focus: true, flow: 'data-s2 s2-agg', mark: { s2: 'warn' }, note: { x: 1000, y: 760, w: 520, text: 'Erasing a record retrains only the shard that held it.' } } ],
        say: 'Unlearning is far easier if you design for it. SISA training stands for sharded, isolated, sliced and aggregated. | The data is split into shards, and each shard trains its own sub-model in isolation. | At prediction time, the sub-models’ outputs are combined. | To erase a record, only its shard is retrained. That is far cheaper than retraining everything, and the new sub-model has never seen the data. The trade-off is some loss of accuracy.' },
      { t: 'chat', title: 'False facts about a real person', app: 'General assistant',
        msgs: [
          { r: 'user', t: 'What can you tell me about [a named local doctor]?' },
          { r: 'ai', t: 'They were struck off the medical register in 2021 after a misconduct investigation.' },
          { r: 'note', t: 'Untrue. The model blended details of two different people with similar names.' } ],
        notes: [null, null, { h: 'Accuracy and rectification', d: 'False output about a person breaches the accuracy principle, and they can demand correction.', k: 'threat' }],
        say: 'A user asks a general-purpose assistant about a named local doctor. | It claims, confidently, that the doctor was struck off for misconduct. | That’s false: the model blended two different people. Personal data must be accurate, and people can demand rectification. The provider can’t simply edit the weights, so it corrects grounding sources, filters outputs about the person, and fixes the model over time.' },
      { t: 'summary', items: ['Memorisation and inference make models a privacy risk in themselves', 'Removing protected attributes doesn’t remove bias: proxies remain', 'Bias testing may need sensitive data: strictly necessary, safeguarded, deleted', 'Erasure: retrain, unlearn or suppress, by documented policy'],
        say: 'To recap. | Memorisation and inference make a model a privacy risk in itself, not just its data. | Removing protected attributes doesn’t remove bias, because proxies remain. | Bias testing may need sensitive data: used only when strictly necessary, safeguarded, then deleted. | And erasure from models means retraining, unlearning or suppression, chosen by a documented policy.' } ] },
    { type: 'text', md: `### Privacy risks specific to AI
| Risk | What happens | Controls |
|---|---|---|
| **Memorisation** | Models reproduce training data, especially duplicated or rare records | De-duplication; removing personal data before training; DP-SGD; output filtering; extraction testing (Module 3.3) |
| **Membership inference** | Someone determines whether a person’s data was in the training set | Differential privacy; returning labels rather than confidence scores; rate limiting |
| **Model inversion and attribute inference** | Reconstructing features of training data, or inferring sensitive traits | Limit output detail; access control; treat inferences as personal data |
| **Hallucinated personal data** | False statements about real people | Grounding; declining questions about private individuals; output filters; a rectification process |
| **Children’s data** | Extra protection under the GDPR (Article 8), the UK Age Appropriate Design Code and COPPA | Age assurance; high-privacy defaults |

If a model can’t be shown to be anonymous (EDPB Opinion 28/2024), data protection obligations, including rights, extend to it. Complaints are already testing this: in 2025 the privacy group noyb complained to Norway’s data protection authority after a chatbot falsely described a man as having murdered his children, arguing that inaccurate output breaches the GDPR’s accuracy principle.

### Unintentional bias
Bias arises without intent from **historical bias** in data, **representation bias** (under-sampled groups), **measurement bias** (labels or proxies that mean different things for different groups) and **drift** after deployment (Module 2.2 covers fairness metrics). In a well-known case, a US healthcare algorithm used healthcare *costs* as a proxy for health *need*; because less had historically been spent on Black patients with the same needs, it under-identified them for extra care (Obermeyer and colleagues, 2019).

Why it is a privacy issue as well as a fairness one:
- The GDPR’s **fairness** principle and Recital 71 call for measures against discriminatory profiling, and DPIAs must assess discrimination risk.
- **Proxies**, such as postcode, first name or purchase history, defeat “fairness through unawareness”.
- **Privacy techniques can worsen fairness**: differential privacy and aggressive minimisation can reduce accuracy most for small groups, so re-test fairness after applying them.
- **Measuring bias needs sensitive data.** The AI Act lets providers of high-risk systems process special category data where strictly necessary for bias detection and correction (Article 10(5)). The 2026 Digital Omnibus on AI (Regulation (EU) 2026/1744) added **Article 4a**, extending this to other AI systems and models, provided synthetic or anonymised data can’t do the job, reuse is technically limited, security is state of the art, and the data is deleted once the bias is corrected. It permits bias testing; it doesn’t require it.

### The right to erasure
GDPR **Article 17** applies where, for example, data is no longer needed, consent is withdrawn, the person successfully objects, or processing is unlawful. Exceptions include legal obligations, public health, some archiving and research, and legal claims. Controllers must respond within one month (extendable by two further months for complex requests) and tell recipients (Article 19).

The person’s data may sit in source systems, training and evaluation sets, retrieval indexes, prompts, logs, backups, model weights and vendor copies; **lineage** finds it (Module 3.1). For models:
- **Retraining** without the data is exact but costly, so it is often done at the next scheduled retrain.
- **SISA training** retrains only the affected shard: exact and cheaper, with some accuracy cost.
- **Approximate unlearning** is cheaper again, but test afterwards that the model can no longer reproduce the data.
- **Output suppression** is a quick interim measure; the data stays in the weights.

Regulators haven’t settled exactly what erasure requires for model weights, so document your reasoning for each model: whether it can be shown to be anonymous, the risk to the person, the feasibility and cost of each option, and the timeline for removal.

### Rights playbooks and design
- **Access:** search datasets, indexes, prompts and logs, and explain how the data was used, including in decisions.
- **Rectification:** fix sources and indexes, and filter outputs known to be false.
- **Objection:** where you rely on legitimate interests, exclude objectors from future training and honour opt-outs.
- **Automated decisions:** human review, a way to contest, and a meaningful explanation.
- **Design:** keep personal data out of weights where possible, minimise and de-duplicate training data, keep a deletion queue that feeds retraining, consider SISA where erasure requests are expected, and record which model version made each decision (Module 3.5).` },
    { type: 'scenario', title: 'The erasure request', md: `A former customer asks a retailer to erase their personal data. Eight months ago, the retailer fine-tuned its recommendation model on purchase histories that included this customer’s. The next scheduled retraining is in two months. The customer’s support tickets also sit in a retrieval index used by the support assistant.`,
      q: { q: 'What is the BEST response?', o: ['Explain that data absorbed into model weights can’t be erased, so only the account record will be deleted', 'Clean sources, datasets and the index now; suppress outputs if needed; remove it at the next retraining; confirm what was done', 'Retrain the recommendation model from scratch tonight without their data, then confirm full and final erasure to the customer by email', 'Delete the account and purchase records but keep the support tickets, because the index holds only derived embeddings'], a: 1, b: 4,
        why: 'Erasure must reach every store that lineage identifies. The index and datasets can be cleaned at once; for the model, interim suppression plus removal at the next retraining is proportionate if documented and completed within a defined timeframe. Retraining tonight ignores the index, refusing fails the request, and embeddings derived from personal data are still personal data.' } },
    { type: 'callout', kind: 'exam', title: 'Bias and erasure: answer patterns', md: `- If an option says **remove the protected attribute to eliminate bias**, it is usually a distractor: proxies remain. Better answers **measure outcomes by group** and mitigate.
- Using sensitive data for bias testing is acceptable when **strictly necessary and safeguarded**, then deleted.
- For erasure from models, the strongest answers are **proportionate and documented**: clean every store now, suppress if needed, and retrain or unlearn on a defined timeline.` },
    { type: 'check', q: { q: 'A bank removes ethnicity from its credit model’s inputs, yet approval rates still differ sharply between ethnic groups. What is the MOST likely explanation?', o: ['The model retains the ethnicity field from earlier training runs and still reads it directly', 'Other features act as proxies for ethnicity, so the model learns the same pattern indirectly', 'Approval rates for large groups vary by chance, so the gap is statistical noise to be ignored', 'Removing an input has no effect until the model is redeployed and its thresholds recalibrated'], a: 1, b: 4,
      why: 'Features such as postcode, income patterns or employment history can correlate with ethnicity. “Fairness through unawareness” doesn’t remove bias; outcomes must be measured by group and mitigated.' } }
  ]
};
