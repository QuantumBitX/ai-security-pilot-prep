/* 4.2 · Section 4: isolated accelerator capacity */
module.exports = {
  title: 'Isolated accelerator capacity', covers: [4],
  blocks: [
    { type: 'video', title: 'Whose GPU is it anyway?', kicker: 'Module 4.2 · Video 4 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.2 · AI infrastructure', title: 'Whose GPU is it anyway?', sub: 'Sharing, partitioning and reserving accelerators', icon: 'gpu',
        say: 'Accelerators are the heart of AI infrastructure, and they are often shared: between teams, between tenants, and between customers of a cloud provider. | This video covers isolated accelerator capacity: why sharing GPUs creates risk, and the options for keeping critical and sensitive workloads apart.' },
      { t: 'compare', title: 'Ways to share a GPU', labels: ['Isolation', 'Performance', 'Use for'],
        cols: [{ h: 'Time-slicing', icon: 'clock', k: 'threat' }, { h: 'Partitions', icon: 'layers', k: 'data' }, { h: 'Dedicated', icon: 'gpu', k: 'control' }],
        rows: [
          ['Weak: shared memory', 'Strong: separate memory and compute', 'Full'],
          ['Unpredictable', 'Predictable per slice', 'Predictable'],
          ['Trusted, low-priority work', 'Mixed workloads and tenants', 'Sensitive or critical work'] ],
        say: 'There are three broad ways to share an accelerator. | Time-slicing lets workloads take turns on the same GPU, sharing its memory, which is weak isolation. Hardware partitioning, such as multi-instance GPU technology, splits one GPU into slices with their own memory and compute. Dedicated GPUs give full isolation. | With time-slicing, performance is unpredictable. Hardware partitions give each slice predictable performance, and dedicated GPUs are the most predictable of all. | So use time-slicing only for trusted, low-priority work, hardware partitions for mixed workloads and tenants, and dedicated GPUs for sensitive or critical work.' },
      { t: 'bullets', title: 'Risks of shared accelerators', layout: 'grid', cols: 2, items: [
          { icon: 'memory', h: 'Leftover data', d: 'Memory not cleared between jobs', k: 'threat' },
          { icon: 'wave', h: 'Side channels', d: 'Timing, cache and power signals', k: 'model' },
          { icon: 'users', h: 'Contention', d: 'Noisy neighbours starve critical work', k: 'human' },
          { icon: 'bug', h: 'Driver and firmware flaws', d: 'A shared host is a shared target', k: 'data' },
          { icon: 'alert', h: 'Capacity loss', d: 'Shortages and reclaimed instances', k: 'neutral' },
          { icon: 'globe', h: 'Supply concentration', d: 'One provider, one region', k: 'control' } ],
        say: 'Sharing accelerators brings six risks. | Leftover data: if GPU memory isn’t cleared between jobs, the next workload may read what the last one left behind. In 2024, researchers showed this on several vendors’ GPUs, recovering parts of another process’s language model output. | Side channels, such as timing, cache behaviour and power use, which can leak information across workloads. | Contention, where noisy neighbours starve critical work. | Flaws in drivers and firmware, which make a shared host a shared target. | Capacity loss, through shortages or cheap instances that the provider reclaims at short notice. | And concentration, where all capacity depends on one provider or one region.' },
      { t: 'matrix', title: 'Placing workloads on accelerators', rows: ['High sensitivity', 'Low sensitivity'], cols: ['Critical availability', 'Best effort'], xLabel: 'Availability need', yLabel: 'Data sensitivity',
        items: [{ t: 'Dedicated, reserved GPUs', r: 0, c: 0, k: 'threat' }, { t: 'Dedicated or confidential', r: 0, c: 1, k: 'model' }, { t: 'Reserved partitions', r: 1, c: 0, k: 'human' }, { t: 'Shared pool, quotas', r: 1, c: 1, k: 'control' }],
        say: 'Sensitivity and availability together decide where a workload should run. | Highly sensitive and critical: dedicated GPUs with reserved capacity. | Highly sensitive but best-effort: dedicated GPUs, or confidential GPU computing on shared infrastructure. | Low sensitivity but critical, such as a public service: reserved capacity, partitioned if shared. | And low sensitivity, best-effort work, such as most experiments: a shared pool with quotas.' },
      { t: 'bullets', title: 'Controls for accelerator capacity', layout: 'grid', cols: 2, items: [
          { icon: 'calendar', h: 'Reserve critical capacity', d: 'Reservations or committed capacity', k: 'human' },
          { icon: 'layers', h: 'Partition for tenancy', d: 'Hardware partitions, not time-slicing', k: 'data' },
          { icon: 'trash', h: 'Clear memory between jobs', d: 'Scrub or reset accelerators', k: 'threat' },
          { icon: 'cycle', h: 'Patch drivers and firmware', d: 'Isolate management interfaces', k: 'neutral' },
          { icon: 'lock', h: 'Confidential GPU computing', d: 'Attested, encrypted, for sensitive work', k: 'control' },
          { icon: 'split', h: 'Plan for scarcity', d: 'Regions, providers, fallbacks', k: 'model' } ],
        say: 'Six controls cover most of this risk. | Reserve capacity for critical services, through reservations or committed capacity, rather than competing for on-demand GPUs in a shortage. | Use hardware partitions, not time-slicing, when tenants or sensitivity levels share a GPU. | Clear accelerator memory between jobs, by scrubbing or resetting devices. | Patch drivers and firmware promptly, and keep management interfaces isolated. | Use confidential GPU computing, with attestation, for sensitive work on shared infrastructure. | And plan for scarcity, with multiple regions or providers and fallback models.' },
      { t: 'summary', items: ['Time-slicing shares memory; partitions and dedicated GPUs isolate', 'Shared accelerators risk leftover data, side channels and contention', 'Place workloads by sensitivity and availability need', 'Reserve, partition, scrub, patch, attest, and plan for scarcity'],
        say: 'To recap. | Time-slicing shares memory, while hardware partitions and dedicated GPUs provide real isolation. | Shared accelerators risk leftover data, side channels, contention and shared vulnerabilities. | Place each workload according to its data sensitivity and availability need. | And reserve critical capacity, partition shared GPUs, clear memory, patch, use attestation for sensitive work, and plan for scarcity.' } ] },
    { type: 'text', md: `### Sharing models for accelerators
| Approach | How it works | Isolation | Notes |
|---|---|---|---|
| **Time-slicing** | Workloads take turns on the whole GPU | Weak: shared memory and caches | Simple; unpredictable performance; for trusted workloads only |
| **Multi-process sharing** | Several processes run concurrently on one GPU | Weak to moderate | Better utilisation; limited fault and memory isolation |
| **Hardware partitioning** (such as NVIDIA Multi-Instance GPU) | One GPU is split into up to seven instances, each with dedicated memory, cache and compute | Strong, enforced in hardware | Predictable performance; supported on recent data-centre GPUs |
| **Virtual GPUs** | A hypervisor presents GPU slices to virtual machines | Moderate to strong, depending on configuration | Common in virtual desktop and some cloud offerings |
| **Dedicated GPUs or hosts** | One workload or tenant per device or server | Full | Highest cost; required for the most sensitive or critical work |

### Real-world risk: leftover GPU memory
In January 2024, researchers disclosed **LeftoverLocals**, a vulnerability on GPUs from several vendors that let one process read data left in GPU local memory by another. They demonstrated recovering fragments of another user’s language model responses. Vendors released fixes, but the lesson is general: **clear accelerator memory between workloads**, and don’t rely on sharing for isolation between tenants or sensitivity levels.

### Designing isolated capacity
- **Dedicated pools** for sensitive or regulated training, kept apart through separate clusters or node pools, with scheduler rules (labels, taints and tolerations) so other workloads can’t land on them.
- **Reserved capacity** for production inference and other critical services; avoid preemptible or spot capacity for anything that must stay up.
- **Hardware partitioning** for multi-tenant serving on shared GPUs, combined with per-tenant caches (Section 2).
- **Confidential GPU computing** on recent data-centre GPUs encrypts CPU–GPU transfers and protects GPU memory, with attestation before keys or data are released (Module 2.5).
- **Hygiene:** reset or scrub GPUs between jobs; keep drivers, firmware and container toolkits patched (vendors publish regular security bulletins); isolate baseboard management controllers on a separate management network.
- **Resilience and sovereignty:** advanced accelerators can be scarce and subject to export controls, so plan multi-region or multi-provider capacity, keep fallback models ready (Module 3.6), and check where capacity is located when data residency matters.` },
    { type: 'callout', kind: 'exam', title: 'Accelerator questions', md: `When tenants or sensitivity levels share GPUs, look for **hardware partitioning** and **memory clearing**, or **dedicated capacity** for the most sensitive and critical work. Time-slicing is about utilisation, not isolation. For critical services, **reserved capacity** beats competing for on-demand GPUs.` },
    { type: 'check', q: { q: 'A platform team wants three internal tenants with different data sensitivity to share one multi-GPU server. Which approach BEST balances isolation and utilisation?', o: ['Time-slice every GPU across all three tenants, which gives the best overall utilisation of the server', 'Hardware-isolated GPU partitions per tenant, memory clearing, and dedicated GPUs where needed', 'Let the tenants schedule their own jobs, and rely on them to agree among themselves', 'Run all three tenants’ jobs inside one shared container, so management stays simple'], a: 1, b: 4,
      why: 'Hardware partitions give each tenant separate memory and compute, memory clearing prevents leftover data, and dedicated GPUs remain available where sensitivity demands them. Time-slicing shares memory, self-scheduling isn’t a control, and a shared container provides no isolation.' } }
  ]
};
