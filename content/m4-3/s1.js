/* 4.3 · Section 1: secure CI/CD and model deployment pipelines (packaging, containerisation) */
module.exports = {
  title: 'Secure CI/CD for models: packaging and containers', covers: [1],
  blocks: [
    { type: 'video', title: 'The pipeline is part of the product', kicker: 'Module 4.3 · Video 1 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.3 · MLOps security', title: 'The pipeline is part of the product', sub: 'Securing CI/CD, packaging and containers for models', icon: 'pipeline',
        say: 'Whoever controls your pipeline controls what your users run. If an attacker can change a build step, they never need to touch production. | This video covers securing the continuous integration and delivery pipelines that build, package and ship models.' },
      { t: 'bullets', title: 'How pipelines get compromised', layout: 'grid', cols: 2, items: [
          { icon: 'code', h: 'Poisoned pipeline execution', d: 'Untrusted changes run with secrets', k: 'threat' },
          { icon: 'key', h: 'Leaked credentials', d: 'Long-lived keys in CI settings', k: 'human' },
          { icon: 'puzzle', h: 'Unpinned dependencies', d: 'Builds pull whatever is latest', k: 'model' },
          { icon: 'server', h: 'Shared, persistent runners', d: 'One build can tamper with the next', k: 'data' },
          { icon: 'branch', h: 'Weak flow control', d: 'Changes ship without review', k: 'neutral' },
          { icon: 'container', h: 'Bloated base images', d: 'Hundreds of unneeded packages', k: 'control' } ],
        say: 'Pipelines are compromised in predictable ways, which OWASP catalogues in its top ten risks for CI and CD. | Poisoned pipeline execution: an untrusted change, such as a pull request from a fork, runs pipeline steps that can reach secrets. | Leaked credentials: long-lived cloud keys stored in pipeline settings. | Unpinned dependencies, so each build pulls whatever happens to be latest. | Shared, persistent build runners, where one build can tamper with the next. | Weak flow control, where changes reach production without review. | And bloated base images, especially for GPU workloads, carrying hundreds of packages nobody needs.' },
      { t: 'flow', title: 'A hardened model build',
        nodes: [
          { id: 'src', x: 220, y: 330, icon: 'branch', label: 'Reviewed source', sub: 'protected branches', k: 'neutral', w: 280 },
          { id: 'run', x: 620, y: 330, icon: 'box', label: 'Ephemeral runner', sub: 'isolated, fresh each build', k: 'control', w: 300 },
          { id: 'dep', x: 1040, y: 330, icon: 'lock', label: 'Pinned inputs', sub: 'hashes, internal mirrors', k: 'data', w: 290 },
          { id: 'img', x: 1340, y: 620, icon: 'container', label: 'Minimal image', sub: 'non-root, scanned', k: 'model', w: 270 },
          { id: 'att', x: 920, y: 740, icon: 'doc', label: 'SBOM and provenance', sub: 'signed attestations', k: 'human', w: 320 },
          { id: 'reg', x: 470, y: 700, icon: 'archive', label: 'Artefact registry', sub: 'immutable, signed', k: 'control', w: 290 } ],
        edges: [{ from: 'src', to: 'run', k: 'neutral' }, { from: 'run', to: 'dep', k: 'control' }, { from: 'dep', to: 'img', k: 'data' }, { from: 'img', to: 'att', k: 'model' }, { from: 'att', to: 'reg', k: 'human' }],
        steps: [
          { show: 'src', hi: 'src' },
          { show: 'run src-run', flow: 'src-run', hi: 'run' },
          { show: 'dep run-dep', flow: 'run-dep', hi: 'dep', mark: { dep: 'lock' } },
          { show: 'img dep-img', flow: 'dep-img', hi: 'img' },
          { show: 'att img-att', flow: 'img-att', hi: 'att' },
          { show: 'reg att-reg', flow: 'att-reg', hi: 'reg', mark: { reg: 'ok' } } ],
        say: 'Here is a hardened build for a model service. It starts from reviewed source, on protected branches, including the pipeline definition itself. | The build runs on an ephemeral runner: isolated, created fresh for each build, and destroyed afterwards. | Every input is pinned: dependencies by hash from internal mirrors, base images by digest, and model weights by content hash. | The output is a minimal container image that runs as non-root and is scanned for vulnerabilities. | The build produces a software bill of materials and a signed provenance attestation describing exactly how it was built. | And the signed artefacts go to an immutable registry, where deployment gates verify them.' },
      { t: 'compare', title: 'Packaging a model for deployment', labels: ['How it works', 'Strengths', 'Watch out for'],
        cols: [{ h: 'Baked in', icon: 'container', k: 'data' }, { h: 'Pulled at start', icon: 'cloud', k: 'model' }],
        rows: [
          ['Weights inside the image', 'Image fetches weights on start-up'],
          ['One signed, immutable unit', 'Small images; swap models easily'],
          ['Huge images; slow rollouts', 'Verify weights before loading'] ],
        say: 'There are two common ways to package a model with its serving code. | Bake the weights into the container image, or have the image fetch the weights from a model registry when it starts. | Baking in gives one signed, immutable unit, so what was tested is exactly what runs. Pulling at start keeps images small, and makes swapping models easy. | But baked images can be enormous and slow to roll out, while pulled weights must be verified, by signature and hash, before the server loads them.' },
      { t: 'bullets', title: 'Pipeline controls that matter most', items: [
          { icon: 'id', h: 'Federated, short-lived credentials', d: 'No stored cloud keys', k: 'control' },
          { icon: 'branch', h: 'Review the pipeline itself', d: 'Owners for pipeline files', k: 'human' },
          { icon: 'stop', h: 'No secrets for untrusted changes', d: 'Forks run without access', k: 'threat' },
          { icon: 'hash', h: 'Pin and verify everything', d: 'Lockfiles, digests, hashes', k: 'data' },
          { icon: 'shieldcheck', h: 'Sign and attest outputs', d: 'Verified at deployment', k: 'model' } ],
        say: 'Five controls matter most. | Use federated, short-lived credentials, where the pipeline proves its identity to the cloud, instead of stored cloud keys. | Treat the pipeline definition as code that needs review, with named owners for pipeline files. | Never give untrusted changes access to secrets: builds from forks or unreviewed branches run without them. | Pin and verify every input, through lockfiles, image digests and model hashes. | And sign and attest every output, so deployment can verify what it is about to run.' },
      { t: 'summary', items: ['Pipelines are attack surface: protect them like production', 'Ephemeral runners, pinned inputs, minimal images', 'Federated credentials; no secrets for untrusted changes', 'SBOMs, signed provenance and an immutable registry'],
        say: 'To recap. | Pipelines are attack surface, so protect them like production. | Build on ephemeral runners with pinned inputs, producing minimal images. | Use federated, short-lived credentials, and never expose secrets to untrusted changes. | And publish software bills of materials, signed provenance and immutable artefacts for deployment to verify.' } ] },
    { type: 'text', md: `### Threats to ML pipelines
The OWASP **Top 10 CI/CD Security Risks** list applies directly to MLOps. The most relevant are insufficient flow control (changes reaching production without review), inadequate identity and access management, dependency chain abuse, **poisoned pipeline execution** (untrusted code running inside the pipeline with its privileges), insufficient credential hygiene, insecure system configuration, and ungoverned use of third-party services. ML pipelines add model weights, datasets and very large GPU base images to the list of inputs that can be tampered with.

### Build integrity
- **SLSA** (Supply-chain Levels for Software Artifacts) defines build levels: provenance exists (level 1); a hosted build platform generates signed provenance (level 2); and a hardened platform isolates builds from each other and protects the signing material, so provenance can’t be forged (level 3).
- **Ephemeral, isolated runners**, created per build, prevent one job from poisoning another; avoid self-hosted runners on persistent machines for untrusted code.
- **Pinned inputs:** lockfiles with hashes, base images by digest rather than tag, internal package mirrors (Module 3.7), and model weights and datasets referenced by content hash.
- **Reproducible builds**, where practical, let anyone confirm that an artefact came from the stated source.

### Credentials and secrets
- **Workload identity federation** (OpenID Connect between the CI platform and the cloud) issues short-lived credentials scoped to a specific repository, branch and environment, replacing stored keys.
- **Separate credentials per stage and environment** (Module 3.5), with production deployment needing approval.
- **Never** run untrusted pull requests with access to secrets or privileged runners.
- Scan repositories and build logs for leaked secrets.

### Containers for model serving
- Start from **minimal or distroless base images**; GPU images built on large vendor bases often carry many vulnerabilities, so choose slim variants and patch regularly.
- **Multi-stage builds** keep compilers and build tools out of the final image; never copy secrets into layers.
- Run as **non-root**, with a read-only file system where possible and only the capabilities needed.
- Generate an **SBOM** (and an AIBOM for model components), scan for vulnerabilities, and **sign images** (for example, with Sigstore cosign).
- Enforce at deployment with **admission control**: only signed images, from approved registries, meeting policy.

### Packaging the model
Use safe weight formats (safetensors), package the tokenizer and configuration alongside the weights, and record everything in a signed manifest (Module 3.6). Whether weights are baked into the image or pulled at start-up, deployment must verify them against the registry before loading.` },
    { type: 'callout', kind: 'exam', title: 'CI/CD questions', md: `Look for answers that remove **standing secrets** (federated, short-lived credentials), stop **untrusted code reaching privileged steps**, and make outputs **verifiable** (pinned inputs, SBOMs, signed provenance). Scanning alone is weaker than preventing tampering in the first place.` },
    { type: 'check', q: { q: 'A team’s model-training pipeline runs automatically on every pull request, including those from external forks, using a runner that holds cloud credentials for the training cluster. What is the MAIN risk?', o: ['Builds will run slowly, because every single pull request starts a full training job on the cluster', 'An attacker can submit a pull request whose code runs with the pipeline’s cloud credentials', 'The training cluster’s GPUs will overheat from running too many jobs at once', 'Reviewers will struggle to read all of the build logs produced by each run'], a: 1, b: 1,
      why: 'This is poisoned pipeline execution: untrusted code from a fork runs inside the pipeline with access to its secrets. Untrusted changes must run without credentials, on isolated runners, with privileged steps only after review.' } }
  ]
};
