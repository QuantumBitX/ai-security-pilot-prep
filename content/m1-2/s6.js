/* 1.2 · Section 6: fine-tuning, LoRA and PEFT */
const T = 'font-family="Archivo, Arial, sans-serif"';
const M = 'font-family="JetBrains Mono, Menlo, monospace"';
module.exports = {
  title: 'Adapting models: fine-tuning, LoRA and PEFT', covers: [4],
  blocks: [
    { type: 'video', title: 'Adapting models', kicker: 'Module 1.2 · Video 6 of 7', scenes: [
      { t: 'title', kicker: 'Module 1.2 · Generative AI', title: 'Adapting models', sub: 'When to fine-tune, how LoRA and PEFT work, and what can go wrong', icon: 'sliders',
        say: 'Sometimes prompting and retrieval are not enough, and an organisation wants to change the model itself. | This video covers when fine-tuning makes sense, how parameter-efficient methods such as LoRA work, and the security risks of adapting a model.' },
      { t: 'compare', title: 'Three ways to adapt a model', cols: [{ h: 'Prompting', icon: 'chat', k: 'neutral' }, { h: 'RAG', icon: 'search', k: 'data' }, { h: 'Fine-tuning', icon: 'sliders', k: 'model' }],
        labels: ['Changes', 'Best for', 'Effort'], rows: [
          ['The instructions', 'The knowledge supplied', 'The model’s weights'],
          ['Behaviour and format', 'Facts that change often', 'Style, skills, specialised tasks'],
          ['Lowest', 'Moderate: a data pipeline', 'Highest: data, compute, evaluation'] ],
        say: 'There are three ways to adapt a model to your needs. | Prompting changes the instructions. RAG changes the knowledge supplied with each request. Fine-tuning changes the model’s weights. | Prompting suits behaviour and format, RAG suits facts that change often, and fine-tuning suits a consistent style, a specialised skill, or a narrow task done at scale. | The effort rises in the same order. Fine-tuning needs good data, compute and careful evaluation, so the usual advice is to try prompting and retrieval first.' },
      { t: 'svg', title: 'How LoRA works',
        svg: `<g data-b="0" ${T}><rect x="120" y="220" width="380" height="380" rx="14" fill="#1A2440" stroke="#67769B" stroke-width="4"/><text x="310" y="400" font-size="44" font-weight="700" fill="#EAEEF6" text-anchor="middle">W</text><text x="310" y="448" font-size="29" fill="#A6B1C8" text-anchor="middle">pretrained weights</text><text x="310" y="650" ${M} font-size="27" fill="#94A4C4" text-anchor="middle">d × d</text></g>
<g data-b="1" ${T}><rect x="120" y="220" width="380" height="380" rx="14" fill="none" stroke="#94A4C4" stroke-width="4" stroke-dasharray="14 10"/><rect x="220" y="500" width="180" height="56" rx="28" fill="#0B1222" stroke="#94A4C4" stroke-width="3"/><text x="310" y="537" font-size="28" font-weight="700" fill="#EAEEF6" text-anchor="middle">frozen</text></g>
<g data-b="2" ${T}><text x="560" y="432" font-size="64" font-weight="300" fill="#A6B1C8" text-anchor="middle">+</text><rect x="612" y="220" width="60" height="380" rx="10" fill="$ACCENT" fill-opacity=".28" stroke="$ACCENT" stroke-width="4"/><text x="642" y="650" font-size="36" font-weight="700" fill="$ACCENT" text-anchor="middle">B</text><text x="725" y="432" font-size="46" fill="#A6B1C8" text-anchor="middle">×</text><rect x="775" y="380" width="380" height="60" rx="10" fill="$ACCENT" fill-opacity=".28" stroke="$ACCENT" stroke-width="4"/><text x="965" y="492" font-size="36" font-weight="700" fill="$ACCENT" text-anchor="middle">A</text><text x="965" y="540" ${M} font-size="26" fill="#A6B1C8" text-anchor="middle">trainable, rank r ≪ d</text></g>
<g data-b="3" ${T}><rect x="1200" y="220" width="360" height="380" rx="16" fill="#0B1222" stroke="$ACCENT" stroke-width="3"/><text x="1230" y="282" font-size="33" font-weight="700" fill="#EAEEF6">Adapted layer</text><text x="1230" y="334" ${M} font-size="34" fill="$ACCENT">W + B×A</text><text x="1230" y="410" font-size="28" fill="#A6B1C8"><tspan x="1230">d = 4,096, r = 8</tspan><tspan x="1230" dy="44">Frozen: 16.8 million</tspan><tspan x="1230" dy="44">Trained: 65,536</tspan><tspan x="1230" dy="44">That is 0.4%</tspan></text></g>
<g data-b="4" ${T}><rect x="120" y="720" width="1440" height="90" rx="16" fill="#0B1222" stroke="#3FD69B" stroke-width="3"/><text x="840" y="777" font-size="33" font-weight="700" fill="#EAEEF6" text-anchor="middle">One base model, many small swappable adapters</text></g>`,
        say: 'Full fine-tuning updates every weight in the model, which for a large model means huge memory and storage costs. | LoRA, short for low-rank adaptation, starts by freezing the original weights. They are not changed at all. | Instead it trains two small matrices, B and A, whose product describes the change. Their inner dimension, the rank, is tiny compared with the size of the original layer. | The small update is added to the frozen weights. For a layer of size four thousand and ninety-six with rank eight, sixteen point eight million weights stay frozen, and only sixty-five thousand are trained. | So one base model can carry many small adapters, one per task, swapped in as needed.' },
      { t: 'bullets', title: 'The parameter-efficient fine-tuning family', layout: 'grid', cols: 2, items: [
          { icon: 'layers', h: 'Adapters', d: 'Small trainable layers inserted into a frozen model', k: 'model' },
          { icon: 'text', h: 'Prompt and prefix tuning', d: 'Learned “soft prompt” vectors, not words', k: 'data' },
          { icon: 'sliders', h: 'LoRA', d: 'Low-rank updates added to frozen weights', k: 'human' },
          { icon: 'memory', h: 'QLoRA', d: 'LoRA on a 4-bit quantised base, to fit one GPU', k: 'control' } ],
        say: 'LoRA belongs to a family called parameter-efficient fine-tuning, or PEFT. | Adapters insert small trainable layers into a frozen model. | Prompt tuning and prefix tuning learn soft prompts, vectors prepended to the input that act like instructions, but are not words. | LoRA learns low-rank updates added to the frozen weights, and is the most widely used. | QLoRA combines LoRA with a base model quantised to four bits, so that large models can be fine-tuned on a single GPU.' },
      { t: 'flow', title: 'A fine-tuning pipeline you can trust',
        nodes: [
          { id: 'base', x: 250, y: 320, icon: 'model', label: 'Verified base model', sub: 'known provenance, checked hash', k: 'model', w: 320 },
          { id: 'data', x: 250, y: 680, icon: 'database', label: 'Curated dataset', sub: 'versioned, scrubbed, licensed', k: 'data', w: 320 },
          { id: 'job', x: 640, y: 490, icon: 'server', label: 'Isolated training job', k: 'neutral', w: 270 },
          { id: 'eval', x: 1000, y: 490, icon: 'audit', label: 'Evaluate', sub: 'task quality and safety regression', k: 'control', w: 310 },
          { id: 'reg', x: 1360, y: 320, icon: 'box', label: 'Registry', sub: 'signed, with lineage', k: 'model', w: 250 },
          { id: 'dep', x: 1360, y: 680, icon: 'cloud', label: 'Staged release', k: 'neutral', w: 250 } ],
        edges: [{ from: 'base', to: 'job', k: 'model' }, { from: 'data', to: 'job', k: 'data' }, { from: 'job', to: 'eval', k: 'model' }, { from: 'eval', to: 'reg', k: 'model' }, { from: 'reg', to: 'dep', k: 'model' }],
        steps: [{}, { show: 'base', hi: 'base', mark: { base: 'ok' } }, { show: 'data', hi: 'data', mark: { data: 'ok' } }, { show: 'job base-job data-job', flow: 'base-job data-job', hi: 'job' }, { show: 'eval job-eval', flow: 'job-eval', hi: 'eval', mark: { eval: 'ok' } }, { show: 'reg eval-reg', flow: 'eval-reg', hi: 'reg', mark: { reg: 'lock' } }, { show: 'dep reg-dep', flow: 'reg-dep', hi: 'dep' }],
        say: 'Fine-tuning needs a pipeline you can trust, end to end. | Start from a verified base model, with known provenance and a checked hash. | Use a curated dataset that is versioned, scrubbed of data it should not contain, and properly licensed. | Train in an isolated job, with access only to what it needs. | Evaluate the result for task quality and for safety regressions, because fine-tuning can weaken a model’s safety behaviour. | Store the approved model in a registry, signed, with its lineage recorded: which base, which data, which settings. | And release it in stages, so problems surface before everyone is affected.' },
      { t: 'bullets', title: 'What can go wrong when you fine-tune', items: [
          { icon: 'shield', h: 'Safety erosion', d: 'Even small, harmless-looking datasets can weaken refusals', k: 'threat' },
          { icon: 'bug', h: 'Poisoning and backdoors', d: 'Bad training examples plant bad behaviour', k: 'threat' },
          { icon: 'eye', h: 'Memorised data', d: 'Sensitive records in training data can resurface', k: 'threat' },
          { icon: 'box', h: 'Untrusted adapters', d: 'Downloaded adapters and model files are supply chain', k: 'threat' } ],
        say: 'Four risks come with fine-tuning. | Safety erosion: research has shown that even small, harmless-looking fine-tuning datasets can weaken a model’s safety behaviour, so safety must be re-tested after every tune. | Poisoning and backdoors: a few malicious examples in the training data can plant behaviour that only appears when a trigger is present. | Memorisation: sensitive records in training data can resurface in outputs, and are hard to remove afterwards. | And untrusted adapters: downloaded adapters and model files are part of your supply chain, and some file formats can even run code when loaded.' },
      { t: 'quiz', q: 'A team wants its assistant to answer questions from product documentation that changes every week. Which approach is MOST appropriate?',
        o: ['Fine-tune the model weekly on the new documentation', 'Use retrieval-augmented generation over the current documentation', 'Increase the model’s temperature', 'Train a new model from scratch each month'], a: 1,
        why: 'Frequently changing facts are what RAG is for: update the index and answers change immediately, with citations. Weekly fine-tuning is costly, slow to correct, and hard to undo.' },
      { t: 'summary', items: [
          'Try prompting and RAG before changing weights',
          'LoRA freezes the base and trains small low-rank matrices',
          'PEFT: adapters, prompt tuning, LoRA, QLoRA',
          'Re-test safety after tuning; track lineage; trust only verified artifacts' ],
        say: 'To recap. | Try prompting and retrieval before changing the weights. | LoRA freezes the base model and trains small low-rank matrices instead. | The PEFT family includes adapters, prompt tuning, LoRA and QLoRA. | And after any tuning, re-test safety, record lineage, and trust only verified artifacts.' }
    ] },
    { type: 'text', md: `### What fine-tuning is

**Fine-tuning** continues training a pretrained model on a smaller, task-specific dataset so that it adapts to a domain, a style or a task. It is a form of transfer learning (Module 1.1). Common purposes include:

- **Instruction tuning**: teaching a base model to follow instructions and converse.
- **Domain adaptation**: improving performance on specialised language, such as legal, medical or security analysis.
- **Task specialisation**: classification, extraction or a consistent output format at high volume.
- **Style and tone**: matching a brand voice consistently without long prompts.
- **Preference tuning**: aligning behaviour with human preferences using RLHF or DPO (Section 1).
- **Distillation**: training a smaller, cheaper model to imitate a larger one.

### When to fine-tune, and when not to

Fine-tuning is the most expensive and least reversible way to adapt a model, so the usual order is:

1. **Prompt engineering** first: clearer instructions, examples and structure.
2. **RAG** when the problem is missing or changing knowledge.
3. **Fine-tuning** when you need behaviour that prompting can’t reliably produce, a narrow task at scale where shorter prompts save money, or a smaller model that matches a larger one on one task.

Fine-tuning is a poor way to add frequently changing facts: knowledge baked into weights can’t be cited, is hard to update, and is very hard to remove.

### Full fine-tuning vs parameter-efficient fine-tuning

**Full fine-tuning** updates every parameter. For large models it needs memory for the weights, gradients and optimiser state, and it produces a complete copy of the model for every variant.

**Parameter-efficient fine-tuning (PEFT)** freezes most or all of the original weights and trains a small number of new parameters:

- **Adapters** insert small trainable layers between the frozen layers.
- **Prompt tuning** and **prefix tuning** learn continuous "soft prompt" vectors that steer the frozen model.
- **LoRA (low-rank adaptation)** represents the weight change for selected layers as the product of two small matrices, B (d × r) and A (r × d), where the rank r is small, often 4 to 64. Only A and B are trained. The update can be kept as a separate adapter file or merged into the base weights for serving. Trainable parameters fall by orders of magnitude, and adapters are typically megabytes rather than gigabytes.
- **QLoRA** loads the frozen base model in 4-bit quantised form and trains LoRA adapters on top, cutting memory enough to fine-tune large models on a single GPU.

PEFT makes fine-tuning cheap enough that many teams, and many attackers, can do it. That is a governance consideration as well as a technical convenience.` },
    { type: 'accordion', title: 'Fine-tuning risks and their controls', items: [
      ['Safety and alignment erosion', `Studies have shown that fine-tuning an aligned model, even on a small dataset with no harmful intent, can weaken its refusals and safety behaviour, and that a small number of deliberately harmful examples can remove safeguards almost entirely. **Controls:** run safety evaluations before and after every fine-tune, gate releases on them, and restrict who can fine-tune and deploy.`],
      ['Training-data poisoning and backdoors', `Malicious examples in fine-tuning data can make the model behave badly on certain inputs, or plant a backdoor that activates on a trigger phrase. **Controls:** curate and version datasets, verify their sources, check for anomalous or duplicated examples, keep a chain of custody (Module 3.1), and test for unexpected behaviours.`],
      ['Memorisation of sensitive data', `Models can memorise and later reproduce personal, confidential or proprietary records from training data, especially rare or repeated ones. **Controls:** minimise and scrub data before training, consider privacy-preserving training techniques (Module 3.2), and test for regurgitation.`],
      ['Unlearning is hard', `Once data shapes the weights, removing its influence is difficult. Honouring an erasure request may mean retraining from a clean dataset. **Controls:** keep lineage records of which data trained which model (Module 4.3), and prefer RAG for content that may need to be removed.`],
      ['Untrusted base models and adapters', `Downloaded base models, LoRA adapters and checkpoints are supply-chain artifacts. Some serialisation formats can execute code when a file is loaded. **Controls:** use trusted sources, verify hashes and signatures, prefer formats that store only weights, and scan model files before loading (Modules 3.7 and 6.3).`],
      ['Provider fine-tuning services', `Fine-tuning through a provider’s API means sending training data to that provider. **Controls:** check contract terms on retention, training use and location, and apply data classification rules before upload.`] ] },
    { type: 'flip', title: 'Fine-tuning terms', cards: [
      ['Fine-tuning', 'Continuing to train a pretrained model on task-specific data to adapt its behaviour.'],
      ['PEFT', 'Parameter-efficient fine-tuning: adapting a model by training a small set of new parameters while freezing the rest.'],
      ['LoRA', 'Low-rank adaptation: learning weight changes as the product of two small matrices added to frozen weights.'],
      ['QLoRA', 'LoRA applied on top of a 4-bit quantised base model, reducing memory needs further.'],
      ['Adapter', 'A small set of trained parameters that modifies a frozen base model for a task.'],
      ['Model lineage', 'The recorded history of a model: base model, datasets, settings, evaluations and approvals.'] ] },
    { type: 'callout', kind: 'exam', title: 'Pick the lightest adaptation that meets the need', md: `Exam scenarios often describe a requirement and offer prompting, RAG, fine-tuning and training from scratch as options. Choose the least costly, most reversible option that genuinely meets the requirement. Changing facts point to RAG; a fixed output style at scale may justify fine-tuning; training from scratch is almost never the answer for an enterprise.` },
    { type: 'scenario', title: 'The helpful but careless fine-tune', md: `A team fine-tunes an open-weight model on 5,000 internal support transcripts using LoRA, to make it sound like their support staff. Task quality improves. A week after release, a tester finds the tuned model now answers requests the original model reliably refused.`,
      q: { q: 'Which control would MOST likely have caught this before release?', o: ['Using a higher LoRA rank so the adapter preserves more of the base model’s behaviour', 'Running the same safety evaluations on the base and tuned models, and gating release on the result', 'Merging the adapter into the base weights before deployment so that the original safety training is restored', 'Training for more epochs on the same data so the model converges to more stable behaviour'], a: 1, b: 4,
        why: 'Fine-tuning can erode safety behaviour even with benign data. Comparing safety evaluations before and after tuning, and blocking release on regressions, would have exposed the change. Rank, merging and epochs don’t address safety testing.' } }
  ]
};
