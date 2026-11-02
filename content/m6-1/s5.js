/* 6.1 · Section 4b: threats specific to agentic workflows and multimodal systems */
module.exports = {
  title: 'Threats specific to agentic and multimodal systems', covers: [4],
  blocks: [
    { type: 'video', title: 'Agents that act, models that see and hear', kicker: 'Module 6.1 · Video 5 of 7', scenes: [
      { t: 'title', kicker: 'Module 6.1 · AI threat modelling', title: 'Agents that act, models that see and hear', sub: 'Threats specific to agentic and multimodal systems', icon: 'robot',
        say: 'Agents turn model outputs into actions, and multimodal models take in images, audio and video. Both widen the ways an attacker can reach a model, and the damage it can do. | This video covers threats specific to agentic workflows and multimodal systems.' },
      { t: 'bullets', title: 'Leading agentic threats', layout: 'grid', cols: 2, items: [
          { icon: 'target', h: 'Agent goal hijack', d: 'Goals redirected by injected content', k: 'threat' },
          { icon: 'tool', h: 'Tool misuse', d: 'Legitimate tools used for harm', k: 'human' },
          { icon: 'id', h: 'Identity and privilege abuse', d: 'Agents’ access exploited', k: 'data' },
          { icon: 'memory', h: 'Memory and context poisoning', d: 'Planted instructions persist', k: 'model' },
          { icon: 'network', h: 'Insecure agent communication', d: 'Spoofed or tampered messages', k: 'neutral' },
          { icon: 'split', h: 'Cascading failures', d: 'One fault spreads across agents', k: 'control' } ],
        say: 'The OWASP Top 10 for Agentic Applications, published in December 2025, names the leading risks. Six of them stand out. | Agent goal hijack: injected content redirects what the agent is trying to achieve. | Tool misuse: legitimate tools used in harmful ways, such as sending data out by email. | Identity and privilege abuse: an agent’s access or delegated credentials exploited. | Memory and context poisoning: planted instructions that persist and affect later sessions. | Insecure communication between agents: spoofed, replayed or tampered messages. | And cascading failures, where one agent’s error spreads through a chain of others.' },
      { t: 'flow', title: 'A cascading failure across agents',
        nodes: [
          { id: 'mem', x: 230, y: 330, icon: 'memory', label: 'Poisoned memory', sub: 'research agent', k: 'threat', w: 300 },
          { id: 'res', x: 700, y: 330, icon: 'robot', label: 'False findings', sub: 'passed to the planner', k: 'human', w: 300 },
          { id: 'plan', x: 1200, y: 330, icon: 'list', label: 'Planner agent', sub: 'builds on bad facts', k: 'model', w: 300 },
          { id: 'fin', x: 1200, y: 690, icon: 'money', label: 'Finance agent', sub: 'executes payments', k: 'threat', w: 300 },
          { id: 'mon', x: 700, y: 690, icon: 'eye', label: 'Each step looks normal', sub: 'no single alert', k: 'neutral', w: 330 },
          { id: 'hum', x: 230, y: 690, icon: 'hitl', label: 'Human approves', sub: 'trusts the agents', k: 'data', w: 300 } ],
        edges: [{ from: 'mem', to: 'res', k: 'threat' }, { from: 'res', to: 'plan', k: 'human' }, { from: 'plan', to: 'fin', k: 'model' }, { from: 'fin', to: 'mon', k: 'threat' }, { from: 'mon', to: 'hum', k: 'neutral' }],
        steps: [
          { show: 'mem', hi: 'mem', mark: { mem: 'alert' } },
          { show: 'res mem-res', flow: 'mem-res', hi: 'res' },
          { show: 'plan res-plan', flow: 'res-plan', hi: 'plan' },
          { show: 'fin plan-fin', flow: 'plan-fin', hi: 'fin', mark: { fin: 'alert' } },
          { show: 'mon fin-mon', flow: 'fin-mon', hi: 'mon' },
          { show: 'hum mon-hum', flow: 'mon-hum', hi: 'hum' } ],
        say: 'Here is how a cascading failure unfolds. A research agent’s memory is poisoned with a false claim about a supplier. | It passes false findings to a planner agent. | The planner builds a plan on those findings, trusting its colleague. | A finance agent executes the payments the plan calls for. | Each step looks normal on its own, so no single alert fires. | And the human approver trusts the agents’ consensus, which the OWASP list calls human-agent trust exploitation. Defences include verifying claims between agents, limiting each agent’s authority, and monitoring whole chains, not just single steps.' },
      { t: 'compare', title: 'Multimodal attack routes', labels: ['Images', 'Audio', 'Video', 'Documents'],
        cols: [{ h: 'Attack', icon: 'attacker', k: 'threat' }, { h: 'Defence', icon: 'shield', k: 'control' }],
        rows: [
          ['Hidden text or pixel tweaks', 'Scan image text; treat it as untrusted'],
          ['Disguised or inaudible commands', 'Confirm high-impact voice actions'],
          ['Deepfakes of real people', 'Out-of-band checks; provenance'],
          ['Instructions in metadata or white text', 'Strip metadata; render, then scan'] ],
        say: 'Multimodal models open new routes for attack. | Images can carry hidden text or subtle pixel changes. Treat any text found in images as untrusted input. | Audio can carry disguised or even inaudible commands. Require confirmation for high-impact voice actions. | Video enables deepfakes of real people. Verify requests through a separate channel, and check content provenance. | And documents can hide instructions in metadata or white-on-white text. Strip metadata, and scan what the model will actually read.' },
      { t: 'timeline', title: 'A deepfake-enabled payment fraud', events: [
          { y: 'Day 1', h: 'Phishing message', d: '"Confidential transaction" from the "CFO"' },
          { y: 'Day 2', h: 'Video call', d: 'Deepfaked CFO and colleagues' },
          { y: 'Day 2', h: 'Urgent transfers', d: 'Many payments to new accounts' },
          { y: 'Day 7', h: 'Discovery', d: 'Employee checks with head office' },
          { y: 'Lesson', h: 'Process controls', d: 'Out-of-band verification, dual approval' } ],
        say: 'Deepfakes have already enabled large frauds. Here is the pattern of a widely reported case. | An employee receives a message, apparently from the chief financial officer, about a confidential transaction. | Suspicious at first, the employee joins a video call, where the CFO and several colleagues all appear and speak. All of them are deepfakes. | Reassured, the employee makes a series of urgent transfers to new accounts. | The fraud is discovered days later, when the employee checks with head office. | The lesson is that process controls beat detection: verify payment requests through a separate, known channel, and require dual approval.' },
      { t: 'summary', items: ['Agentic: goal hijack, tool misuse, privilege abuse, memory poisoning', 'Also: insecure agent messages, cascading failures, trust exploitation', 'Multimodal: treat text in images, audio and files as untrusted', 'Deepfakes: rely on out-of-band verification and dual approval'],
        say: 'To recap. | Agentic threats include goal hijack, tool misuse, identity and privilege abuse, and memory poisoning. | They also include insecure communication between agents, cascading failures and exploitation of human trust. | For multimodal systems, treat text found in images, audio and documents as untrusted input. | And against deepfakes, rely on out-of-band verification and dual approval, not on spotting the fake.' } ] },
    { type: 'text', md: `### The OWASP Top 10 for Agentic Applications (2026)
Published by the OWASP GenAI Security Project in December 2025:
| ID | Risk | In brief |
|---|---|---|
| ASI01 | Agent Goal Hijack | Injected content or manipulation redirects an agent’s goals |
| ASI02 | Tool Misuse and Exploitation | Legitimate tools used unsafely or for harm |
| ASI03 | Identity and Privilege Abuse | Agent identities, credentials or delegated rights exploited (Module 4.6) |
| ASI04 | Agentic Supply Chain Vulnerabilities | Compromised tools, MCP servers, plugins, models or agent components (Module 6.3) |
| ASI05 | Unexpected Code Execution | Agents generating or running code that leads to compromise |
| ASI06 | Memory and Context Poisoning | Persistent memory or shared context corrupted |
| ASI07 | Insecure Inter-Agent Communication | Spoofed, replayed or tampered messages between agents (for example over A2A) |
| ASI08 | Cascading Failures | Errors or compromise propagating across agents and systems |
| ASI09 | Human-Agent Trust Exploitation | People over-trusting agents, or agents manipulating people |
| ASI10 | Rogue Agents | Agents acting outside their intended purpose or control |

### Protocol-level threats
- **MCP:** tool poisoning (malicious instructions in tool descriptions), tool shadowing (one server interfering with another’s tools), "rug pulls" (a trusted server changing behaviour after approval) and over-privileged servers (Module 4.1).
- **Agent-to-agent (A2A):** agent impersonation, forged agent cards, message tampering and replay, and delegation chains that exceed intended authority. Authenticate agents, sign messages and limit what remote agents may request.

### Multimodal threats
- **Images:** typographic attacks (text in an image that the model reads as an instruction), adversarial perturbations, and instructions hidden in low-contrast text.
- **Audio:** commands hidden in audio, including ultrasonic commands shown to work against voice assistants (DolphinAttack, 2017), and cloned voices.
- **Video and deepfakes:** in early 2024, an employee of engineering firm Arup in Hong Kong transferred about HK$200 million (around US$25 million) after a video call in which the CFO and colleagues were deepfakes.
- **Documents:** hidden text, metadata, comments and embedded objects.
- **Defences:** treat content from every modality as untrusted data; extract and scan text from images and files; require confirmation for high-impact actions; use content provenance standards such as C2PA where available; and design payment and access processes so that a convincing face or voice is never enough (Module 6.6).` },
    { type: 'match', title: 'Which agentic risk is this?', pairs: [
      ['An agent’s notes from yesterday contain a planted instruction it follows today', 'Memory and context poisoning (ASI06)'],
      ['An email convinces an agent its real task is to export customer data', 'Agent goal hijack (ASI01)'],
      ['A remote agent forges another agent’s identity in A2A messages', 'Insecure inter-agent communication (ASI07)'],
      ['A trusted MCP server silently changes its tool behaviour after approval', 'Agentic supply chain vulnerability (ASI04)'],
      ['An approver signs off because three agents all agreed', 'Human-agent trust exploitation (ASI09)'] ] },
    { type: 'callout', kind: 'exam', title: 'Agentic and multimodal questions', md: `Know the **OWASP Top 10 for Agentic Applications (2026)**: goal hijack, tool misuse, identity and privilege abuse, supply chain, unexpected code execution, memory and context poisoning, insecure inter-agent communication, cascading failures, human-agent trust exploitation and rogue agents. For multimodal systems, **all modalities are untrusted input**. Against deepfakes, the best answer is a **process control** (out-of-band verification, dual approval), not detection alone.` },
    { type: 'check', q: { q: 'A finance team uses video calls to approve urgent payments requested by executives. Which control BEST reduces the risk of deepfake fraud?', o: ['Train staff to look for visual glitches that reveal deepfaked faces', 'Verify requests through a separate known channel, with dual approval', 'Only accept video calls from executives who have cameras switched on', 'Use a deepfake detection tool and approve whatever it marks as genuine'], a: 1, b: 4,
      why: 'Out-of-band verification and dual approval work however convincing the fake is. Spotting glitches and detection tools are unreliable as deepfakes improve, and cameras being on proves nothing.' } }
  ]
};
