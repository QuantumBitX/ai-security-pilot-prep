/* 4.2 · Section 2: isolation and sandboxing for AI training and inference workloads */
module.exports = {
  title: 'Isolation and sandboxing for training and inference', covers: [2],
  blocks: [
    { type: 'video', title: 'Walls between workloads', kicker: 'Module 4.2 · Video 2 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.2 · AI infrastructure', title: 'Walls between workloads', sub: 'Isolation and sandboxing for training and inference', icon: 'box',
        say: 'AI workloads handle sensitive data, load models from outside, and increasingly run code that the model wrote itself. Isolation decides how far a compromise can spread. | This video covers isolation and sandboxing for training and inference workloads.' },
      { t: 'layers', title: 'How strong is the wall?',
        layers: [
          { icon: 'cycle', label: 'Processes', sub: 'Shared operating system and resources', k: 'threat' },
          { icon: 'container', label: 'Containers', sub: 'Separate file systems; shared kernel', k: 'human' },
          { icon: 'box', label: 'Sandboxed containers', sub: 'User-space or micro-VM kernels', k: 'data' },
          { icon: 'server', label: 'Virtual machines', sub: 'Separate kernels; shared hardware', k: 'model' },
          { icon: 'building', label: 'Dedicated hosts or clusters', sub: 'Separate hardware', k: 'neutral' },
          { icon: 'stop', label: 'Air-gapped environments', sub: 'No network path at all', k: 'control' } ],
        say: 'Isolation comes in degrees, and stronger walls cost more. | Separate processes share the operating system and its resources, which is very little isolation. | Containers give separate file systems, but share the host’s kernel, so a kernel exploit crosses the wall. | Sandboxed containers add a user-space kernel or a lightweight virtual machine, which is much stronger for untrusted code. | Virtual machines have separate kernels, but still share hardware. | Dedicated hosts or clusters separate the hardware itself. | And air-gapped environments have no network path at all, for the most sensitive work.' },
      { t: 'flow', title: 'An isolated training environment',
        zones: [{ id: 'zt', x: 470, y: 205, w: 690, h: 640, label: 'Training enclave', k: 'control' }],
        nodes: [
          { id: 'dev', x: 230, y: 370, icon: 'user', label: 'Engineers', sub: 'via secure access', k: 'human', w: 250 },
          { id: 'cl', x: 815, y: 370, icon: 'gpu', label: 'Training cluster', sub: 'no internet egress', k: 'model', w: 300 },
          { id: 'data', x: 815, y: 715, icon: 'database', label: 'Approved data mirror', sub: 'private endpoint', k: 'data', w: 320 },
          { id: 'reg', x: 1350, y: 715, icon: 'book', label: 'Model registry', sub: 'signed outputs only', k: 'neutral', w: 280 },
          { id: 'net', x: 1350, y: 370, icon: 'globe', label: 'Internet', sub: 'blocked', k: 'threat', w: 230 } ],
        edges: [{ from: 'dev', to: 'cl', k: 'human' }, { from: 'data', to: 'cl', k: 'data' }, { from: 'cl', to: 'reg', k: 'control' }, { from: 'cl', to: 'net', k: 'threat' }],
        steps: [
          { show: 'zt cl', hi: 'cl' },
          { show: 'dev dev-cl', flow: 'dev-cl', hi: 'dev' },
          { show: 'data data-cl', flow: 'data-cl', hi: 'data', mark: { data: 'lock' } },
          { show: 'net cl-net', hi: 'net', mark: { net: 'bad' } },
          { show: 'reg cl-reg', flow: 'cl-reg', hi: 'reg', mark: { reg: 'ok' } } ],
        say: 'Here is an isolated training environment for sensitive data. The training cluster sits inside its own enclave: a separate account or project and network. | Engineers reach it only through secure, authenticated access, such as a bastion or privileged access workstation, never directly from the internet. | Training data comes from an approved, pinned mirror over a private endpoint. | Direct internet egress is blocked, so stolen data or weights can’t simply be sent out, and nothing can be downloaded without review. | And the only way out for results is the model registry, which accepts signed artefacts.' },
      { t: 'bullets', title: 'Sandboxing code that agents run', layout: 'grid', cols: 2, items: [
          { icon: 'cycle', h: 'Ephemeral', d: 'Fresh per task, destroyed after', k: 'neutral' },
          { icon: 'box', h: 'Strong isolation', d: 'Micro-VMs or sandboxed runtimes', k: 'control' },
          { icon: 'wifi', h: 'No network by default', d: 'Allow-list only what is needed', k: 'threat' },
          { icon: 'clock', h: 'Resource limits', d: 'CPU, memory, disk and time', k: 'human' },
          { icon: 'key', h: 'No secrets inside', d: 'Scoped tokens only when essential', k: 'data' },
          { icon: 'search', h: 'Inspect what comes out', d: 'Files and results are untrusted', k: 'model' } ],
        say: 'When an agent writes and runs code, that code is untrusted, whoever asked for it. Sandbox it. | Make sandboxes ephemeral: created fresh for each task and destroyed afterwards. | Use strong isolation, such as micro-virtual machines or sandboxed container runtimes, not plain containers. | Give no network access by default, and allow-list only the destinations a task genuinely needs. | Limit CPU, memory, disk and running time, so a loop or a fork bomb can’t exhaust the host. | Keep secrets out of the sandbox, injecting narrowly scoped tokens only when essential. | And treat the files and results that come out as untrusted input.' },
      { t: 'compare', title: 'Isolating tenants at inference', labels: ['Isolation', 'If it fails', 'Fits'],
        cols: [{ h: 'Shared', icon: 'server', k: 'neutral' }, { h: 'Per tenant', icon: 'split', k: 'data' }, { h: 'Confidential', icon: 'lock', k: 'control' }],
        rows: [
          ['Logical, per request', 'Separate instances', 'Hardware-enforced'],
          ['Cross-tenant leakage', 'Contained to one tenant', 'Contained, with attestation'],
          ['Low-risk, high scale', 'Regulated tenants', 'Highly sensitive data'] ],
        say: 'Multi-tenant inference needs a deliberate isolation choice. | A shared model server separates tenants logically, request by request. Per-tenant deployments run separate instances. Confidential computing adds hardware-enforced isolation. | If logical separation fails, data can leak between tenants, for example through shared caches. Separate instances contain a failure to one tenant, and confidential computing adds attestation that the protection is in place. | Shared servers suit low-risk, high-scale services. Per-tenant deployments suit regulated tenants. And confidential computing suits highly sensitive data on infrastructure you don’t control.' },
      { t: 'summary', items: ['Choose wall strength by sensitivity and trust', 'Training enclaves: secure access, private data, no egress, signed outputs', 'Sandbox agent code: ephemeral, isolated, offline, limited, no secrets', 'Pick inference isolation per tenant risk; never share caches across tenants'],
        say: 'To recap. | Choose the strength of isolation according to data sensitivity and how much you trust the code. | Put sensitive training in an enclave with secure access, private data, no internet egress and signed outputs. | Sandbox agent-generated code: ephemeral, strongly isolated, offline by default, resource-limited and free of secrets. | And choose inference isolation according to each tenant’s risk, never sharing caches between tenants.' } ] },
    { type: 'text', md: `### Choosing isolation
| Workload | Typical risk | Suitable isolation |
|---|---|---|
| Experiments on public or synthetic data | Low | Shared clusters with namespaces, quotas and network policies |
| Training on confidential or personal data | High | Dedicated account or project, segmented network, no internet egress, private endpoints, dedicated nodes |
| Training on highly sensitive or regulated data | Very high | Dedicated clusters or hosts, confidential computing, or air-gapped environments |
| Loading third-party models | Untrusted artefacts | Scan and convert in a sandbox before use (Modules 3.6 and 3.7) |
| Agent-generated code | Untrusted code | Ephemeral micro-VM or sandboxed runtime, offline by default |
| Multi-tenant inference | Cross-tenant leakage | Per-tenant instances or namespaces for sensitive tenants; per-tenant caches; confidential computing where required |

### Training environments
- **Separate accounts or projects** per sensitivity level, with their own identities and keys.
- **No direct internet egress**; package and model downloads come through approved, scanned internal mirrors.
- **Private endpoints** to storage and registries; data pinned by hash (Module 3.7).
- **Secure administrative access** through bastions or privileged access workstations, with MFA and session recording.
- **Controlled export:** results leave only through the model registry, signed and approved (Modules 3.5 and 3.6).

### Code execution sandboxes
Containers share the host kernel, so a kernel vulnerability lets code escape. For untrusted code, use **micro-VMs** (such as Firecracker) or **sandboxed runtimes** (such as gVisor or Kata Containers), and add: ephemeral instances; no network or an egress allow-list; seccomp profiles and read-only file systems; CPU, memory, disk and time limits; no credentials; and inspection of outputs. Many AI code interpreters are built this way.

### Inference isolation and shared caches
Inference servers reuse computation between requests, for example through **prompt or key-value caches**. Researchers auditing commercial LLM APIs in 2025 found that some providers shared prompt caches across users, which created timing side channels that could reveal whether another user had sent a similar prompt. Keep caches **per tenant or per organisation** for sensitive workloads, and ask providers how caching is scoped. Also isolate tenants’ logs, fine-tunes, adapters and retrieval indexes.

### Notebooks and developer environments
Give each user their own environment rather than shared kernels, restrict their network access, keep secrets in a vault rather than in notebooks, and scan notebooks and repositories for leaked credentials.` },
    { type: 'callout', kind: 'exam', title: 'Isolation questions', md: `Match isolation to **trust in the code** and **sensitivity of the data**. Plain containers are not a strong boundary for untrusted code; micro-VMs, sandboxed runtimes, VMs or dedicated hardware are. For sensitive training, the hallmarks are **no internet egress, private data access and controlled export**.` },
    { type: 'match', title: 'Match the workload to its isolation', pairs: [
      ['Python code written by an agent', 'Ephemeral micro-VM sandbox'],
      ['Training on regulated health data', 'Dedicated enclave with no internet egress'],
      ['Experiments on public data', 'Shared cluster with quotas and network policies'],
      ['A regulated tenant on a shared inference service', 'Per-tenant deployment and caches'],
      ['An unvetted third-party model file', 'Scan and convert it in a sandbox first'] ] },
    { type: 'check', q: { q: 'An agent writes and runs Python code to analyse spreadsheets that users upload. Where should that code run?', o: ['In the agent’s own application container, which already has access to the files', 'In an ephemeral, strongly isolated sandbox with no network, resource limits and no secrets', 'On the user’s own laptop, so that any damage is limited to that one device', 'In a long-lived container shared by every user’s analysis jobs, so results come back quickly'], a: 1, b: 2,
      why: 'Model-generated code is untrusted. An ephemeral, strongly isolated sandbox without network access, secrets or unlimited resources contains anything it does. The application container holds broader access, users’ devices aren’t controlled, and shared long-lived containers let one job affect others.' } }
  ]
};
