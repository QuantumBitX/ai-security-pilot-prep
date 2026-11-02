/* F · Section 3: high-yield review of Domains 3 and 4 */
module.exports = {
  title: 'Domains 3 and 4: high-yield review', covers: [],
  blocks: [
    { type: 'video', title: 'Data, models and architecture, revisited', kicker: 'Final review · Video 3 of 4', scenes: [
      { t: 'title', kicker: 'Final review', title: 'Data, models and architecture, revisited', sub: 'High-yield review of Domains 3 and 4', icon: 'database',
        say: 'Domain three, data management, privacy and model security, is nineteen per cent of the exam. Domain four, secure architecture, engineering and identity, is eighteen per cent. Together they are more than a third of your score. | This video revisits the ideas from both domains that questions return to most often.' },
      { t: 'bullets', title: 'Domain 3: data and model security', layout: 'grid', cols: 2, items: [
          { icon: 'branch', h: 'Governance and lineage', d: 'Owners, classification, provenance', k: 'data' },
          { icon: 'mask', h: 'Privacy controls', d: 'Minimise, mask, anonymise, DP', k: 'human' },
          { icon: 'drop', h: 'Training data integrity', d: 'Poisoning defences, versioning', k: 'threat' },
          { icon: 'key', h: 'Cryptography', d: 'At rest, in transit, in use; keys', k: 'control' },
          { icon: 'book', h: 'Model governance', d: 'Owners, validation, registry, gates', k: 'model' },
          { icon: 'shield', h: 'Model protection', d: 'Extraction, signing, supply chain', k: 'neutral' } ],
        say: 'Domain three in six ideas. | Data governance: owners, stewards and custodians; classification that survives chunking and embedding; and provenance, lineage and custody records. | Privacy controls: purpose and lawful basis first, then minimisation, masking and tokenisation. Pseudonymised data is still personal data, anonymisation must be proven, and differential privacy trades accuracy for a provable limit. | Training data integrity: version datasets by hash, validate them, and layer defences against poisoning, which can need surprisingly few samples. | Cryptography: protect data at rest, in transit and in use, with well-governed keys, and trusted execution environments where needed. | Model governance: named owners, independent validation, model cards, an approved registry, and deployment gates that accept only signed, approved versions. | And model protection: limit outputs and queries against extraction, sign and verify model files, and verify everything that comes through the supply chain.' },
      { t: 'bullets', title: 'Domain 4: architecture, engineering and IAM', layout: 'grid', cols: 2, items: [
          { icon: 'layers', h: 'Secure design', d: 'Zero Trust, defence in depth, threat models', k: 'model' },
          { icon: 'server', h: 'Infrastructure', d: 'Hardened, isolated, quota-limited', k: 'neutral' },
          { icon: 'pipeline', h: 'Pipelines', d: 'Signed, pinned, gated, with lineage', k: 'data' },
          { icon: 'filter', h: 'Guardrails and harness', d: 'Before, around and after the model', k: 'control' },
          { icon: 'id', h: 'Identity', d: 'Every human and non-human identity', k: 'human' },
          { icon: 'lock', h: 'Authorisation', d: 'Least privilege, JIT, scoped tokens', k: 'threat' } ],
        say: 'Domain four in six ideas. | Secure design: Zero Trust, defence in depth, secure defaults and threat modelling at every trust boundary, with architecture decisions recorded. | Infrastructure: hardened notebooks and platforms, isolated training enclaves, sandboxed agent code, and quotas that stop runaway consumption. | Pipelines: ephemeral runners, pinned inputs, signed provenance, gated promotion, and lineage captured automatically. | Guardrails sit before, around and after the model, but the harness, not the model, enforces safety, and no guardrail stops every injection. | Identity: users, privileged humans, workloads, agents and tools all need unique identities, with delegation rather than impersonation. | And authorisation: narrow tools, least privilege, just-in-time access, scoped short-lived tokens, and policy enforced outside the model.' },
      { t: 'summary', items: ['Own, classify and trace data; minimise and protect it', 'Version and validate training data; govern and sign models', 'Design with Zero Trust; gate pipelines; enforce in the harness', 'Identify every identity; least privilege, enforced outside the model'],
        say: 'To recap. | Own, classify and trace data, and minimise and protect it. | Version and validate training data, and govern, sign and verify models. | Design with Zero Trust, gate pipelines, and enforce safety in the harness. | And give every human and non-human identity least privilege, enforced outside the model.' } ] },
    { type: 'text', md: `### Domain 3: data management, privacy and model security (19%)
| Topic | Remember |
|---|---|
| **Data governance** | Owner accountable, steward manages, custodian operates; controller and processor roles; sovereignty, residency and localisation; provenance, lineage and custody (Module 3.1) |
| **Privacy controls** | Privacy by design; lawful basis; minimisation; masking and tokenisation; pseudonymised ≠ anonymous; differential privacy (ε); GDPR, HIPAA and PCI DSS duties (Module 3.2) |
| **Training data** | Version by content hash; availability, targeted and backdoor poisoning; memorisation, extraction and membership inference; label integrity (Module 3.3) |
| **Data protection** | DSPM, CSPM and DLP; encryption at rest, in transit and in use; envelope encryption and key ownership (BYOK, HYOK); crypto-agility (Module 3.4) |
| **Model governance** | Named owners; independent validation; model and system cards; approved registry; signed artefacts; staged release with rollback (Module 3.5) |
| **Model CIA** | Protect weights and prompts; limit outputs and queries against extraction; watermarks and fingerprints as evidence; hash, sign and verify at deploy and load (Module 3.6) |
| **Supply chain** | Know every source; pin by hash and mirror; verify provenance and authenticity; re-test fine-tunes for safety (Module 3.7) |

### Domain 4: secure architecture, engineering and IAM (18%)
| Topic | Remember |
|---|---|
| **Secure design** | Zero Trust; defence in depth across identity, input, output and action layers; threat modelling at trust boundaries; architecture decision records (Module 4.1) |
| **Infrastructure** | Harden ML tooling; training enclaves without egress; sandboxed agent code; tenant isolation; quotas and rate limits (Module 4.2) |
| **Pipelines** | Ephemeral runners; pinned inputs; signed provenance (SLSA); quarantine, curate and snapshot data; automatic lineage; gates (Module 4.3) |
| **Guardrails** | Before, around and after the model; separate instructions from untrusted content; measure filter error rates; harness patterns such as plan-then-execute (Module 4.4) |
| **Identity** | Human and non-human identities; workload identity federation; delegation with user and agent in tokens; SSO with SAML or OIDC (Module 4.5) |
| **Authorisation** | Narrow tools; RBAC, ABAC and PBAC; just-in-time access; scoped tokens; excessive agency and over-delegation (Module 4.6) |
| **Lifecycle and auditing** | Identity inventory including agents; joiner, mover, leaver; access reviews; identity posture management; per-identity metering (Module 4.7) |` },
    { type: 'match', title: 'Which control fits?', pairs: [
      ['Prove which dataset version trained a model', 'Content-hashed dataset versions and lineage'],
      ['Stop a model file being swapped before deployment', 'Signature and digest checks at the deployment gate'],
      ['Limit what an agent can do if it is manipulated', 'Narrow, least-privilege tools enforced outside the model'],
      ['Give an engineer production access only when needed', 'Just-in-time access, approved and auto-revoked'],
      ['Keep personal data out of a training set', 'Minimisation, masking or tokenisation before training'] ] },
    { type: 'check', q: { q: 'An agent’s system prompt tells it never to share customer data, yet testing shows it can be manipulated into doing so through retrieved documents. Which control BEST addresses this?', o: ['A stronger warning in the system prompt, repeated several times for emphasis', 'Permission-aware retrieval and output DLP, enforced outside the model', 'Training staff to avoid uploading documents that contain hidden text', 'Switching to a model that scores higher on public safety benchmarks'], a: 1, b: 3,
      why: 'Controls enforced outside the model, such as retrieval that respects permissions and output data loss prevention, limit what manipulation can achieve. Prompts, staff awareness and benchmarks don’t enforce anything.' } }
  ]
};
