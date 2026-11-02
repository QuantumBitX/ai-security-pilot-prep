/* 5.7 · Section 5: secure decommissioning, disposal and remediation (machine unlearning, model termination) */
module.exports = {
  title: 'Secure decommissioning, disposal and remediation', covers: [5],
  blocks: [
    { type: 'video', title: 'Retiring AI safely', kicker: 'Module 5.7 · Video 5 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.7 · Recovery and continuity', title: 'Retiring AI safely', sub: 'Decommissioning, disposal, unlearning and model termination', icon: 'trash',
        say: 'Every AI system eventually ends: replaced, failed, unlawful or simply no longer needed. A model that is switched off but not properly retired leaves keys, data and copies behind. | This video covers secure decommissioning and disposal, and remediation through machine unlearning and model termination.' },
      { t: 'bullets', title: 'What decommissioning must cover', layout: 'grid', cols: 2, items: [
          { icon: 'network', h: 'Endpoints and integrations', d: 'APIs, apps, agents that call it', k: 'neutral' },
          { icon: 'key', h: 'Credentials and identities', d: 'Keys, agent identities, tool grants', k: 'threat' },
          { icon: 'model', h: 'Model artefacts', d: 'Weights, checkpoints, fine-tunes', k: 'model' },
          { icon: 'database', h: 'Data', d: 'Training sets, embeddings, logs, caches', k: 'data' },
          { icon: 'book', h: 'Records', d: 'Registry, inventory, AIBOM, model card', k: 'control' },
          { icon: 'users', h: 'Dependants', d: 'Users and downstream systems', k: 'human' } ],
        say: 'Decommissioning has six parts. | Endpoints and integrations: the APIs, applications and agents that call the model. | Credentials and identities: API keys, agent identities and tool grants that must be revoked. | Model artefacts: weights, checkpoints and fine-tuned versions, including copies held by providers. | Data: training sets, embeddings, vector stores, logs and caches. | Records: the registry, inventory, AI bill of materials and model card, updated to show the system is retired. | And dependants: the users and downstream systems that relied on it, who need notice and an alternative.' },
      { t: 'flow', title: 'A decommissioning sequence',
        nodes: [
          { id: 'dec', x: 230, y: 330, icon: 'pen', label: 'Decide and notify', sub: 'owner approval, notice', k: 'neutral', w: 320 },
          { id: 'stop', x: 700, y: 330, icon: 'stop', label: 'Stop traffic', sub: 'switch to replacement', k: 'threat', w: 300 },
          { id: 'rev', x: 1200, y: 330, icon: 'key', label: 'Revoke access', sub: 'keys, identities, grants', k: 'human', w: 310 },
          { id: 'arc', x: 1200, y: 690, icon: 'archive', label: 'Archive or destroy', sub: 'per retention and holds', k: 'data', w: 320 },
          { id: 'san', x: 700, y: 690, icon: 'shieldcheck', label: 'Sanitise and verify', sub: 'including providers', k: 'control', w: 320 },
          { id: 'rec', x: 230, y: 690, icon: 'audit', label: 'Update records', sub: 'retired; certificate', k: 'model', w: 300 } ],
        edges: [{ from: 'dec', to: 'stop', k: 'neutral' }, { from: 'stop', to: 'rev', k: 'threat' }, { from: 'rev', to: 'arc', k: 'human' }, { from: 'arc', to: 'san', k: 'data' }, { from: 'san', to: 'rec', k: 'control' }],
        steps: [
          { show: 'dec', hi: 'dec' },
          { show: 'stop dec-stop', flow: 'dec-stop', hi: 'stop' },
          { show: 'rev stop-rev', flow: 'stop-rev', hi: 'rev', mark: { rev: 'lock' } },
          { show: 'arc rev-arc', flow: 'rev-arc', hi: 'arc' },
          { show: 'san arc-san', flow: 'arc-san', hi: 'san' },
          { show: 'rec san-rec', flow: 'san-rec', hi: 'rec', mark: { rec: 'ok' } } ],
        say: 'A secure decommissioning follows six steps. The model owner approves retirement, and users and dependent teams are given notice. | Traffic stops: endpoints are disabled and callers switch to the replacement. | Access is revoked: API keys, agent identities, tool grants and service accounts. | Artefacts and data are archived or destroyed, according to retention rules and any legal holds. | Storage is sanitised and the result verified, including deletion confirmations from providers that hold fine-tunes or uploaded data. | And records are updated: the registry marks the model as retired, the inventory and AI bill of materials change, and a certificate of sanitisation is filed.' },
      { t: 'compare', title: 'Unlearn, retrain or terminate?', labels: ['What it does', 'Assurance', 'Use for'],
        cols: [{ h: 'Unlearning', icon: 'filter', k: 'human' }, { h: 'Retraining', icon: 'cycle', k: 'control' }, { h: 'Termination', icon: 'power', k: 'threat' }],
        rows: [
          ['Removes specific influence', 'Rebuilds without the data', 'Retires the model'],
          ['Hard to verify', 'Strong', 'Complete'],
          ['Narrow removal requests', 'Poisoned or unlawful data', 'Unfixable or ordered'] ],
        say: 'When data must be removed from a model, there are three options. | Machine unlearning tries to remove specific data’s influence. Retraining rebuilds the model without the data. Termination retires the model entirely. | Unlearning is hard to verify. Retraining gives strong assurance. Termination is complete. | Unlearning can suit narrow removal requests, where its effect can be checked. Retraining suits poisoned or unlawfully obtained data. And termination suits risks that can’t be fixed, or cases where a regulator or court orders it.' },
      { t: 'bullets', title: 'Copies that are easy to forget', layout: 'grid', cols: 2, items: [
          { icon: 'cloud', h: 'Provider-held copies', d: 'Fine-tunes, uploaded files, logs', k: 'model' },
          { icon: 'archive', h: 'Backups and DR replicas', d: 'Off-site and cross-region', k: 'neutral' },
          { icon: 'code', h: 'Developer environments', d: 'Laptops, notebooks, test buckets', k: 'human' },
          { icon: 'database', h: 'Index and cache replicas', d: 'Vector store copies, cached answers', k: 'data' },
          { icon: 'copy', h: 'Derived models', d: 'Distillations and fine-tunes', k: 'threat' },
          { icon: 'list', h: 'Evaluation sets and logs', d: 'Outputs that contain the data', k: 'control' } ],
        say: 'Six kinds of copy are easy to forget. | Copies held by providers: fine-tuned models, uploaded training files and logs. | Backups and disaster recovery replicas, off-site and in other regions. | Developer environments: laptops, notebooks and test storage buckets. | Replicas of vector stores, and cached answers. | Derived models, such as distilled or fine-tuned versions. | And evaluation sets and logs, whose recorded outputs may contain the very data you are removing.' },
      { t: 'summary', items: ['Decommission endpoints, access, artefacts, data, records, dependants', 'Notify, stop, revoke, archive or destroy, sanitise, record', 'Unlearn narrowly; retrain for poison; terminate when unfixable', 'Hunt down copies: providers, backups, laptops, replicas, derivatives'],
        say: 'To recap. | Decommissioning covers endpoints, access, model artefacts, data, records and dependants. | Notify, stop traffic, revoke access, archive or destroy, sanitise and verify, then update the records. | Use unlearning narrowly, retrain to remove poisoned or unlawful data, and terminate models whose risks can’t be fixed. | And hunt down every copy: at providers, in backups, on laptops, in replicas and in derived models.' } ] },
    { type: 'text', md: `### When to decommission
Triggers include end of life or replacement, unfixable vulnerabilities (Module 5.4), failed revalidation, loss of the legal basis for the training data, a regulator’s or court’s order, contract termination with a provider, and business decisions. ISO/IEC 5338 (AI system life cycle processes) and ISO/IEC 42001 treat **retirement** as a planned life-cycle stage, not an afterthought.

### Secure disposal
- **Sanitise media** in line with NIST SP 800-88 Revision 2 (2025): match the method to data sensitivity and media type, then **verify and document** the result (Module 3.4).
- **Crypto-shredding:** where data is encrypted with dedicated keys, destroying the keys makes the data unreadable, which helps with distributed copies and backups.
- **Provider deletion:** request and record deletion of fine-tuned models, uploaded files and retained logs, according to the contract; obtain written confirmation (Module 2.5).
- **Retention and legal holds:** some records must be kept, such as logs required by law or evidence under a legal hold. Archive them securely, and destroy everything else on schedule.
- **Certificates:** file a certificate of sanitisation or destruction, and update the registry, inventory and AIBOM.

### Remediation: unlearning and termination
- **Machine unlearning** aims to remove the influence of specific training data without full retraining. Exact methods (such as training in shards so only affected parts are retrained) give stronger guarantees; approximate methods are cheaper but **hard to verify**. Use unlearning for narrow requests where its effect can be tested, and record the method and evidence.
- **Retraining without the data** is the strongest way to remove poisoned or unlawfully obtained data short of termination.
- **Model termination** retires the model, its derived models and its data. Regulators have ordered it: the US Federal Trade Commission has required companies to delete models and algorithms built with improperly obtained data, a remedy known as **algorithmic disgorgement**, in cases such as Everalbum (2021), WW International’s Kurbo app (2022) and Rite Aid (2023).
- **Personal data in models:** the European Data Protection Board’s Opinion 28/2024 says AI models trained on personal data can’t always be considered anonymous, which affects how erasure requests and unlawful processing must be handled (Module 3.2).

### Decommissioning checklist
1. Owner approval and notice to users and dependent teams.
2. Endpoints disabled; callers moved to the replacement or fallback.
3. All credentials, identities and tool grants revoked.
4. Artefacts and data archived or destroyed per retention and legal holds, including provider copies, backups, replicas, developer copies and derived models.
5. Sanitisation verified and documented.
6. Registry, inventory, AIBOM and model card updated; monitoring and detections for the retired system removed or repurposed.` },
    { type: 'match', title: 'Which remediation fits?', pairs: [
      ['A user asks for their data to be removed, and the model barely relied on it', 'Machine unlearning, with verification, or retraining'],
      ['Training data turns out to have been collected unlawfully', 'Retraining without the data, or termination'],
      ['A regulator orders deletion of models built with improperly obtained images', 'Model termination (algorithmic disgorgement)'],
      ['A model is replaced by a new version at the end of its life', 'Planned decommissioning and secure disposal'],
      ['A vendor still holds a fine-tuned copy after the contract ends', 'Provider deletion with written confirmation'] ] },
    { type: 'callout', kind: 'exam', title: 'Decommissioning questions', md: `Strong answers decommission **completely**: revoke credentials, remove **every copy** (providers, backups, replicas, laptops, derived models), respect **retention and legal holds**, **verify** sanitisation, and update **records**. For removing data from models, remember that **unlearning is hard to verify**; retraining or termination gives stronger assurance. "We switched off the endpoint" is not decommissioning.` },
    { type: 'check', q: { q: 'A company retires a customer-facing model by disabling its endpoint. Months later, an audit finds the model’s API key still works through another route, and a fine-tuned copy remains at the provider. What was missing?', o: ['A press release announcing the model’s retirement to all of its customers', 'Full decommissioning: revoke access, remove copies, verify, update records', 'A longer notice period before the endpoint was finally switched off for good', 'An evaluation of the model’s accuracy carried out just before it was retired'], a: 1, b: 5,
      why: 'Disabling one endpoint leaves credentials and copies behind. A complete process revokes access, removes or archives every copy, including provider-held ones, verifies the result and updates the records.' } }
  ]
};
