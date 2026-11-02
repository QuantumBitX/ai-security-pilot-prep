/* 2.5 · Section 3: data centre security considerations, TEEs and confidential computing */
module.exports = {
  title: 'Data centre security, TEEs and confidential computing', covers: [5],
  blocks: [
    { type: 'video', title: 'Protecting data in use', kicker: 'Module 2.5 · Video 3 of 3', scenes: [
      { t: 'title', kicker: 'Module 2.5 · AI supply chain', title: 'Protecting data in use', sub: 'Data centre considerations, trusted execution environments and confidential computing', icon: 'chip',
        say: 'When your AI runs in someone else’s data centre, you are trusting their buildings, their staff, their hardware and their software. | This video covers what to check about the data centres behind AI services, and how confidential computing can protect data and models even from the infrastructure operator.' },
      { t: 'bullets', title: 'Data centre questions for AI providers', layout: 'grid', cols: 2, items: [
          { icon: 'globe', h: 'Location and sovereignty', d: 'Which countries, which laws, which regions you can pin', k: 'data' },
          { icon: 'audit', h: 'Certification and audits', d: 'Scope covers the AI platform and its facilities', k: 'control' },
          { icon: 'bolt', h: 'Power, cooling, resilience', d: 'High-density GPU racks; redundancy; recovery', k: 'human' },
          { icon: 'box', h: 'Tenancy and isolation', d: 'Shared GPUs and memory between customers', k: 'model' },
          { icon: 'chip', h: 'Hardware supply chain', d: 'Firmware integrity, patching, trusted suppliers', k: 'threat' },
          { icon: 'key', h: 'Key control', d: 'Customer-managed keys, HSMs, who can decrypt', k: 'neutral' } ],
        say: 'Ask six questions about the data centres behind an AI service. | Location and sovereignty: in which countries is data processed, which laws apply there, and can you pin processing to specific regions? | Certification and audits: does their scope actually cover the AI platform and its facilities? | Power, cooling and resilience: AI accelerators run at very high density, so check redundancy and recovery arrangements. | Tenancy and isolation: are GPUs and their memory shared between customers, and how are they isolated and cleared? | Hardware supply chain: how is firmware integrity verified and patched? | And key control: can you manage your own keys, in hardware security modules, and who can decrypt your data?' },
      { t: 'compare', title: 'Three states of data', labels: ['Typical protection', 'Exposed to'],
        cols: [{ h: 'At rest', icon: 'database', k: 'data' }, { h: 'In transit', icon: 'network', k: 'model' }, { h: 'In use', icon: 'chip', k: 'threat' }],
        rows: [
          ['Disk and database encryption', 'TLS and mutual TLS', 'Trusted execution environments'],
          ['Stolen media, backups', 'Network interception', 'Host OS, hypervisor, operators, memory scraping'] ],
        say: 'Data exists in three states. | At rest, it is protected by disk and database encryption. In transit, by TLS. In use, it has traditionally been decrypted in memory, where only a trusted execution environment can protect it. | Encryption at rest defends against stolen media and backups, and TLS against interception. But while a model processes a prompt, the data and the model weights sit in memory, exposed to the host operating system, the hypervisor, and anyone who controls them, including the cloud operator. Confidential computing closes that gap.' },
      { t: 'flow', title: 'How confidential inference works',
        nodes: [
          { id: 'cli', x: 210, y: 330, icon: 'user', label: 'Client', k: 'human', w: 230 },
          { id: 'att', x: 620, y: 330, icon: 'shieldcheck', label: 'Verify attestation', sub: 'genuine hardware, expected code', k: 'control', w: 320 },
          { id: 'kms', x: 620, y: 690, icon: 'key', label: 'Key broker', sub: 'releases keys only to attested TEEs', k: 'neutral', w: 320 },
          { id: 'tee', x: 1180, y: 510, icon: 'lock', label: 'TEE: CPU and GPU', sub: 'model and prompt decrypted only inside', k: 'model', w: 360 } ],
        edges: [{ from: 'cli', to: 'att', k: 'human' }, { from: 'att', to: 'tee', k: 'control', label: 'trusted' }, { from: 'kms', to: 'tee', k: 'neutral', label: 'keys' }],
        steps: [
          { show: 'cli', hi: 'cli' },
          { show: 'tee att cli-att', flow: 'cli-att', hi: 'att' },
          { show: 'att-tee', flow: 'att-tee', hi: 'tee', mark: { tee: 'lock' } },
          { show: 'kms kms-tee', flow: 'kms-tee', hi: 'kms' },
          { hi: 'tee', note: { x: 1180, y: 760, w: 560, text: 'The operator runs the hardware but can’t read the data or the weights.' } } ],
        say: 'Here is confidential inference in outline. A client wants to send a sensitive prompt to a model running in a cloud. | First it checks an attestation: a signed report, produced by the hardware itself, proving that the workload runs on genuine trusted hardware, with exactly the expected code and configuration. | Only if the attestation checks out does the client send its encrypted request. Inside the trusted execution environment, which can now span both the CPU and the GPU, the prompt and the model are decrypted and processed. | A key broker releases decryption keys, including those for the model weights, only to environments that pass attestation. | So the operator runs the hardware, but can’t read the prompts, the outputs or the weights.' },
      { t: 'bullets', title: 'Trusted execution technologies', layout: 'grid', cols: 2, items: [
          { icon: 'chip', h: 'Process enclaves', d: 'Protect part of an application, such as Intel SGX', k: 'model' },
          { icon: 'server', h: 'Confidential VMs', d: 'Protect a whole virtual machine: Intel TDX, AMD SEV-SNP', k: 'data' },
          { icon: 'layers', h: 'Arm realms', d: 'Arm Confidential Compute Architecture', k: 'neutral' },
          { icon: 'gpu', h: 'Confidential GPUs', d: 'Protected GPU memory and CPU–GPU transfers, on recent data-centre GPUs', k: 'control' } ],
        say: 'Several technologies provide trusted execution. | Process enclaves protect part of an application. Intel SGX is the best-known example. | Confidential virtual machines protect an entire virtual machine from the hypervisor. Intel TDX and AMD SEV-SNP work this way. | Arm’s Confidential Compute Architecture provides protected realms. | And recent data-centre GPUs add confidential computing modes that protect GPU memory and the data moving between the CPU and the GPU, which is what makes confidential AI practical.' },
      { t: 'bullets', title: 'What confidential computing doesn’t fix', items: [
          { icon: 'wave', h: 'Side channels', d: 'Researchers have repeatedly found ways to leak data from TEEs', k: 'threat' },
          { icon: 'building', h: 'Trust in the hardware vendor', d: 'Firmware, attestation keys and patches still matter', k: 'neutral' },
          { icon: 'check', h: 'Attestation must be checked', d: 'An unverified report proves nothing', k: 'control' },
          { icon: 'bug', h: 'Application flaws', d: 'Prompt injection works just as well inside an enclave', k: 'human' } ],
        say: 'Confidential computing is powerful, but it has limits. | Side channels: researchers have repeatedly found ways to leak data from trusted environments, so patching and hardening remain essential. | You still trust the hardware vendor’s firmware, attestation keys and update process. | Attestation must actually be verified against expected values. A report nobody checks proves nothing. | And it doesn’t fix application flaws. A prompt injection attack, or a model that leaks data in its answers, works just as well inside an enclave.' },
      { t: 'summary', items: ['Check location, certification scope, resilience, isolation, firmware, keys', 'Protect data at rest, in transit and in use', 'TEEs plus attestation keep data and weights from the operator', 'Side channels, vendor trust and app flaws remain'],
        say: 'To recap. | When assessing data centres behind AI services, check location, certification scope, resilience, tenant isolation, hardware supply chain and key control. | Protect data in all three states: at rest, in transit and in use. | Trusted execution environments, with verified attestation and attested key release, can keep prompts and model weights hidden even from the operator. | But side channels, trust in the hardware vendor and application-level flaws still need managing.' } ] },
    { type: 'text', md: `### Data centre security considerations for AI
When AI runs in third-party facilities (a hyperscaler, a GPU cloud, a colocation site or a model provider’s own infrastructure), the organisation inherits that facility’s risks. Key considerations:

| Consideration | What to check |
|---|---|
| **Location and sovereignty** | Countries and regions of processing and storage; ability to restrict regions; government access laws; transfer mechanisms for personal data |
| **Certification scope** | ISO/IEC 27001, SOC 2 and sector certifications that explicitly cover the AI platform and the facilities it runs in |
| **Physical and environmental** | Access control, surveillance, power and cooling redundancy (AI racks draw far more power than traditional servers), fire suppression; Module 4.2 covers these in depth |
| **Tenancy and isolation** | Whether accelerators are shared between customers; memory clearing between jobs; isolation of training and inference workloads |
| **Hardware and firmware supply chain** | Trusted sourcing, firmware signing and verification, patch processes for drivers and accelerator firmware |
| **Key management** | Customer-managed keys (BYOK), hold-your-own-key models, hardware security modules, and who can access keys |
| **Resilience** | Capacity guarantees, multi-region failover, recovery objectives for AI services |

### Confidential computing
The Confidential Computing Consortium defines confidential computing as **the protection of data in use by performing computation in a hardware-based, attested trusted execution environment (TEE)**. A TEE isolates code and data in memory so that the host operating system, hypervisor, other tenants and the infrastructure operator can’t read or alter them.

**Remote attestation** is what makes TEEs useful across organisations: the hardware produces a signed measurement of the code and configuration running in the TEE, which a relying party verifies before trusting it with data or keys. A **key broker** (or key release policy) releases secrets, such as model decryption keys or data keys, only to TEEs whose attestation matches an expected policy.

| Technology | Scope |
|---|---|
| Intel SGX | Application enclaves protecting part of a process |
| Intel TDX, AMD SEV-SNP | Confidential virtual machines protecting an entire VM from the hypervisor |
| Arm CCA | “Realms” isolated from the normal and secure worlds |
| Confidential GPU computing | Protected GPU memory and encrypted CPU–GPU transfers on recent data-centre GPUs, so AI workloads can run inside a TEE spanning CPU and GPU |

### AI use cases
- **Protecting model weights** deployed on infrastructure you don’t control, for example a model provider deploying into a customer’s cloud, or an organisation running a proprietary model on a GPU cloud.
- **Protecting prompts and data** from the model provider and cloud operator, for regulated or highly confidential processing. Some providers now offer inference in attested environments with published, verifiable software images.
- **Multi-party collaboration:** training or evaluating on combined datasets from several organisations, where none should see the others’ raw data (often combined with federated learning or data clean rooms).

### Limitations
- **Side-channel attacks** against TEEs have been demonstrated repeatedly; keep firmware and microcode patched and follow vendor guidance.
- **Trust shifts to the hardware vendor** and its attestation infrastructure.
- **Attestation is only as good as its verification:** relying parties must check measurements against expected values and policies, and update them as software changes.
- **Performance overhead** and operational complexity are real, though shrinking.
- **TEEs don’t fix application-layer risks:** prompt injection, insecure output handling, excessive agency and model leakage of training data still need their own controls.`, },
    { type: 'flip', title: 'Confidential computing vocabulary', cards: [
      ['Trusted execution environment (TEE)', 'A hardware-isolated area where code and data are protected from the host, hypervisor and operator.'],
      ['Confidential computing', 'Protecting data in use by computing inside a hardware-based, attested TEE.'],
      ['Remote attestation', 'A hardware-signed proof of what code and configuration run inside a TEE, verified by a relying party.'],
      ['Key broker / key release policy', 'A service that releases secrets only to TEEs whose attestation matches policy.'],
      ['Confidential VM', 'A virtual machine whose memory is encrypted and isolated from the hypervisor (for example, TDX or SEV-SNP).'],
      ['BYOK / HYOK', 'Bring your own key (customer-managed keys in the provider’s KMS) / hold your own key (keys stay outside the provider).'] ] },
    { type: 'scenario', title: 'The proprietary model in a GPU cloud', md: `A firm has trained a proprietary fraud model that is a key competitive asset. It needs to run inference on a third-party GPU cloud for capacity reasons, and worries about the cloud operator or other tenants accessing the weights.`,
      q: { q: 'Which approach BEST protects the model weights while in use?', o: ['Encrypt the weights at rest in object storage, and restrict the storage bucket to the inference service', 'Run inference in confidential VMs with GPU TEEs, releasing the decryption key only after attestation', 'Obfuscate and rename the model files on the provider’s hosts, so they are hard to find and copy', 'Rely on the provider’s non-disclosure agreement and its contractual liability for any misuse of the weights'], a: 1, b: 5,
        why: 'Encryption at rest doesn’t protect weights once loaded into memory. Confidential computing with attested key release keeps weights encrypted outside the TEE and readable only inside verified environments. Contracts help but don’t technically prevent access.' } },
    { type: 'check', q: { q: 'A team proposes moving its LLM application into a TEE to stop prompt injection attacks. What is the BEST response?', o: ['Agree; TEEs isolate the application, so injected instructions can’t reach the model at runtime', 'Explain that TEEs protect against the host and operator, not application-layer attacks like prompt injection', 'Agree, provided remote attestation is enabled so only verified prompts can enter the enclave', 'Disagree, because TEEs can’t run AI workloads on GPUs, so the application would have to move to CPU-only servers'], a: 1, b: 5,
      why: 'Confidential computing addresses infrastructure-level threats to data in use. Prompt injection exploits the application’s logic and works the same way inside a TEE.' } }
  ]
};
