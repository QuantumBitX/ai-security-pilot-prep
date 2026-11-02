/* 5.5 · Section 1: AI-specific triage taxonomy (prompt injection, jailbreaking, data poisoning, model theft) */
module.exports = {
  title: 'An AI-specific triage taxonomy', covers: [1],
  blocks: [
    { type: 'video', title: 'What kind of AI incident is this?', kicker: 'Module 5.5 · Video 1 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.5 · AI incident response', title: 'What kind of AI incident is this?', sub: 'An AI-specific triage taxonomy', icon: 'tag',
        say: 'The first minutes of an incident decide much of what follows. If responders classify an AI incident wrongly, they call the wrong people, run the wrong playbook and may destroy the evidence they need. | This video covers an AI-specific triage taxonomy, and how to use it to scope and prioritise incidents.' },
      { t: 'bullets', title: 'Core AI incident categories', layout: 'grid', cols: 2, items: [
          { icon: 'chat', h: 'Prompt injection', d: 'Instructions hijack the model’s task', k: 'data' },
          { icon: 'unlock', h: 'Jailbreaking', d: 'Safety rules bypassed', k: 'human' },
          { icon: 'bug', h: 'Data poisoning', d: 'Training, tuning or retrieval data corrupted', k: 'threat' },
          { icon: 'copy', h: 'Model theft', d: 'Weights stolen or behaviour extracted', k: 'model' },
          { icon: 'eye', h: 'Sensitive data leakage', d: 'Training data, prompts or documents exposed', k: 'neutral' },
          { icon: 'robot', h: 'Agent misuse', d: 'Tools and permissions used for harm', k: 'control' } ],
        say: 'Six categories cover most AI incidents. | Prompt injection: instructions, often hidden in content the model reads, hijack its task or its tools. | Jailbreaking: someone gets the model to ignore its safety rules and produce content it should refuse. | Data poisoning: training, fine-tuning or retrieval data is corrupted to change the model’s behaviour. | Model theft: weights are stolen, or the model’s behaviour is copied through systematic querying. | Sensitive data leakage: training data, system prompts or retrieved documents are exposed through outputs. | And agent misuse: an agent’s tools and permissions are used to cause harm, whether through manipulation, error or a stolen identity.' },
      { t: 'compare', title: 'Jailbreak or prompt injection?', labels: ['Who attacks', 'Goal', 'Delivered by', 'Typical harm'],
        cols: [{ h: 'Jailbreak', icon: 'unlock', k: 'human' }, { h: 'Prompt injection', icon: 'chat', k: 'data' }],
        rows: [
          ['Usually the user themselves', 'Often a third party'],
          ['Bypass the model’s safety rules', 'Hijack the model’s task or tools'],
          ['The prompt itself', 'Often content the model reads'],
          ['Harmful content produced', 'Data sent out, actions taken'] ],
        say: 'Two categories are often confused. A jailbreak is a kind of prompt injection, but responders handle them differently. | In a jailbreak, the attacker is usually the user. In indirect prompt injection, the attacker is often a third party the user never sees. | A jailbreak aims to bypass the model’s safety rules. Injection aims to hijack the model’s task or its tools. | A jailbreak arrives in the prompt itself. Injection often arrives in content the model reads: an email, a web page or a document. | And a jailbreak typically produces harmful content, while injection can send data out or take actions on the victim’s behalf.' },
      { t: 'flow', title: 'Triage in six steps',
        nodes: [
          { id: 'al', x: 230, y: 330, icon: 'siren', label: 'Alert or report', sub: 'detection, user, provider', k: 'threat', w: 310 },
          { id: 'cls', x: 700, y: 330, icon: 'tag', label: 'Classify', sub: 'taxonomy category', k: 'data', w: 280 },
          { id: 'sc', x: 1200, y: 330, icon: 'search', label: 'Scope', sub: 'systems, data, users, agents', k: 'human', w: 330 },
          { id: 'sev', x: 1200, y: 690, icon: 'scale', label: 'Set severity', sub: 'impact, spread, persistence', k: 'model', w: 330 },
          { id: 'as', x: 700, y: 690, icon: 'users', label: 'Assign', sub: 'playbook and team', k: 'neutral', w: 280 },
          { id: 'act', x: 230, y: 690, icon: 'lock', label: 'Contain or monitor', sub: 'per playbook', k: 'control', w: 310 } ],
        edges: [{ from: 'al', to: 'cls', k: 'threat' }, { from: 'cls', to: 'sc', k: 'data' }, { from: 'sc', to: 'sev', k: 'human' }, { from: 'sev', to: 'as', k: 'model' }, { from: 'as', to: 'act', k: 'neutral' }],
        steps: [
          { show: 'al', hi: 'al', mark: { al: 'alert' } },
          { show: 'cls al-cls', flow: 'al-cls', hi: 'cls' },
          { show: 'sc cls-sc', flow: 'cls-sc', hi: 'sc' },
          { show: 'sev sc-sev', flow: 'sc-sev', hi: 'sev' },
          { show: 'as sev-as', flow: 'sev-as', hi: 'as' },
          { show: 'act as-act', flow: 'as-act', hi: 'act', mark: { act: 'lock' } } ],
        say: 'Triage follows six steps. It starts with an alert or a report: from a detection, a user, a red teamer or the model provider. | Classify the incident using the taxonomy. It may fit more than one category, such as injection that led to data leakage. | Scope it: which systems, models and versions, which data, which users and which agents are involved? | Set severity from impact, how far it has spread, and whether it persists, as poisoning or compromised memory can. | Assign the matching playbook and response team. | And contain the incident, or keep monitoring it, as the playbook directs.' },
      { t: 'bullets', title: 'What drives AI incident severity', layout: 'grid', cols: 2, items: [
          { icon: 'database', h: 'Data involved', d: 'Personal, regulated or confidential', k: 'data' },
          { icon: 'robot', h: 'Actions taken', d: 'What agents actually did', k: 'threat' },
          { icon: 'users', h: 'Scale', d: 'Users, customers, systems affected', k: 'human' },
          { icon: 'cycle', h: 'Persistence', d: 'Poisoned models, memory, indexes', k: 'model' },
          { icon: 'gavel', h: 'Regulatory reach', d: 'Breach or serious-incident duties', k: 'neutral' },
          { icon: 'rollback', h: 'Reversibility', d: 'Can the harm be undone?', k: 'control' } ],
        say: 'Six factors drive the severity of an AI incident. | The data involved: personal, regulated or confidential information raises severity quickly. | Actions taken: what agents actually did, such as sending messages, moving money or changing records. | Scale: how many users, customers and systems are affected. | Persistence: poisoned models, corrupted agent memory and tainted indexes keep causing harm until they are cleaned. | Regulatory reach: whether data breach or serious-incident reporting duties apply. | And reversibility: whether the harm can be undone.' },
      { t: 'summary', items: ['Classify: injection, jailbreak, poisoning, theft, leakage, agent misuse', 'Distinguish jailbreaks from indirect injection', 'Classify, scope, set severity, assign, then contain', 'Severity: data, actions, scale, persistence, regulation, reversibility'],
        say: 'To recap. | Classify AI incidents using a shared taxonomy: prompt injection, jailbreaking, data poisoning, model theft, data leakage and agent misuse. | Distinguish jailbreaks from indirect injection, because the attacker, the route and the harm differ. | Triage by classifying, scoping, setting severity and assigning, before containing. | And set severity from the data involved, actions taken, scale, persistence, regulatory reach and reversibility.' } ] },
    { type: 'text', md: `### An AI incident taxonomy
| Category | Typical indicators | Common first responders | MITRE ATLAS examples |
|---|---|---|---|
| **Prompt injection** (direct or indirect) | Injection detections, unexpected tool calls or destinations, outputs following instructions from documents | SecOps, application team | LLM Prompt Injection |
| **Jailbreaking** | Safety classifier hits, harmful outputs, bursts of rephrased attempts from one account | SecOps, trust and safety, model owner | LLM Jailbreak |
| **Data poisoning** | Behaviour shifts, failing canaries, backdoor-like triggers, suspicious data changes | MLOps, data science, data owner | Poison Training Data |
| **Model theft** | Unusual weight downloads, model storage access, extraction-like query patterns | SecOps, MLOps, legal | Exfiltration via ML inference API; model extraction techniques |
| **Sensitive data leakage** | DLP hits on outputs, canary tokens in responses, system prompt disclosure | SecOps, privacy, data owner, legal | Data and system prompt leakage techniques |
| **Agent misuse** | Out-of-profile tools, bulk actions, unapproved high-impact actions | SecOps, agent owner | AI agent and tool abuse techniques |
| **Supply chain compromise** | Malicious model files or packages, tampered pipelines | SecOps, MLOps, procurement | ML supply chain compromise |
| **Availability and abuse** | Token floods, denial of wallet, capacity exhaustion | SecOps, platform, finance | Cost harvesting, denial of ML service |
| **Harmful output or safety failure** | Dangerous, discriminatory or defamatory outputs without an attacker | Model owner, trust and safety, legal | (Often a limitation, not an attack: Module 6.5) |

The OWASP Top 10 for LLM Applications treats **jailbreaking as a form of prompt injection**. Many organisations still track them separately, because the attacker, delivery route and harm differ, and so do the playbooks. Use ATLAS technique names in incident records so that intelligence, detections and reports line up (Module 5.2). Incidents often span categories: an injection may lead to data leakage through agent misuse, so record a primary category and any secondary ones.

### Scoping questions
- Which applications, model versions, prompts, indexes and agents are involved? (Use the inventory and lineage.)
- Which identities and sessions, and on whose behalf were agents acting?
- What data was accessed, output or sent, and where did it go?
- When did it start? Are poisoned data, compromised memory or a tampered model still in use?
- Did the provider or a supplier report it, and do they hold relevant logs?

### Severity in practice
Combine **impact** (data, actions, people, money, safety), **spread** (users and systems affected) and **persistence** into a severity level that drives escalation (Section 2) and containment (Section 3). Be ready to raise severity as scoping reveals more; AI incidents often look small at first.` },
    { type: 'match', title: 'Classify the incident', pairs: [
      ['A user coaxes the chatbot into giving instructions it should refuse', 'Jailbreaking'],
      ['An email read by the assistant makes it forward invoices to an outsider', 'Indirect prompt injection'],
      ['Model weights are copied from a storage bucket to an unknown account', 'Model theft'],
      ['A fine-tuning set from a vendor contains records that plant a trigger phrase', 'Data poisoning'],
      ['The assistant quotes another customer’s order details in a reply', 'Sensitive data leakage'] ] },
    { type: 'callout', kind: 'exam', title: 'Triage questions', md: `Expect questions that test whether you can **classify** an AI incident correctly (especially **jailbreak versus indirect injection**, and **poisoning versus drift**) and **scope** it using inventory and lineage. Severity depends on **data, actions, scale, persistence, regulation and reversibility**, not on how alarming the output looks.` },
    { type: 'check', q: { q: 'A customer support agent starts adding links to an unknown site in its replies. Investigation shows the instructions came from a product review it retrieved. How should the incident be classified?', o: ['A jailbreak, because the model produced content its safety rules should block', 'Indirect prompt injection, delivered through retrieved third-party content', 'Data poisoning, because the model’s training data must have been corrupted', 'Model theft, because the attacker is copying the model’s behaviour'], a: 1, b: 1,
      why: 'Instructions arriving in retrieved third-party content that hijack the model’s task are indirect prompt injection. It isn’t a jailbreak by the user, the training data wasn’t changed, and nothing was stolen.' } }
  ]
};
