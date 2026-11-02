/* 3.6 · Section 1: model confidentiality (weights, algorithms, IP) */
module.exports = {
  title: 'Model confidentiality: weights, algorithms and IP', covers: [1],
  blocks: [
    { type: 'video', title: 'Your model is the asset', kicker: 'Module 3.6 · Video 1 of 5', scenes: [
      { t: 'title', kicker: 'Module 3.6 · Model CIA', title: 'Your model is the asset', sub: 'Protecting weights, algorithms and intellectual property', icon: 'lock',
        say: 'A trained model concentrates months of compute, proprietary data and hard-won expertise into a set of files. Anyone who copies those files has the model. | This video covers model confidentiality: protecting the weights, the methods and prompts around them, and the intellectual property they represent.' },
      { t: 'bullets', title: 'What needs protecting', layout: 'grid', cols: 2, items: [
          { icon: 'model', h: 'Model weights', d: 'The trained parameters themselves', k: 'model' },
          { icon: 'code', h: 'Architecture and recipes', d: 'Code, hyperparameters, methods', k: 'neutral' },
          { icon: 'database', h: 'Training data pipelines', d: 'Curation is hard to replicate', k: 'data' },
          { icon: 'layers', h: 'Fine-tunes and adapters', d: 'Small files, high value', k: 'human' },
          { icon: 'text', h: 'System prompts and config', d: 'Assume they can leak', k: 'threat' },
          { icon: 'search', h: 'Evaluations and findings', d: 'Red-team results guide attackers', k: 'control' } ],
        say: 'Model intellectual property is more than one file. | The weights: the trained parameters themselves, and the most valuable target. | The architecture, training code, hyperparameters and methods. | The data pipelines and curation choices behind the training data, which are often the hardest part to replicate. | Fine-tuned versions and adapters, which are small files that carry a lot of value. | System prompts and configuration, which should be protected, but designed on the assumption that they can leak. | And evaluation suites and red-team findings, which would give an attacker a map of the model’s weaknesses.' },
      { t: 'shield', title: 'Layered protection for model weights', target: 'Model weights', targetIcon: 'model',
        layers: ['Classification and need to know', 'Least privilege, JIT and two-person export', 'Encryption with keys in an HSM', 'Isolated networks, egress monitoring'],
        attacks: [{ t: 'Over-broad sharing', stop: 0 }, { t: 'Rogue download', stop: 1 }, { t: 'Stolen backup', stop: 2 }, { t: 'Bulk exfiltration', stop: 3 }],
        say: 'Protecting weights takes layers, because the threats are varied. | Classification as highly restricted, with access on a need-to-know basis, stops weights being shared too widely in the first place. | Least privilege, just-in-time access, and a two-person rule for exporting weights stop a single rogue or compromised account from downloading them. | Encryption at rest, with keys held in a hardware security module, makes a stolen backup or disk useless. | And isolated training and serving networks, with egress monitoring, catch large transfers of model files leaving the environment.' },
      { t: 'compare', title: 'Closed and open weights', labels: ['Who holds them', 'Main risk', 'Key controls', 'Misuse safeguards'],
        cols: [{ h: 'Closed weights', icon: 'lock', k: 'control' }, { h: 'Open weights', icon: 'unlock', k: 'human' }],
        rows: [
          ['Only the developer', 'Anyone who downloads them'],
          ['Theft, insiders, extraction', 'Misuse once released'],
          ['Access, encryption, monitoring', 'Licence terms, release reviews'],
          ['Enforced on the server', 'Can be fine-tuned away'] ],
        say: 'Confidentiality depends on how a model is released. | Closed weights stay with the developer. Open weights can be downloaded by anyone. | For closed weights, the main risks are theft, insiders and extraction through the API. For open weights, confidentiality is given up by design, and the risk shifts to misuse. | Closed weights rely on access control, encryption and monitoring. Open releases rely on licence terms and careful review before release. | And safeguards on a closed model are enforced on the server, while those built into open weights can be removed by fine-tuning. Once released, weights can’t be recalled.' },
      { t: 'bullets', title: 'Models outside your walls', items: [
          { icon: 'phone', h: 'On-device models', d: 'Can be pulled from the app', k: 'threat' },
          { icon: 'cloud', h: 'Third-party clouds', d: 'Confidential computing, attestation', k: 'data' },
          { icon: 'users', h: 'Partners and researchers', d: 'Offer access, not copies', k: 'human' },
          { icon: 'chip', h: 'Shared accelerators', d: 'Isolate tenants; clear memory', k: 'model' } ],
        say: 'Models increasingly run outside environments you fully control. | Models shipped inside mobile or desktop apps can be extracted by anyone with the device. Encrypt them with hardware-backed keys and accept some residual risk, but don’t ship your most valuable models this way. | In third-party clouds, confidential computing with remote attestation can protect weights while they are in use. | For partners and researchers, offer controlled access through an API or secure environment rather than handing over copies. | And on shared accelerators, isolate tenants and make sure memory is cleared between workloads.' },
      { t: 'summary', items: ['Protect weights, methods, data pipelines, adapters, prompts and evaluations', 'Layer classification, access control, encryption and monitoring', 'Open release gives up confidentiality for good', 'Give access rather than copies; protect models in use'],
        say: 'To recap. | Model IP includes weights, methods, data pipelines, adapters, prompts and evaluation results. | Protect weights in layers: classification, least privilege, encryption and egress monitoring. | Releasing weights openly gives up confidentiality for good. | And where you can, give partners access rather than copies, and protect models while they are in use.' } ] },
    { type: 'text', md: `### What model IP includes
| Asset | Why it matters |
|---|---|
| **Weights** | The trained model itself; with the weights and the architecture, anyone can run it |
| **Architecture, code and training recipes** | Hyperparameters, data mixtures and methods represent research investment |
| **Training data and curation pipelines** | Often the real competitive advantage, and may contain personal or licensed data |
| **Fine-tunes and adapters** | Small files (such as LoRA adapters) that encode valuable domain knowledge |
| **System prompts and configuration** | Product behaviour and guardrail settings; OWASP lists system prompt leakage as LLM07:2025, so never put secrets in them |
| **Evaluation suites and red-team findings** | Reveal weaknesses and how to exploit them |

**Legal angle:** model weights and methods are often protected as **trade secrets**, and trade secret protection generally requires *reasonable measures* to keep the information secret. Access controls, NDAs and need-to-know practices therefore protect the legal position as well as the asset. Code is protected by copyright; the legal status of weights themselves is less settled.

### Threats to model confidentiality
- **External theft:** intrusion into training clusters, registries, storage or MLOps tooling, or compromise of a supplier.
- **Insiders:** employees, contractors and departing staff with access to weights or recipes.
- **Misconfiguration:** publicly readable buckets, open model servers and leaked tokens.
- **Extraction through the API:** copying functionality through queries (Section 2).
- **Over-broad distribution:** in March 2023, Meta’s LLaMA weights, shared with approved researchers, appeared on a public forum within about a week. Every copy you hand out is a copy you no longer control.
- **Side channels and shared hardware:** weak tenant isolation on shared accelerators and memory not cleared between workloads.
- **On-device extraction:** reverse-engineering models shipped in apps.

### Controls
- **Inventory and classify** models, adapters and checkpoints; treat frontier or high-value weights as the most sensitive data you hold.
- **Access control:** least privilege, just-in-time access, phishing-resistant MFA, a **two-person rule** for exporting weights, and separate roles for training and serving.
- **Encryption** at rest and in transit, with customer-managed keys in HSMs, and envelope encryption for large checkpoints (Module 3.4).
- **Confidential computing** for training or inference on infrastructure you don’t control: trusted execution environments, including GPU confidential computing modes, with remote attestation before keys are released.
- **Network isolation:** no direct internet egress from training clusters, allow-listed destinations, and segmented model storage.
- **Monitoring:** alert on bulk downloads, unusual access to model stores, and large outbound transfers, including DLP rules for model file types and sizes.
- **Secure deletion** of superseded checkpoints and temporary copies (Module 3.4).
- **People and contracts:** NDAs, IP assignment, offboarding that revokes access promptly, and supplier security requirements.

The RAND Corporation’s 2024 report *Securing AI Model Weights* identified 38 distinct attack vectors and proposed five security levels, from protection against opportunistic attackers up to well-resourced nation states. Most organisations won’t need the highest levels, but the principle carries over: **protection should scale with the model’s value and its potential for misuse**.` },
    { type: 'callout', kind: 'exam', title: 'Access, not copies', md: `When a scenario involves sharing a valuable model with partners, researchers or customers, the strongest answer usually **provides access without handing over the weights**: a controlled API, a hosted secure environment or confidential computing. NDAs and watermarks help with deterrence and evidence, but they don’t prevent a copy from leaking.` },
    { type: 'check', q: { q: 'A company plans to give 20 research partners copies of its proprietary model weights, under NDA, so they can evaluate the model. What is the BEST way to keep the weights confidential?', o: ['Rely on the NDA, which gives the company legal recourse if any partner leaks the weights', 'Give partners controlled access through an API or a secure environment, instead of copies', 'Encrypt each copy with a password, and send the password to partners in a separate email', 'Watermark each copy before sending it, so that any leak can be traced back to one partner'], a: 1, b: 1,
      why: 'Not distributing the weights removes the risk of copies leaking. NDAs and watermarks deter and help prove a leak afterwards, and a password shared with each partner protects nothing once the copy is decrypted.' } }
  ]
};
