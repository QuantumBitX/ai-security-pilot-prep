/* 6.1 · Section 5: availability attacks (compute, token exhaustion) */
module.exports = {
  title: 'Availability attacks: compute and token exhaustion', covers: [5],
  blocks: [
    { type: 'video', title: 'Running the AI out of resources', kicker: 'Module 6.1 · Video 6 of 7', scenes: [
      { t: 'title', kicker: 'Module 6.1 · AI threat modelling', title: 'Running the AI out of resources', sub: 'Availability attacks: compute and token exhaustion', icon: 'bolt',
        say: 'Every AI request consumes expensive compute, and pay-per-token pricing turns abuse into a direct financial loss. Attackers don’t need a huge flood of traffic when a few well-chosen requests can be enormously costly. | This video covers availability attacks on AI systems: compute and token exhaustion.' },
      { t: 'bullets', title: 'Ways to exhaust an AI system', layout: 'grid', cols: 2, items: [
          { icon: 'token', h: 'Token floods', d: 'High volumes of requests', k: 'threat' },
          { icon: 'ruler', h: 'Context stuffing', d: 'Maximum-length inputs', k: 'human' },
          { icon: 'text', h: 'Output amplification', d: 'Prompts that force very long answers', k: 'data' },
          { icon: 'cycle', h: 'Agent loops', d: 'Recursive plans and tool cycles', k: 'model' },
          { icon: 'gpu', h: 'Sponge inputs', d: 'Crafted to maximise compute', k: 'neutral' },
          { icon: 'money', h: 'Denial of wallet', d: 'Costs driven past budgets', k: 'control' } ],
        say: 'There are six main ways to exhaust an AI system. | Token floods: simply sending large volumes of requests. | Context stuffing: filling every request to the maximum input length. | Output amplification: prompts designed to force extremely long answers. | Agent loops: tricking agents into recursive plans or endless cycles of tool calls. | Sponge inputs: inputs crafted to maximise the computation and energy a model uses, shown in research from 2021. | And denial of wallet: driving usage costs past budgets until the service is switched off or the bill becomes the damage.' },
      { t: 'chart', title: 'Some requests cost far more than others', kind: 'bar', x: ['Normal request', 'Context stuffing', 'Output amplification', 'Agent loop'], yMin: 0, yMax: 400, ticks: 4, yLabel: 'Illustrative thousands of tokens consumed per request',
        series: [{ n: 'Tokens', k: 'threat', v: [3, 120, 32, 380], ck: ['control', 'human', 'data', 'threat'] }],
        steps: [{ s: [0] }],
        say: 'This illustrative chart shows why AI availability attacks don’t need floods. A normal request might use a few thousand tokens. A stuffed context uses a hundred and twenty thousand, output amplification tens of thousands, and a single runaway agent loop hundreds of thousands. One attacker can impose the cost of thousands of normal users.' },
      { t: 'compare', title: 'Traditional DoS and AI exhaustion', labels: ['Unit of cost', 'Volume needed', 'Detection', 'Main defence'],
        cols: [{ h: 'Traditional DoS', icon: 'network', k: 'neutral' }, { h: 'AI exhaustion', icon: 'gpu', k: 'threat' }],
        rows: [
          ['Bandwidth, connections', 'Tokens, GPU seconds'],
          ['Huge floods', 'A few costly requests'],
          ['Traffic volume spikes', 'Cost and token anomalies'],
          ['Scrubbing services, CDNs', 'Quotas, caps and budgets'] ],
        say: 'AI exhaustion differs from traditional denial of service. | Traditional attacks consume bandwidth and connections. AI attacks consume tokens and GPU seconds. | Traditional attacks need huge floods. AI attacks can work with a few costly requests. | Traditional attacks show up as traffic spikes. AI attacks show up as cost and token anomalies, often from authenticated users. | And where traditional defences use scrubbing services and content delivery networks, AI defences rely on quotas, caps and budgets.' },
      { t: 'flow', title: 'Layered defences against exhaustion',
        nodes: [
          { id: 'id', x: 230, y: 330, icon: 'id', label: 'Identity and quotas', sub: 'per user, key, tenant', k: 'control', w: 320 },
          { id: 'in', x: 700, y: 330, icon: 'ruler', label: 'Input limits', sub: 'size, files, rate', k: 'data', w: 280 },
          { id: 'out', x: 1200, y: 330, icon: 'text', label: 'Output caps', sub: 'maximum tokens', k: 'model', w: 280 },
          { id: 'ag', x: 1200, y: 690, icon: 'robot', label: 'Agent budgets', sub: 'steps, time, cost', k: 'human', w: 290 },
          { id: 'cb', x: 700, y: 690, icon: 'bolt', label: 'Anomaly breakers', sub: 'cost and token alerts', k: 'threat', w: 320 },
          { id: 'iso', x: 230, y: 690, icon: 'layers', label: 'Capacity isolation', sub: 'separate queues', k: 'neutral', w: 300 } ],
        edges: [{ from: 'id', to: 'in', k: 'control' }, { from: 'in', to: 'out', k: 'data' }, { from: 'out', to: 'ag', k: 'model' }, { from: 'ag', to: 'cb', k: 'human' }, { from: 'cb', to: 'iso', k: 'threat' }],
        steps: [
          { show: 'id', hi: 'id' },
          { show: 'in id-in', flow: 'id-in', hi: 'in' },
          { show: 'out in-out', flow: 'in-out', hi: 'out' },
          { show: 'ag out-ag', flow: 'out-ag', hi: 'ag' },
          { show: 'cb ag-cb', flow: 'ag-cb', hi: 'cb', mark: { cb: 'alert' } },
          { show: 'iso cb-iso', flow: 'cb-iso', hi: 'iso', mark: { iso: 'ok' } } ],
        say: 'Defences come in layers. Start with identity and quotas per user, key and tenant, so no anonymous caller can consume unlimited resources. | Limit inputs: size, number of files and request rate. | Cap outputs with maximum token limits. | Give agents budgets for steps, time and cost per task. | Use anomaly-based circuit breakers on cost and token usage. | And isolate capacity, with separate queues for critical services and tenants, so one abuser can’t starve everyone else.' },
      { t: 'summary', items: ['Floods, stuffing, amplification, loops, sponges, denial of wallet', 'A few costly requests can do the damage', 'Watch cost and token anomalies, not just traffic', 'Quotas, input and output caps, agent budgets, breakers, isolation'],
        say: 'To recap. | AI availability attacks include token floods, context stuffing, output amplification, agent loops, sponge inputs and denial of wallet. | A few costly requests can do as much damage as a large flood. | Detect them through cost and token anomalies, not just traffic volume. | And defend in layers: quotas, input and output caps, agent budgets, circuit breakers and capacity isolation.' } ] },
    { type: 'text', md: `### Availability threats in the frameworks
- **OWASP LLM10:2025 Unbounded Consumption** covers excessive and uncontrolled inference: denial of service, denial of wallet, model extraction through unlimited queries, and resource-intensive inputs.
- **MITRE ATLAS** includes techniques such as denial of AI service and cost harvesting.
- **NIST AI 100-2** classifies availability breakdown as one of the attacker’s goals, including energy-latency attacks such as **sponge examples** (Shumailov et al., 2021), inputs crafted to maximise a model’s energy use and latency.

### Attack patterns and defences
| Pattern | Example | Defences |
|---|---|---|
| **Token floods** | Automated scripts with stolen or free-tier keys | Authentication, per-identity quotas, rate limits, bot detection |
| **Context stuffing** | Every request at the maximum context length | Input size limits, document size and count limits, pricing tiers |
| **Output amplification** | Prompts demanding exhaustive, repetitive answers | Maximum output tokens, response length policies |
| **Agent loops** | Injected instructions that make an agent call tools endlessly | Step, time and cost budgets per task; loop detection (Module 4.7) |
| **Retrieval exhaustion** | Expensive vector searches or huge result sets | Query limits, top-k caps, caching |
| **GPU and queue exhaustion** | Saturating shared inference capacity | Capacity isolation, priority queues, autoscaling with limits |
| **Denial of wallet** | Running up provider bills | Budgets and hard caps, spend alerts, circuit breakers (Module 5.7) |

### Planning for availability
- **Include availability in threat models** from the start, with explicit assumptions about who can call the system and how often.
- **Separate critical workloads** from experimental or public ones, so abuse of one can’t starve the other.
- **Watch the business signal:** cost per hour, tokens per identity and queue depth are often the earliest indicators (Module 5.2).
- **Test it:** include resource exhaustion scenarios in red teaming and load testing (Module 6.4).
- **Plan for provider limits:** your provider’s rate limits are shared across your applications; one abusive feature can exhaust the quota for all of them (Module 5.7).` },
    { type: 'flip', title: 'Availability terms', cards: [
      ['Denial of wallet', 'An attack that drives usage costs up until budgets are exhausted or the service is switched off.'],
      ['Context stuffing', 'Filling requests to the maximum input length to increase cost and latency.'],
      ['Sponge example', 'An input crafted to maximise a model’s computation, energy use and latency.'],
      ['Agent budget', 'Limits on the steps, time and cost an agent may spend on a single task.'],
      ['Capacity isolation', 'Separate queues or capacity for critical services, so abuse of one can’t starve others.'] ] },
    { type: 'callout', kind: 'exam', title: 'Availability questions', md: `For AI, think **cost as well as capacity**. The best answers apply **per-identity quotas**, **input and output token caps**, **agent step and cost budgets**, **cost anomaly detection with circuit breakers**, and **capacity isolation**. Traditional DDoS protection alone doesn’t stop a few authenticated, very expensive requests.` },
    { type: 'check', q: { q: 'A public AI assistant suffers huge provider bills from a small number of accounts sending maximum-length documents and asking for exhaustive answers. Which combination of controls is MOST effective?', o: ['A content delivery network in front of the assistant to absorb traffic', 'Per-account quotas, input size limits, output token caps and spend alerts', 'A larger monthly budget with the provider, so the service stays online', 'A CAPTCHA on the home page, shown once per browser session'], a: 1, b: 5,
      why: 'The problem is cost per request from known accounts, so per-account quotas, input and output limits and spend alerts address it directly. A CDN and CAPTCHA don’t limit costly authenticated requests, and a bigger budget just pays for the abuse.' } }
  ]
};
