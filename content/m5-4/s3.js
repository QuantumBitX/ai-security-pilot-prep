/* 5.4 · Section 3: patch management for AI pipelines, dependencies and open-source components */
module.exports = {
  title: 'Patch management for AI pipelines and dependencies', covers: [3],
  blocks: [
    { type: 'video', title: 'Keeping the AI stack patched', kicker: 'Module 5.4 · Video 3 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.4 · Vulnerabilities and posture', title: 'Keeping the AI stack patched', sub: 'Patch management for pipelines, dependencies and open-source components', icon: 'layers',
        say: 'AI systems are built from a deep stack of fast-moving, often open-source components. Many have had serious vulnerabilities, and attackers have exploited some of them quickly. | This video covers patch management for AI pipelines, dependencies and open-source components.' },
      { t: 'layers', title: 'The AI patch surface',
        layers: [
          { icon: 'gpu', label: 'Hardware, drivers and OS', sub: 'GPU drivers, CUDA, kernels', k: 'neutral' },
          { icon: 'container', label: 'Containers and images', sub: 'Base images, system packages', k: 'data' },
          { icon: 'server', label: 'Frameworks and serving', sub: 'Training libraries, inference servers', k: 'model' },
          { icon: 'box', label: 'Libraries and agent tooling', sub: 'Orchestration, connectors, MCP servers', k: 'human' },
          { icon: 'model', label: 'Models', sub: 'Provider versions, fine-tunes, open weights', k: 'threat' },
          { icon: 'pipeline', label: 'Pipelines', sub: 'CI actions, runners, build tools', k: 'control' } ],
        say: 'The AI patch surface has six layers. | Hardware, drivers and operating systems, including GPU drivers and CUDA libraries. | Containers and images, with their base images and system packages. | Frameworks and serving: training libraries and inference servers. | Libraries and agent tooling: orchestration frameworks, connectors and MCP servers. | Models themselves: provider versions, fine-tunes and open-weight models, which receive updates too. | And pipelines: the CI actions, runners and build tools that produce everything else.' },
      { t: 'timeline', title: 'AI components under attack', events: [
          { y: '2024', h: 'ShadowRay', d: 'Exposed Ray clusters exploited' },
          { y: '2024', h: 'Ollama', d: 'Path traversal to code execution' },
          { y: '2025', h: 'PyTorch', d: 'Safe-loading option bypassed' },
          { y: '2025', h: 'Langflow', d: 'Unauthenticated code execution, in KEV' },
          { y: '2025', h: 'Triton', d: 'Flaw chain to server takeover' } ],
        say: 'Recent history shows why this matters. | In 2024, researchers reported attackers exploiting exposed Ray clusters, a popular framework for distributed AI workloads, in a campaign called ShadowRay. | Also in 2024, a path traversal flaw in Ollama, a tool for running models locally, could lead to remote code execution. | In 2025, PyTorch fixed a flaw that let malicious model files run code even when loaded with its safer loading option. | Langflow, a low-code tool for building AI agents, had an unauthenticated code execution flaw that CISA added to its known exploited catalogue. | And researchers showed a chain of flaws in NVIDIA’s Triton Inference Server that could let a remote, unauthenticated attacker take over the server.' },
      { t: 'flow', title: 'A patch process for AI',
        nodes: [
          { id: 'inv', x: 230, y: 330, icon: 'list', label: 'Inventory', sub: 'SBOM and AIBOM', k: 'data', w: 280 },
          { id: 'mon', x: 700, y: 330, icon: 'eye', label: 'Monitor advisories', sub: 'matched to assets', k: 'neutral', w: 320 },
          { id: 'pri', x: 1200, y: 330, icon: 'target', label: 'Prioritise', sub: 'context and consequence', k: 'threat', w: 320 },
          { id: 'test', x: 1200, y: 690, icon: 'check', label: 'Test', sub: 'functional and evaluations', k: 'human', w: 320 },
          { id: 'roll', x: 700, y: 690, icon: 'branch', label: 'Staged rollout', sub: 'canary, then wider', k: 'control', w: 300 },
          { id: 'ver', x: 230, y: 690, icon: 'audit', label: 'Verify and record', sub: 'rollback ready', k: 'model', w: 300 } ],
        edges: [{ from: 'inv', to: 'mon', k: 'data' }, { from: 'mon', to: 'pri', k: 'neutral' }, { from: 'pri', to: 'test', k: 'threat' }, { from: 'test', to: 'roll', k: 'human' }, { from: 'roll', to: 'ver', k: 'control' }],
        steps: [
          { show: 'inv', hi: 'inv' },
          { show: 'mon inv-mon', flow: 'inv-mon', hi: 'mon' },
          { show: 'pri mon-pri', flow: 'mon-pri', hi: 'pri' },
          { show: 'test pri-test', flow: 'pri-test', hi: 'test' },
          { show: 'roll test-roll', flow: 'test-roll', hi: 'roll' },
          { show: 'ver roll-ver', flow: 'roll-ver', hi: 'ver', mark: { ver: 'ok' } } ],
        say: 'A patch process for AI has six steps. It starts with an inventory: software and AI bills of materials, showing every component and version in every deployment. | Advisories are monitored and matched automatically to the inventory. | Each match is prioritised by context and consequence. | Patches are tested: functional tests for software, plus model evaluations, because a framework update can change model behaviour. | Rollout is staged: a canary first, then wider, with health and safety metrics watched. | And the result is verified and recorded, with the previous version kept ready for rollback.' },
      { t: 'compare', title: 'Patching software and updating models', labels: ['What changes', 'Testing', 'Main risk', 'Rollback'],
        cols: [{ h: 'Software patch', icon: 'code', k: 'neutral' }, { h: 'Model update', icon: 'model', k: 'model' }],
        rows: [
          ['Code; behaviour should stay the same', 'Weights; behaviour will change'],
          ['Functional and security tests', 'Quality, safety and fairness evaluations'],
          ['Breaking changes', 'Safety or accuracy regressions'],
          ['Previous package version', 'Previous signed model version'] ],
        say: 'Patching software and updating models are different. | A software patch changes code, and behaviour should stay the same. A model update changes weights, and behaviour will change. | Software patches need functional and security tests. Model updates need quality, safety and fairness evaluations. | The main risk of a software patch is a breaking change. The main risk of a model update is a regression in safety or accuracy. | And rollback means reinstalling the previous package version, or redeploying the previous signed model version.' },
      { t: 'summary', items: ['Patch every layer: drivers, images, frameworks, tooling, models, pipelines', 'Match advisories to an SBOM and AIBOM automatically', 'Test software functionally and models with evaluations', 'Stage rollouts; keep rollback ready; use virtual patches meanwhile'],
        say: 'To recap. | Patch every layer of the AI stack: drivers, images, frameworks, agent tooling, models and pipelines. | Match advisories automatically against software and AI bills of materials. | Test software functionally, and test model behaviour with evaluations. | And stage rollouts with rollback ready, using virtual patches such as gateway rules while a fix is prepared.' } ] },
    { type: 'text', md: `### Know what you run
- **SBOM and AIBOM:** generate bills of materials for every build, including Python packages, system libraries, containers, models and datasets. CycloneDX (including its machine learning BOM) and SPDX 3.0 (with AI and dataset profiles) support AI components (Module 6.3).
- **Pin and verify:** pin versions and hashes for packages, base images, models and CI actions, so you know exactly what changed when you patch (Module 3.7).
- **Use controlled sources:** internal package mirrors and model registries let you block known-bad versions centrally.

### Recent examples
| Component | Issue | Lesson |
|---|---|---|
| **Ray** (distributed AI computing) | CVE-2023-48022: unauthenticated job submission. The vendor disputed it, saying Ray should only run in trusted networks, but exposed clusters were exploited in the "ShadowRay" campaign reported in 2024 | Exposure turns a design assumption into a vulnerability |
| **Ollama** (local model runner) | CVE-2024-37032 ("Probllama"): path traversal leading to code execution, fixed in 2024 | Popular tools spread fast and get exposed accidentally |
| **PyTorch** | CVE-2025-32434: code execution through malicious model files even with \`weights_only=True\`, fixed in version 2.6.0 | Loading untrusted models is risky; prefer safetensors and keep frameworks patched |
| **Langflow** (agent builder) | CVE-2025-3248: unauthenticated code execution, fixed in 1.3.0 and added to CISA KEV in May 2025 | Agent-building tools are internet-facing targets |
| **NVIDIA Triton Inference Server** | CVE-2025-23319 and related flaws in the Python backend, chainable to remote takeover by an unauthenticated attacker; fixed in release 25.07 | Inference servers hold models and data worth stealing |

### Patching well
- **Prioritise by context** (Section 2) and set target timescales by priority.
- **Test both behaviour and function:** framework, driver or tokenizer updates can subtly change model outputs, so run evaluation suites, including safety regression tests, before rollout (Module 5.6).
- **Stage rollouts:** canary or shadow deployments, with automatic rollback on error, latency or safety metric breaches (Module 6.2).
- **Rebuild, don’t patch in place:** rebuild containers from patched base images through the pipeline, so production matches what was tested.
- **Hosted models:** track provider deprecation schedules and security notices, pin versions, and test replacements before forced migrations.
- **Virtual patching:** when a fix isn’t possible yet, block the vulnerable path at the gateway or network, restrict exposure and increase monitoring (Section 4).
- **Emergency path:** for known exploited, internet-facing flaws, use the emergency change process (Module 5.1), with review afterwards.` },
    { type: 'flip', title: 'Patch management terms', cards: [
      ['SBOM', 'Software bill of materials: a machine-readable list of the components and versions in a build.'],
      ['AIBOM', 'AI bill of materials: an SBOM extended to models, datasets and AI-specific dependencies.'],
      ['Virtual patch', 'A control that blocks exploitation of a flaw, such as a gateway rule, while the real fix is prepared.'],
      ['Safety regression test', 'An evaluation run before release to confirm an update hasn’t weakened safety behaviour.'],
      ['safetensors', 'A model file format that stores weights without executable code, unlike Python pickle-based formats.'] ] },
    { type: 'callout', kind: 'exam', title: 'Patch questions', md: `Look for **inventory-driven** patching (SBOM and AIBOM), **context-based prioritisation**, **testing that includes model evaluations**, **staged rollout with rollback** and **virtual patching** when a fix must wait. Patching production directly without testing, or waiting for the next quarterly cycle for a known exploited flaw, are wrong answers.` },
    { type: 'check', q: { q: 'A security patch for the inference framework behind a customer chatbot is released. Which rollout approach is BEST?', o: ['Apply it directly to all production servers at once, to close the flaw as fast as possible', 'Test functionally and with model evaluations, then canary it with rollback ready', 'Wait for the next quarterly maintenance window, to reduce the number of changes', 'Ask the vendor to apply the patch on the organisation’s behalf when it has capacity'], a: 1, b: 3,
      why: 'Testing both function and model behaviour, then rolling out gradually with rollback ready, closes the flaw quickly without risking a broken or less safe chatbot. Direct production changes skip testing, quarterly waits leave it exposed, and handing it to the vendor gives up control.' } }
  ]
};
