/* 2.2 · Section 2: algorithmic bias and fairness across protected groups */
module.exports = {
  title: 'Algorithmic bias and fairness across protected groups', covers: [2],
  blocks: [
    { type: 'video', title: 'Bias in, bias out', kicker: 'Module 2.2 · Video 2 of 4', scenes: [
      { t: 'title', kicker: 'Module 2.2 · Responsible AI and ethics', title: 'Bias in, bias out', sub: 'Where algorithmic bias comes from, how to measure it, and how to reduce it', icon: 'scale',
        say: 'AI systems learn from the past, and the past is not fair. Without deliberate effort, models reproduce and even amplify historical discrimination. | This video explains where bias enters, how fairness is measured, and what you can do about it.' },
      { t: 'flow', title: 'Where bias enters',
        nodes: [
          { id: 'hist', x: 210, y: 320, icon: 'globe', label: 'Historical bias', sub: 'the world itself was unequal', k: 'threat', w: 290 },
          { id: 'rep', x: 620, y: 320, icon: 'users', label: 'Representation', sub: 'some groups under-sampled', k: 'data', w: 290 },
          { id: 'meas', x: 1030, y: 320, icon: 'ruler', label: 'Measurement', sub: 'labels and proxies skewed', k: 'human', w: 290 },
          { id: 'agg', x: 1030, y: 680, icon: 'model', label: 'Learning', sub: 'one model fits the majority', k: 'model', w: 290 },
          { id: 'ev', x: 620, y: 680, icon: 'audit', label: 'Evaluation', sub: 'test data not representative', k: 'neutral', w: 290 },
          { id: 'dep', x: 210, y: 680, icon: 'cycle', label: 'Deployment', sub: 'misuse and feedback loops', k: 'threat', w: 290 } ],
        edges: [{ from: 'hist', to: 'rep', k: 'data' }, { from: 'rep', to: 'meas', k: 'data' }, { from: 'meas', to: 'agg', k: 'model' }, { from: 'agg', to: 'ev', k: 'model' }, { from: 'ev', to: 'dep', k: 'neutral' }],
        steps: [
          { show: 'hist', hi: 'hist' },
          { show: 'rep hist-rep', flow: 'hist-rep', hi: 'rep' },
          { show: 'meas rep-meas', flow: 'rep-meas', hi: 'meas' },
          { show: 'agg meas-agg', flow: 'meas-agg', hi: 'agg' },
          { show: 'ev agg-ev', flow: 'agg-ev', hi: 'ev' },
          { show: 'dep ev-dep', flow: 'ev-dep', hi: 'dep' } ],
        say: 'Bias can enter at every stage. It starts with historical bias: the world that generated the data was unequal, so even perfectly collected data encodes that inequality. | Representation bias occurs when some groups are under-sampled, so the model learns less about them. | Measurement bias comes from skewed labels or proxies. Using arrests as a proxy for crime, or postcode as a proxy for creditworthiness, imports existing disparities. | Learning, or aggregation, bias appears when a single model optimised for overall accuracy fits the majority and fails smaller groups. | Evaluation bias hides the problem when test data doesn’t represent everyone the system will serve. | And deployment bias arises when a system is used beyond its intended context, or when its outputs feed back into the next round of training data.' },
      { t: 'stat', kicker: 'Unequal errors', num: { v: 45, suf: '% vs 24%', label: 'false positive rates, Black vs white defendants (2016)' },
        def: 'A widely used recidivism tool had similar overall accuracy for both groups, but its errors fell very differently.',
        ex: 'People wrongly labelled “high risk” face harsher outcomes. Equal accuracy did not mean equal treatment.',
        say: 'A famous example. In twenty sixteen, journalists analysed a recidivism risk tool used in US courts. They found that Black defendants who did not reoffend were wrongly labelled high risk about forty-five per cent of the time, against about twenty-four per cent for white defendants. | The tool’s overall accuracy was similar for both groups. Its errors were not. | People wrongly labelled high risk can face harsher bail and sentencing decisions, so equal accuracy did not mean equal treatment.' },
      { t: 'bullets', title: 'Four ways to define fairness', layout: 'grid', cols: 2, items: [
          { icon: 'users', h: 'Demographic parity', d: 'Each group is selected at the same rate', k: 'data' },
          { icon: 'check', h: 'Equal opportunity', d: 'Qualified people in every group are selected at the same rate (equal TPR)', k: 'control' },
          { icon: 'scale', h: 'Equalised odds', d: 'Equal true positive and false positive rates across groups', k: 'human' },
          { icon: 'target', h: 'Predictive parity', d: 'A positive prediction is equally reliable for every group (equal precision)', k: 'model' } ],
        say: 'Fairness can be measured in several ways, and they don’t agree. | Demographic parity asks whether each group is selected at the same rate, regardless of other factors. | Equal opportunity asks whether qualified people in every group are selected at the same rate. In other words, equal true positive rates. | Equalised odds is stricter: equal true positive rates and equal false positive rates. | And predictive parity asks whether a positive prediction is equally reliable for every group, which means equal precision. When base rates differ between groups, it is mathematically impossible to satisfy all of these at once, so choosing the right measure is a policy decision, not a technical one.' },
      { t: 'chart', title: 'The four-fifths rule', kind: 'bar', x: ['Group A', 'Group B', 'Group C', 'Group D'], yMin: 0, yMax: 70, ticks: 7, unit: '%', yLabel: 'Shortlisting rate by group',
        series: [{ n: 'Selection rate', k: 'data', v: [60, 42, 55, 51], ck: ['data', 'threat', 'data', 'data'] }],
        annot: [{ y: 48, text: '80% of highest', k: 'threat', xi: 1 }],
        notes: [{ h: 'Impact ratio', d: 'Each group’s selection rate divided by the highest group’s rate.', k: 'data' }, { h: 'Group B: 42 ÷ 60 = 0.70', d: 'Below 0.8, a common red flag for adverse impact that needs investigation.', k: 'threat' }],
        steps: [{ s: [0] }, { a: [0] }],
        say: 'A simple screening test is the four-fifths rule, from US employment guidance. Divide each group’s selection rate by the rate of the most-selected group. This is the impact ratio. | Here, group B’s rate is forty-two per cent, against sixty per cent for group A, an impact ratio of point seven. Anything below point eight is a common red flag for adverse impact. It doesn’t prove discrimination, but it demands investigation, and similar ratios appear in mandated bias audits of hiring tools.' },
      { t: 'bullets', title: 'Reducing bias', items: [
          { icon: 'database', h: 'Before training', d: 'Better and more representative data; reweighting; remove proxy features', k: 'data' },
          { icon: 'model', h: 'During training', d: 'Fairness constraints or penalties in the learning objective', k: 'model' },
          { icon: 'sliders', h: 'After training', d: 'Adjust thresholds or calibrate outputs, where lawful', k: 'human' },
          { icon: 'users', h: 'Around the model', d: 'Diverse teams, impact assessment, human review, monitoring', k: 'control' } ],
        say: 'Mitigation can happen at several points. | Before training: collect better, more representative data, reweight under-represented groups, and remove features that act as proxies for protected characteristics. | During training: add fairness constraints or penalties to the learning objective. | After training: adjust decision thresholds or calibrate outputs, where the law allows it. | And around the model: diverse teams, impact assessments, meaningful human review, and monitoring of fairness metrics in production, because bias can drift too.' },
      { t: 'summary', items: ['Bias enters at every stage, starting with history', 'Equal accuracy can hide unequal errors', 'Fairness metrics conflict; choosing one is a policy decision', 'Mitigate before, during and after training, and monitor'],
        say: 'To recap. | Bias can enter at every stage, starting with historical inequality in the data. | Equal overall accuracy can hide very unequal errors between groups. | Fairness metrics conflict, so choosing one is a policy decision that needs the right owner. | And mitigation happens before, during and after training, with monitoring in production.' } ] },
    { type: 'text', md: `### Protected groups and discrimination
Most jurisdictions prohibit discrimination on the basis of **protected characteristics**. The lists vary: the UK Equality Act 2010, for example, names nine (age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, and sexual orientation), while US federal law protects characteristics such as race, colour, religion, sex, national origin, age and disability. Two forms of discrimination matter for AI:

- **Direct discrimination** (disparate treatment): treating someone less favourably *because of* a protected characteristic. A model that uses gender as an input to reject applicants does this.
- **Indirect discrimination** (disparate impact): an apparently neutral rule or model that disproportionately disadvantages a protected group without adequate justification. Most AI bias is of this kind, often through **proxies**: postcode for ethnicity, career gaps for sex, name for national origin.

Removing protected attributes from the inputs (“fairness through unawareness”) rarely works, because proxies carry the same information. In one widely reported case, an experimental recruiting model learned to downgrade CVs containing the word “women’s” (as in “women’s chess club captain”), because it had been trained on a decade of applications dominated by men. The project was abandoned.

### Sources of bias
| Source | Description | Example |
|---|---|---|
| Historical | Data reflects past inequality | Lending data shaped by past discriminatory practices |
| Representation (sampling) | Groups are under- or over-represented | Face datasets dominated by lighter-skinned faces |
| Measurement | Labels or features are flawed proxies | Healthcare cost used as a proxy for health need |
| Aggregation (learning) | One model for groups that behave differently | A diagnostic model tuned on the majority population |
| Evaluation | Benchmarks don’t reflect the deployment population | Testing speech recognition only on native speakers |
| Deployment | Use outside intended context; feedback loops | Predictive policing sending more patrols, finding more crime, reinforcing itself |

Generative AI adds **representational harms**: stereotyped images, biased associations in text, and uneven quality across languages and dialects. These are evaluated with targeted prompts and benchmarks across groups, not just with classification metrics.

### Measuring fairness
Using the confusion matrix from Module 1.3, computed **separately for each group**:

| Metric | Equal across groups | When it fits |
|---|---|---|
| **Demographic (statistical) parity** | Selection rate | When the goal is equal representation in outcomes |
| **Equal opportunity** | True positive rate (recall) | When missing qualified people is the main harm |
| **Equalised odds** | True positive and false positive rates | When both missed opportunities and wrongful flags harm people |
| **Predictive parity** | Precision | When a positive decision must mean the same for everyone |
| **Calibration within groups** | Predicted probabilities match outcomes | When scores are used directly as probabilities |

Research by Kleinberg and colleagues and by Chouldechova showed that when base rates differ between groups, a classifier generally cannot be calibrated *and* have equal false positive and false negative rates at the same time. The recidivism controversy was exactly this conflict: the vendor pointed to equal predictive parity, critics to unequal false positive rates. **Choosing the metric is a governance decision** that depends on context, law and which errors cause the most harm.

### Regulation and audits
- The **four-fifths (80%) rule** from the US Uniform Guidelines on Employee Selection Procedures treats an impact ratio below 0.8 as evidence of potential adverse impact.
- **New York City Local Law 144** requires annual independent bias audits of automated employment decision tools, with published impact ratios.
- The **EU AI Act** (Article 10) requires providers of high-risk systems to examine training, validation and test data for possible biases and take measures to detect, prevent and mitigate them. Recognising that you can’t measure bias without data about groups, the Act permits strictly necessary processing of special-category data for bias detection, with safeguards, and the 2026 Omnibus extended this permission beyond high-risk systems.

### Mitigation and monitoring
- **Pre-processing:** collect more representative data; reweight or resample; remove or transform proxy features; fix label quality.
- **In-processing:** add fairness constraints or regularisation to training; adversarial debiasing.
- **Post-processing:** adjust thresholds per group or recalibrate scores. Group-specific thresholds may be unlawful in some contexts (for example, some employment decisions), so legal advice is essential.
- **Organisational:** diverse development and review teams; stakeholder consultation with affected groups; impact assessments; human review of adverse decisions; complaint and appeal channels.
- **Monitoring:** fairness can drift as populations change. Track group metrics in production, with thresholds and owners, just like accuracy.`, },
    { type: 'steps', title: 'Run a fairness check', items: [
      ['Define the decision and the harm', 'A model shortlists applicants for interview. The main harm is qualified people being wrongly rejected.'],
      ['Choose metrics with the owner', 'The business owner, HR, legal and the ethics officer agree to track impact ratios and equal opportunity (true positive rate by group).'],
      ['Get group data lawfully', 'Use voluntarily provided diversity data under strict access controls, or a validated proxy method approved by legal and privacy teams.'],
      ['Compute and compare', 'Selection rates: A 60%, B 42%, C 55%, D 51%. Impact ratio for B is 0.70, below the 0.8 threshold. True positive rate for B is also lowest.'],
      ['Investigate causes', 'Analysis shows a feature measuring continuous employment penalises career breaks, which are more common in group B.'],
      ['Mitigate and re-test', 'Remove the feature, retrain, and re-test: B’s impact ratio rises to 0.86 with little loss of accuracy. Document the decision and add monitoring.'] ] },
    { type: 'callout', kind: 'exam', title: 'Fairness traps', md: `- **Removing the protected attribute** is not enough: proxies leak it back in.
- **Equal overall accuracy** does not mean fair: compare error rates *by group*.
- **No single metric** is universally right. When base rates differ, metrics conflict, so the choice must be justified and owned.
- **Bias is not only a data-science problem**: governance, diverse teams, impact assessment and monitoring are part of the answer.` },
    { type: 'check', q: { q: 'A loan model excludes race as an input, yet approval rates differ sharply by race. Investigation finds it relies heavily on postcode. What is the MOST likely explanation?', o: ['The model is fair, because race isn’t one of its inputs and postcode is a neutral feature', 'Postcode is acting as a proxy for race, producing indirect discrimination', 'The model is overfitted to the training data, so its outcomes differ between areas', 'The disparity is most likely due to random chance in the applicant sample'], a: 1, b: 2,
      why: 'Removing a protected attribute doesn’t remove its influence when correlated features act as proxies. Residential patterns make postcode a strong proxy for race in many places.' } }
  ]
};
