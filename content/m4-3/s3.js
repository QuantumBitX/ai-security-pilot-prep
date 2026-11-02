/* 4.3 · Section 3: lineage tracking for fine-tuning */
module.exports = {
  title: 'Lineage tracking for fine-tuning', covers: [3],
  blocks: [
    { type: 'video', title: 'Every fine-tune has ancestors', kicker: 'Module 4.3 · Video 3 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.3 · MLOps security', title: 'Every fine-tune has ancestors', sub: 'Lineage tracking for fine-tuned models', icon: 'branch',
        say: 'A fine-tuned model is built from a base model, several datasets, some code and a set of choices, and it may itself become the parent of further models. When something goes wrong, you need that family tree. | This video covers lineage tracking for fine-tuning: what to record, how to capture it, and what it lets you do.' },
      { t: 'flow', title: 'A fine-tuned model’s family tree',
        nodes: [
          { id: 'base', x: 230, y: 330, icon: 'model', label: 'Base model', sub: 'version and hash', k: 'model', w: 270 },
          { id: 'd1', x: 230, y: 690, icon: 'database', label: 'Datasets', sub: 'snapshots by hash', k: 'data', w: 270 },
          { id: 'run', x: 680, y: 510, icon: 'gpu', label: 'Fine-tuning run', sub: 'code, settings, environment', k: 'neutral', w: 320 },
          { id: 'ad', x: 1120, y: 330, icon: 'layers', label: 'Adapter', sub: 'LoRA weights', k: 'human', w: 250 },
          { id: 'ev', x: 1120, y: 690, icon: 'check', label: 'Evaluations', sub: 'results and approval', k: 'control', w: 280 },
          { id: 'dep', x: 1420, y: 510, icon: 'server', label: 'Deployed model', sub: 'registry version', k: 'threat', w: 240 } ],
        edges: [{ from: 'base', to: 'run', k: 'model' }, { from: 'd1', to: 'run', k: 'data' }, { from: 'run', to: 'ad', k: 'neutral' }, { from: 'run', to: 'ev', k: 'neutral' }, { from: 'ad', to: 'dep', k: 'human' }, { from: 'ev', to: 'dep', k: 'control' }],
        steps: [
          { show: 'base', hi: 'base' },
          { show: 'd1', hi: 'd1' },
          { show: 'run base-run d1-run', flow: 'base-run d1-run', hi: 'run' },
          { show: 'ad run-ad', flow: 'run-ad', hi: 'ad' },
          { show: 'ev run-ev', flow: 'run-ev', hi: 'ev', mark: { ev: 'ok' } },
          { show: 'dep ad-dep ev-dep', flow: 'ad-dep ev-dep', hi: 'dep' } ],
        say: 'Here is a fine-tuned model’s family tree. It starts with a base model, recorded by exact version and hash. | Then the datasets used for tuning, each recorded as a snapshot with its own content hash, including any synthetic or preference data. | The fine-tuning run ties them together, recording the code commit, hyperparameters, container image and who launched it. | The run produces an adapter, such as a set of LoRA weights, or a fully tuned model. | It also produces evaluation results, linked to the approval decision. | And finally a deployed version in the registry, which can be traced back through every one of these links.' },
      { t: 'bullets', title: 'What lineage lets you answer', layout: 'grid', cols: 2, items: [
          { icon: 'bug', h: 'Which models used a bad dataset?', d: 'Poisoning or contamination response', k: 'threat' },
          { icon: 'user', h: 'Which models saw this person?', d: 'Erasure and access requests', k: 'human' },
          { icon: 'gavel', h: 'What licences flow downstream?', d: 'Base model and data terms', k: 'neutral' },
          { icon: 'cycle', h: 'Can we rebuild it exactly?', d: 'Reproducibility and audit', k: 'data' },
          { icon: 'rollback', h: 'What do we roll back to?', d: 'The last good ancestor', k: 'control' },
          { icon: 'doc', h: 'What must we document?', d: 'Technical documentation duties', k: 'model' } ],
        say: 'Lineage turns hard questions into simple queries. | If a dataset turns out to be poisoned or contaminated, which models, adapters and deployments used it? | If someone asks for erasure, which models were trained on their data? | Which licence terms from the base model and data flow down to this model? | Can we rebuild this model exactly, for an auditor or an investigation? | If a version misbehaves, what is the last good ancestor to roll back to? | And what must go into technical documentation, for example under the EU AI Act?' },
      { t: 'compare', title: 'Manual records and automatic capture', labels: ['How', 'Reliability', 'Effort'],
        cols: [{ h: 'Manual', icon: 'pen', k: 'threat' }, { h: 'Automatic', icon: 'pipeline', k: 'control' }],
        rows: [
          ['Spreadsheets and notes', 'Pipeline records every run'],
          ['Gaps, typos, drift', 'Complete and consistent'],
          ['High, and ongoing', 'Built once, then free'] ],
        say: 'Lineage only works if it is complete. | Manual records live in spreadsheets and notes, while automatic capture means the pipeline records every run as it happens. | Manual records develop gaps, typos and drift. Automatic capture is complete and consistent. | And manual effort is high and never ends, while automatic capture is built once into the pipeline and then costs almost nothing.' },
      { t: 'summary', items: ['Record base model, data snapshots, code, settings, environment and launcher', 'Link runs to adapters, evaluations, approvals and deployments', 'Lineage answers poisoning, erasure, licensing, rebuild and rollback questions', 'Capture it automatically in the pipeline, not by hand'],
        say: 'To recap. | Record the base model, data snapshots, code, settings, environment and who launched each fine-tuning run. | Link each run to its adapters, evaluations, approvals and deployments. | Lineage answers questions about poisoning, erasure, licensing, rebuilding and rollback. | And capture it automatically in the pipeline, never by hand.' } ] },
    { type: 'text', md: `### What to record for each fine-tuning run
| Element | Details to capture |
|---|---|
| **Base model** | Publisher, name, exact version, content hash, licence, source registry |
| **Data** | Dataset IDs and snapshot hashes for training, validation and test sets; filters and transformations applied; synthetic data and the model that generated it; preference or feedback data |
| **Code and configuration** | Repository commit, training script version, hyperparameters, random seeds, tokenizer version |
| **Environment** | Container image digest, library versions, hardware type |
| **Run metadata** | Run ID, start and end time, who or what launched it, approvals obtained |
| **Outputs** | Adapter or model hashes, checkpoints, evaluation results, model card updates |
| **Downstream links** | Merges with other models, adapters stacked on it, distilled models, deployments and the systems using them |

### Fine-tuning complicates lineage
- **Chains:** models are fine-tuned from already fine-tuned models, so lineage must be a graph that can be traversed through many generations.
- **Adapters:** LoRA and similar adapters are small files that may be combined with different base models; record each adapter’s base model and compatible versions.
- **Merges:** model merging combines several parents; record every parent and the merge method.
- **Synthetic and distilled data:** data generated by another model inherits that model’s licence terms and flaws, so record the generator.
- **Third-party fine-tuning services:** keep the provider’s job IDs, model versions and data retention terms in your records.

### Capturing lineage
Use the pipeline and platform to capture lineage automatically: experiment-tracking and model-registry tools record runs, parameters and artefacts; open standards such as **OpenLineage** describe data jobs; and **AIBOMs** (for example, CycloneDX’s machine learning bill of materials) describe a model’s components for sharing (Module 2.5). Make lineage records **immutable** and link them to signed artefacts (Module 3.6).

### Using lineage
- **Incident response:** when a dataset is found to be poisoned, query every model, adapter and deployment that descends from it (Domain 5).
- **Privacy requests:** identify every model trained on a person’s data, as the starting point for unlearning (Section 5).
- **Licensing:** trace the terms that apply to a deployed model through its base model and data.
- **Compliance:** the EU AI Act’s technical documentation for high-risk systems (Annex IV) expects a description of data, training methods and changes over the lifecycle.
- **Rollback:** identify the last known good ancestor (Module 3.5).` },
    { type: 'callout', kind: 'exam', title: 'Lineage questions', md: `When a question asks how to find **which models are affected** by a bad dataset, a leaked record or a licence problem, the answer is **lineage tracking** linked to the model registry and AIBOMs. The strongest options capture lineage **automatically** and immutably as part of the pipeline.` },
    { type: 'check', q: { q: 'Six months after release, a dataset used in several fine-tuning runs is found to contain poisoned records. What MOST quickly identifies every affected model and deployment?', o: ['Asking each data science team to recall which datasets they used in recent projects', 'Querying automatically captured lineage that links datasets, runs, models and deployments', 'Re-running evaluations on every model in production, looking for any sign of unusual behaviour', 'Searching shared drives for spreadsheets that mention the dataset’s name'], a: 1, b: 3,
      why: 'Automatically captured, linked lineage turns the question into a query across generations of models. Memory and spreadsheets are incomplete, and re-evaluation may miss poisoning designed to stay hidden.' } }
  ]
};
