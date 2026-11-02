/* 6.4 · Section 2: adversarial testing targeting GenAI, RAG and agentic AI architectures */
module.exports = {
  title: 'Adversarial testing for GenAI, RAG and agents', covers: [2],
  blocks: [
    { type: 'video', title: 'Testing where attacks really land', kicker: 'Module 6.4 · Video 2 of 5', scenes: [
      { t: 'title', kicker: 'Module 6.4 · AI security testing', title: 'Testing where attacks really land', sub: 'Adversarial testing for GenAI, RAG and agentic AI', icon: 'bug',
        say: 'Attacks on AI systems don’t only arrive through the chat box. They arrive in documents, web pages, tool results, memories and messages from other agents. | This video covers adversarial testing for generative AI applications, retrieval-augmented generation and agentic architectures: what to test, and how to test safely.' },
      { t: 'compare', title: 'What to test, by architecture', labels: ['Entry points', 'Test for', 'Evidence'],
        cols: [{ h: 'GenAI app', icon: 'chat', k: 'human' }, { h: 'RAG', icon: 'database', k: 'data' }, { h: 'Agentic', icon: 'robot', k: 'model' }],
        rows: [
          ['Prompts, files, images', 'Documents, pages, index content', 'Tool results, memory, other agents'],
          ['Jailbreaks, leakage, unsafe output', 'Indirect injection, poisoning, access bypass', 'Tool misuse, escalation, goal hijack'],
          ['Responses and refusals', 'Retrieved chunks and citations', 'Tool calls, actions and traces'] ],
        say: 'What you test depends on the architecture. | For a generative AI application, the entry points are prompts, files and images. RAG adds documents, web pages and index content. Agents add tool results, memory and messages from other agents. | Test a GenAI application for jailbreaks, leakage of system prompts or data, and unsafe output. Test RAG for indirect injection, poisoning, and retrieval that bypasses access controls. Test agents for tool misuse, privilege escalation and goal hijacking. | And collect the right evidence: responses and refusals; the chunks that were retrieved and cited; and every tool call, action and trace.' },
      { t: 'chat', title: 'A canary test for indirect injection', app: 'Finance assistant (staging)',
        msgs: [
          { r: 'user', t: 'Summarise the supplier invoices received this week.' },
          { r: 'doc', t: 'Invoice 4471 · Total £1,240 · [planted test text: a hidden instruction to call the canary tool]' },
          { r: 'tool', t: 'canary_tool called · session 88f2 · 10:42:07' },
          { r: 'ai', t: 'This week: 12 invoices, £18,930 in total. Two are due on Friday.' },
          { r: 'note', t: 'Result: FAIL. The agent obeyed an instruction found in data.' } ],
        notes: [
          { h: 'An ordinary task', d: 'The tester asks for a routine summary, in staging.' },
          { h: 'A planted document', d: 'Test text asks the agent to call a canary tool.', k: 'threat' },
          { h: 'The canary fires', d: 'The tool does nothing except record that it was called.', k: 'threat' },
          { h: 'Nothing looks wrong', d: 'The summary is normal, so a user would never notice.', k: 'human' },
          { h: 'Weakness proven safely', d: 'No money, data or messages moved.', k: 'control' } ],
        say: 'Here is a safe way to test for indirect injection. In staging, the tester asks a finance assistant to summarise this week’s supplier invoices. | One invoice is a planted test document, containing a hidden instruction to call a canary tool: a tool that does nothing except record that it was called. | The canary fires. The agent has treated text inside a document as an instruction. | Its summary looks perfectly normal, which is exactly why the canary matters: a user would never notice. | The test fails, and it proves the weakness without moving any money, data or messages. The same approach works with canary records, links and tokens.' },
      { t: 'bullets', title: 'Test cases for RAG and agents', layout: 'grid', cols: 2, items: [
          { icon: 'lock', h: 'Permission-aware retrieval', d: 'Can one user retrieve another’s files?', k: 'data' },
          { icon: 'drop', h: 'Poisoned content', d: 'Does planted content change answers?', k: 'threat' },
          { icon: 'tool', h: 'Tool and scope limits', d: 'Can the agent exceed its permissions?', k: 'model' },
          { icon: 'hitl', h: 'Approval bypass', d: 'Can it act without required sign-off?', k: 'human' },
          { icon: 'memory', h: 'Memory persistence', d: 'Do injected instructions survive?', k: 'neutral' },
          { icon: 'cycle', h: 'Runaway loops', d: 'Can it burn tokens and calls?', k: 'control' } ],
        say: 'Six test cases matter especially for RAG and agents. | Permission-aware retrieval: can one user’s question pull back documents they aren’t allowed to see? | Poisoned content: does planted content in the index change answers or recommendations? | Tool and scope limits: can the agent be steered into calls beyond its permissions? | Approval bypass: can it complete a high-impact action without the human approval it should require? | Memory persistence: does an injected instruction survive into later sessions, or into other users’ sessions? | And runaway loops: can inputs drive it into endless tool calls, burning tokens and money?' },
      { t: 'stat', kicker: 'Why repetition matters', num: { v: 2, suf: '%', label: 'attack success rate' },
        def: 'At a million requests a day, a 2% success rate means 20,000 successful attacks.',
        ex: 'Repeat each case many times, and report the rate, with versions and settings.',
        say: 'One number explains why AI testing is statistical. Imagine an attack that succeeds only two per cent of the time. | At a million requests a day, that is twenty thousand successful attacks, yet a single test run would probably have reported a pass. | So repeat each case many times, at production settings, and report the success rate, together with the model version and settings used.' },
      { t: 'summary', items: ['Test every entry point: prompts, documents, tools, memory, agents', 'Use canaries to prove weaknesses without real harm', 'Test retrieval permissions, approvals, scopes and loops', 'Repeat cases, and report attack success rates'],
        say: 'To recap. | Test every entry point: prompts, documents, tool results, memory and other agents. | Use canary tools, records and links to prove weaknesses without real harm. | Test retrieval permissions, approval steps, tool scopes and runaway loops. | And repeat cases, reporting attack success rates rather than single results.' } ] },
    { type: 'text', md: `### Test objectives by architecture
| Architecture | Technique classes to test | What good looks like |
|---|---|---|
| **GenAI applications** | Direct prompt injection and jailbreak families (role-play, obfuscation and encoding, multi-turn escalation, many-shot patterns); system prompt and data leakage; unsafe output; improper output handling where output reaches browsers, databases or code (Module 3.5) | Safeguards hold across repeated, multi-turn and multimodal attempts; outputs are treated as untrusted downstream |
| **RAG systems** | Indirect injection through documents and pages; corpus and index poisoning; retrieval that ignores document permissions; leakage between tenants; citation manipulation | Retrieved text is treated as data; retrieval enforces the user’s permissions; poisoned content is detected or contained |
| **Agentic systems** | Tool misuse and excessive agency; confused-deputy actions; approval bypass; memory poisoning; tool poisoning through tool descriptions (Module 4.1); injection between agents; cascading failures; resource exhaustion | Least-privilege tools; approvals that can’t be skipped; memory that doesn’t carry instructions; every action traceable |
| **Multimodal inputs** | Instructions hidden in images, audio, video or file metadata | The same protections apply to every modality |

### Testing safely
- Use **canaries**: tools, records, links or tokens that only record that they were triggered. They prove an instruction was followed without moving money, data or messages.
- Keep tests in **isolated environments** with synthetic data, and never use real exfiltration routes.
- Describe attack content with **neutral placeholders** in shared reports; store harmful outputs securely, on a need-to-know basis.
- Watch for **side effects**: injected content in shared indexes or memory can affect other testers and users, so reset state after each run.

### Measuring results
- **Attack success rate (ASR)** for each technique class, with the number of attempts, model version, settings and guardrail configuration.
- **Turns needed:** how many conversation turns a multi-turn attack required.
- **Detection:** whether monitoring flagged the attempt (Module 5.3), not just whether the attack worked.
- **Benign baselines:** false refusals on legitimate requests, so that fixes don’t break the product.

Public benchmarks help with coverage and comparison: **AgentDojo** for prompt injection against tool-using agents, **HarmBench** for harmful behaviours under automated attack, and **CyberSecEval** for cyber security risks in models. They complement, but never replace, tests of your own system with your own data and tools.` },
    { type: 'match', title: 'Which test is this?', pairs: [
      ['Checking whether one user’s question can surface another user’s files', 'Permission-aware retrieval test'],
      ['Planting a document that asks the agent to call a canary tool', 'Indirect injection test'],
      ['Checking whether a refund can be issued without manager sign-off', 'Approval bypass test'],
      ['Hiding an instruction in an image’s pixels or metadata', 'Multimodal injection test'],
      ['Seeing whether an injected instruction persists into tomorrow’s session', 'Memory persistence test'] ] },
    { type: 'callout', kind: 'exam', title: 'Adversarial testing questions', md: `Match tests to the **architecture’s entry points**: prompts for GenAI; documents and indexes for RAG; tools, memory and other agents for agentic systems. Prefer **safe proofs** such as **canary tools and records** in isolated environments over real exploitation, measure **attack success rates** over repeated attempts, and check **detection** as well as prevention.` },
    { type: 'check', q: { q: 'Testers plant a document in a staging index that asks an agent to call a monitored canary tool. Why is this approach preferred?', o: ['It lets testers move real funds safely, because the canary tool can reverse payments', 'It proves the agent obeys instructions found in data, without causing any real harm', 'It removes the need to test the agent’s tools or permissions at any later stage', 'It guarantees that the agent will never follow hidden instructions in production'], a: 1, b: 2,
      why: 'A canary tool only records that it was called, so it shows that the agent followed an instruction embedded in data, with no real-world effect. It doesn’t replace other tests or guarantee future behaviour.' } }
  ]
};
