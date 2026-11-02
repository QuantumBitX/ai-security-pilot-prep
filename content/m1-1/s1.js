/* 1.1 · Section 1: the AI landscape */
const T = 'font-family="Archivo, Arial, sans-serif"';
module.exports = {
  title: 'The AI landscape: types, evolution and ecosystem', covers: [1],
  blocks: [
    { type: 'video', title: 'Mapping the AI landscape', kicker: 'Module 1.1 · Video 1 of 7', scenes: [
      { t: 'title', kicker: 'Module 1.1 · AI concepts', title: 'Mapping the AI landscape', sub: 'What AI is, where it came from, and who builds it', icon: 'globe',
        say: 'Before we can secure AI, we need a precise picture of what it is. | This video maps the territory: the kinds of AI, how the field evolved, and the ecosystem that builds and runs it.' },
      { t: 'svg', title: 'The vocabulary nests',
        svg: `<g data-b="0"><ellipse cx="520" cy="530" rx="430" ry="320" fill="#141F38" stroke="#5C6B91" stroke-width="4"/><text x="520" y="268" ${T} font-size="40" font-weight="700" fill="#EAEEF6" text-anchor="middle">Artificial intelligence</text></g>
<g data-b="2"><ellipse cx="520" cy="580" rx="330" ry="240" fill="#18264A" stroke="#5EA6FF" stroke-width="4"/><text x="520" y="398" ${T} font-size="38" font-weight="700" fill="#5EA6FF" text-anchor="middle">Machine learning</text></g>
<g data-b="3"><ellipse cx="520" cy="630" rx="230" ry="160" fill="#1D2D57" stroke="#B694FF" stroke-width="4"/><text x="520" y="530" ${T} font-size="36" font-weight="700" fill="#B694FF" text-anchor="middle">Deep learning</text></g>
<g data-b="4"><ellipse cx="520" cy="682" rx="140" ry="86" fill="$ACCENT" fill-opacity=".22" stroke="$ACCENT" stroke-width="4"/><text x="520" y="694" ${T} font-size="34" font-weight="700" fill="#EAEEF6" text-anchor="middle">Generative AI</text></g>
<g data-b="1" ${T}><text x="1010" y="250" font-size="36" font-weight="700" fill="#EAEEF6">Artificial intelligence</text><text x="1010" y="292" font-size="29" fill="#A6B1C8"><tspan x="1010">Machines doing tasks that</tspan><tspan x="1010" dy="38">normally need human intelligence</tspan></text></g>
<g data-b="2" ${T}><text x="1010" y="410" font-size="36" font-weight="700" fill="#5EA6FF">Machine learning</text><text x="1010" y="452" font-size="29" fill="#A6B1C8"><tspan x="1010">Learns patterns from data</tspan><tspan x="1010" dy="38">instead of following set rules</tspan></text></g>
<g data-b="3" ${T}><text x="1010" y="570" font-size="36" font-weight="700" fill="#B694FF">Deep learning</text><text x="1010" y="612" font-size="29" fill="#A6B1C8"><tspan x="1010">Many-layered neural networks</tspan><tspan x="1010" dy="38">that learn their own features</tspan></text></g>
<g data-b="4" ${T}><text x="1010" y="730" font-size="36" font-weight="700" fill="$ACCENT">Generative AI</text><text x="1010" y="772" font-size="29" fill="#A6B1C8"><tspan x="1010">Models that create new text,</tspan><tspan x="1010" dy="38">images, audio or code</tspan></text></g>`,
        say: 'Start with the vocabulary, because the terms nest inside each other. | Artificial intelligence is the broadest idea: machines performing tasks that would normally need human intelligence, such as perceiving, reasoning and using language. | Machine learning is the part of AI that learns patterns from data, rather than following rules a person wrote. | Deep learning is machine learning built from many-layered neural networks, which learn their own features. | And generative AI is the branch of deep learning that creates new content: text, images, audio and code.' },
      { t: 'compare', title: 'Three levels of capability', cols: [{ h: 'Narrow AI', icon: 'target', k: 'control' }, { h: 'General AI', icon: 'brain', k: 'model' }, { h: 'Superintelligence', icon: 'sparkle', k: 'human' }],
        labels: ['Status', 'Scope', 'Examples'], rows: [
          ['Exists today', 'Hypothetical', 'Hypothetical'],
          ['One task, or a defined range of tasks', 'Human-level across most domains', 'Beyond human ability in every domain'],
          ['Spam filters, face recognition, chatbots and LLMs', 'No deployed system meets this bar', 'Speculative'] ],
        say: 'AI is also classified by how capable it is. | Narrow AI exists today. General AI and superintelligence remain hypothetical. | Narrow AI handles one task, or a defined range of tasks. General AI would match people across most domains, and superintelligence would exceed them everywhere. | Every system you will assess, from spam filters to large language models, counts as narrow AI, however broad it seems.' },
      { t: 'timeline', title: 'Seventy years in six moments', events: [
          { y: '1950', h: 'Turing’s question', d: 'Can machines think? The imitation game' },
          { y: '1956', h: 'Dartmouth workshop', d: 'The term “artificial intelligence” is coined' },
          { y: '1980s', h: 'Expert systems', d: 'Hand-written rules, followed by an AI winter' },
          { y: '2012', h: 'Deep learning takes off', d: 'AlexNet wins ImageNet, trained on GPUs' },
          { y: '2017', h: 'The transformer', d: '“Attention Is All You Need”' },
          { y: '2022', h: 'Generative AI goes mainstream', d: 'ChatGPT reaches millions of users' } ],
        say: 'The field is older than most people think. | In 1950, Alan Turing asked whether machines could think, and proposed the imitation game as a test. | In 1956, a summer workshop at Dartmouth College gave the field its name: artificial intelligence. | The 1980s brought expert systems, built from rules written by hand. They proved brittle and expensive, and funding collapsed into an AI winter. | In 2012, a deep neural network called AlexNet won the ImageNet competition by a wide margin, trained on graphics processors. Deep learning took off. | In 2017, the paper Attention Is All You Need introduced the transformer, the architecture behind today’s language models. | And in late 2022, ChatGPT put generative AI in front of millions of people almost overnight.' },
      { t: 'compare', title: 'Two ways to build intelligence', cols: [{ h: 'Symbolic AI', icon: 'list', k: 'human' }, { h: 'Machine learning', icon: 'vector', k: 'data' }],
        labels: ['How', 'Strength', 'Weakness', 'Examples'], rows: [
          ['People write explicit rules and logic', 'The system learns rules from examples'],
          ['Transparent and predictable', 'Handles messy, real-world data'],
          ['Brittle outside the rules it was given', 'Can fail quietly on unfamiliar data'],
          ['Expert systems, rule engines', 'Classifiers, recommenders, LLMs'] ],
        say: 'Underneath, there have always been two broad approaches. | Symbolic AI encodes knowledge as explicit rules written by people. Machine learning infers its own rules from examples. | Symbolic systems are transparent and predictable. Learned systems cope far better with messy, real-world data. | But symbolic systems break as soon as reality steps outside their rules, while learned systems can fail quietly on data unlike anything they were trained on. | Expert systems and rule engines are symbolic. Classifiers, recommenders and language models are learned. Many real products combine both.' },
      { t: 'compare', title: 'Discriminative or generative?', cols: [{ h: 'Discriminative model', icon: 'split', k: 'data' }, { h: 'Generative model', icon: 'sparkle', k: 'model' }],
        rows: [
          ['Learns the boundary between classes', 'Learns what the data itself looks like'],
          ['Answers: which class is this?', 'Answers: what would a new example look like?'],
          ['Spam filter, malware classifier, fraud score', 'Language model, image generator, voice clone'] ],
        say: 'One more distinction matters for the exam. | A discriminative model learns the boundary between classes. A generative model learns what the data itself looks like. | So a discriminative model answers: which class is this? A generative model answers: what would a new example look like? | Spam filters and malware classifiers are discriminative. Language models and image generators are generative, which is why they can also be used to fabricate convincing content.' },
      { t: 'flow', title: 'AI is a supply chain',
        nodes: [
          { id: 'data', x: 250, y: 330, icon: 'database', label: 'Data providers', sub: 'collect and label data', k: 'data', w: 300 },
          { id: 'comp', x: 250, y: 680, icon: 'chip', label: 'Compute providers', sub: 'chips, clouds, data centres', k: 'neutral', w: 300 },
          { id: 'dev', x: 640, y: 505, icon: 'model', label: 'Model developers', sub: 'train foundation models', k: 'model', w: 300 },
          { id: 'hub', x: 1010, y: 330, icon: 'cloud', label: 'Platforms and hubs', sub: 'host and distribute models', k: 'neutral', w: 300 },
          { id: 'app', x: 1010, y: 680, icon: 'code', label: 'Application builders', sub: 'APIs, retrieval, agents', k: 'neutral', w: 300 },
          { id: 'user', x: 1365, y: 505, icon: 'users', label: 'Users and affected people', k: 'human', w: 250 } ],
        edges: [{ from: 'data', to: 'dev', k: 'data' }, { from: 'comp', to: 'dev', k: 'neutral' }, { from: 'dev', to: 'hub', k: 'model' }, { from: 'hub', to: 'app', k: 'model' }, { from: 'app', to: 'user', k: 'neutral' }],
        steps: [
          {},
          { show: 'data comp', hi: 'data comp' },
          { show: 'dev data-dev comp-dev', flow: 'data-dev comp-dev', hi: 'dev' },
          { show: 'hub dev-hub', flow: 'dev-hub', hi: 'hub' },
          { show: 'app hub-app', flow: 'hub-app', hi: 'app' },
          { show: 'user app-user', flow: 'app-user', hi: 'user' },
          { flow: 'data-dev comp-dev dev-hub hub-app app-user', note: { x: 1365, y: 650, text: 'Every hand-off is a trust boundary', k: 'threat', w: 300 } } ],
        say: 'Finally, AI is not one product. It is a supply chain. | It starts with data providers, who collect and label data, and compute providers, who supply chips, clouds and data centres. | Model developers combine the two to train models, including large foundation models. | Platforms and model hubs host those models and distribute them, often openly. | Application builders integrate the models into products, through APIs, retrieval and agents. | Then come the users, and the people affected by the system’s decisions, who may never use it directly. | Every hand-off in this chain is a trust boundary, and each one is a place where security can fail.' },
      { t: 'summary', items: [
          'AI contains machine learning, which contains deep learning, which contains generative AI',
          'Every deployed system today is narrow AI, however broad it seems',
          'Transformers, introduced in 2017, power today’s generative AI',
          'AI is a supply chain, and every hand-off is a trust boundary' ],
        say: 'To recap. | The terms nest: AI contains machine learning, which contains deep learning, which contains generative AI. | Every system deployed today is narrow AI. | Transformers, introduced in 2017, power today’s generative models. | And AI is a supply chain, in which every hand-off is a trust boundary.' }
    ] },
    { type: 'text', md: `### Four terms that nest

**Artificial intelligence (AI)** is the broad goal of building machines that perform tasks normally requiring human intelligence: perceiving, reasoning, learning, planning and using language. It is a field, not a technology, and it includes approaches that don’t learn at all.

**Machine learning (ML)** is the part of AI in which systems learn patterns from data rather than following rules a programmer wrote. Give a machine-learning system thousands of examples of fraudulent and legitimate transactions and it works out for itself which signals matter.

**Deep learning** is machine learning that uses neural networks with many layers. Its defining advantage is *representation learning*: the network discovers useful features on its own, where older techniques needed people to engineer them by hand.

**Generative AI** is the branch of deep learning focused on creating new content: text, images, audio, video and code. Large language models (LLMs) are the best-known example.

These distinctions matter in practice. A rules-based fraud engine, a gradient-boosted risk score and an LLM chatbot are all "AI", but they fail differently, are attacked differently and need different controls.` },
    { type: 'flip', title: 'Ways to classify AI', cards: [
      ['Narrow AI (weak AI)', 'Performs one task or a defined range of tasks. Every AI system in production today, including LLMs, is narrow AI.'],
      ['Artificial general intelligence (AGI)', 'Hypothetical AI matching human ability across most domains. No deployed system meets this definition.'],
      ['Artificial superintelligence (ASI)', 'Hypothetical AI exceeding human ability in every domain. Discussed in long-term safety research.'],
      ['Reactive machines', 'Respond to the current input with no memory of the past, like the chess computer Deep Blue.'],
      ['Limited memory', 'Use recent or learned information to decide. Most modern machine learning, including self-driving perception, falls here.'],
      ['Theory of mind and self-aware AI', 'Research concepts for systems that model others’ beliefs, or have awareness of themselves. Neither exists today.'] ] },
    { type: 'callout', kind: 'exam', title: '“General-purpose” is not “general intelligence”', md: `The EU AI Act regulates **general-purpose AI (GPAI) models**: models such as large LLMs that can perform a wide range of tasks and be built into many downstream systems. That is a legal category about breadth of use. It does not mean artificial general intelligence. If an exam option equates the two, it is a distractor.` },
    { type: 'text', md: `### How the field evolved, and what each era left behind

AI has moved in waves of optimism and disappointment, and each wave left something that still matters for security.

- **1950–1970s: symbolic beginnings.** Turing’s 1950 paper asked whether machines can think. The 1956 Dartmouth workshop named the field. Early programs such as ELIZA (1966) imitated conversation with simple pattern matching, and people still attributed understanding to them. That human tendency to over-trust fluent machines is now a core risk with chatbots.
- **1980s: expert systems.** Organisations encoded specialist knowledge as thousands of if-then rules. They worked inside narrow boundaries and failed badly outside them, and maintaining them was costly. Funding collapsed twice, in the "AI winters" of the mid-1970s and late 1980s.
- **1990s–2000s: statistical machine learning.** Learning from data replaced hand-written rules for tasks such as spam filtering. IBM’s Deep Blue beat the world chess champion in 1997, using search rather than learning.
- **2012 onwards: deep learning.** AlexNet’s win at the ImageNet competition showed that large neural networks trained on GPUs could outperform hand-engineered approaches. Big data, cheap parallel compute and better training methods converged. AlphaGo beat a world champion at Go in 2016.
- **2017 onwards: transformers and generative AI.** The transformer architecture made it practical to train enormous language models on internet-scale text. ChatGPT’s release in November 2022 brought generative AI to the mainstream, followed quickly by multimodal and agentic systems that see, hear and act.

The security lesson of this history is that capability has outpaced assurance at every step. Each new technique was deployed before its failure modes were well understood.` },
    { type: 'match', title: 'Match the milestone to its significance', pairs: [
      ['1956 Dartmouth workshop', 'Named the field of artificial intelligence'],
      ['1980s expert systems', 'Hand-written rules that proved brittle and costly'],
      ['2012 AlexNet', 'Showed deep networks on GPUs could beat hand-built features'],
      ['2017 transformer', 'Introduced self-attention, the basis of modern LLMs'],
      ['2022 ChatGPT', 'Brought generative AI to a mass audience'] ] },
    { type: 'text', md: `### Symbolic, statistical and hybrid

**Symbolic AI** (sometimes called classical or rules-based AI) represents knowledge explicitly, as rules, logic and knowledge graphs, and reasons over it. Its behaviour can be inspected and predicted, which auditors and regulators value. Its weakness is brittleness: it knows only what it was told.

**Machine learning** (the statistical or connectionist approach) learns behaviour from data. It copes with ambiguity and scale, but its reasoning is harder to inspect, and its behaviour depends on data that may be incomplete, biased or tampered with.

Many production systems are **hybrid**. A bank might use a learned model to score fraud risk and a rules engine to enforce hard limits and regulatory requirements. An LLM application often wraps a learned model in deterministic code that validates inputs, restricts tools and checks outputs. That deterministic wrapper is frequently where security controls live.

### Discriminative and generative models

A **discriminative model** learns to separate classes: given an input, which label is most likely? Fraud detection, malware classification and spam filtering are discriminative tasks. A **generative model** learns the underlying distribution of the data well enough to produce new samples from it. That ability is what makes deepfakes, synthetic phishing emails and fabricated documents possible, and why generative AI raises content-integrity and disclosure questions that classifiers never did.` },
    { type: 'text', md: `### The AI ecosystem and its trust boundaries

Very few organisations build AI end to end. A typical deployment involves:

- **Data providers and labellers**, who collect, license, clean and annotate training data.
- **Compute providers**, who supply accelerators, cloud platforms and data centres.
- **Model developers**, who train models, including large *foundation models* that others adapt.
- **Platforms and model hubs**, which host, version and distribute models and datasets, often openly.
- **Application builders and integrators**, who connect models to products through APIs, retrieval pipelines, plugins and agents.
- **Deployers and operators**, who run the system for a purpose and are accountable for how it is used.
- **Users and affected people**, including people who never interact with the system but are subject to its decisions.
- **Oversight bodies**, such as regulators, auditors and standards organisations.

The EU AI Act gives some of these roles legal weight. It distinguishes **providers** (who develop an AI system or model and place it on the market), **deployers** (who use it under their authority), **importers** and **distributors**, and assigns obligations to each. You will study those obligations in Domain 2.

For a security professional, the key point is that every hand-off is a **trust boundary**. A poisoned public dataset, a tampered model file on a hub, a compromised dependency in a training pipeline or an over-privileged integration can each undermine a system that looks secure in isolation. Supply-chain risk runs through Domains 2, 3 and 6.` },
    { type: 'check', q: { q: 'A team fine-tunes an open model downloaded from a public hub, then exposes it to customers through an API. Which statement BEST describes their position in the AI ecosystem?', o: ['They are only users of the model, so its supply-chain risk belongs to the hub that hosts it', 'They rely on upstream providers and also become accountable for what they deploy', 'They are a compute provider, because they host the API that customers call', 'They carry no security responsibility for the model itself, because it is open source'], a: 1, b: 1, why: 'The team depends on the upstream model and hub, which are part of its supply chain, and as the party offering the system to customers it is accountable for how the model behaves in its product. Open licensing does not transfer that accountability.' } }
  ]
};
