/* 4.1 · Section 1: AI-specific security strategies (Zero Trust, defence in depth, privacy by design, secure defaults) */
module.exports = {
  title: 'Security strategies for AI systems', covers: [1],
  blocks: [
    { type: 'video', title: 'Never trust the model', kicker: 'Module 4.1 · Video 1 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.1 · Secure AI design', title: 'Never trust the model', sub: 'Zero Trust, defence in depth, privacy by design and secure defaults', icon: 'shield',
        say: 'Familiar security strategies still apply to AI, but with a twist: the model itself can be talked into misbehaving by the content it reads. | This video applies four strategies to AI systems: Zero Trust, defence in depth, privacy by design, and secure defaults.' },
      { t: 'bullets', title: 'Zero Trust, applied to AI', layout: 'grid', cols: 2, items: [
          { icon: 'id', h: 'Verify every identity', d: 'Users, agents, tools and services', k: 'control' },
          { icon: 'key', h: 'Least privilege, per request', d: 'Scoped, short-lived access', k: 'human' },
          { icon: 'model', h: 'Treat the model as untrusted', d: 'Its output is input to everything else', k: 'model' },
          { icon: 'doc', h: 'Treat content as untrusted', d: 'Prompts, documents, tool results', k: 'data' },
          { icon: 'split', h: 'Segment AI workloads', d: 'Contain a compromised component', k: 'neutral' },
          { icon: 'eye', h: 'Verify continuously', d: 'Log, monitor, re-evaluate', k: 'threat' } ],
        say: 'Zero Trust means no implicit trust based on network location or past behaviour. For AI, that has six consequences. | Verify every identity: human users, and also agents, tools and services. | Grant least privilege for each request, with scoped, short-lived access. | Treat the model as an untrusted component. Its output is input to everything downstream, and it can be manipulated. | Treat all content as untrusted too: prompts, retrieved documents and tool results can all carry hidden instructions. | Segment AI workloads, so a compromised component can’t reach everything else. | And verify continuously, with logging, monitoring and regular re-evaluation.' },
      { t: 'shield', title: 'Defence in depth for an AI application', target: 'Data and actions', targetIcon: 'database',
        layers: ['Identity and access', 'Input controls', 'Output controls', 'Action limits and approval'],
        attacks: [{ t: 'Unauthorised user', stop: 0 }, { t: 'Injected instruction', stop: 1 }, { t: 'Sensitive data in reply', stop: 2 }, { t: 'Harmful tool call', stop: 3 }],
        say: 'Defence in depth assumes any single control can fail, so it layers them. | Identity and access controls stop unauthorised users and services before they reach the model. | Input controls screen and separate untrusted content, catching many injected instructions, though never all. | Output controls inspect what the model produces, catching sensitive data or unsafe content before anyone sees it. | And action limits, with human approval for high-impact operations, stop a manipulated model from doing real damage. The innermost layers matter most, because they hold even when the model is fooled.' },
      { t: 'compare', title: 'Privacy by design and secure defaults', labels: ['Core idea', 'In an AI system', 'Example default'],
        cols: [{ h: 'Privacy by design', icon: 'user', k: 'human' }, { h: 'Secure defaults', icon: 'lock', k: 'control' }],
        rows: [
          ['Build privacy in from the start', 'Safe without extra configuration'],
          ['Minimise data in prompts, logs and training', 'Tools, scopes and features off until needed'],
          ['Training on customer data is opt-in', 'New agents get read-only tools'] ],
        say: 'Two more strategies shape the design itself. | Privacy by design builds privacy in from the start rather than adding it later. Secure defaults mean a system is safe out of the box, without anyone having to configure it. | In an AI system, privacy by design means minimising personal data in prompts, logs and training sets. Secure defaults mean tools, permissions and risky features stay off until someone deliberately enables them. | For example: training on customer data is opt-in rather than opt-out, and a newly created agent starts with read-only tools.' },
      { t: 'bullets', title: 'Guidance worth knowing', items: [
          { icon: 'book', h: 'Secure AI system development', d: 'NCSC, CISA and partners, 2023', k: 'data' },
          { icon: 'flag', h: 'Secure by Design', d: 'CISA and international partners', k: 'control' },
          { icon: 'doc', h: 'Zero Trust Architecture', d: 'NIST SP 800-207', k: 'neutral' },
          { icon: 'list', h: 'AI Cyber Security Code of Practice', d: 'UK government, 2025', k: 'human' } ],
        say: 'Several pieces of guidance pull these ideas together. | The Guidelines for Secure AI System Development, published in 2023 by the UK’s National Cyber Security Centre, the US Cybersecurity and Infrastructure Security Agency and partners from many countries, cover secure design, development, deployment, and operation. | CISA’s Secure by Design principles call on vendors to own their customers’ security outcomes, be transparent, and lead from the top. | NIST Special Publication 800-207 defines Zero Trust Architecture. | And the UK government’s AI Cyber Security Code of Practice, from 2025, sets baseline principles across the AI lifecycle.' },
      { t: 'summary', items: ['Zero Trust: verify every identity; treat model and content as untrusted', 'Defence in depth: identity, input, output and action layers', 'Privacy by design: minimise data across prompts, logs and training', 'Secure defaults: risky tools and features off until enabled'],
        say: 'To recap. | Zero Trust means verifying every identity, and treating both the model and the content it reads as untrusted. | Defence in depth layers identity, input, output and action controls, with the innermost layers holding even when the model is fooled. | Privacy by design minimises personal data across prompts, logs and training. | And secure defaults keep risky tools and features off until someone deliberately enables them.' } ] },
    { type: 'text', md: `### Zero Trust for AI
NIST SP 800-207 describes Zero Trust as removing implicit trust based on network location: every request is authenticated, authorised and evaluated against policy, using a **policy decision point** and **policy enforcement points**. Applied to AI systems:
- **Identities include non-humans.** Agents, tools, MCP servers, pipelines and model endpoints each need their own identity and credentials (Module 4.5).
- **The model is not a security boundary.** A model can be manipulated by prompt injection, so it must never be the component that decides whether an action is authorised. Enforce authorisation in code and policy outside the model.
- **Content is untrusted.** Retrieved documents, emails, web pages and tool outputs may contain instructions. Label them as data, keep them separate from instructions, and limit what they can trigger.
- **Least privilege per request.** Use scoped, short-lived tokens; act on behalf of the user (delegated access) rather than with a broad service account; grant just-in-time elevation for sensitive operations (Module 4.6).
- **Micro-segmentation.** Separate training, serving, retrieval stores and agent sandboxes; restrict egress so a compromised component can’t send data anywhere (Module 4.2).
- **Continuous verification.** Log prompts, tool calls and decisions (with privacy protections, Module 3.5), and monitor them (Domain 5).

### Defence in depth
No single AI control is reliable on its own: input filters miss novel injections, models can be jailbroken, and output filters produce false negatives. Layer them:

| Layer | Example controls |
|---|---|
| **Identity and access** | Strong authentication, delegated access, per-user permissions on data and tools |
| **Input** | Validation, size limits, content separation, injection screening, DLP (Module 3.5) |
| **Model** | Safety-tuned models, system prompts that define scope (helpful but never relied on as a control) |
| **Output** | Encoding, schema validation, DLP, moderation, grounding checks |
| **Action** | Allow-listed tools, scoped credentials, approval for high-impact actions, rate and cost limits |
| **Monitoring and response** | Telemetry, anomaly detection, kill switches and rollback (Domain 5) |

The innermost layers, action limits and access control, matter most, because they protect you even when the model has been fooled.

### Privacy by design
Module 3.2 covers the principles. Architecture choices that put them into practice include: sending only the minimum data in prompts; pseudonymising or tokenising identifiers before external models; private endpoints and regional processing; short retention for prompts and outputs; no training on customer data without consent; and separating personal data stores from general retrieval indexes.

### Secure defaults
- New agents start with **no tools or read-only tools**; write and delete actions need explicit approval.
- **Minimum scopes** on tokens and API keys; no wildcard permissions.
- **Logging on** by default, with privacy controls; **retention short** by default.
- **Code execution, web browsing and file system access off** until a use case needs them, and then sandboxed.
- **Safe model settings**: conservative output limits, safety systems enabled, and pinned model versions.
- **Fail closed** when a security control is unavailable (Module 3.6).

### Guidance
- **Guidelines for Secure AI System Development** (UK NCSC, US CISA and international partners, 2023): secure design, secure development, secure deployment, and secure operation and maintenance.
- **CISA Secure by Design**: take ownership of customer security outcomes, embrace radical transparency and accountability, and lead from the top.
- **NIST SP 800-207**: Zero Trust Architecture.
- **UK AI Cyber Security Code of Practice** (2025): baseline security principles for developers and operators across the AI lifecycle.
- Industry frameworks such as Google’s Secure AI Framework (SAIF) and the OWASP AI Exchange, and MITRE ATLAS for adversary techniques.` },
    { type: 'callout', kind: 'exam', title: 'The model is never the control', md: `If an answer relies on the model to enforce security (a system prompt telling it to refuse, or asking it to check permissions), it is almost always wrong. Look for controls that **enforce outside the model**: identity, authorisation in code, scoped credentials, output validation and human approval.` },
    { type: 'match', title: 'Which strategy is this?', pairs: [
      ['A new agent can only read until someone approves write access', 'Secure defaults'],
      ['The refund API checks ownership, whatever the model asks for', 'Zero Trust: authorisation outside the model'],
      ['Input screening, output DLP and approval all apply to the same request', 'Defence in depth'],
      ['Customer identifiers are tokenised before prompts leave the organisation', 'Privacy by design'] ] },
    { type: 'check', q: { q: 'An assistant can call an internal HR API. Designers propose that the system prompt instruct the model to retrieve only records the current user is entitled to see. Which design BEST applies Zero Trust?', o: ['Keep the instruction, and add more detailed rules about entitlements to the system prompt', 'Call the API with the user’s delegated credentials, so the API itself enforces their entitlements', 'Give the assistant a broad service account, but log every record that it retrieves for review', 'Ask the model to double-check each request against the user’s role before calling the API'], a: 1, b: 1,
      why: 'Zero Trust enforces authorisation outside the model: delegated credentials mean the HR API applies the user’s own permissions, whatever the model is persuaded to request. Prompt rules and model self-checks can be manipulated, and logging a broad account only detects misuse after it happens.' } }
  ]
};
