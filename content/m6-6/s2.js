/* 6.6 · Section 2: filtering, sandboxing, rate limiting and watermarking */
module.exports = {
  title: 'Filtering, sandboxing, rate limiting and watermarking', covers: [2],
  blocks: [
    { type: 'video', title: 'Four everyday controls', kicker: 'Module 6.6 · Video 2 of 6', scenes: [
      { t: 'title', kicker: 'Module 6.6 · Mitigations', title: 'Four everyday controls', sub: 'Filtering, sandboxing, rate limiting and watermarking', icon: 'shield',
        say: 'Four controls turn up in almost every AI mitigation plan: filtering, sandboxing, rate limiting and watermarking. Each is familiar, each needs adapting for AI, and each fails in predictable ways if it is set up carelessly. | This video covers what each control stops, where it sits, and how to tune it.' },
      { t: 'compare', title: 'What each control does', labels: ['Filtering', 'Sandboxing', 'Rate limiting', 'Watermarking'],
        cols: [{ h: 'Stops or reduces', icon: 'shieldcheck', k: 'control' }, { h: 'Watch out for', icon: 'alert', k: 'threat' }],
        rows: [
          ['Harmful, injected or sensitive content', 'Evasion, false positives, added latency'],
          ['Damage from code and tools that misbehave', 'Escapes, and permissions that are too broad'],
          ['Floods, extraction and runaway costs', 'Distributed attackers; legitimate peaks'],
          ['Unlabelled synthetic content and misuse', 'Removal, paraphrasing, detector access'] ],
        say: 'Each control does a different job. | Filtering stops or reduces harmful, injected or sensitive content in inputs and outputs. Watch out for evasion, false positives that block legitimate users, and added latency. | Sandboxing contains the damage when code or tools misbehave, whether by accident or because an agent was manipulated. Watch out for escapes, and for sandboxes granted permissions that are too broad. | Rate limiting reduces floods, model extraction and runaway costs. Watch out for attackers spreading requests across many accounts, and for legitimate peaks. | And watermarking marks synthetic content so it can be identified. Watch out for removal and paraphrasing, and remember that detection needs access to the right detector.' },
      { t: 'flow', title: 'Where the controls sit',
        nodes: [
          { id: 'req', x: 230, y: 330, icon: 'users', label: 'Requests', sub: 'users, apps, agents', k: 'human', w: 290 },
          { id: 'gw', x: 700, y: 330, icon: 'clock', label: 'Gateway', sub: 'rate limits, quotas, budgets', k: 'neutral', w: 320 },
          { id: 'inf', x: 1200, y: 330, icon: 'filter', label: 'Input filters', sub: 'policy, injection, PII', k: 'control', w: 300 },
          { id: 'mdl', x: 1200, y: 690, icon: 'box', label: 'Model and agent', sub: 'tools run in a sandbox', k: 'model', w: 300 },
          { id: 'out', x: 700, y: 690, icon: 'shieldcheck', label: 'Output filters', sub: 'safety, DLP, schema', k: 'control', w: 300 },
          { id: 'mark', x: 230, y: 690, icon: 'wave', label: 'Marking', sub: 'watermark, content credentials', k: 'data', w: 330 } ],
        edges: [{ from: 'req', to: 'gw', k: 'human' }, { from: 'gw', to: 'inf', k: 'neutral' }, { from: 'inf', to: 'mdl', k: 'control' }, { from: 'mdl', to: 'out', k: 'model' }, { from: 'out', to: 'mark', k: 'control' }],
        steps: [
          { show: 'req', hi: 'req' },
          { show: 'gw req-gw', flow: 'req-gw', hi: 'gw' },
          { show: 'inf gw-inf', flow: 'gw-inf', hi: 'inf' },
          { show: 'mdl inf-mdl', flow: 'inf-mdl', hi: 'mdl', mark: { mdl: 'lock' } },
          { show: 'out mdl-out', flow: 'mdl-out', hi: 'out' },
          { show: 'mark out-mark', flow: 'out-mark', hi: 'mark', mark: { mark: 'ok' } } ],
        say: 'Here is where the four controls sit. Requests arrive from users, applications and other agents. | A gateway enforces rate limits, quotas and spending budgets per identity, before any expensive work happens. | Input filters check for policy violations, likely injection, and sensitive data. | The model and agent run with least privilege, and any code or tool execution happens inside a sandbox, with no secrets and only allow-listed network access. | Output filters check safety, leakage of sensitive data, and the expected format. | And generated media is marked, with watermarks and content credentials, before it leaves.' },
      { t: 'summary', items: ['Filter inputs and outputs; tune and measure both error types', 'Sandbox code and tools: isolated, ephemeral, no secrets', 'Rate-limit by identity, tokens and cost, not just requests', 'Mark synthetic content; watermarks support, not prove'],
        say: 'To recap. | Filter both inputs and outputs, and tune filters by measuring both missed attacks and false positives. | Sandbox code and tools: isolated, short-lived, with no secrets. | Rate-limit by identity, tokens and cost, not just by request count. | And mark synthetic content, remembering that watermarks support conclusions rather than prove them.' } ] },
    { type: 'text', md: `### Filtering
- **Where:** on inputs (policy, likely injection, sensitive data) and outputs (safety, data leakage, format and schema), and on content entering retrieval indexes and memory (Module 4.4).
- **How:** rules for known patterns, trained classifiers for harm categories, and model-based judges for nuanced policy, often in combination.
- **Tuning:** set thresholds per category, using labelled adversarial and benign sets. Measure **detection rates and false positive rates**, test in every supported language, and decide in advance whether each filter **fails closed** when unavailable (Module 5.7).
- **Limits:** filters reduce, but don’t eliminate, injection and jailbreaks, so pair them with design-level containment (Section 1).

### Sandboxing
- Run generated code, tool execution and file handling in **isolated environments**, such as microVMs or hardened container runtimes, that are **short-lived** and destroyed after each task.
- Give sandboxes **no secrets**, **least-privilege** access, **allow-listed network egress** and **resource limits** for CPU, memory, time and storage (Module 4.6).
- Treat everything that comes out of a sandbox, including files and results, as untrusted.

### Rate limiting
- Limit by **identity** (user, key, tenant, agent), by **tokens and cost**, not only requests, and by **concurrency** and **agent steps**.
- Set **budgets and hard caps** with alerts, to stop denial-of-wallet and runaway agents (Module 6.1).
- Watch for **probing patterns** that suggest extraction, such as systematic, high-volume queries across the input space, and throttle or challenge them (Module 3.6).

### Watermarking and content marking
- **Watermarks** embed a machine-detectable signal in generated text, images, audio or video; Google’s **SynthID** is one example. **Content credentials** (C2PA) attach signed provenance metadata (Module 2.6).
- Under the **EU AI Act, Article 50**, providers of generative systems must mark synthetic outputs in a machine-readable way. The duty applies from 2 August 2026, with systems already on the market given until 2 December 2026 (Module 2.1).
- **Limits:** marks can be degraded by editing, compression or paraphrasing, especially in text, and detection needs the right detector. Treat a detection result as evidence, not proof, and combine methods.` },
    { type: 'scenario', title: 'The filter that cried wolf', md: `After an injection finding, a team deploys a strict input filter on its customer assistant. Attack success in the test suite drops to almost zero. A week later, complaints rise: the filter is blocking 9% of ordinary customer questions, especially those written in Welsh and Polish.`,
      q: { q: 'What should the team do NEXT?', o: ['Keep the filter as it is, since stopping attacks matters more than complaints', 'Retune the thresholds using labelled benign and attack sets in every language', 'Remove the filter completely, and rely on the model’s own safety training', 'Block all languages other than English, so that the filter performs better'], a: 1, b: 2,
        why: 'A filter must be tuned against both error types. Labelled benign and adversarial sets, in every supported language, let the team cut false positives while keeping detection, alongside design-level containment. Ignoring complaints, removing the filter or blocking languages are all poor trade-offs.' } },
    { type: 'callout', kind: 'exam', title: 'Everyday control questions', md: `Filters work on **inputs and outputs**, and must be **tuned on both error types**. Sandboxes are **isolated, short-lived, secret-free and egress-limited**. Rate limits work **per identity, on tokens and cost**, with **budgets and caps**. Watermarks and content credentials **support** provenance claims, but can be removed, so treat detection as **evidence, not proof**.` },
    { type: 'check', q: { q: 'A coding agent runs generated code to test it. Which sandbox design is BEST?', o: ['A long-lived container shared by all users, with the team’s cloud keys for convenience', 'A short-lived, isolated environment with no secrets and allow-listed network access', 'The developer’s own laptop, since the developer can watch what the code does', 'The production server, so tests run in the same environment as live code'], a: 1, b: 2,
      why: 'Isolated, ephemeral sandboxes without secrets and with restricted egress contain damage if the code is malicious or the agent is manipulated. The other options expose credentials, people or production.' } }
  ]
};
