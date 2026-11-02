/* 2.4 · Section 3: retention and deletion; consent and public data */
module.exports = {
  title: 'Retention, deletion, consent and public data', covers: [4, 5],
  blocks: [
    { type: 'video', title: 'Keep, delete, and ask first', kicker: 'Module 2.4 · Video 3 of 3', scenes: [
      { t: 'title', kicker: 'Module 2.4 · Privacy, protection and IP', title: 'Keep, delete, and ask first', sub: 'Retention and deletion in AI systems, consent, and the myth of free public data', icon: 'trash',
        say: 'Two privacy questions get harder with AI: how long do we keep data, and can we really delete it? And a third: did we have the right to collect it in the first place? | This video covers retention and deletion across AI systems, consent and lawful basis, and why public data is not free data.' },
      { t: 'bullets', title: 'Everything that needs a retention rule', layout: 'grid', cols: 2, items: [
          { icon: 'chat', h: 'Prompts and outputs', d: 'Conversation history and generated content', k: 'human' },
          { icon: 'list', h: 'Logs and traces', d: 'Application, security and observability logs', k: 'neutral' },
          { icon: 'vector', h: 'Vector indexes', d: 'Chunks, embeddings and caches', k: 'data' },
          { icon: 'database', h: 'Training and fine-tuning sets', d: 'Raw, curated and evaluation data', k: 'data' },
          { icon: 'model', h: 'Models and checkpoints', d: 'Weights trained on the data', k: 'model' },
          { icon: 'building', h: 'Vendor copies', d: 'Provider logs, abuse monitoring, backups', k: 'threat' } ],
        say: 'Start with an inventory of everything that needs a retention rule. | Prompts and outputs, including conversation history. | Logs and traces, which often contain full prompts and responses. | Vector indexes, with their chunks, embeddings and caches. | Training, fine-tuning and evaluation datasets. | Models and checkpoints that were trained on the data. | And copies held by vendors, such as provider logs kept for abuse monitoring, and backups. Each needs a defined retention period, an owner and a deletion method.' },
      { t: 'layers', title: 'Why deleting from AI is harder',
        layers: [
          { icon: 'database', label: 'Source systems and logs', sub: 'Delete the records; confirm backups expire on schedule', k: 'control' },
          { icon: 'vector', label: 'Indexes and caches', sub: 'Delete chunks and embeddings; purge caches; re-index', k: 'data' },
          { icon: 'model', label: 'Trained models', sub: 'Retrain without the data, apply machine unlearning, or suppress outputs', k: 'threat' } ],
        say: 'Deletion gets harder the deeper data goes. | In source systems and logs, you delete the records, and make sure backups expire on a defined schedule. | In retrieval indexes, you must delete the chunks and their embeddings, purge caches, and sometimes rebuild the index. | In trained models, the data is diffused through the weights. Options are retraining without it, machine unlearning techniques that are still maturing, or suppressing outputs as a stopgap. That is why keeping personal data out of training in the first place matters so much.' },
      { t: 'bullets', title: 'Retention done well', items: [
          { icon: 'calendar', h: 'A period for every data type', d: 'Based on purpose and legal duties, not convenience', k: 'data' },
          { icon: 'gavel', h: 'Legal holds override deletion', d: 'Preserve what litigation or investigations require', k: 'human' },
          { icon: 'building', h: 'Vendor terms that match', d: 'Retention, training use and deletion in the contract', k: 'neutral' },
          { icon: 'key', h: 'Crypto-shredding', d: 'Destroy keys to make encrypted copies unreadable', k: 'model' },
          { icon: 'check', h: 'Verify deletion', d: 'Evidence that deletion happened everywhere', k: 'control' } ],
        say: 'Good retention practice has five parts. | A defined period for every data type, based on purpose and legal duties, not convenience. Storage limitation is a GDPR principle. | Legal holds that override deletion when litigation or an investigation requires data to be preserved. | Vendor terms that match your policy: how long the provider keeps prompts, whether it trains on them, and how deletion works. Some providers offer zero data retention options for sensitive uses. | Crypto-shredding, where destroying an encryption key makes every encrypted copy, including backups, unreadable. | And verification: evidence that deletion actually happened in every location.' },
      { t: 'bullets', title: 'Consent and lawful basis', layout: 'grid', cols: 2, items: [
          { icon: 'check', h: 'Valid consent', d: 'Freely given, specific, informed, unambiguous', k: 'control' },
          { icon: 'rollback', h: 'Easy to withdraw', d: 'As easy as giving it, with effect going forward', k: 'human' },
          { icon: 'scale', h: 'Or legitimate interests', d: 'A documented balancing test, with a right to object', k: 'data' },
          { icon: 'eye', h: 'Clear notice', d: 'Tell people if their data trains or feeds AI', k: 'model' } ],
        say: 'Every use of personal data for AI needs a lawful basis. | Consent is one option, but it must be freely given, specific, informed and unambiguous. Bundling it into terms of service, or pre-ticking boxes, doesn’t count. | It must be as easy to withdraw as to give, and withdrawal stops future use. | Many organisations instead rely on legitimate interests, which requires a documented balancing test against people’s rights, and gives people a right to object. European regulators have explained how this can apply to AI development. | Whatever the basis, tell people clearly if their data will train or feed AI systems, and how to opt out.' },
      { t: 'bullets', title: 'Public data is not free data', items: [
          { icon: 'fingerprint', h: 'Privacy law still applies', d: 'Scraped personal data is still personal data', k: 'threat' },
          { icon: 'doc', h: 'Terms and copyright apply', d: 'Site terms, licences and rights reservations', k: 'neutral' },
          { icon: 'users', h: 'Context matters', d: 'People didn’t post it expecting AI training', k: 'human' },
          { icon: 'gavel', h: 'Regulators are watching', d: 'Fines and joint warnings about scraping', k: 'data' } ],
        say: 'Finally, a common misconception: if it is public, we can use it. | Privacy law still applies. Scraped personal data is still personal data, needing a lawful basis, transparency and respect for rights. Facial recognition companies that scraped images from the web have been fined by several European regulators. | Website terms, copyright and machine-readable rights reservations also apply. | Context matters: people who posted on a forum didn’t expect their words to train a commercial model. | And regulators are watching. A joint statement by twelve data protection authorities warned social media companies and scrapers that publicly accessible personal data remains protected.' },
      { t: 'summary', items: ['Every AI data store needs retention, an owner and a deletion method', 'Deletion is hardest in trained models; prevent first', 'Consent must be valid and withdrawable; or use documented legitimate interests', 'Public data is still regulated: privacy, terms, copyright, context'],
        say: 'To recap. | Every AI data store, from prompts to vendor copies, needs a retention period, an owner and a deletion method. | Deletion is hardest in trained models, so prevention comes first. | Consent must be valid and easy to withdraw, or you need a documented legitimate interests assessment. | And public data is still regulated by privacy law, terms of use, copyright and people’s reasonable expectations.' } ] },
    { type: 'text', md: `### Retention in AI systems
The GDPR’s **storage limitation** principle requires personal data to be kept no longer than necessary for its purpose, and most security and records frameworks require defined retention schedules. AI multiplies the places data lives, so a retention schedule should cover:

| Data | Typical considerations |
|---|---|
| Prompts, outputs, conversation history | Business need (continuity, support) versus exposure; user controls to delete history |
| Logs and traces | Security investigation and audit needs; **mask personal data** in telemetry (Module 5.2) |
| Vector indexes and caches | Keep in step with source documents; delete chunks when sources are deleted or expire |
| Training, fine-tuning and evaluation sets | Reproducibility and audit versus minimisation; version and archive under access control |
| Models and checkpoints | Lineage to the data they were trained on; retire or retrain when data must be removed |
| Vendor-side copies | Contractual retention limits, abuse-monitoring retention, **no-training commitments**, deletion on termination, certification of deletion |

**Legal holds** suspend deletion for data relevant to litigation, regulatory investigations or incidents. They must be applied precisely and released when no longer needed.

### Deletion and unlearning
- **Records and logs:** delete in primary stores and ensure backups expire within a defined window. **Crypto-shredding** (destroying the keys that protect encrypted data) is an effective way to make data unrecoverable across many copies and media; Module 3.4 covers it with media sanitisation.
- **Vector stores:** link chunks to their source document IDs so that deleting or updating a source deletes its chunks and embeddings; purge semantic caches.
- **Models:** if personal data must be removed from a trained model, options include **retraining** from a clean dataset (reliable but expensive), **machine unlearning** methods that approximate the effect of retraining (an active research area, harder to verify), and **output suppression** filters as a temporary measure. Lineage tracking (which data went into which model) makes all of these feasible; without it, you can’t even scope the problem.

### Consent and other lawful bases
Under the GDPR, consent must be **freely given, specific, informed and unambiguous**, given by a clear affirmative action, and **as easy to withdraw as to give** (Articles 4(11) and 7). It is often a poor fit for AI training, because withdrawal can be hard to honour once data is in a model. Alternatives include:
- **Legitimate interests** (Article 6(1)(f)): requires a three-part test (purpose, necessity, balancing) and gives individuals a right to object. The EDPB’s Opinion 28/2024 discusses how it may apply to developing and deploying AI models, including mitigating measures such as pseudonymisation and easy opt-outs.
- **Contract** or **legal obligation**, where processing is genuinely necessary for those purposes.

For **special category data**, an Article 9 condition is also required, such as explicit consent. For **children**, stricter rules apply. Good **consent mechanisms** are granular (separate choices for separate purposes, such as “improve the product” versus “train AI models”), recorded (who agreed to what, when, under which notice version), revocable through accessible controls, and honoured downstream, which means consent status must travel with the data into AI pipelines.

### Public data and scraping
Publicly accessible data is still subject to:
- **Privacy law:** collecting personal data by scraping is processing that needs a lawful basis, transparency and respect for rights. European regulators have fined a facial recognition company that built its database from scraped images, and in 2023 twelve data protection authorities issued a joint statement warning that publicly accessible personal data remains protected and that platforms must guard against unlawful scraping.
- **Contract and terms of service:** many sites prohibit scraping.
- **Copyright and database rights**, and machine-readable **rights reservations** (Section 2).
- **Reasonable expectations:** using people’s posts or photos for purposes they could not anticipate damages trust and may be unfair processing.

Before using public data for AI, document the source, the lawful basis, how individuals are informed, how they can object, and the measures that limit collection to what is necessary.`, },
    { type: 'flip', title: 'Retention and consent vocabulary', cards: [
      ['Storage limitation', 'The GDPR principle that personal data must be kept no longer than necessary for its purposes.'],
      ['Legal hold', 'An instruction to preserve data relevant to litigation or investigation, overriding normal deletion.'],
      ['Crypto-shredding', 'Making encrypted data unrecoverable by securely destroying the keys.'],
      ['Machine unlearning', 'Techniques that remove the influence of specific training data from a model without full retraining.'],
      ['Valid consent (GDPR)', 'Freely given, specific, informed and unambiguous, by clear affirmative action, and withdrawable.'],
      ['Legitimate interests assessment', 'A documented test of purpose, necessity and balancing against individuals’ rights.'] ] },
    { type: 'scenario', title: 'The erasure request', md: `A customer exercises their right to erasure. Their support conversations were used last year to fine-tune the company’s support model, are indexed in the RAG knowledge base, and appear in application logs retained for two years. The fine-tuning pipeline kept no record of which conversations were used.`,
      q: { q: 'Which gap makes this request MOST difficult to fulfil?', o: ['The logs are encrypted, so the company can’t search them for the customer’s data', 'No lineage tracking, so it can’t tell whether the model must be retrained or unlearned', 'The RAG index stores embeddings, which can’t be linked back to specific customers', 'The customer contacted support by email, so their request isn’t a valid erasure request'], a: 1, b: 4,
        why: 'Records in logs and indexes can be found and deleted. Without lineage, the company can’t determine what the model learned from this person’s data, so it can’t scope retraining or unlearning. Lineage and minimisation before training are the key controls.' } },
    { type: 'check', q: { q: 'A team argues it can use any public social-media posts to train a model because the posts are publicly visible. What is the BEST response?', o: ['Agree; publicly visible posts carry no privacy obligations, provided accounts aren’t hacked to get them', 'Explain that privacy law, platform terms and copyright still apply, so a lawful basis and safeguards are needed', 'Agree, provided the posts are less than a year old and the authors haven’t since deleted or locked their accounts', 'Use only posts with more than 100 likes, since widely shared content is clearly intended for public use'], a: 1, b: 5,
      why: 'Public visibility doesn’t remove legal obligations. Regulators have stated that publicly accessible personal data remains protected, and scraping can also breach terms and copyright.' } }
  ]
};
