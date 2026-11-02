/* 3.4 · Section 2: DLP and semantic filtering on AI inputs and outputs */
module.exports = {
  title: 'DLP and semantic filtering for AI', covers: [2],
  blocks: [
    { type: 'video', title: 'Stopping leaks in prompts and outputs', kicker: 'Module 3.4 · Video 2 of 6', scenes: [
      { t: 'title', kicker: 'Module 3.4 · Data protection', title: 'Stopping leaks in prompts and outputs', sub: 'DLP and semantic filtering on AI inputs and outputs', icon: 'filter',
        say: 'Every prompt is a potential data transfer, and every output a potential disclosure. | This video covers data loss prevention for AI, and why semantic filtering is needed alongside traditional pattern matching.' },
      { t: 'flow', title: 'Where AI filtering sits',
        nodes: [
          { id: 'user', x: 220, y: 510, icon: 'user', label: 'User or agent', k: 'human', w: 250 },
          { id: 'inp', x: 600, y: 330, icon: 'filter', label: 'Input filter', sub: 'redact, tokenise, block', k: 'control', w: 280 },
          { id: 'model', x: 1000, y: 330, icon: 'model', label: 'Model', sub: 'internal or external', k: 'model', w: 250 },
          { id: 'ret', x: 1000, y: 690, icon: 'database', label: 'Retrieved content', sub: 'documents, tool results', k: 'data', w: 290 },
          { id: 'out', x: 1380, y: 510, icon: 'shield', label: 'Output filter', sub: 'leaks, secrets, unsafe content', k: 'control', w: 290 } ],
        edges: [{ from: 'user', to: 'inp', k: 'human' }, { from: 'inp', to: 'model', k: 'control' }, { from: 'ret', to: 'model', k: 'data' }, { from: 'model', to: 'out', k: 'model' }],
        steps: [
          { show: 'user', hi: 'user' },
          { show: 'inp user-inp', flow: 'user-inp', hi: 'inp' },
          { show: 'model inp-model', flow: 'inp-model', hi: 'model' },
          { show: 'ret ret-model', flow: 'ret-model', hi: 'ret' },
          { show: 'out model-out', flow: 'model-out', hi: 'out', note: { x: 1340, y: 720, w: 300, text: 'Then to a user, a tool or a log.' } } ],
        say: 'DLP for AI sits on both sides of the model. A user or an agent sends a request. | An input filter, often in an AI gateway or proxy, inspects the prompt and redacts, tokenises or blocks sensitive data before it reaches the model. | The model may be internal or an external service, which is why the input side matters so much. | Retrieved documents and tool results also flow into the model, and need the same inspection. | And an output filter checks responses for leaked personal data, secrets or other unsafe content, before they reach a user, a tool or a log.' },
      { t: 'compare', title: 'Patterns and meaning', labels: ['How it works', 'Good at', 'Struggles with', 'Example'],
        cols: [{ h: 'Pattern-based DLP', icon: 'code', k: 'data' }, { h: 'Semantic filtering', icon: 'brain', k: 'model' }],
        rows: [
          ['Regex, keywords, fingerprints', 'Classifiers, embeddings, LLM judges'],
          ['Card numbers, IDs, exact documents', 'Meaning: strategy, health, source code'],
          ['Paraphrase, prose, context', 'Speed, cost, false positives'],
          ['Blocks a pasted card number', 'Flags a summary of an unreleased deal'] ],
        say: 'Two families of detection work together. | Pattern-based DLP uses regular expressions, keywords and fingerprints of known documents. Semantic filtering uses classifiers, embeddings or language models to judge meaning. | Patterns excel at structured data, such as card numbers and national IDs, and at exact copies of known documents. Semantic filters catch meaning, such as confidential strategy, health information or proprietary code described in plain prose. | Patterns miss paraphrased or summarised content. Semantic filters are slower, cost more and produce more false positives. | So a pattern rule blocks a pasted card number, while a semantic filter flags a user’s summary of an unreleased acquisition.' },
      { t: 'bullets', title: 'DLP actions for AI', layout: 'grid', cols: 2, items: [
          { icon: 'stop', h: 'Block', d: 'For the most sensitive data', k: 'threat' },
          { icon: 'x', h: 'Redact', d: 'Remove the sensitive parts only', k: 'human' },
          { icon: 'token', h: 'Tokenise and restore', d: 'Model never sees real values', k: 'control' },
          { icon: 'alert', h: 'Warn and justify', d: 'Coach users at the moment of risk', k: 'neutral' },
          { icon: 'arrow', h: 'Route to an approved model', d: 'Send it where it is allowed', k: 'model' },
          { icon: 'list', h: 'Log and alert', d: 'Make misuse patterns visible', k: 'data' } ],
        say: 'Detection leads to an action, chosen by policy and context. | Block the request outright, for the most sensitive data. | Redact the sensitive parts, and let the rest through. | Tokenise and restore: replace values with tokens before an external model, then put the real values back into the response, so the model never sees them. | Warn and ask for justification, which also coaches users. | Route the request to an approved internal model that is allowed to see that data. | And log and alert, so patterns of misuse become visible.' },
      { t: 'bullets', title: 'Challenges to plan for', items: [
          { icon: 'mask', h: 'Obfuscation', d: 'Encoding, splitting, translation', k: 'threat' },
          { icon: 'image', h: 'Files and images', d: 'Uploads need extraction and OCR', k: 'data' },
          { icon: 'clock', h: 'Latency and cost', d: 'Tier semantic checks by risk', k: 'neutral' },
          { icon: 'users', h: 'False positives', d: 'Over-blocking drives shadow AI', k: 'human' },
          { icon: 'eye', h: 'Blind spots', d: 'DLP sees only traffic it inspects', k: 'model' } ],
        say: 'Plan for five challenges. | Obfuscation: sensitive content can be encoded, split across messages or translated. | Files and images: uploads need text extraction and image analysis, not just text rules. | Latency and cost: semantic checks add delay, so tier them by risk. | False positives: aggressive blocking pushes users towards unsanctioned tools. | And blind spots: DLP only sees traffic that passes through it, so pair it with shadow AI discovery and an approved tool.' },
      { t: 'summary', items: ['Filter both sides: inputs, retrieved content and outputs', 'Patterns catch structure; semantic filters catch meaning', 'Choose actions by policy: block, redact, tokenise, coach, route, log', 'Plan for obfuscation, files, latency, false positives and blind spots'],
        say: 'To recap. | Filter both sides of the model: inputs, retrieved content and outputs. | Pattern matching catches structured data; semantic filtering catches meaning. | Choose actions by policy: block, redact, tokenise, coach, route or log. | And plan for obfuscation, files and images, latency, false positives and blind spots.' } ] },
    { type: 'text', md: `### Where DLP applies in AI systems
| Inspection point | What it covers | Notes |
|---|---|---|
| **Endpoint and browser** | Paste and upload into web-based AI tools | Catches use of unsanctioned tools on managed devices |
| **Network, proxy or security service edge** | Traffic to AI services | Needs TLS inspection; blind to unmanaged devices |
| **AI gateway** | All calls to approved model APIs | Central policy, logging and routing; ideal place for semantic checks |
| **Application filters** | Your own AI apps, before and after the model | Context-aware: knows the user, data and purpose |
| **RAG and indexing pipelines** | Content before it is indexed or retrieved | Stops sensitive data entering indexes (Module 1.2) |
| **Agent tool calls** | Data sent by agents to tools and external APIs | Prevents exfiltration through actions (Module 4.4) |
| **Logs** | Stored prompts and outputs | Mask by default; restrict access (Module 3.2) |

### Detection methods
- **Patterns and validation:** regular expressions with checksums (for example, card number checks), keywords and dictionaries.
- **Exact data match and fingerprinting:** hashes of known sensitive records or documents, which catch exact or partial copies.
- **Label-aware policies:** use sensitivity labels applied by classification (Module 3.1) to decide what may go where.
- **Semantic filtering:** machine learning classifiers, embedding similarity to protected documents, or LLM-based classifiers that judge whether content is, for example, confidential strategy, health information or proprietary code, even when paraphrased.

### Policy design
Base policies on **data class, user role, destination and purpose**: the same customer data may be allowed into an approved internal model but blocked from a public chatbot. Use **coaching** (warn and justify) for grey areas, and **block** for the most sensitive data. Provide an approved alternative, or users will route around controls. Review false positives and overrides regularly.

### Output filtering
Check outputs for personal data, secrets, confidential retrieved content and signs of system prompt leakage, and check what agents are about to send to tools. Output filters are a backstop, not a substitute for keeping sensitive data out of models and indexes in the first place.

### Limits of semantic filtering
Semantic filters can be evaded with encoding, splitting or translation, and an LLM-based filter can itself be influenced by instructions hidden in the content it inspects, so treat its input as untrusted and combine methods. Measure detections by data class, false positive rates, user overrides and trends in shadow AI use.` },
    { type: 'callout', kind: 'exam', title: 'Pick the right detector', md: `Structured identifiers (card numbers, national IDs, account numbers) → **pattern-based DLP**. Exact copies of known documents → **fingerprinting**. Sensitive **meaning** in free text, summaries or paraphrases → **semantic filtering**. Strong answers combine them at an **AI gateway** with policy-driven actions.` },
    { type: 'check', q: { q: 'Employees summarise confidential merger plans in their own words before pasting them into an external chatbot, and pattern-based DLP misses this. What BEST closes the gap?', o: ['Add more regular expressions that match words commonly used in merger documents', 'Add semantic classification of prompts at an AI gateway, with actions such as block or reroute', 'Block every external AI service at the firewall, with no exceptions for any team', 'Require employees to tick a box confirming that each prompt contains no confidential data at all'], a: 1, b: 2,
      why: 'Paraphrased content defeats patterns and keywords. Semantic classification at a gateway recognises sensitive meaning and applies policy. Blanket blocking drives shadow AI, and self-attestation doesn’t detect anything.' } }
  ]
};
