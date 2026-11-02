/* 3.6 · Section 4: model integrity (signing, hashing, version control) */
module.exports = {
  title: 'Model integrity: hashing, signing and version control', covers: [4],
  blocks: [
    { type: 'video', title: 'Is this the model we approved?', kicker: 'Module 3.6 · Video 4 of 5', scenes: [
      { t: 'title', kicker: 'Module 3.6 · Model CIA', title: 'Is this the model we approved?', sub: 'Hashing, signing and version control', icon: 'shieldcheck',
        say: 'Integrity means the model running in production is exactly the one you tested and approved, with nothing added, removed or swapped. | This video covers the controls that let you prove it: hashing, signing, version control, and verification at every hand-off.' },
      { t: 'bullets', title: 'Threats to model integrity', layout: 'grid', cols: 2, items: [
          { icon: 'bug', h: 'Tampered weights', d: 'A backdoor added after approval', k: 'threat' },
          { icon: 'box', h: 'Malicious model files', d: 'Unsafe formats run code on load', k: 'model' },
          { icon: 'copy', h: 'Swapped artefacts', d: 'Storage or registry altered', k: 'data' },
          { icon: 'text', h: 'Unreviewed changes', d: 'Prompts, configs, guardrails', k: 'human' },
          { icon: 'puzzle', h: 'Compromised dependencies', d: 'Libraries, adapters, images', k: 'neutral' },
          { icon: 'cloud', h: 'Silent provider updates', d: 'A hosted model changes underneath', k: 'control' } ],
        say: 'Integrity can be lost in several ways. | Weights can be tampered with after approval, for example to insert a backdoor. | Model files in unsafe serialisation formats can run code the moment they are loaded. | Artefacts can be swapped in storage or in the registry. | System prompts, configurations and guardrail settings can be changed without review. | Dependencies, adapters and container images can be compromised. | And a hosted model can change underneath you if you call an unpinned version.' },
      { t: 'flow', title: 'Hash and sign once, verify everywhere',
        nodes: [
          { id: 'build', x: 220, y: 330, icon: 'gpu', label: 'Build', sub: 'training run output', k: 'model', w: 250 },
          { id: 'hash', x: 590, y: 330, icon: 'hash', label: 'Hash every file', sub: 'SHA-256 manifest', k: 'neutral', w: 280 },
          { id: 'sign', x: 980, y: 330, icon: 'key', label: 'Sign the manifest', sub: 'protected key or identity', k: 'control', w: 300 },
          { id: 'reg', x: 1340, y: 560, icon: 'book', label: 'Registry', sub: 'signature and provenance', k: 'human', w: 280 },
          { id: 'gate', x: 920, y: 720, icon: 'check', label: 'Deploy gate', sub: 'verify or refuse', k: 'control', w: 260 },
          { id: 'run', x: 470, y: 720, icon: 'server', label: 'Runtime', sub: 're-verify on load', k: 'data', w: 270 } ],
        edges: [{ from: 'build', to: 'hash', k: 'model' }, { from: 'hash', to: 'sign', k: 'neutral' }, { from: 'sign', to: 'reg', k: 'control' }, { from: 'reg', to: 'gate', k: 'human' }, { from: 'gate', to: 'run', k: 'control' }],
        steps: [
          { show: 'build', hi: 'build' },
          { show: 'hash build-hash', flow: 'build-hash', hi: 'hash' },
          { show: 'sign hash-sign', flow: 'hash-sign', hi: 'sign', mark: { sign: 'lock' } },
          { show: 'reg sign-reg', flow: 'sign-reg', hi: 'reg' },
          { show: 'gate reg-gate', flow: 'reg-gate', hi: 'gate', mark: { gate: 'ok' } },
          { show: 'run gate-run', flow: 'gate-run', hi: 'run' } ],
        say: 'The pattern is: hash and sign once, then verify everywhere. A training run produces the model files. | Each file is hashed, and the digests are collected into a manifest, because a model is usually many files, not one. | The manifest is signed, using a key held in a hardware security module or a signing service tied to the pipeline’s verified identity. | The registry stores the signature and the provenance record. | The deployment gate verifies the signature and every digest, and refuses anything that doesn’t match. | And the serving runtime checks again when it loads the model, so files changed after deployment are caught too.' },
      { t: 'compare', title: 'Hashes and signatures', labels: ['Proves', 'Relies on', 'Defeated by', 'Example'],
        cols: [{ h: 'Hash', icon: 'hash', k: 'neutral' }, { h: 'Signature', icon: 'key', k: 'control' }],
        rows: [
          ['Content unchanged', 'Unchanged, and who signed it'],
          ['A trusted reference value', 'A trusted key or identity'],
          ['Swapping file and stored hash', 'A stolen signing key'],
          ['SHA-256 digest in the registry', 'Signed model manifest'] ],
        say: 'Hashes and signatures do different jobs. | A hash proves the content hasn’t changed. A signature proves that too, and also who signed it. | A hash is only useful if the reference value is trusted. A signature relies on a trusted key or identity. | So an attacker who can replace both a file and its stored hash defeats a hash check, while defeating a signature requires stealing the signing key. | In practice, store digests in the registry, and sign a manifest of them, as the OpenSSF model signing specification does.' },
      { t: 'bullets', title: 'Version control for models', items: [
          { icon: 'archive', h: 'Immutable versions', d: 'Any change makes a new version', k: 'control' },
          { icon: 'layers', h: 'Version everything together', d: 'Weights, code, data, prompts, config', k: 'data' },
          { icon: 'branch', h: 'Review changes', d: 'Prompts and configs as code', k: 'human' },
          { icon: 'flag', h: 'Pin hosted models', d: 'Dated versions, not aliases', k: 'model' },
          { icon: 'clock', h: 'Keep history', d: 'For rollback and forensics', k: 'neutral' } ],
        say: 'Version control ties integrity to change management. | Make approved versions immutable: any change, however small, creates a new version. | Version everything that shapes behaviour together: weights, code, data references, prompts and configuration. | Put prompts and configuration under the same reviewed, protected change process as code. | Pin hosted models to dated versions rather than aliases that a provider can update. | And keep the full history, for rollback and for forensics after an incident.' },
      { t: 'summary', items: ['Hash every file; sign the manifest', 'Verify at the deploy gate and again at load', 'Use safe formats; refuse unsigned models', 'Immutable, reviewed versions of everything that shapes behaviour'],
        say: 'To recap. | Hash every model file, and sign the manifest with a protected key or verified identity. | Verify signatures and digests at the deployment gate, and again when the model loads. | Use safe file formats, and refuse unsigned models. | And keep immutable, reviewed versions of everything that shapes the model’s behaviour.' } ] },
    { type: 'text', md: `### Hashing
- Use a strong cryptographic hash such as **SHA-256** (or SHA-3). MD5 and SHA-1 are broken for collision resistance and must not be relied on against an adversary.
- A model package is usually many files (weight shards, tokenizer, configuration), so hash **every file** and record the digests in a **manifest**.
- A hash only proves integrity if the **reference value is trusted**: keep it in the registry, protected separately from the files, or bind it with a signature. A hash stored next to the file, with the same access rights, can be replaced along with the file.

### Signing and provenance
- **Digital signatures** bind the manifest to a signer. Keep signing keys in an HSM or KMS, or use **keyless signing** (for example, Sigstore), which issues short-lived certificates tied to a verified workload or person and records signatures in a public transparency log.
- The **OpenSSF Model Signing** specification (v1.0, 2025) defines how to sign model files and directories, building on Sigstore.
- **Provenance attestations** (for example, SLSA-style) record how a model was built: source, data references, pipeline and environment (Section 3 of Module 3.5).
- Sign **container images** for serving as well, and verify them at deployment.

### Verification points
1. **Registry intake:** reject artefacts without valid signatures and provenance.
2. **Deployment gate:** deploy only registry-approved versions whose signatures and digests verify (policy as code).
3. **Load time:** the serving runtime verifies before loading, and refuses on failure.
4. **Runtime monitoring:** file integrity monitoring on model storage, and periodic re-verification (Module 5.3).
5. **Third-party models:** verify publishers’ signatures and hashes before use (Module 3.7).

### Safe formats
Some serialisation formats, notably Python **pickle**, used by older PyTorch checkpoints, can execute arbitrary code when a file is loaded. Prefer **safetensors** or other formats that store only data, scan third-party files before loading, and never load untrusted pickles outside an isolated sandbox.

### Version control and configuration integrity
- The registry keeps **immutable versions**; Git holds code, prompts and configuration, with protected branches and peer review; data versions are recorded by reference or hash (Module 3.1).
- Treat **system prompts, guardrail rules and retrieval settings as code**: reviewed, versioned and deployed through the same pipeline.
- For **hosted models**, pin dated versions, track deprecations, and run a small set of canary prompts on a schedule to detect unannounced behaviour changes.
- Keep history for rollback (Module 3.5) and for incident investigation (Domain 5).` },
    { type: 'flip', title: 'Integrity vocabulary', cards: [
      ['Digest', 'The fixed-length output of a hash function. Any change to the input produces a different digest.'],
      ['Manifest', 'A list of every file in a model package with its digest, signed as a whole.'],
      ['Keyless signing', 'Short-lived certificates tied to a verified identity, with each signature recorded in a public transparency log.'],
      ['Provenance attestation', 'Signed metadata describing how an artefact was built: source, inputs, pipeline and environment.'],
      ['Safetensors', 'A data-only weight format that can’t execute code when it is loaded, unlike pickle.'] ] },
    { type: 'check', q: { q: 'A team stores a SHA-256 hash of each approved model file in the same storage bucket as the files, and checks it at deployment. Why is this weak against an attacker who gains write access to the bucket?', o: ['SHA-256 is too slow to compute on very large model files during deployment', 'The attacker can replace both the model and its stored hash, so the check still passes', 'Hashes can only ever detect accidental corruption in transit, never deliberate changes to files', 'SHA-256 is no longer considered collision-resistant for files of this size'], a: 1, b: 4,
      why: 'A hash is only as trustworthy as its reference value. Keep digests in a separately protected registry and sign them, so an attacker who can change the files can’t also forge a valid reference.' } }
  ]
};
