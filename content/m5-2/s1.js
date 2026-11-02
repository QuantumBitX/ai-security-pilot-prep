/* 5.2 · Section 1: AI telemetry data (prompts, completions, embeddings, tool calls, API traffic) */
module.exports = {
  title: 'AI telemetry: what to collect, and where', covers: [1],
  blocks: [
    { type: 'video', title: 'What the SOC needs to see', kicker: 'Module 5.2 · Video 1 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.2 · AI security telemetry', title: 'What the SOC needs to see', sub: 'AI telemetry data and where to collect it', icon: 'eye',
        say: 'Security teams can only detect what they can see. AI systems create new kinds of activity, and traditional logs miss most of it. | This video covers the AI telemetry a security operations centre needs: prompts, completions, embeddings, tool calls and API traffic, and where to collect them.' },
      { t: 'bullets', title: 'Sources of AI telemetry', layout: 'grid', cols: 2, items: [
          { icon: 'chat', h: 'Prompts and inputs', d: 'User text, files, images, system prompt version', k: 'data' },
          { icon: 'text', h: 'Completions and outputs', d: 'Responses, refusals, structured outputs', k: 'model' },
          { icon: 'database', h: 'Embeddings and retrieval', d: 'Queries, documents returned, scores', k: 'human' },
          { icon: 'tool', h: 'Tool calls and agent steps', d: 'Tool, arguments, result, approvals', k: 'threat' },
          { icon: 'globe', h: 'API and gateway traffic', d: 'Identity, source, volume, tokens, errors', k: 'neutral' },
          { icon: 'shield', h: 'Guardrail decisions', d: 'What was blocked, flagged or masked', k: 'control' } ],
        say: 'AI telemetry comes from six main sources. | Prompts and inputs: what users and applications send, including files and images, and which version of the system prompt was in use. | Completions and outputs: what the model returned, including refusals and structured outputs. | Embeddings and retrieval: the search queries a retrieval system ran, which documents came back, and their similarity scores. | Tool calls and agent steps: which tool an agent called, with what arguments, what came back, and who approved it. | API and gateway traffic: who called, from where, how often, how many tokens, and which errors occurred. | And guardrail decisions: what was blocked, flagged or masked, and by which policy.' },
      { t: 'flow', title: 'Collection points along one request',
        nodes: [
          { id: 'gw', x: 230, y: 330, icon: 'network', label: 'AI gateway', sub: 'identity, rate, DLP', k: 'control', w: 280 },
          { id: 'orc', x: 700, y: 330, icon: 'robot', label: 'Orchestrator or agent', sub: 'plan, steps, approvals', k: 'human', w: 330 },
          { id: 'ret', x: 1200, y: 330, icon: 'database', label: 'Retrieval', sub: 'queries, documents', k: 'data', w: 280 },
          { id: 'mod', x: 1200, y: 690, icon: 'model', label: 'Model serving', sub: 'version, tokens, latency', k: 'model', w: 320 },
          { id: 'tool', x: 700, y: 690, icon: 'tool', label: 'Tools and APIs', sub: 'calls, results, errors', k: 'threat', w: 300 },
          { id: 'siem', x: 230, y: 690, icon: 'search', label: 'Security analytics', sub: 'one trace ID joins all', k: 'neutral', w: 300 } ],
        edges: [{ from: 'gw', to: 'orc', k: 'control' }, { from: 'orc', to: 'ret', k: 'human' }, { from: 'ret', to: 'mod', k: 'data' }, { from: 'mod', to: 'tool', k: 'model' }, { from: 'tool', to: 'siem', k: 'neutral' }],
        steps: [
          { show: 'gw', hi: 'gw' },
          { show: 'orc gw-orc', flow: 'gw-orc', hi: 'orc' },
          { show: 'ret orc-ret', flow: 'orc-ret', hi: 'ret' },
          { show: 'mod ret-mod', flow: 'ret-mod', hi: 'mod' },
          { show: 'tool mod-tool', flow: 'mod-tool', hi: 'tool' },
          { show: 'siem tool-siem', flow: 'tool-siem', hi: 'siem', mark: { siem: 'ok' } } ],
        say: 'Telemetry is collected at several points along a single request. The AI gateway sees identity, rate limits and data loss prevention decisions. | The orchestrator or agent framework sees the plan, each step and any human approvals. | The retrieval layer sees the queries it ran and the documents it returned. | Model serving sees the model version, token counts and latency. | Tools and APIs see the calls made on the model’s behalf, their results and errors. | Security analytics brings these together. The key is a shared trace identifier on every event, so analysts can follow one request from end to end.' },
      { t: 'compare', title: 'Metadata or content?', labels: ['Examples', 'Volume', 'Privacy risk', 'Security use'],
        cols: [{ h: 'Metadata', icon: 'list', k: 'control' }, { h: 'Content', icon: 'text', k: 'threat' }],
        rows: [
          ['Who, when, model, tokens, decisions', 'Prompt and output text, documents'],
          ['Small; cheap to keep', 'Large; costly to store'],
          ['Lower, but still personal data', 'High: personal data and secrets'],
          ['Spot patterns and anomalies', 'Prove what was said; tune detections'] ],
        say: 'A key design decision is how much content to collect, as opposed to metadata. | Metadata covers who, when, which model, how many tokens and which decisions were made. Content is the text of prompts, outputs and documents. | Metadata is small and cheap to keep. Content is large and costly. | Metadata carries lower privacy risk, although it is still personal data. Content can hold personal data and secrets. | Metadata is enough to spot most patterns and anomalies. Content is needed to prove exactly what was said, and to tune detections. Most organisations collect metadata for everything, and content selectively.' },
      { t: 'bullets', title: 'Questions telemetry must answer', layout: 'grid', cols: 2, items: [
          { icon: 'user', h: 'Who sent it?', d: 'User, agent, key, source', k: 'human' },
          { icon: 'model', h: 'What answered?', d: 'Model, prompt and config versions', k: 'model' },
          { icon: 'database', h: 'What context was used?', d: 'Documents and memory retrieved', k: 'data' },
          { icon: 'robot', h: 'What did it do?', d: 'Tool calls and their effects', k: 'threat' },
          { icon: 'arrow', h: 'What left the system?', d: 'Outputs, messages, data sent', k: 'control' },
          { icon: 'money', h: 'What did it cost?', d: 'Tokens, compute, time', k: 'neutral' } ],
        say: 'A good test of AI telemetry is whether it answers six questions during an investigation. | Who sent the request: which user, agent, key and source? | What answered it: which model, and which prompt and configuration versions? | What context was used: which documents and memories were retrieved? | What did the system do: which tools did it call, and with what effect? | What left the system: which outputs, messages or data went out? | And what did it cost, in tokens, compute and time?' },
      { t: 'summary', items: ['Collect prompts, outputs, retrieval, tool calls, API traffic and guardrail decisions', 'Instrument the gateway, orchestrator, retrieval, serving and tools', 'Join events with one trace ID', 'Metadata for everything; content selectively and protected'],
        say: 'To recap. | Collect telemetry on prompts, outputs, retrieval, tool calls, API traffic and guardrail decisions. | Instrument the gateway, the orchestrator, retrieval, model serving and tools. | Join every event with a shared trace identifier. | And collect metadata for everything, but content selectively, with strong protection.' } ] },
    { type: 'text', md: `### AI telemetry by source
| Source | Key fields | Security uses |
|---|---|---|
| **Gateway and API** | Identity (user, agent, key), client and source IP, endpoint, model requested, tokens in and out, latency, status and errors, rate-limit events | Credential misuse, abuse and extraction patterns, denial of wallet, shadow AI use |
| **Prompts and inputs** | Prompt text or a keyed hash, attachments, system prompt and template version, conversation and session IDs | Jailbreak and injection attempts, sensitive data sent to models |
| **Completions and outputs** | Output text or hash, refusals, finish reason, structured output validity, safety scores | Data leakage, harmful outputs, eroded safety behaviour |
| **Embeddings and retrieval** | Query, index and embedding model version, document IDs returned, scores, access-control filter applied | Poisoned or unexpected documents, access-control bypass, indirect injection sources |
| **Agents and tools** | Plan steps, tool name, arguments, results, approvals, delegated identity, MCP server | Excessive agency, hijacked agents, data exfiltration, runaway loops |
| **Guardrails and DLP** | Policy, detector, verdict, confidence, action taken (block, mask, flag) | Attack trends, false positives, control failures |
| **Platform and control plane** | Model registry changes, deployments, configuration and permission changes, key creation | Tampering, drift and privilege escalation (Module 5.1) |

### Getting telemetry out of AI systems
- **Gateways** give one consistent collection point for all model traffic, including traffic to external providers (Module 4.2).
- **Instrumentation libraries** in applications and agent frameworks emit traces and events. OpenTelemetry’s semantic conventions for generative AI (still at development status in 2026) define standard names, such as \`gen_ai.request.model\`, \`gen_ai.usage.input_tokens\` and \`gen_ai.usage.output_tokens\`, and agent operations such as \`invoke_agent\` and \`execute_tool\`. Capturing prompt and response **content is opt-in**, which supports privacy by default.
- **Provider logs** from hosted model platforms and cloud audit logs cover usage, administration and configuration changes.
- **Trace context:** propagate a trace ID across the gateway, agent, retrieval, model and tool calls (W3C Trace Context), so a whole request can be reconstructed.

### Practical choices
- Always record **versions**: model, system prompt, guardrail policy and index. Behaviour depends on them, and an investigation can’t reproduce an answer without them.
- Model outputs are often **non-deterministic**, so you can’t regenerate the same answer later. If an output may matter as evidence, keep it, or a keyed hash of it (Module 3.5).
- Decide **content capture by risk**: metadata always; content for high-risk applications, flagged sessions or a sample; full content only in a restricted store (Section 4).
- Watch **cost and volume**: AI telemetry is large. Filter, sample and tier storage, but never drop security-relevant events such as guardrail blocks, tool calls and administrative changes.` },
    { type: 'match', title: 'Which telemetry answers the question?', pairs: [
      ['Did the assistant retrieve a document the user shouldn’t see?', 'Retrieval logs with document IDs and access filters'],
      ['Is a stolen API key being used from a new country?', 'Gateway logs with identity, source and volume'],
      ['What did the agent send to the external email address?', 'Tool-call logs with arguments and results'],
      ['Which system prompt version produced the harmful answer?', 'Prompt metadata with template and version'],
      ['How often is the injection detector firing this week?', 'Guardrail decision logs'] ] },
    { type: 'callout', kind: 'exam', title: 'Telemetry questions', md: `The best answers collect telemetry at **several layers** (gateway, agent, retrieval, model, tools), **join events with a trace ID**, and record **versions** of models, prompts and policies. Be wary of answers that log only the final output, or that log all content everywhere with no protection.` },
    { type: 'check', q: { q: 'After an incident, investigators can see a customer assistant’s final answers, but can’t tell which documents it retrieved or which tools it called before answering. What should be added FIRST?', o: ['Longer retention for the existing logs of the assistant’s final answers', 'Retrieval and tool-call telemetry, linked to each request by a trace ID', 'A weekly report summarising the topics customers asked the assistant about', 'More detailed error messages shown to customers when the assistant fails'], a: 1, b: 1,
      why: 'Investigators need the intermediate steps, joined to each request, to reconstruct what happened. Longer retention of the same logs, topic summaries and error messages don’t show what the assistant retrieved or did.' } }
  ]
};
