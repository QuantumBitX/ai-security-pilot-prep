/* 5.6 · Section 3: threat actor attribution */
module.exports = {
  title: 'Threat actor attribution', covers: [3],
  blocks: [
    { type: 'video', title: 'Who was behind it?', kicker: 'Module 5.6 · Video 3 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.6 · Investigation and eradication', title: 'Who was behind it?', sub: 'Threat actor attribution for AI incidents', icon: 'attacker',
        say: 'After an incident, everyone asks the same question: who did this? Attribution can guide defences and reporting, but it is a judgement made with incomplete evidence, never a certainty. | This video covers threat actor attribution for AI incidents.' },
      { t: 'bullets', title: 'Who attacks AI systems', layout: 'grid', cols: 2, items: [
          { icon: 'money', h: 'Criminal groups', d: 'Fraud, extortion, resale of access', k: 'threat' },
          { icon: 'flag', h: 'State-linked groups', d: 'Espionage, influence, preparation', k: 'model' },
          { icon: 'user', h: 'Insiders', d: 'Model and data theft, sabotage', k: 'human' },
          { icon: 'building', h: 'Competitors and IP thieves', d: 'Extraction, distillation', k: 'neutral' },
          { icon: 'megaphone', h: 'Hacktivists', d: 'Embarrassment and disruption', k: 'data' },
          { icon: 'search', h: 'Unauthorised testers', d: 'Curiosity or bounty hunting', k: 'control' } ],
        say: 'Six kinds of actor attack AI systems. | Criminal groups, looking for fraud, extortion or access they can sell. | State-linked groups, pursuing espionage, influence operations or preparation for future attacks. AI providers now publish reports on malicious use they have disrupted, including by state-linked groups. | Insiders, who may steal models and data or sabotage pipelines. | Competitors and intellectual property thieves, who extract or distil a model’s capabilities. | Hacktivists, who want to embarrass an organisation or disrupt its services. | And unauthorised testers, from the curious to bounty hunters working outside a programme’s rules.' },
      { t: 'bullets', title: 'Evidence for attribution', layout: 'grid', cols: 2, items: [
          { icon: 'network', h: 'Infrastructure', d: 'IPs, domains, hosting, accounts', k: 'neutral' },
          { icon: 'target', h: 'Techniques', d: 'ATLAS and ATT&CK patterns', k: 'threat' },
          { icon: 'box', h: 'Artefacts', d: 'Malicious files, code, payload style', k: 'model' },
          { icon: 'clock', h: 'Timing and targeting', d: 'Working hours, chosen data', k: 'human' },
          { icon: 'text', h: 'Language traces', d: 'Wording of planted instructions', k: 'data' },
          { icon: 'globe', h: 'Intelligence matches', d: 'ISACs, vendors, providers', k: 'control' } ],
        say: 'Attribution draws on six kinds of evidence. | Infrastructure: the IP addresses, domains, hosting providers and accounts the attacker used. | Techniques: the pattern of tactics and techniques, mapped to ATLAS and {ATT&CK~attack}. | Artefacts: malicious model files, code and the style of planted content. | Timing and targeting: when the attacker was active, and which data or systems they went after. | Language traces: the wording and language of planted instructions. | And intelligence matches: overlaps with indicators shared by ISACs, security vendors and AI providers.' },
      { t: 'flow', title: 'Making an attribution judgement',
        nodes: [
          { id: 'col', x: 230, y: 330, icon: 'archive', label: 'Collect indicators', sub: 'from the kill chain', k: 'data', w: 320 },
          { id: 'enr', x: 700, y: 330, icon: 'tag', label: 'Enrich and cluster', sub: 'threat intelligence', k: 'neutral', w: 310 },
          { id: 'cmp', x: 1200, y: 330, icon: 'search', label: 'Compare', sub: 'known actors and TTPs', k: 'human', w: 300 },
          { id: 'conf', x: 1200, y: 690, icon: 'scale', label: 'Assess confidence', sub: 'low, moderate, high', k: 'model', w: 320 },
          { id: 'use', x: 700, y: 690, icon: 'shield', label: 'Use it', sub: 'defend, share, report', k: 'control', w: 290 },
          { id: 'rev', x: 230, y: 690, icon: 'cycle', label: 'Revisit', sub: 'as evidence grows', k: 'threat', w: 280 } ],
        edges: [{ from: 'col', to: 'enr', k: 'data' }, { from: 'enr', to: 'cmp', k: 'neutral' }, { from: 'cmp', to: 'conf', k: 'human' }, { from: 'conf', to: 'use', k: 'model' }, { from: 'use', to: 'rev', k: 'control' }],
        steps: [
          { show: 'col', hi: 'col' },
          { show: 'enr col-enr', flow: 'col-enr', hi: 'enr' },
          { show: 'cmp enr-cmp', flow: 'enr-cmp', hi: 'cmp' },
          { show: 'conf cmp-conf', flow: 'cmp-conf', hi: 'conf' },
          { show: 'use conf-use', flow: 'conf-use', hi: 'use', mark: { use: 'ok' } },
          { show: 'rev use-rev', flow: 'use-rev', hi: 'rev' } ],
        say: 'Attribution is a structured judgement. Collect indicators from each stage of the reconstructed kill chain. | Enrich and cluster them using threat intelligence platforms. | Compare the cluster with known actors and their typical techniques. | Assess your confidence as low, moderate or high, and record why, including evidence that points the other way. | Use the result: to choose defences against the likely next moves, to share intelligence, and to inform law enforcement or regulators. | And revisit the judgement as new evidence emerges, because early attributions are often wrong.' },
      { t: 'compare', title: 'What attribution is for', labels: ['Defence', 'Reporting', 'Certainty', 'Response'],
        cols: [{ h: 'Helps with', icon: 'check', k: 'control' }, { h: 'Doesn’t justify', icon: 'x', k: 'threat' }],
        rows: [
          ['Anticipating the next moves', 'Delaying containment'],
          ['Informing police and regulators', 'Public claims without evidence'],
          ['A stated confidence level', 'Treating judgements as proof'],
          ['Sharing intelligence with peers', 'Hacking back'] ],
        say: 'Be clear about what attribution is for. | It helps defenders anticipate an actor’s next moves. It doesn’t justify delaying containment until you know who it was. | It helps inform the police and regulators. It doesn’t justify public accusations without solid evidence. | It produces a judgement with a stated confidence level. It is never proof. | And it supports sharing intelligence with peers. It never justifies hacking back, which is unlawful in most countries.' },
      { t: 'summary', items: ['Actors: criminals, state-linked groups, insiders, competitors, hacktivists, testers', 'Use infrastructure, techniques, artefacts, timing, language, intelligence', 'Attribution is a judgement with stated confidence', 'Use it to defend and share; never delay containment or hack back'],
        say: 'To recap. | AI systems face criminal groups, state-linked groups, insiders, competitors, hacktivists and unauthorised testers. | Attribution uses infrastructure, techniques, artefacts, timing, language traces and intelligence matches. | It is a judgement, expressed with a confidence level, and revisited as evidence grows. | Use it to strengthen defences and share intelligence. Never delay containment for it, and never hack back.' } ] },
    { type: 'text', md: `### Attribution in practice
Most organisations need **enough attribution to defend themselves**: knowing whether an actor is opportunistic or targeted, financially motivated or state-linked, insider or external, changes how much to invest and what to expect next. Formal attribution to a named group or state is usually left to governments, law enforcement and specialist intelligence firms.

### Useful models
- **The Diamond Model** links four features of each intrusion: **adversary**, **capability**, **infrastructure** and **victim**. Pivoting between them (for example, from infrastructure to other victims) builds clusters of activity.
- **TTP-based comparison:** techniques are harder for attackers to change than IP addresses or domains, so they are more reliable for clustering. Map them to MITRE ATLAS and ATT&CK (Module 5.2).
- **Confidence language:** express judgements with defined terms (for example, low, moderate or high confidence), stating key assumptions and alternative explanations.

### AI-specific considerations
- **Planted instructions** reveal language, phrasing and sometimes tooling, but are easy to fake.
- **Model extraction** may come from many accounts and cloud regions; correlating query patterns and timing is often more revealing than addresses.
- **Insiders** leave different traces: legitimate access used unusually, bulk downloads of weights or datasets, use of personal storage. Involve HR and legal early, and follow employment law.
- **False flags:** sophisticated actors imitate others’ tools and language. Weigh all evidence, not just one striking clue.
- **AI provider reports:** model providers publish threat intelligence on malicious use of their platforms that they have disrupted, including activity by state-linked and criminal groups. These help organisations recognise patterns relevant to their own systems.

### Legal and ethical limits
Share evidence with law enforcement through proper channels, preserve chain of custody (Module 5.5) and take legal advice before naming anyone. **Hacking back** (accessing an attacker’s systems) is unlawful in most jurisdictions and risks harming innocent third parties whose systems the attacker uses.` },
    { type: 'flip', title: 'Attribution terms', cards: [
      ['Diamond Model', 'An analysis model linking adversary, capability, infrastructure and victim for each intrusion.'],
      ['TTPs', 'Tactics, techniques and procedures: how an actor operates, harder to change than infrastructure.'],
      ['Confidence level', 'A stated degree of certainty in a judgement, such as low, moderate or high, with reasons.'],
      ['False flag', 'Evidence deliberately planted to make an attack look like the work of someone else.'],
      ['Hacking back', 'Accessing an attacker’s systems in retaliation: unlawful in most jurisdictions.'] ] },
    { type: 'callout', kind: 'exam', title: 'Attribution questions', md: `Attribution is a **confidence-based judgement** that informs defence, sharing and reporting. The best answers **never delay containment** for attribution, **never hack back**, rely on **TTPs and multiple evidence types** rather than one clue, and **involve law enforcement and legal** appropriately.` },
    { type: 'check', q: { q: 'Instructions planted in a poisoned dataset are written in a particular language, and the security team wants to announce publicly that a specific foreign state was responsible. What is the BEST advice?', o: ['Announce it immediately, because the language is strong evidence of the state’s involvement', 'Treat it as one indicator; weigh all evidence, state confidence, and take legal advice', 'Ignore the language entirely, because language is never relevant to attribution', 'Hack back into the suspected attacker’s infrastructure to confirm who it is'], a: 1, b: 3,
      why: 'Language traces are easy to fake and only one indicator, so attribution needs multiple evidence types, a stated confidence level and legal advice before any public claim. Ignoring it entirely loses information, and hacking back is unlawful.' } }
  ]
};
