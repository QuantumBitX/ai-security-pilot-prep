/* 6.4 · Section 3: AI red teaming methodologies */
module.exports = {
  title: 'AI red teaming methodologies', covers: [3],
  blocks: [
    { type: 'video', title: 'Thinking like an adversary', kicker: 'Module 6.4 · Video 3 of 5', scenes: [
      { t: 'title', kicker: 'Module 6.4 · AI security testing', title: 'Thinking like an adversary', sub: 'AI red teaming methodologies', icon: 'attacker',
        say: 'Red teaming means emulating a real adversary, with their goals and creativity, to find out how a system fails before someone else does. For AI, it also means emulating ordinary users who stumble into harm. | This video covers AI red teaming methodologies: the process, the frameworks, and how to combine human and automated testing.' },
      { t: 'cycle', title: 'The AI red team cycle', center: 'Red team', centerSub: 'break, fix, repeat', intro: 'Each engagement runs through six stages.',
        stages: [
          { icon: 'flag', label: 'Plan', d: 'Objectives, scope, rules of engagement.' },
          { icon: 'search', label: 'Map', d: 'Architecture, data flows, threat model.' },
          { icon: 'attacker', label: 'Attack', d: 'Manual exploration, then automation.' },
          { icon: 'scale', label: 'Assess', d: 'Verify, score and reproduce findings.' },
          { icon: 'doc', label: 'Report', d: 'Findings, attack paths, detection gaps.' },
          { icon: 'rollback', label: 'Fix and retest', d: 'Mitigate, then test again.' } ],
        say: 'An AI red team engagement runs through six stages. | Plan: agree objectives, scope and rules of engagement. | Map: understand the architecture, data flows and threat model, including every place untrusted content gets in. | Attack: explore manually first, to find promising weaknesses, then scale up with automation. | Assess: verify each finding, score its severity, and make sure it can be reproduced. | Report: describe the findings, the attack paths, and where detection failed. | Fix and retest: the builders mitigate, and the red team tests again. This break-fix cycle repeats, because AI security is never finished.' },
      { t: 'compare', title: 'Human and automated red teaming', labels: ['Strengths', 'Limits', 'Best for'],
        cols: [{ h: 'Human-led', icon: 'users', k: 'human' }, { h: 'Automated', icon: 'gear', k: 'neutral' }],
        rows: [
          ['Creativity, context, judgement', 'Scale, coverage, repeatability'],
          ['Slow, costly, hard to repeat', 'Misses novel and contextual harms'],
          ['New features, high-risk scenarios', 'Variants, regressions, every release'] ],
        say: 'Human and automated red teaming complement each other. | Humans bring creativity, context and judgement, including subject expertise and cultural knowledge. Automation brings scale, coverage and repeatability, which matters because AI outputs vary. | Human testing is slow, costly and hard to repeat exactly. Automation misses novel and contextual harms it wasn’t designed to look for. | So use people for new features and high-risk scenarios, and automation for variants, regressions and every release. Microsoft’s AI red team, after testing more than a hundred generative AI products, reached the same conclusion: automation extends coverage, but humans remain essential.' },
      { t: 'bullets', title: 'Frameworks that structure the work', layout: 'grid', cols: 2, items: [
          { icon: 'globe', h: 'OWASP GenAI Red Teaming Guide', d: 'Model, implementation, infrastructure, runtime', k: 'data' },
          { icon: 'robot', h: 'CSA Agentic AI Red Teaming Guide', d: 'Twelve agentic threat categories', k: 'model' },
          { icon: 'target', h: 'MITRE ATLAS', d: 'Tactics, techniques and case studies', k: 'threat' },
          { icon: 'book', h: 'NIST AI 100-2', d: 'Adversarial ML taxonomy', k: 'neutral' },
          { icon: 'layers', h: 'Threat ontology', d: 'System, actor, TTPs, weakness, impact', k: 'human' },
          { icon: 'split', h: 'Purple teaming', d: 'Attackers and defenders together', k: 'control' } ],
        say: 'Several frameworks help structure AI red teaming. | The OWASP GenAI Red Teaming Guide, from January 2025, covers four areas: model evaluation, implementation testing, infrastructure assessment and runtime behaviour. | The Cloud Security Alliance’s Agentic AI Red Teaming Guide sets out twelve threat categories for agents, from control hijacking and memory manipulation to untraceable actions. | MITRE ATLAS catalogues adversary tactics and techniques against AI, with real case studies, and gives findings a common language. | NIST’s adversarial machine learning taxonomy defines attack types and mitigations for predictive and generative AI. | A simple threat ontology, used by Microsoft’s red team, records each finding as a system, an actor, tactics and techniques, a weakness and an impact. | And purple teaming brings attackers and defenders together, so every attack also tests detection and response.' },
      { t: 'summary', items: ['Plan, map, attack, assess, report, then fix and retest', 'Combine human creativity with automated scale', 'Structure the work with OWASP, CSA, MITRE ATLAS and NIST', 'Purple team, so attacks also test detection'],
        say: 'To recap. | Run red teaming as a cycle: plan, map, attack, assess, report, then fix and retest. | Combine human creativity with automated scale. | Structure the work with the OWASP and CSA guides, MITRE ATLAS and NIST’s taxonomy. | And purple team, so that every attack also tests detection and response.' } ] },
    { type: 'text', md: `### What makes AI red teaming different
- **Probabilistic results:** the same attack can succeed or fail on different attempts, so findings carry success rates (Section 2).
- **Beyond security:** AI red teams also look for safety and responsible AI harms, such as dangerous advice, bias or privacy leaks, which ordinary users can trigger by accident.
- **Adversarial and benign personas:** test as a skilled attacker, an opportunistic user, an insider, a compromised data source or tool, and a well-meaning user who stumbles into harm.
- **Simple attacks work:** Microsoft’s red team found that cheap, manual techniques often beat sophisticated mathematical ones, so test the whole system, not just the model’s robustness.
- **Never finished:** mitigations reduce risk but don’t eliminate it. The aim is to raise attackers’ costs through repeated break-fix cycles.

### Methodologies and frameworks
| Framework | What it offers |
|---|---|
| **OWASP GenAI Red Teaming Guide** (January 2025) | A blueprint covering model evaluation, implementation testing, infrastructure assessment and runtime behaviour analysis |
| **CSA Agentic AI Red Teaming Guide** (2025, with the OWASP AI Exchange) | Twelve threat categories for agents: authorisation and control hijacking; checker-out-of-the-loop; critical system interaction; goal and instruction manipulation; hallucination exploitation; impact chain and blast radius; knowledge base poisoning; memory and context manipulation; orchestration and multi-agent exploitation; resource and service exhaustion; supply chain and dependency attacks; and untraceability |
| **MITRE ATLAS** | Adversary tactics, techniques and case studies for AI systems, used to plan scenarios and to map findings (Module 6.5) |
| **NIST AI 100-2** (2025 edition) | A taxonomy and terminology of adversarial machine learning attacks and mitigations, for predictive and generative AI |
| **Microsoft’s threat ontology** | Each finding recorded as a system, an actor, tactics, techniques and procedures, a weakness and an impact |

### Regulatory drivers
- **EU AI Act:** providers of general-purpose AI models with systemic risk must perform and document adversarial testing (**Article 55**), and the **General-Purpose AI Code of Practice** (July 2025) describes how in its safety and security chapter. High-risk systems must achieve appropriate accuracy, robustness and cyber security (**Article 15**), confirmed through testing.
- **NIST AI 600-1**, the generative AI profile of the AI RMF, recommends red teaming as part of managing generative AI risk, and many national AI safety and security institutes publish red teaming guidance.

### Running an AI red team
- **Team:** security testers, ML engineers, subject experts (such as clinicians or lawyers, for domain harms), and people with different languages and cultural knowledge. Provide wellbeing support for anyone reviewing harmful content.
- **Order of work:** manual exploration first, to understand behaviour and find promising weaknesses; then automation, to scale variants and measure rates (Section 4).
- **Logging:** record every prompt, response, tool call, setting and version, so findings can be reproduced (Module 6.5).
- **Purple teaming:** share findings with defenders as they happen, so detections and guardrails improve during the engagement, not months later.
- **External testing:** bug bounty programmes and independent red teams add diversity and independence once internal testing is mature.` },
    { type: 'flip', title: 'Red teaming terms', cards: [
      ['Break-fix cycle', 'Repeated rounds of testing, mitigation and retesting that raise an attacker’s costs over time.'],
      ['Benign persona', 'A tester acting as an ordinary user, to find harms people can trigger by accident.'],
      ['Purple teaming', 'Attackers and defenders working together, so each attack also tests detection and response.'],
      ['Threat ontology', 'A structure for recording findings: system, actor, tactics and techniques, weakness and impact.'],
      ['Checker-out-of-the-loop', 'A CSA agentic threat category: the agent acts without the human or automated check that should review it.'] ] },
    { type: 'scenario', title: 'The red team that only ran a tool', md: `An organisation’s red team runs an automated tool against a new HR agent and reports a 0.4% attack success rate across 5,000 generated prompts, recommending launch. Nobody explored the agent manually, and the tool’s test library predates the agent’s new ability to update payroll records.`,
      q: { q: 'What is the MAIN weakness in this assessment?', o: ['The sample of 5,000 prompts was far too small to give a meaningful success rate', 'No human explored new capabilities, such as payroll updates, that the tool wasn’t built for', 'Automated tools should never be used for red teaming, because their results can’t be trusted', 'The attack success rate should have been reported as a fraction, not as a percentage'], a: 1, b: 3,
        why: 'Automation measures known techniques at scale, but misses novel, contextual risks such as a new payroll capability. Human-led exploration of new features, followed by automation of what it finds, is the effective combination.' } },
    { type: 'callout', kind: 'exam', title: 'Red teaming questions', md: `Look for **objective-led**, **system-level** testing run as a **break-fix cycle**, with **manual exploration before automation**, **diverse personas** (including benign users), findings mapped to **MITRE ATLAS** or OWASP categories, and **purple teaming** so that detection improves too. A single automated scan is not a red team.` },
    { type: 'check', q: { q: 'Which practice BEST describes purple teaming in an AI red team engagement?', o: ['Testing only at weekends, so that the defending team is unaware of the activity', 'Sharing attacks with defenders as they happen, so that detection improves too', 'Assigning the same person to build the guardrails and then to attack them', 'Publishing all successful attacks online, so other organisations can learn'], a: 1, b: 3,
      why: 'Purple teaming pairs attackers and defenders, so each attack also tests and improves detection and response during the engagement.' } }
  ]
};
