/* 6.4 · Section 4: AI-assisted security tools for evaluating AI controls and novel attack paths */
module.exports = {
  title: 'AI-assisted security testing tools', covers: [4],
  blocks: [
    { type: 'video', title: 'Using AI to test AI', kicker: 'Module 6.4 · Video 4 of 5', scenes: [
      { t: 'title', kicker: 'Module 6.4 · AI security testing', title: 'Using AI to test AI', sub: 'AI-assisted tools for evaluating controls and finding attack paths', icon: 'sparkle',
        say: 'Human red teamers can try hundreds of ideas. Attacker models can try millions of variations, and AI agents are now finding real vulnerabilities in software. Used well, AI-assisted tools extend coverage dramatically. Used carelessly, they create false confidence. | This video covers AI-assisted security tools for evaluating AI controls and discovering novel attack paths.' },
      { t: 'flow', title: 'An automated red-teaming loop',
        nodes: [
          { id: 'seed', x: 230, y: 330, icon: 'flag', label: 'Seed objectives', sub: 'from the threat model', k: 'human', w: 300 },
          { id: 'atk', x: 700, y: 330, icon: 'attacker', label: 'Attacker model', sub: 'generates and mutates', k: 'threat', w: 300 },
          { id: 'tgt', x: 1200, y: 330, icon: 'target', label: 'Target system', sub: 'staging, canary data', k: 'model', w: 300 },
          { id: 'judge', x: 1200, y: 690, icon: 'scale', label: 'Scorer', sub: 'classifier or LLM judge', k: 'data', w: 310 },
          { id: 'rev', x: 700, y: 690, icon: 'eye', label: 'Human review', sub: 'confirms findings', k: 'control', w: 290 },
          { id: 'reg', x: 230, y: 690, icon: 'rollback', label: 'Regression suite', sub: 'runs every release', k: 'neutral', w: 300 } ],
        edges: [{ from: 'seed', to: 'atk', k: 'human' }, { from: 'atk', to: 'tgt', k: 'threat' }, { from: 'tgt', to: 'judge', k: 'model' }, { from: 'judge', to: 'atk', k: 'data', dash: true }, { from: 'judge', to: 'rev', k: 'data' }, { from: 'rev', to: 'reg', k: 'control' }],
        steps: [
          { show: 'seed', hi: 'seed' },
          { show: 'atk seed-atk', flow: 'seed-atk', hi: 'atk' },
          { show: 'tgt atk-tgt', flow: 'atk-tgt', hi: 'tgt' },
          { show: 'judge tgt-judge', flow: 'tgt-judge', hi: 'judge' },
          { show: 'judge-atk', flow: 'judge-atk', hi: 'atk' },
          { show: 'rev judge-rev', flow: 'judge-rev', hi: 'rev', mark: { rev: 'ok' } },
          { show: 'reg rev-reg', flow: 'rev-reg', hi: 'reg' } ],
        say: 'Here is the core loop of automated red teaming. It starts with seed objectives from the threat model, such as revealing a canary record. | An attacker model generates test inputs for each objective, and mutates them: rephrasing, splitting across turns, or changing format and language. | The inputs go to the target system, in staging, with canary data. | A scorer judges each response. It might be a classifier, or another model acting as a judge. | The verdict feeds back to the attacker, which refines its next attempts, so the search concentrates on weak spots. | People review samples and every claimed success, because judges make mistakes. | And confirmed attacks join a regression suite that runs on every release, so fixed weaknesses stay fixed.' },
      { t: 'bullets', title: 'AI-assisted testing tools', layout: 'grid', cols: 2, items: [
          { icon: 'gear', h: 'PyRIT', d: 'Microsoft: attacker models and scorers', k: 'neutral' },
          { icon: 'search', h: 'garak', d: 'NVIDIA: probes for LLM weaknesses', k: 'data' },
          { icon: 'check', h: 'promptfoo', d: 'Red-team plugins and CI evaluation', k: 'control' },
          { icon: 'eye', h: 'Inspect', d: 'UK AISI: evaluation framework', k: 'human' },
          { icon: 'shield', h: 'Adversarial Robustness Toolbox', d: 'Evasion, poisoning, extraction tests', k: 'model' },
          { icon: 'bug', h: 'AI vulnerability hunters', d: 'Agents that find flaws in code', k: 'threat' } ],
        say: 'A growing set of tools puts AI to work on testing. | PyRIT, Microsoft’s open-source risk identification toolkit, orchestrates attacker models, input conversions and scorers. | garak, from NVIDIA, runs probes that check language models for known weaknesses, with detectors that judge the results. | promptfoo generates adversarial test cases through red-team plugins, and runs evaluations in continuous integration. | Inspect, from the UK’s AI Security Institute, is a framework for building and running evaluations. | The Adversarial Robustness Toolbox covers classic machine learning attacks: evasion, poisoning, extraction and inference. | And AI vulnerability hunters, such as Google’s Big Sleep, use agents to find flaws in the software around AI.' },
      { t: 'timeline', title: 'AI finds real vulnerabilities', events: [
          { y: 'Oct 2024', h: 'Big Sleep', d: 'AI agent finds a memory-safety flaw in SQLite' },
          { y: 'Mid-2025', h: 'Bug bounty', d: 'An AI pentester tops a US leaderboard' },
          { y: 'Jul 2025', h: 'Ahead of attackers', d: 'A flaw found before planned exploitation' },
          { y: 'Aug 2025', h: 'AIxCC finals', d: '54 of 63 planted flaws found; 18 real ones' } ],
        say: 'AI-assisted vulnerability discovery has moved quickly from research to results. | In October 2024, Google’s Big Sleep agent found a memory-safety flaw in the widely used SQLite database engine. | By mid-2025, an autonomous penetration-testing system, XBOW, had topped HackerOne’s US bug bounty leaderboard. | In July 2025, Big Sleep found another SQLite flaw that, according to Google, threat actors were preparing to exploit, so it was fixed first. | And in August 2025, at the finals of DARPA’s AI Cyber Challenge, AI systems found fifty-four of sixty-three planted vulnerabilities, patched forty-three, and discovered eighteen real ones. The same techniques can be pointed at your own AI stack.' },
      { t: 'bullets', title: 'Using AI testers safely', layout: 'grid', cols: 2, items: [
          { icon: 'target', h: 'Keep them in scope', d: 'Hard limits on targets and actions', k: 'threat' },
          { icon: 'scale', h: 'Calibrate the judges', d: 'Check scorers against human labels', k: 'human' },
          { icon: 'lock', h: 'Protect test data', d: 'Approved services and storage only', k: 'data' },
          { icon: 'alert', h: 'Expect counter-injection', d: 'Targets can manipulate testers', k: 'model' },
          { icon: 'clock', h: 'Record versions and seeds', d: 'So results can be reproduced', k: 'neutral' },
          { icon: 'check', h: 'Confirm before reporting', d: 'People verify every finding', k: 'control' } ],
        say: 'AI testers need controls of their own. | Keep them in scope. Autonomous testing agents need hard technical limits on targets, rates and actions, not just instructions. | Calibrate the judges. Check automated scorers against human-labelled samples, because a lenient judge hides failures, and a strict one floods you with false alarms. | Protect test data. Adversarial inputs and harmful outputs shouldn’t be sent to unapproved services. | Expect counter-injection. The system under test can manipulate the attacker or the judge, just as it might manipulate any other model. | Record model versions, settings and random seeds, so results can be reproduced. | And confirm before reporting: a person verifies every finding.' },
      { t: 'summary', items: ['Automate the loop: attacker, target, scorer, human review', 'Use tools such as PyRIT, garak, promptfoo, Inspect and ART', 'AI can find novel attack paths and real vulnerabilities', 'Scope, calibrate, protect data, and verify findings'],
        say: 'To recap. | Automated red teaming loops through an attacker model, the target, a scorer and human review. | Tools such as PyRIT, garak, promptfoo, Inspect and the Adversarial Robustness Toolbox make this practical. | AI can find novel attack paths and real vulnerabilities, at a scale people can’t match. | But keep AI testers in scope, calibrate their judges, protect test data, and verify every finding.' } ] },
    { type: 'text', md: `### What AI-assisted tools do
| Capability | How it works | Examples |
|---|---|---|
| **Automated red teaming** | Attacker models generate and mutate adversarial inputs; scorers judge responses; results feed back to refine attacks | PyRIT; promptfoo red-team plugins; research methods such as PAIR and TAP |
| **Probe libraries** | Large collections of known attack patterns run against a model or application, with detectors scoring the outputs | garak |
| **Evaluation frameworks** | Reusable tasks, datasets and scorers for repeatable evaluations of capabilities and safeguards | Inspect; promptfoo |
| **Classic adversarial ML** | Evasion, poisoning, extraction and inference attacks against predictive models | Adversarial Robustness Toolbox (ART); TextAttack |
| **LLM judges** | A model scores outputs against a rubric, at scale (Module 1.3) | Built into most frameworks |
| **AI vulnerability discovery** | Agents that read code, fuzz and reason about flaws in the software stack | Google Big Sleep; the DARPA AI Cyber Challenge systems, released as open source |

### Evaluating AI controls
Use these tools to measure whether controls work, not just whether a model misbehaves:
- **Guardrails and classifiers:** run labelled sets of adversarial and benign inputs, and measure **detection rates and false positive rates** for each category (Module 4.4).
- **Access and agency controls:** check that tool scopes, approval steps and retrieval permissions hold under adversarial pressure.
- **Monitoring:** confirm that attacks raise the alerts they should (Module 5.3).
- **Regression:** turn every confirmed finding into an automated test that runs on each release, so fixes stay fixed (Module 6.6).

### Finding novel attack paths
- **Permission analysis:** map which agents can read untrusted content, reach private data and communicate externally. Simon Willison called the combination of all three the **lethal trifecta** (2025), because it lets injected instructions steal data. Automated analysis can flag these combinations before an attacker finds them.
- **Multi-step exploration:** agentic testers chain tools and steps the way an attacker would, revealing paths that single-prompt tests miss.
- **Variant generation:** once a person finds a weakness, attacker models generate thousands of variants to show how general it is.

### Cautions
- **False confidence:** a test library only finds what it was built to find; new capabilities need human exploration (Section 3).
- **Judge reliability:** LLM judges can be lenient, strict, biased or manipulated. Calibrate them against human labels, and review samples.
- **Scope and safety:** autonomous testers need technical limits on targets, rates and actions, and a kill switch.
- **Data handling:** adversarial inputs and harmful outputs are sensitive, so keep them in approved tools and storage.
- **Dual use:** attackers use the same tools. Control access to them, and log their use.` },
    { type: 'match', title: 'Which tool or technique fits?', pairs: [
      ['Generating thousands of variants of a weakness a tester found by hand', 'An attacker model in an automated red-teaming loop'],
      ['Checking a fraud model’s resistance to evasion and extraction', 'Adversarial Robustness Toolbox'],
      ['Running known LLM attack probes against a new chatbot', 'garak'],
      ['Finding agents that read untrusted content, hold private data and can send data out', 'Permission analysis for the lethal trifecta'],
      ['Scoring 50,000 responses against a rubric, with human spot checks', 'A calibrated LLM judge'] ] },
    { type: 'scenario', title: 'The generous judge', md: `A bank’s automated red-teaming pipeline uses a language model as a judge. It reports a 0.2% attack success rate for tests that try to make the assistant give prohibited investment advice. A security engineer manually reviews 200 responses the judge marked as safe, and finds 14 that give the prohibited advice.`,
      q: { q: 'What should the team do FIRST?', o: ['Accept the 0.2% figure, since automated judges are more consistent than human reviewers', 'Recalibrate the judge against human-labelled samples, then re-score the test results', 'Replace the judge with simple keyword matching, which can’t make the same mistakes', 'Stop testing for prohibited advice, since the results are clearly too unreliable to use'], a: 1, b: 4,
        why: 'The manual sample shows the judge is missing real failures: 14 of 200 is 7%. Calibrating the judge against human labels and re-scoring restores trust in the numbers. Accepting the figure ignores the evidence, keyword matching has its own blind spots, and stopping testing removes visibility.' } },
    { type: 'callout', kind: 'exam', title: 'AI-assisted testing questions', md: `AI-assisted tools **extend coverage and repeatability**; they don’t replace human judgement. Expect the best answers to **calibrate automated judges**, keep autonomous testers **technically in scope**, **protect test data**, **verify findings** before reporting, and turn confirmed attacks into **regression tests**. For agents, look for permission combinations such as the **lethal trifecta**.` },
    { type: 'check', q: { q: 'An organisation is reviewing its AI agents for exposure to injected instructions. Which combination of capabilities in a single agent is MOST dangerous?', o: ['Reading internal documentation, and summarising it for staff in a chat window', 'Reading untrusted content, accessing private data and communicating externally', 'Generating images for the marketing team, and saving them to a shared drive', 'Answering questions about public products from a curated knowledge base'], a: 1, b: 4,
      why: 'Untrusted content can carry instructions, private data gives them something to steal, and external communication provides a way out. Together they form the "lethal trifecta"; removing any one of them breaks the path.' } }
  ]
};
