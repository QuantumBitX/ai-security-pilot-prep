/* 2.7 · Section 2: metrics for training effectiveness and risk-aware culture */
module.exports = {
  title: 'Measuring training effectiveness and risk-aware culture', covers: [3],
  blocks: [
    { type: 'video', title: 'Is the training working?', kicker: 'Module 2.7 · Video 2 of 2', scenes: [
      { t: 'title', kicker: 'Module 2.7 · Education and awareness', title: 'Is the training working?', sub: 'Measuring learning, behaviour and a risk-aware AI culture', icon: 'chart',
        say: 'A hundred per cent completion rate tells you that everyone clicked through the course. It doesn’t tell you whether anyone behaves differently. | This video covers how to measure whether AI security training works, and what a risk-aware AI culture looks like in data.' },
      { t: 'layers', title: 'Four levels of evaluation',
        layers: [
          { icon: 'target', label: 'Level 4 · Results', sub: 'Did AI risk actually fall? Incidents, leaks, audit findings', k: 'control' },
          { icon: 'users', label: 'Level 3 · Behaviour', sub: 'Do people act differently? Tool use, DLP events, simulations', k: 'model' },
          { icon: 'cap', label: 'Level 2 · Learning', sub: 'Did they gain knowledge and skill? Assessments and practicals', k: 'data' },
          { icon: 'chat', label: 'Level 1 · Reaction', sub: 'Did they find it relevant and engaging? Surveys', k: 'neutral' } ],
        say: 'A widely used model, from Kirkpatrick, evaluates training at four levels, and each level is harder to measure, and more valuable. | Level four is results: did AI-related risk actually fall? Look at incidents, data leaks and audit findings. | Level three is behaviour: do people act differently? Look at use of sanctioned tools, data loss prevention events and simulation results. | Level two is learning: did people gain knowledge and skill, as shown by assessments and practical exercises? | And level one is reaction: did people find the training relevant and engaging? Most programmes stop here, which is why they can’t show impact.' },
      { t: 'bullets', title: 'Leading and lagging indicators', layout: 'grid', cols: 2, items: [
          { icon: 'cap', h: 'Competence by role', d: 'Practical assessment scores, not just completion', k: 'data' },
          { icon: 'check', h: 'Sanctioned tool adoption', d: 'Share of AI use through approved tools', k: 'control' },
          { icon: 'megaphone', h: 'Reporting rates', d: 'AI mistakes, near misses and suspicious content reported', k: 'human' },
          { icon: 'mask', h: 'Simulation results', d: 'Deepfake and AI-phishing exercises', k: 'model' },
          { icon: 'drop', h: 'Sensitive-data events', d: 'DLP alerts involving AI tools', k: 'threat' },
          { icon: 'siren', h: 'Incidents by human cause', d: 'AI incidents traced to skills or behaviour', k: 'neutral' } ],
        say: 'Use both leading and lagging indicators. Leading indicators show whether risk is likely to fall. | Competence by role, measured with practical assessments rather than completion. | Adoption of sanctioned AI tools, as a share of all AI use. | Reporting rates for AI mistakes, near misses and suspicious content. Rising reports usually signal a healthier culture, not a worse one. | And results from deepfake and AI-phishing simulations. Lagging indicators confirm what actually happened. | Sensitive-data events involving AI tools, caught by data loss prevention. | And AI incidents whose root cause was a skills or behaviour gap.' },
      { t: 'chart', title: 'What success can look like', kind: 'line', x: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'], yMin: 0, yMax: 120, ticks: 6, yLabel: 'Events per quarter', legend: true,
        series: [
          { n: 'Sensitive data pasted into unsanctioned AI', k: 'threat', v: [110, 96, 62, 41, 30, 24] },
          { n: 'AI near misses reported', k: 'control', v: [8, 14, 27, 38, 44, 47] } ],
        annot: [{ x: 1, text: 'Training and approved tools launched', k: 'human', at: 'bottom' }],
        steps: [{ s: [0] }, { a: [0] }, { s: [1] }],
        say: 'Here is what success can look like over six quarters. Before the programme, sensitive data is regularly pasted into unsanctioned AI tools. | In the second quarter, role-based training launches, together with an approved enterprise AI tool, and the risky behaviour starts to fall. | Meanwhile, reports of AI near misses rise steadily. That is not a sign of more problems. It shows that people now recognise issues, and trust that reporting them is safe.' },
      { t: 'bullets', title: 'Signs of a risk-aware AI culture', items: [
          { icon: 'megaphone', h: 'People report without fear', d: 'Mistakes and near misses surface early', k: 'human' },
          { icon: 'list', h: 'AI is registered before it is used', d: 'Teams come to governance, not around it', k: 'control' },
          { icon: 'rollback', h: 'Overrides are respected', d: 'Challenging the AI is normal and valued', k: 'model' },
          { icon: 'users', h: 'Leaders ask about AI risk', d: 'It appears in reviews, plans and decisions', k: 'neutral' } ],
        say: 'Culture shows up in behaviour. | People report AI mistakes and near misses without fear of blame, so problems surface early. | Teams register AI use cases before they start, coming to governance rather than going around it. | Overrides are respected: challenging an AI recommendation is normal and valued, not seen as slowing things down. | And leaders routinely ask about AI risk in reviews, plans and investment decisions.' },
      { t: 'bullets', title: 'Measurement traps', layout: 'grid', cols: 2, items: [
          { icon: 'check', h: 'Completion as competence', d: 'Finishing a course proves attendance, not skill', k: 'threat' },
          { icon: 'star', h: 'Vanity metrics', d: 'Satisfaction scores alone', k: 'neutral' },
          { icon: 'stop', h: 'Punishing reporters', d: 'Blame drives problems underground', k: 'human' },
          { icon: 'calendar', h: 'Annual snapshots', d: 'Measure continuously, and segment by role', k: 'model' } ],
        say: 'Avoid four measurement traps. | Treating completion as competence: finishing a course proves attendance, not skill. | Vanity metrics such as satisfaction scores on their own. | Punishing people who report mistakes, which drives problems underground and makes your metrics look better while risk grows. | And annual snapshots. Measure continuously, segment by role and team, and compare against a baseline taken before the programme began.' },
      { t: 'summary', items: ['Evaluate reaction, learning, behaviour and results', 'Track leading and lagging indicators by role', 'Rising near-miss reports usually signal a healthier culture', 'Completion is not competence; never punish reporting'],
        say: 'To recap. | Evaluate training at four levels: reaction, learning, behaviour and results. | Track leading and lagging indicators, segmented by role. | Rising reports of near misses usually signal a healthier culture, not a worse one. | And remember: completion is not competence, and punishing people who report problems destroys the data you need.' } ] },
    { type: 'text', md: `### Evaluating training: the Kirkpatrick model
| Level | Question | AI security measures |
|---|---|---|
| **1 · Reaction** | Did participants find it relevant and engaging? | Post-course surveys, relevance ratings, comments |
| **2 · Learning** | Did they gain knowledge and skills? | Pre- and post-assessments; practical tasks such as identifying flawed AI outputs or threat-modelling a design |
| **3 · Behaviour** | Do they apply it at work? | Share of AI use through sanctioned tools; DLP events involving AI; override and escalation behaviour of reviewers; secure design review findings; simulation results |
| **4 · Results** | Did organisational risk fall? | AI-related incidents and their costs; data-leak events; audit findings; regulatory issues; time to detect and contain AI incidents |

Levels 3 and 4 are harder to measure but are the ones that matter to a board. Establish a **baseline** before the programme, set **targets**, and **segment** results by role, team and system, so that improvement efforts go where the risk is.

### Indicators
**Leading indicators** (predictive):
- practical competence scores by role, and the proportion of people with oversight duties who have passed role-specific training;
- adoption of sanctioned AI tools versus detected shadow AI;
- reporting rates for AI errors, near misses and suspicious content (deepfakes, AI-generated phishing);
- results of simulations, such as voice-clone payment requests or AI-themed phishing;
- time to approve AI use-case requests (slow governance drives shadow AI);
- questions raised with AI champions.

**Lagging indicators** (outcomes):
- AI incidents, categorised by root cause (skills, process, technology);
- sensitive-data exposures through AI tools;
- audit and assessment findings related to human oversight or secure development;
- policy exceptions and violations.

### Measuring culture
Risk-aware culture is visible in behaviour and in surveys:
- **Psychological safety:** people say they would report an AI mistake they made, and believe they wouldn’t be blamed.
- **Governance engagement:** proportion of AI use cases registered before use rather than discovered afterwards.
- **Challenge:** reviewers override when appropriate, and overrides are analysed rather than discouraged.
- **Leadership attention:** AI risk is discussed in management reviews, investment decisions and board reporting.

Short, regular **pulse surveys** combined with behavioural data give a more reliable picture than an annual questionnaire.

### Pitfalls
- **Completion rates as the headline metric:** they measure attendance, not capability.
- **Unintended incentives:** if teams are penalised for reported incidents, reporting falls and risk is hidden.
- **One-size-fits-all metrics:** a developer’s secure-design competence and a sales team’s data-handling behaviour need different measures.
- **No link to action:** metrics should trigger targeted interventions (for example, extra coaching for a team with rising DLP events), not just appear in a dashboard.`, },
    { type: 'tabs', title: 'Metric examples by audience', items: [
      ['Board report', '**Show:** trend in AI incidents and data-leak events; proportion of high-risk AI systems whose overseers are trained and assessed; shadow AI trend; major audit findings. **Avoid:** raw completion percentages.'],
      ['Developers', '**Show:** findings per AI design review; time to fix AI-specific vulnerabilities; lab assessment scores; adoption of secure patterns (for example, least-privilege tool scopes).'],
      ['Human overseers', '**Show:** practical assessment results on spotting model errors; override and escalation rates compared with expected ranges; quality sampling of their decisions.'],
      ['All staff', '**Show:** sensitive-data events involving AI tools; sanctioned tool adoption; simulation pass rates; reporting rates.'] ] },
    { type: 'callout', kind: 'exam', title: 'Best evidence of effectiveness', md: `If asked for the **best** evidence that AI security training is effective, prefer **behaviour and results** (fewer sensitive-data events, better simulation results, fewer incidents with human causes, appropriate overrides) over **reaction or completion** (satisfaction scores, percentage of staff who finished the course).` },
    { type: 'check', q: { q: 'Which metric provides the BEST evidence that an AI acceptable-use training programme has changed behaviour?', o: ['98% of staff completed the course within the deadline, up from 85% the previous year', 'Average course satisfaction rose to 4.6 out of 5, with most staff rating it highly relevant', 'Sensitive-data events involving unsanctioned AI tools fell by 70%, while approved tool use rose', 'The course was translated into ten languages, so every office could take it in its own language'], a: 2, b: 3,
      why: 'Behavioural and outcome measures (Kirkpatrick levels 3 and 4) show real change. Completion, satisfaction and translation are inputs or reactions.' } }
  ]
};
