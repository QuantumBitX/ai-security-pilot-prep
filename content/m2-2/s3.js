/* 2.2 · Section 3: transparency and explainability */
const T = 'font-family="Archivo, Arial, sans-serif"';
module.exports = {
  title: 'AI transparency and explainability', covers: [3],
  blocks: [
    { type: 'video', title: 'Opening the black box', kicker: 'Module 2.2 · Video 3 of 4', scenes: [
      { t: 'title', kicker: 'Module 2.2 · Responsible AI and ethics', title: 'Opening the black box', sub: 'Transparency, explainability and interpretability, and their limits', icon: 'eye',
        say: 'When an AI system affects someone, they reasonably ask: why? And regulators, auditors and your own staff ask the same question. | This video separates transparency, explainability and interpretability, shows how explanations are produced, and explains when explanations themselves create risk.' },
      { t: 'compare', title: 'Three related ideas', labels: ['Question', 'Example', 'Main audience'],
        cols: [{ h: 'Transparency', icon: 'eye', k: 'data' }, { h: 'Explainability', icon: 'chat', k: 'human' }, { h: 'Interpretability', icon: 'search', k: 'model' }],
        rows: [
          ['Is AI used, and how was it built?', 'Why this output?', 'How does it work inside?'],
          ['A chatbot notice; a model card', 'Top reasons a loan was declined', 'Reading a decision tree’s rules'],
          ['Users, public, regulators', 'Affected people, reviewers', 'Developers, validators, auditors'] ],
        say: 'These three terms are related but different. | Transparency answers: is AI being used, and how was it built and tested? Explainability answers: why did it produce this particular output? Interpretability answers: how does the model work inside? | A chatbot notice or a model card is transparency. The main reasons a loan was declined is an explanation. Reading the rules of a decision tree is interpretability. | And the audiences differ: transparency serves users, the public and regulators; explanations serve affected people and reviewers; interpretability serves developers, validators and auditors.' },
      { t: 'svg', title: 'Why was this loan declined?',
        svg: `<g data-b="0" ${T}><line x1="900" y1="228" x2="900" y2="625" stroke="#94A4C4" stroke-width="3"/><text x="900" y="212" font-size="26" fill="#A6B1C8" text-anchor="middle">Base score 0.50</text>
<text x="120" y="275" font-size="30" fill="#EAEEF6">Missed payments</text><text x="120" y="355" font-size="30" fill="#EAEEF6">Debt-to-income ratio</text><text x="120" y="435" font-size="30" fill="#EAEEF6">Credit history length</text><text x="120" y="515" font-size="30" fill="#EAEEF6">Years at address</text><text x="120" y="595" font-size="30" fill="#EAEEF6">Income</text>
<rect x="1150" y="262" width="30" height="16" rx="8" fill="#FF6363"/><text x="1192" y="278" font-size="25" fill="#A6B1C8">Pushes towards decline</text><rect x="1150" y="312" width="30" height="16" rx="8" fill="#3FD69B"/><text x="1192" y="328" font-size="25" fill="#A6B1C8">Pushes towards approval</text></g>
<g data-b="1" ${T}><rect x="592" y="242" width="308" height="46" rx="8" fill="#FF6363" fill-opacity=".85"/><text x="578" y="275" font-size="28" font-weight="700" fill="#FF6363" text-anchor="end">−0.14</text><rect x="702" y="322" width="198" height="46" rx="8" fill="#FF6363" fill-opacity=".85"/><text x="688" y="355" font-size="28" font-weight="700" fill="#FF6363" text-anchor="end">−0.09</text><rect x="834" y="402" width="66" height="46" rx="8" fill="#FF6363" fill-opacity=".85"/><text x="820" y="435" font-size="28" font-weight="700" fill="#FF6363" text-anchor="end">−0.03</text></g>
<g data-b="2" ${T}><rect x="900" y="482" width="66" height="46" rx="8" fill="#3FD69B" fill-opacity=".85"/><text x="980" y="515" font-size="28" font-weight="700" fill="#3FD69B">+0.03</text><rect x="900" y="562" width="88" height="46" rx="8" fill="#3FD69B" fill-opacity=".85"/><text x="1002" y="595" font-size="28" font-weight="700" fill="#3FD69B">+0.04</text></g>
<g data-b="3" ${T}><rect x="120" y="655" width="1360" height="76" rx="14" fill="#2B1422" stroke="#FF6363" stroke-width="3"/><text x="800" y="704" font-size="32" font-weight="700" fill="#EAEEF6" text-anchor="middle">Final score 0.31 · approval threshold 0.50 · declined</text></g>
<g data-b="4" ${T}><rect x="120" y="752" width="1360" height="76" rx="14" fill="#0B1222" stroke="#3FD69B" stroke-width="3"/><text x="800" y="801" font-size="30" fill="#EAEEF6" text-anchor="middle">Counterfactual: no missed payments and debt-to-income under 35% → approved</text></g>`,
        say: 'Here is a local explanation for one decision. Every applicant starts from the same base score, and each feature pushes the score up or down. | Two missed payments in the last year push hardest towards a decline, followed by a high debt-to-income ratio and a short credit history. | Income and years at the same address push the other way, but only a little. | The final score is point three one, below the approval threshold of point five, so the application is declined. Methods such as SHAP calculate contributions like these. | A counterfactual explanation is often more useful to the applicant: it says what would have to change for a different outcome.' },
      { t: 'bullets', title: 'Explaining generative AI', items: [
          { icon: 'doc', h: 'Cite the sources', d: 'Show the passages an answer was grounded in', k: 'data' },
          { icon: 'book', h: 'Document the system', d: 'Model and system cards: purpose, data, tests, limits', k: 'model' },
          { icon: 'alert', h: 'Don’t trust self-explanations', d: 'A model’s stated reasoning may not reflect how it decided', k: 'threat' },
          { icon: 'search', h: 'Interpretability research', d: 'Methods that inspect internal features are maturing, not yet routine', k: 'neutral' } ],
        say: 'Large generative models are much harder to explain. | The most practical explanation is provenance: show the passages an answer was grounded in, so people can check them. | Document the system with model and system cards, covering purpose, training data, evaluations and known limitations. | Treat a model’s own explanation of its reasoning with caution. Research shows that stated reasoning doesn’t always reflect how the model actually reached its answer. | And interpretability research, which inspects the internal features of a model, is advancing quickly, but it is not yet a routine assurance tool.' },
      { t: 'bullets', title: 'Rights to transparency and explanation', items: [
          { icon: 'fingerprint', h: 'GDPR Articles 13 to 15', d: 'Meaningful information about the logic of automated decisions', k: 'data' },
          { icon: 'hitl', h: 'GDPR Article 22', d: 'Human intervention and the right to contest', k: 'human' },
          { icon: 'book', h: 'AI Act Article 13', d: 'Providers must give deployers clear instructions and limits', k: 'model' },
          { icon: 'chat', h: 'AI Act Articles 50 and 86', d: 'Disclose AI interaction; explain high-risk decisions', k: 'control' } ],
        say: 'Explanations are increasingly a legal duty. | Under the GDPR, people must receive meaningful information about the logic involved in automated decisions about them. | Article twenty-two adds the right to human intervention and to contest solely automated decisions with significant effects. | Under the AI Act, providers of high-risk systems must give deployers clear instructions, including capabilities, limitations and how to interpret outputs. | And people must be told when they interact with AI, while those affected by decisions based on certain high-risk systems gain a right to a clear and meaningful explanation.' },
      { t: 'bullets', title: 'When explanations create risk', items: [
          { icon: 'copy', h: 'Model extraction and evasion', d: 'Detailed explanations help attackers copy or game the model', k: 'threat' },
          { icon: 'lock', h: 'Privacy leakage', d: 'Explanations can reveal information about training data', k: 'data' },
          { icon: 'mask', h: 'Unfaithful explanations', d: 'Plausible reasons that don’t match how the model decided', k: 'human' },
          { icon: 'users', h: 'Wrong level of detail', d: 'Tailor explanations to each audience', k: 'neutral' } ],
        say: 'Explanations also carry risk. | Detailed, per-feature explanations can help attackers reconstruct a model, or learn exactly how to evade it. | Explanations can leak information about the training data, which is a privacy risk. | Post-hoc explanations can be plausible but unfaithful, describing reasons that don’t match how the model really decided. | And too much detail confuses people. Give affected individuals clear reasons and recourse, give reviewers more depth, and reserve full technical detail for validators and auditors.' },
      { t: 'summary', items: ['Transparency: that AI is used; explainability: why; interpretability: how', 'Local explanations and counterfactuals help affected people', 'Generative AI: cite sources; distrust self-explanations', 'Explanations are rights, and can also leak and mislead'],
        say: 'To recap. | Transparency is about whether and how AI is used, explainability is about why an output occurred, and interpretability is about how the model works inside. | Local explanations and counterfactuals help affected people understand and challenge decisions. | For generative AI, cite sources and don’t rely on a model’s own account of its reasoning. | And explanations are increasingly a legal right, but they can also leak information and mislead, so tailor them carefully.' } ] },
    { type: 'text', md: `### Definitions
- **Transparency** is openness about an AI system: that it exists and is being used, its purpose, how it was developed, what data it uses, how it was tested, and its limitations. It operates at the level of the system and organisation.
- **Explainability** is the ability to give a human-understandable reason for a particular output or decision (a *local* explanation) or for the model’s general behaviour (a *global* explanation).
- **Interpretability** is the degree to which a human can understand the model’s internal mechanics: how inputs are transformed into outputs.

A linear model or a short decision tree is **intrinsically interpretable**. A deep neural network or large language model is not, so we rely on **post-hoc** methods that approximate or probe its behaviour.

### Common explanation methods
| Method | Type | What it gives |
|---|---|---|
| Intrinsically interpretable models (linear models, decision trees, rule lists, generalised additive models) | Global and local | The model *is* the explanation |
| Permutation feature importance | Global | Which features matter most overall |
| **SHAP** (Shapley additive explanations) | Local and global | Each feature’s contribution to a specific prediction, based on game theory |
| **LIME** (local interpretable model-agnostic explanations) | Local | A simple surrogate model that mimics the complex model near one input |
| **Counterfactual explanations** | Local | The smallest change to the inputs that would change the outcome |
| Saliency and attention maps | Local | Which pixels or tokens influenced an output (use with caution) |
| Model cards, system cards, datasheets for datasets | Transparency | Purpose, data, evaluation results, limitations and intended use |

**Counterfactuals** are often the most useful for affected people because they are actionable (“if your outstanding debt were £2,000 lower, you would have been approved”) and reveal little about the model’s internals.

The supposed **accuracy–interpretability trade-off** is real for some tasks, such as image and language understanding, but for many tabular decision problems, well-designed interpretable models perform almost as well as black boxes. For high-stakes decisions, consider whether an interpretable model is good enough before choosing an opaque one.

### Explaining generative AI
- **Grounding and citations** let people verify answers against sources.
- **System and model cards** document intended use, evaluations, safety testing and known limitations.
- **Self-explanations are unreliable.** A model’s chain-of-thought or explanation of its own reasoning is generated text and may not faithfully reflect the computation that produced the answer.
- **Mechanistic interpretability**, which identifies internal features and circuits, is an active research area with promising results, but it is not yet a standard assurance technique.

### Legal duties
- **GDPR** Articles 13–15 require meaningful information about the logic involved in automated decision-making, and its significance and envisaged consequences. Article 22 gives rights to human intervention, to express a view and to contest solely automated decisions with significant effects.
- **EU AI Act** Article 13 requires high-risk systems to be transparent enough for deployers to interpret outputs and use them appropriately, with instructions covering capabilities, limitations and accuracy. Article 50 requires disclosure of AI interaction and labelling of synthetic content. Article 86 gives people affected by decisions based on high-risk systems (listed in Annex III) the right to clear and meaningful explanations of the AI’s role and the main elements of the decision.

### Security and privacy considerations
Explanations are an information channel. Rich, per-query feature attributions can help adversaries **extract** a model or craft inputs that **evade** it, and can leak details of training data. Balance this by tailoring depth to the audience, rate-limiting explanation interfaces, and providing counterfactual or reason-code explanations to the public while reserving detailed attributions for authorised reviewers.`, },
    { type: 'flip', title: 'Explainability vocabulary', cards: [
      ['Local explanation', 'Why the model produced one particular output.'],
      ['Global explanation', 'What drives the model’s behaviour overall.'],
      ['SHAP', 'A method that assigns each feature a contribution to a prediction, based on Shapley values from game theory.'],
      ['LIME', 'A method that fits a simple surrogate model around one input to approximate the complex model locally.'],
      ['Counterfactual explanation', 'The smallest change to the inputs that would have changed the outcome.'],
      ['Model card', 'A short document describing a model’s purpose, data, performance across groups, and limitations.'] ] },
    { type: 'scenario', title: 'The detailed explanation API', md: `A bank exposes a public API that returns a credit score plus SHAP contributions for every feature, for unlimited queries. A security review notices automated clients submitting thousands of slightly varied applications.`,
      q: { q: 'What is the MOST appropriate response?', o: ['Remove all explanations from the API, since they are optional and create a data leakage risk', 'Give applicants reason codes and counterfactuals, limit detailed attributions to reviewers, and monitor the API', 'Return more features in each explanation, so applicants receive the most complete account possible', 'Keep the current API unchanged, because explanations are a legal requirement that can’t be restricted'], a: 1, b: 3,
        why: 'Unlimited, detailed attributions enable model extraction and evasion. Tailoring explanations by audience, while still meeting legal duties to applicants, and adding rate limits and monitoring balances transparency with security.' } },
    { type: 'check', q: { q: 'An applicant asks why they were refused and what they could do differently. Which type of explanation BEST serves them?', o: ['A copy of the model’s full source code and its configuration files', 'A counterfactual explanation describing what changes would lead to approval', 'A global feature-importance chart showing what matters across all customers', 'The model’s training loss curve and its overall accuracy on the test set'], a: 1, b: 3,
      why: 'Counterfactuals are local, understandable and actionable, and reveal relatively little about the model’s internals. The other options are either irrelevant to the individual or expose unnecessary detail.' } }
  ]
};
