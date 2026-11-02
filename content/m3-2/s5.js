/* 3.2 · Section 5: deep dive — differential privacy in practice */
module.exports = {
  title: 'Deep dive: differential privacy in practice', covers: [2],
  blocks: [
    { type: 'video', title: 'Differential privacy, by the numbers', kicker: 'Module 3.2 · Video 5 of 5', scenes: [
      { t: 'title', kicker: 'Module 3.2 · Deep dive', title: 'Differential privacy, by the numbers', sub: 'Mechanisms, budgets, DP-SGD and how to read a claim', icon: 'sliders',
        say: 'Section two introduced differential privacy and its budget, epsilon. This deep dive shows how the guarantee is actually delivered: the mechanisms that add noise, how budgets add up, and how training itself can be made private. | It ends with the questions to ask when a supplier says its product is differentially private.' },
      { t: 'flow', title: 'One private count, step by step',
        nodes: [
          { id: 'q', x: 250, y: 330, icon: 'database', label: 'Query', sub: 'patients with condition X', k: 'data', w: 300 },
          { id: 'sens', x: 800, y: 330, icon: 'ruler', label: 'Sensitivity', sub: 'one person changes it by ≤ 1', k: 'model', w: 300 },
          { id: 'noise', x: 1350, y: 330, icon: 'sliders', label: 'Laplace noise', sub: 'scale 1 ÷ ε = 2', k: 'control', w: 300 },
          { id: 'rel', x: 1350, y: 690, icon: 'chart', label: 'Noisy answer', sub: '121.3; true count hidden', k: 'data', w: 300 },
          { id: 'post', x: 800, y: 690, icon: 'check', label: 'Publish 121', sub: 'rounding is post-processing', k: 'control', w: 300 },
          { id: 'led', x: 250, y: 690, icon: 'list', label: 'Budget ledger', sub: 'records ε 0.5 spent', k: 'human', w: 300 } ],
        edges: [{ from: 'q', to: 'sens', k: 'data' }, { from: 'sens', to: 'noise', k: 'model' }, { from: 'noise', to: 'rel', k: 'control' }, { from: 'rel', to: 'post', k: 'data' }, { from: 'post', to: 'led', k: 'human' }],
        steps: [
          { show: 'q', hi: 'q' },
          { show: 'sens q-sens', flow: 'q-sens', hi: 'sens' },
          { show: 'noise sens-noise', flow: 'sens-noise', hi: 'noise' },
          { show: 'rel noise-rel', flow: 'noise-rel', hi: 'rel' },
          { show: 'post rel-post', flow: 'rel-post', hi: 'post' },
          { show: 'led post-led', flow: 'post-led', hi: 'led', mark: { led: 'warn' } } ],
        say: 'Start with a simple question for a patient dataset: how many patients have condition X? The true answer is one hundred and twenty. | First, find the sensitivity: the most that one person can change the answer. Adding or removing one patient changes a count by at most one. | The Laplace mechanism adds random noise, with a scale of sensitivity divided by epsilon. With an epsilon of a half, the scale is two, a standard deviation of about two point eight. | The noisy answer might be one hundred and twenty-one point three. Even an attacker who knows everyone else in the data can’t tell with confidence whether one particular patient is included. | Rounding the answer, or replacing a negative count with zero, is post-processing. It can’t weaken the guarantee, and it costs nothing. | But every release spends budget. If the same question could be asked again and again, the answers could be averaged to cancel out the noise, so a ledger tracks the total epsilon spent.' },
      { t: 'chart', title: 'Repeated releases add up', kind: 'line', x: ['100', '200', '400', '600', '800', '1,000'], yMin: 0, yMax: 100, ticks: 5, yLabel: 'Total ε spent, by number of releases at ε = 0.1 each', legend: true,
        series: [{ n: 'Simple sum', k: 'threat', v: [10, 20, 40, 60, 80, 100] }, { n: 'Advanced composition', k: 'control', v: [5.9, 8.9, 13.8, 18.1, 22.0, 25.7] }],
        annot: [{ y: 10, text: 'Policy cap: ε = 10', k: 'human', xi: 4 }],
        steps: [{ s: [0] }, { s: [1] }, { a: [0] }],
        say: 'Budgets add up. Under simple, sequential composition, a hundred releases at an epsilon of a tenth each cost ten, and a thousand releases cost a hundred, which is no meaningful protection at all. | Advanced composition gives a tighter bound. For many small releases, the total grows roughly with the square root of their number, at the cost of a tiny extra delta. A thousand releases cost about twenty-six instead of a hundred. | With a policy cap of ten, that means more than twice as many releases. Modern accountants, such as {Rényi~Renyi} differential privacy, are tighter still for the noisy steps of training. Whatever the method, the total must be tracked and capped.' },
      { t: 'flow', title: 'DP-SGD: private training, one step at a time',
        nodes: [
          { id: 'b', x: 250, y: 330, icon: 'dice', label: 'Sample a batch', sub: 'each record with chance q', k: 'data', w: 300 },
          { id: 'g', x: 800, y: 330, icon: 'gpu', label: 'Per-example gradients', sub: 'one for every record', k: 'model', w: 320 },
          { id: 'c', x: 1350, y: 330, icon: 'ruler', label: 'Clip each one', sub: 'length at most C', k: 'control', w: 300 },
          { id: 'n', x: 1350, y: 690, icon: 'sliders', label: 'Add Gaussian noise', sub: 'standard deviation σ × C', k: 'control', w: 320 },
          { id: 'u', x: 800, y: 690, icon: 'cycle', label: 'Average and update', sub: 'then repeat, thousands of times', k: 'model', w: 320 },
          { id: 'a', x: 250, y: 690, icon: 'sliders', label: 'Privacy accountant', sub: 'q, σ, steps and δ give ε', k: 'human', w: 320 } ],
        edges: [{ from: 'b', to: 'g', k: 'data' }, { from: 'g', to: 'c', k: 'model' }, { from: 'c', to: 'n', k: 'control' }, { from: 'n', to: 'u', k: 'control' }, { from: 'u', to: 'a', k: 'human' }],
        steps: [
          { show: 'b', hi: 'b' },
          { show: 'g b-g', flow: 'b-g', hi: 'g' },
          { show: 'c g-c', flow: 'g-c', hi: 'c' },
          { show: 'n c-n', flow: 'c-n', hi: 'n' },
          { show: 'u n-u', flow: 'n-u', hi: 'u' },
          { show: 'a u-a', flow: 'u-a', hi: 'a' } ],
        say: 'DP-SGD makes training itself differentially private. Each step starts with a batch, in which every record is included at random with a small probability, q. | The model computes a gradient for every example separately, rather than one gradient for the whole batch. That costs extra memory and time. | Each gradient is clipped, so its length is at most C. This caps how far any one record can move the model: its sensitivity. | Gaussian noise, with a standard deviation of sigma times C, is added to the sum of the clipped gradients, hiding any one record’s contribution. | The noisy average updates the weights, and the step repeats, often thousands of times. | A privacy accountant turns the sampling rate, the noise level, the number of steps and delta into the final epsilon. Without that calculation, a claim of differential privacy can’t be checked.' },
      { t: 'compare', title: 'Reading a differential privacy claim', labels: ['Epsilon and delta', 'Unit of privacy', 'Where noise is added', 'Accounting'],
        cols: [{ h: 'Ask', icon: 'search', k: 'control' }, { h: 'Red flag', icon: 'alert', k: 'threat' }],
        rows: [
          ['Both values, for the whole release', 'Only “uses differential privacy”'],
          ['A record, a user or a device?', 'Record level when users repeat'],
          ['Who sees raw data before noise?', 'An untrusted party holds raw data'],
          ['Which accountant; tuning counted?', 'Budget restarts for each release'] ],
        say: 'Here is how to read a differential privacy claim. | First, ask for epsilon and delta, for the whole release. A claim with no numbers can’t be assessed. | Second, ask what one unit of privacy is: a record, a user or a device. If people contribute many records, record-level protection is much weaker for them. | Third, find out where the noise is added. In the central model, a curator sees raw data first; in the local model, noise is added on the device. | Fourth, ask which accountant was used, and whether hyperparameter tuning and repeated releases were counted. A budget that quietly restarts for each release isn’t a budget.' },
      { t: 'summary', items: ['Epsilon bounds how much one person can change any outcome', 'Noise scales with sensitivity divided by epsilon', 'Budgets add up across releases; accountants track them', 'DP-SGD clips and adds noise at every training step', 'Ask for ε, δ, the unit of privacy and the accounting'],
        say: 'To recap. | Epsilon bounds how much any one person’s data can change the probability of any outcome. | The noise needed scales with the sensitivity of the query divided by epsilon. | Budgets add up across releases, and accountants track the total. | DP-SGD clips each example’s gradient and adds noise at every training step. | And when anyone claims differential privacy, ask for epsilon, delta, the unit of privacy and the accounting.' } ] },
    { type: 'text', md: `### The definition, precisely
A randomised mechanism is **(ε, δ)-differentially private** if, for any two datasets that differ in one person’s data, and any set of outcomes, the probability of the outcome with the person’s data is at most *e^ε* times the probability without it, plus δ.
- **ε (epsilon)** bounds the ratio. With ε = 1, no outcome becomes more than about 2.7 times more likely because of one person’s data; with ε = 10, the bound is about 22,000 times, a far weaker promise.
- **δ (delta)** is a small probability that the bound fails. It should be much smaller than one divided by the number of people in the data, for example 10⁻⁵ or less for 100,000 people. Pure ε-differential privacy has δ = 0.

### Mechanisms
- **Sensitivity (Δ)** is the most one person can change a query’s answer: 1 for a count, and for a sum, the cap applied to each person’s contribution.
- **Laplace mechanism:** adds noise with scale Δ ÷ ε and gives pure ε-differential privacy. For a count with ε = 0.5, the scale is 2 and the standard deviation about 2.8.
- **Gaussian mechanism:** adds normally distributed noise scaled to the L2 sensitivity. It gives (ε, δ)-differential privacy and composes well, which is why DP-SGD uses it.
- **Randomised response** and other **local** methods add noise on the user’s device, before collection.

### Composition and accounting
| Rule | What it means |
|---|---|
| **Sequential composition** | Releases from the same data add up: ε₁ + ε₂ + … |
| **Parallel composition** | Releases from separate groups of people cost only the largest ε |
| **Advanced composition** | Over many releases, the total grows roughly with the square root of their number, for a little extra δ |
| **Accountants** | Rényi DP, zero-concentrated DP and privacy loss distributions track noisy training tightly |
| **Post-processing** | Anything computed from a private output stays private, at no extra cost |

### DP-SGD in practice
DP-SGD (Abadi et al., 2016) changes every training step: sample a batch (each record with probability *q*), compute **per-example gradients**, **clip** each to a maximum length *C*, add **Gaussian noise** with standard deviation *σ × C* to the sum, then average and update. An **accountant** turns *q*, *σ*, the number of steps and δ into the final ε. **Opacus** (PyTorch), **TensorFlow Privacy** and **JAX Privacy** implement it; **OpenDP** and **Tumult Analytics** cover statistics. Expect lower accuracy, slower training and more memory. Larger datasets, and pre-training on public data before private fine-tuning, reduce the cost. Hyperparameter tuning on the private data also spends budget unless it is accounted for.

### Reading a claim
Ask for **ε and δ** for the whole release; the **unit of privacy** (a record, a user or a device; user-level protection covers everything a person contributed); the **central or local** model; the **accountant**, and whether tuning and repeated releases were counted; and **what is protected**, the model or only some outputs. Deployed values range from below 1 to well above 10: the 2020 US Census redistricting data used a total of ε = 19.61 (17.14 for persons and 2.47 for housing units). A large ε isn’t automatically unacceptable, but it needs justifying alongside other controls. NIST SP 800-226 (2025) offers a framework for evaluating these guarantees.` },
    { type: 'steps', title: 'Reviewing a supplier’s differential privacy claim', items: [
      ['Get the numbers', 'Ask for ε and δ for the whole release, not per query or per training epoch. A claim with no numbers can’t be assessed.'],
      ['Find the unit', 'Check whether one record, one user or one device is protected. Where people contribute many records, record-level protection is weaker for them.'],
      ['Locate the noise', 'Central differential privacy trusts a curator with raw data; local differential privacy adds noise on the device. Know who sees what before the noise.'],
      ['Check the accounting', 'Ask which accountant was used, and whether hyperparameter tuning, retraining and repeated releases were counted.'],
      ['Decide and record', 'Weigh ε against the sensitivity of the data and the other controls in place, then record the decision in the DPIA.'] ] },
    { type: 'match', title: 'Apply the rules', pairs: [
      ['One person can change a count by at most one', 'Sensitivity of 1'],
      ['Two releases from the same data, ε 0.5 each', 'Total ε of 1'],
      ['One release per region, ε 0.5 each, no overlap', 'Total ε of 0.5'],
      ['Rounding a private result to whole numbers', 'No extra budget spent'],
      ['Clip each example’s gradient, then add noise', 'DP-SGD'] ] },
    { type: 'callout', kind: 'exam', title: 'Differential privacy calculations', md: `Remember four rules: **smaller ε means more noise** and stronger privacy; the **noise scale is sensitivity ÷ ε**; budgets **add up** across releases from the same data but not across **separate groups** of people; and **post-processing is free**. A claim of differential privacy means little without ε, δ, the unit of privacy and the accounting.` },
    { type: 'check', q: { q: 'A supplier says its fraud model was “trained with differential privacy, ε = 8”. Before relying on this in a DPIA, what should the privacy team establish FIRST?', o: ['Whether the training data was encrypted while the model was trained', 'The δ value, the unit of privacy and how the budget was accounted', 'Which noise distribution the supplier’s library uses by default', 'Whether the model’s accuracy matches a version trained without noise'], a: 1, b: 2,
      why: 'An ε value alone can’t be interpreted: δ, what one unit of privacy is, and whether the accounting covered every step and release determine what the guarantee means. Encryption, the noise distribution and accuracy don’t change what the claim protects.' } }
  ]
};
