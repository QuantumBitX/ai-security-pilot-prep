/* 6.1 · Section 2: AI threat actors, objectives and insider threats (human, non-human) */
module.exports = {
  title: 'AI threat actors, objectives and insider threats', covers: [2],
  blocks: [
    { type: 'video', title: 'Who wants to attack your AI, and why', kicker: 'Module 6.1 · Video 2 of 7', scenes: [
      { t: 'title', kicker: 'Module 6.1 · AI threat modelling', title: 'Who wants to attack your AI, and why', sub: 'Threat actors, objectives and insider threats', icon: 'attacker',
        say: 'Good threat models start with the adversary: who might attack, what they want, what they can do, and what access they already have. With AI, some of those adversaries aren’t human at all. | This video covers AI threat actors, their objectives, and insider threats, both human and non-human.' },
      { t: 'bullets', title: 'What attackers want from AI systems', layout: 'grid', cols: 2, items: [
          { icon: 'stop', h: 'Break availability', d: 'Degrade or deny the service', k: 'neutral' },
          { icon: 'pen', h: 'Violate integrity', d: 'Make the model do their bidding', k: 'threat' },
          { icon: 'eye', h: 'Compromise privacy', d: 'Extract data or the model itself', k: 'data' },
          { icon: 'unlock', h: 'Enable misuse', d: 'Bypass safety for harmful output', k: 'human' },
          { icon: 'money', h: 'Make money', d: 'Fraud, resale, free compute', k: 'control' },
          { icon: 'flag', h: 'Gain advantage', d: 'Espionage, IP theft, influence', k: 'model' } ],
        say: 'Attackers want six broad things from AI systems. | To break availability: degrading or denying the service. | To violate integrity: making the model produce the outputs, or take the actions, they choose. | To compromise privacy: extracting training data, user data or the model itself. | To enable misuse: bypassing safety controls to produce harmful content. NIST’s adversarial machine learning taxonomy uses these first four as its attacker goals. | To make money, through fraud, reselling access or stealing compute. | And to gain strategic advantage, through espionage, intellectual property theft or influence operations.' },
      { t: 'matrix', title: 'Actors by access and capability', rows: ['Inside access', 'Outside access'], cols: ['Lower capability', 'Higher capability'], xLabel: 'Capability and resources', yLabel: 'Access',
        heat: true,
        items: [{ r: 0, c: 1, t: 'Malicious insider with ML skills', k: 'threat' }, { r: 0, c: 0, t: 'Careless or compromised staff', k: 'human' }, { r: 1, c: 1, t: 'State-linked and criminal groups', k: 'model' }, { r: 1, c: 0, t: 'Opportunistic abusers', k: 'neutral' }],
        say: 'Two dimensions help profile actors: their access, and their capability. | Inside access with high capability is the most dangerous combination: a malicious insider with machine learning skills, who can poison data, plant backdoors or copy weights. | Inside access with lower capability: careless employees who paste sensitive data into public tools, or staff whose accounts are compromised. | Outside access with high capability: state-linked and organised criminal groups, who research AI systems and automate their attacks. | And outside access with lower capability: opportunistic abusers trying published jailbreaks or stolen keys.' },
      { t: 'bullets', title: 'Non-human threat actors', layout: 'grid', cols: 2, items: [
          { icon: 'robot', h: 'Compromised agents', d: 'Hijacked by injected content', k: 'threat' },
          { icon: 'alert', h: 'Rogue agents', d: 'Acting outside their purpose', k: 'human' },
          { icon: 'plug', h: 'Malicious tools and servers', d: 'Poisoned MCP servers and plugins', k: 'data' },
          { icon: 'network', h: 'External agents', d: 'Partners’ agents in an ecosystem', k: 'neutral' },
          { icon: 'bolt', h: 'Bots and automation', d: 'Scrapers, credential stuffing', k: 'model' },
          { icon: 'sparkle', h: 'AI-powered attack tools', d: 'Automating reconnaissance and exploits', k: 'control' } ],
        say: 'Some threat actors aren’t people. | Compromised agents, hijacked by content they read, act with your own permissions. | Rogue agents act outside their purpose, through misconfiguration or misaligned behaviour. | Malicious tools and servers, such as a poisoned MCP server or plugin, sit inside your agents’ trust boundary. | External agents, belonging to partners or customers, interact with yours in multi-agent ecosystems. | Bots and automation scrape content and stuff credentials at scale. | And AI-powered attack tools automate reconnaissance, phishing and exploitation. In November 2025, Anthropic reported disrupting an espionage campaign, attributed to a Chinese state-sponsored group, in which its AI coding tool carried out most of the operational work.' },
      { t: 'bullets', title: 'Insider threats to AI', layout: 'grid', cols: 2, items: [
          { icon: 'user', h: 'Malicious insiders', d: 'Theft of models or data; sabotage', k: 'threat' },
          { icon: 'chat', h: 'Negligent insiders', d: 'Sensitive data in public AI tools', k: 'human' },
          { icon: 'key', h: 'Compromised insiders', d: 'Stolen credentials used by others', k: 'data' },
          { icon: 'arrow', h: 'Departing staff', d: 'Taking weights, prompts or datasets', k: 'neutral' },
          { icon: 'building', h: 'Third-party insiders', d: 'Contractors, labellers, vendors', k: 'model' },
          { icon: 'shield', h: 'Controls', d: 'Least privilege, monitoring, offboarding', k: 'control' } ],
        say: 'Insider threats to AI take five forms, and need a sixth thing: controls. | Malicious insiders steal models or data, or sabotage pipelines. In 2024, US prosecutors charged a former Google engineer with stealing trade secrets about the company’s AI infrastructure. | Negligent insiders put sensitive data into public AI tools. | Compromised insiders have their credentials stolen and used by others. | Departing staff may take weights, prompts or datasets with them. | Third-party insiders, such as contractors and data labellers, have privileged access too. | Controls include least privilege, monitoring of access to weights and data, separation of duties and thorough offboarding.' },
      { t: 'summary', items: ['Attacker goals: availability, integrity, privacy, misuse, money, advantage', 'Profile actors by access and capability', 'Include non-human actors: agents, tools, bots, AI attack tools', 'Insiders: malicious, negligent, compromised, departing, third-party'],
        say: 'To recap. | Attackers target availability, integrity, privacy and safety controls, for money or strategic advantage. | Profile actors by their access and their capability. | Include non-human actors: compromised and rogue agents, malicious tools, bots and AI-powered attack tools. | And plan for every kind of insider: malicious, negligent, compromised, departing and third-party.' } ] },
    { type: 'text', md: `### Threat actor profiles
| Actor | Typical motivation | Capabilities | Likely AI targets |
|---|---|---|---|
| **State-linked groups** | Espionage, strategic advantage, influence | High: research, custom tooling, patience, AI-assisted operations | Model weights and research, sensitive data via AI systems, influence campaigns using generative AI |
| **Organised criminals** | Money | Moderate to high: fraud, ransomware, resale of access | Stolen API keys and compute, fraud with deepfakes, extortion using stolen data |
| **Competitors and IP thieves** | Advantage | Moderate: systematic querying, recruitment of insiders | Model extraction and distillation, training data |
| **Hacktivists** | Ideology, publicity | Low to moderate | Jailbreaks for embarrassing outputs, disruption |
| **Malicious insiders** | Money, grievance, coercion | Legitimate access and knowledge | Weights, datasets, pipelines, backdoors |
| **Opportunistic abusers** | Curiosity, free use, mischief | Low; rely on published techniques | Public chatbots, exposed endpoints and keys |
| **Non-human actors** | (Inherited from whoever controls them) | Machine speed, legitimate permissions | Tools, data and systems the agent can reach |

### Objectives in NIST AI 100-2
NIST’s taxonomy of adversarial machine learning (AI 100-2 E2025) classifies attacks by the attacker’s **goals** (availability breakdown, integrity violation, privacy compromise, and, for generative AI, misuse enablement), their **capabilities** (such as control of training data, the model, queries or resources the model reads) and their **knowledge** (white-box, grey-box or black-box). Using these dimensions in threat models makes assumptions explicit.

### Insider threat controls for AI
- **Least privilege and just-in-time access** to weights, training data and pipelines (Module 4.6).
- **Separation of duties** for training, approval and deployment, so one person can’t plant and ship a backdoor (Module 5.1).
- **Monitoring** of access to weights and datasets, bulk downloads, use of personal storage and unusual AI tool use (Module 5.3).
- **Data loss prevention** and approved AI tools, so staff have a safe alternative to public services (Module 2.6).
- **Joiner, mover and leaver processes** that remove access promptly and recover assets (Module 4.7).
- **Third parties:** contractual controls, vetting and monitoring for labellers, contractors and vendors (Module 6.3).
- **Culture and reporting:** training, clear policies and safe ways to raise concerns. CISA’s insider threat guidance emphasises a multidisciplinary programme involving HR, legal and security.

### Non-human actors
Treat agents, tools and external agents as **potential adversaries** in threat models: what could each do with its permissions if it were compromised or misbehaving? This is the basis for least agency, approvals for high-impact actions and agent monitoring (Modules 4.6 and 5.3).` },
    { type: 'flip', title: 'Actor and objective terms', cards: [
      ['Integrity violation', 'An attack that makes a model produce outputs or take actions the attacker chooses.'],
      ['Misuse enablement', 'Bypassing a generative model’s safety controls to obtain harmful output.'],
      ['White-box attacker', 'An attacker who knows the model’s architecture and weights.'],
      ['Negligent insider', 'A staff member who causes harm without intent, such as pasting secrets into a public AI tool.'],
      ['Non-human threat actor', 'An agent, tool, server or bot that acts against your interests, whoever controls it.'] ] },
    { type: 'callout', kind: 'exam', title: 'Threat actor questions', md: `Profile actors by **motivation, capability and access**, and include **non-human actors** (compromised agents, malicious tools, external agents). For insiders, the strongest controls combine **least privilege, separation of duties, monitoring of weights and data, and offboarding**. Know NIST AI 100-2’s attacker goals: **availability, integrity, privacy and misuse**.` },
    { type: 'check', q: { q: 'A data scientist with access to training pipelines resigns to join a competitor. Which control would MOST reduce the risk of model or data theft during their notice period?', o: ['Ask them to sign a statement confirming that they won’t take any company data', 'Reduce access to what is still needed, and monitor weight and dataset downloads', 'Allow full access to continue, so their handover work isn’t interrupted', 'Wait until their last day and then disable all of their accounts at once'], a: 1, b: 2,
      why: 'Narrowing access and monitoring sensitive downloads limits what can be taken and detects attempts. Statements don’t prevent theft, full access keeps the risk, and waiting until the last day leaves the notice period exposed.' } }
  ]
};
