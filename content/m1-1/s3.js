/* 1.1 · Section 3: deep learning and evolutionary computation */
module.exports = {
  title: 'Deep learning and evolutionary computation', covers: [3],
  blocks: [
    { type: 'video', title: 'How deep learning learns', kicker: 'Module 1.1 · Video 3 of 7', scenes: [
      { t: 'title', kicker: 'Module 1.1 · AI concepts', title: 'How deep learning learns', sub: 'Forward passes, loss, backpropagation, and a different kind of search', icon: 'brain',
        say: 'Deep learning powers almost every AI system you will be asked to secure. | This video opens up the training loop, then looks at evolutionary computation, which searches for solutions in a completely different way.' },
      { t: 'compare', title: 'What “deep” adds', cols: [{ h: 'Classical machine learning', icon: 'sliders', k: 'neutral' }, { h: 'Deep learning', icon: 'layers', k: 'model' }],
        labels: ['Features', 'Data and compute', 'Explainability'], rows: [
          ['People engineer the features', 'The network learns its own features'],
          ['Works well on smaller, structured data', 'Needs large datasets and accelerators'],
          ['Usually easier to explain', 'Much harder to interpret'] ],
        say: 'Deep learning differs from classical machine learning in three ways. | In classical methods, people decide which features matter. A deep network learns its own features, layer by layer. | That power needs a lot of data and specialised hardware. | And it comes at a cost in explainability: it is hard to say why a deep network made a particular decision.' },
      { t: 'neural', title: 'One training step', layers: [3, 5, 5, 2], inLabels: ['Sender', 'Links', 'Wording'], outLabels: ['Spam', 'Legitimate'],
        caps: ['Input', 'Hidden', 'Hidden', 'Output'], lossLabel: 'Loss: predicted 0.30 spam, label 1.00',
        notes: [{ h: 'A small network', d: 'Neurons in layers, joined by weighted connections. The weights are what the network learns.' }, { h: 'Forward pass', d: 'Inputs flow through the layers to produce a prediction.' }, { h: 'Loss', d: 'The prediction is compared with the label. The gap is the error.', k: 'threat' }, { h: 'Backpropagation', d: 'The error flows backwards, working out each weight’s share of the blame.', k: 'human' }, { h: 'Gradient descent', d: 'Every weight moves a small step in the direction that reduces the error.' }, { h: 'Repeat at scale', d: 'Millions of examples and many passes later, the network has learned.' }],
        steps: ['show', 'forward', 'error', 'backward', 'update', 'predict'],
        say: 'Here is a tiny network that classifies email. Each circle is a neuron, and each line is a weighted connection. The weights are what the network learns. | In the forward pass, the email’s features flow through the layers, and the network produces a prediction. | That prediction is compared with the correct label using a loss function. The gap between them is the error. | Backpropagation sends the error backwards through the network, working out how much each weight contributed to it. | Then gradient descent nudges every weight a small step in the direction that reduces the error. The size of that step is the learning rate. | Repeat this over millions of examples and many passes, and the network gradually learns.' },
      { t: 'chart', title: 'When learning turns into memorising', kind: 'line', x: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], yMin: 0, yMax: 2.5, ticks: 5, yLabel: 'Error (loss) by epoch',
        series: [
          { n: 'Training', k: 'data', v: [2.3, 1.6, 1.2, 0.95, 0.78, 0.65, 0.55, 0.47, 0.40, 0.34, 0.29, 0.25] },
          { n: 'Validation', k: 'human', v: [2.4, 1.7, 1.3, 1.05, 0.92, 0.86, 0.84, 0.87, 0.92, 0.99, 1.07, 1.16] } ],
        annot: [{ x: 6, text: 'Best stopping point', k: 'control' }],
        notes: [{ h: 'Training error', d: 'Falls steadily as the model fits the training data.' }, { h: 'Validation error', d: 'Measured on held-back data the model never trains on.', k: 'human' }, { h: 'Overfitting', d: 'After epoch 7 the model memorises the training set and gets worse on new data.', k: 'threat' }, { h: 'Remedies', d: 'More data, regularisation, dropout and early stopping.', k: 'control' }],
        steps: [{ s: [0] }, { s: [1] }, { a: [0] }, {}],
        say: 'Training repeats over many passes through the data, called epochs, and the error on the training data keeps falling. | But on validation data the model has never trained on, the error falls, and then starts to rise. | That turning point is where the model stops learning general patterns and starts memorising its training set. This is overfitting. | More data, regularisation, a technique called dropout, and simply stopping early all help a model generalise to new data.' },
      { t: 'cycle', title: 'Evolutionary computation', center: 'Genetic algorithm', centerSub: 'search inspired by natural selection', intro: 'No gradients needed: candidates compete, and the fittest are recombined generation after generation.',
        stages: [
          { icon: 'users', label: 'Population', d: 'Start with many random candidate solutions.' },
          { icon: 'target', label: 'Fitness', d: 'Score every candidate with a fitness function.' },
          { icon: 'filter', label: 'Selection', d: 'Keep the fittest candidates as parents.' },
          { icon: 'split', label: 'Crossover', d: 'Combine parts of two parents into offspring.' },
          { icon: 'dice', label: 'Mutation', d: 'Make small random changes to keep variety.' } ],
        say: 'Evolutionary computation takes a completely different route to a good answer. | A genetic algorithm starts with a population of random candidate solutions. | Each candidate is scored by a fitness function that measures how good it is. | The fittest candidates are selected to become parents. | Crossover combines parts of two parents to create offspring. | Mutation makes small random changes, so the population does not become too similar. | The new generation replaces the old, and the cycle repeats. Crucially, it needs no gradients, only a way to score results.' },
      { t: 'bullets', title: 'Why security teams care about evolutionary search', items: [
          { icon: 'bug', h: 'Fuzzing', d: 'Coverage-guided fuzzers evolve inputs that reach new code paths' },
          { icon: 'eye', h: 'Testing models from the outside', d: 'Search can find inputs that flip a model’s output using only its responses' },
          { icon: 'robot', h: 'Automated red teaming', d: 'Generate and score test cases at a scale people can’t' },
          { icon: 'sliders', h: 'Optimisation', d: 'Tune hyperparameters, or even network designs' } ],
        say: 'Evolutionary search matters in security for four reasons. | Coverage-guided fuzzers, a staple of vulnerability research, evolve test inputs that reach new code paths. | Because it only needs a score, the same kind of search can probe a model from the outside, finding inputs that change its output using nothing but its responses. That is why limiting and monitoring queries matters. | Defenders use the same idea for automated red teaming, generating and scoring test cases at scale. | And it is widely used for optimisation, such as tuning hyperparameters or searching for network designs.' },
      { t: 'summary', items: [
          'Deep networks learn their own features from large amounts of data',
          'Training loop: forward pass, loss, backpropagation, gradient descent',
          'Overfitting: training error falls while validation error rises',
          'Evolutionary search needs only a fitness score, not gradients' ],
        say: 'To recap. | Deep networks learn their own features, given enough data and compute. | Each training step is a forward pass, a loss, backpropagation and a gradient descent update. | Overfitting shows up as training error falling while validation error rises. | And evolutionary search needs only a fitness score, which makes it useful for fuzzing, testing and optimisation.' }
    ] },
    { type: 'text', md: `### Inside a neural network

An artificial **neuron** takes several inputs, multiplies each by a **weight**, adds them together with a **bias**, and passes the result through an **activation function**. The activation function introduces non-linearity, which is what lets networks learn complex patterns. Common choices are **ReLU** (which outputs zero for negative values and passes positive values unchanged), **sigmoid** (which squashes values into the range 0 to 1) and **softmax** (which turns a set of scores into probabilities that add up to 1, typically in the output layer of a classifier).

Neurons are arranged in **layers**: an input layer, one or more **hidden layers**, and an output layer. A network is "deep" when it has many hidden layers. Early layers tend to learn simple features, such as edges in an image or common word fragments, and later layers combine them into abstract concepts.

The learned values, the weights and biases, are the model’s **parameters**. Large language models have billions of them. Choices people make *before* training, such as the learning rate, number of layers, batch size and number of epochs, are **hyperparameters**.

### The training loop

1. **Forward pass:** a batch of training examples flows through the network to produce predictions.
2. **Loss:** a loss function measures how far the predictions are from the labels. Cross-entropy is typical for classification and mean squared error for regression.
3. **Backpropagation:** the chain rule of calculus is applied backwards through the network to compute the **gradient**, how much each parameter contributed to the loss.
4. **Gradient descent:** an optimiser, such as stochastic gradient descent or Adam, adjusts each parameter a small step against its gradient. The **learning rate** sets the step size: too high and training is unstable, too low and it crawls.

One full pass through the training data is an **epoch**. Training runs for many epochs, and the result is a set of weights, often called a **checkpoint**, that can be saved, shared, loaded and attacked like any other valuable file.

Using a trained model to make predictions is called **inference**. Training is expensive and happens occasionally. Inference happens every time someone uses the model, so its cost, speed and security dominate day-to-day operations.` },
    { type: 'accordion', title: 'Overfitting, underfitting and how to fix them', items: [
      ['Overfitting', `The model fits the training data too closely, including its noise and quirks, and performs worse on new data. Signs: very low training error, much higher validation error. Overfitted models can also **memorise** individual training records, which becomes a privacy risk if those records are sensitive.`],
      ['Underfitting', `The model is too simple, or trained too little, to capture the real pattern. Both training and validation error stay high.`],
      ['Remedies', `Collect more, and more varied, data. Use **regularisation**, which penalises overly complex models. Use **dropout**, which randomly switches off neurons during training so the network can’t rely on any one of them. Stop training early when validation error starts to rise. Augment data with realistic variations.`],
      ['Why security cares', `A model that memorises can leak training data, and a model that generalises poorly fails unpredictably on unusual inputs, which an adversary can deliberately supply. Good generalisation is a security property as well as a quality one.`] ] },
    { type: 'text', md: `### Why deep learning took off when it did

Neural networks date back to the 1950s perceptron, and backpropagation was popularised in 1986. Deep learning only became dominant after 2012, when three things converged:

- **Data:** the internet produced labelled image collections such as ImageNet, and vast amounts of text.
- **Compute:** graphics processing units (GPUs), designed for games, turned out to be ideal for the matrix arithmetic neural networks need.
- **Methods:** better activation functions, initialisation, regularisation and architectures made very deep networks trainable.

### Evolutionary computation

**Evolutionary computation** is a family of optimisation methods inspired by natural selection. Instead of following a gradient, it maintains a population of candidate solutions and improves it over generations.

In a **genetic algorithm**, each candidate is encoded as a "chromosome", for example a string of bits or numbers. A **fitness function** scores each one. The fittest are **selected** as parents, **crossover** recombines their genes, and **mutation** introduces small random changes to keep diversity. Related techniques include **genetic programming**, which evolves programs, **evolution strategies**, and swarm methods such as particle swarm optimisation and ant colony optimisation, which are often grouped with them as nature-inspired computation.

These methods shine where gradients aren’t available or the search space is rugged: scheduling, design optimisation, hyperparameter tuning, neural architecture search and **neuroevolution** (evolving network weights or structures). Their drawbacks are cost, because they need many evaluations, and no guarantee of finding the best possible answer.` },
    { type: 'callout', kind: 'real', title: 'The black-box lesson', md: `Evolutionary and other gradient-free search methods need only a score to optimise against. Applied to a deployed model, the "score" can simply be the model’s own outputs. That is why exposing detailed confidence scores, allowing unlimited queries, or failing to monitor unusual query patterns makes it easier for someone to probe a model’s weaknesses. You will return to query limits and output handling in Domains 3 and 4.` },
    { type: 'flip', title: 'Training vocabulary', cards: [
      ['Parameter', 'A value the model learns during training, such as a weight or bias.'],
      ['Hyperparameter', 'A setting chosen before training, such as learning rate, batch size or number of layers.'],
      ['Epoch', 'One complete pass through the training data.'],
      ['Learning rate', 'How large a step gradient descent takes when updating weights.'],
      ['Checkpoint', 'A saved copy of a model’s weights at a point in training.'],
      ['Fitness function', 'In evolutionary computation, the score that decides which candidates survive.'] ] },
    { type: 'check', q: { q: 'A model’s training error keeps falling, but its error on the validation set has been rising for several epochs. What should the team do?', o: ['Train for more epochs until the validation error turns and starts to fall again', 'Stop training at the point of lowest validation error and consider regularisation', 'Increase the learning rate so the model escapes the current poor minimum faster', 'Evaluate the model on the training set instead, since its error there is still falling'], a: 1, b: 3, why: 'Rising validation error with falling training error is overfitting. Early stopping at the best validation point, plus regularisation or more data, addresses it. Measuring on training data would hide the problem.' } }
  ]
};
