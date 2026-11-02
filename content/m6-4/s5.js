/* 6.4 · Section 5: deep dive — jailbreak and injection families, and how to test for them */
module.exports = {
  title: 'Deep dive: jailbreak and injection families', covers: [2],
  blocks: [
    { type: 'video', title: 'Why jailbreaks work', kicker: 'Module 6.4 · Video 5 of 5', scenes: [
      { t: 'title', kicker: 'Module 6.4 · Deep dive', title: 'Why jailbreaks work', sub: 'Attack families, their mechanisms and how to test for them', icon: 'mask',
        say: 'Section two listed jailbreak families as something to test. This deep dive explains why they work, how each family operates at a high level, and how to measure a system’s resistance. | As always in this course, it stays conceptual: the aim is to recognise and test these patterns, not to reproduce them.' },
      { t: 'compare', title: 'Two root causes', labels: ['The idea', 'Example families', 'What helps'],
        cols: [{ h: 'Competing objectives', icon: 'scale', k: 'threat' }, { h: 'Mismatched generalisation', icon: 'globe', k: 'model' }],
        rows: [
          ['Helpfulness is set against safety', 'Ability reaches inputs safety missed'],
          ['Role-play, “start with yes”', 'Encodings, ciphers, rare languages'],
          ['Training on such conflicts', 'Safety data as broad as ability'] ],
        say: 'Research by Wei and colleagues in 2023 traced jailbreaks to two root causes. | The first is competing objectives: the model’s drive to be helpful and follow instructions is set against its safety training. The second is mismatched generalisation: the model’s abilities reach inputs that its safety training never covered. | Role-play frames, and instructions to begin with an affirmative reply, exploit competing objectives. Encodings, ciphers and low-resource languages exploit mismatched generalisation. | Defences follow from the causes: safety training on these conflicts, safety data as broad as the model’s abilities, and independent classifiers that don’t share the model’s blind spots.' },
      { t: 'bullets', title: 'Families to cover in a test plan', layout: 'grid', cols: 2,
        items: [
          { icon: 'mask', h: 'Role-play and personas', d: 'A fictional frame seems to permit it', k: 'threat' },
          { icon: 'text', h: 'Obfuscation and encoding', d: 'Hidden in formats filters miss', k: 'threat' },
          { icon: 'globe', h: 'Low-resource languages', d: 'Less safety data outside English', k: 'threat' },
          { icon: 'copy', h: 'Many-shot', d: 'Hundreds of fake dialogues in one prompt', k: 'threat' },
          { icon: 'chat', h: 'Multi-turn escalation', d: 'Small steps, each harmless alone', k: 'threat' },
          { icon: 'code', h: 'Optimised suffixes', d: 'Machine-found strings that transfer', k: 'threat' },
          { icon: 'split', h: 'Payload splitting', d: 'Harmless parts the model combines', k: 'threat' },
          { icon: 'image', h: 'Multimodal', d: 'Instructions in images or audio', k: 'threat' } ],
        say: 'A test plan should cover at least eight families. | Role-play and personas wrap a request in a fictional or hypothetical frame that seems to permit it. | Obfuscation and encoding hide the request in a format that filters and safety training handle poorly. | Low-resource languages exploit the fact that most safety data is in English. | Many-shot attacks fill a long context window with hundreds of fabricated dialogues in which an assistant complies, and success rises steadily with their number. | Multi-turn escalation moves in small steps, each harmless on its own. | Optimised suffixes are strings found by an algorithm rather than a person, and they can transfer between models. | Payload splitting asks the model to combine fragments that are harmless separately. | And multimodal attacks carry instructions in images, documents or audio. Indirect prompt injection uses all of these tricks, delivered through content the system reads.' },
      { t: 'chat', title: 'Multi-turn escalation, in outline', app: 'Chat assistant (test environment)',
        msgs: [
          { r: 'user', t: '[Turn 1: a harmless question about the topic’s history]' },
          { r: 'ai', t: '[A general, factual overview]' },
          { r: 'user', t: '[Turns 2–4: each asks for a little more, building on the last answer]' },
          { r: 'ai', t: '[Each reply goes slightly further than the one before]' },
          { r: 'note', t: 'Result: the final reply crosses the policy line. Asked directly, the same request was refused.' } ],
        notes: [
          { h: 'A harmless start', d: 'Nothing in the first turn would trip a filter.' },
          { h: 'Context builds', d: 'The model’s own answers become the foundation.', k: 'human' },
          { h: 'Small steps', d: 'Each request is only slightly beyond the last.', k: 'threat' },
          { h: 'Gradual drift', d: 'No single turn looks clearly harmful.', k: 'threat' },
          { h: 'Judge the whole', d: 'Score and monitor conversations, not single turns.', k: 'control' } ],
        say: 'Here is the outline of a multi-turn escalation, the pattern Microsoft researchers named Crescendo in 2024. It begins with a harmless question about a topic’s history or background. | The model gives a general, factual overview. Nothing so far would trip a filter. | Over the next few turns, each request asks for a little more, often building on the model’s own previous answer. | Because each reply goes only slightly further than the last, no single turn looks clearly harmful, and the model tends to stay consistent with what it has already said. | Eventually the conversation reaches content the model would have refused if asked directly. That is why tests, monitoring and classifiers must judge whole conversations, not single prompts.' },
      { t: 'flow', title: 'Optimised suffixes and transfer',
        nodes: [
          { id: 'goal', x: 230, y: 330, icon: 'target', label: 'Target behaviour', sub: 'a request it refuses', k: 'data', w: 270 },
          { id: 'open', x: 230, y: 690, icon: 'model', label: 'Open models', sub: 'gradients available', k: 'model', w: 270 },
          { id: 'opt', x: 650, y: 510, icon: 'search', label: 'Greedy search', sub: 'swap tokens, keep the best', k: 'threat', w: 300 },
          { id: 'suf', x: 1050, y: 510, icon: 'code', label: 'Optimised suffix', sub: 'looks like gibberish', k: 'threat', w: 280 },
          { id: 'closed', x: 1360, y: 330, icon: 'lock', label: 'Closed models', sub: 'often fooled too', k: 'model', w: 260 },
          { id: 'def', x: 1360, y: 690, icon: 'shieldcheck', label: 'Defences', sub: 'filters, classifiers', k: 'control', w: 260 } ],
        edges: [{ from: 'goal', to: 'opt', k: 'data' }, { from: 'open', to: 'opt', k: 'model' }, { from: 'opt', to: 'suf', k: 'threat' }, { from: 'suf', to: 'closed', k: 'threat' }, { from: 'suf', to: 'def', k: 'control', dash: true }],
        steps: [
          { show: 'goal open', hi: 'goal open' },
          { show: 'opt goal-opt open-opt', flow: 'goal-opt open-opt', hi: 'opt' },
          { show: 'suf opt-suf', flow: 'opt-suf', hi: 'suf' },
          { show: 'closed suf-closed', flow: 'suf-closed', hi: 'closed', mark: { closed: 'warn' } },
          { show: 'def suf-def', flow: 'suf-def', hi: 'def' } ],
        say: 'The greedy coordinate gradient attack, or GCG, published by Zou and colleagues in 2023, starts with a request that open-weight models refuse. | Using the models’ gradients, it searches token by token for a suffix that makes an affirmative reply more likely, keeping the best swap at each step. | The result is a string that looks like gibberish to people, but reliably changes the models’ behaviour. | Suffixes optimised against several open models often transferred to closed commercial models, which the attacker never had gradients for. Open models can be stepping stones to closed ones. | Defences include perplexity filters, which flag unnatural text, input and output classifiers, and adversarial training. But attacks can be optimised to read naturally too, so no single filter is enough.' },
      { t: 'summary', items: ['Jailbreaks exploit competing objectives or gaps in safety training', 'Test every family, in every language and input channel', 'Suffixes found on open models can transfer to closed ones', 'Report success rates alongside false refusals'],
        say: 'To recap. | Jailbreaks exploit competing objectives, or gaps between a model’s abilities and its safety training. | A test plan covers every family, in every language and input channel the system supports, including whole conversations. | Attacks optimised on open models can transfer to closed ones, so a hosted model isn’t safe just because its weights are secret. | And results are reported as success rates over repeated trials, alongside the false refusals any defence causes.' } ] },
    { type: 'text', md: `### Why safety training fails
Wei, Haghtalab and Steinhardt (2023) traced jailbreaks to two failure modes. With **competing objectives**, the model’s drive to be helpful and follow instructions is set against its safety training, for example by role-play frames or instructions to begin with an affirmative reply. With **mismatched generalisation**, the model’s abilities extend to inputs its safety training never covered, such as encodings, ciphers or low-resource languages. Defences follow from this: safety training as broad as the model’s abilities, plus independent classifiers that don’t share its blind spots.

### Families to cover in a test plan
| Family | How it works | What to test | Typical defences |
|---|---|---|---|
| **Role-play and personas** | A fictional or hypothetical frame seems to permit the request | Persona and scenario variants | Safety training on framed requests; output classifiers |
| **Obfuscation and encoding** | The request is hidden in an encoding, cipher or unusual format | Encoded and transformed variants | Normalise or decode inputs; classify outputs |
| **Low-resource languages** | Translation sidesteps mostly English safety data (Yong et al., 2023) | The same tests in several languages | Multilingual safety data and classifiers |
| **Many-shot** | Hundreds of fabricated dialogues in one long prompt (Anil et al., 2024) | Long-context variants | Prompt classification and modification |
| **Multi-turn escalation** | Gradual steps, each harmless alone, as in Crescendo (Russinovich et al., 2024) | Whole conversations | Conversation-level classifiers and monitoring |
| **Optimised suffixes** | Machine-found strings, as in GCG (Zou et al., 2023) | Automated attack tools | Perplexity filters; classifiers; adversarial training |
| **Payload splitting** | Harmless fragments the model is asked to combine | Split and recombined requests | Output classifiers; intent checks |
| **Multimodal** | Instructions carried in images, documents or audio | Every input channel | Classify extracted text and media |

**Indirect prompt injection** (Greshake et al., 2023) uses the same tricks, delivered through content the system reads, such as web pages, emails and retrieved documents. Tests must plant them in each data source and tool result (Section 2).

### Automated and optimised attacks
- **GCG** (Zou et al., 2023) uses gradients from open-weight models to find a suffix that makes an affirmative reply more likely. Suffixes optimised against several open models transferred to closed commercial models.
- **PAIR** and **TAP** use an attacker model to refine readable jailbreaks, often within a few dozen queries (Section 4).
- **Best-of-N** (Hughes et al., 2024) samples many random variations of a request, such as changes to capitalisation, until one succeeds. Success keeps rising with the number of attempts, so rate limits and monitoring matter.
- **Many-shot** success rises with the number of examples, following a power law. In Anthropic’s study, limiting context length would stop it but sacrifices value, fine-tuning only delayed it, and classifying and modifying prompts before they reached the model cut one attack’s success from 61% to 2%.

### Measuring results
Report the **attack success rate** for each family over repeated trials, because outputs are probabilistic, and pair it with the **false refusal rate** on benign requests, so that a fix that blocks legitimate use is visible. Public benchmarks include **HarmBench** and **JailbreakBench** for jailbreaks and **AgentDojo** for injection against agents. Map findings to **OWASP LLM01:2025 Prompt Injection** and to **MITRE ATLAS** techniques **AML.T0051** (LLM Prompt Injection) and **AML.T0054** (LLM Jailbreak).` },
    { type: 'match', title: 'Spot the family', pairs: [
      ['A request wrapped in a story in which the AI plays a character', 'Role-play'],
      ['The same request, translated into a language with little training data', 'Low-resource language'],
      ['A long prompt with hundreds of fabricated question-and-answer pairs', 'Many-shot'],
      ['A string that looks like gibberish, found by an optimiser', 'Optimised suffix'],
      ['Small steps over a conversation, each building on the last answer', 'Multi-turn escalation'] ] },
    { type: 'steps', title: 'Testing jailbreak resistance', items: [
      ['Choose the families', 'Cover every family in the table, in each language and input channel the system supports, including indirect channels.'],
      ['Define success', 'Agree what counts as a successful attack for this system, with a scoring rubric and worked examples.'],
      ['Repeat the trials', 'Run each test many times and report success rates, because outputs vary from run to run.'],
      ['Measure the cost', 'Run a benign set alongside, to measure the false refusals that defences cause.'],
      ['Retest and track', 'Add successful attacks to the regression suite and track rates release by release (Module 6.6).'] ] },
    { type: 'check', q: { q: 'A researcher used an open-weight model to optimise an adversarial suffix. The team’s application runs on a closed, hosted model from a different provider. What is the MOST accurate assessment?', o: ['The risk is negligible, since nobody can compute the hosted model’s gradients', 'The suffix may still transfer, so the application should be tested against it', 'The provider’s terms of use forbid such attacks, so testing isn’t needed', 'Only models sharing the same architecture and weights could be affected'], a: 1, b: 2,
      why: 'Optimised suffixes have transferred from open models to closed commercial ones, so secret weights don’t make the attack irrelevant. Terms of use don’t stop attackers, and transfer doesn’t require identical architectures or weights.' } }
  ]
};
