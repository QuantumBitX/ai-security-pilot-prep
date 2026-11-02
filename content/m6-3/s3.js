/* 6.3 · Section 3: pedigree and provenance verification (hashing, digital signatures, attestations) */
module.exports = {
  title: 'Verifying pedigree and provenance', covers: [3],
  blocks: [
    { type: 'video', title: 'Where did this model really come from?', kicker: 'Module 6.3 · Video 3 of 4', scenes: [
      { t: 'title', kicker: 'Module 6.3 · AI supply chain', title: 'Where did this model really come from?', sub: 'Pedigree and provenance verification', icon: 'fingerprint',
        say: 'A model file tells you almost nothing about its history. It could be an official release, a community fine-tune, a merge of two models, or an altered copy, and each step brings its own data and intentions into your system. | This video covers pedigree and provenance verification with hashes, signatures and attestations, building on the artefact checks in Modules 3.6 and 3.7.' },
      { t: 'flow', title: 'A model’s pedigree',
        nodes: [
          { id: 'base', x: 230, y: 330, icon: 'building', label: 'Base model', sub: 'lab release, signed', k: 'control', w: 290 },
          { id: 'inst', x: 700, y: 330, icon: 'chat', label: 'Instruct model', sub: 'same lab', k: 'model', w: 310 },
          { id: 'ft', x: 1200, y: 330, icon: 'users', label: 'Community fine-tune', sub: 'data undisclosed', k: 'human', w: 330 },
          { id: 'merge', x: 1200, y: 690, icon: 'split', label: 'Merged model', sub: 'two parents', k: 'neutral', w: 290 },
          { id: 'quant', x: 700, y: 690, icon: 'box', label: 'Quantised copy', sub: 're-uploaded', k: 'data', w: 290 },
          { id: 'you', x: 230, y: 690, icon: 'search', label: 'Your candidate', sub: 'what is verified?', k: 'threat', w: 300 } ],
        edges: [{ from: 'base', to: 'inst', k: 'control' }, { from: 'inst', to: 'ft', k: 'model' }, { from: 'ft', to: 'merge', k: 'human' }, { from: 'merge', to: 'quant', k: 'neutral' }, { from: 'quant', to: 'you', k: 'data' }],
        steps: [
          { show: 'base', hi: 'base', mark: { base: 'lock' } },
          { show: 'inst base-inst', flow: 'base-inst', hi: 'inst' },
          { show: 'ft inst-ft', flow: 'inst-ft', hi: 'ft', mark: { ft: 'q' } },
          { show: 'merge ft-merge', flow: 'ft-merge', hi: 'merge' },
          { show: 'quant merge-quant', flow: 'merge-quant', hi: 'quant' },
          { show: 'you quant-you', flow: 'quant-you', hi: 'you', mark: { you: 'warn' } } ],
        say: 'Pedigree is a model’s family tree. It often starts with a base model, released and signed by a lab. | The lab may publish an instruction-tuned version. So far, the history is clear. | Then a community member fine-tunes it on undisclosed data, and you inherit whatever that data contained. | Someone merges that fine-tune with another model, adding a second parent to verify. | Another person quantises the merged model and re-uploads it. | And that copy is what your team wants to deploy. Which of these steps can you verify, and which are you taking on trust?' },
      { t: 'compare', title: 'Pedigree and provenance', labels: ['Question', 'Evidence', 'If missing'],
        cols: [{ h: 'Pedigree', icon: 'branch', k: 'model' }, { h: 'Provenance', icon: 'fingerprint', k: 'control' }],
        rows: [
          ['What is it descended from?', 'Where did this exact file come from?'],
          ['Lineage records, parent hashes', 'Hashes, signatures, attestations'],
          ['Inherited flaws and licences go unseen', 'Substitution and tampering go unseen'] ],
        say: 'Pedigree and provenance answer different questions. | Pedigree asks what a model descends from: its parents, the data and methods at each step, and who carried them out. Provenance asks where this exact file came from, and how it was produced. | Pedigree evidence is lineage records linked to each parent’s hash. Provenance evidence is hashes, signatures and build attestations. | Without pedigree, inherited backdoors, data problems and licences go unseen. Without provenance, substituted or tampered files go unseen.' },
      { t: 'code', title: 'A verification record', file: 'verify-model.log',
        code: `artefact: support-base-8b @ rev 3f9c2e1
files: 14, every SHA-256 digest matches
signature: valid (OpenSSF model signing)
signer: release-pipeline@vendor.example
transparency log: entry found
provenance: vendor CI, source tag v2.1
parent: base-8b, digest matches approved
datasets: 3 listed, 1 licence unverified
format: safetensors, no executable code
decision: HOLD until dataset licence clears`,
        hl: [null, [1, 2], [3, 5], [6, 7], [8, 9], [10, 10]],
        notes: [
          { h: 'One record per artefact', d: 'Every check, its result and the decision.' },
          { h: 'Identity and integrity', d: 'Pinned to an immutable revision; every file hashed.', k: 'data' },
          { h: 'Authenticity', d: 'A valid signature from the expected identity, logged publicly.', k: 'control' },
          { h: 'Provenance and pedigree', d: 'Built by the expected pipeline, from a verified parent.', k: 'model' },
          { h: 'Data and format', d: 'An unverified dataset licence; a safe file format.', k: 'human' },
          { h: 'Fail closed', d: 'Any open question holds the model back.', k: 'threat' } ],
        say: 'Here is a verification record for a third-party model: every check, its result and the decision. | Identity and integrity: the model is pinned to an immutable revision, and every file’s digest matches the publisher’s manifest. | Authenticity: the signature is valid, it comes from the identity the vendor told us to expect, and it is recorded in a public transparency log. | Provenance and pedigree: an attestation shows the vendor’s pipeline built the model from a tagged source, and the parent’s digest matches the version we approved. | Data and format: one tuning dataset’s licence is unverified, and the weights are in a safe format. | So the model is held. Verification fails closed. And remember its limits: a signature proves who signed, not that a model is safe, so verification always goes with your own evaluation.' },
      { t: 'summary', items: ['Pedigree: what it descends from; provenance: where this file came from', 'Hash every file; verify signatures, attestations and parents', 'Record results, and fail closed on open questions', 'Signed isn’t safe: pair verification with evaluation'],
        say: 'To recap. | Pedigree is what a model descends from; provenance is where this exact file came from, and how it was made. | Hash every file, verify signatures and attestations, and check each parent against approved digests. | Record every result, and fail closed while any question is open. | And remember that signed isn’t safe: pair verification with your own evaluation, and keep monitoring.' } ] },
    { type: 'text', md: `### Pedigree and provenance
- **Pedigree** is the lineage of a model or dataset: its ancestors, the derivation steps between them (pre-training, instruction tuning, fine-tuning, merging, distillation, quantisation), the data and methods used, and who performed each step. CycloneDX records it in **pedigree** fields for ancestors, descendants, variants and patches.
- **Provenance** is the verifiable record of where a specific artefact came from and how it was produced, bound to its digest (Module 3.7).
- Hub lineage, such as a base model field in a model card, is **self-declared**: useful for discovery, but anyone can write it.

**Why pedigree matters:** descendants can inherit **backdoors** that persist through further training (Module 3.3); **weakened safety**, because fine-tuning can erode a parent’s safety training (Module 1.2); **data problems**, such as personal or poisoned data; every parent’s **licence obligations** (Section 2); and **vulnerable** loading code or file formats.

### Verification techniques
| Technique | Verifies | Practice |
|---|---|---|
| **Cryptographic hashing** | The bytes match a trusted reference | SHA-256 digests for every file, in a signed manifest; pin hub models to an immutable **revision**, never a name or default branch (Module 3.6) |
| **Digital signatures** | Who signed, and that nothing has changed since | **OpenSSF Model Signing** (v1.0, April 2025) signs whole model directories and supports **Sigstore** keyless signing with a public transparency log. Verify against the **expected identity**, not just any valid signature |
| **Provenance attestations** | How and where it was built | Signed **SLSA** provenance and **in-toto** attestations, bound to the digest (Module 4.3) |
| **Pedigree records** | What it descends from | Lineage in the AIBOM and model card, with each parent’s digest and, ideally, a signed attestation for each derivation step |
| **Dataset and content provenance** | Where data came from, and on what terms | Dataset metadata such as MLCommons **Croissant**; **C2PA** content credentials for media (Module 2.6) |

### Chain of custody
Record an artefact’s digest when it enters the organisation, and verify it at **every** hand-off: scanning, evaluation, approval, mirroring, deployment and model load. After approval, **counter-sign** it with your own identity, so admission control trusts a single internal signer (Module 4.3).

| Source | Minimum before production |
|---|---|
| **Your own pipelines** | Pipeline-identity signature, attestation, AIBOM |
| **Contracted vendors** | Vendor signature and attestation, AIBOM, notice of changes |
| **Major labs on public hubs** | Verified organisation, pinned revision, signature where offered, scanning, your own evaluation, internal mirror |
| **Unknown publishers** | Sandbox only, until pedigree, data and licences are verified |

**Verification has limits.** Signed isn’t safe, attested isn’t honest, claimed lineage isn’t proven, a clean scan can’t see behaviours hidden in the weights, popularity can be gamed, and today’s verification can be undone by tomorrow’s revocation or account takeover.` },
    { type: 'steps', title: 'Verifying a claimed pedigree', items: [
      ['Collect the claims', 'Gather the model card, hub metadata and any AIBOM entries for every claimed parent, dataset and derivation step.'],
      ['Verify the parents', 'Match each parent’s digest to its official, signed release. An unmatched parent is an unverified link.'],
      ['Check each step', 'Look for signed attestations for each fine-tune, merge or conversion, or reproduce the step yourself from the verified parent.'],
      ['Reconcile data and licences', 'Confirm datasets and licences at source, and combine every parent’s obligations.'],
      ['Test, record and decide', 'Evaluate behaviour yourself, record the results in the AIBOM and registry, fail closed on gaps, and counter-sign approved artefacts.'] ] },
    { type: 'callout', kind: 'exam', title: 'Pedigree and provenance questions', md: `**Hashes** prove the bytes match a trusted reference; **signatures** add who signed; **attestations** add how it was built; **pedigree records** add what it descends from. None of them proves a model is **safe**. Strong answers **pin by digest or revision**, verify against the **expected identity**, **fail closed**, and combine verification with **independent evaluation**.` },
    { type: 'check', q: { q: 'A team confirms that a fine-tuned model’s signature is valid and that its files match the publisher’s digests. The model card says it was fine-tuned from an approved base model. What remains UNVERIFIED?', o: ['Whether the files were altered at any point after the publisher signed them', 'Whether it really descends from the approved base model, and using what data', 'Whether the signature was produced using the publisher’s own signing identity', 'Whether the model’s files match the digests listed in the publisher’s manifest'], a: 1, b: 3,
      why: 'The signature and digests establish the files’ integrity and authenticity. The lineage claim in the model card stays unverified until the parent’s digest and the fine-tuning step are backed by records or attestations, and the tuning data has been checked.' } }
  ]
};
