/* 1.1 · Section 4: neural network architectures */
module.exports = {
  title: 'Neural network architectures: CNNs, RNNs and transformers', covers: [4],
  blocks: [
    { type: 'video', title: 'CNNs, RNNs and transformers', kicker: 'Module 1.1 · Video 4 of 7', scenes: [
      { t: 'title', kicker: 'Module 1.1 · AI concepts', title: 'CNNs, RNNs and transformers', sub: 'Three architectures, three ways of seeing data', icon: 'network',
        say: 'Neural networks come in families, each shaped for a kind of data. | This video covers the three you must know: convolutional networks, recurrent networks and transformers.' },
      { t: 'conv', title: 'Convolutional neural networks', outLabel: 'Digit: 2', outConf: '96% confident',
        steps: ['image', 'kernel', 'slide', 'pool', 'out'],
        say: 'Convolutional neural networks, or CNNs, were built for images. To a computer, an image is just a grid of pixel values. | A small filter, here three pixels by three, looks for one simple pattern, such as an edge or a corner. | The filter slides across the whole image, and produces a feature map that lights up wherever the pattern appears. | Pooling then shrinks the map, keeping the strongest signals and making the network tolerant of small shifts. | Stacked layers build from edges, to shapes, to whole objects, until the network can name what it sees.' },
      { t: 'flow', title: 'Recurrent neural networks',
        nodes: [
          { id: 'x1', x: 380, y: 740, label: '“Patch”', k: 'data', w: 220, ls: 36 },
          { id: 'x2', x: 800, y: 740, label: '“the”', k: 'data', w: 220, ls: 36 },
          { id: 'x3', x: 1220, y: 740, label: '“server”', k: 'data', w: 220, ls: 36 },
          { id: 'h1', x: 380, y: 480, icon: 'memory', label: 'State 1', k: 'model', w: 240 },
          { id: 'h2', x: 800, y: 480, icon: 'memory', label: 'State 2', k: 'model', w: 240 },
          { id: 'h3', x: 1220, y: 480, icon: 'memory', label: 'State 3', k: 'model', w: 240 },
          { id: 'out', x: 1220, y: 245, label: 'Next word: “now”', k: 'accent', w: 330, ls: 34 } ],
        edges: [{ from: 'x1', to: 'h1', k: 'data' }, { from: 'x2', to: 'h2', k: 'data' }, { from: 'x3', to: 'h3', k: 'data' },
          { from: 'h1', to: 'h2', label: 'memory', k: 'model' }, { from: 'h2', to: 'h3', label: 'memory', k: 'model' }, { from: 'h3', to: 'out', k: 'model' }],
        steps: [
          { show: 'x1 h1 x1-h1', flow: 'x1-h1' },
          { show: 'x2 h2 x2-h2 h1-h2', flow: 'h1-h2 x2-h2' },
          { show: 'x3 h3 x3-h3 h2-h3', flow: 'h2-h3 x3-h3' },
          { show: 'out h3-out', flow: 'h3-out', hi: 'out' },
          { hi: 'h1', focus: true, note: { at: 'h1', text: 'Early inputs fade over long sequences', k: 'threat', w: 400 } },
          { hi: 'h1 h2 h3', note: { at: 'h2', text: 'LSTM and GRU gates decide what to keep', k: 'control', w: 420 } } ],
        say: 'Recurrent neural networks, or RNNs, were built for sequences: text, speech, sensor readings and logs. | They read one step at a time, and pass a hidden state, a kind of running memory, from each step to the next. | Each new input updates that memory. | At the end, the final state produces the output, such as the next word, or a classification of the whole sequence. | The weakness is distance. Over long sequences, information from early steps fades, a problem known as vanishing gradients. | Gated designs called {LSTM~L S T M} and {GRU~G R U} learn what to keep and what to forget, but reading one step at a time still makes RNNs slow to train.' },
      { t: 'attention', title: 'Transformers and self-attention', tokens: ['The', 'server', 'crashed', 'because', 'it', 'overheated'], focus: 4,
        weights: [0.03, 0.62, 0.12, 0.05, 0, 0.18],
        notes: [null, 'Which word does “it” refer to?', 'Self-attention scores every other token. “server” scores highest.', 'Every token does this for every other token, all at once.', 'Position numbers preserve the word order.'],
        steps: ['tokens', 'focus', 'weights', 'all', 'positions'],
        say: 'Transformers replaced recurrence with a mechanism called self-attention. | Take the word it in this sentence. To understand it, the model must work out what it refers to. | Self-attention scores how relevant every other word is. Here, server scores highest, so its meaning flows into the representation of it. | Crucially, every token does this for every other token at the same time. Nothing waits for the previous step, so transformers train efficiently on enormous datasets. | Because everything is processed in parallel, a position signal is added to each token, so the model does not lose the word order.' },
      { t: 'compare', title: 'The three families side by side', cols: [{ h: 'CNN', icon: 'image', k: 'data' }, { h: 'RNN', icon: 'cycle', k: 'model' }, { h: 'Transformer', icon: 'network', k: 'human' }],
        labels: ['Built for', 'Key idea', 'Today', 'Security note'], size: 29, rows: [
          ['Images and other grids', 'Sequences, one step at a time', 'Sequences, all at once'],
          ['Sliding filters', 'A running memory', 'Self-attention'],
          ['Vision, video, some audio', 'Largely replaced by transformers', 'LLMs and multimodal models'],
          ['Small, crafted changes can fool them', 'Long-range context is fragile', 'Text anywhere in context can steer the output'] ],
        say: 'Here are the three families side by side. | CNNs are built for images and other grids. RNNs process sequences one step at a time. Transformers process whole sequences at once. | Their key ideas are sliding filters, a running memory, and self-attention. | Today, CNNs still dominate many vision tasks, RNNs have largely given way to transformers, and transformers power large language models and multimodal systems. | Each has a security angle. Carefully crafted changes to an image can fool a CNN. RNNs struggle with long-range context. And because a transformer attends to everything in its context, text placed anywhere in that context can steer what it produces.' },
      { t: 'summary', items: [
          'CNNs slide filters over grids to detect patterns, then pool',
          'RNNs carry a hidden state through a sequence; LSTM and GRU help with long ones',
          'Transformers use self-attention to relate every token to every other, in parallel',
          'Everything in a transformer’s context can influence its output' ],
        say: 'To recap. | CNNs slide filters over grids to detect patterns, then pool the results. | RNNs carry a hidden state through a sequence, with LSTM and GRU helping on longer ones. | Transformers use self-attention to relate every token to every other token, in parallel. | And because of that, everything in a transformer’s context can influence its output.' }
    ] },
    { type: 'text', md: `### From neurons to architectures

The simplest deep network is the **multilayer perceptron (MLP)**, sometimes called a fully connected or dense network: every neuron in one layer connects to every neuron in the next. MLPs work well on tabular data, but they ignore structure. They don’t know that neighbouring pixels are related, or that word order matters. Specialised architectures build that structure in.

### Convolutional neural networks (CNNs)

A CNN applies small learned **filters** (also called kernels) that slide across the input. Each filter detects a local pattern and produces a **feature map** showing where that pattern occurs. Because the same filter is reused across the whole image, a technique called **weight sharing**, CNNs need far fewer parameters than dense networks and recognise a pattern wherever it appears.

**Pooling** layers downsample feature maps, typically keeping the maximum value in each small region. That makes the network tolerant of small shifts and reduces computation. Stacked convolution and pooling layers build a hierarchy: edges, then textures and shapes, then object parts, then whole objects. Dense layers at the end turn those features into a classification.

CNNs power image classification, object detection, face recognition and medical imaging, and are also applied to audio spectrograms and to malware binaries rendered as images. Their best-known security weakness is the **adversarial example**: an input altered in ways people barely notice, or a printed patch placed in a scene, that reliably changes the model’s prediction. Module 6.1 covers these evasion attacks in depth.

### Recurrent neural networks (RNNs)

An RNN processes a sequence one element at a time, maintaining a **hidden state** that summarises what it has seen so far. Each step combines the new input with the previous state. Training "unrolls" the network through time and applies backpropagation across the steps.

Plain RNNs suffer from **vanishing and exploding gradients**: over long sequences the training signal shrinks towards zero or grows uncontrollably, so they forget early information. **Long short-term memory (LSTM)** networks add gates (input, forget and output) that learn what to store, discard and reveal. **Gated recurrent units (GRUs)** are a simpler variant. RNNs were the backbone of speech recognition and machine translation until about 2017, and still appear in time-series and some log-analysis systems. Their sequential nature limits how far training can be parallelised.` },
    { type: 'steps', title: 'How self-attention works, step by step', items: [
      ['Turn tokens into vectors', `Each token (a word or part of a word) becomes an **embedding**, a list of numbers representing its meaning, plus a **positional encoding** that marks where it sits in the sequence.`],
      ['Create queries, keys and values', `For every token the model computes three vectors. The **query** asks "what am I looking for?", the **key** advertises "what do I contain?", and the **value** carries the information to pass on.`],
      ['Score every pair', `Each token’s query is compared with every other token’s key. The scores are normalised with softmax into **attention weights** that sum to 1.`],
      ['Blend the values', `Each token’s new representation is the weighted sum of all tokens' values. The word "it" absorbs most of its meaning from "server" because that pair scored highest.`],
      ['Repeat with many heads and layers', `**Multi-head attention** runs several attention patterns in parallel, so one head can track grammar while another tracks meaning. Dozens of layers are stacked, each refining the representation.`] ] },
    { type: 'text', md: `### Transformers

Introduced in the 2017 paper *Attention Is All You Need*, the transformer dispenses with recurrence and relies on **self-attention**. Because every token can attend to every other token directly, distant words relate as easily as neighbours, and the whole sequence is processed in parallel, which suits GPUs and makes training on internet-scale data feasible.

Three variants matter:

- **Encoder-only** models, such as BERT, read the whole input at once and excel at understanding tasks like classification and search.
- **Decoder-only** models, such as the GPT family, generate text one token at a time, each token attending only to those before it. Most chat LLMs are decoder-only.
- **Encoder-decoder** models, such as T5, map an input sequence to an output sequence, as in translation and summarisation.

Attention compares every token with every other, so its cost grows roughly with the *square* of the sequence length. That is one reason models have a fixed **context window**, the maximum number of tokens they can consider at once, covered in Module 1.2. Transformers have also displaced CNNs for some vision tasks (vision transformers) and handle images, audio and text together in **multimodal** models.

The security implication runs through the rest of this course: a transformer has no built-in notion of which tokens are trusted instructions and which are untrusted data. A system prompt, a user’s question, a retrieved web page and a tool’s output all end up as tokens in the same context, and all of them can influence the output. That design fact is the root of prompt injection, studied in Domains 4 and 6.` },
    { type: 'accordion', title: 'Other architectures worth recognising', items: [
      ['Generative adversarial networks (GANs)', `Two networks train against each other: a **generator** creates fake samples and a **discriminator** tries to tell them from real ones. GANs produced the first convincing deepfake faces.`],
      ['Autoencoders', `Networks that compress input into a small representation and reconstruct it. Inputs that reconstruct badly are unusual, so autoencoders are used for **anomaly detection**, including in network traffic.`],
      ['Diffusion models', `Generate images, audio or video by learning to remove noise step by step, starting from pure noise. They power most modern image generators.`],
      ['Graph neural networks (GNNs)', `Operate on graphs of nodes and edges, such as social networks, transaction graphs or attack graphs. Useful for fraud rings and relationship analysis.`] ] },
    { type: 'match', title: 'Match the architecture to the job', pairs: [
      ['CNN', 'Classify objects in camera images'],
      ['LSTM', 'Model a sequence step by step, keeping longer-term memory'],
      ['Decoder-only transformer', 'Generate text one token at a time in a chat assistant'],
      ['Autoencoder', 'Flag unusual network traffic that reconstructs poorly'],
      ['GAN', 'Produce synthetic faces by pitting two networks against each other'] ] },
    { type: 'check', q: { q: 'An LLM application places a retrieved web page into the model’s context alongside the developer’s instructions. Why is this a security concern rooted in the transformer architecture?', o: ['Transformers attend only to the first part of their context, so later instructions get lost', 'Self-attention lets every token in context influence the output, with no trusted/untrusted split', 'Retrieved text is encrypted in the context window, so the model can’t check whether it is safe', 'Web pages usually exceed the context window, so the developer’s instructions are discarded'], a: 1, b: 4, why: 'Self-attention relates every token to every other. Nothing in the architecture marks the developer’s instructions as more authoritative than text from a web page, so untrusted content can influence the output. Controls must be added around the model.' } }
  ]
};
