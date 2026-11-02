/* 1.3 · Section 5: evaluating generative AI and benchmarks */
module.exports = {
  title: 'Evaluating generative AI: metrics and benchmarks', covers: [4],
  blocks: [
    { type: 'video', title: 'Evaluating generative AI', kicker: 'Module 1.3 · Video 5 of 6', scenes: [
      { t: 'title', kicker: 'Module 1.3 · Limitations and performance', title: 'Evaluating generative AI', sub: 'Automatic metrics, model judges, people and benchmarks', icon: 'audit',
        say: 'A classifier is right or wrong. A generated answer can be correct, partly correct, unsafe, unfaithful to its sources, or simply unhelpful. | This video covers how generative AI is evaluated, what benchmarks can and can’t tell you, and how security evaluation differs.' },
      { t: 'bullets', title: 'Why generative output is hard to score', items: [
          { icon: 'branch', h: 'Many right answers', d: 'Two very different summaries can both be correct', k: 'model' },
          { icon: 'layers', h: 'Many dimensions', d: 'Correct, grounded, safe, helpful, well formatted', k: 'data' },
          { icon: 'dice', h: 'Variable output', d: 'The same test can pass on one run and fail on the next', k: 'human' },
          { icon: 'pen', h: 'Sensitive to wording', d: 'A small prompt change can shift results', k: 'neutral' } ],
        say: 'Generative output is hard to score for four reasons. | There are many right answers. Two summaries can use completely different words and both be excellent. | Quality has many dimensions: correctness, faithfulness to sources, safety, helpfulness and format. | Output varies from run to run, so one test run proves little. | And results are sensitive to wording: rephrase the prompt slightly, and scores can move.' },
      { t: 'compare', title: 'Three ways to evaluate', labels: ['How it works', 'Strength', 'Weakness'],
        cols: [{ h: 'Automatic metrics', icon: 'gear', k: 'neutral' }, { h: 'Model as judge', icon: 'scale', k: 'model' }, { h: 'Human review', icon: 'users', k: 'human' }],
        rows: [
          ['Compare output to a reference, or run tests', 'A strong model scores output against a rubric', 'Experts rate or compare outputs'],
          ['Cheap, fast, repeatable', 'Scales, and captures meaning', 'The best judge of real quality'],
          ['Misses meaning; rewards word overlap', 'Biased, and can itself be manipulated', 'Slow, costly and inconsistent'] ],
        say: 'There are three broad ways to evaluate generative output. | Automatic metrics compare output with a reference answer, or run objective tests. A model as judge uses a strong language model to score outputs against a rubric. Human review uses experts to rate or compare outputs. | Automatic metrics are cheap and repeatable. Model judges scale well and capture meaning. Human review remains the best judge of real-world quality. | But automatic metrics miss meaning and reward word overlap. Model judges have biases, such as favouring longer answers, and can be manipulated by text in the output they grade. And human review is slow, costly and inconsistent between reviewers. Mature teams combine all three.' },
      { t: 'bullets', title: 'Common automatic metrics', layout: 'grid', cols: 2, items: [
          { icon: 'check', h: 'Exact match and F1', d: 'Short factual answers compared with a reference', k: 'control' },
          { icon: 'text', h: 'BLEU and ROUGE', d: 'Word overlap for translation and summarisation', k: 'data' },
          { icon: 'code', h: 'pass@k', d: 'Chance that at least one of k code samples passes the tests', k: 'model' },
          { icon: 'chart', h: 'Perplexity', d: 'How well a model predicts text: lower is better', k: 'neutral' } ],
        say: 'You will meet a handful of automatic metrics. | Exact match and token-level F1 compare short factual answers with a reference. | BLEU and ROUGE measure word overlap with reference text, BLEU traditionally for translation and ROUGE for summarisation. | pass at k, used for code, is the probability that at least one of k generated samples passes the unit tests. | And perplexity measures how well a model predicts a sample of text. Lower is better, but it says nothing about whether answers are true or safe.' },
      { t: 'bullets', title: 'Evaluating a RAG system', items: [
          { icon: 'search', h: 'Retrieval quality', d: 'Did it fetch the passages that contain the answer?', k: 'data' },
          { icon: 'doc', h: 'Faithfulness', d: 'Is every claim supported by the retrieved passages?', k: 'control' },
          { icon: 'target', h: 'Answer relevance', d: 'Does it actually answer the question asked?', k: 'human' },
          { icon: 'stop', h: 'Correct abstention', d: 'Does it decline when the sources don’t say?', k: 'model' } ],
        say: 'RAG systems need their own measures, because failures can happen at each stage. | Retrieval quality asks whether the system fetched the passages that actually contain the answer. | Faithfulness, sometimes called groundedness, asks whether every claim in the answer is supported by those passages. | Answer relevance asks whether the response actually addresses the question. | And correct abstention asks whether the system says it doesn’t know when the sources don’t contain the answer. Measuring these separately tells you whether to fix retrieval or generation.' },
      { t: 'bullets', title: 'Why benchmark scores mislead', items: [
          { icon: 'drop', h: 'Contamination', d: 'Test questions leaked into the training data', k: 'threat' },
          { icon: 'bars', h: 'Saturation', d: 'Top models all score near the ceiling', k: 'neutral' },
          { icon: 'target', h: 'Goodhart’s law', d: 'A measure that becomes a target stops measuring', k: 'human' },
          { icon: 'puzzle', h: 'Not your task', d: 'Your data, users and risks aren’t in the benchmark', k: 'data' } ],
        say: 'Public benchmarks, such as MMLU for broad knowledge, HumanEval for code and TruthfulQA for resisting popular misconceptions, let you compare models. But treat the scores with care. | Contamination happens when benchmark questions end up in the training data, so the model has effectively seen the exam paper. | Saturation means the best models all score near the ceiling, so the benchmark no longer separates them. | Goodhart’s law applies: when a measure becomes a target, developers optimise for the benchmark rather than the capability. | And no public benchmark contains your data, your users or your risks. Always evaluate on your own representative test set.' },
      { t: 'bullets', title: 'Evaluating security and safety', items: [
          { icon: 'attacker', h: 'Attack success rate', d: 'Share of adversarial attempts that succeed', k: 'threat' },
          { icon: 'scale', h: 'Refusal balance', d: 'Refuses what it should, without over-refusing', k: 'model' },
          { icon: 'lock', h: 'Leakage tests', d: 'System prompt, personal data, other tenants’ data', k: 'data' },
          { icon: 'wave', h: 'Robustness', d: 'Paraphrases, typos, other languages, long inputs', k: 'neutral' },
          { icon: 'cycle', h: 'Repeat every test', d: 'Report rates over many runs, not a single pass', k: 'control' } ],
        say: 'Security and safety evaluation asks different questions. | Attack success rate is the share of adversarial attempts, such as injection or jailbreak attempts from a test library, that succeed. | Refusal balance checks that the system refuses harmful requests, without over-refusing legitimate ones, which pushes users towards unsanctioned tools. | Leakage tests check that system prompts, personal data and other tenants’ data stay protected. | Robustness tests repeat the same intent with paraphrases, typos, other languages and very long inputs. | And because output varies, every test is repeated, and results are reported as rates over many runs.' },
      { t: 'summary', items: ['Generative quality has many dimensions', 'Combine automatic metrics, model judges and people', 'RAG: retrieval, faithfulness, relevance, abstention', 'Benchmarks compare models; your own tests decide'],
        say: 'To recap. | Generative quality has many dimensions, so no single score is enough. | Combine automatic metrics, model judges and human review, each where it is strongest. | Evaluate RAG systems stage by stage: retrieval, faithfulness, relevance and abstention. | And use public benchmarks to shortlist models, but let evaluation on your own data, including adversarial tests, make the decision.' } ] },
    { type: 'text', md: `### Three families of evaluation
**Automatic, reference-based metrics** compare output with one or more reference answers.
- **Exact match** and token-level **F1** suit short factual answers.
- **BLEU** (translation) and **ROUGE** (summarisation) count overlapping words and phrases with a reference. They are cheap and repeatable but reward surface similarity: a fluent paraphrase can score badly, and a wrong answer that reuses the reference’s words can score well.
- **Embedding-based similarity** (for example, BERTScore) compares meaning rather than exact words.
- **pass@k** runs generated code against unit tests and estimates the probability that at least one of *k* samples passes. Objective tests like these are the most trustworthy automatic measures where they exist.
- **Perplexity** measures how well a model predicts held-out text. It is useful when training models but says nothing about truth, safety or helpfulness.

**Model-graded evaluation (LLM as a judge)** asks a strong model to score outputs against a rubric, or to choose the better of two outputs. It scales to thousands of cases and captures meaning, but it has known biases:
- **position bias** (favouring the first or second option),
- **verbosity bias** (favouring longer answers),
- **self-preference** (favouring outputs from its own model family),
- and susceptibility to **manipulation**: text inside the output being graded can try to instruct the judge.

Mitigations include clear rubrics, swapping the order of options, using a different model family as the judge, isolating graded content from judge instructions, and **calibrating the judge against a sample of human ratings**.

**Human evaluation** uses experts or representative users to rate outputs or compare pairs. It remains the reference standard for quality, but it is slow and costly, and raters disagree. Good practice is to write clear guidelines, use several raters and measure their agreement.

### Benchmarks
| Benchmark | What it tests |
|---|---|
| **MMLU** | Multiple-choice knowledge across 57 subjects, from law to physics |
| **HumanEval** | Writing Python functions that pass unit tests (scored with pass@k) |
| **TruthfulQA** | Avoiding false answers that mimic popular misconceptions |
| **GSM8K** | Multi-step grade-school maths word problems |
| **HELM** | A holistic framework reporting many metrics (accuracy, calibration, robustness, fairness, toxicity, efficiency) across many scenarios |
| **Crowdsourced arenas** | People compare two anonymous models’ answers; ratings are computed from many pairwise votes |

Benchmarks are useful for shortlisting models and tracking progress, but they mislead in predictable ways:
- **Contamination:** benchmark items are published online and can leak into training data, inflating scores.
- **Saturation:** when leading models all score near the maximum, the benchmark stops discriminating, and harder successors replace it.
- **Goodhart’s law:** optimising for a benchmark can improve the score without improving the underlying capability.
- **Relevance:** your users, data, languages and threats are not in the benchmark.

### Evaluating in your own context
A sound evaluation programme for a generative AI application usually includes:
1. **A golden dataset:** representative questions with approved answers or rubrics, drawn from real use.
2. **Edge cases:** unanswerable questions, outdated information, ambiguous requests and multiple languages.
3. **Adversarial cases:** prompt injection, jailbreak attempts, data-extraction attempts and harmful requests, drawn from maintained test libraries.
4. **Over-refusal cases:** legitimate requests that look superficially risky, to check the system doesn’t refuse them.
5. **Repeated runs:** each case run several times, with results reported as rates.
6. **Regression discipline:** the suite re-runs on every change of model, prompt, retrieval configuration or guardrail, and on a schedule.

This is the **Measure** function of the NIST AI RMF in practice: defining metrics, testing before deployment, and continuing to measure in production.`, },
    { type: 'match', title: 'Match the metric to its use', pairs: [
      ['pass@k', 'Generated code checked by unit tests'],
      ['ROUGE', 'Overlap between a summary and a reference summary'],
      ['Faithfulness (groundedness)', 'Whether a RAG answer’s claims are supported by retrieved passages'],
      ['Attack success rate', 'Share of adversarial attempts that achieve their goal'],
      ['Perplexity', 'How well a model predicts held-out text'] ] },
    { type: 'accordion', title: 'Pitfalls when a model grades another model', items: [
      ['Position and verbosity bias', 'Judges tend to favour whichever answer appears in a particular position, and longer answers. Swap the order and average the results, and penalise padding in the rubric.'],
      ['Self-preference', 'Judges may favour outputs from their own model family. Use a judge from a different family for comparisons between vendors.'],
      ['Manipulation through the graded output', 'An output can contain text aimed at the judge, such as a claim that it deserves full marks. Keep graded content clearly separated from the judge’s instructions, and spot-check high scores.'],
      ['Drift in the judge', 'If the judge model is updated, scores change even though the system under test did not. Pin the judge’s version and re-calibrate against human ratings when it changes.'] ] },
    { type: 'check', q: { q: 'A vendor says its model is “state of the art” because it tops a well-known public benchmark. What is the BEST next step before choosing it for your customer-service assistant?', o: ['Accept the claim, because public benchmarks are run independently and so can’t be inflated by the vendor', 'Test it on your own representative and adversarial cases, since public scores can be inflated by contamination', 'Choose whichever model has the highest perplexity on the benchmark, since that measures its confidence', 'Ask the vendor for a second, independent public benchmark score, and choose the model if the two results agree'], a: 1, b: 4,
      why: 'Public benchmarks help shortlist models, but contamination, saturation and Goodhart effects can inflate scores, and none reflect your data, users or threats. Your own evaluation decides.' } }
  ]
};
