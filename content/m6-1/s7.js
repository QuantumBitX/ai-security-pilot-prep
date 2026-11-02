/* 6.1 · Section 7: deep dive — adversarial examples and privacy attacks in depth */
module.exports = {
  title: 'Deep dive: adversarial examples and privacy attacks', covers: [3],
  blocks: [
    { type: 'video', title: 'How adversarial attacks really work', kicker: 'Module 6.1 · Video 7 of 7', scenes: [
      { t: 'title', kicker: 'Module 6.1 · Deep dive', title: 'How adversarial attacks really work', sub: 'Perturbation budgets, gradient attacks and privacy attacks', icon: 'target',
        say: 'Section three named the families of adversarial machine learning attacks. This deep dive shows how the main ones actually work: how attackers define a small change, how they use gradients to find one, and how privacy attacks decide whether a person’s data was used. | Knowing the mechanics is what lets you judge whether a robustness claim, or a test report, can be trusted.' },
      { t: 'compare', title: 'How small is “small”? Perturbation budgets', labels: ['What it limits', 'Typical budget', 'Classic attacks'],
        cols: [{ h: 'L∞ norm', icon: 'ruler', k: 'threat' }, { h: 'L2 norm', icon: 'ruler', k: 'model' }, { h: 'L0 norm', icon: 'ruler', k: 'data' }],
        rows: [
          ['Largest change to any value', 'Overall size of the change', 'How many values change'],
          ['Each pixel by 8/255', 'A small total distance', 'A handful of pixels'],
          ['FGSM and PGD', 'Carlini–Wagner', 'Sparse attacks'] ],
        say: 'Attacks are defined against a perturbation budget, epsilon, measured with a norm. The three common norms limit different things. | The L-infinity norm limits the largest change to any single value. The L-two norm limits the overall size of the change. The L-zero norm limits how many values change at all. | Typical budgets: for images, often eight two-hundred-and-fifty-fifths per pixel under L-infinity; a small total distance under L-two; or just a handful of pixels under L-zero. | Each norm has its classic attacks: FGSM and PGD for L-infinity, Carlini and Wagner’s attack for L-two, and sparse attacks for L-zero. Physical attacks, such as stickers on a sign, are better described as patches: large changes confined to a small area.' },
      { t: 'flow', title: 'FGSM and PGD: following the gradient',
        nodes: [
          { id: 'x', x: 230, y: 510, icon: 'image', label: 'Clean input', sub: 'classified correctly', k: 'data', w: 260 },
          { id: 'g', x: 640, y: 510, icon: 'chart', label: 'Input gradient', sub: 'which change hurts most', k: 'model', w: 280 },
          { id: 'f', x: 1060, y: 300, icon: 'bolt', label: 'FGSM: one step', sub: 'ε along the gradient sign', k: 'threat', w: 300 },
          { id: 'p', x: 1060, y: 720, icon: 'cycle', label: 'PGD: many steps', sub: 'projected into the budget', k: 'threat', w: 300 },
          { id: 'a', x: 1370, y: 510, icon: 'target', label: 'Adversarial example', sub: 'looks the same', k: 'threat', w: 250 } ],
        edges: [{ from: 'x', to: 'g', k: 'data' }, { from: 'g', to: 'f', k: 'threat' }, { from: 'g', to: 'p', k: 'threat' }, { from: 'f', to: 'a', k: 'threat' }, { from: 'p', to: 'a', k: 'threat' }],
        steps: [
          { show: 'x', hi: 'x' },
          { show: 'g x-g', flow: 'x-g', hi: 'g' },
          { show: 'f g-f', flow: 'g-f', hi: 'f' },
          { show: 'p g-p', flow: 'g-p', hi: 'p' },
          { show: 'a f-a p-a', flow: 'f-a p-a', hi: 'a' } ],
        say: 'A white-box evasion attack starts with an input the model gets right, such as a photo of a stop sign. | The attacker computes the gradient of the model’s loss with respect to the input, not the weights. It shows which tiny change to each pixel would increase the error most. | The fast gradient sign method, FGSM, takes a single step: it moves every pixel by epsilon in the direction of the gradient’s sign. It is quick, but often weak. | Projected gradient descent, PGD, takes many smaller steps from a random starting point, and projects back inside the budget after each one. It is the standard strong attack for testing defences. | The result looks unchanged to a person, but the model misclassifies it. Optimisation attacks, such as Carlini and Wagner’s, search for the smallest change that works.' },
      { t: 'chart', title: 'Accuracy falls as the budget grows', kind: 'line', x: ['0', '2/255', '4/255', '8/255', '16/255'], yMin: 0, yMax: 100, ticks: 5, unit: '%', yLabel: 'Accuracy under a strong attack, by L∞ budget (illustrative)', legend: true,
        series: [{ n: 'Undefended model', k: 'threat', v: [94, 22, 4, 0, 0] }, { n: 'Adversarially trained', k: 'control', v: [87, 80, 71, 47, 18] }],
        annot: [{ x: 3, text: 'Common benchmark budget', k: 'human' }],
        steps: [{ s: [0] }, { s: [1] }, { a: [0] }],
        say: 'Robustness is reported as a curve, not a single number. An undefended image classifier may score ninety-four per cent on clean images, yet fall close to zero once a strong attack has even a small budget. | A model trained with adversarial examples starts lower on clean images, but holds up far better as the budget grows, though it still fails eventually. | Many benchmarks report accuracy at one budget, often eight two-hundred-and-fifty-fifths. Be wary of results that look too good: if accuracy never reaches zero as the budget grows, or one-step attacks beat many-step ones, the defence may simply be hiding its gradients.' },
      { t: 'flow', title: 'Membership inference with shadow models',
        nodes: [
          { id: 'pub', x: 250, y: 330, icon: 'database', label: 'Similar data', sub: 'same kind as the target’s', k: 'data', w: 300 },
          { id: 'sh', x: 800, y: 330, icon: 'copy', label: 'Shadow models', sub: 'members known exactly', k: 'model', w: 300 },
          { id: 'att', x: 1350, y: 330, icon: 'search', label: 'Attack model', sub: 'learns member signals', k: 'threat', w: 300 },
          { id: 'tgt', x: 800, y: 690, icon: 'model', label: 'Target model', sub: 'queried with the record', k: 'model', w: 300 },
          { id: 'dec', x: 1350, y: 690, icon: 'alert', label: 'Member or not?', sub: 'at a low false-positive rate', k: 'threat', w: 320 } ],
        edges: [{ from: 'pub', to: 'sh', k: 'data' }, { from: 'sh', to: 'att', k: 'model' }, { from: 'tgt', to: 'att', k: 'model' }, { from: 'att', to: 'dec', k: 'threat' }],
        steps: [
          { show: 'pub', hi: 'pub' },
          { show: 'sh pub-sh', flow: 'pub-sh', hi: 'sh' },
          { show: 'att sh-att', flow: 'sh-att', hi: 'att' },
          { show: 'tgt tgt-att', flow: 'tgt-att', hi: 'tgt' },
          { show: 'dec att-dec', flow: 'att-dec', hi: 'dec', mark: { dec: 'warn' } } ],
        say: 'Membership inference asks whether a particular record was used to train a model. The classic attack starts with data similar to the target’s training data. | The attacker trains shadow models on parts of it, so for every shadow model they know exactly which records were members. | By comparing the shadow models’ outputs on members and non-members, they learn the tell-tale signs, such as unusually high confidence on training examples. | Then they query the target model with the record in question, and pass its output to the attack. | The verdict is member or not. Strong modern attacks, such as the likelihood ratio attack, LiRA, are judged by how many members they find while keeping false positives very rare, because a confident hit on one person is the real privacy harm.' },
      { t: 'summary', items: ['Norm budgets define how small “small” is', 'FGSM takes one gradient step; PGD takes many', 'Test with strong, adaptive attacks, never weak ones', 'Judge membership inference at low false-positive rates'],
        say: 'To recap. | Perturbation budgets, measured with norms such as L-infinity and L-two, define how small a change has to be. | FGSM takes one step along the input gradient; PGD takes many projected steps, and is the stronger test. | Robustness claims need strong, adaptive attacks and a full accuracy curve, never a single weak attack. | And membership inference is judged by the members it finds at a very low false-positive rate.' } ] },
    { type: 'text', md: `### Threat models for evasion
An evasion attack searches for an input close to a real one that the model gets wrong. “Close” is set by a **perturbation budget** (ε) under a norm: **L∞** limits the largest change to any single value (for images, often 8/255 per pixel), **L2** limits the overall size of the change, and **L0** limits how many values change. Physical attacks, such as stickers on a road sign, are better described as **patches**: large changes confined to a small area, designed to survive printing, distance and viewing angle. **Targeted** attacks aim for a chosen output; **untargeted** attacks for any wrong one.

### White-box attacks
- **FGSM** (Goodfellow et al., 2015): one step of size ε in the direction of the sign of the input gradient. Fast but weak; mainly used for quick checks and cheap adversarial training.
- **PGD** (Madry et al., 2018): many small steps from a random start, each projected back into the budget. The standard strong first-order attack, and the basis of adversarial training (Module 6.6).
- **Carlini–Wagner** (2017): an optimisation that searches for a minimal perturbation. It defeated defensive distillation, a defence published the year before.
- **AutoAttack** (Croce and Hein, 2020): an ensemble of parameter-free attacks, used as a reliable benchmark by leaderboards such as RobustBench.

### Black-box routes
| Route | What the attacker needs | How it works |
|---|---|---|
| **Transfer** | A similar substitute model | Craft examples on the substitute; many also fool the target |
| **Score-based** | Confidence scores | Estimate gradients from how the scores change |
| **Decision-based** | Labels only | Walk along the decision boundary, as HopSkipJump does |

Returning labels instead of scores, rate limiting and query monitoring raise the cost of score-based and decision-based attacks (Module 3.6). Transfer attacks need no queries to the target at all, which is why openly available models make useful substitutes. **Universal perturbations** fool a model on most inputs at once, and the same optimisation ideas underpin adversarial suffixes against language models (Module 6.4).

### Evaluating robustness honestly
Athalye, Carlini and Wagner (2018) found that 7 of 9 defences accepted at ICLR 2018 relied on **obfuscated gradients**, which defeat weak attacks but not adaptive ones; they circumvented 6 completely and 1 partially. Warning signs include one-step attacks beating iterative ones, black-box attacks beating white-box ones, and accuracy that never reaches zero as the budget grows. Ask for **adaptive attacks** designed against the specific defence, strong iterative attacks such as PGD and AutoAttack, and the full curve of accuracy against budget.

### Privacy attacks in more depth
- **Membership inference:** Shokri et al. (2017) trained **shadow models** to learn what members look like. The **likelihood ratio attack (LiRA)** (Carlini et al., 2022) compares a record’s loss under many models trained with and without it, and is about ten times more powerful at low false-positive rates. Report the **true-positive rate at a low false-positive rate**, such as 0.1%, rather than average accuracy.
- **Training data extraction:** generate many outputs, then rank them by signs of memorisation. Nasr et al. (2023) showed that an aligned production chatbot could be pushed to diverge from its normal behaviour and emit memorised training data about 150 times more often.
- **Model inversion and attribute inference:** use outputs to reconstruct representative inputs, or to infer sensitive attributes of a known person.
- **Model stealing:** Carlini et al. (2024) recovered the final projection layer of two production language models through their public API for under $20, using log-probabilities and logit bias. OpenAI and Google then changed their APIs to mitigate the attack.` },
    { type: 'match', title: 'Name the technique', pairs: [
      ['One step of size ε along the sign of the input gradient', 'FGSM'],
      ['Many small steps, each projected back into the budget', 'PGD'],
      ['Examples crafted on a substitute model fool the target', 'Transfer attack'],
      ['Only the predicted label is returned, yet the attack works', 'Decision-based attack'],
      ['A record’s loss is compared under models trained with and without it', 'LiRA'] ] },
    { type: 'flip', title: 'Robustness evaluation terms', cards: [
      ['Perturbation budget (ε)', 'The largest change an attacker is allowed, measured with a norm such as L∞ or L2.'],
      ['Obfuscated gradients', 'A defence that breaks gradient-based attacks without making the model robust; adaptive attacks get around it.'],
      ['Adaptive attack', 'An attack designed with full knowledge of the specific defence, the standard for credible robustness claims.'],
      ['AutoAttack', 'An ensemble of parameter-free attacks used as a reliable benchmark for adversarial robustness.'],
      ['Shadow model', 'A model the attacker trains on similar data, with known members, to learn what membership looks like.'],
      ['TPR at low FPR', 'The share of true members found while false positives stay very rare, the preferred measure for membership inference.'] ] },
    { type: 'check', q: { q: 'A vendor reports that its image classifier keeps 85% accuracy under attack. The evaluation used FGSM only, and accuracy barely changed as the budget grew. What is the BEST response?', o: ['Accept the result, as FGSM is a recognised and widely published attack', 'Ask for adaptive, iterative attacks, as the results suggest gradient masking', 'Ask for the test to be repeated with a smaller perturbation budget', 'Reject the model, as robust accuracy must always exceed 90% under attack'], a: 1, b: 3,
      why: 'A single weak attack, and accuracy that doesn’t fall as the budget grows, are classic signs of obfuscated gradients. Credible claims need strong iterative and adaptive attacks across a range of budgets. A smaller budget would make the test weaker, and there is no universal 90% rule.' } }
  ]
};
