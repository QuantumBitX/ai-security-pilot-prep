/* 4.2 · Section 3: availability controls against resource exhaustion (rate limiting, compute throttling) */
module.exports = {
  title: 'Availability controls against resource exhaustion', covers: [3],
  blocks: [
    { type: 'video', title: 'Don’t let one job starve the rest', kicker: 'Module 4.2 · Video 3 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.2 · AI infrastructure', title: 'Don’t let one job starve the rest', sub: 'Throttling, quotas, scheduling and autoscaling limits', icon: 'sliders',
        say: 'GPU capacity is scarce and expensive. One runaway training job, a flood of inference requests or a looping agent can starve everything else, by accident or by design. | This video covers infrastructure-level controls against resource exhaustion: throttling, quotas, scheduling and autoscaling limits.' },
      { t: 'bullets', title: 'How AI infrastructure gets exhausted', layout: 'grid', cols: 2, items: [
          { icon: 'bug', h: 'Runaway jobs', d: 'Bugs, loops, oversized batches', k: 'human' },
          { icon: 'bars', h: 'Inference floods', d: 'Traffic spikes or attacks', k: 'threat' },
          { icon: 'robot', h: 'Agent loops', d: 'Endless tool calls and retries', k: 'model' },
          { icon: 'users', h: 'Noisy neighbours', d: 'One team or tenant hogs GPUs', k: 'neutral' },
          { icon: 'memory', h: 'Memory exhaustion', d: 'Huge contexts, growing caches', k: 'data' },
          { icon: 'money', h: 'Hijacked compute', d: 'Cryptomining on stolen access', k: 'control' } ],
        say: 'Resources run out in six common ways. | Runaway jobs: bugs, infinite loops and oversized batches. | Inference floods, from genuine traffic spikes or deliberate attacks. | Agent loops: endless tool calls and retries. | Noisy neighbours: one team or tenant taking all the GPUs. | Memory exhaustion from very long contexts or ever-growing caches. | And hijacked compute: attackers who gain access to a cluster often use its GPUs for cryptocurrency mining.' },
      { t: 'flow', title: 'Layers of throttling',
        nodes: [
          { id: 'req', x: 200, y: 330, icon: 'chat', label: 'Requests and jobs', k: 'neutral', w: 260 },
          { id: 'gw', x: 600, y: 330, icon: 'filter', label: 'Gateway', sub: 'token-aware rate limits', k: 'data', w: 290 },
          { id: 'q', x: 1000, y: 330, icon: 'list', label: 'Admission queue', sub: 'priorities, load shedding', k: 'human', w: 300 },
          { id: 'sch', x: 1340, y: 600, icon: 'calendar', label: 'Scheduler', sub: 'quotas, preemption', k: 'model', w: 270 },
          { id: 'node', x: 960, y: 760, icon: 'gpu', label: 'GPU nodes', sub: 'limits, timeouts', k: 'control', w: 260 },
          { id: 'as', x: 520, y: 700, icon: 'cloud', label: 'Autoscaling', sub: 'maximums, budget alerts', k: 'threat', w: 300 } ],
        edges: [{ from: 'req', to: 'gw', k: 'neutral' }, { from: 'gw', to: 'q', k: 'data' }, { from: 'q', to: 'sch', k: 'human' }, { from: 'sch', to: 'node', k: 'model' }, { from: 'node', to: 'as', k: 'control' }],
        steps: [
          { show: 'req', hi: 'req' },
          { show: 'gw req-gw', flow: 'req-gw', hi: 'gw' },
          { show: 'q gw-q', flow: 'gw-q', hi: 'q' },
          { show: 'sch q-sch', flow: 'q-sch', hi: 'sch' },
          { show: 'node sch-node', flow: 'sch-node', hi: 'node', mark: { node: 'lock' } },
          { show: 'as node-as', flow: 'node-as', hi: 'as' } ],
        say: 'Throttling works best in layers, each catching what the last one misses. Requests and jobs arrive from users, applications and agents. | The gateway applies rate limits that count tokens as well as requests, per identity. | An admission queue holds work when capacity is short, admits it by priority, and sheds the least important work first. | The scheduler enforces quotas for each team or tenant, and lets critical workloads preempt experiments. | On the GPU nodes themselves, limits on memory, concurrency and running time stop any one job from taking everything. | And autoscaling adds capacity, but only up to a set maximum, with budget alerts, so an attack can’t scale costs without limit.' },
      { t: 'compare', title: 'Three kinds of control', labels: ['Works on', 'Protects against', 'Example'],
        cols: [{ h: 'Rate limits', icon: 'clock', k: 'data' }, { h: 'Throttling', icon: 'gpu', k: 'model' }, { h: 'Quotas', icon: 'calendar', k: 'human' }],
        rows: [
          ['Requests and tokens', 'GPU, memory and time', 'Teams and workloads'],
          ['Floods and abuse', 'Runaway jobs and loops', 'Starving critical work'],
          ['Tokens per minute per key', 'Job time and memory caps', 'Inference outranks experiments'] ],
        say: 'Three kinds of control work together. | Rate limiting works on requests and tokens. Compute throttling works on GPU, memory and time. Quotas and priorities work on teams and workloads. | Rate limiting protects against floods and abuse. Compute throttling protects against runaway jobs and loops. Quotas and priorities stop critical work from being starved. | For example: a limit on tokens per minute for each key; caps on each job’s running time and memory; and a rule that production inference always outranks experiments.' },
      { t: 'bullets', title: 'Detect and respond', items: [
          { icon: 'chart', h: 'Watch utilisation and queues', d: 'GPU use, queue depth, latency', k: 'data' },
          { icon: 'siren', h: 'Alert on unusual jobs', d: 'Unknown workloads at full load', k: 'threat' },
          { icon: 'money', h: 'Budget and capacity alerts', d: 'Before limits are hit', k: 'human' },
          { icon: 'stop', h: 'Stop jobs that break limits', d: 'Automatically, with a record', k: 'control' },
          { icon: 'filter', h: 'Shed low-priority load', d: 'Protect what matters most', k: 'model' } ],
        say: 'Limits need monitoring and a response. | Watch GPU utilisation, queue depth and latency, with baselines for each service. | Alert on unusual jobs, such as unknown workloads running at full load for hours, a classic sign of cryptomining. | Raise budget and capacity alerts before limits are reached, not after. | Stop jobs that break their limits automatically, keeping a record for investigation. | And under pressure, shed low-priority load first, so the most important services keep running.' },
      { t: 'summary', items: ['Runaway jobs, floods, loops, neighbours and hijacking exhaust capacity', 'Layer gateway, queue, scheduler, node and autoscaling limits', 'Rate limits, compute throttling and quotas do different jobs', 'Monitor, alert, stop and shed load to protect critical services'],
        say: 'To recap. | Runaway jobs, floods, agent loops, noisy neighbours and hijacked compute can all exhaust AI infrastructure. | Layer controls at the gateway, the admission queue, the scheduler, the nodes and autoscaling. | Rate limits, compute throttling and quotas do different jobs, so use all three. | And monitor, alert, stop runaway work and shed low-priority load to protect critical services.' } ] },
    { type: 'text', md: `### Controls by layer
| Layer | Controls |
|---|---|
| **Edge and gateway** | DDoS protection; authentication; rate limits on requests **and tokens** per key, user and tenant; input and output token caps (Module 3.6) |
| **Admission and queueing** | Bounded queues; priority classes; load shedding of low-priority work; timeouts while queued |
| **Scheduling** | Per-team or per-tenant GPU quotas; fair-share scheduling; preemption so critical workloads can displace experiments; placement rules that keep production on reserved nodes |
| **Nodes and runtimes** | CPU, memory and GPU limits per workload; job time limits; maximum context length and concurrent sequences on inference servers, to bound memory used by key-value caches |
| **Autoscaling** | Maximum replica counts; scale-out rate limits; budget alerts and hard caps; separate budgets for experimentation |
| **Agents** | Step, tool-call, time and cost budgets per task, with loop detection (Module 4.6) |

In Kubernetes, these map to features such as **resource requests and limits**, **ResourceQuotas** and **LimitRanges** per namespace, **PriorityClasses** with preemption, job deadlines, and batch schedulers that manage GPU quotas and fair sharing. Traditional HPC schedulers provide similar controls.

### Detecting exhaustion and abuse
- Baseline GPU utilisation, memory, queue depth, latency and error rates per service.
- Alert on unknown or unapproved workloads, sustained full GPU load outside schedules, new outbound connections from training nodes, and sudden cost spikes. Cryptomining after a cluster compromise is common (as in the ShadowRay campaign, Section 1).
- Correlate infrastructure signals with gateway logs to separate genuine demand from abuse (Module 5.3).

### Responding
Throttle or block offending identities, kill runaway jobs, shed low-priority load, fail over to reserved capacity or fallback models (Module 3.6), and investigate whether exhaustion was accidental or malicious. Module 6.1 covers availability attacks such as compute and token exhaustion, and Module 4.4 covers load and stress testing to find limits before attackers do.` },
    { type: 'callout', kind: 'exam', title: 'Exhaustion questions', md: `For shared clusters, the best answers combine **quotas** (fair shares), **priorities with preemption** (critical work wins) and **limits** (time, memory, maximum scale). Simply buying more GPUs, or asking teams to be careful, doesn’t prevent a single job or attacker from consuming everything.` },
    { type: 'check', q: { q: 'A shared GPU cluster runs a production inference service and data scientists’ experiments. A buggy experiment used every GPU for six hours, and inference degraded. What is the BEST preventive control?', o: ['Ask data scientists to check their experiments more carefully before submitting them', 'Per-team quotas, priorities that let production preempt experiments, and job time limits', 'Buy enough additional GPUs that the cluster can no longer run out of capacity', 'Run experiments only overnight, when inference traffic is usually much lower'], a: 1, b: 3,
      why: 'Quotas cap each team’s share, preemption guarantees production capacity, and time limits stop runaway jobs. More hardware can be consumed just the same, scheduling by time of day doesn’t stop a runaway job, and carefulness isn’t a control.' } }
  ]
};
