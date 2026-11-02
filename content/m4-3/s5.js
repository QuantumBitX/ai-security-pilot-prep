/* 4.3 · Section 5: data unlearning capabilities for trained artefacts */
module.exports = {
  title: 'Building data unlearning into the pipeline', covers: [5],
  blocks: [
    { type: 'video', title: 'Designing for forgetting', kicker: 'Module 4.3 · Video 5 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.3 · MLOps security', title: 'Designing for forgetting', sub: 'Data unlearning capabilities for trained artefacts', icon: 'rollback',
        say: 'Deleting a record from a database takes seconds. Removing its influence from a trained model can take weeks, unless the pipeline was designed for it. | This video covers unlearning as an engineering capability: the workflow, the methods, and the design choices that make forgetting practical.' },
      { t: 'flow', title: 'An unlearning workflow',
        nodes: [
          { id: 'req', x: 220, y: 330, icon: 'user', label: 'Request or finding', sub: 'erasure, poisoning, licence', k: 'human', w: 300 },
          { id: 'lin', x: 640, y: 330, icon: 'branch', label: 'Lineage lookup', sub: 'every affected artefact', k: 'data', w: 290 },
          { id: 'rm', x: 1060, y: 330, icon: 'trash', label: 'Remove from data', sub: 'sets, indexes, caches', k: 'threat', w: 290 },
          { id: 'mth', x: 1340, y: 620, icon: 'gear', label: 'Unlearn per artefact', sub: 'method by risk', k: 'model', w: 280 },
          { id: 'ver', x: 920, y: 740, icon: 'search', label: 'Verify', sub: 'extraction tests', k: 'control', w: 250 },
          { id: 'rec', x: 470, y: 700, icon: 'doc', label: 'Record evidence', sub: 'what, how, when', k: 'neutral', w: 280 } ],
        edges: [{ from: 'req', to: 'lin', k: 'human' }, { from: 'lin', to: 'rm', k: 'data' }, { from: 'rm', to: 'mth', k: 'threat' }, { from: 'mth', to: 'ver', k: 'model' }, { from: 'ver', to: 'rec', k: 'control' }],
        steps: [
          { show: 'req', hi: 'req' },
          { show: 'lin req-lin', flow: 'req-lin', hi: 'lin' },
          { show: 'rm lin-rm', flow: 'lin-rm', hi: 'rm' },
          { show: 'mth rm-mth', flow: 'rm-mth', hi: 'mth' },
          { show: 'ver mth-ver', flow: 'mth-ver', hi: 'ver', mark: { ver: 'ok' } },
          { show: 'rec ver-rec', flow: 'ver-rec', hi: 'rec' } ],
        say: 'Unlearning is a workflow, not a single technique. It starts with a trigger: an erasure request, a poisoned dataset, or data that turns out to be unlicensed. | Lineage identifies every affected artefact: datasets, fine-tunes, adapters, retrieval indexes, caches and distilled models. | The data itself is removed from training sets, indexes and caches, so it can’t be used again. | Then each trained artefact is dealt with, using a method chosen by risk. | The result is verified, for example by testing whether the model can still reproduce or reveal the data. | And evidence is recorded: what was removed, how, from which versions, and when.' },
      { t: 'compare', title: 'Unlearning methods', labels: ['How', 'Assurance', 'Cost'],
        cols: [{ h: 'Retrain', icon: 'cycle', k: 'control' }, { h: 'Shard or adapter', icon: 'layers', k: 'data' }, { h: 'Approximate', icon: 'sliders', k: 'human' }],
        rows: [
          ['From a checkpoint, without the data', 'Retrain only the affected part', 'Adjust weights to forget'],
          ['Highest', 'High', 'Uncertain; verify'],
          ['Highest', 'Moderate', 'Lowest'] ],
        say: 'There are three broad families of method. | Retrain from a clean checkpoint without the data. Retrain only the affected shard or adapter. Or adjust the weights directly so the model forgets, which is approximate unlearning. | Retraining gives the highest assurance. Retraining a shard or adapter gives high assurance, if the data really was confined there. Approximate methods give uncertain assurance, so they must be verified. | And the costs run the other way: retraining is the most expensive, partial retraining is moderate, and approximate unlearning is the cheapest.' },
      { t: 'bullets', title: 'Design choices that make forgetting practical', layout: 'grid', cols: 2, items: [
          { icon: 'database', h: 'Personal data in retrieval', d: 'Delete from the index, not the weights', k: 'data' },
          { icon: 'layers', h: 'Adapters per customer', d: 'Delete or retrain one adapter', k: 'human' },
          { icon: 'split', h: 'Sharded training', d: 'Retrain one shard, not all', k: 'model' },
          { icon: 'archive', h: 'Checkpoints and snapshots', d: 'Restart from before the data', k: 'neutral' },
          { icon: 'filter', h: 'Minimise and de-identify', d: 'Less to forget in the first place', k: 'control' },
          { icon: 'calendar', h: 'Scheduled retraining', d: 'A deletion queue feeds each cycle', k: 'threat' } ],
        say: 'Forgetting is cheap if you plan for it. | Keep personal data in retrieval systems rather than in weights, so deletion from the index is immediate. | Use separate adapters per customer or tenant, so one can be deleted or retrained on its own. | Shard training data, so only one shard needs retraining. | Keep checkpoints and data snapshots, so you can restart from a point before the data arrived. | Minimise and de-identify training data, so there is less to forget in the first place. | And schedule regular retraining, with a deletion queue that feeds each cycle.' },
      { t: 'summary', items: ['Unlearning is a workflow: lineage, remove, unlearn, verify, record', 'Retrain for highest assurance; shards and adapters limit cost', 'Approximate methods are cheap but must be verified', 'Design for forgetting: retrieval, adapters, shards, checkpoints'],
        say: 'To recap. | Unlearning is a workflow: find affected artefacts through lineage, remove the data, unlearn, verify and record. | Retraining gives the highest assurance, and shards or adapters limit what has to be retrained. | Approximate methods are cheap, but their results must be verified. | And design for forgetting from the start, with retrieval, adapters, sharding and checkpoints.' } ] },
    { type: 'text', md: `### Why unlearning is an engineering capability
Module 3.2 covers the privacy obligations (erasure requests and their limits) and introduces SISA training. Here the focus is on building the capability into MLOps, because triggers for unlearning include more than privacy:
- **Erasure requests** for personal data used in training.
- **Poisoned or corrupted data** discovered after training (Module 3.3).
- **Unlicensed or withdrawn data**, such as content whose licence was revoked or a dataset withdrawn for illegal content (Module 3.7).
- **Hazardous knowledge** a model should not retain.

### Methods
| Method | Description | When to use |
|---|---|---|
| **Full retraining** | Retrain from scratch, or from a checkpoint taken before the data was added, without the data | Highest assurance; feasible for smaller models or regular retraining cycles |
| **Shard retraining (SISA)** | Data is split into shards, each training a sub-model; retrain only the affected shard | Systems designed for frequent deletion requests |
| **Adapter retraining or removal** | If the data was used only to train an adapter, retrain or delete that adapter | Fine-tuned LLMs with per-task or per-customer adapters |
| **Approximate unlearning** | Techniques such as gradient ascent on the data to forget, or targeted fine-tuning, reduce its influence without full retraining | Large models where retraining is impractical; always verify |
| **Output suppression** | Filters stop the model producing specific information | An interim measure only; the information is still in the weights |

### Verification and its limits
- Test whether the model can still **reproduce, complete or reveal** the forgotten data, using extraction prompts, membership inference tests and canaries planted in the data beforehand (Module 3.3).
- Check that general performance hasn’t degraded too far.
- Research has shown that some approximate methods **hide rather than remove** knowledge, which can resurface after a small amount of further fine-tuning. Benchmarks such as TOFU (forgetting fictitious authors) and WMDP (hazardous knowledge) are used to evaluate methods. Treat approximate unlearning as risk reduction, not proof.

### Building the capability
1. **Lineage** linking data subjects or records to datasets, runs, adapters and deployments (Section 3).
2. **A deletion queue** that removes data from training sets, indexes, caches, logs and backups on schedule.
3. **Architecture for forgetting:** personal data in retrieval rather than weights, adapters per tenant, sharding where requests are frequent, retained checkpoints.
4. **Agreed methods and timelines** per model tier, documented in policy (for example, interim suppression within days, retraining at the next scheduled cycle).
5. **Propagation:** downstream artefacts such as distilled models, merges and synthetic data generated from the original also need handling.
6. **Evidence** of what was done, for regulators and data subjects.` },
    { type: 'callout', kind: 'exam', title: 'Unlearning questions', md: `Expect the best answer to be **proportionate and verifiable**: remove the data everywhere it is stored now, use interim suppression if needed, and unlearn or retrain on a defined timeline, with evidence. Designs that keep personal data **out of model weights** (retrieval, adapters, de-identification) are usually preferred.` },
    { type: 'scenario', title: 'Closed the same day', md: `A recruitment platform fine-tuned a language model on thousands of CVs. A candidate asks for their data to be erased. The team runs an approximate unlearning method against the candidate’s CV, sees that the model no longer answers a direct question about them, and closes the request the same afternoon.`,
      q: { q: 'What is the MAIN weakness of this response?', o: ['Approximate unlearning methods are never permitted under data protection law', 'It wasn’t properly verified, so the data may still be recoverable from the model', 'The request should have been refused, because CVs are public documents anyway', 'Approximate unlearning also deletes the base model, so the service will fail'], a: 1, b: 5,
        why: 'One direct question is not verification: approximate methods can hide rather than remove knowledge. The team should test with extraction and membership inference methods, record evidence, and consider retraining if tests fail.' } },
    { type: 'check', q: { q: 'A software company fine-tunes one shared model on support tickets from all its business customers. Several customers now require that their data can be removed from any model on request. Which design change BEST supports this?', o: ['Keep the shared model, and add an output filter that blocks each customer’s company name', 'Train a separate adapter for each customer, so one can be deleted or retrained on its own', 'Retrain the shared model from scratch every time any customer asks for removal', 'Ask customers to remove sensitive details from their tickets before uploading them'], a: 1, b: 5,
      why: 'Per-customer adapters confine each customer’s data to an artefact that can be deleted or retrained independently, with high assurance and low cost. Output filters leave the data in the weights, full retraining for every request is costly, and asking customers to sanitise data doesn’t meet the requirement.' } }
  ]
};
