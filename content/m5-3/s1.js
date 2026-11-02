/* 5.3 · Section 1: runtime threat detection (inputs, prompts, retrieval chains, outputs, resource consumption) */
module.exports = {
  title: 'Runtime threat detection across the AI request path', covers: [1],
  blocks: [
    { type: 'video', title: 'Detecting attacks in flight', kicker: 'Module 5.3 · Video 1 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.3 · Runtime detection', title: 'Detecting attacks in flight', sub: 'Threats in inputs, retrieval chains, outputs and resource use', icon: 'siren',
        say: 'Guardrails try to stop attacks. Detection assumes some will get through, and makes sure someone finds out quickly. | This video covers runtime threat detection across the whole AI request path: inputs and prompts, retrieval chains, outputs and resource consumption.' },
      { t: 'layers', title: 'Where to detect runtime threats',
        layers: [
          { icon: 'chat', label: 'Inputs and prompts', sub: 'Jailbreak and injection attempts, obfuscation, probing', k: 'data' },
          { icon: 'database', label: 'Retrieval chains', sub: 'Instructions hidden in documents, unexpected sources', k: 'human' },
          { icon: 'text', label: 'Outputs', sub: 'Leaked data, system prompt disclosure, unsafe links', k: 'model' },
          { icon: 'bolt', label: 'Resource consumption', sub: 'Token floods, long contexts, loops', k: 'threat' } ],
        say: 'There are four places to look. | Inputs and prompts: attempts to jailbreak the model or inject instructions, inputs disguised with unusual encodings, and patterns of probing. | Retrieval chains: documents and web pages that carry hidden instructions, or content arriving from sources the system shouldn’t be using. | Outputs: personal data or secrets, disclosure of the system prompt, and links or images that could carry data out. | And resource consumption: floods of tokens, unusually long contexts and runaway loops that drive up cost or deny service.' },
      { t: 'chat', title: 'Catching injection in a retrieval chain', app: 'Procurement assistant',
        msgs: [
          { r: 'user', t: 'Compare the three supplier proposals and recommend one.' },
          { r: 'doc', t: 'Supplier C proposal: pricing table, delivery terms… [hidden instruction]' },
          { r: 'ai', t: 'Comparison of A, B and C on price, delivery and risk. Note: one document contained text addressed to the assistant, which was ignored and reported.' } ],
        notes: [{ h: 'A normal request', d: 'The user asks for a comparison of three documents.' }, { h: 'Detector flags a document', d: 'Scanning retrieved content finds text addressed to the model. The chunk is quarantined and an alert is raised.', k: 'threat' }, { h: 'Safe answer, plus a signal', d: 'The answer uses the legitimate content, and the SOC gets an event with the document’s source and trace ID.', k: 'control' }],
        say: 'Here is detection in a retrieval chain. A user asks a procurement assistant to compare three supplier proposals. | One proposal contains hidden text addressed to the assistant. A detector scanning retrieved content flags it before the model acts on it, quarantines the chunk and raises an alert. | The assistant answers using the legitimate content. Just as important, the security team now has an event showing which document carried the hidden instruction, where it came from and which request it affected.' },
      { t: 'compare', title: 'Three ways to detect', labels: ['Strength', 'Weakness', 'Example'],
        cols: [{ h: 'Rules', icon: 'list', k: 'control' }, { h: 'Classifiers', icon: 'brain', k: 'model' }, { h: 'Baselines', icon: 'chart', k: 'human' }],
        rows: [
          ['Precise, explainable', 'Handle new wording', 'Catch the unknown'],
          ['Easy to evade', 'False positives', 'Need history'],
          ['Canary string in output', 'Injection detector', 'Token spike per key'] ],
        say: 'Detection uses three complementary methods. | Rules and signatures are precise and easy to explain. Machine learning classifiers handle new wording that rules have never seen. Behavioural baselines catch the unknown, by spotting activity that is simply unusual. | Each has a weakness. Rules are easy to evade by rephrasing. Classifiers produce false positives and can themselves be fooled. Baselines need history, and can be noisy. | For example: a rule that spots a secret canary string from the system prompt appearing in an output; a classifier that scores documents for injected instructions; and a baseline that flags a sudden spike in tokens for one API key. Strong programmes use all three.' },
      { t: 'bullets', title: 'Signals of resource abuse', layout: 'grid', cols: 2, items: [
          { icon: 'token', h: 'Token spikes', d: 'Per key, user or agent', k: 'threat' },
          { icon: 'ruler', h: 'Maximum-length requests', d: 'Inputs and outputs at the limit', k: 'human' },
          { icon: 'cycle', h: 'Loops and recursion', d: 'Agents repeating steps', k: 'model' },
          { icon: 'users', h: 'Parallel sessions', d: 'Many at once from one source', k: 'data' },
          { icon: 'gpu', h: 'Compute saturation', d: 'Queues, latency, GPU load', k: 'neutral' },
          { icon: 'money', h: 'Cost anomalies', d: 'Spend outside forecast', k: 'control' } ],
        say: 'Resource abuse has its own signals. | Token spikes for one key, user or agent. | Requests that repeatedly hit the maximum input or output length, which is costly by design. | Agents repeating the same steps, or calling themselves recursively. | Large numbers of parallel sessions from one source. | Compute saturation: growing queues, rising latency and high GPU load. | And cost anomalies: spending outside the forecast, sometimes called denial of wallet.' },
      { t: 'summary', items: ['Detect in inputs, retrieval chains, outputs and resource use', 'Scan retrieved content, not just user prompts', 'Combine rules, classifiers and behavioural baselines', 'Treat cost and capacity anomalies as security signals'],
        say: 'To recap. | Detect threats in inputs, retrieval chains, outputs and resource consumption. | Scan retrieved content as well as user prompts, because indirect injection arrives through data. | Combine rules, classifiers and behavioural baselines, because each misses what the others catch. | And treat cost and capacity anomalies as security signals, not just finance problems.' } ] },
    { type: 'text', md: `### Detection points and signals
| Point | What to detect | Example signals |
|---|---|---|
| **Inputs and prompts** | Jailbreaks, direct injection, probing, obfuscation | Classifier scores; unusual encodings, scripts or invisible characters; many near-identical variations from one source; repeated refusals |
| **Retrieval chains** | Indirect injection, poisoned or unexpected content, access-control bypass | Text addressed to the model inside documents; new or unapproved sources; documents retrieved outside the user’s permissions; sudden changes in what is retrieved for common queries |
| **Outputs** | Data leakage, system prompt leakage, harmful content, exfiltration channels | Personal data or secrets; **canary tokens** planted in system prompts appearing in outputs; links or images pointing to unknown domains with data in their URLs; safety classifier scores |
| **Resource consumption** | Unbounded consumption, denial of service, denial of wallet | Token and request spikes; maximum-length contexts; agent loops; queue growth; spend anomalies |

These map onto the OWASP Top 10 for LLM Applications (2025), including **LLM01 Prompt Injection**, **LLM02 Sensitive Information Disclosure**, **LLM05 Improper Output Handling**, **LLM07 System Prompt Leakage**, **LLM08 Vector and Embedding Weaknesses** and **LLM10 Unbounded Consumption**. Mapping detections to OWASP and MITRE ATLAS shows which risks you can see, and which you can’t.

### Building good detections
- **Layer methods:** rules for known patterns, classifiers for variations, baselines for the unknown (Module 5.2).
- **Detect on intermediate steps,** not just the final answer: retrieved chunks, tool arguments and agent plans often show an attack before any output does.
- **Plant canaries:** unique strings in system prompts, hidden documents or honeytoken records reveal leakage or unauthorised retrieval when they appear where they shouldn’t.
- **Score with context:** a jailbreak attempt against an internal drafting tool matters less than one against an agent with payment rights.
- **Expect evasion:** attackers rephrase, translate and encode inputs. Normalise text before scanning, test detectors against red-team findings (Module 6.4), and measure false negatives as well as false positives.
- **Detection isn’t prevention:** findings should trigger response (Module 5.5), and patterns should feed back into guardrails (Module 4.4).` },
    { type: 'match', title: 'Which detection point would see it first?', pairs: [
      ['A web page the agent read contains instructions addressed to it', 'Retrieval chain scanning'],
      ['A secret string from the system prompt appears in a response', 'Output monitoring with canary tokens'],
      ['One API key sends thousands of maximum-length requests', 'Resource consumption baselines'],
      ['A user tries dozens of rephrased jailbreaks in an hour', 'Input and prompt detection'],
      ['A response contains an image link with customer data in its URL', 'Output monitoring for exfiltration channels'] ] },
    { type: 'callout', kind: 'exam', title: 'Runtime detection questions', md: `Look for detection at **every stage** (inputs, retrieval, outputs, resources), **layered methods** and **context-based severity**. Answers that scan only user prompts miss indirect injection; answers that rely on one classifier miss evasion. **Canary tokens** are a strong way to detect system prompt or data leakage.` },
    { type: 'check', q: { q: 'A company scans every user prompt to its RAG assistant for injection attempts, but an attacker still manipulates answers by planting instructions in a shared wiki page. Which detection gap is MOST likely?', o: ['The prompt scanner uses rules instead of a machine learning model', 'Retrieved documents aren’t scanned before the model processes them', 'The assistant’s outputs aren’t checked for personal data before display', 'User prompts are scanned after, rather than before, they reach the gateway'], a: 1, b: 1,
      why: 'The malicious instructions arrived through retrieval, not the user’s prompt, so content must be scanned as it enters the chain. The scanner’s method, output DLP and the order of prompt scanning don’t address the indirect path.' } }
  ]
};
