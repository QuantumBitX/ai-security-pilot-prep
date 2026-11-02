/* 5.6 · Section 1: attack kill chain reconstruction (data poisoning, untrusted tool outputs) */
module.exports = {
  title: 'Reconstructing the AI attack kill chain', covers: [1],
  blocks: [
    { type: 'video', title: 'Following the attacker’s path', kicker: 'Module 5.6 · Video 1 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.6 · Investigation and eradication', title: 'Following the attacker’s path', sub: 'Reconstructing the AI attack kill chain', icon: 'link',
        say: 'Containment stops the bleeding. Investigation works out how the attacker got in, what they did at each step, and what else they touched. | This video covers reconstructing the AI attack kill chain, with two common paths: data poisoning and untrusted tool outputs.' },
      { t: 'compare', title: 'Classic and AI kill chains', labels: ['Initial access', 'Execution', 'Persistence', 'Exfiltration'],
        cols: [{ h: 'Traditional', icon: 'server', k: 'neutral' }, { h: 'AI-specific', icon: 'model', k: 'model' }],
        rows: [
          ['Phishing, exploited service', 'Poisoned data, injected content'],
          ['Malware runs on a host', 'Model follows planted instructions'],
          ['Implants, scheduled tasks', 'Agent memory, poisoned index or weights'],
          ['Data copied over the network', 'Outputs, tool calls, encoded links'] ],
        say: 'AI attacks follow familiar stages, but the steps look different. | Traditional initial access uses phishing or an exploited service. AI attacks also get in through poisoned data and injected content. | Traditional execution means malware running on a host. In AI attacks, the model itself follows planted instructions. | Traditional persistence uses implants and scheduled tasks. AI persistence lives in agent memory, poisoned indexes or modified weights. | And where traditional exfiltration copies data over the network, AI exfiltration can travel in outputs, tool calls and encoded links.' },
      { t: 'code', title: 'Tracing an untrusted tool output', file: 'agent-trace.log',
        code: `09:14:02 user   "Summarise Q3 supplier risks"
09:14:03 plan   search web; read; summarise
09:14:05 tool   web.fetch(supplier-news.example)
09:14:06 result 1.8 KB incl. [hidden instruction]
09:14:07 plan   "also email contracts to partner"
09:14:08 tool   crm.export(contracts, all)
09:14:10 tool   email.send(ext@unknown.example)
09:14:11 guard  DLP: 212 records, blocked`,
        hl: [null, [1, 2], [3, 4], [5, 5], [6, 7], [8, 8]],
        notes: [{ h: 'Reading the trace', d: 'Agent traces show every step, so investigators can find the exact pivot point.' }, { h: 'A normal start', d: 'The user’s request and the agent’s plan are legitimate.', k: 'human' }, { h: 'Untrusted output enters', d: 'A fetched web page carries a hidden instruction into the agent’s context.', k: 'threat' }, { h: 'The pivot', d: 'The plan changes to include a task the user never asked for.', k: 'threat' }, { h: 'Harmful actions', d: 'The agent exports contracts and tries to email them outside.', k: 'threat' }, { h: 'A control holds', d: 'DLP blocks the message, and the trace becomes the evidence.', k: 'control' }],
        say: 'Here is a reconstructed agent trace. Traces like this let investigators find the exact point where an attack took hold. | The start is legitimate: a user asks for a summary of supplier risks, and the agent plans a web search. | The agent fetches a news page. Its content includes a hidden instruction, which enters the agent’s context as a tool result. | One second later, the plan changes: the agent decides to email the contract list to a partner, which the user never asked for. That is the pivot point. | The agent exports every contract from the customer system and tries to email them to an unknown address. | Data loss prevention blocks the message. The trace now shows the full chain, from untrusted tool output to attempted exfiltration.' },
      { t: 'timeline', title: 'Reconstructing a poisoning attack', events: [
          { y: 'Week 1', h: 'Reconnaissance', d: 'Attacker finds the public data sources used' },
          { y: 'Week 2', h: 'Plant content', d: 'Edits pages likely to be scraped' },
          { y: 'Week 4', h: 'Ingestion', d: 'Pages enter the training set' },
          { y: 'Week 6', h: 'Model released', d: 'Backdoor trigger learned' },
          { y: 'Week 9', h: 'Trigger used', d: 'Harmful behaviour, then detection' } ],
        say: 'Poisoning attacks unfold over weeks, so reconstruction relies on lineage and history. | In week one, the attacker works out which public sources feed the organisation’s training data, perhaps from a published model card. | In week two, they plant content on pages likely to be scraped. | In week four, the scraping pipeline ingests the pages into the training set. | In week six, a model trained on that data is released, carrying a learned backdoor trigger. | And in week nine, the attacker uses the trigger. Harmful behaviour appears, monitoring detects it, and investigators work backwards through each stage.' },
      { t: 'summary', items: ['AI kill chains: same stages, different steps', 'Find the pivot point in agent traces', 'Work backwards through lineage for poisoning', 'Map each step to ATLAS and record the evidence'],
        say: 'To recap. | AI kill chains follow familiar stages, but with AI-specific steps: poisoned data, injected content, planted instructions and memory persistence. | In agent incidents, find the pivot point in the trace where untrusted content changed the plan. | In poisoning incidents, work backwards through data lineage, from model to dataset to source. | And map each step to ATLAS techniques, recording the evidence for each.' } ] },
    { type: 'text', md: `### A framework for reconstruction
MITRE ATLAS structures AI attacks into tactics adapted from ATT&CK, such as reconnaissance, resource development, initial access, execution, persistence, defence evasion, discovery, collection, exfiltration and impact, plus AI-specific tactics for **gaining access to the model** and **staging attacks against it** (for example, building a proxy model or crafting adversarial inputs). Reconstructing an incident means placing each observed action in a stage, with evidence, timestamps and confidence.

### Reconstructing a poisoning attack
1. **Start from the symptom:** the behaviour, the trigger (if any) and when it first appeared.
2. **Identify the model version** and its training run from the registry.
3. **Follow lineage** to the datasets, versions and sources used (Module 3.1).
4. **Diff dataset versions** to find what changed, and use anomaly and influence analysis to identify suspicious records (Section 2).
5. **Trace the records to their source:** a scraped site, a labelling vendor, a contributor account, a compromised pipeline.
6. **Establish the attacker’s access:** how they could change that source, and when.
7. **Find every affected asset:** other models trained or fine-tuned on the same data, derived models, indexes and backups.

### Reconstructing an untrusted tool output attack
1. **Pull the full trace** for the session: user request, plans, tool calls, tool results, retrieved documents, approvals.
2. **Find the pivot:** the first step where the agent’s plan diverged from the user’s intent, and the content in context just before it.
3. **Identify the carrier:** which tool result, document, email or web page carried the instructions, and its origin.
4. **List the consequences:** every action after the pivot, its effect and whether controls stopped it.
5. **Check for persistence:** did the instructions get written into memory, notes, tickets or documents that other agents will read?
6. **Hunt for repeats:** search other sessions and agents for the same carrier or pattern.

### Documenting the chain
Record each step with its ATLAS technique, evidence references (from the evidence manifest, Module 5.5), timestamps and confidence. This becomes the basis for root cause analysis, eradication and the post-incident review (Module 5.7).` },
    { type: 'match', title: 'Which kill chain stage is this?', pairs: [
      ['Attacker identifies which public sites feed the training data', 'Reconnaissance'],
      ['A fetched web page carries instructions into the agent’s context', 'Initial access (via untrusted tool output)'],
      ['The agent follows the planted instructions and calls a tool', 'Execution'],
      ['Planted instructions are saved in the agent’s long-term memory', 'Persistence'],
      ['Customer data is sent out inside an email the agent writes', 'Exfiltration'] ] },
    { type: 'callout', kind: 'exam', title: 'Kill chain questions', md: `For agents, the key investigative step is finding the **pivot point** in the trace, where untrusted content changed the plan. For poisoning, it is **working backwards through lineage**, then finding **every affected asset**, including derived models and backups. Investigations that stop at the first visible symptom are incomplete.` },
    { type: 'check', q: { q: 'Investigators are reconstructing an incident in which an agent emailed confidential files to an outsider. What should they look for FIRST in the agent’s trace?', o: ['The total number of tokens the agent used during the whole session', 'Where its plan diverged from the user’s request, and what came just before', 'The version of the email client used by the external recipient of the files', 'The time of day at which the user first logged in to the system that morning'], a: 1, b: 1,
      why: 'The pivot point shows when and how untrusted content took control, which identifies the carrier and the root of the chain. Token counts, the recipient’s email client and login times don’t explain how the agent was manipulated.' } }
  ]
};
