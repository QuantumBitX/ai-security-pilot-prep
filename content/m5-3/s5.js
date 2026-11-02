/* 5.3 · Section 5: AI-driven security operations (UEBA, automated alert triage, threat hunting) */
module.exports = {
  title: 'AI-driven security operations', covers: [5],
  blocks: [
    { type: 'video', title: 'AI on the defenders’ side', kicker: 'Module 5.3 · Video 5 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.3 · Runtime detection', title: 'AI on the defenders’ side', sub: 'UEBA, automated alert triage and threat hunting', icon: 'sparkle',
        say: 'Security teams face more alerts than people can read, and attackers are using AI too. Used carefully, AI can help defenders keep up. | This video covers AI-driven security operations: behaviour analytics, automated alert triage and threat hunting, and the risks they bring.' },
      { t: 'bullets', title: 'Where AI helps the SOC', layout: 'grid', cols: 2, items: [
          { icon: 'chart', h: 'Behaviour analytics', d: 'Learned baselines per user, agent, key', k: 'model' },
          { icon: 'filter', h: 'Alert triage', d: 'Enrich, summarise, score, group', k: 'control' },
          { icon: 'chat', h: 'Investigation assistants', d: 'Questions in plain language', k: 'data' },
          { icon: 'target', h: 'Threat hunting', d: 'Hypotheses and queries at scale', k: 'threat' },
          { icon: 'code', h: 'Detection engineering', d: 'Drafting and testing rules', k: 'human' },
          { icon: 'doc', h: 'Reporting', d: 'Incident summaries and timelines', k: 'neutral' } ],
        say: 'AI helps security operations in six main ways. | Behaviour analytics, which learn normal patterns for each user, agent and key, and flag deviations. | Alert triage: enriching alerts with context, summarising them, scoring their severity and grouping related ones. | Investigation assistants that let analysts ask questions in plain language and get queries and answers back. | Threat hunting, where AI suggests hypotheses and runs searches across huge volumes of data. | Detection engineering: drafting new rules and testing them against past data. | And reporting: drafting incident summaries and timelines for different audiences.' },
      { t: 'flow', title: 'Automated triage, with a human in charge',
        nodes: [
          { id: 'al', x: 230, y: 330, icon: 'siren', label: 'Alert', sub: 'from SIEM or UEBA', k: 'threat', w: 280 },
          { id: 'enr', x: 700, y: 330, icon: 'sparkle', label: 'AI enrichment', sub: 'context, summary, links', k: 'model', w: 300 },
          { id: 'sc', x: 1200, y: 330, icon: 'scale', label: 'Score and suggest', sub: 'severity, next steps', k: 'human', w: 310 },
          { id: 'an', x: 1200, y: 690, icon: 'hitl', label: 'Analyst decides', sub: 'accept or override', k: 'control', w: 300 },
          { id: 'act', x: 700, y: 690, icon: 'lock', label: 'Act', sub: 'playbook, case, closure', k: 'neutral', w: 280 },
          { id: 'fb', x: 230, y: 690, icon: 'cycle', label: 'Feedback', sub: 'accuracy measured', k: 'data', w: 280 } ],
        edges: [{ from: 'al', to: 'enr', k: 'threat' }, { from: 'enr', to: 'sc', k: 'model' }, { from: 'sc', to: 'an', k: 'human' }, { from: 'an', to: 'act', k: 'control' }, { from: 'act', to: 'fb', k: 'neutral' }],
        steps: [
          { show: 'al', hi: 'al', mark: { al: 'alert' } },
          { show: 'enr al-enr', flow: 'al-enr', hi: 'enr' },
          { show: 'sc enr-sc', flow: 'enr-sc', hi: 'sc' },
          { show: 'an sc-an', flow: 'sc-an', hi: 'an' },
          { show: 'act an-act', flow: 'an-act', hi: 'act' },
          { show: 'fb act-fb', flow: 'act-fb', hi: 'fb', mark: { fb: 'ok' } } ],
        say: 'Here is automated triage done responsibly. An alert arrives from the SIEM or the behaviour analytics engine. | An AI assistant enriches it: who is involved, what else they did, related alerts, and a plain-language summary with links to the evidence. | It scores the severity and suggests next steps, explaining why. | An analyst makes the decision, accepting or overriding the suggestion. Low-risk, well-understood alerts may be closed automatically, within agreed limits. | The chosen playbook runs, and the case is documented. | And every outcome feeds back, so the team can measure how often the AI was right, and spot automation bias if analysts stop overriding it.' },
      { t: 'compare', title: 'AI in the SOC: benefits and risks', labels: ['Speed', 'Coverage', 'Judgement', 'Security'],
        cols: [{ h: 'Benefit', icon: 'check', k: 'control' }, { h: 'Risk', icon: 'alert', k: 'threat' }],
        rows: [
          ['Triage in seconds', 'Mistakes spread just as fast'],
          ['Every alert gets a first look', 'Analyst skills fade'],
          ['Consistent scoring', 'Confident but wrong findings'],
          ['Hunts across vast data', 'Log content can carry injection'] ],
        say: 'AI in the SOC brings real benefits, and real risks. | It triages in seconds, but mistakes spread just as fast. | Every alert gets a first look, but analysts who stop investigating lose their skills. | Scoring becomes consistent, but AI can produce findings that sound confident and are wrong. | And it can hunt across vast amounts of data. But that data includes attacker-controlled text, such as user agent strings, email subjects and file names, which can carry injected instructions aimed at the SOC’s own assistant.' },
      { t: 'timeline', title: 'A hypothesis-driven hunt', events: [
          { y: 'Hypothesis', h: 'Keys used off-platform', d: 'Agent keys called from outside our cloud' },
          { y: 'Data', h: 'Gateway and cloud logs', d: '90 days, all AI keys' },
          { y: 'Analysis', h: 'AI drafts the query', d: 'Analyst checks and runs it' },
          { y: 'Finding', h: 'Two keys from a VPN', d: 'One shared in a team chat' },
          { y: 'Outcome', h: 'New detection rule', d: 'Keys rotated; rule deployed' } ],
        say: 'Here is a short threat hunt, from hypothesis to outcome. | It starts with a hypothesis: some agent keys are being used from outside the company’s cloud environment. | The hunter gathers ninety days of gateway and cloud logs for every AI key. | An AI assistant drafts the search query from the plain-language hypothesis. The analyst checks it before running it. | The hunt finds two keys used from a consumer VPN service. One had been shared in a team chat. | The keys are rotated, and the hunt becomes a permanent detection rule, so the next case is caught automatically.' },
      { t: 'summary', items: ['Use AI for behaviour analytics, triage, hunting and reporting', 'Keep humans deciding; automate only within agreed limits', 'Treat log content as untrusted input to SOC assistants', 'Measure AI accuracy and watch for automation bias'],
        say: 'To recap. | Use AI for behaviour analytics, alert triage, investigation, threat hunting and reporting. | Keep humans making the decisions, and automate only within agreed, low-risk limits. | Treat log content as untrusted input to the SOC’s own AI assistants. | And measure how accurate the AI is, watching for automation bias in the people who rely on it.' } ] },
    { type: 'text', md: `### UEBA for AI environments
User and entity behaviour analytics (UEBA) learns baselines for people, service accounts, API keys, agents and devices, then scores deviations. Useful AI-specific features include tokens and requests per hour, query diversity, tools used, destinations contacted, data volumes, refusal and block rates, time of day and source network. Combine scores with context (privileges, data sensitivity) to rank risk, and tune using analyst feedback.

### Automated alert triage
- **What it does well:** gathering context, de-duplicating and grouping alerts, summarising evidence in plain language, mapping to MITRE ATT&CK and ATLAS, and drafting next steps.
- **Guardrails for the SOC’s own AI:**
  - **Human decisions** for containment and closure of significant alerts. Auto-close only narrowly defined, low-risk categories, and sample them for review.
  - **Evidence links:** every AI conclusion should cite the events behind it, so analysts can verify rather than trust.
  - **Untrusted input:** alerts and logs contain attacker-controlled text. Separate it from instructions, limit what the assistant can do (read-only by default), and monitor it like any other AI system.
  - **Measure it:** precision and recall of AI triage against analyst outcomes, time saved, override rates, and missed incidents found in review (Module 5.1 thresholds apply here too).
  - **Protect the data:** SOC assistants see highly sensitive data, so apply the masking and access controls in Module 5.2, and check provider data handling terms.

### Threat hunting with AI
Hunting is **proactive** and **hypothesis-driven**: assume an attacker has evaded detection, and look for evidence. Frameworks such as **PEAK** (Prepare, Execute, Act with Knowledge) and **TaHiTI** (Targeted Hunting integrating Threat Intelligence) structure the process. AI helps by suggesting hypotheses from threat intelligence, translating them into queries, clustering results and summarising findings. Good hunts end with something durable: a **new or improved detection**, a fixed visibility gap, or updated threat intelligence.

### Example AI hunting hypotheses
- Agent or service keys used from networks outside the expected environment.
- Retrieval of documents that no user query should need (honeytoken documents).
- Agents whose tool usage changed after a model or prompt update.
- Gradual growth in one identity’s query diversity, suggesting slow model extraction.` },
    { type: 'scenario', title: 'The helpful triage assistant', md: `A SOC uses an AI assistant to summarise and score alerts. Analysts now accept 99% of its severity scores, and average handling time has fallen from 14 minutes to 2. During a review, the team finds an alert the assistant scored "low" because the attacker’s file name included text telling the assistant the activity was an approved test.`,
      q: { q: 'Which change BEST addresses the problems this review reveals?', o: ['Replace the assistant with a newer model that is less likely to be fooled by text', 'Treat log fields as untrusted data, cite evidence, sample decisions and track override rates', 'Remove analysts from triage, since they agree with the assistant almost all the time', 'Ban file names from being included in any alert data sent to the assistant'], a: 1, b: 5,
        why: 'The review shows two problems: injection through attacker-controlled log content, and likely automation bias. Separating untrusted data, requiring evidence, sampling decisions and tracking overrides addresses both. A new model alone, removing analysts or dropping one field don’t.' } },
    { type: 'callout', kind: 'exam', title: 'AI SecOps questions', md: `Expect the best answers to use AI to **augment** analysts, with **humans accountable** for significant decisions, **evidence-backed** outputs and **measured accuracy**. Remember that the SOC’s AI is itself an AI system: it can be **injected through log content** and needs the same controls as any other.` },
    { type: 'check', q: { q: 'A SOC wants its AI assistant to close alerts automatically. Which approach is MOST appropriate?', o: ['Let the assistant close any alert it scores below medium severity, with no review', 'Auto-close only narrow, low-risk categories, sample closures and measure accuracy', 'Never use AI in triage, because its decisions can’t be trusted at all', 'Let the assistant close alerts, but only during night shifts when fewer analysts work'], a: 1, b: 5,
      why: 'Narrow scope, sampling and measured accuracy let the SOC gain speed while catching errors. Unreviewed closure of everything below medium is risky, a total ban gives up real benefits, and limiting it to night shifts doesn’t manage the risk.' } }
  ]
};
