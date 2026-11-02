/* 2.2 · Section 4: systemic impacts, sustainability and societal trade-offs */
module.exports = {
  title: 'Systemic impacts, sustainability and societal trade-offs', covers: [4],
  blocks: [
    { type: 'video', title: 'Beyond the single system', kicker: 'Module 2.2 · Video 4 of 4', scenes: [
      { t: 'title', kicker: 'Module 2.2 · Responsible AI and ethics', title: 'Beyond the single system', sub: 'Systemic impacts, environmental costs and the trade-offs behind every deployment', icon: 'globe',
        say: 'Most risk assessments look at one system at a time. But AI also changes labour markets, information ecosystems, energy demand and who holds power. | This video covers those systemic impacts, the environmental footprint of AI, and how to weigh societal trade-offs responsibly.' },
      { t: 'bullets', title: 'Systemic impacts', layout: 'grid', cols: 2, items: [
          { icon: 'users', h: 'Work and skills', d: 'Tasks automated; roles changed; skills eroded', k: 'human' },
          { icon: 'megaphone', h: 'Information integrity', d: 'Cheap, convincing misinformation at scale', k: 'threat' },
          { icon: 'building', h: 'Concentration', d: 'Dependence on a few model and cloud providers', k: 'neutral' },
          { icon: 'copy', h: 'Monoculture', d: 'Many organisations sharing one model share its failures', k: 'model' },
          { icon: 'leaf', h: 'Environment', d: 'Energy, water and hardware at growing scale', k: 'control' },
          { icon: 'scale', h: 'Rights and trust', d: 'Surveillance, exclusion and erosion of trust', k: 'data' } ],
        say: 'Systemic impacts emerge when AI is used widely, not just in one place. | Work and skills: tasks are automated, roles change, and skills people no longer practise can fade. | Information integrity: generative AI makes convincing misinformation cheap to produce at scale. | Concentration: much of the economy now depends on a handful of model and cloud providers. | Monoculture: when many organisations build on the same model, they share its vulnerabilities and failures, so one flaw can hit thousands of systems at once. | Environment: AI’s energy, water and hardware demands are growing quickly. | And rights and trust: surveillance, exclusion of people the systems serve poorly, and an erosion of trust in what we see and hear.' },
      { t: 'stat', kicker: 'The energy question', num: { v: 945, suf: ' TWh', label: 'projected data centre electricity use in 2030 (IEA)' },
        def: 'Data centres used about 415 TWh in 2024, around 1.5% of global electricity. AI is the main driver of growth.',
        ex: 'Inference often outweighs training over a model’s life, because it runs billions of times.',
        say: 'Here is the scale of the environmental question. The International Energy Agency projects that data centres will use around nine hundred and forty-five terawatt hours of electricity by twenty thirty. | That is more than double the roughly four hundred and fifteen terawatt hours they used in twenty twenty-four, about one and a half per cent of global electricity, with AI the main driver of growth. | And while training a frontier model is energy-intensive, inference, the everyday use of models, often outweighs it over a model’s lifetime, because it runs billions of times.' },
      { t: 'bullets', title: 'Reducing AI’s footprint', items: [
          { icon: 'ruler', h: 'Right-size the model', d: 'Use the smallest model that meets the requirement', k: 'control' },
          { icon: 'bolt', h: 'Make inference efficient', d: 'Quantisation, distillation, caching and batching', k: 'model' },
          { icon: 'clock', h: 'Choose where and when', d: 'Low-carbon regions and times for flexible workloads', k: 'data' },
          { icon: 'chart', h: 'Measure and report', d: 'Energy, carbon and water per system and per use', k: 'human' } ],
        say: 'Sustainability is now part of responsible AI, and many measures also cut cost. | Right-size the model: use the smallest model that meets the requirement, rather than the largest available. | Make inference efficient with quantisation, distillation into smaller models, caching repeated answers, and batching requests. | Choose where and when: run flexible workloads, such as training and batch jobs, in regions and at times with low-carbon electricity. | And measure and report energy, carbon and water use per system, so decisions are based on data. Providers of general-purpose models under the EU AI Act must document known or estimated energy consumption.' },
      { t: 'bullets', title: 'Trade-offs you will have to make', layout: 'grid', cols: 2, items: [
          { icon: 'target', h: 'Accuracy vs explainability', d: 'The most accurate model may be the hardest to explain', k: 'model' },
          { icon: 'lock', h: 'Privacy vs utility', d: 'Stronger privacy protection can reduce accuracy', k: 'data' },
          { icon: 'leaf', h: 'Capability vs footprint', d: 'Bigger models cost more energy and money', k: 'control' },
          { icon: 'clock', h: 'Speed vs assurance', d: 'Faster launch means less testing and oversight', k: 'threat' } ],
        say: 'Every deployment involves trade-offs. | Accuracy and explainability: the most accurate model may be the hardest to explain. | Privacy and utility: techniques that protect privacy, such as adding noise, can reduce accuracy. | Capability and footprint: larger models cost more energy, water and money. | And speed and assurance: launching faster means less time for testing, impact assessment and oversight.' },
      { t: 'cycle', title: 'Weighing societal trade-offs', center: 'Decide', centerSub: 'with documented reasons', intro: 'A structured, repeatable way to weigh benefits and harms.',
        stages: [
          { icon: 'users', label: 'Identify stakeholders', d: 'Including people affected but not using the system.' },
          { icon: 'scale', label: 'Weigh benefits and harms', d: 'And who receives each: are they shared fairly?' },
          { icon: 'branch', label: 'Consider alternatives', d: 'Including a non-AI option, or not proceeding.' },
          { icon: 'eye', label: 'Monitor and revisit', d: 'Impacts change as use grows.' } ],
        say: 'A structured approach helps. | First, identify stakeholders, including people affected by the system who never use it, such as job applicants or the public. | Then weigh the benefits against the harms, and ask who receives each. A system that benefits the organisation while shifting the risk onto vulnerable people needs strong justification. | Consider alternatives, including a non-AI solution, or not proceeding at all. | Make the decision at the right level of authority, record the reasons, and then monitor and revisit it as use grows and impacts change.' },
      { t: 'summary', items: ['Systemic impacts: work, information, concentration, monoculture', 'Data centre electricity may double by 2030', 'Right-size models; make inference efficient; measure', 'Weigh who benefits and who bears the risk; document why'],
        say: 'To recap. | AI has systemic impacts on work, information integrity, market concentration and the shared failure modes of monoculture. | Its environmental footprint is growing fast, with data centre electricity use projected to more than double by twenty thirty. | Right-size models, make inference efficient, and measure energy and carbon. | And weigh not just total benefits and harms, but who benefits and who bears the risk, and document why you decided.' } ] },
    { type: 'text', md: `### Systemic impacts
A **systemic impact** arises from the widespread or interconnected use of AI, rather than from one system. Individual risk assessments often miss them, so governance needs to look up from the single use case.

- **Labour and skills.** AI automates tasks more often than entire jobs, but changes can be rapid and uneven. Deskilling is a subtle risk: if analysts rely on AI triage for years, their ability to investigate without it may fade, which matters when the AI fails. Responsible deployment includes reskilling, consultation with workers and, in many jurisdictions, legal duties to inform or consult employee representatives.
- **Information integrity.** Generative AI lowers the cost of persuasive misinformation, impersonation and fraud. Deepfake voice scams against businesses and synthetic disinformation around elections are documented risks. Content provenance and labelling (Module 2.6) are part of the response.
- **Concentration and dependency.** A small number of companies supply frontier models, cloud capacity and accelerators. This concentrates economic power and creates **single points of failure**: a provider outage, price change, policy change or compromise can affect thousands of organisations at once.
- **Monoculture and correlated failure.** When many organisations build on the same foundation model, a jailbreak technique, vulnerability or bias in that model is shared by all of them. From a security perspective, this is a supply-chain concentration risk (Module 2.5).
- **Homogenisation.** Widespread use of the same models can narrow the diversity of content and decisions, a risk named in the NIST Generative AI Profile.
- **Rights and inclusion.** Surveillance, profiling and systems that work poorly for some groups can exclude people from services or chill free expression.

The EU AI Act addresses one category explicitly: **general-purpose AI models with systemic risk**, whose providers must assess and mitigate risks at Union level, perform adversarial testing, track and report serious incidents, and ensure cybersecurity.

### Sustainability
AI’s environmental footprint has three main parts:

| Component | Driver | Mitigations |
|---|---|---|
| **Energy and carbon** | Training and, increasingly, inference at scale; carbon intensity of the grid | Smaller and efficient models; quantisation and distillation; caching; carbon-aware scheduling; renewable energy procurement |
| **Water** | Cooling data centres, directly and through power generation | Efficient cooling designs; siting decisions; measuring water usage effectiveness (WUE) |
| **Hardware** | Manufacturing accelerators and servers; short refresh cycles; e-waste | Longer hardware life; utilisation monitoring; responsible disposal and recycling |

The International Energy Agency estimated that data centres used about **415 TWh in 2024 (around 1.5% of global electricity)** and projected this would more than double to around **945 TWh by 2030**, driven largely by AI. Useful efficiency metrics include **power usage effectiveness (PUE)**, energy per inference, and carbon per thousand requests. Sustainability reporting regimes, such as the EU Corporate Sustainability Reporting Directive, increasingly require organisations to disclose material environmental impacts, and providers of general-purpose AI models must document known or estimated energy consumption.

### Societal trade-offs
Responsible AI does not mean zero risk; it means **deliberate, accountable choices**. A sound trade-off analysis:
1. Identifies all stakeholders, including those affected but not consulted by default.
2. Assesses benefits and harms, and their **distribution**: who gains, who bears the risk, and whether vulnerable groups carry a disproportionate share.
3. Considers alternatives, including non-AI approaches and the option not to proceed (“just because we can doesn’t mean we should”).
4. Is decided at the appropriate level, with the rationale documented in the impact assessment.
5. Is monitored and revisited, because impacts change with scale.`, },
    { type: 'tabs', title: 'Trade-off case studies', items: [
      ['Call-centre automation', '**Benefit:** faster service, lower cost. **Harm:** job losses; worse service for people who struggle with automated channels. **Balanced decision:** automate routine requests, keep an easy route to a human, retrain staff for complex cases, and monitor complaint rates by customer group.'],
      ['Public-sector fraud detection', '**Benefit:** reduced fraud. **Harm:** false accusations against vulnerable claimants, which have caused serious public scandals in several countries. **Balanced decision:** human review before any adverse action, published criteria, fairness testing, and accessible appeals.'],
      ['Frontier model for internal search', '**Benefit:** best answer quality. **Harm:** high cost and energy use for a task a smaller model handles well. **Balanced decision:** evaluate smaller models first; route only complex queries to the large model.'],
      ['Facial recognition for building access', '**Benefit:** convenience. **Harm:** biometric privacy risks, accuracy differences across groups, and function creep. **Balanced decision:** offer a non-biometric alternative, test accuracy across groups, conduct a DPIA, and strictly limit purpose and retention.'] ] },
    { type: 'callout', kind: 'exam', title: 'Systemic risk from a security angle', md: `If many business units, or many organisations, rely on the **same model or provider**, a single vulnerability, outage or policy change becomes a **correlated, systemic failure**. Mitigations include provider diversity for critical services, tested fallbacks, contractual protections, and tracking model dependencies in the inventory and AIBOM.` },
    { type: 'check', q: { q: 'Several critical business processes all depend on one externally hosted foundation model. Which risk does this MOST directly create?', o: ['Model collapse, as the shared model is retrained on its own outputs', 'Concentration risk: one provider outage, change or flaw could disrupt them all at once', 'Data drift, because each business process sends the shared model very different kinds of data', 'Aleatoric uncertainty, because the provider’s model is non-deterministic'], a: 1, b: 4,
      why: 'Heavy dependence on one model or provider creates a single point of failure and correlated risk. Fallbacks, provider diversity and contractual protections reduce it.' } }
  ]
};
