/* 2.3 · Section 1: AI-specific risk quantification and mapping */
module.exports = {
  title: 'Identifying, quantifying and mapping AI risk', covers: [1],
  blocks: [
    { type: 'video', title: 'Putting numbers on AI risk', kicker: 'Module 2.3 · Video 1 of 4', scenes: [
      { t: 'title', kicker: 'Module 2.3 · AI risk management', title: 'Putting numbers on AI risk', sub: 'Risk categories, qualitative and quantitative analysis, and the risk register', icon: 'chart',
        say: 'Risk management turns worry into decisions. To do that for AI, you need to know what can go wrong, how likely it is, and how much it would hurt. | This video covers AI risk categories, qualitative and quantitative analysis, and how risks are recorded and mapped.' },
      { t: 'bullets', title: 'Categories of AI risk', layout: 'grid', cols: 2, items: [
          { icon: 'shield', h: 'Security', d: 'Attacks on models, data, prompts and tools', k: 'threat' },
          { icon: 'fingerprint', h: 'Privacy', d: 'Leakage, inference and unlawful processing', k: 'data' },
          { icon: 'scale', h: 'Fairness', d: 'Discriminatory or exclusionary outcomes', k: 'human' },
          { icon: 'alert', h: 'Reliability and safety', d: 'Errors, hallucinations, unsafe actions, drift', k: 'model' },
          { icon: 'gavel', h: 'Legal and compliance', d: 'Regulatory breaches, IP infringement, liability', k: 'neutral' },
          { icon: 'building', h: 'Operational and third party', d: 'Outages, vendor changes, cost overruns', k: 'control' } ],
        say: 'AI risks fall into a handful of categories, and a good assessment considers them all. | Security: attacks on models, training data, prompts and connected tools. | Privacy: leakage of personal data, inferences about people, and unlawful processing. | Fairness: discriminatory or exclusionary outcomes. | Reliability and safety: errors, hallucinations, unsafe actions and drift. | Legal and compliance: regulatory breaches, intellectual property infringement and liability. | And operational and third-party risk: outages, silent vendor changes and cost overruns. Each can also cause reputational damage.' },
      { t: 'compare', title: 'Two ways to analyse risk', labels: ['How', 'Strength', 'Weakness'],
        cols: [{ h: 'Qualitative', icon: 'bars', k: 'human' }, { h: 'Quantitative', icon: 'money', k: 'data' }],
        rows: [
          ['Rate likelihood and impact on scales such as low to high', 'Estimate frequency and loss in money'],
          ['Fast; works without much data; easy to communicate', 'Supports cost–benefit decisions and comparison'],
          ['Subjective; hard to compare or aggregate', 'Needs data that is scarce for new AI risks'] ],
        say: 'There are two broad ways to analyse risk. | Qualitative analysis rates likelihood and impact on scales, such as low, medium and high. Quantitative analysis estimates how often a loss will happen, and how much it will cost, in money. | Qualitative analysis is fast, works without much data, and is easy to communicate. Quantitative analysis supports cost-benefit decisions, such as whether a control is worth its price. | But qualitative ratings are subjective and hard to aggregate, while quantitative estimates need data that is often scarce for new AI risks. Most organisations use both.' },
      { t: 'matrix', title: 'A heat map of AI risks', rows: ['Likely', 'Possible', 'Rare'], cols: ['Minor', 'Moderate', 'Severe'], xLabel: 'Impact', yLabel: 'Likelihood', heat: true,
        items: [
          { r: 0, c: 1, t: 'Prompt injection', k: 'threat' },
          { r: 0, c: 0, t: 'Hallucination', k: 'model' },
          { r: 1, c: 2, t: 'Biased screening', k: 'human' },
          { r: 1, c: 2, t: 'Data leakage', k: 'data' },
          { r: 2, c: 2, t: 'Model theft', k: 'threat' } ],
        say: 'A heat map plots each risk by likelihood and impact, so the most urgent stand out. Here is an assessment for an external customer assistant. | Prompt injection through customer messages is likely, with moderate impact. | Minor hallucinations are likely, but with limited impact because answers are grounded and reviewed. | Biased handling of complaints is possible, with severe impact on people. | So is leakage of customer data through the assistant. | And theft of the model is rare, but severe. The top-right cells demand action first.' },
      { t: 'stat', kicker: 'Annualised loss expectancy', num: { v: 100000, pre: '£', label: 'expected loss per year from one AI data-leak scenario' },
        def: 'SLE = asset value × exposure factor = £2m × 20% = £400,000. ALE = SLE × ARO = £400,000 × 0.25 = £100,000.',
        ex: 'A control costing £30,000 a year that cuts ARO to 0.05 saves £80,000 in ALE: worth £50,000 a year.',
        say: 'Here is the classic quantitative formula. Annualised loss expectancy is the expected loss per year from one risk scenario. | First, the single loss expectancy: the asset value multiplied by the exposure factor, the share of value lost in one event. Two million pounds at twenty per cent is four hundred thousand. Multiply by the annualised rate of occurrence, here once every four years, or point two five, and the ALE is one hundred thousand pounds a year. | Now a control costing thirty thousand a year that cuts the rate to point oh five lowers the ALE to twenty thousand, an eighty thousand pound reduction. Subtract its cost, and the control is worth fifty thousand pounds a year.' },
      { t: 'bullets', title: 'Writing a good risk register entry', items: [
          { icon: 'text', h: 'Risk statement', d: 'Cause, event and consequence, in one sentence', k: 'neutral' },
          { icon: 'user', h: 'Owner', d: 'A named person with authority to act', k: 'human' },
          { icon: 'alert', h: 'Inherent and residual ratings', d: 'Before and after controls', k: 'threat' },
          { icon: 'shield', h: 'Controls and treatment plan', d: 'Existing controls, planned actions, deadlines', k: 'control' },
          { icon: 'chart', h: 'Key risk indicators', d: 'Signals that the risk is rising', k: 'data' } ],
        say: 'Each risk is recorded in a register. | Start with a clear risk statement: cause, event and consequence. For example: because the assistant reads customer emails, an attacker could embed instructions that cause it to disclose another customer’s data, leading to a reportable breach. | Give it a named owner with authority to act. | Record the inherent rating, before controls, and the residual rating, after them. | List existing controls and the treatment plan, with deadlines. | And define key risk indicators, such as the rate of blocked injection attempts, that warn you when the risk is rising.' },
      { t: 'summary', items: ['Consider security, privacy, fairness, reliability, legal, operational', 'Qualitative for speed; quantitative for cost–benefit', 'ALE = SLE × ARO; SLE = asset value × exposure factor', 'Register: statement, owner, ratings, controls, KRIs'],
        say: 'To recap. | Consider every category of AI risk: security, privacy, fairness, reliability and safety, legal and operational. | Use qualitative analysis for speed and communication, and quantitative analysis to justify spending. | Annualised loss expectancy equals single loss expectancy times the annualised rate of occurrence. | And a good register entry has a clear statement, an owner, inherent and residual ratings, controls and key risk indicators.' } ] },
    { type: 'text', md: `### What makes AI risk different
AI risk management uses the same foundations as any risk management, as described in ISO 31000 and applied to AI in ISO/IEC 23894 and the NIST AI RMF. But several features of AI make it harder:

- **Harms to others.** Many AI harms fall on people outside the organisation, such as applicants, patients and the public, so impact must be assessed for individuals, groups and society, not only the organisation.
- **Limited loss data.** New attack techniques and failure modes have little history, so frequency estimates are uncertain.
- **Non-determinism and emergence.** Systems can behave differently on similar inputs, and capabilities can surprise their builders.
- **Dependency chains.** Models, datasets, libraries and APIs from third parties introduce risks you don’t directly control.
- **Change.** Drift and model updates mean today’s rating can be wrong next quarter.

### Risk vocabulary
| Term | Meaning |
|---|---|
| **Risk** | The effect of uncertainty on objectives; commonly expressed as a combination of **likelihood** and **impact** |
| **Inherent risk** | Risk before considering controls |
| **Residual risk** | Risk remaining after controls |
| **Risk appetite** | The amount and type of risk an organisation is willing to pursue or retain in pursuit of its objectives |
| **Risk tolerance** | The acceptable variation around objectives; often expressed as thresholds for specific risks |
| **Key risk indicator (KRI)** | A metric that signals rising exposure, such as drift scores, injection attempts or complaint rates |

### Qualitative, semi-quantitative and quantitative analysis
- **Qualitative:** likelihood and impact on descriptive scales (for example, rare to almost certain; minor to severe), plotted on a heat map. Quick and accessible, but subjective.
- **Semi-quantitative:** numbers assigned to the scales (for example, 1–5 each, multiplied to give 1–25). Easy to rank, but the arithmetic can imply false precision.
- **Quantitative:** frequency and monetary loss. The classic formulas are:
  - **Single loss expectancy (SLE)** = asset value (AV) × exposure factor (EF)
  - **Annualised loss expectancy (ALE)** = SLE × annualised rate of occurrence (ARO)
  - **Value of a safeguard** = ALE before − ALE after − annual cost of the safeguard

**FAIR** (Factor Analysis of Information Risk) is a widely used quantitative model that decomposes risk into **loss event frequency** (threat event frequency × vulnerability) and **loss magnitude** (primary and secondary losses), usually estimated as ranges and simulated with Monte Carlo methods. Ranges are more honest than single numbers when data is scarce.

For AI, combine approaches: quantify financial exposure where you can (breach costs, fraud losses, fines, outages), and assess **impact on people** qualitatively, because harms such as discrimination or loss of autonomy don’t reduce neatly to money.

### Mapping AI risks
Risk **mapping** connects each risk to where it arises and how it is tracked:
1. **To the system:** which component creates the exposure (training data, model, prompts and retrieval, tools and agents, outputs, infrastructure, suppliers).
2. **To the lifecycle:** design, data collection, training, evaluation, deployment, operation, retirement.
3. **To threat and risk catalogues:** MITRE ATLAS techniques, the OWASP Top 10 for LLM Applications, the NIST Generative AI Profile’s twelve risks, and repositories such as the MIT AI Risk Repository, so that nothing obvious is missed and findings use common language.
4. **To controls and owners:** each risk links to the controls that treat it and the person accountable for it.

This mapping lets you answer questions such as “which of our systems are exposed to indirect prompt injection, and who owns each?” and supports the NIST AI RMF **Map** function.`, },
    { type: 'steps', title: 'Work an ALE example', items: [
      ['Define the scenario', 'An AI support assistant could leak customer records through indirect prompt injection. The records are valued at £2,000,000 (cost of notification, remediation, fines and lost business if all were exposed).'],
      ['Estimate the exposure factor', 'A realistic incident would expose about 20% of records: EF = 0.2.'],
      ['Calculate SLE', 'SLE = AV × EF = £2,000,000 × 0.2 = £400,000.'],
      ['Estimate ARO', 'Given current controls and threat activity, such an incident is expected about once every four years: ARO = 0.25.'],
      ['Calculate ALE', 'ALE = SLE × ARO = £400,000 × 0.25 = £100,000 per year.'],
      ['Evaluate a control', 'Isolating retrieved content and requiring approval for data exports costs £30,000 a year and cuts ARO to 0.05. New ALE = £20,000. Value = £100,000 − £20,000 − £30,000 = £50,000 per year, so the control is justified.'] ] },
    { type: 'callout', kind: 'exam', title: 'Formula traps', md: `- **SLE = AV × EF**, not AV × ARO.
- **ALE = SLE × ARO**. An ARO of 0.25 means once every four years; an ARO of 4 means four times a year.
- A safeguard is worth buying when **ALE reduction > its annual cost**. Never spend more on a control than the loss it prevents, unless law or ethics requires it.` },
    { type: 'check', q: { q: 'A model-theft scenario has an asset value of £5 million, an exposure factor of 40% and an expected occurrence of once every ten years. What is the ALE?', o: ['£50,000', '£200,000', '£500,000', '£2,000,000'], a: 1, b: 1,
      why: 'SLE = £5,000,000 × 0.4 = £2,000,000. ARO = 0.1. ALE = £2,000,000 × 0.1 = £200,000 per year.' } }
  ]
};
