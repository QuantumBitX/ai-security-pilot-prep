/* 3.5 · Section 3: model deployment pipeline security */
module.exports = {
  title: 'Securing the model deployment pipeline', covers: [3],
  blocks: [
    { type: 'video', title: 'From training run to production, safely', kicker: 'Module 3.5 · Video 3 of 6', scenes: [
      { t: 'title', kicker: 'Module 3.5 · Model lifecycle', title: 'From training run to production, safely', sub: 'Validation, packaging, serving and credential management', icon: 'pipeline',
        say: 'The path from a training run to a production endpoint is a prime target: compromise it, and you control what every user receives. | This video covers securing that path, from validation gates and packaging, through serving, to the credentials the pipeline uses.' },
      { t: 'flow', title: 'A secured deployment pipeline',
        nodes: [
          { id: 'train', x: 220, y: 330, icon: 'gpu', label: 'Training run', sub: 'candidate model', k: 'model', w: 260 },
          { id: 'val', x: 600, y: 330, icon: 'check', label: 'Validation gate', sub: 'tests and artefact scans', k: 'control', w: 280 },
          { id: 'pkg', x: 990, y: 330, icon: 'box', label: 'Package and sign', sub: 'safe format, provenance', k: 'data', w: 280 },
          { id: 'reg', x: 1370, y: 330, icon: 'book', label: 'Registry', sub: 'approved version', k: 'human', w: 260 },
          { id: 'dep', x: 1370, y: 690, icon: 'key', label: 'Approved deploy', sub: 'dedicated credentials', k: 'threat', w: 280 },
          { id: 'serve', x: 980, y: 690, icon: 'server', label: 'Hardened serving', sub: 'isolated, authenticated', k: 'control', w: 290 } ],
        edges: [{ from: 'train', to: 'val', k: 'model' }, { from: 'val', to: 'pkg', k: 'control' }, { from: 'pkg', to: 'reg', k: 'data' }, { from: 'reg', to: 'dep', k: 'human' }, { from: 'dep', to: 'serve', k: 'threat' }],
        steps: [
          { show: 'train', hi: 'train' },
          { show: 'val train-val', flow: 'train-val', hi: 'val' },
          { show: 'pkg val-pkg', flow: 'val-pkg', hi: 'pkg', mark: { pkg: 'lock' } },
          { show: 'reg pkg-reg', flow: 'pkg-reg', hi: 'reg' },
          { show: 'dep reg-dep', flow: 'reg-dep', hi: 'dep', mark: { dep: 'key' } },
          { show: 'serve dep-serve', flow: 'dep-serve', hi: 'serve', mark: { serve: 'ok' } } ],
        say: 'Here is a secured deployment pipeline. A training run produces a candidate model. | A validation gate runs performance, safety, fairness and security tests, and scans the artefact for malicious content. | The model is packaged in a safe format with its dependencies, and signed, with a record of how it was built. | It is registered and approved. | Deployment to production needs approval, and uses dedicated credentials. | And it runs on hardened serving infrastructure: isolated, authenticated and rate-limited.' },
      { t: 'bullets', title: 'Validation gate checks', layout: 'grid', cols: 2, items: [
          { icon: 'chart', h: 'Performance', d: 'Against the production baseline', k: 'data' },
          { icon: 'shield', h: 'Safety and robustness', d: 'Evaluation and red-team suites', k: 'threat' },
          { icon: 'scale', h: 'Fairness', d: 'Metrics for relevant groups', k: 'human' },
          { icon: 'bug', h: 'Artefact scanning', d: 'Unsafe formats, embedded code', k: 'model' },
          { icon: 'list', h: 'Dependencies', d: 'Vulnerabilities in the serving stack', k: 'neutral' },
          { icon: 'hash', h: 'Provenance', d: 'Hash matches the recorded run', k: 'control' } ],
        say: 'A validation gate should check six things. | Performance against the current production baseline. | Safety and robustness, using standard evaluation and red-team suites. | Fairness metrics for relevant groups. | Artefact scanning, for unsafe serialisation formats and embedded code. | Dependency and vulnerability scanning of the serving stack. | And provenance: the artefact’s hash matches the training run recorded in lineage.' },
      { t: 'bullets', title: 'Credentials in the pipeline', items: [
          { icon: 'id', h: 'Workload identity', d: 'Short-lived tokens, no static keys', k: 'control' },
          { icon: 'split', h: 'Separate per stage', d: 'Training can’t deploy to production', k: 'model' },
          { icon: 'users', h: 'Two-person production deploys', d: 'For higher-risk models', k: 'human' },
          { icon: 'lock', h: 'Inject secrets at runtime', d: 'Never baked into images or packages', k: 'data' },
          { icon: 'eye', h: 'Monitor and rotate', d: 'Alert on unusual use', k: 'threat' } ],
        say: 'Pipelines run on credentials, and those credentials are high-value targets. | Use workload identity and short-lived tokens, not static keys stored in pipeline settings. | Separate credentials for each stage, so a compromised training job can’t deploy to production. | Require approval, ideally from two people, for production deployments of higher-risk models. | Inject secrets into serving at runtime from a vault, and never bake them into container images or model packages. | And monitor credential use, rotating on schedule and on any suspicion.' },
      { t: 'summary', items: ['Gate releases on performance, safety, fairness and artefact scans', 'Package in safe formats; sign and record provenance', 'Serve on isolated, authenticated, rate-limited infrastructure', 'Short-lived, per-stage credentials; approvals for production'],
        say: 'To recap. | Gate every release on performance, safety, fairness, artefact scanning and provenance. | Package models in safe formats, then sign them and record how they were built. | Serve them on isolated, authenticated, rate-limited infrastructure. | And use short-lived, per-stage credentials, with approvals for production deployments.' } ] },
    { type: 'text', md: `### Pipeline stages and controls
| Stage | Key controls |
|---|---|
| **Train** | Isolated training environments; approved datasets pinned by hash (Module 3.3); recorded code commit, configuration and environment |
| **Validate** | Performance, safety, robustness and fairness test suites; artefact scanning for unsafe serialisation and embedded code; dependency scanning |
| **Package** | Safe weight formats (such as safetensors); minimal, scanned container images; SBOM and AIBOM generated |
| **Sign and attest** | Digital signatures on artefacts; provenance attestations describing how the model was built (for example, using SLSA-style provenance and Sigstore-based signing, as in the OpenSSF model signing specification) |
| **Register and approve** | Registry entry with evidence; approval by the right authority for the tier (Section 2) |
| **Deploy** | Deployment only of approved, verified versions; production approval; infrastructure as code; change records |
| **Serve** | Hardened inference servers; authentication and authorisation; rate limits and quotas; input size limits; network segmentation and restricted egress; no debug endpoints; prompt patching of the serving stack |

### Credential management
Pipeline credentials can deploy models, read training data and access production, so:
- Use **workload identity federation** and short-lived tokens instead of long-lived keys in pipeline settings.
- **Scope credentials per stage and environment**: training, validation, registry and production deployment each get their own.
- Require **approvals** for production deployments, with two-person review for higher-risk models.
- Inject **runtime secrets** (model API keys, database credentials) from a vault at start-up; never bake them into images, model packages or notebooks (Module 3.4).
- **Monitor** credential use and rotate regularly.

### Environment separation
Keep development, test and production separate, with production data kept out of development unless it is masked or synthetic. Promote **the same signed artefact** through environments, rather than rebuilding it at each stage, so what was tested is exactly what is deployed. Module 4.3 covers MLOps and LLMOps pipeline security in more depth.` },
    { type: 'check', q: { q: 'A training job’s service account also has permission to deploy models to production. What is the MAIN risk?', o: ['Training will run more slowly, because the account must keep checking its deployment permissions', 'A compromised or faulty training job could push an unapproved model straight to production', 'The account’s credentials will expire more often, because they are used for two purposes', 'Auditors won’t be able to tell which data scientist trained each model in the registry'], a: 1, b: 3,
      why: 'Combining training and deployment rights removes the separation that forces models through validation and approval. Per-stage credentials contain the impact of a compromised or faulty job.' } }
  ]
};
