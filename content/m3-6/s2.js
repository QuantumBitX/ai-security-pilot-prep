/* 3.6 · Section 2: model extraction prevention */
module.exports = {
  title: 'Preventing model extraction', covers: [2],
  blocks: [
    { type: 'video', title: 'Stealing a model through the front door', kicker: 'Module 3.6 · Video 2 of 5', scenes: [
      { t: 'title', kicker: 'Module 3.6 · Model CIA', title: 'Stealing a model through the front door', sub: 'How extraction works, and how to make it costly and visible', icon: 'attacker',
        say: 'An attacker doesn’t need your weights to copy your model. With enough queries, they can train their own model on your model’s answers. | This video explains model extraction at a high level, and the layered controls that make it expensive and easy to spot.' },
      { t: 'flow', title: 'How model extraction works',
        nodes: [
          { id: 'att', x: 230, y: 330, icon: 'attacker', label: 'Attacker', sub: 'many accounts or keys', k: 'threat', w: 270 },
          { id: 'q', x: 700, y: 330, icon: 'list', label: 'Chosen queries', sub: 'cover the input space', k: 'neutral', w: 280 },
          { id: 'api', x: 1200, y: 330, icon: 'model', label: 'Your model API', sub: 'answers every query', k: 'model', w: 280 },
          { id: 'ds', x: 1200, y: 680, icon: 'database', label: 'Harvested answers', sub: 'a free training set', k: 'data', w: 290 },
          { id: 'sub', x: 700, y: 680, icon: 'copy', label: 'Substitute model', sub: 'behaves like yours', k: 'threat', w: 290 } ],
        edges: [{ from: 'att', to: 'q', k: 'threat' }, { from: 'q', to: 'api', k: 'neutral' }, { from: 'api', to: 'ds', k: 'model' }, { from: 'ds', to: 'sub', k: 'data' }],
        steps: [
          { show: 'att', hi: 'att' },
          { show: 'q att-q', flow: 'att-q', hi: 'q' },
          { show: 'api q-api', flow: 'q-api', hi: 'api' },
          { show: 'ds api-ds', flow: 'api-ds', hi: 'ds' },
          { show: 'sub ds-sub', flow: 'ds-sub', hi: 'sub', mark: { sub: 'alert' } } ],
        say: 'Here is the idea, at a high level. An attacker, often spread across many accounts, wants a copy of your model. | They send large numbers of chosen queries, designed to cover the range of inputs the model handles. | Your API answers every one, as it is designed to. | The answers become a free, labelled training set. | And the attacker trains a substitute model that behaves much like yours. They gain your capability without your costs, and a private copy on which to develop attacks that may then work against the original.' },
      { t: 'chart', title: 'Less detail per answer raises the cost', kind: 'bar', x: ['Full scores', 'Top-5 scores', 'Rounded top score', 'Label only'], yMin: 0, yMax: 100, ticks: 4, unit: '', yLabel: 'Illustrative relative number of queries an attacker needs',
        series: [{ n: 'Queries needed', k: 'control', v: [8, 22, 48, 90], ck: ['threat', 'human', 'data', 'control'] }],
        steps: [{ s: [0] }, {}, {}],
        say: 'One of the most effective controls is simply returning less. In this illustrative chart, each step down in output detail raises the number of queries an attacker needs. | Full probability scores for every class reveal the most about the model’s decision boundaries. Returning only the top few, or a rounded top score, reveals less. | Returning just the label reveals the least. So give each use case only the detail it actually needs.' },
      { t: 'bullets', title: 'Make extraction expensive and visible', layout: 'grid', cols: 2, items: [
          { icon: 'id', h: 'Authenticate every caller', d: 'No anonymous high-volume access', k: 'control' },
          { icon: 'filter', h: 'Minimise outputs', d: 'Labels, rounded scores, fewer log-probabilities', k: 'data' },
          { icon: 'clock', h: 'Rate limits and quotas', d: 'Per key, user and organisation', k: 'human' },
          { icon: 'search', h: 'Detect query patterns', d: 'Volume, coverage, synthetic inputs', k: 'model' },
          { icon: 'gavel', h: 'Terms and enforcement', d: 'Ban training on outputs; act on abuse', k: 'neutral' },
          { icon: 'fingerprint', h: 'Mark for evidence', d: 'Watermarks and fingerprints', k: 'threat' } ],
        say: 'No single control stops extraction, because anything a legitimate user can query, an attacker can approximate. The goal is to make it expensive and visible. | Authenticate every caller, and tie keys to verified customers, with no anonymous high-volume access. | Minimise outputs: labels instead of full scores, rounded confidence, and limited log-probabilities. | Apply rate limits and quotas per key, per user and per organisation. | Detect suspicious patterns, such as high volume, systematic coverage of the input space, and synthetic-looking queries, including across linked accounts. | Prohibit training on your outputs in your terms of service, and act on abuse. | And mark your model and outputs, so a copy can be identified later.' },
      { t: 'summary', items: ['Extraction copies a model through its own API', 'Return only the detail each use case needs', 'Authenticate, rate-limit and set quotas per identity', 'Detect probing; back it with terms, watermarks and fingerprints'],
        say: 'To recap. | Extraction copies a model through its own API, by training a substitute on its answers. | Return only the detail each use case needs. | Authenticate callers, and apply rate limits and quotas to every identity. | And detect probing patterns, backed by terms of service, watermarks and fingerprints.' } ] },
    { type: 'text', md: `### What extraction targets
- **Functionality:** a substitute model that reproduces the target’s behaviour on the inputs that matter. For language models, this includes **distillation**: training a smaller model on a larger model’s outputs, which many providers’ terms prohibit for competing models.
- **Parameters:** simple models can sometimes be recovered almost exactly. Tramèr and colleagues (2016) showed that models behind commercial prediction APIs could be extracted with surprisingly few queries when confidence scores were returned. In 2024, Carlini and colleagues recovered part of the final layer of production OpenAI models through their API for a small cost, and the providers added mitigations.
- **Hyperparameters, architecture and decision boundaries**, which make further attacks easier.

### Why it matters
- **IP and revenue:** your capability, without your training costs.
- **Attack staging:** a local copy lets attackers craft evasion inputs and jailbreaks offline, which often **transfer** to the original model.
- **Privacy:** a copy can be probed without rate limits for memorised training data (Module 3.3).
- **Safety:** the copy carries none of your server-side safeguards.

Module 6.1 covers extraction alongside the other adversarial ML attacks, such as evasion, inversion and membership inference.

### Layered defences
| Layer | Controls |
|---|---|
| **Access** | Authenticate all calls; tie keys to verified customers; no anonymous high-volume access; stronger checks for high-risk features such as log-probabilities or embeddings |
| **Output minimisation** | Return labels rather than full probability vectors; round or bucket confidence scores; limit the number of log-probabilities returned and features such as logit bias; don’t expose embeddings or hidden states unless needed |
| **Rate limits and quotas** | Per key, user, organisation and IP range, with daily and monthly caps (Section 5) |
| **Detection** | Baseline normal use; flag high volume, broad or systematic coverage of the input space, unnatural or synthetic queries, and similar patterns spread across linked accounts; send alerts to the SOC (Module 5.3) |
| **Response** | Throttle, require step-up verification, suspend accounts, and pursue contractual or legal remedies |
| **Legal** | Terms of service that prohibit using outputs to train competing models, and API agreements with audit rights |
| **Evidence** | Model watermarks and fingerprints, so a suspected copy can be tested (Section 3) |

Research defences, such as perturbing returned probabilities, can raise extraction costs but also degrade answers for legitimate users. Treat them as optional extras, after access control, output minimisation, rate limiting and detection.` },
    { type: 'callout', kind: 'exam', title: 'Extraction questions', md: `The best answers **reduce what each query reveals** and **limit and watch who queries**. Encrypting the weights doesn’t help, because extraction never touches them. Watermarks and terms of service support evidence and deterrence, but they don’t prevent extraction.` },
    { type: 'match', title: 'Which control is this?', pairs: [
      ['The API returns only the top label instead of every class score', 'Output minimisation'],
      ['Each key may send at most 600 requests and 200,000 tokens a minute', 'Rate limiting'],
      ['An alert fires when one customer’s queries systematically sweep the input space', 'Query-pattern detection'],
      ['The terms of service forbid using responses to train a competing model', 'Contractual deterrence'],
      ['Secret prompts with planted answers are trained into the model', 'Trigger-set watermark (Section 3)'] ] },
    { type: 'check', q: { q: 'An image-classification API returns the full probability vector for all 1,000 classes with every answer. Which change MOST reduces what an extraction attacker learns from each query, while keeping the service useful?', o: ['Encrypt the model weights at rest with a customer-managed key held in an HSM', 'Return only the top label with a rounded confidence score, unless a customer needs more', 'Move the model to a different region, with a separate endpoint for each customer', 'Publish a prominent notice that copying the model breaches the terms of service for the API'], a: 1, b: 2,
      why: 'Output minimisation directly reduces the information each query leaks about the decision boundary. Encryption protects stored weights, not the API; moving regions changes nothing; terms deter but don’t limit what is revealed.' } }
  ]
};
