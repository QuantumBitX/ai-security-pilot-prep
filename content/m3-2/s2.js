/* 3.2 · Section 2: data protection techniques */
module.exports = {
  title: 'Data protection techniques', covers: [2],
  blocks: [
    { type: 'video', title: 'Protect the data, keep the value', kicker: 'Module 3.2 · Video 2 of 5', scenes: [
      { t: 'title', kicker: 'Module 3.2 · Privacy controls', title: 'Protect the data, keep the value', sub: 'Masking, tokenisation, pseudonymisation, anonymisation, noise and differential privacy', icon: 'mask',
        say: 'AI teams want rich, realistic data. Privacy teams want as little identifiable data as possible. Protection techniques let you have much of both. | This video compares the main techniques, what each one protects against, and where each fits in an AI pipeline.' },
      { t: 'bullets', title: 'Eight techniques to know', layout: 'grid', cols: 2, items: [
          { icon: 'mask', h: 'Masking', d: 'Hide characters or values, e.g. ****1234', k: 'data' },
          { icon: 'token', h: 'Tokenisation', d: 'Swap values for tokens; originals in a vault', k: 'control' },
          { icon: 'hash', h: 'Pseudonymisation', d: 'Replace identifiers; re-identifiable with a key', k: 'model' },
          { icon: 'layers', h: 'Generalisation', d: 'Coarsen values: age 37 becomes 35–39', k: 'neutral' },
          { icon: 'x', h: 'Suppression and redaction', d: 'Remove fields, values or records', k: 'threat' },
          { icon: 'users', h: 'Anonymisation', d: 'No longer relates to an identifiable person', k: 'human' },
          { icon: 'dice', h: 'Noise injection', d: 'Random perturbation of values or results', k: 'data' },
          { icon: 'sliders', h: 'Differential privacy', d: 'Calibrated noise with a provable limit', k: 'control' } ],
        say: 'There are eight techniques to know. | Masking hides part of a value, such as all but the last four digits of a card number. | Tokenisation swaps a value for a meaningless token, and keeps the original in a secured vault. | Pseudonymisation replaces identifiers with pseudonyms, such as keyed hashes. Whoever holds the key can re-identify people, so it is still personal data. | Generalisation coarsens values, such as turning an exact age into a five-year band. | Suppression and redaction remove fields, values or whole records. | Anonymisation is an end state rather than a single technique: data that can no longer identify anyone, by any means reasonably likely to be used. | Noise injection adds random perturbation to values or results. | And differential privacy calibrates that noise mathematically, giving a provable limit on what anyone can learn about one person.' },
      { t: 'flow', title: 'How tokenisation works',
        nodes: [
          { id: 'src', x: 200, y: 330, icon: 'money', label: 'Card number arrives', sub: 'at the payment edge', k: 'human', w: 280 },
          { id: 'tok', x: 600, y: 330, icon: 'token', label: 'Tokenisation service', sub: 'issues a random token', k: 'control', w: 300 },
          { id: 'vault', x: 600, y: 690, icon: 'lock', label: 'Token vault', sub: 'HSM-backed, isolated', k: 'control', w: 280 },
          { id: 'ai', x: 1010, y: 330, icon: 'model', label: 'AI and analytics', sub: 'see tokens only', k: 'model', w: 270 },
          { id: 'logs', x: 1380, y: 330, icon: 'list', label: 'Logs and datasets', sub: 'tokens, not card numbers', k: 'data', w: 270 },
          { id: 'detok', x: 1060, y: 690, icon: 'key', label: 'Detokenise', sub: 'authorised payment systems only', k: 'human', w: 340 } ],
        edges: [{ from: 'src', to: 'tok', k: 'human' }, { from: 'tok', to: 'vault', k: 'control' }, { from: 'tok', to: 'ai', k: 'model' }, { from: 'ai', to: 'logs', k: 'data' }, { from: 'vault', to: 'detok', k: 'human' }],
        steps: [
          { show: 'src', hi: 'src' },
          { show: 'tok src-tok', flow: 'src-tok', hi: 'tok' },
          { show: 'vault tok-vault', flow: 'tok-vault', hi: 'vault', mark: { vault: 'lock' } },
          { show: 'ai logs tok-ai ai-logs', flow: 'tok-ai ai-logs', hi: 'ai logs', mark: { ai: 'ok', logs: 'ok' } },
          { show: 'detok vault-detok', flow: 'vault-detok', hi: 'detok', mark: { detok: 'key' } } ],
        say: 'Here is tokenisation for payments. A card number arrives at the payment edge. | A tokenisation service replaces it with a random token that has no mathematical link to the card number. | The mapping lives only in a heavily protected vault, often backed by a hardware security module. | Downstream systems, including AI models, analytics and logs, see only tokens. If they leak, the tokens are worthless, and systems that can’t reach the vault may fall out of PCI DSS scope. | Only a few authorised payment systems can detokenise. Consistent tokens, where the same card always gets the same token, keep the data useful for joining and modelling.' },
      { t: 'compare', title: 'Pseudonymised or anonymised?', labels: ['Re-identify?', 'Under the GDPR', 'Examples', 'AI implication'],
        cols: [{ h: 'Pseudonymised', icon: 'hash', k: 'model' }, { h: 'Anonymised', icon: 'users', k: 'control' }],
        rows: [
          ['Possible with a key or extra data', 'Not reasonably likely, by anyone'],
          ['Still personal data; duties apply', 'Outside the GDPR’s scope'],
          ['Keyed hashes, tokens, coded study IDs', 'Robust aggregates; tested synthetic data'],
          ['Reduces risk, keeps obligations', 'High bar: models rarely qualify by default'] ],
        say: 'The difference between pseudonymised and anonymised data is one of the most tested ideas in privacy. | Pseudonymised data can be re-identified with a key or extra information. Anonymised data can’t be re-identified by anyone, using means reasonably likely to be used. And removing names isn’t enough: postcode, birth date and sex together single out most people. | So pseudonymised data is still personal data under the GDPR, while truly anonymised data falls outside it. The EU Court of Justice has added that pseudonymised data may not be personal data for a recipient with no reasonable means of re-identifying it. | Pseudonymisation includes keyed hashes, consistent tokens and coded study identifiers. Anonymisation might be robust aggregate statistics, or synthetic data tested for leakage. | The AI implication: pseudonymisation reduces risk but keeps your obligations, and a model trained on personal data isn’t automatically anonymous. That has to be demonstrated.' },
      { t: 'chart', title: 'The privacy budget trade-off', kind: 'line', x: ['0.1', '0.5', '1', '2', '4', '8'], yMin: 40, yMax: 100, ticks: 6, unit: '%', yLabel: 'Illustrative results at each privacy budget (ε)', legend: true,
        series: [
          { n: 'Model accuracy', k: 'data', v: [62, 77, 83, 87, 90, 91] },
          { n: 'Membership attack success', k: 'threat', v: [50, 51, 53, 56, 61, 67] } ],
        annot: [{ x: 1, text: 'Strong privacy, lower utility', k: 'control' }, { x: 4, text: 'Weaker privacy', k: 'threat' }],
        notes: [{ h: 'Epsilon (ε)', d: 'The privacy budget. Smaller ε means more noise and stronger privacy.', k: 'control' }, { h: 'Utility cost', d: 'Accuracy falls, hardest for small groups and rare cases.', k: 'data' }, { h: 'Privacy gain', d: 'Membership inference falls towards a coin toss (50%).', k: 'threat' }, { h: 'A policy decision', d: 'Agree ε with the data owner and privacy team; track the total spent.', k: 'human' }],
        steps: [{}, { s: [0] }, { s: [1] }, { a: [0, 1] }],
        say: 'Differential privacy has one key dial: epsilon, the privacy budget. A smaller epsilon means more noise and a stronger guarantee: the output barely changes whether or not any one person is included. | The cost is utility. In this illustrative example, accuracy drops as epsilon shrinks, hardest for small groups and rare cases. | The benefit is privacy. Membership inference, guessing whether someone was in the training data, falls towards a coin toss. | So choosing epsilon is a policy decision. Agree it with the data owner and the privacy team, and track the total budget spent, because every release uses some of it.' },
      { t: 'flow', title: 'Where noise can be injected',
        nodes: [
          { id: 'col', x: 240, y: 420, icon: 'phone', label: 'Collection', sub: 'local DP: noise on the device', k: 'human', w: 320 },
          { id: 'trn', x: 800, y: 420, icon: 'gpu', label: 'Training', sub: 'DP-SGD: clip and noise updates', k: 'model', w: 330 },
          { id: 'out', x: 1360, y: 420, icon: 'chart', label: 'Release', sub: 'noisy statistics, DP synthetic data', k: 'data', w: 340 },
          { id: 'acct', x: 800, y: 740, icon: 'sliders', label: 'Privacy accountant', sub: 'tracks the total ε spent', k: 'control', w: 320 } ],
        edges: [{ from: 'col', to: 'trn', k: 'human' }, { from: 'trn', to: 'out', k: 'model' }, { from: 'trn', to: 'acct', k: 'control' }, { from: 'out', to: 'acct', k: 'control' }],
        steps: [
          { show: 'col', hi: 'col' },
          { show: 'trn col-trn', flow: 'col-trn', hi: 'trn' },
          { show: 'out trn-out', flow: 'trn-out', hi: 'out' },
          { show: 'acct trn-acct out-acct', flow: 'trn-acct out-acct', hi: 'acct' } ],
        say: 'Noise can be injected at three points. At collection, local differential privacy adds noise on the user’s own device, so even the collector never sees true values. | During training, DP-SGD clips each example’s influence on the model and adds calibrated noise, limiting how much it can memorise any single record. | At release, noise is added to published statistics, or used to generate differentially private synthetic data. | And a privacy accountant tracks the cumulative budget, because privacy loss adds up across every release.' },
      { t: 'summary', items: ['Masking and tokenisation protect values; tokens need a secured vault', 'Pseudonymised data is still personal data', 'Anonymisation is an outcome to prove, not a step to assume', 'Differential privacy trades accuracy for a provable limit, set by ε'],
        say: 'To recap. | Masking and tokenisation protect specific values, and tokenisation depends on a well-protected vault. | Pseudonymised data is still personal data. | Anonymisation is an outcome to demonstrate, not a step to assume. | And differential privacy trades some accuracy for a provable privacy limit, set by epsilon.' } ] },
    { type: 'text', md: `### Choosing a protection technique
| Technique | How it works | Reversible? | Watch out for |
|---|---|---|---|
| **Masking** | Hides characters or substitutes fake values. *Static* masking makes a masked copy; *dynamic* masking hides values at display time | Static copy: no. Dynamic: original intact | Dynamic masking doesn’t protect the stored data |
| **Tokenisation** | Replaces values with tokens; the mapping sits in a secure vault | Yes, by authorised systems via the vault | The vault becomes a crown jewel; consistent tokens are pseudonyms |
| **Encryption** (including format-preserving) | Transforms data with a key | Yes, with the key | Key management; encrypted personal data is still personal data |
| **Hashing** | One-way function; use a keyed hash (HMAC) | Not directly | Unkeyed hashes of predictable values, such as phone or card numbers, can be reversed by trying every value |
| **Pseudonymisation** | Replaces identifiers; re-identification information kept separately and protected | Yes, for the key holder | Still personal data (GDPR Article 4(5)) |
| **Generalisation and suppression** | Coarsens values; removes rare combinations and outliers | No | Utility loss; weak alone against linkage |
| **Redaction** | Removes identifiers from text, images and audio | No | Misses unusual formats and contextual clues |
| **Noise injection** | Adds random perturbation to values or outputs | No | No guarantee unless calibrated; repeated queries can average it out |
| **Differential privacy** | Noise calibrated to a privacy budget (ε) | No | Utility loss, especially for small groups |

### Anonymisation and pseudonymisation in law
Under the GDPR, anonymous information is outside scope (Recital 26), judged against *all the means reasonably likely to be used*, considering cost, time and technology. Pseudonymised data remains personal data. In **EDPS v SRB** (C-413/23 P, September 2025) the Court of Justice held that pseudonymised data isn’t necessarily personal data *for a recipient* with no reasonable means of re-identification, though the original controller’s duties are judged from its own perspective. The Commission’s Digital Omnibus proposed writing this into the GDPR; as of October 2026 those amendments had not been adopted.

For AI models, the EDPB’s **Opinion 28/2024** says a model trained on personal data is anonymous only if the likelihood of extracting personal data from it, directly or through queries, is insignificant, and this must be demonstrated and documented. The UK ICO’s **motivated intruder test** asks whether a competent person without specialist skills, but with access to public resources, could re-identify people.

### Why de-identification fails
Latanya Sweeney found that zip code, date of birth and sex uniquely identified about 87% of Americans, and researchers re-identified Netflix Prize subscribers by linking their movie ratings with public reviews. Such **quasi-identifiers** enable **linkage**. Formal models reduce the risk: **k-anonymity** (each record matches at least k−1 others on its quasi-identifiers), **l-diversity** (each group holds several well-represented sensitive values) and **t-closeness** (each group’s sensitive values are distributed like the whole dataset’s). They don’t protect against arbitrary background knowledge; differential privacy does.

### Differential privacy in brief
A mechanism is **ε-differentially private** if its output is almost equally likely whether or not any one person’s data is included. Key ideas:
- **Sensitivity**, how much one person can change a result, sets how much noise is needed.
- **Composition:** privacy loss adds up across releases, so a **privacy accountant** tracks the budget.
- **Post-processing:** anything computed from a differentially private output stays differentially private.
- **Local vs central:** local DP adds noise before collection; central DP adds noise to results from a trusted curator, with better accuracy.
- **DP-SGD** clips per-example gradients and adds noise during training, limiting memorisation and membership inference.
- **Unit of privacy:** decide whether you protect a record or a person, who may have many records.

NIST SP 800-226 (2025) gives guidance on evaluating differential privacy guarantees.

### Across an AI pipeline
- **Training data:** minimise, pseudonymise identifiers, redact free text, de-duplicate, and use DP-SGD for highly sensitive data.
- **Retrieval corpora:** redact or tokenise before indexing, and filter retrieval by permission.
- **Prompts and outputs:** redact or tokenise personal data before it reaches an external model (Module 3.4 covers DLP).
- **Logs:** mask by default, keep retention short and restrict access to raw logs.
- **Non-production:** use masked or synthetic data only.
- **Reporting:** aggregate, suppress small counts or apply differential privacy.` },
    { type: 'flip', title: 'Technique flashcards', cards: [
      ['Vaulted tokenisation', 'Tokens replace sensitive values; the mapping lives only in a secured vault. Systems that never touch the vault can fall out of scope.'],
      ['Keyed hash (HMAC)', 'A hash computed with a secret key. Without the key, predictable inputs such as phone numbers can’t be recovered by trying every value.'],
      ['k-anonymity', 'Every record shares its quasi-identifier values with at least k−1 others, so no one can be singled out on those attributes alone.'],
      ['Privacy budget (ε)', 'The parameter bounding how much a differentially private output can reveal about one person. Spending accumulates across releases.'],
      ['DP-SGD', 'Training that clips each example’s gradient and adds calibrated noise, limiting memorisation and membership inference at some cost to accuracy.'] ] },
    { type: 'callout', kind: 'exam', title: 'Classic traps', md: `- **Hashing or tokenising an identifier is pseudonymisation, not anonymisation.** The data remains personal data.
- **Removing names is not anonymisation.** Quasi-identifiers and linkage can re-identify people.
- **Encryption protects confidentiality, not identifiability.** Encrypted personal data is still personal data.
- When an option offers a **provable** limit on what can be learned about an individual, it is pointing at **differential privacy**.` },
    { type: 'check', q: { q: 'A data science team wants to train a fraud model on transaction data and must link each customer’s transactions over time, without exposing real account numbers to the team. Which technique BEST fits?', o: ['Delete the account number column and rely on transaction timestamps to group each customer’s activity', 'Replace account numbers with consistent tokens or keyed-hash pseudonyms, with the key held by another team', 'Encrypt the account number column and give the team the key, so that joins across tables still work', 'Keep the real account numbers but add calibrated noise to every amount, so no individual can be identified'], a: 1, b: 2,
      why: 'Consistent pseudonyms let records be linked without revealing real identifiers, and separating the key keeps re-identification under control. Deleting the column breaks linkage, sharing the key exposes the data, and noise on amounts doesn’t protect identifiers. The result is still personal data and must be governed as such.' } }
  ]
};
