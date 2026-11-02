/* 3.4 · Section 4: key management lifecycle (KMS, BYOK, secrets, rotation) */
module.exports = {
  title: 'Key management, BYOK and secrets', covers: [4],
  blocks: [
    { type: 'video', title: 'Keys are the real control', kicker: 'Module 3.4 · Video 4 of 6', scenes: [
      { t: 'title', kicker: 'Module 3.4 · Data protection', title: 'Keys are the real control', sub: 'Key management, BYOK, secrets and rotation for AI systems', icon: 'key',
        say: 'Encryption is only as strong as the management of its keys. Whoever controls the keys controls the data. | This video covers the key management lifecycle, the choice between provider and customer control of keys, and how to manage the secrets that AI systems depend on.' },
      { t: 'cycle', title: 'The key lifecycle', center: 'Key', centerSub: 'governed end to end', intro: 'Every stage is controlled, logged and owned.',
        stages: [
          { icon: 'sparkle', label: 'Generate', d: 'Strong randomness, inside an HSM.' },
          { icon: 'lock', label: 'Store', d: 'In a KMS or HSM, never in code.' },
          { icon: 'key', label: 'Use', d: 'Least privilege; every use logged.' },
          { icon: 'cycle', label: 'Rotate', d: 'New versions on a set cryptoperiod.' },
          { icon: 'archive', label: 'Revoke and archive', d: 'On compromise or retirement.' },
          { icon: 'trash', label: 'Destroy', d: 'Zeroise; data becomes unreadable.' } ],
        say: 'Keys have a lifecycle, and every stage needs control. | Generate keys with strong randomness, ideally inside a hardware security module. | Store them in a key management service or HSM, never in code, configuration files or prompts. | Use them under least privilege, with every use logged. | Rotate them, creating new key versions at the end of each cryptoperiod. | Revoke and archive them when they are compromised or retired, keeping old versions only as long as data encrypted under them must be read. | And destroy them by zeroisation, which makes everything encrypted under them unreadable. That is the basis of cryptographic erase.' },
      { t: 'compare', title: 'Who controls the keys?', labels: ['Where keys live', 'Your control', 'Trade-off'],
        cols: [{ h: 'Provider-managed', icon: 'cloud', k: 'neutral' }, { h: 'Customer / BYOK', icon: 'key', k: 'data' }, { h: 'External (HYOK)', icon: 'lock', k: 'control' }],
        rows: [
          ['Provider’s KMS, provider policy', 'Provider’s KMS, your policy', 'Your own system, outside the provider'],
          ['Least: provider decides', 'Set policy, rotate, revoke, audit', 'Strongest: cut off access at will'],
          ['Simplest, no overhead', 'More operational work', 'Availability depends on you'] ],
        say: 'There are three main models for who controls the keys. | With provider-managed keys, the provider holds and manages everything. With customer-managed keys, the keys live in the provider’s key service but under your policy; with bring your own key, you also generate them and import them. With external key management, sometimes called hold your own key, the keys never leave your own system, and the provider must ask each time. | Control rises across the three. Customer-managed keys let you set policy, rotate, revoke and audit use. External keys let you cut off the provider’s access entirely. | But so does the burden. Provider keys are simplest. Customer-managed keys add operational work. External keys make availability depend on your systems, and some provider features may not work with them.' },
      { t: 'bullets', title: 'Secrets that AI systems depend on', layout: 'grid', cols: 2, items: [
          { icon: 'cloud', h: 'Model provider API keys', d: 'Grant access and spend', k: 'model' },
          { icon: 'robot', h: 'Agent and tool tokens', d: 'Act on someone’s behalf', k: 'threat' },
          { icon: 'plug', h: 'Connector credentials', d: 'Feed retrieval with documents', k: 'data' },
          { icon: 'pen', h: 'Signing keys', d: 'Prove models and data are authentic', k: 'control' },
          { icon: 'server', h: 'Service accounts', d: 'Run pipelines and jobs', k: 'neutral' },
          { icon: 'lock', h: 'Data encryption keys', d: 'Protect stores and artefacts', k: 'human' } ],
        say: 'AI systems depend on many secrets. | Model provider API keys, which grant access and spend money. | Tokens that agents use to call tools on someone’s behalf. | Credentials for connectors that feed documents into retrieval systems. | Signing keys that prove models and datasets are authentic. | Service accounts that run pipelines and jobs. | And the encryption keys that protect data stores and artefacts.' },
      { t: 'bullets', title: 'Secret management rules for AI', items: [
          { icon: 'lock', h: 'Vault, not code or prompts', d: 'A secret in a prompt can be extracted', k: 'control' },
          { icon: 'clock', h: 'Short-lived by default', d: 'Workload identity over static keys', k: 'data' },
          { icon: 'cycle', h: 'Rotate on schedule and on exposure', d: 'Revoke fast when leaked', k: 'human' },
          { icon: 'target', h: 'Scope narrowly', d: 'One credential per agent and tool', k: 'model' },
          { icon: 'search', h: 'Scan and monitor', d: 'Repos, logs, prompts; unusual use', k: 'threat' } ],
        say: 'Five rules keep those secrets safe. | Keep secrets in a vault, never in code, notebooks, configuration files or prompts. A secret in a system prompt can be extracted by users. | Prefer short-lived credentials issued through workload identity, rather than long-lived static keys. | Rotate on a schedule, and immediately on any suspected exposure. | Scope narrowly: one credential per agent and per tool, with only the permissions it needs. | And scan and monitor: search repositories, logs and prompts for secrets, and watch for unusual use, such as a sudden spike in model API spend.' },
      { t: 'summary', items: ['Govern keys through generate, store, use, rotate, revoke, destroy', 'Provider, customer-managed (BYOK) or external (HYOK): control vs burden', 'Keep AI secrets in vaults, short-lived and narrowly scoped', 'Never put keys in prompts, code or notebooks'],
        say: 'To recap. | Govern keys through their whole lifecycle: generate, store, use, rotate, revoke and destroy. | Choose between provider-managed, customer-managed and external keys by weighing control against operational burden. | Keep the secrets AI systems depend on in vaults, short-lived and narrowly scoped. | And never put keys in prompts, code or notebooks.' } ] },
    { type: 'text', md: `### The key management lifecycle
NIST SP 800-57 describes keys moving through **generation, registration and distribution, storage, use, rotation (re-keying), backup, archiving, revocation and destruction**. Good practice:
- Generate and hold high-value keys in **FIPS 140-3 validated HSMs**, directly or through a cloud **KMS** backed by HSMs.
- Use a **key hierarchy**: master keys protect key-encryption keys, which protect data keys (envelope encryption, Section 3).
- Define **cryptoperiods** and automate **rotation**; keep old key versions only while data encrypted under them still needs to be decrypted, then re-encrypt or retire.
- Enforce **separation of duties and dual control**: key administrators shouldn’t also administer the data, and sensitive HSM operations should need more than one person.
- **Log every key use**, and alert on unusual patterns.
- Plan **key compromise response**: revoke, rotate, re-encrypt, and investigate what the key protected.
- **Destroying a key** destroys access to everything encrypted under it, which is powerful for erasure (Section 6) and dangerous by accident, so protect destruction with approvals and recovery windows.

### Provider and customer control
| Model | Description | When to use |
|---|---|---|
| **Provider-managed keys** | The provider generates, stores and controls keys | Low-sensitivity data; simplicity matters most |
| **Customer-managed keys (CMK)** | Keys in the provider’s KMS under customer policy, rotation and audit | Most enterprise AI workloads holding sensitive data |
| **Bring your own key (BYOK)** | The customer generates keys and imports them into the provider’s KMS | Regulatory or policy need to control key origin |
| **Hold your own key (HYOK) / external key management** | Keys stay in the customer’s HSM; the provider requests each use | Highest sensitivity, sovereignty requirements, ability to cut off access |

For hosted AI services, check which stored data (fine-tuning files, uploaded documents, vector stores, logs, conversation history) can be encrypted with customer-managed keys, and what happens to cached or derived data when a key is revoked.

### Secret management for AI
- Store secrets in a **vault**; inject them at runtime on the server side. **Never** place secrets in system prompts, tool descriptions, notebooks or repositories.
- Use **workload identity** and short-lived tokens instead of static API keys wherever possible.
- Issue **separate, narrowly scoped credentials** for each agent, tool and environment, so one leak doesn’t expose everything (Module 4.5 covers identities for AI).
- **Scan** code, configuration, notebooks, logs and prompt histories for secrets, before commit and continuously.
- **Monitor usage**: spend spikes, unusual locations or volumes can reveal a stolen model API key.
- **Rotate** on schedule and immediately on suspected exposure, with a tested revocation playbook.` },
    { type: 'steps', title: 'Respond to an exposed model API key', items: [
      ['Revoke and rotate', 'Revoke the exposed key immediately and issue a replacement through the vault. Don’t wait for the investigation.'],
      ['Review usage', 'Check provider logs and billing for use of the key during the exposure window: volumes, locations, models and data accessed.'],
      ['Contain spread', 'Find every copy: repositories, history, forks, notebooks, logs and prompts. Remove them and rewrite history where needed.'],
      ['Assess impact', 'Determine whether data was exposed through the key, such as stored files or fine-tuning datasets, and whether notification duties apply.'],
      ['Fix the cause', 'Move the workload to vault-injected or short-lived credentials, and add secret scanning to the pipeline.'] ] },
    { type: 'check', q: { q: 'A developer places the model provider’s API key in an assistant’s system prompt so that a tool can use it. What is the BEST response?', o: ['Accept it, provided the system prompt is marked confidential and users are told not to ask about it', 'Move the key to a vault, have the application inject it server-side for the tool, and rotate the exposed key', 'Encode the key in Base64 inside the system prompt, so that users can’t read it directly in any output', 'Keep the key in the prompt but limit the assistant to internal users who have passed security training'], a: 1, b: 4,
      why: 'System prompts can be extracted, so a key there must be treated as exposed. Secrets belong in a vault and should be injected by the application, never seen by the model. Encoding is not protection, and restricting users doesn’t remove the exposure.' } }
  ]
};
