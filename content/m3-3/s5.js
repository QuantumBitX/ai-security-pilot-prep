/* 3.3 · Section 5: recursive training data security and synthetic data trustworthiness */
module.exports = {
  title: 'Recursive training and synthetic data trust', covers: [5],
  blocks: [
    { type: 'video', title: 'Training on AI’s own output', kicker: 'Module 3.3 · Video 5 of 5', scenes: [
      { t: 'title', kicker: 'Module 3.3 · Training data security', title: 'Training on AI’s own output', sub: 'Recursive training risks and trustworthy synthetic data', icon: 'cycle',
        say: 'More and more training data is produced by AI: synthetic datasets, distilled outputs and AI-written web content. Training on it creates feedback loops. | This video covers the security risks of recursive training, and how to judge whether synthetic data can be trusted.' },
      { t: 'cycle', title: 'The recursive training loop', center: 'Feedback', centerSub: 'each model shapes the next', intro: 'Errors and flaws can compound with every turn.',
        stages: [
          { icon: 'model', label: 'Model generates', d: 'Text, code, images and labels.' },
          { icon: 'globe', label: 'Content spreads', d: 'Published online or stored internally.' },
          { icon: 'database', label: 'Collected again', d: 'Scraped or reused as training data.' },
          { icon: 'gpu', label: 'Next model trains', d: 'Inherits patterns, errors and flaws.' } ],
        say: 'Here is the loop. | A model generates content: text, code, images or labels. | That content spreads: published online, or stored in internal systems. | It is collected again, scraped from the web or reused as training data. | And the next model trains on it, inheriting its patterns, its errors and its flaws. | Each turn of the loop can compound problems, unless you break it deliberately.' },
      { t: 'bullets', title: 'Security risks of recursion', items: [
          { icon: 'layers', h: 'Model collapse', d: 'Rare cases and diversity disappear', k: 'model' },
          { icon: 'scale', h: 'Amplified errors and bias', d: 'Mistakes start to look like facts', k: 'human' },
          { icon: 'alert', h: 'Inherited flaws', d: 'Hidden traits pass to new models', k: 'threat' },
          { icon: 'cycle', h: 'Reward loops', d: 'AI judges and AI data share blind spots', k: 'data' },
          { icon: 'eye', h: 'Lost provenance', d: 'Human and synthetic data become inseparable', k: 'neutral' } ],
        say: 'Recursion creates five security risks. | Model collapse: each generation loses rare cases and diversity, as you saw in Module one point three. | Amplified errors and bias: mistakes repeated across generations start to look like established facts. | Inherited flaws: research in twenty twenty-five found that a model trained on another model’s outputs, even number sequences, could pick up that model’s hidden traits after the data was filtered, when the two shared the same base model. | Reward loops: when AI judges score AI-generated data, the two can reinforce each other’s blind spots. | And lost provenance: once synthetic and human data are mixed without labels, you can’t separate them again.' },
      { t: 'flow', title: 'Breaking the loop safely',
        nodes: [
          { id: 'tag', x: 230, y: 330, icon: 'tag', label: 'Tag at creation', sub: 'provenance metadata, watermarks', k: 'data', w: 310 },
          { id: 'filt', x: 640, y: 330, icon: 'filter', label: 'Filter intake', sub: 'detect AI content in scraped data', k: 'control', w: 320 },
          { id: 'mix', x: 1040, y: 330, icon: 'sliders', label: 'Cap and accumulate', sub: 'limit synthetic share; keep real data', k: 'model', w: 330 },
          { id: 'val', x: 1380, y: 330, icon: 'check', label: 'Validate', sub: 'fidelity, privacy, bias', k: 'human', w: 250 },
          { id: 'eval', x: 1040, y: 690, icon: 'search', label: 'Human-curated tests', sub: 'fresh, held-out evaluation sets', k: 'neutral', w: 330 } ],
        edges: [{ from: 'tag', to: 'filt', k: 'data' }, { from: 'filt', to: 'mix', k: 'control' }, { from: 'mix', to: 'val', k: 'model' }, { from: 'val', to: 'eval', k: 'human' }],
        steps: [
          { show: 'tag', hi: 'tag' },
          { show: 'filt tag-filt', flow: 'tag-filt', hi: 'filt' },
          { show: 'mix filt-mix', flow: 'filt-mix', hi: 'mix' },
          { show: 'val mix-val', flow: 'mix-val', hi: 'val' },
          { show: 'eval val-eval', flow: 'val-eval', hi: 'eval', mark: { eval: 'ok' } } ],
        say: 'You can break the loop safely. Tag synthetic data when it is created, with provenance metadata and, where available, watermarks. | Filter what comes in: detect and label AI-generated content in scraped data, accepting that detection is imperfect. | Cap the synthetic share of any training set, and accumulate genuine human data rather than replacing it. Research shows that accumulating real data alongside synthetic data avoids collapse. | Validate synthetic data for fidelity, privacy, bias and coverage of rare cases. | And evaluate every model on fresh, human-curated test sets that no model has generated or seen.' },
      { t: 'compare', title: 'Can you trust this synthetic dataset?', labels: ['Provenance', 'Fidelity', 'Privacy', 'Labelling'],
        cols: [{ h: 'Trust signals', icon: 'check', k: 'control' }, { h: 'Warning signs', icon: 'alert', k: 'threat' }],
        rows: [
          ['Generator, version, seed data recorded', 'Unknown generator or seed data'],
          ['Matches real data, rare cases included', 'Smooth and average; edge cases missing'],
          ['Tested for copies of real records', 'Near-duplicates of real people'],
          ['Every record marked synthetic', 'Mixed with real data, unlabelled'] ],
        say: 'Before trusting a synthetic dataset, look for four things. | Provenance: the generator, its version and the seed data are recorded. A dataset from an unknown generator is a warning sign. | Fidelity: it matches the real data’s distribution, including rare cases. Data that looks too smooth and average has lost the cases that matter most for security. | Privacy: it has been tested for copies of real records. Near-duplicates of real people mean the generator memorised its seed data. | Labelling: every record is marked as synthetic. Unlabelled synthetic data mixed with real data can’t be controlled later.' },
      { t: 'summary', items: ['Recursive training compounds errors, bias and hidden flaws', 'Filtering content alone may not remove inherited traits', 'Tag, filter, cap, accumulate real data, validate', 'Evaluate on fresh, human-curated test sets'],
        say: 'To recap. | Recursive training compounds errors, bias and hidden flaws. | Filtering the content alone may not remove traits inherited from the generating model. | So tag synthetic data, filter intake, cap its share, keep accumulating real data, and validate. | And evaluate every model on fresh, human-curated test sets.' } ] },
    { type: 'text', md: `### Recursive training risks
- **Model collapse:** models trained repeatedly on their predecessors’ outputs lose the tails of the distribution and drift towards bland, error-prone outputs (Shumailov and colleagues, *Nature*, 2024). Later studies found that collapse is avoided when real data **accumulates** alongside synthetic data rather than being replaced (2024).
- **Web contamination:** a growing share of online text and images is AI-generated, so scraped datasets increasingly contain synthetic content, sometimes including errors or deliberately manipulative material.
- **Distillation and inherited flaws:** student models trained on a teacher’s outputs inherit its behaviour, including biases and potentially backdoors. The 2025 **subliminal learning** research found that traits could transfer through semantically unrelated data, such as number sequences, even after filtering, when teacher and student shared the same base model. The implication: content filtering alone may not make model-generated data safe, so the provenance and evaluation of the generating model matter.
- **Feedback and reward loops:** using AI judges to score or filter AI-generated data can reinforce shared blind spots and reward hacking, so calibrate judges against human ratings.
- **Poison propagation:** a poisoned model that generates training data for other models spreads its flaws downstream.

### Judging synthetic data
| Dimension | Questions | Evidence |
|---|---|---|
| **Provenance** | Which generator, version, prompts or parameters, and seed data? | Recorded metadata; generator vetted and evaluated |
| **Fidelity and utility** | Does it preserve distributions, correlations and rare cases? Does a model trained on it perform on real test data? | Statistical comparisons; train-on-synthetic, test-on-real results |
| **Privacy** | Does it reproduce real records? | Near-duplicate and membership inference tests; differentially private generation where needed |
| **Bias** | Does it amplify or introduce bias? | Fairness metrics compared with real data |
| **Labelling and control** | Is it marked as synthetic, with limits on its share? | Record-level flags, dataset cards, mixing ratios |

### Controls
- Tag synthetic content at creation (metadata, C2PA content credentials for media, watermarks where available), and keep the tags through every pipeline.
- Detect and label AI-generated content in scraped data, knowing that detectors miss some synthetic content and wrongly flag some human content.
- Cap synthetic proportions, and keep and grow genuine human data.
- Vet generator models as you would any supplier: provenance, safety evaluations and known issues.
- Maintain held-out, human-curated evaluation sets, refreshed periodically and never generated by the models under test.
- Document synthetic content in dataset cards and model documentation; providers of general-purpose AI models in the EU must also publish a summary of their training content.` },
    { type: 'scenario', title: 'The cheap synthetic shortcut', md: `A team plans to fine-tune its support model on two million conversations generated by a larger model from another vendor, filtered for quality by an AI judge. To save storage, it will delete its original human transcripts.`,
      q: { q: 'What is the BEST advice?', o: ['Proceed, because the AI judge filters out any low-quality or unsafe conversations before training', 'Keep the human transcripts, record generator provenance, cap and label synthetic data, and test on human-curated sets', 'Proceed, but generate the conversations with a smaller model instead, to reduce the risk of memorising real customers', 'Replace the AI judge with a second judge from a different vendor, to remove any shared blind spots'], a: 1, b: 5,
        why: 'Deleting human data invites collapse, an unvetted generator can pass on flaws that filtering misses, and AI judges share blind spots with AI data. Accumulating real data, recording provenance, limiting and labelling synthetic data, and testing on human-curated sets address all three.' } },
    { type: 'callout', kind: 'exam', title: 'Synthetic data is not automatically safe', md: `Expect distractors claiming that synthetic data is **automatically private, unbiased or safe to use without limit**. Strong answers **record provenance, validate fidelity, privacy and bias, label synthetic records, cap their share, keep real data** and **evaluate on human-curated sets**.` },
    { type: 'check', q: { q: 'Why might filtering model-generated training data for unwanted content NOT be enough to make it safe?', o: ['Filters always remove too much useful data, so the new model ends up undertrained on real cases', 'Research found traits can pass through data with no obvious link to them, when models share a base', 'Filtered data can no longer be labelled as synthetic, so its provenance is lost during filtering', 'Filtering works only on images and audio, so text-based training data can’t be filtered at all'], a: 1, b: 5,
      why: 'The 2025 subliminal learning research showed hidden traits transferring through filtered, semantically unrelated data when teacher and student shared a base model. Provenance and evaluation of the generating model matter, not just content filtering.' } }
  ]
};
