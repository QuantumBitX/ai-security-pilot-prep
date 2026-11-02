/* 1.2 · Section 1: generative, language and multimodal models */
module.exports = {
  title: 'Generative, language and multimodal models', covers: [1],
  blocks: [
    { type: 'video', title: 'How generative models work', kicker: 'Module 1.2 · Video 1 of 7', scenes: [
      { t: 'title', kicker: 'Module 1.2 · Generative AI', title: 'How generative models work', sub: 'Next-token prediction, training stages, and the model families you will meet', icon: 'sparkle',
        say: 'Generative AI can seem like magic, but its core mechanism is surprisingly simple. | This video shows how a language model produces text, how it is trained, and which kinds of generative model you will be asked to secure.' },
      { t: 'chart', title: 'One step: predict the next token', kind: 'bar', x: ['connection', 'request', 'traffic', 'attack', 'user'], yMin: 0, yMax: 50, ticks: 5, unit: '%', yLabel: '“The firewall blocked the …”',
        series: [{ v: [46, 22, 15, 9, 5], k: 'model' }],
        annot: [{ y: 46, text: 'Chosen: “connection”', k: 'control' }],
        notes: [{ h: 'The text so far', d: 'The model reads everything in its context: here, “The firewall blocked the”.' }, { h: 'A probability for every token', d: 'It scores every token in its vocabulary. Only the top five are shown.' }, { h: 'Pick, append, repeat', d: 'One token is chosen and added, then the whole process runs again for the next one.', k: 'control' }],
        steps: [{}, { s: [0] }, { a: [0] }],
        say: 'A language model does one thing, over and over. It predicts the next token, given all the text so far. | It assigns a probability to every token in its vocabulary. Here, connection is most likely, followed by request and traffic. | One token is chosen, appended to the text, and the whole process runs again. Paragraphs, code and essays are built one token at a time.' },
      { t: 'compare', title: 'How the next token is chosen', cols: [{ h: 'Low temperature', icon: 'target', k: 'data' }, { h: 'High temperature', icon: 'dice', k: 'human' }],
        labels: ['Selection', 'Behaviour', 'Good for'], rows: [
          ['Strongly favours the most likely tokens', 'Samples from less likely tokens too'],
          ['Focused and more repeatable', 'Varied and more creative'],
          ['Facts, code, data extraction', 'Brainstorming, drafting, fiction'] ],
        say: 'How the next token is chosen is a setting, not a fixed rule. | A parameter called temperature controls it. Low temperature strongly favours the most likely tokens. High temperature samples from less likely ones too. A related setting, top p, limits choices to the smallest set of tokens whose probabilities add up to a threshold. | Low temperature gives focused, more repeatable output. High temperature gives variety. | So use low settings for facts, code and extraction, and higher ones for creative drafting. Even at the lowest setting, outputs are not guaranteed to be identical every time.' },
      { t: 'flow', title: 'How a modern LLM is made',
        nodes: [
          { id: 'pre', x: 220, y: 450, icon: 'globe', label: 'Pretraining', sub: 'vast text, next-token prediction', k: 'data', w: 260 },
          { id: 'sft', x: 520, y: 450, icon: 'book', label: 'Instruction tuning', sub: 'examples of good answers', k: 'model', w: 260 },
          { id: 'pref', x: 820, y: 450, icon: 'users', label: 'Preference tuning', sub: 'RLHF or similar methods', k: 'human', w: 260 },
          { id: 'eval', x: 1120, y: 450, icon: 'shieldcheck', label: 'Safety testing', sub: 'evaluations and red teaming', k: 'control', w: 260 },
          { id: 'dep', x: 1390, y: 700, icon: 'cloud', label: 'Release', sub: 'API or open weights', k: 'neutral', w: 230 } ],
        edges: [{ from: 'pre', to: 'sft', k: 'model' }, { from: 'sft', to: 'pref', k: 'model' }, { from: 'pref', to: 'eval', k: 'model' }, { from: 'eval', to: 'dep', k: 'model' }],
        steps: [{}, { show: 'pre', hi: 'pre' }, { show: 'sft pre-sft', flow: 'pre-sft', hi: 'sft' }, { show: 'pref sft-pref', flow: 'sft-pref', hi: 'pref' }, { show: 'eval pref-eval', flow: 'pref-eval', hi: 'eval' }, { show: 'dep eval-dep', flow: 'eval-dep', hi: 'dep' }],
        say: 'A modern large language model is built in stages. | Pretraining comes first. The model learns language by predicting the next token across an enormous amount of text. This is self-supervised, and it is by far the most expensive stage. | Instruction tuning then teaches it to follow requests, using examples of good responses. | Preference tuning, such as reinforcement learning from human feedback, shapes it towards answers people rate as helpful, honest and harmless. | Safety testing, including evaluations and red teaming, checks for dangerous or unwanted behaviour. | Finally the model is released, either behind a provider’s API, or as open weights that anyone can download.' },
      { t: 'bullets', title: 'The generative model families', layout: 'grid', cols: 2, items: [
          { icon: 'text', h: 'Large language models', d: 'Text in, text out: chat, code, summaries', k: 'model' },
          { icon: 'image', h: 'Vision-language models', d: 'Read images and documents alongside text', k: 'data' },
          { icon: 'sparkle', h: 'Diffusion models', d: 'Generate images and video from noise', k: 'human' },
          { icon: 'sound', h: 'Speech models', d: 'Transcribe speech, and synthesise voices', k: 'control' } ],
        say: 'You will meet four main families of generative model. | Large language models take text in and produce text out: chat, code, summaries and analysis. | Vision-language models read images, screenshots and scanned documents alongside text. Together these are called multimodal models. | Diffusion models generate images and video, starting from random noise and refining it step by step. | And speech models transcribe spoken audio, or synthesise realistic voices from text.' },
      { t: 'compare', title: 'Open weights or a provider’s API?', cols: [{ h: 'Open-weight model', icon: 'box', k: 'data' }, { h: 'Hosted API model', icon: 'cloud', k: 'model' }],
        labels: ['Access', 'Control', 'Data', 'Watch for'], rows: [
          ['Download and run it yourself', 'Call it over a provider’s API'],
          ['Full control, including fine-tuning', 'The provider controls updates and safeguards'],
          ['Can stay entirely in-house', 'Sent to the provider under contract'],
          ['Safeguards can be removed; verify where weights came from', 'Dependency on the provider; less visibility'] ],
        say: 'Models also differ in how you get them. | An open-weight model can be downloaded and run on your own infrastructure. A hosted model is used through a provider’s API. | Open weights give you full control, including fine-tuning. With a hosted model, the provider controls updates and safeguards. | Open weights let data stay entirely in-house. With an API, prompts and outputs go to the provider, under contract. | Each has a characteristic risk. Anyone can strip the safeguards from open weights, and you must verify where the weights came from. Hosted models create dependency on the provider, with less visibility into how they work.' },
      { t: 'bullets', title: 'Why generative AI changes the threat picture', items: [
          { icon: 'alert', h: 'Confident errors', d: 'Fluent output that is wrong: hallucination' },
          { icon: 'megaphone', h: 'Misuse at scale', d: 'Phishing and disinformation, written in seconds' },
          { icon: 'mask', h: 'Synthetic media', d: 'Deepfake voices, faces and documents' },
          { icon: 'lock', h: 'Data exposure', d: 'Sensitive prompts and outputs can leak' } ],
        say: 'Generative AI changes the threat picture in four ways. | It produces confident, fluent output that can simply be wrong. This is hallucination, covered in Module 1.3. | It lets attackers produce convincing phishing and disinformation in seconds, at scale. | It makes synthetic media cheap: cloned voices, fake faces and forged documents. | And everything people type into it, and everything it produces, is data that can leak if it is not governed.' },
      { t: 'summary', items: [
          'LLMs generate text one token at a time from probabilities',
          'Temperature and top-p trade focus against variety',
          'Pretraining, instruction tuning, preference tuning, safety testing',
          'Open weights give control; hosted APIs give convenience and dependency' ],
        say: 'To recap. | Language models generate text one token at a time, from probabilities. | Temperature and top p trade focus against variety. | Models are built through pretraining, instruction tuning, preference tuning and safety testing. | And open weights give you control, while hosted APIs give convenience, and dependency.' }
    ] },
    { type: 'text', md: `### What makes a model "generative"

A generative model learns the patterns in its training data well enough to produce new examples that fit them. A **large language model (LLM)** is a generative model of text, built on the transformer architecture from Module 1.1 and trained on enormous amounts of text and code. "Large" refers to its parameter count, typically billions, and to the scale of its training data.

At its core an LLM performs **next-token prediction**. Given a sequence of tokens, it outputs a probability for every token in its vocabulary, typically tens of thousands to a few hundred thousand entries. One token is selected, appended, and the process repeats. Everything an LLM appears to do, from answering questions to writing code, emerges from this single repeated step and the patterns it learned in training.

That has three practical consequences:

- **There is no lookup of facts.** The model generates what is statistically plausible given its training and context. Plausible and true usually coincide, but not always, which is why hallucination exists.
- **Output length drives cost and latency.** Every generated token requires a full pass through the model.
- **Everything in the context shapes the output.** The system instructions, the user’s words, retrieved documents and tool results all feed the same prediction.

### Decoding: how a token is chosen

The strategy for picking each token is called **decoding** or **sampling**:

- **Greedy decoding** always takes the single most likely token. It is predictable but can be repetitive.
- **Temperature** rescales the probabilities before sampling. Low values (towards 0) concentrate on the most likely tokens; high values (around 1 and above) spread choice across less likely ones.
- **Top-k** sampling limits choice to the k most likely tokens. **Top-p** (nucleus) sampling limits choice to the smallest set of tokens whose probabilities add up to p, for example 0.9.
- **Maximum tokens** caps how much the model may generate, and **stop sequences** end generation when a given string appears.

These are configuration settings, which makes them part of the system you secure. A deployment that lets users set very high token limits invites cost abuse, and one that runs extraction tasks at high temperature invites inconsistent results.` },
    { type: 'accordion', title: 'The stages of building an LLM', items: [
      ['Pretraining', `The model learns language, facts and reasoning patterns by predicting the next token across trillions of tokens of text and code. It is **self-supervised** and consumes most of the compute. The result is a **base model**: fluent, knowledgeable, but not reliably helpful or safe. Whatever was in the training data, including errors, bias and harmful content, can surface later.`],
      ['Instruction tuning (supervised fine-tuning)', `The base model is trained on curated examples of requests and good responses, teaching it to follow instructions and hold a conversation.`],
      ['Preference tuning', `People compare model responses and rank them. **Reinforcement learning from human feedback (RLHF)** trains a reward model on those rankings and optimises the LLM against it. Alternatives such as **direct preference optimisation (DPO)** learn from preference pairs directly. This stage instils much of the helpful, honest and harmless behaviour people expect.`],
      ['Safety testing and red teaming', `Developers evaluate the model against benchmarks and adversarial tests for harmful capabilities, bias and policy violations, then mitigate what they find. Testing reduces risk but can’t prove its absence.`],
      ['Release', `The model is deployed behind an API, embedded in products, or published as **open weights**. Each route moves different security responsibilities to the people who deploy it.`] ] },
    { type: 'text', md: `### Multimodal models

**Multimodal** models handle more than one type of data. **Vision-language models** accept images, screenshots or scanned documents with text and reason about them together. **Speech** models transcribe audio (automatic speech recognition) or generate natural-sounding voices (text-to-speech). **Diffusion models** generate images and video by learning to reverse a gradual noising process. The newest models combine several of these, taking any mix of text, image and audio and producing any of them.

Multimodality widens the attack surface. Text embedded in an image can carry instructions a person never notices. A cloned voice can defeat a phone-based identity check. A generated image or document can be passed off as evidence. Controls that inspect only text inputs miss everything arriving through the other channels.

### Open-weight and hosted models

**Hosted (closed) models** are accessed through a provider’s API. The provider runs the infrastructure, applies its own safeguards, and updates the model, sometimes changing its behaviour without notice. You trade control for convenience, and your prompts and outputs pass through the provider, so contract terms on retention, training use and data location matter.

**Open-weight models** publish their trained weights for anyone to download, run and modify. You gain control over hosting, data residency and customisation, and take on the full security burden: verifying the weights' provenance, patching the serving stack, and accepting that safety tuning can be removed by fine-tuning. "Open weights" is not the same as open source: training data and code are often not published, and licences can restrict use.

**Small language models (SLMs)**, with a few billion parameters or fewer, run on laptops and phones. They keep data on the device, but put model files, and their security, on endpoints you may not fully control.` },
    { type: 'flip', title: 'Generative AI vocabulary', cards: [
      ['Large language model (LLM)', 'A transformer-based generative model of text with billions of parameters, trained on vast amounts of text and code.'],
      ['Next-token prediction', 'The core operation of an LLM: estimate the probability of every possible next token, choose one, repeat.'],
      ['Temperature', 'A sampling setting: low values favour the most likely tokens; high values increase variety.'],
      ['Top-p (nucleus) sampling', 'Restricts sampling to the smallest set of tokens whose combined probability reaches p.'],
      ['Base model', 'The output of pretraining, before instruction and preference tuning. Fluent but not reliably helpful or safe.'],
      ['Multimodal model', 'A model that accepts or produces more than one kind of data, such as text, images and audio.'],
      ['Diffusion model', 'A generative model that creates images or video by progressively removing noise.'],
      ['Open-weight model', 'A model whose trained weights are published for download, so it can be self-hosted and modified.'] ] },
    { type: 'callout', kind: 'exam', title: 'Hosted vs self-hosted is a shared responsibility question', md: `When a question compares a provider’s API with a self-hosted open model, think about who owns each control. With a hosted model, the provider handles infrastructure security and base safeguards, while you remain responsible for your data, your prompts, access to your application and how outputs are used. With a self-hosted model, almost everything is yours. Module 2.5 covers shared responsibility models in detail.` },
    { type: 'scenario', title: 'Picking a deployment model', md: `A healthcare provider wants an assistant that summarises clinicians' notes. The notes contain protected health information, and the organisation’s data policy forbids sending it to third parties without a specific agreement. The clinical team has no machine-learning engineers.`,
      q: { q: 'Which option BEST balances the requirements?', o: ['Use a free public chatbot with history turned off, since summarising notes is a low-risk task', 'Use a hosted model under an agreement covering health data, with retention and training use controlled', 'Download the largest open-weight model available and run it locally on each clinician’s own laptop, offline', 'Fine-tune a model on a full year of clinical notes first, then decide which hosting option to use'], a: 1, b: 1,
        why: 'The data rule allows third-party processing only under an agreement, and the team lacks the skills to safely run and secure a self-hosted model. A hosted model under an appropriate agreement, with retention and training use controlled, fits. Public chatbots break the policy, and laptop deployment spreads sensitive data and model files across endpoints.' } }
  ]
};
