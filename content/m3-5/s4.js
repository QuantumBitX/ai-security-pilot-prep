/* 3.5 · Section 4: input/output sanitisation, updates and rollback procedures */
module.exports = {
  title: 'Sanitising inputs and outputs, updates and rollback', covers: [4],
  blocks: [
    { type: 'video', title: 'Clean in, clean out, and a way back', kicker: 'Module 3.5 · Video 4 of 6', scenes: [
      { t: 'title', kicker: 'Module 3.5 · Model lifecycle', title: 'Clean in, clean out, and a way back', sub: 'Sanitisation, safe updates and rollback', icon: 'rollback',
        say: 'A deployed model is only as safe as what goes into it and what comes out of it, and every update is a chance to break both. | This video covers sanitising inputs and outputs, releasing updates safely, and rolling back quickly when an update goes wrong.' },
      { t: 'compare', title: 'Sanitise in both directions', labels: ['Goal', 'Controls', 'Threats', 'Example'],
        cols: [{ h: 'Input side', icon: 'filter', k: 'data' }, { h: 'Output side', icon: 'shieldcheck', k: 'control' }],
        rows: [
          ['Keep bad input from the model', 'Keep unsafe output from users and systems'],
          ['Validate, limit, normalise, screen', 'Encode, validate schema, DLP, moderate'],
          ['Injection, oversized or hidden content', 'Script injection, leaks, harmful content'],
          ['Strip hidden text from uploads', 'Encode replies before display'] ],
        say: 'Sanitisation works in both directions. | On the input side, the goal is to stop harmful or malformed content reaching the model. On the output side, it is to stop unsafe output reaching users or downstream systems. | Input controls include validation, size limits, normalisation and screening for injection attempts. Output controls include encoding, schema validation, data loss prevention and moderation. | Input controls target prompt injection and oversized or hidden content. Output controls target script and command injection, data leakage and harmful content. | For example: strip hidden text from uploaded documents on the way in, and encode the model’s reply before a web page displays it.' },
      { t: 'bullets', title: 'Treat model output as untrusted', items: [
          { icon: 'code', h: 'Encode for the destination', d: 'HTML, SQL, shell or Markdown', k: 'data' },
          { icon: 'list', h: 'Validate structure', d: 'Schema, allowed fields and values', k: 'control' },
          { icon: 'stop', h: 'Never execute output directly', d: 'No eval, no raw shell or SQL', k: 'threat' },
          { icon: 'lock', h: 'Least privilege downstream', d: 'Tools act with minimal rights', k: 'human' },
          { icon: 'eye', h: 'Inspect content', d: 'DLP and moderation on replies', k: 'model' } ],
        say: 'The OWASP Top 10 for large language model applications lists improper output handling as a major risk. The fix starts with a mindset: treat model output exactly like untrusted user input. | Encode it for wherever it is going: HTML, SQL, a shell, or rendered Markdown. | Validate structured output against a schema, with allowed fields and values. | Never pass output straight into code execution, a shell or a database query. | Give the tools and systems that act on output only the rights they need. | And inspect replies with data loss prevention and moderation before they reach people.' },
      { t: 'flow', title: 'Releasing an update safely',
        nodes: [
          { id: 'cand', x: 200, y: 330, icon: 'model', label: 'New version', sub: 'approved candidate', k: 'model', w: 250 },
          { id: 'eval', x: 545, y: 330, icon: 'check', label: 'Offline evaluation', sub: 'regression, safety', k: 'control', w: 280 },
          { id: 'shadow', x: 910, y: 330, icon: 'eye', label: 'Shadow mode', sub: 'compared, not shown', k: 'data', w: 280 },
          { id: 'canary', x: 1290, y: 330, icon: 'users', label: 'Canary', sub: 'a few per cent', k: 'human', w: 260 },
          { id: 'full', x: 1290, y: 680, icon: 'globe', label: 'Progressive rollout', sub: 'watch, then widen', k: 'control', w: 300 },
          { id: 'rb', x: 780, y: 680, icon: 'rollback', label: 'Roll back', sub: 'last approved bundle', k: 'threat', w: 290 } ],
        edges: [{ from: 'cand', to: 'eval', k: 'model' }, { from: 'eval', to: 'shadow', k: 'control' }, { from: 'shadow', to: 'canary', k: 'data' }, { from: 'canary', to: 'full', k: 'human' }, { from: 'canary', to: 'rb', k: 'threat' }],
        steps: [
          { show: 'cand', hi: 'cand' },
          { show: 'eval cand-eval', flow: 'cand-eval', hi: 'eval' },
          { show: 'shadow eval-shadow', flow: 'eval-shadow', hi: 'shadow' },
          { show: 'canary shadow-canary', flow: 'shadow-canary', hi: 'canary' },
          { show: 'full canary-full', flow: 'canary-full', hi: 'full', mark: { full: 'ok' } },
          { show: 'rb canary-rb', flow: 'canary-rb', hi: 'rb', mark: { rb: 'alert' } } ],
        say: 'Here is a safe release path for a new model version, after it has been approved. | First, offline evaluation: regression tests against the current version, plus the safety, security and fairness suites. | Next, shadow mode: the new version receives a copy of real traffic, but its answers are only compared, never shown to users. | Then a canary release to a small percentage of users, with close monitoring. | If the signals stay healthy, the rollout widens step by step. | And if they don’t, the team rolls back to the previous approved version straight away, using triggers and authority agreed in advance.' },
      { t: 'bullets', title: 'What a rollback must restore', layout: 'grid', cols: 2, items: [
          { icon: 'model', h: 'Model version', d: 'Signed, still in the registry', k: 'model' },
          { icon: 'text', h: 'Prompts and settings', d: 'System prompt, parameters', k: 'data' },
          { icon: 'shield', h: 'Guardrail configuration', d: 'Filters and policies', k: 'control' },
          { icon: 'database', h: 'Retrieval index', d: 'And its embedding model', k: 'human' },
          { icon: 'container', h: 'Serving stack', d: 'Image and dependencies', k: 'neutral' },
          { icon: 'pipeline', h: 'Feature pipeline', d: 'Schemas the model expects', k: 'threat' } ],
        say: 'A rollback has to restore the whole system, not just the weights. Keep a complete, tested bundle for the previous version. | The model version itself, signed and still held in the registry. | The system prompt and generation settings it was tested with. | The guardrail configuration: filters, policies and thresholds. | For retrieval systems, the index and the embedding model that built it. | The serving image and its dependencies. | And the feature pipeline and data schemas the model expects.' },
      { t: 'summary', items: ['Sanitise inputs, and treat outputs as untrusted', 'Encode for the destination; never execute output', 'Release through evaluation, shadow and canary stages', 'Pre-agree rollback triggers; restore the full bundle'],
        say: 'To recap. | Sanitise what goes in, and treat what comes out as untrusted. | Encode output for its destination, validate its structure, and never execute it directly. | Release updates through offline evaluation, shadow mode and canary stages. | And agree rollback triggers and authority in advance, so you can restore the complete previous bundle within minutes.' } ] },
    { type: 'text', md: `### Input sanitisation
Inputs include user prompts, uploaded files, retrieved documents, tool results and API parameters. Controls:
- **Validation:** type, length, format and allowed values for structured fields; reject or truncate oversized inputs (token and file size limits also protect availability, Module 3.6).
- **Normalisation:** standardise Unicode (for example with NFKC), remove invisible and zero-width characters, and map look-alike characters from other alphabets, all of which can hide instructions or evade filters.
- **File sanitisation:** content disarm and reconstruction (CDR) rebuilds documents without macros, scripts, hidden text or metadata; convert formats where possible (for example, to plain text) before the model sees them.
- **Screening:** classifiers that detect likely prompt injection or abuse, and DLP that redacts sensitive data before external models (Module 3.4).
- **Separation:** mark retrieved and uploaded content as untrusted data, kept apart from instructions.

No input filter reliably stops every prompt injection, so input controls are one layer. **Output handling and least privilege** must assume that some malicious input gets through.

### Output sanitisation
The OWASP Top 10 for LLM Applications (2025) lists **LLM05: Improper Output Handling**: passing model output to other components without validation, which can lead to cross-site scripting, server-side request forgery, privilege escalation or remote code execution. Controls:
- **Context-aware encoding:** HTML-encode text before inserting it into a page, or render it as plain text; use a content security policy as a backstop.
- **Restricted rendering:** limit what rendered Markdown can do, for example by blocking images from external domains, which can be used to send data out through the image address.
- **Schema validation** for structured output, rejecting unexpected fields or values.
- **Parameterised queries** when output feeds a database; **no direct execution** of generated code or commands, except in a sandbox built for it.
- **Allow-lists** for URLs, tools and actions; **human approval** for high-impact actions.
- **DLP and moderation** on outputs, to catch leaked secrets, personal data and harmful content.

Module 4.4 covers guardrail architecture and context boundary validation in more depth.

### Updating models safely
Updates come in many forms: retrained or fine-tuned versions, a provider’s new base model, system prompt and configuration changes, guardrail changes, retrieval index rebuilds and serving stack patches. Each goes through **change management**, scaled to the risk tier (Section 1): re-run the evaluation suites, update the registry and model card, and get the approval the tier requires.
- **Pin versions** of hosted models (for example, a dated model version rather than a "latest" alias), so the provider can’t change behaviour without your testing. Track deprecation notices and plan migrations early.
- **Release strategies:** *shadow mode* (mirror traffic, compare outputs, serve nothing), *canary* (a small share of users first), *blue/green* (two production environments, switching traffic between them for instant rollback) and *feature flags* (turn a capability on or off without redeploying).

### Rollback procedures
- **Define triggers in advance:** error rates, safety or policy violations, fairness gaps, drift alerts, security incidents or user complaints above a threshold.
- **Pre-authorise** who can roll back, such as the on-call engineer or model owner, so rollback doesn’t wait for a committee.
- **Keep the previous version deployable:** retained in the registry, with capacity to run it, and the full bundle (model, prompts, settings, guardrails, index, serving image, feature pipeline).
- **Test rollback** regularly, as you would disaster recovery.
- **Record and learn:** log the rollback in the registry and incident record, find the root cause, and re-approve before re-releasing.
- **Have a kill switch:** a way to disable the AI feature entirely and fall back to a non-AI process if no safe version is available (Module 5.7 covers circuit breakers and kill switches in recovery).

Rollback has limits. It can’t recall data that has already leaked, emails already sent or actions an agent has already taken, and a model that learned continuously from poisoned feedback must be restored from a checkpoint taken before the poisoning began.` },
    { type: 'callout', kind: 'exam', title: 'Spotting the best answer', md: `For output risks, look for **controls outside the model**: encoding, schema validation, sandboxing and least privilege. Instructions in the system prompt ("never output HTML") are weak, because the model can be manipulated. For bad releases, the best answer is usually a **pre-planned rollback to the last approved version**, followed by root-cause analysis, rather than a rushed fix in production.` },
    { type: 'check', q: { q: 'A support chatbot’s replies are inserted into the agent console as HTML. A tester shows that a crafted customer message makes the bot return markup that runs script in the agent’s browser. What is the BEST fix?', o: ['Tell the model in its system prompt never to produce HTML or script in replies', 'Encode the bot’s output for the HTML context before display, backed by a content security policy', 'Move to a larger model, which is less likely to follow instructions hidden in messages', 'Block any customer message that contains the word “script” or angle brackets'], a: 1, b: 4,
      why: 'Model output must be handled as untrusted input: context-aware encoding stops it running as code, and a content security policy adds defence in depth. Prompt instructions and bigger models can still be manipulated, and keyword blocking is easily evaded.' } }
  ]
};
