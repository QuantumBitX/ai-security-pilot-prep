/* 3.7 · Section 2: provenance and authenticity verification for third-party vendors */
module.exports = {
  title: 'Verifying provenance and authenticity from vendors', covers: [2],
  blocks: [
    { type: 'video', title: 'Trust, but verify the artefact', kicker: 'Module 3.7 · Video 2 of 3', scenes: [
      { t: 'title', kicker: 'Module 3.7 · AI supply chain', title: 'Trust, but verify the artefact', sub: 'Provenance and authenticity for models, data and components', icon: 'shieldcheck',
        say: 'Due diligence tells you whether a vendor is trustworthy. Verification tells you whether the specific file in front of you really came from that vendor, unaltered. | This video covers how to verify the provenance and authenticity of models, datasets and software you receive from third parties.' },
      { t: 'compare', title: 'Provenance and authenticity', labels: ['Question', 'Evidence', 'Fails when'],
        cols: [{ h: 'Provenance', icon: 'branch', k: 'data' }, { h: 'Authenticity', icon: 'id', k: 'control' }],
        rows: [
          ['Where did it come from, and how was it made?', 'Is it really from who it claims, unaltered?'],
          ['Attestations, AIBOM, lineage records', 'Signatures, verified publishers, hashes'],
          ['Records are missing or unverifiable', 'Keys, accounts or names are hijacked'] ],
        say: 'Two related questions. | Provenance asks where an artefact came from and how it was made. Authenticity asks whether it really comes from who it claims to, unaltered. | Provenance evidence includes build attestations, AI bills of materials and lineage records. Authenticity evidence includes digital signatures, verified publisher accounts and published hashes. | Provenance fails when records are missing or can’t be checked. Authenticity fails when signing keys, publisher accounts or familiar names are taken over by someone else.' },
      { t: 'bullets', title: 'How impostors get in', layout: 'grid', cols: 2, items: [
          { icon: 'copy', h: 'Typosquatting', d: 'Look-alike model or package names', k: 'threat' },
          { icon: 'user', h: 'Namespace reuse', d: 'Deleted accounts re-registered', k: 'human' },
          { icon: 'puzzle', h: 'Dependency confusion', d: 'Public package beats private one', k: 'model' },
          { icon: 'key', h: 'Hijacked accounts', d: 'Stolen publisher tokens', k: 'data' },
          { icon: 'box', h: 'Tampered mirrors', d: 'Unofficial copies altered', k: 'neutral' },
          { icon: 'doc', h: 'False claims', d: 'Cards that overstate testing', k: 'control' } ],
        say: 'Impostor artefacts get in through familiar routes. | Typosquatting: look-alike names for models and packages. | Namespace reuse: when a publisher deletes or renames an account on a model hub, someone else may register the old name, and pipelines that refer to models by name start pulling the impostor. Researchers demonstrated this against major cloud model catalogues in 2025. | Dependency confusion, where a public package with the same name as an internal one gets installed instead. In December 2022, a malicious package was pulled into PyTorch’s nightly builds this way. | Hijacked publisher accounts and stolen upload tokens. | Altered copies on unofficial mirrors. | And model cards or vendor claims that overstate how a model was tested.' },
      { t: 'flow', title: 'A verification workflow',
        nodes: [
          { id: 'src', x: 230, y: 330, icon: 'globe', label: 'Official source', sub: 'verified publisher', k: 'neutral', w: 280 },
          { id: 'sig', x: 690, y: 330, icon: 'key', label: 'Verify signature', sub: 'and every hash', k: 'control', w: 280 },
          { id: 'att', x: 1170, y: 330, icon: 'doc', label: 'Check provenance', sub: 'attestation, AIBOM', k: 'data', w: 300 },
          { id: 'scan', x: 1170, y: 690, icon: 'search', label: 'Scan and test', sub: 'sandbox, safe format', k: 'threat', w: 290 },
          { id: 'reg', x: 690, y: 690, icon: 'book', label: 'Register and pin', sub: 'by hash, not by name', k: 'human', w: 300 },
          { id: 'mon', x: 230, y: 690, icon: 'eye', label: 'Monitor', sub: 'advisories, revocations', k: 'model', w: 280 } ],
        edges: [{ from: 'src', to: 'sig', k: 'neutral' }, { from: 'sig', to: 'att', k: 'control' }, { from: 'att', to: 'scan', k: 'data' }, { from: 'scan', to: 'reg', k: 'threat' }, { from: 'reg', to: 'mon', k: 'human' }],
        steps: [
          { show: 'src', hi: 'src' },
          { show: 'sig src-sig', flow: 'src-sig', hi: 'sig', mark: { sig: 'lock' } },
          { show: 'att sig-att', flow: 'sig-att', hi: 'att' },
          { show: 'scan att-scan', flow: 'att-scan', hi: 'scan' },
          { show: 'reg scan-reg', flow: 'scan-reg', hi: 'reg', mark: { reg: 'ok' } },
          { show: 'mon reg-mon', flow: 'reg-mon', hi: 'mon' } ],
        say: 'A verification workflow brings these checks together. Start from the official source, and confirm the publisher’s identity. | Verify the digital signature, and the hash of every file. | Check the provenance evidence: build attestations, the AI bill of materials and the model card. | Scan and test the artefact in a sandbox, converting models to safe formats, and run your own evaluations rather than relying on the vendor’s claims. | Register the approved artefact, and pin it by hash rather than by name, so a renamed or hijacked source can’t substitute something else. | And monitor for security advisories, revoked signatures and takedowns.' },
      { t: 'summary', items: ['Provenance: where from and how made; authenticity: really from them, unaltered', 'Watch for typosquatting, namespace reuse and dependency confusion', 'Verify signatures, attestations and AIBOMs; test in a sandbox', 'Pin by hash in an internal registry; monitor for advisories'],
        say: 'To recap. | Provenance tells you where an artefact came from and how it was made; authenticity tells you it really came from the claimed source, unaltered. | Watch for typosquatting, namespace reuse, dependency confusion and hijacked accounts. | Verify signatures, attestations and bills of materials, and test artefacts yourself in a sandbox. | And pin approved artefacts by hash in an internal registry, while monitoring for advisories.' } ] },
    { type: 'text', md: `### From vendor trust to artefact trust
Module 2.5 covers **vendor** due diligence: security controls, contracts, SLAs and notification rights. This section covers **artefact** verification: checking each model, dataset, library or container you actually receive. A trustworthy vendor can still be impersonated, compromised or mistaken.

### Evidence you can ask for and check
| Evidence | What it shows | How to check |
|---|---|---|
| **Digital signature** | The artefact was signed by the publisher’s key or verified identity and hasn’t changed | Verify against the publisher’s known key, or a Sigstore certificate tied to their identity and recorded in a transparency log (OpenSSF Model Signing) |
| **Published hashes** | The bytes match what the publisher released | Compare digests obtained through a separate trusted channel |
| **Provenance attestation** | How and where it was built: source, inputs, pipeline (SLSA, in-toto) | Verify the attestation’s signature and check that it matches the artefact’s digest |
| **AIBOM or SBOM** | Components: base model, datasets, libraries, licences (CycloneDX, SPDX) | Cross-check with your inventory; scan listed components for known vulnerabilities |
| **Model card and datasheet** | Intended use, training data, evaluation results, limitations | Compare claims against your own testing |
| **Third-party assurance** | Independent assessment, such as ISO/IEC 42001 certification or SOC 2 reports | Check scope, date and the certifying body |

### Threats to authenticity
- **Typosquatting and look-alike names** on model hubs and package registries.
- **Model namespace reuse:** when a hub account is deleted or transferred, its old name may be re-registered. In 2025, researchers showed that pipelines and cloud model catalogues that referenced models by name could be made to pull attacker-controlled models this way.
- **Dependency confusion:** a public package outranks a private one with the same name. In December 2022, a malicious package named *torchtriton*, uploaded to the public Python package index, was installed by PyTorch’s nightly builds and collected data from affected systems.
- **Compromised publisher accounts and CI pipelines**, which can push signed but malicious releases. Signatures prove who signed, not that the content is safe.
- **Unofficial mirrors and re-uploads** of popular models, sometimes with altered weights or loading code.

### Verification practices
- Download only from **official sources and verified publishers**; prefer hubs and catalogues that show verification status.
- **Pin by immutable identifier**, such as a commit hash or content digest, not by a name or "latest" tag.
- **Verify signatures and hashes** automatically in the pipeline, and fail closed when verification fails.
- **Scan** for unsafe serialisation, embedded code and malware; disable remote code execution in model and dataset loaders; convert to safe formats (Module 3.6).
- **Test** behaviour yourself: capability, safety, bias and security evaluations, including checks for hidden triggers where tools allow.
- **Mirror** approved artefacts in an internal registry, so builds don’t depend on external availability or a name staying in the same hands.
- Use **private package indexes** with scoped names, and configure installers so internal names can’t be satisfied from public registries.
- **Monitor** advisories, revocations, takedowns and changes of ownership for everything in your AIBOM.` },
    { type: 'callout', kind: 'exam', title: 'Signed is not the same as safe', md: `A valid signature proves **who** signed an artefact and that it **hasn’t changed**. It doesn’t prove the content is free of backdoors or vulnerabilities, because a compromised publisher can sign malicious releases. The best answers combine **verification** (signatures, hashes, provenance) with **independent testing** and **pinning**.` },
    { type: 'flip', title: 'Verification evidence', cards: [
      ['Digital signature', 'Shows who signed an artefact and that it hasn’t changed. It doesn’t show the content is safe.'],
      ['Published hash', 'Lets you confirm the bytes match the release, if you obtain the hash through a separate trusted channel.'],
      ['Provenance attestation', 'Signed record of how an artefact was built: source, inputs and pipeline.'],
      ['AIBOM', 'Lists the components inside: base model, datasets, libraries and licences.'],
      ['Third-party assurance', 'Independent certification or audit reports. Check their scope and date.'] ] },
    { type: 'check', q: { q: 'A production pipeline loads a model from a public hub using only the publisher’s account name and model name. The publisher has just deleted its account. What is the MAIN risk?', o: ['The model will run more slowly, because the hub no longer caches it near the pipeline', 'Someone could register the old name and serve a malicious model that the pipeline then loads', 'The model’s licence automatically becomes void at the moment the publisher deletes its account', 'The pipeline’s own API keys for the hub will expire at the same moment as the account'], a: 1, b: 2,
      why: 'Name-based references trust whoever controls the name. Pinning by content hash or commit and mirroring approved models internally stop a re-registered namespace from substituting a malicious model.' } }
  ]
};
