/* 1.1 · Section 5: AI hardware infrastructure */
module.exports = {
  title: 'AI hardware: GPUs, TPUs and memory', covers: [5],
  blocks: [
    { type: 'video', title: 'The hardware under the model', kicker: 'Module 1.1 · Video 5 of 7', scenes: [
      { t: 'title', kicker: 'Module 1.1 · AI concepts', title: 'The hardware under the model', sub: 'Processors, memory, and why they matter to security', icon: 'gpu',
        say: 'Every model runs on physical hardware, and that hardware shapes cost, performance and risk. | This video covers the processors, the memory arithmetic, and the infrastructure stack you will be expected to secure.' },
      { t: 'compare', title: 'Three kinds of processor', cols: [{ h: 'CPU', icon: 'chip', k: 'neutral' }, { h: 'GPU', icon: 'gpu', k: 'model' }, { h: 'TPU', icon: 'tpu', k: 'data' }],
        labels: ['Design', 'Best at', 'Where you meet it'], size: 29, rows: [
          ['A few powerful, general-purpose cores', 'Thousands of simpler cores working in parallel', 'A custom chip built for tensor arithmetic'],
          ['Logic, orchestration, small models', 'Training and serving most models', 'Large-scale training and serving'],
          ['Every server, laptop and phone', 'Data-centre accelerators and workstations', 'Google Cloud'] ],
        say: 'Three kinds of processor matter. | A CPU has a few powerful cores designed for general-purpose work. A GPU has thousands of simpler cores that work in parallel. A TPU is a custom chip designed by Google specifically for tensor arithmetic. | Neural networks are mostly huge matrix multiplications, which is exactly the work that GPUs and TPUs parallelise. CPUs still handle logic, orchestration and small models. | You meet CPUs everywhere, GPUs in data centres and workstations, and TPUs in Google’s cloud.' },
      { t: 'stat', kicker: 'The memory arithmetic', num: { v: 14, suf: ' GB', label: 'just to hold a 7-billion-parameter model at 16-bit precision' },
        def: 'Weights ≈ parameters × bytes per parameter: 7 billion × 2 bytes ≈ 14 GB, before any working memory.',
        ex: 'At 4-bit quantisation the same weights need about 3.5 GB, usually with some loss of accuracy.',
        say: 'Memory is usually the binding constraint, and the arithmetic is simple. | A model’s weights take roughly its number of parameters, multiplied by the bytes used to store each one. Seven billion parameters at sixteen-bit precision, which is two bytes each, is about fourteen gigabytes, before any working memory. | Quantisation stores weights with fewer bits. At four bits, the same model needs about three and a half gigabytes, usually at some cost in accuracy.' },
      { t: 'chart', title: 'A 70-billion-parameter model: weights alone', kind: 'bar', x: ['32-bit', '16-bit', '8-bit', '4-bit'], yMin: 0, yMax: 300, ticks: 3, unit: ' GB',
        series: [{ v: [280, 140, 70, 35], k: 'model' }],
        annot: [{ y: 80, text: '80 GB: a typical accelerator', k: 'human' }],
        notes: [null, { h: '280 GB at 32-bit', d: 'Full precision: four bytes for every parameter.' }, { h: 'Split or shrink', d: 'Larger models are spread across several accelerators, or quantised to fit.', k: 'human' }, { h: 'Training needs more', d: 'Gradients and optimiser state multiply memory several times over.' }],
        steps: [{}, { s: [0] }, { a: [0] }, {}],
        say: 'Scale that up to a seventy-billion-parameter model and the numbers grow fast. | At full thirty-two-bit precision the weights alone need around two hundred and eighty gigabytes. At sixteen-bit, a hundred and forty. | Many data-centre accelerators carry around eighty gigabytes of memory, so large models are split across several devices, or compressed through quantisation. | Training needs several times more memory than serving, because it also stores gradients and optimiser state.' },
      { t: 'layers', title: 'The AI infrastructure stack',
        layers: [
          { icon: 'model', label: 'Models and applications', sub: 'weights, prompts, APIs', k: 'model' },
          { icon: 'code', label: 'Frameworks and libraries', sub: 'PyTorch, inference servers, dependencies', k: 'neutral' },
          { icon: 'gear', label: 'Drivers, firmware and runtimes', sub: 'the code between software and silicon', k: 'neutral' },
          { icon: 'gpu', label: 'Accelerators and memory', sub: 'GPUs, TPUs, high-bandwidth memory', k: 'data' },
          { icon: 'server', label: 'Servers, network and storage', sub: 'clusters, interconnects, checkpoints', k: 'neutral' },
          { icon: 'building', label: 'Data centre', sub: 'power, cooling, physical access', k: 'human' } ],
        ann: [
          { h: 'Models and applications', threats: ['Weights copied or stolen'], controls: ['Encrypt weights; restrict and log access'] },
          { h: 'Frameworks and libraries', threats: ['Vulnerable or malicious dependencies'], controls: ['Pin, scan and verify dependencies'] },
          { h: 'Drivers and firmware', threats: ['Unpatched driver and firmware flaws'], controls: ['Patch promptly; verify firmware integrity'] },
          { h: 'Accelerators and memory', threats: ['Data left behind in shared GPU memory'], controls: ['Isolate tenants; clear memory between jobs'] },
          { h: 'Servers, network, storage', threats: ['Exposed storage holding checkpoints'], controls: ['Encrypt at rest; segment the network'] },
          { h: 'Data centre', threats: ['Power, cooling or physical failure'], controls: ['Redundancy, monitoring and access control'] } ],
        intro: 'Each layer has its own threats and controls, and a weakness anywhere undermines the layers above it.',
        say: 'Security has to cover the whole stack, from the model down to the building. | At the top, model weights are valuable intellectual property. They can be copied or stolen, so they are encrypted, and access to them is restricted and logged. | Frameworks and libraries bring large dependency trees, which can contain vulnerable or even malicious code. Pin, scan and verify them. | Drivers, firmware and runtimes sit between software and silicon, and their flaws need prompt patching. | On shared accelerators, data left behind in memory by one job could be read by the next, so tenants are isolated and memory is cleared between jobs. | Servers and storage hold training data and checkpoints, which need encryption at rest and network segmentation. | And the data centre itself needs resilient power and cooling, and physical access control, because AI hardware is dense, hot and power-hungry.' },
      { t: 'bullets', title: 'Hardware realities that shape risk', layout: 'grid', cols: 2, items: [
          { icon: 'money', h: 'Scarce and expensive', d: 'Compute is costly, so abuse quickly becomes a budget problem' },
          { icon: 'bolt', h: 'Resource exhaustion', d: 'Floods of heavy requests can exhaust capacity or spend' },
          { icon: 'lock', h: 'Confidential computing', d: 'Newer CPUs and GPUs can run work in hardware-protected enclaves' },
          { icon: 'phone', h: 'AI at the edge', d: 'Neural processing units run models on phones and laptops' } ],
        say: 'A few hardware realities shape risk. | Compute is scarce and expensive, so misuse quickly becomes a budget problem, not just a performance one. | Floods of heavy requests can exhaust capacity or spend, which makes rate limits and quotas essential. | Confidential computing lets newer CPUs and GPUs process data inside hardware-protected enclaves, even in someone else’s cloud. | And neural processing units now run models directly on phones and laptops, moving AI, and its data, out to the edge.' },
      { t: 'summary', items: [
          'GPUs and TPUs parallelise the matrix arithmetic neural networks need',
          'Weights ≈ parameters × bytes each; quantisation trades accuracy for memory',
          'Secure the full stack: weights, dependencies, firmware, memory, storage, facility',
          'Compute scarcity turns abuse into cost and availability problems' ],
        say: 'To recap. | GPUs and TPUs parallelise the matrix arithmetic that neural networks need. | Weight memory is roughly parameters times bytes each, and quantisation trades accuracy for memory. | Security covers the full stack, from weights and dependencies down to firmware, memory, storage and the facility. | And because compute is scarce, abuse becomes a cost and availability problem.' }
    ] },
    { type: 'text', md: `### Processors for AI

- **CPUs (central processing units)** have a handful of powerful cores optimised for sequential, branching logic. They run the operating system, data preparation, orchestration and classical machine-learning models, and can serve small neural networks.
- **GPUs (graphics processing units)** contain thousands of simpler cores designed to do the same operation on many numbers at once. Neural-network training and inference are dominated by matrix multiplication, which GPUs parallelise extremely well. A mature software ecosystem (NVIDIA’s CUDA is the best known) made GPUs the default AI accelerator.
- **TPUs (tensor processing units)** are application-specific integrated circuits (ASICs) that Google designed for neural-network workloads. They use large *systolic arrays* to stream matrix operations efficiently and are connected into "pods" for very large training runs. They are available through Google Cloud.
- **NPUs (neural processing units)** are low-power accelerators built into phones, laptops and edge devices for on-device inference.
- **FPGAs** (field-programmable gate arrays) can be reconfigured for specific low-latency workloads, and cloud providers also build their own **custom ASICs** for training and inference.

### Memory: the real constraint

Model weights must sit in fast memory close to the processor. Accelerators use **high-bandwidth memory (HBM)**, often called VRAM on graphics cards. Two numbers matter: **capacity**, which decides whether a model fits, and **bandwidth**, which decides how fast it runs, because generating each token means reading the weights from memory. Inference on large models is frequently *memory-bound* rather than compute-bound.

A useful rule of thumb is **weight memory ≈ parameters × bytes per parameter**:

- 32-bit floating point (FP32): 4 bytes per parameter
- 16-bit (FP16 or BF16): 2 bytes
- 8-bit integer (INT8): 1 byte
- 4-bit (INT4): half a byte

So a 7-billion-parameter model needs about 28 GB at FP32, 14 GB at FP16 and 3.5 GB at INT4, *before* working memory. Serving also needs a **key-value (KV) cache** that grows with the length of the context and the number of simultaneous users. Training needs several times more again, for gradients, optimiser state and activations. **Quantisation** reduces precision to save memory and speed up inference, with some loss of accuracy.

Models too large for one device are split across several, using fast interconnects between GPUs and high-speed networks between servers.` },
    { type: 'flip', title: 'Hardware terms', cards: [
      ['GPU', 'A massively parallel processor; the default accelerator for training and serving neural networks.'],
      ['TPU', 'Google’s custom ASIC for tensor arithmetic, offered through Google Cloud.'],
      ['NPU', 'A low-power neural accelerator built into phones, laptops and edge devices.'],
      ['HBM', 'High-bandwidth memory stacked beside an accelerator; its capacity limits model size and its bandwidth limits speed.'],
      ['Quantisation', 'Storing weights at lower precision, such as 8 or 4 bits, to save memory at some cost in accuracy.'],
      ['KV cache', 'Working memory that stores attention keys and values during generation; it grows with context length and concurrent users.'] ] },
    { type: 'text', md: `### Why hardware matters to security

**Isolation on shared accelerators.** Cloud GPUs are often shared between workloads or tenants. If memory isn’t cleared or isolated, one workload may read data left by another. In January 2024, researchers disclosed *LeftoverLocals* (CVE-2023-4969), which showed that GPUs from several vendors could leak data from their local memory between processes, including fragments of another user’s LLM session. Controls include dedicated or hardware-partitioned GPUs (NVIDIA’s Multi-Instance GPU, for example, splits one GPU into isolated instances), memory scrubbing between jobs, and timely driver updates.

**Drivers, firmware and runtimes.** Accelerator drivers and firmware run with high privilege and regularly receive security fixes. They belong in your patch and configuration management, and firmware integrity should be verified.

**Model weights as crown jewels.** A trained model can represent millions in compute and proprietary data. Weights sit in storage, in memory and in transit between servers. Encrypt them at rest and in transit, restrict who and what can load them, and log access. Module 3.6 covers model confidentiality.

**Confidential computing.** Trusted execution environments on CPUs, and confidential-computing modes on recent data-centre GPUs, keep data and models encrypted even while they are being processed, and can prove to a remote party what code is running (*attestation*). They matter when using third-party clouds for sensitive AI workloads, covered in Module 2.5.

**Availability and cost.** Accelerator capacity is finite and expensive. Heavy or abusive request patterns can exhaust capacity, slow service for everyone, or run up large bills, sometimes called *denial of wallet*. Rate limiting, quotas and compute throttling (Modules 4.2 and 3.6) protect against this.

**Physical and environmental security.** AI racks draw far more power and generate far more heat than typical servers, which raises the stakes for power redundancy, cooling and fire suppression, and for media sanitisation when high-density storage is retired. Modules 4.2 and 3.4 return to these.` },
    { type: 'callout', kind: 'exam', title: 'Hardware questions are usually about trade-offs', md: `Expect questions that ask you to reason about consequences rather than recite specifications: why a model won’t fit on one device, why shared accelerators need isolation, or why quantisation might be chosen despite reduced accuracy. If you can do the parameters × bytes calculation and explain the isolation risk, you are well prepared.` },
    { type: 'scenario', title: 'Sizing and safeguarding', md: `Your organisation plans to self-host a 13-billion-parameter model for an internal assistant. The infrastructure team proposes running it at 16-bit precision on shared cloud GPUs that other business units also use.`,
      q: { q: 'Which consideration should you raise FIRST from a security perspective?', o: ['Whether the model’s weights will fit in GPU memory at 16-bit precision with room to spare', 'How workloads on the shared GPUs are isolated, and whether memory is cleared between them', 'Whether a TPU would be faster and cheaper than a GPU for this particular workload', 'Whether the model could be quantised to 4-bit to reduce cost without losing accuracy'], a: 1, b: 5,
        why: 'Memory fit (about 26 GB at 16-bit) and cost are engineering questions. Sharing accelerators with other workloads raises a confidentiality risk, so isolation and memory clearing are the security concern to raise first.' } }
  ]
};
