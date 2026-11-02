/* 1.1 · Section 7: deep dive — loss, gradients, logits and mixture of experts */
module.exports = {
  title: 'Deep dive: inside training and modern model design', covers: [3, 4, 5],
  blocks: [
    { type: 'video', title: 'Inside the training loop', kicker: 'Module 1.1 · Video 7 of 7', scenes: [
      { t: 'title', kicker: 'Module 1.1 · Deep dive', title: 'Inside the training loop', sub: 'Loss, gradients, logits and mixture of experts', icon: 'brain',
        say: 'This deep dive opens up the machinery that the rest of the course refers to: how a loss is minimised, how a model turns raw scores into probabilities, and why many of today’s largest models use a mixture of experts. | Each of these mechanisms is also something an attacker can use, so it pays to understand them.' },
      { t: 'chart', title: 'The learning rate decides how training behaves', kind: 'line', x: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], yMin: 0, yMax: 2.6, ticks: 4, yLabel: 'Training loss by step (illustrative)', legend: true,
        series: [
          { n: 'Well chosen', k: 'control', v: [2.3, 1.5, 1.0, 0.7, 0.52, 0.42, 0.35, 0.3, 0.26, 0.24, 0.22] },
          { n: 'Too small', k: 'data', v: [2.3, 2.2, 2.1, 2.0, 1.92, 1.84, 1.76, 1.69, 1.62, 1.56, 1.5] },
          { n: 'Too large', k: 'threat', v: [2.3, 1.4, 2.0, 1.2, 1.9, 1.5, 2.1, 1.7, 2.2, 1.9, 2.4] } ],
        notes: [{ h: 'Loss', d: 'One number measuring how wrong the predictions are, often cross-entropy.', k: 'data' }, { h: 'Gradient descent', d: 'Each weight takes a small step that reduces the loss.', k: 'control' }, { h: 'Learning rate', d: 'Too small is slow; too large overshoots and never settles.', k: 'threat' }],
        steps: [{ s: [0] }, { s: [1] }, { s: [2] }],
        say: 'Training minimises a loss: one number that measures how wrong the model’s predictions are. Classifiers and language models usually use cross-entropy, which is low when the model gives a high probability to the right answer. Backpropagation works out the gradient, the direction in which each weight should move, and gradient descent takes a small step in that direction, over and over. | The size of each step is the learning rate. Set it too small, and training crawls. | Set it too large, and every step overshoots, so the loss bounces around and never settles. Optimisers such as Adam adapt the step size for each weight automatically.' },
      { t: 'chart', title: 'Temperature reshapes the same logits', kind: 'bar', x: ['“approve”', '“review”', '“deny”'], yMin: 0, yMax: 100, ticks: 5, unit: '%', yLabel: 'Probability of each next word, from logits 4, 2 and 1', legend: true,
        series: [{ n: 'Temperature 1', k: 'data', v: [84, 11, 4] }, { n: 'Temperature 0.5', k: 'control', v: [98, 1.8, 0.2] }, { n: 'Temperature 2', k: 'threat', v: [63, 23, 14] }],
        steps: [{ s: [0] }, { s: [1] }, { s: [2] }],
        say: 'A model’s last layer produces logits: raw scores, one for every possible output. The softmax function turns them into probabilities. Here, logits of four, two and one become eighty-four, eleven and four per cent. | Dividing the logits by a temperature before the softmax changes the shape. At a temperature of a half, the top choice takes ninety-eight per cent, so output becomes almost deterministic. | At a temperature of two, the distribution flattens and less likely words are sampled more often. The logits themselves are sensitive: exposing them, or detailed probabilities, helps attackers copy a model or test whether a record was in its training data.' },
      { t: 'flow', title: 'Mixture of experts: only some of the model runs',
        nodes: [
          { id: 'tok', x: 230, y: 510, icon: 'token', label: 'Token', sub: 'one piece of the input', k: 'data', w: 260 },
          { id: 'rt', x: 640, y: 510, icon: 'split', label: 'Router', sub: 'scores every expert', k: 'model', w: 260 },
          { id: 'e1', x: 1080, y: 250, icon: 'brain', label: 'Expert 2', sub: 'selected', k: 'control', w: 250 },
          { id: 'e2', x: 1080, y: 510, icon: 'brain', label: 'Expert 5', sub: 'selected', k: 'control', w: 250 },
          { id: 'e3', x: 1080, y: 770, icon: 'brain', label: 'Six others', sub: 'idle for this token', k: 'neutral', w: 250 },
          { id: 'out', x: 1440, y: 510, icon: 'layers', label: 'Combine', sub: 'weighted sum', k: 'model', w: 210 } ],
        edges: [{ from: 'tok', to: 'rt', k: 'data' }, { from: 'rt', to: 'e1', k: 'control' }, { from: 'rt', to: 'e2', k: 'control' }, { from: 'rt', to: 'e3', k: 'neutral', dash: true }, { from: 'e1', to: 'out', k: 'control' }, { from: 'e2', to: 'out', k: 'control' }],
        steps: [
          { show: 'tok', hi: 'tok' },
          { show: 'rt tok-rt', flow: 'tok-rt', hi: 'rt' },
          { show: 'e1 e2 e3 rt-e1 rt-e2 rt-e3', flow: 'rt-e1 rt-e2', hi: 'e1 e2' },
          { show: 'out e1-out e2-out', flow: 'e1-out e2-out', hi: 'out' },
          { hi: 'e3', mark: { e3: 'warn' } } ],
        say: 'Many of today’s largest models use a mixture of experts. Each token of input reaches a layer that contains several expert sub-networks. | A small router network scores the experts for that token. | Only the top few, here two out of eight, actually run. | Their outputs are combined into a weighted sum, and the token moves on to the next layer. | The result is a model with a huge total number of parameters, but far fewer active for any one token. That cuts compute, not memory: every expert must still be loaded. It also adds new failure modes, such as experts overflowing their capacity when a batch is shared between users.' },
      { t: 'compare', title: 'Dense or mixture of experts?', labels: ['Parameters used per token', 'Memory to serve it', 'Compute per token', 'Security notes'],
        cols: [{ h: 'Dense model', icon: 'brain', k: 'data' }, { h: 'Mixture of experts', icon: 'split', k: 'model' }],
        rows: [
          ['All of them', 'A small active share'],
          ['Holds every parameter', 'Holds every expert, too'],
          ['Grows with model size', 'Grows with active share'],
          ['Familiar behaviour', 'Routing and capacity risks'] ],
        say: 'Here is how the two designs compare. | A dense model uses every parameter for every token. A mixture of experts uses only the experts its router selects, a small active share. | Both need memory for all of their parameters: a mixture of experts still loads every expert. | Compute is where they differ. A dense model’s compute grows with its size; a mixture of experts’ compute grows with its active share, which is why it is cheaper to run. | And security: research has shown that when experts have fixed capacity and users share a batch, one user’s inputs can affect another user’s outputs. Behaviour can also differ between experts, so evaluations need broad and varied test inputs.' },
      { t: 'summary', items: ['Training minimises a loss by gradient descent', 'The learning rate and optimiser shape training', 'Softmax and temperature turn logits into choices', 'Mixture of experts saves compute, not memory'],
        say: 'To recap. | Training minimises a loss, such as cross-entropy, by following gradients down. | The learning rate and the optimiser decide whether training converges, crawls or bounces. | Softmax turns logits into probabilities, and temperature sharpens or flattens them; detailed logits are sensitive. | And a mixture of experts runs only part of the model for each token, saving compute but not memory, and adding routing and capacity risks.' } ] },
    { type: 'text', md: `### Loss, gradients and optimisers
- **Loss function:** a single number measuring prediction error. Classification and language modelling usually use **cross-entropy**, which is low when the model assigns high probability to the correct answer. A language model’s **perplexity** is the exponential of its average cross-entropy per token.
- **Gradient:** the vector of partial derivatives of the loss with respect to every weight. **Backpropagation** computes it efficiently, layer by layer, using the chain rule.
- **Gradient descent:** each update moves the weights a small step against the gradient: *new weight = weight − learning rate × gradient*. **Stochastic gradient descent** uses small random batches of data rather than the whole dataset.
- **Learning rate:** too small and training is slow; too large and the loss oscillates or diverges. Schedules lower it over time.
- **Optimisers:** **Adam** and its variants adapt the step size for each weight using running averages of past gradients. **Regularisation**, such as weight decay, dropout and early stopping, limits overfitting (Section 3).

### From logits to probabilities
The final layer outputs **logits**, one raw score per possible output. **Softmax** converts them into probabilities that sum to 1: each logit is divided by the **temperature**, exponentiated and normalised.

| Logits 4, 2 and 1 | Top choice | Second | Third |
|---|---|---|---|
| Temperature 0.5 | 98% | 1.8% | 0.2% |
| Temperature 1 | 84% | 11% | 4% |
| Temperature 2 | 63% | 23% | 14% |

Lower temperatures make outputs more deterministic; higher ones make them more varied. **Top-k** and **top-p** sampling then restrict which tokens can be chosen (Module 1.2).

### Why the internals matter for security
- **Gradients are dual-use.** The same machinery that computes gradients for the weights can compute gradients for the *input*, which is how white-box adversarial examples are crafted (Module 6.1, deep dive). Fine-tuning gradients can also weaken safety behaviour (Module 3.7).
- **Logits and probabilities leak information.** Detailed scores reveal decision boundaries and confidence, helping **model extraction** and **membership inference**. Returning labels, or rounded or limited log-probabilities, raises attackers’ costs (Module 3.6).
- **Sampling settings affect evidence.** Temperature and sampling explain why outputs vary between runs, so findings are reported as rates (Module 6.5).

### Mixture of experts (MoE)
A mixture-of-experts layer replaces one large feed-forward block with many smaller **experts** and a **router** (gating network) that sends each token to the top few, often two. **Mixtral 8x7B** has about 47 billion parameters in total but uses about 13 billion per token; **DeepSeek-V3** has 671 billion in total with 37 billion active.
- **Resources:** compute scales with the active parameters, but **memory must hold every expert**. Plan capacity accordingly (Module 4.2).
- **Capacity and isolation:** some implementations give each expert a fixed capacity per batch. Research by Hayes and colleagues (2024) showed that, in that setting, an attacker’s inputs batched with a victim’s could change the victim’s outputs, an argument for isolating tenants and testing serving configurations.
- **Evaluation coverage:** routing means different inputs exercise different experts, so safety and security evaluations need broad, varied test sets rather than a handful of prompts.` },
    { type: 'flip', title: 'Training and architecture terms', cards: [
      ['Cross-entropy loss', 'A loss that is low when the model gives high probability to the correct answer; standard for classifiers and language models.'],
      ['Learning rate', 'The size of each gradient descent step: too small is slow, too large overshoots and fails to settle.'],
      ['Adam', 'An optimiser that adapts the step size for each weight using running averages of past gradients.'],
      ['Logits', 'The raw scores a model outputs before softmax turns them into probabilities.'],
      ['Softmax temperature', 'A divisor applied to logits before softmax: low values sharpen the distribution, high values flatten it.'],
      ['Active parameters', 'In a mixture of experts, the parameters actually used for a given token, a fraction of the total.'] ] },
    { type: 'check', q: { q: 'A team plans to self-host a mixture-of-experts model with about 47 billion parameters in total, of which about 13 billion are active for each token. Which statement about its resource needs is MOST accurate?', o: ['It needs memory and compute similar to a dense 13-billion-parameter model', 'It needs memory for all 47 billion parameters, but less compute per token', 'It needs compute for all 47 billion parameters, but memory for only 13 billion', 'It needs no more resources than a 7-billion-parameter dense model'], a: 1, b: 5,
      why: 'Every expert must be loaded, so memory follows the total parameter count, while compute per token follows the active parameters. That is the trade-off a mixture of experts makes.' } }
  ]
};
