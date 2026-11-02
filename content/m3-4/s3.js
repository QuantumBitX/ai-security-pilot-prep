/* 3.4 · Section 3: encryption for data states */
module.exports = {
  title: 'Encryption at rest, in transit and in use', covers: [3],
  blocks: [
    { type: 'video', title: 'Encrypt at rest, in transit and in use', kicker: 'Module 3.4 · Video 3 of 6', scenes: [
      { t: 'title', kicker: 'Module 3.4 · Data protection', title: 'Encrypt at rest, in transit and in use', sub: 'Protecting AI data and models in every state', icon: 'lock',
        say: 'Encryption protects data in three states: at rest, in transit, and in use. AI systems stress all three, with huge datasets, valuable model weights and data flowing between GPUs. | This video covers the options for each state, and what each one does and doesn’t protect.' },
      { t: 'compare', title: 'Three states, three toolsets', labels: ['Protects against', 'Main tools', 'AI examples'],
        cols: [{ h: 'At rest', icon: 'database', k: 'data' }, { h: 'In transit', icon: 'network', k: 'model' }, { h: 'In use', icon: 'chip', k: 'control' }],
        rows: [
          ['Stolen disks, backups, buckets', 'Interception and tampering', 'Host, operator and memory access'],
          ['Disk, database, file and field encryption', 'TLS 1.3 and mutual TLS', 'TEEs, homomorphic encryption, MPC'],
          ['Datasets, checkpoints, vector stores', 'API calls and cluster traffic', 'Inference on confidential data'] ],
        say: 'Each state needs its own tools. | Encryption at rest protects against stolen disks, backups or exposed buckets. In transit, it protects against interception and tampering. In use, it protects data while it is being processed, against the host, the operator and memory access. | At rest, use disk, database, file and field-level encryption. In transit, use TLS one point three, and mutual TLS between services. In use, use trusted execution environments, or specialised techniques such as homomorphic encryption and secure multi-party computation. | For AI, that means encrypting datasets, model checkpoints and vector stores; protecting API calls and traffic between cluster nodes; and processing confidential data inside attested enclaves.' },
      { t: 'flow', title: 'Envelope encryption for a model checkpoint',
        nodes: [
          { id: 'ckpt', x: 230, y: 330, icon: 'model', label: 'Model checkpoint', k: 'model', w: 280 },
          { id: 'dek', x: 640, y: 330, icon: 'key', label: 'Data key (DEK)', sub: 'unique to this file', k: 'human', w: 280 },
          { id: 'enc', x: 1060, y: 330, icon: 'lock', label: 'Encrypted checkpoint', sub: 'stored with wrapped DEK', k: 'data', w: 320 },
          { id: 'kek', x: 640, y: 690, icon: 'shield', label: 'Key-encryption key', sub: 'never leaves KMS or HSM', k: 'control', w: 320 },
          { id: 'use', x: 1060, y: 690, icon: 'gpu', label: 'Serving system', sub: 'asks KMS to unwrap; logged', k: 'neutral', w: 320 } ],
        edges: [{ from: 'ckpt', to: 'dek', k: 'model' }, { from: 'dek', to: 'enc', k: 'human' }, { from: 'kek', to: 'dek', k: 'control' }, { from: 'use', to: 'kek', k: 'neutral' }],
        steps: [
          { show: 'ckpt', hi: 'ckpt' },
          { show: 'dek ckpt-dek', flow: 'ckpt-dek', hi: 'dek' },
          { show: 'enc dek-enc', flow: 'dek-enc', hi: 'enc', mark: { enc: 'lock' } },
          { show: 'kek kek-dek', flow: 'kek-dek', hi: 'kek' },
          { show: 'use use-kek', flow: 'use-kek', hi: 'use' } ],
        say: 'Large AI artefacts use envelope encryption. Start with a model checkpoint to protect. | A unique data encryption key encrypts the checkpoint locally, which is fast even for very large files. | The encrypted checkpoint is stored together with a wrapped copy of its data key. | The data key is wrapped by a key-encryption key that never leaves the key management service or hardware security module. | To load the model, the serving system asks the key service to unwrap the data key. Policy decides whether it may, and every use is logged. Revoke that access, or destroy the key, and the checkpoint becomes unreadable.' },
      { t: 'bullets', title: 'AI-specific encryption gaps', items: [
          { icon: 'gpu', h: 'GPU interconnects', d: 'High-speed fabrics are often unencrypted', k: 'threat' },
          { icon: 'vector', h: 'Vector search', d: 'Embeddings decrypted in memory to search', k: 'data' },
          { icon: 'memory', h: 'Caches and memory', d: 'Prompt caches, KV caches, swap', k: 'model' },
          { icon: 'list', h: 'Logs and telemetry', d: 'Plaintext prompts, keys too widely held', k: 'human' },
          { icon: 'clock', h: 'Long-lived secrets', d: 'Harvest now, decrypt later', k: 'neutral' } ],
        say: 'AI systems have encryption gaps worth checking. | GPU interconnects: high-speed fabrics between accelerators are often unencrypted for performance, so isolate them physically and logically. | Vector search: embeddings are usually decrypted in memory to be searched, so protect the hosts and access paths of the vector store. | Caches and memory: prompt caches, attention caches and swap space can hold sensitive data in plaintext. | Logs and telemetry: prompts and outputs often land in logs unencrypted, or encrypted with keys that too many people hold. | And long-lived secrets: training data and model weights that must stay confidential for years are exposed to adversaries who harvest encrypted data now, hoping to decrypt it later with quantum computers.' },
      { t: 'compare', title: 'Options for data in use', labels: ['How it works', 'Maturity for AI', 'Trade-off'],
        cols: [{ h: 'TEEs', icon: 'chip', k: 'control' }, { h: 'Homomorphic', icon: 'lock', k: 'model' }, { h: 'Multi-party (MPC)', icon: 'users', k: 'data' }],
        rows: [
          ['Attested hardware enclave', 'Compute on encrypted data', 'Joint compute on secret shares'],
          ['In production, including GPUs', 'Small models, simple operations', 'Specific tasks and collaborations'],
          ['Trust in hardware vendor', 'Very large overhead', 'Heavy communication'] ],
        say: 'For data in use, there are three options. | Trusted execution environments isolate processing in attested hardware enclaves. Homomorphic encryption lets you compute directly on encrypted data. Secure multi-party computation lets several parties compute a result on secret-shared data, without revealing their inputs. | TEEs are in production today, including on GPUs. Homomorphic encryption works for small models and simple operations. Multi-party computation suits specific tasks and collaborations between organisations. | The trade-offs: TEEs require trust in the hardware vendor, and prompt patching of firmware flaws; homomorphic encryption carries very large computational overhead; and multi-party computation adds heavy communication between the parties.' },
      { t: 'summary', items: ['At rest, in transit, in use: each state needs its own controls', 'Envelope encryption: data keys protected by KMS-held master keys', 'Check AI gaps: interconnects, vector search, caches, logs', 'Plan for crypto-agility and post-quantum migration'],
        say: 'To recap. | Data at rest, in transit and in use each need their own controls. | Envelope encryption protects large artefacts with data keys, which are in turn protected by master keys held in a key service. | Check the AI-specific gaps: interconnects, vector search, caches and logs. | And plan for crypto-agility and the move to post-quantum cryptography, for data that must stay secret for years.' } ] },
    { type: 'text', md: `### Encryption at rest
| Layer | Protects against | Doesn’t protect against |
|---|---|---|
| **Full-disk or volume** | Theft or loss of physical media | Anyone with access to the running system |
| **Database (transparent data encryption)** | Theft of database files and backups | Database users and administrators |
| **File or object level** | Exposure of storage buckets and copies | Services and users granted decrypt rights |
| **Application or field level** | Administrators, operators and many breaches | The application itself, if compromised |

Use **envelope encryption** (data keys protected by key-encryption keys held in a KMS or HSM), encrypt **backups and snapshots**, and cover AI-specific stores: datasets, checkpoints and model weights, feature stores, vector databases and logs. Field-level encryption with per-subject keys also enables **crypto-shredding** for erasure (Module 2.4).

### Encryption in transit
Use **TLS 1.2 as a minimum and TLS 1.3 by preference**, with **mutual TLS** between services such as gateways, model servers, vector databases and tool endpoints. Use private connectivity to AI providers where available. Inside clusters, encrypt service traffic where feasible; for GPU interconnects that can’t be encrypted without unacceptable performance loss, rely on **physical and logical isolation** (dedicated hardware, segmented networks, restricted management planes).

### Encryption in use
- **Trusted execution environments**, on CPUs and, increasingly, GPUs, with remote attestation before keys are released (Module 2.5).
- **Homomorphic encryption**, which allows computation on encrypted data, but with overheads that limit it to small models and simple operations today.
- **Secure multi-party computation**, for joint analysis or training across organisations without sharing raw inputs.

### What encryption doesn’t do
Encryption doesn’t stop **authorised misuse**, prompt injection or poisoning, and encrypted personal data is still personal data. Its strength depends entirely on **who can use the keys** (Section 4).

### Crypto-agility and post-quantum cryptography
Training data, model weights and regulated records may need confidentiality for many years, which makes them targets for **harvest now, decrypt later**. NIST published its first post-quantum standards in 2024: **FIPS 203 (ML-KEM)** for key establishment, and **FIPS 204 (ML-DSA)** and **FIPS 205 (SLH-DSA)** for signatures. Its draft transition guidance (NIST IR 8547) proposes deprecating today’s widely used public-key algorithms at the 112-bit security level by 2030 and disallowing quantum-vulnerable algorithms by 2035. Build a cryptographic inventory, prefer AES-256 for long-lived data, and design for crypto-agility so algorithms can be swapped.` },
    { type: 'callout', kind: 'exam', title: 'Match the control to the threat', md: `- Stolen drives or backups → **encryption at rest**.
- Interception between services → **TLS / mTLS**.
- A curious or compromised **host or cloud operator** during processing → **confidential computing (TEEs)** with attestation.
- **Database administrators** seeing sensitive fields → **application or field-level encryption**, not disk encryption.` },
    { type: 'check', q: { q: 'A team encrypts its vector database’s disks and says the embeddings are now protected from the database administrators. What is the BEST response?', o: ['Agree, because disk encryption protects data from everyone who doesn’t hold the physical drives', 'Disk encryption mainly stops media theft; admins see decrypted data, so add access and field-level controls', 'Agree, provided the disks use 256-bit keys rather than 128-bit keys, which no administrator could ever break', 'Disagree, because embeddings can’t be encrypted at all without destroying their ability to be searched'], a: 1, b: 3,
      why: 'Disk encryption is transparent to anyone using the running system, including administrators. Protecting data from privileged users needs access controls and application- or field-level encryption, with keys they don’t hold.' } }
  ]
};
