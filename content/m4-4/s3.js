/* 4.4 · Section 3: functional, performance and load testing */
module.exports = {
  title: 'Functional, performance and load testing for AI systems', covers: [3],
  blocks: [
    { type: 'video', title: 'Testing systems that don’t repeat themselves', kicker: 'Module 4.4 · Video 3 of 4', scenes: [
      { t: 'title', kicker: 'Module 4.4 · Guardrails and testing', title: 'Testing systems that don’t repeat themselves', sub: 'Functional, performance and load testing', icon: 'check',
        say: 'Traditional tests expect the same input to give the same output. AI systems give different answers each time, slow down unpredictably under load, and cost money per request. | This video covers functional, performance and load testing adapted for AI systems.' },
      { t: 'bullets', title: 'Functional testing for AI', layout: 'grid', cols: 2, items: [
          { icon: 'book', h: 'Evaluation sets', d: 'Representative cases with expected behaviour', k: 'data' },
          { icon: 'chart', h: 'Metrics, not exact matches', d: 'Accuracy, groundedness, task success', k: 'model' },
          { icon: 'dice', h: 'Repeat to handle randomness', d: 'Pass rates over many runs', k: 'neutral' },
          { icon: 'cycle', h: 'Regression on every change', d: 'Model, prompt, retrieval, guardrails', k: 'human' },
          { icon: 'shield', h: 'Security behaviour tests', d: 'Blocks bad inputs, allows good ones', k: 'threat' },
          { icon: 'scale', h: 'Calibrated judges', d: 'Model graders checked against people', k: 'control' } ],
        say: 'Functional testing for AI needs six adaptations. | Build evaluation sets: representative cases with the expected behaviour, including edge cases. | Score with metrics rather than exact matches: accuracy, groundedness, task success. | Run tests many times and measure pass rates, because outputs vary. | Run the full regression suite on every change: model, prompt, retrieval index or guardrail. | Include security behaviour tests: does the system block known-bad inputs and still allow good ones? | And if a model grades the outputs, calibrate it against human judgement first.' },
      { t: 'chart', title: 'Latency is a distribution, not a number', kind: 'line', x: ['p50', 'p75', 'p90', 'p95', 'p99'], yMin: 0, yMax: 12, ticks: 4, unit: 's', yLabel: 'Illustrative response time by percentile', legend: true,
        series: [
          { n: 'Normal load', k: 'control', v: [1.4, 1.9, 2.6, 3.2, 4.8] },
          { n: 'Peak load', k: 'threat', v: [2.1, 3.0, 4.9, 6.8, 11.2] } ],
        steps: [{ s: [0] }, { s: [1] }, {}],
        say: 'Performance targets must describe the whole distribution. In this illustrative chart, half of requests complete within about one and a half seconds under normal load, but the slowest one per cent take nearly five. | Under peak load, the median barely moves, but the tail explodes: the slowest one per cent take over eleven seconds. | So set targets on high percentiles, such as the ninety-fifth and ninety-ninth, and measure time to first token and throughput as well as total time.' },
      { t: 'compare', title: 'Performance and load tests', labels: ['Question', 'Measures', 'Watch for'],
        cols: [{ h: 'Performance', icon: 'clock', k: 'data' }, { h: 'Load', icon: 'users', k: 'human' }],
        rows: [
          ['How fast is it?', 'Does it hold up at expected volume?'],
          ['Latency percentiles, tokens per second', 'Throughput, errors, queueing, scaling'],
          ['Long prompts and outputs', 'Realistic traffic mix and token sizes'] ],
        say: 'Performance and load testing answer different questions. | Performance testing asks how fast the system is for a single user. Load testing asks whether it holds up at the expected volume. | Performance tests measure latency percentiles and tokens per second. Load tests measure throughput, error rates, queueing and how autoscaling behaves. | And both must use realistic inputs: long prompts and long outputs cost far more than short ones, so a load test with tiny prompts proves very little.' },
      { t: 'bullets', title: 'Making tests trustworthy', items: [
          { icon: 'lock', h: 'No production personal data', d: 'Synthetic or masked test sets', k: 'control' },
          { icon: 'hash', h: 'Version the test sets', d: 'Pinned, reviewed, protected', k: 'data' },
          { icon: 'eye', h: 'Guard against contamination', d: 'Keep test cases out of training', k: 'threat' },
          { icon: 'gavel', h: 'Thresholds agreed in advance', d: 'Linked to release gates', k: 'human' },
          { icon: 'money', h: 'Budget the cost', d: 'Large test runs are expensive', k: 'neutral' } ],
        say: 'Tests are only useful if they can be trusted. | Don’t use production personal data in test sets; use synthetic or properly masked data. | Version test sets, pinned and protected, with changes reviewed like code. | Guard against contamination: if test cases leak into training data, scores become meaningless. | Agree pass thresholds in advance, and link them to the release gates. | And budget for cost, because running large evaluation suites against large models is expensive.' },
      { t: 'summary', items: ['Evaluate with metrics over many runs, not exact matches', 'Regression-test every change to model, prompt, retrieval or guardrails', 'Target tail latency, time to first token and throughput', 'Load-test with realistic traffic and token sizes'],
        say: 'To recap. | Evaluate AI behaviour with metrics measured over many runs, not exact matches. | Regression-test every change to the model, prompt, retrieval or guardrails. | Set performance targets on tail latency, time to first token and throughput. | And load-test with realistic traffic and realistic token sizes.' } ] },
    { type: 'text', md: `### Functional testing
| Practice | Details |
|---|---|
| **Evaluation sets** | Curated inputs with expected behaviour or reference answers, covering typical cases, edge cases, multilingual inputs and known failure modes; versioned and access-controlled |
| **Metrics** | Task-specific: accuracy and F1 for classification; groundedness, citation accuracy and answer relevance for RAG; task completion and tool-call correctness for agents |
| **Non-determinism** | Run each case several times; use pass-rate thresholds; fix temperature or seeds where the platform allows, while also testing production settings |
| **Regression** | Any change to the model version, prompts, retrieval index, embedding model, tools or guardrails triggers the suite (Module 4.3) |
| **LLM-as-judge** | Model-based grading scales evaluation; calibrate it against human ratings, keep the judge model pinned, and watch for bias towards longer or more confident answers |
| **Security behaviour** | Guardrail tests with known-bad prompts (from red teaming and public jailbreak and injection datasets) and known-good prompts, reporting both false negatives and false positives |
| **Fairness and safety** | Disaggregated metrics by group, and safety benchmark suites relevant to the use case (Module 3.5) |

### Performance testing
- **Latency:** time to first token (what users feel), total response time, and percentiles (p50, p95, p99), because tail latency drives user experience and timeouts.
- **Throughput:** requests and tokens per second per instance, and how it changes with batch size and context length.
- **Cost per request**, especially for long contexts and multi-step agents.
- **Guardrail overhead:** measure each check’s added latency (Module 4.1).

### Load testing
- Model **realistic traffic**: the mix of request types, prompt and output lengths, concurrency, and daily or seasonal peaks.
- Observe **queueing, autoscaling, rate limiting and quota behaviour**, GPU memory pressure (key-value caches grow with context length), and error rates.
- Include **dependencies**: model provider rate limits, vector databases, tool APIs.
- Run against **production-like environments**, with care for cost and provider limits; coordinate with hosted providers before large tests.
- Compare results to **SLOs** and capacity plans (Module 4.2).

### Trustworthy test data
Use synthetic or masked data rather than production personal data; protect and version test sets; keep evaluation data out of training to avoid **contamination** (Module 1.3); and record test results as evidence for release gates (Module 4.3).` },
    { type: 'callout', kind: 'exam', title: 'Testing questions', md: `For AI, good answers mention **evaluation sets and metrics** rather than exact-match tests, **repeated runs** for non-determinism, **regression on every change**, and **realistic load** including long prompts. Testing guardrails means measuring **both** missed attacks and wrongly blocked legitimate requests.` },
    { type: 'flip', title: 'Testing vocabulary', cards: [
      ['Evaluation set', 'Versioned test inputs with expected behaviour or reference answers, covering typical and edge cases.'],
      ['Pass rate', 'The share of repeated runs that meet the criteria, used because outputs vary.'],
      ['p95 latency', 'The response time that 95% of requests beat; the slowest 5% take longer.'],
      ['Time to first token', 'The wait before a streamed answer starts to appear, which is what users feel.'],
      ['Contamination', 'Test cases leaking into training data, which makes scores meaningless.'] ] },
    { type: 'check', q: { q: 'A team swaps its chatbot to a newer model version that scores higher on public benchmarks. What should happen before the change reaches users?', o: ['Nothing further, because the new version scores higher on public benchmarks', 'Run the system’s own regression, safety and guardrail suites against the new version', 'Ask a few colleagues to chat with it for an hour and report any problems they notice', 'Deploy it to everyone, and roll back if the number of complaints increases'], a: 1, b: 3,
      why: 'Public benchmarks don’t measure your prompts, data, guardrails or use case. The system’s own regression, safety and guardrail tests, with agreed thresholds, show whether the new version is fit. Informal chats and complaint-driven rollback leave users to find the problems.' } }
  ]
};
