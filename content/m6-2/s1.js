/* 6.2 · Section 1: security integration across the AI/ML pipeline and CI/CD (MLOps/LLMOps) */
module.exports = {
  title: 'Security across the AI development lifecycle', covers: [1],
  blocks: [
    { type: 'video', title: 'Building security into MLOps and LLMOps', kicker: 'Module 6.2 · Video 1 of 4', scenes: [
      { t: 'title', kicker: 'Module 6.2 · Secure AI lifecycle', title: 'Building security into MLOps and LLMOps', sub: 'Security across the AI development lifecycle', icon: 'cycle',
        say: 'Security bolted on at the end of an AI project is expensive and weak. Security built into every stage of the lifecycle, and automated in the pipelines, is cheaper and much harder to bypass. | This video covers integrating security across the AI development lifecycle, in both MLOps and LLMOps.' },
      { t: 'cycle', title: 'The secure AI development lifecycle', center: 'AIDLC', centerSub: 'security at every stage', intro: 'Each stage has its own security activities.',
        stages: [
          { icon: 'flag', label: 'Plan and design', d: 'Use case risk, threat model, requirements.' },
          { icon: 'database', label: 'Data', d: 'Provenance, consent, validation, protection.' },
          { icon: 'gpu', label: 'Build and train', d: 'Secure code, isolated training, lineage.' },
          { icon: 'check', label: 'Evaluate', d: 'Quality, safety, fairness, security tests.' },
          { icon: 'pipeline', label: 'Release', d: 'Signed artefacts, approval, staged rollout.' },
          { icon: 'eye', label: 'Operate and retire', d: 'Monitoring, response, decommissioning.' } ],
        say: 'The secure AI development lifecycle has six stages, each with its own security activities. | Plan and design: assess the use case’s risk, threat model the architecture and set security requirements. | Data: verify provenance and consent, validate quality and protect sensitive data. | Build and train: write secure code, train in isolated environments and record lineage. | Evaluate: test quality, safety, fairness and security against agreed thresholds. | Release: sign artefacts, approve according to risk and roll out in stages. | Operate and retire: monitor, respond to incidents and decommission securely. | Then the cycle repeats, because every retraining or major change goes round again.' },
      { t: 'compare', title: 'MLOps and LLMOps', labels: ['Main artefact', 'What changes', 'Key tests', 'Extra assets'],
        cols: [{ h: 'MLOps', icon: 'gear', k: 'neutral' }, { h: 'LLMOps', icon: 'chat', k: 'model' }],
        rows: [
          ['A model you train', 'A model you often consume'],
          ['Data and retraining', 'Prompts, retrieval, tools'],
          ['Accuracy, drift, fairness', 'Safety, injection, grounding'],
          ['Features, datasets', 'Prompts, indexes, guardrails'] ],
        say: 'MLOps and LLMOps share principles but differ in emphasis. | In MLOps, the main artefact is usually a model you train yourself. In LLMOps, it is often a model you consume from a provider or open source. | MLOps changes come mostly from data and retraining. LLMOps changes come from prompts, retrieval sources and tools, often weekly. | MLOps testing focuses on accuracy, drift and fairness. LLMOps adds safety, injection resistance and grounding. | And LLMOps has extra assets to secure: prompt templates, retrieval indexes and guardrail configurations.' },
      { t: 'flow', title: 'Security gates in an AI pipeline',
        nodes: [
          { id: 'code', x: 230, y: 330, icon: 'code', label: 'Commit', sub: 'code, prompts, configs', k: 'neutral', w: 300 },
          { id: 'ci', x: 700, y: 330, icon: 'search', label: 'CI scans', sub: 'secrets, SAST, dependencies', k: 'data', w: 330 },
          { id: 'mod', x: 1200, y: 330, icon: 'model', label: 'Artefact checks', sub: 'model and data scans', k: 'model', w: 300 },
          { id: 'eval', x: 1200, y: 690, icon: 'check', label: 'Evaluation gate', sub: 'safety, security, quality', k: 'control', w: 320 },
          { id: 'sign', x: 700, y: 690, icon: 'pen', label: 'Sign and approve', sub: 'provenance, risk sign-off', k: 'human', w: 320 },
          { id: 'dep', x: 230, y: 690, icon: 'branch', label: 'Staged deploy', sub: 'admission check, canary', k: 'threat', w: 300 } ],
        edges: [{ from: 'code', to: 'ci', k: 'neutral' }, { from: 'ci', to: 'mod', k: 'data' }, { from: 'mod', to: 'eval', k: 'model' }, { from: 'eval', to: 'sign', k: 'control' }, { from: 'sign', to: 'dep', k: 'human' }],
        steps: [
          { show: 'code', hi: 'code' },
          { show: 'ci code-ci', flow: 'code-ci', hi: 'ci' },
          { show: 'mod ci-mod', flow: 'ci-mod', hi: 'mod' },
          { show: 'eval mod-eval', flow: 'mod-eval', hi: 'eval', mark: { eval: 'ok' } },
          { show: 'sign eval-sign', flow: 'eval-sign', hi: 'sign', mark: { sign: 'lock' } },
          { show: 'dep sign-dep', flow: 'sign-dep', hi: 'dep' } ],
        say: 'Here is how security gates fit into an AI pipeline. Every change starts as a commit: code, prompt templates and configuration all live in version control. | Continuous integration scans for secrets, code weaknesses and vulnerable dependencies. | Artefact checks scan model files for unsafe formats and verify dataset hashes and licences. | An evaluation gate runs safety, security and quality suites, and blocks the release if thresholds aren’t met. | Passing artefacts are signed, with provenance, and approved according to risk. | And deployment is staged, with admission checks that accept only signed, approved artefacts.' },
      { t: 'bullets', title: 'Frameworks for a secure AI lifecycle', layout: 'grid', cols: 2, items: [
          { icon: 'book', h: 'NIST SP 800-218A', d: 'SSDF profile for generative AI', k: 'data' },
          { icon: 'flag', h: 'UK AI Cyber Security Code', d: 'Principles from design to end of life', k: 'human' },
          { icon: 'doc', h: 'ETSI TS 104 223', d: 'Baseline requirements for AI', k: 'neutral' },
          { icon: 'cycle', h: 'ISO/IEC 5338', d: 'AI system life cycle processes', k: 'model' },
          { icon: 'shield', h: 'Google SAIF', d: 'Secure AI Framework', k: 'control' },
          { icon: 'globe', h: 'OWASP AI Exchange', d: 'Open guidance on AI security', k: 'threat' } ],
        say: 'Six frameworks help structure a secure AI lifecycle. | NIST special publication 800-218A, a profile of the secure software development framework for generative AI and foundation models. | The UK’s AI Cyber Security Code of Practice, with principles from secure design to end of life. | ETSI technical specification 104 223, which turned those principles into baseline requirements. | ISO/IEC 5338, which defines AI system life cycle processes. | Google’s Secure AI Framework. | And the OWASP AI Exchange, an open body of guidance on AI security.' },
      { t: 'summary', items: ['Security activities at every lifecycle stage', 'LLMOps adds prompts, indexes, guardrails and tools to secure', 'Automate gates: scans, evaluations, signing, admission', 'Use SSDF 800-218A, UK Code, ETSI, ISO/IEC 5338'],
        say: 'To recap. | Build security activities into every stage of the AI lifecycle, from planning to retirement. | Remember that LLMOps adds prompts, retrieval indexes, guardrails and tools to the assets you must secure. | Automate the gates: scans, evaluations, signing and admission checks. | And structure the programme with frameworks such as NIST SP 800-218A, the UK Code of Practice, ETSI TS 104 223 and ISO/IEC 5338.' } ] },
    { type: 'text', md: `### Security activities by lifecycle stage
| Stage | Key security activities |
|---|---|
| **Plan and design** | Use case risk assessment and tiering (Module 2.3); threat modelling (Module 6.1); security, privacy and safety requirements; architecture review (Module 4.1) |
| **Data** | Provenance and licensing checks; consent and lawful basis; validation and poisoning defences; minimisation, masking and access control (Domain 3) |
| **Build and train** | Secure coding for pipelines and agents; isolated training environments; pinned and scanned dependencies; lineage and experiment tracking (Module 4.3) |
| **Evaluate** | Quality, robustness, fairness and safety evaluations; security testing and red teaming (Module 6.4); documented results in the model card |
| **Release** | Signed artefacts with provenance (SLSA); risk-based approval; admission control; staged rollout with rollback (Section 4) |
| **Operate** | Telemetry, detection and response (Domain 5); configuration and drift control (Module 5.1); vulnerability management (Module 5.4) |
| **Retire** | Secure decommissioning and disposal (Module 5.7) |

### MLOps and LLMOps security
- **MLOps** (operations for trained models): feature and dataset versioning, training pipeline integrity, model registries, drift monitoring and retraining controls.
- **LLMOps** (operations for applications built on large language models): **prompt management** (versioned, reviewed templates), **evaluation harnesses** for safety, injection and grounding, **guardrail configuration**, **RAG ingestion and index pipelines**, **tool and agent definitions**, and **provider version management**.
- In both, treat every artefact that changes behaviour as code: versioned, reviewed, tested and deployed through the pipeline.

### Frameworks
- **NIST SP 800-218A** (July 2024) adds AI-specific practices to the Secure Software Development Framework for generative AI and dual-use foundation models, such as protecting training data and model weights and testing for AI-specific vulnerabilities.
- **The UK AI Cyber Security Code of Practice** (January 2025) sets 13 principles across five phases: secure design, secure development, secure deployment, secure maintenance and secure end of life. **ETSI TS 104 223** (2025) built on it to create baseline security requirements for AI models and systems.
- **ISO/IEC 5338** defines life cycle processes for AI systems, based on ISO/IEC/IEEE 15288 and 12207.
- **Google SAIF** and the **OWASP AI Exchange** provide practical control guidance (Module 4.1).` },
    { type: 'match', title: 'Which lifecycle stage?', pairs: [
      ['Checking the licence and provenance of a scraped dataset', 'Data'],
      ['Running injection and jailbreak suites before release', 'Evaluate'],
      ['Requiring signed model artefacts at deployment', 'Release'],
      ['Threat modelling a proposed agent architecture', 'Plan and design'],
      ['Detecting configuration drift in production', 'Operate'] ] },
    { type: 'scenario', title: 'The fast-moving assistant team', md: `A product team ships changes to its customer assistant several times a week. Code goes through CI with secret scanning, but new model versions are downloaded from a public hub and loaded directly, evaluation is "a quick try in the playground", and prompt changes are pasted into production by whoever is on duty. Last month, a prompt change caused the assistant to reveal internal pricing rules.`,
      q: { q: 'Which improvement would MOST reduce the risk of similar problems?', o: ['Slow releases down to once a quarter, so each one can be reviewed by hand', 'Pipeline gates for models and prompts: artefact scans, evaluations, signing, approval', 'Ask the person on duty to double-check prompt changes before pasting them in', 'Stop using models from public hubs and train every model in-house instead'], a: 1, b: 1,
        why: 'Automated gates for every behaviour-changing artefact catch unsafe models and prompts before production, without stopping frequent releases. Quarterly releases sacrifice agility, self-checks are unreliable, and training everything in-house is disproportionate.' } },
    { type: 'callout', kind: 'exam', title: 'Lifecycle questions', md: `Expect the best answer to put security **into every stage** and **into the pipeline** as automated, enforceable gates (scans, evaluations, signing, admission), rather than relying on a manual review at the end. For LLM applications, remember that **prompts, retrieval indexes, guardrails and tool definitions** are artefacts that need versioning, testing and approval too.` },
    { type: 'check', q: { q: 'An LLM application team changes its system prompt and retrieval sources weekly, directly in production, while its model releases go through a formal pipeline. What is the MOST important improvement?', o: ['Freeze all prompt and retrieval changes, so the application never changes after launch', 'Manage prompts and retrieval configuration as code, through the same tested pipeline', 'Ask the team to email a summary of each weekly change to the security team', 'Move the model releases out of the pipeline so that both are handled the same way'], a: 1, b: 1,
      why: 'Prompts and retrieval settings change behaviour as much as model releases, so they need versioning, testing and approval through the pipeline. Freezing them blocks legitimate improvement, emails don’t control anything, and weakening the model process makes things worse.' } }
  ]
};
