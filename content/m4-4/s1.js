/* 4.4 · Section 1: AI input/output handling (prompt sanitisation, content filtering, context boundary validation) */
module.exports = {
  title: 'Guardrails for inputs, outputs and context boundaries', covers: [1],
  blocks: [
    { type: 'video', title: 'Guardrails around the model', kicker: 'Module 4.4 · Video 1 of 4', scenes: [
      { t: 'title', kicker: 'Module 4.4 · Guardrails and testing', title: 'Guardrails around the model', sub: 'Input handling, content filtering and context boundaries', icon: 'shield',
        say: 'A model alone can’t reliably tell instructions from data, or safe content from harmful content. Guardrails are the systems around it that do that work. | This video covers the guardrail architecture for inputs, outputs and context: prompt sanitisation, content filtering, and context boundary validation.' },
      { t: 'flow', title: 'A guardrail pipeline',
        nodes: [
          { id: 'in', x: 210, y: 330, icon: 'chat', label: 'Input', sub: 'user and retrieved', k: 'human', w: 250 },
          { id: 'ig', x: 600, y: 330, icon: 'filter', label: 'Input guardrails', sub: 'normalise, classify, redact', k: 'data', w: 300 },
          { id: 'ctx', x: 1010, y: 330, icon: 'layers', label: 'Context assembly', sub: 'labelled boundaries', k: 'neutral', w: 300 },
          { id: 'm', x: 1350, y: 610, icon: 'model', label: 'Model', sub: 'safety-tuned', k: 'model', w: 230 },
          { id: 'og', x: 930, y: 740, icon: 'shieldcheck', label: 'Output guardrails', sub: 'filter, ground, validate', k: 'control', w: 310 },
          { id: 'out', x: 480, y: 700, icon: 'user', label: 'User or system', sub: 'safe result', k: 'human', w: 270 } ],
        edges: [{ from: 'in', to: 'ig', k: 'human' }, { from: 'ig', to: 'ctx', k: 'data' }, { from: 'ctx', to: 'm', k: 'neutral' }, { from: 'm', to: 'og', k: 'model' }, { from: 'og', to: 'out', k: 'control' }],
        steps: [
          { show: 'in', hi: 'in' },
          { show: 'ig in-ig', flow: 'in-ig', hi: 'ig' },
          { show: 'ctx ig-ctx', flow: 'ig-ctx', hi: 'ctx' },
          { show: 'm ctx-m', flow: 'ctx-m', hi: 'm' },
          { show: 'og m-og', flow: 'm-og', hi: 'og', mark: { og: 'ok' } },
          { show: 'out og-out', flow: 'og-out', hi: 'out' } ],
        say: 'Here is a typical guardrail pipeline. Input arrives from users, and also from retrieved documents and tool results. | Input guardrails normalise text, run classifiers for injection attempts, jailbreaks and off-topic requests, and redact sensitive data. | Context assembly builds the prompt with clear, labelled boundaries between instructions and untrusted content. | The model, ideally safety-tuned, generates a response. | Output guardrails filter harmful content, check grounding against sources, validate structure, and catch data leaks. | Only then does the result reach the user or a downstream system.' },
      { t: 'bullets', title: 'Context boundary validation', layout: 'grid', cols: 2, items: [
          { icon: 'layers', h: 'Separate roles', d: 'System, user and tool content apart', k: 'neutral' },
          { icon: 'tag', h: 'Mark untrusted content', d: 'Delimit and label it as data', k: 'data' },
          { icon: 'branch', h: 'Instruction hierarchy', d: 'Higher roles outrank lower ones', k: 'model' },
          { icon: 'ruler', h: 'Protect the budget', d: 'Safeguards never truncated away', k: 'human' },
          { icon: 'search', h: 'Check what crosses', d: 'Validate before content is added', k: 'control' },
          { icon: 'stop', h: 'Limit what content can trigger', d: 'No tool calls from documents alone', k: 'threat' } ],
        say: 'Context boundary validation keeps instructions and data apart. | Use separate roles for system instructions, user input and tool or retrieved content, rather than pasting everything into one block. | Mark untrusted content clearly, with delimiters and labels that say it is data, not instructions. | Use models trained with an instruction hierarchy, where system and developer instructions outrank user input, which outranks tool content. | Protect the context budget, so safety instructions are never truncated to make room for long documents. | Validate content before it is added to the context. | And limit what untrusted content can trigger: a retrieved document should never cause a tool call on its own.' },
      { t: 'compare', title: 'Kinds of filter', labels: ['Catches', 'Strengths', 'Weaknesses'],
        cols: [{ h: 'Rules', icon: 'code', k: 'neutral' }, { h: 'Classifiers', icon: 'filter', k: 'data' }, { h: 'LLM judges', icon: 'model', k: 'model' }],
        rows: [
          ['Known patterns, formats', 'Harm categories, injection', 'Nuanced policy breaches'],
          ['Fast, predictable', 'Fast, broad coverage', 'Flexible, explainable'],
          ['Easy to evade', 'False positives, drift', 'Slow, costly, manipulable'] ],
        say: 'Filters come in three main kinds. | Rules catch known patterns and formats, such as card numbers. Trained classifiers catch harm categories and injection attempts. A large model acting as a judge can catch nuanced breaches of policy. | Rules are fast and predictable. Classifiers are fast with broad coverage. Judges are flexible, and can explain their decisions. | But rules are easy to evade, classifiers produce false positives and drift over time, and judges are slow, costly, and can themselves be manipulated by the content they inspect.' },
      { t: 'summary', items: ['Guardrails sit before, around and after the model', 'Keep instructions and untrusted content in separate, labelled boundaries', 'Combine rules, classifiers and judges; measure their error rates', 'No guardrail stops every injection: limit what outputs can do'],
        say: 'To recap. | Guardrails sit before, around and after the model. | Keep instructions and untrusted content in separate, labelled boundaries, and protect safeguards from truncation. | Combine rules, classifiers and model-based judges, and measure their false positive and false negative rates. | And remember that no guardrail stops every injection, so limit what outputs and actions can do.' } ] },
    { type: 'text', md: `### Input handling
- **Normalisation:** Unicode normalisation; removing invisible, zero-width and control characters; decoding obfuscation such as encoded text, where appropriate.
- **Validation:** length and token limits, file types and sizes, rate limits (Module 3.6).
- **Classification:** detectors for prompt injection and jailbreak attempts, off-topic or out-of-scope requests, and abusive content. Cloud providers and open-source projects offer such classifiers, including dedicated safety models that label prompts and responses against a policy.
- **Redaction:** detect and mask personal data and secrets before prompts reach external models (Module 3.4).
- **Indirect sources:** apply the same checks to retrieved documents, web pages, emails and tool results, which are the main route for indirect prompt injection.

### Context boundary validation
| Technique | What it does |
|---|---|
| **Role separation** | Uses the API’s distinct system, user and tool roles rather than one concatenated prompt |
| **Delimiting and labelling** | Wraps untrusted content in clear markers and tells the model to treat it as data ("spotlighting"); variants mark every token of untrusted text or encode it |
| **Instruction hierarchy** | Models trained to prioritise system and developer instructions over user input, and user input over tool or retrieved content |
| **Context budgeting** | Reserves space for system instructions and safety text, and truncates untrusted content first |
| **Provenance tags** | Attaches source and trust level to each chunk, so downstream logic and filters can treat content differently |
| **Trigger limits** | Prevents content from low-trust sources from directly causing tool calls or other actions |

These techniques **reduce** injection success; none eliminates it. Assume some injections will succeed, and enforce authorisation and action limits outside the model (Modules 4.1 and 4.6).

### Content filtering
- Define a **content policy**: categories (such as hate, harassment, violence, self-harm, sexual content and dangerous activities), severity levels and actions (block, warn, route to a human).
- Apply filters to **both** inputs and outputs; tune thresholds per use case and audience.
- Combine **rules** (fast, precise for known patterns), **classifiers** (broad and fast) and **LLM judges** (nuanced but slow and themselves vulnerable to injection).
- **Measure** false positive and false negative rates on representative test sets, and monitor them in production; over-blocking drives users to unapproved tools.

### Output handling
Encode for the destination, validate structure against schemas, check grounding and citations, run DLP and moderation, and never execute output directly (Module 3.5). For streaming, buffer or filter chunk by chunk (Module 4.1).

### Guardrail operations
Version guardrail configurations as code, test them in the pipeline (Module 4.3), log decisions for monitoring (with privacy protections), review blocked and allowed samples regularly, and update for new attack techniques found by red teams and threat intelligence.` },
    { type: 'callout', kind: 'exam', title: 'Guardrail questions', md: `Look for **layered** guardrails on inputs, context and outputs, with **measured** error rates, and for designs that **separate instructions from untrusted content**. Beware answers claiming a single filter or prompt "prevents" prompt injection; the best answers also **limit what a fooled model can do**.` },
    { type: 'match', title: 'Which guardrail technique is this?', pairs: [
      ['Retrieved web pages are wrapped in markers and labelled as untrusted data', 'Spotlighting'],
      ['The model gives developer instructions priority over text inside a tool result', 'Instruction hierarchy'],
      ['Long documents are cut before any safety instructions are', 'Context budgeting'],
      ['A classifier flags a prompt as a likely jailbreak attempt', 'Input classification'],
      ['A reply containing an unapproved link is held for review', 'Output guardrail'] ] },
    { type: 'scenario', title: 'The disappearing safeguards', md: `A legal research assistant builds each prompt by pasting the retrieved case documents first and its system instructions last, in a single block of text. With long documents, the prompt exceeds the context window and the end is cut off. Testers notice the assistant now answers questions far outside its approved scope.`,
      q: { q: 'What is the BEST fix?', o: ['Raise the maximum document length, so that fewer documents are needed for each answer', 'Use the system role, reserve budget for instructions, and truncate retrieved content first', 'Ask users to keep their questions short, so that more space is left for the instructions', 'Repeat the safety instructions several times in the middle of the retrieved documents'], a: 1, b: 1,
        why: 'Instructions belong in their own role with protected space, and untrusted content should be what gets truncated. Longer documents make the problem worse, user behaviour isn’t a control, and instructions buried in content are easily lost or overridden.' } },
    { type: 'check', q: { q: 'A RAG assistant inserts retrieved web pages into its prompt as plain text, directly after the system instructions. Which change BEST strengthens the context boundary?', o: ['Add a sentence at the end of the prompt asking the model to ignore any instructions it finds', 'Pass retrieved content in a separate, clearly delimited and labelled section that is treated as data', 'Increase the context window size so that more web pages fit into the prompt at once', 'Retrieve web pages only from well-known sites that rank highly in search engine results for the query'], a: 1, b: 1,
      why: 'Separating and labelling untrusted content as data, ideally in a distinct role, helps the model and downstream checks treat it differently from instructions. A closing instruction is weak, bigger contexts add attack surface, and search ranking says nothing about safety.' } }
  ]
};
