/* 5.7 · Section 3: BC/DR plans and critical AI dependency mapping */
module.exports = {
  title: 'Business continuity, disaster recovery and AI dependency mapping', covers: [3],
  blocks: [
    { type: 'video', title: 'When the AI isn’t there', kicker: 'Module 5.7 · Video 3 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.7 · Recovery and continuity', title: 'When the AI isn’t there', sub: 'BC/DR plans and critical AI dependency mapping', icon: 'building',
        say: 'As AI moves into core processes, its failure becomes a business continuity problem. A provider outage, a GPU shortage or a kill switch can stop work that used to run without AI. | This video covers business continuity and disaster recovery planning for AI, starting with mapping critical AI dependencies.' },
      { t: 'bullets', title: 'AI dependencies to map', layout: 'grid', cols: 2, items: [
          { icon: 'cloud', h: 'Model providers', d: 'Hosted models and their regions', k: 'model' },
          { icon: 'gpu', h: 'Compute', d: 'GPU capacity and reservations', k: 'neutral' },
          { icon: 'database', h: 'Data and indexes', d: 'Vector stores, pipelines, feature stores', k: 'data' },
          { icon: 'plug', h: 'Tools and connectors', d: 'APIs and MCP servers agents use', k: 'human' },
          { icon: 'key', h: 'Identity and secrets', d: 'Keys, tokens, identity providers', k: 'threat' },
          { icon: 'shield', h: 'Safety services', d: 'Guardrails, DLP, monitoring', k: 'control' } ],
        say: 'Six kinds of dependency sit behind most AI services. | Model providers: the hosted models you call, and the regions they run in. | Compute: GPU capacity, and any reservations you rely on. | Data and indexes: vector stores, data pipelines and feature stores. | Tools and connectors: the APIs and MCP servers that agents use to act. | Identity and secrets: keys, tokens and the identity providers that issue them. | And safety services: guardrails, data loss prevention and monitoring. If they fail closed, as they should, the AI service stops too.' },
      { t: 'flow', title: 'Mapping one AI service',
        nodes: [
          { id: 'proc', x: 230, y: 330, icon: 'users', label: 'Customer support', sub: 'business process', k: 'neutral', w: 300 },
          { id: 'asst', x: 700, y: 330, icon: 'robot', label: 'AI assistant', sub: 'the service', k: 'model', w: 280 },
          { id: 'llm', x: 1200, y: 330, icon: 'cloud', label: 'Model provider', sub: 'single region today', k: 'threat', w: 300 },
          { id: 'vdb', x: 1200, y: 690, icon: 'database', label: 'Vector database', sub: 'daily snapshots', k: 'data', w: 300 },
          { id: 'tool', x: 700, y: 690, icon: 'plug', label: 'CRM connector', sub: 'via MCP server', k: 'human', w: 290 },
          { id: 'idp', x: 230, y: 690, icon: 'key', label: 'Identity and keys', sub: 'vaulted secrets', k: 'control', w: 300 } ],
        edges: [{ from: 'proc', to: 'asst', k: 'neutral' }, { from: 'asst', to: 'llm', k: 'model' }, { from: 'asst', to: 'vdb', k: 'data' }, { from: 'asst', to: 'tool', k: 'human' }, { from: 'asst', to: 'idp', k: 'control' }],
        steps: [
          { show: 'proc asst proc-asst', flow: 'proc-asst', hi: 'asst' },
          { show: 'llm asst-llm', flow: 'asst-llm', hi: 'llm', mark: { llm: 'alert' } },
          { show: 'vdb asst-vdb', flow: 'asst-vdb', hi: 'vdb' },
          { show: 'tool asst-tool', flow: 'asst-tool', hi: 'tool' },
          { show: 'idp asst-idp', flow: 'asst-idp', hi: 'idp' } ],
        say: 'Here is a dependency map for one service. The customer support process depends on an AI assistant. | The assistant calls a hosted model from a single provider region: a single point of failure, so it needs a tested alternative. | It retrieves answers from a vector database, protected by daily snapshots. | It updates customer records through a CRM connector on an MCP server, which needs its own recovery plan. | And it depends on the identity provider and vaulted keys. Each dependency gets an owner, a recovery objective and a fallback.' },
      { t: 'compare', title: 'Continuity needs differ', labels: ['RTO', 'RPO', 'Fallback', 'Testing'],
        cols: [{ h: 'Fraud detection', icon: 'shield', k: 'threat' }, { h: 'Drafting tool', icon: 'pen', k: 'neutral' }],
        rows: [
          ['Minutes', 'Days'],
          ['No transactions lost', 'Last day of chats'],
          ['Rules engine and manual review', 'Staff work without AI'],
          ['Quarterly failover test', 'Annual plan review'] ],
        say: 'Business impact analysis shows that continuity needs differ widely. | A fraud detection model may need to be back within minutes, while an internal drafting assistant can wait days. | Fraud scoring can’t lose transactions. The drafting assistant can lose the last day of conversation history. | Fraud detection falls back to a rules engine with manual review. Staff can simply work without the drafting assistant. | And fraud failover is tested quarterly, while the drafting assistant’s plan is reviewed once a year.' },
      { t: 'bullets', title: 'AI continuity strategies', layout: 'grid', cols: 2, items: [
          { icon: 'copy', h: 'Second provider or model', d: 'Tested for behaviour and safety', k: 'model' },
          { icon: 'globe', h: 'Multi-region deployment', d: 'No single region failure', k: 'neutral' },
          { icon: 'sliders', h: 'Degraded mode', d: 'Simpler model or rules', k: 'control' },
          { icon: 'archive', h: 'Offline copies', d: 'Immutable weights, indexes, configs', k: 'data' },
          { icon: 'gpu', h: 'Capacity plans', d: 'Reserved or burst compute', k: 'human' },
          { icon: 'doc', h: 'Contracts and exit plans', d: 'SLAs, notice, portability', k: 'threat' } ],
        say: 'Six strategies keep AI services running. | A second provider or model, tested in advance for behaviour and safety, because prompts and outputs rarely transfer unchanged. | Multi-region deployment, so one region’s failure doesn’t stop the service. | A degraded mode, using a simpler model or rules, that keeps the essentials running. | Offline, immutable copies of weights, indexes and configurations. | Capacity plans for compute, reserved or with agreed burst options. | And contracts and exit plans: service levels, notice of changes and the ability to move your data and fine-tunes elsewhere.' },
      { t: 'summary', items: ['Map providers, compute, data, tools, identity and safety services', 'Give each dependency an owner, objective and fallback', 'Set RTO and RPO from business impact analysis', 'Test alternative models, failover and degraded modes'],
        say: 'To recap. | Map every AI dependency: providers, compute, data and indexes, tools, identity and safety services. | Give each one an owner, a recovery objective and a fallback. | Set recovery time and recovery point objectives from business impact analysis. | And test alternative models, failover and degraded modes before you need them.' } ] },
    { type: 'text', md: `### Frameworks
Business continuity management is set out in **ISO 22301**, ICT readiness for business continuity in **ISO/IEC 27031**, and contingency planning in **NIST SP 800-34**. Sector rules add requirements: for example, **DORA** requires EU financial entities to manage ICT third-party risk, including concentration risk and exit strategies, which applies to critical AI providers.

### Critical AI dependency mapping
For each AI service that supports a critical process, record:
| Item | Example questions |
|---|---|
| **Business process and impact** | What stops if the AI stops? What is the maximum tolerable downtime? |
| **Models and providers** | Which model versions, providers and regions? Which fourth parties do they rely on? |
| **Data and indexes** | Which pipelines, vector stores and feature stores? How are they backed up, and how far back? |
| **Tools and agents** | Which APIs, MCP servers and connectors? What happens to in-flight actions? |
| **Identity and secrets** | Which keys and identities? Can they be recovered or reissued quickly? |
| **Safety and monitoring** | Which guardrails and monitoring services? Do they fail closed, and what then? |
| **People** | Who can operate, retrain or switch the system? Are skills concentrated in one person? |

### BC/DR plans for AI
- **Set objectives** (RTO, RPO and maximum tolerable downtime) per AI service from business impact analysis.
- **Plan alternatives:** secondary models or providers, multi-region deployments, degraded modes and manual processes.
- **Test alternative models properly:** switching models changes behaviour. Pre-test prompts, guardrails, safety evaluations and output formats on the alternative, and keep it ready.
- **Protect recovery assets:** immutable, off-site copies of weights, checkpoints, index snapshots, datasets and configurations, with retention long enough to predate slow-burning incidents (Section 1).
- **Watch concentration risk:** many services relying on one provider, region or model family can fail together.
- **Exercise the plans:** failover tests, game days and tabletop exercises that include AI scenarios such as provider outages, forced model retirements and kill-switch activation (Module 5.1).
- **Contracts:** availability commitments, notice of model changes and retirements, data and fine-tune portability, and support during incidents (Module 2.5).` },
    { type: 'scenario', title: 'The single-provider claims assistant', md: `An insurer’s claims triage now runs entirely through an AI assistant that calls one hosted model in a single region. The manual triage team was disbanded last year. The provider announces that the model version will be retired in 60 days, and the same week a regional outage stops claims processing for nine hours.`,
      q: { q: 'Which action BEST improves the insurer’s resilience?', o: ['Ask the provider for compensation for the outage under the existing contract', 'Map dependencies, set objectives, and test an alternative model and a manual fallback', 'Move the assistant to a different single region with the same provider', 'Wait for the provider’s replacement model and switch on the retirement date'], a: 1, b: 3,
        why: 'Dependency mapping, recovery objectives and tested alternatives address both outages and forced retirements, and restoring a manual fallback covers total AI loss. Compensation, another single region or a last-minute switch leave the single points of failure in place.' } },
    { type: 'callout', kind: 'exam', title: 'Continuity questions', md: `Look for **dependency mapping** (including providers, compute, data, tools, identity and safety services), **RTO and RPO set from business impact analysis**, **tested alternatives** (models, regions, degraded and manual modes) and attention to **concentration risk**. "The provider has a 99.9% SLA" is not a continuity plan.` },
    { type: 'check', q: { q: 'An organisation plans to fail over to a second model provider if its main provider has an outage. What MUST be done for this to work?', o: ['Nothing, because all large language models behave in much the same way', 'Test prompts, guardrails, safety and output formats on the second model in advance', 'Sign the contract with the second provider only once an outage actually happens', 'Ask staff to rewrite all of the prompts manually on the day of the outage'], a: 1, b: 3,
      why: 'Models differ in behaviour, safety and formats, so the alternative must be prepared and tested before it is needed. Assuming equivalence, last-minute contracts and rewriting prompts during an outage all fail when it matters.' } }
  ]
};
