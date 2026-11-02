/* 6.1 · Section 1: threat modelling methodologies for AI/ML pipelines (STRIDE, PASTA, MAESTRO) */
module.exports = {
  title: 'Threat modelling methodologies for AI pipelines', covers: [1],
  blocks: [
    { type: 'video', title: 'Choosing how to threat model AI', kicker: 'Module 6.1 · Video 1 of 7', scenes: [
      { t: 'title', kicker: 'Module 6.1 · AI threat modelling', title: 'Choosing how to threat model AI', sub: 'STRIDE, PASTA, MAESTRO and the threat libraries behind them', icon: 'target',
        say: 'Threat modelling asks four questions: what are we building, what can go wrong, what are we going to do about it, and did we do a good job? For AI, the second question has many new answers. | This video compares three methodologies, STRIDE, PASTA and MAESTRO, and shows how to apply them across an AI pipeline.' },
      { t: 'compare', title: 'Three methodologies', labels: ['Focus', 'Approach', 'Best for'],
        cols: [{ h: 'STRIDE', icon: 'list', k: 'data' }, { h: 'PASTA', icon: 'target', k: 'threat' }, { h: 'MAESTRO', icon: 'robot', k: 'model' }],
        rows: [
          ['Threat categories', 'Risk and attack simulation', 'Agentic AI layers'],
          ['Per element and flow', 'Seven stages, business-led', 'Seven layers, cross-layer'],
          ['Design reviews', 'High-value systems', 'Agents and multi-agent'] ],
        say: 'Three methodologies are especially useful for AI. | STRIDE focuses on categories of threat. PASTA focuses on risk, simulating how attacks would unfold. MAESTRO focuses on the layers of agentic AI systems. | STRIDE is applied to each element and data flow in a diagram. PASTA works through seven stages, starting from business objectives. MAESTRO examines seven layers, and the threats that cross between them. | STRIDE suits everyday design reviews of any system. PASTA suits high-value systems that justify deeper analysis. And MAESTRO suits agents and multi-agent systems.' },
      { t: 'layers', title: 'MAESTRO’s seven layers',
        layers: [
          { icon: 'model', label: '1 · Foundation models', sub: 'The models agents reason with', k: 'model' },
          { icon: 'database', label: '2 · Data operations', sub: 'Data, embeddings, retrieval, memory', k: 'data' },
          { icon: 'robot', label: '3 · Agent frameworks', sub: 'Orchestration, tools, protocols', k: 'human' },
          { icon: 'server', label: '4 · Deployment and infrastructure', sub: 'Compute, networks, containers', k: 'neutral' },
          { icon: 'eye', label: '5 · Evaluation and observability', sub: 'Testing, monitoring, logging', k: 'control' },
          { icon: 'shield', label: '6 · Security and compliance', sub: 'Controls across every layer', k: 'threat' },
          { icon: 'network', label: '7 · Agent ecosystem', sub: 'Agents, users and services interacting', k: 'neutral' } ],
        say: 'MAESTRO, from the Cloud Security Alliance, models agentic systems in seven layers. | Layer one: the foundation models that agents reason with. | Layer two: data operations, including retrieval, embeddings and memory. | Layer three: agent frameworks, the orchestration, tools and protocols. | Layer four: deployment and infrastructure. | Layer five: evaluation and observability. | Layer six: security and compliance, which cuts across all the others. | And layer seven: the agent ecosystem, where agents, users and services interact. MAESTRO asks for threats in each layer, and especially threats that cross layers, such as a poisoned memory in layer two hijacking a tool in layer three.' },
      { t: 'flow', title: 'Threats along an AI pipeline',
        nodes: [
          { id: 'src', x: 230, y: 330, icon: 'database', label: 'Data sourcing', sub: 'poisoning, licensing', k: 'data', w: 300 },
          { id: 'trn', x: 700, y: 330, icon: 'gpu', label: 'Training', sub: 'backdoors, tampered code', k: 'model', w: 320 },
          { id: 'reg', x: 1200, y: 330, icon: 'book', label: 'Registry', sub: 'swapped or unsigned models', k: 'neutral', w: 330 },
          { id: 'dep', x: 1200, y: 690, icon: 'pipeline', label: 'Deployment', sub: 'pipeline compromise', k: 'human', w: 300 },
          { id: 'inf', x: 700, y: 690, icon: 'chat', label: 'Inference', sub: 'injection, extraction', k: 'threat', w: 300 },
          { id: 'mon', x: 230, y: 690, icon: 'eye', label: 'Monitoring', sub: 'evasion, log tampering', k: 'control', w: 300 } ],
        edges: [{ from: 'src', to: 'trn', k: 'data' }, { from: 'trn', to: 'reg', k: 'model' }, { from: 'reg', to: 'dep', k: 'neutral' }, { from: 'dep', to: 'inf', k: 'human' }, { from: 'inf', to: 'mon', k: 'threat' }],
        steps: [
          { show: 'src', hi: 'src', mark: { src: 'alert' } },
          { show: 'trn src-trn', flow: 'src-trn', hi: 'trn', mark: { trn: 'alert' } },
          { show: 'reg trn-reg', flow: 'trn-reg', hi: 'reg', mark: { reg: 'alert' } },
          { show: 'dep reg-dep', flow: 'reg-dep', hi: 'dep', mark: { dep: 'alert' } },
          { show: 'inf dep-inf', flow: 'dep-inf', hi: 'inf', mark: { inf: 'alert' } },
          { show: 'mon inf-mon', flow: 'inf-mon', hi: 'mon', mark: { mon: 'alert' } } ],
        say: 'Whatever method you use, apply it across the whole pipeline, not just the deployed application. Data sourcing faces poisoning, and licensing or consent problems. | Training faces backdoors and tampered training code. | The model registry faces swapped or unsigned models. | Deployment faces compromise of the pipeline that ships models. | Inference faces prompt injection, extraction and abuse. | And monitoring itself faces evasion and log tampering. Each stage has its own trust boundaries, owners and controls.' },
      { t: 'bullets', title: 'Threat libraries to draw on', layout: 'grid', cols: 2, items: [
          { icon: 'target', h: 'MITRE ATLAS', d: 'Tactics, techniques, case studies', k: 'threat' },
          { icon: 'list', h: 'OWASP LLM Top 10', d: 'Risks for LLM applications', k: 'data' },
          { icon: 'robot', h: 'OWASP Agentic Top 10', d: 'Risks for agentic applications', k: 'human' },
          { icon: 'book', h: 'NIST AI 100-2', d: 'Adversarial ML taxonomy', k: 'model' },
          { icon: 'database', h: 'Incident databases', d: 'Real AI failures and attacks', k: 'neutral' },
          { icon: 'globe', h: 'Threat intelligence', d: 'Provider and sector reports', k: 'control' } ],
        say: 'Methodologies tell you how to look. Threat libraries tell you what to look for. | MITRE ATLAS catalogues adversary tactics, techniques and real case studies. | The OWASP Top 10 for LLM Applications lists the main risks for applications built on language models. | The OWASP Top 10 for Agentic Applications does the same for agents. | NIST AI 100-2 provides a taxonomy of adversarial machine learning attacks and mitigations. | Incident databases record real AI failures and attacks. | And threat intelligence from AI providers and sector groups shows what attackers are doing now.' },
      { t: 'summary', items: ['STRIDE for categories, PASTA for risk, MAESTRO for agent layers', 'Model the whole pipeline, not just the app', 'Draw threats from ATLAS, OWASP, NIST and intelligence', 'Look for cross-layer threats in agentic systems'],
        say: 'To recap. | Use STRIDE for threat categories, PASTA for risk-driven attack simulation, and MAESTRO for the layers of agentic systems. | Model the whole pipeline, from data sourcing to monitoring, not just the deployed application. | Draw threats from ATLAS, the OWASP lists, NIST AI 100-2 and current threat intelligence. | And in agentic systems, look especially for threats that cross layers.' } ] },
    { type: 'text', md: `### The methodologies in more detail
**STRIDE** (Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege) is applied to each element and data flow in a data flow diagram (Module 4.1). It is fast and widely understood, but it doesn’t rank risk on its own, and AI-specific threats need to be mapped into its categories (for example, prompt injection as tampering with instructions, extraction as information disclosure).

**PASTA** (Process for Attack Simulation and Threat Analysis) is a risk-centric, seven-stage method:
1. Define business objectives.
2. Define the technical scope.
3. Decompose the application.
4. Analyse threats (using intelligence).
5. Analyse vulnerabilities and weaknesses.
6. Model attacks (attack trees and simulations).
7. Analyse risk and impact, and decide on countermeasures.

It links threats to business impact, which suits high-value AI systems such as fraud models or customer-facing agents, but it takes more effort.

**MAESTRO** (Multi-Agent Environment, Security, Threat, Risk and Outcome), published by the Cloud Security Alliance in 2025, extends earlier methods for **agentic AI**. It decomposes a system into seven layers (foundation models; data operations; agent frameworks; deployment and infrastructure; evaluation and observability; security and compliance; agent ecosystem), identifies threats per layer and **across layers**, and prioritises them by likelihood and impact.

**Other useful methods:** **LINDDUN** for privacy threats, **attack trees** for detailed attack paths, and **kill chain analysis** using ATLAS tactics (Module 5.6).

### Making threat modelling work for AI
- **Scope the whole life cycle:** data sourcing, labelling, training, evaluation, registry, deployment, inference, agents and tools, monitoring and retirement.
- **Include non-human actors:** agents, tools, MCP servers and other organisations’ agents in an ecosystem (Section 2).
- **Use threat libraries:** MITRE ATLAS, the OWASP Top 10 for LLM Applications (2025), the OWASP Top 10 for Agentic Applications (2026), NIST AI 100-2 E2025, incident databases and provider threat reports.
- **Revisit on change:** new models, data sources, tools or autonomy, and new threat intelligence, should trigger an update (Module 5.4).
- **Produce usable outputs:** each threat should map to a risk register entry, controls with owners, and tests that prove the controls work (Modules 6.4 and 6.6).
- **Threat modelling as code:** open-source tools such as OWASP Threat Dragon, pytm and Threagile keep models versioned alongside the system.` },
    { type: 'match', title: 'Which methodology fits?', pairs: [
      ['A quick design review of a new internal chatbot', 'STRIDE'],
      ['A fraud model where threats must be tied to business impact', 'PASTA'],
      ['A system of cooperating agents using tools and shared memory', 'MAESTRO'],
      ['Privacy threats in a model trained on customer data', 'LINDDUN'],
      ['Detailed paths an attacker could take to steal model weights', 'Attack trees'] ] },
    { type: 'callout', kind: 'exam', title: 'Methodology questions', md: `Know what each method is for: **STRIDE** (threat categories per element), **PASTA** (seven risk-centric stages linked to business objectives), **MAESTRO** (seven layers for agentic AI, with **cross-layer** threats), **LINDDUN** (privacy). The best answers model the **whole AI life cycle**, use **threat libraries** such as ATLAS and OWASP, and **update the model when things change**.` },
    { type: 'check', q: { q: 'A team is threat modelling a multi-agent system in which agents share memory and call tools through MCP. Which approach is MOST suitable?', o: ['A STRIDE review of the web front end only, since that is where users interact', 'MAESTRO, examining each layer and the threats that cross between layers', 'A penetration test of the servers instead of any threat modelling', 'LINDDUN only, because the main risk in agent systems is always to privacy'], a: 1, b: 1,
      why: 'MAESTRO is designed for agentic systems, and cross-layer threats, such as poisoned memory hijacking tool use, are central to multi-agent risk. A front-end-only review, a server test or a privacy-only method miss most of the threats.' } }
  ]
};
