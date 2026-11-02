/* 5.2 · Section 4: privacy-preserving telemetry masking */
module.exports = {
  title: 'Privacy-preserving telemetry masking', covers: [4],
  blocks: [
    { type: 'video', title: 'See the threat, not the person', kicker: 'Module 5.2 · Video 4 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.2 · AI security telemetry', title: 'See the threat, not the person', sub: 'Privacy-preserving telemetry masking', icon: 'mask',
        say: 'AI telemetry is full of personal data. People paste customer records, health details and even passwords into prompts, and models repeat them in outputs. Security teams need to see attacks without exposing everyone’s private information. | This video covers privacy-preserving masking for AI telemetry.' },
      { t: 'compare', title: 'Raw prompt and masked telemetry', labels: ['Name', 'Email', 'Card number', 'Pasted secret', 'Source IP'],
        cols: [{ h: 'Raw', icon: 'eye', k: 'threat' }, { h: 'Masked', icon: 'mask', k: 'control' }],
        rows: [
          ['Priya Shah', 'PERSON_7f3a'],
          ['priya@example.com', 'EMAIL_19c2'],
          ['Full 16-digit number', 'CARD_9113 (last four)'],
          ['An API key pasted by mistake', '[SECRET REMOVED]'],
          ['203.0.113.45', '203.0.113.0/24'] ],
        say: 'Here is what masking does to one prompt. | A customer’s name becomes a consistent pseudonym, so analysts can still link her activity without seeing who she is. | Her email address gets its own token. | A card number keeps only its last four digits. | An API key that someone pasted by mistake is removed entirely, and the key is reported for rotation. | And the source address is generalised to its network range, which is still useful for spotting abuse.' },
      { t: 'bullets', title: 'Masking techniques', layout: 'grid', cols: 2, items: [
          { icon: 'x', h: 'Redaction', d: 'Remove the value completely', k: 'threat' },
          { icon: 'token', h: 'Tokenisation', d: 'Reversible token; original in a vault', k: 'control' },
          { icon: 'hash', h: 'Keyed hashing', d: 'Consistent pseudonym, not reversible', k: 'model' },
          { icon: 'lock', h: 'Format-preserving encryption', d: 'Encrypted, same format', k: 'data' },
          { icon: 'filter', h: 'Generalisation', d: 'Exact value becomes a range', k: 'human' },
          { icon: 'chart', h: 'Differential privacy', d: 'Noise added to aggregates', k: 'neutral' } ],
        say: 'Six techniques do most of the work. | Redaction removes a value completely. It is right for secrets, which should never be stored. | Tokenisation replaces a value with a token, and keeps the original in a protected vault, so authorised people can reverse it. | Keyed hashing produces the same pseudonym every time for the same value, which keeps correlation working, but it can’t be reversed without the key. | Format-preserving encryption keeps the shape of the data, such as a sixteen-digit number, so downstream systems still work. | Generalisation turns exact values into ranges, such as an age band or a network range. | And differential privacy adds calibrated noise to aggregate statistics, so shared reports can’t reveal individuals.' },
      { t: 'flow', title: 'Mask early, unmask rarely',
        nodes: [
          { id: 'src', x: 230, y: 330, icon: 'chat', label: 'Prompt or output', sub: 'raw, sensitive', k: 'threat', w: 300 },
          { id: 'mask', x: 700, y: 330, icon: 'mask', label: 'Mask at collection', sub: 'gateway or SDK', k: 'control', w: 310 },
          { id: 'siem', x: 1200, y: 330, icon: 'search', label: 'Security analytics', sub: 'pseudonyms only', k: 'human', w: 300 },
          { id: 'req', x: 1200, y: 690, icon: 'doc', label: 'Unmask request', sub: 'case, purpose, approver', k: 'neutral', w: 330 },
          { id: 'vault', x: 700, y: 690, icon: 'key', label: 'Token vault', sub: 'separate team holds keys', k: 'data', w: 330 },
          { id: 'aud', x: 230, y: 690, icon: 'audit', label: 'Access logged', sub: 'reviewed regularly', k: 'model', w: 290 } ],
        edges: [{ from: 'src', to: 'mask', k: 'threat' }, { from: 'mask', to: 'siem', k: 'control' }, { from: 'siem', to: 'req', k: 'human' }, { from: 'req', to: 'vault', k: 'neutral' }, { from: 'vault', to: 'aud', k: 'data' }],
        steps: [
          { show: 'src', hi: 'src', mark: { src: 'alert' } },
          { show: 'mask src-mask', flow: 'src-mask', hi: 'mask' },
          { show: 'siem mask-siem', flow: 'mask-siem', hi: 'siem' },
          { show: 'req siem-req', flow: 'siem-req', hi: 'req' },
          { show: 'vault req-vault', flow: 'req-vault', hi: 'vault', mark: { vault: 'lock' } },
          { show: 'aud vault-aud', flow: 'vault-aud', hi: 'aud', mark: { aud: 'ok' } } ],
        say: 'The guiding principle is: mask early, unmask rarely. Raw prompts and outputs contain sensitive data. | Masking happens at collection, in the gateway or instrumentation library, before data leaves for storage or analysis. | Security analytics then works on pseudonyms. Because tokens are consistent, analysts can still follow one person or account across events. | When an investigation genuinely needs the real identity, an analyst raises a request tied to a case, stating the purpose, with an approver. | A separate team holds the token vault and keys, so the SOC can’t unmask data on its own. | And every unmasking is logged and reviewed.' },
      { t: 'bullets', title: 'Keeping masked telemetry useful', layout: 'grid', cols: 2, items: [
          { icon: 'link', h: 'Consistent tokens', d: 'Same value, same pseudonym', k: 'control' },
          { icon: 'id', h: 'Keep security fields', d: 'Identity IDs, network ranges', k: 'human' },
          { icon: 'layers', h: 'Mask every channel', d: 'Outputs, documents, tool results', k: 'data' },
          { icon: 'vector', h: 'Treat embeddings as sensitive', d: 'Vectors can be inverted', k: 'threat' },
          { icon: 'target', h: 'Test the masking', d: 'Measure what detectors miss', k: 'model' },
          { icon: 'clock', h: 'Tier and expire', d: 'Short retention for content', k: 'neutral' } ],
        say: 'Masking must not blind the security team, so six practices keep it useful. | Use consistent tokens, so the same value always gets the same pseudonym and correlation still works. | Keep the fields security needs, such as internal identity identifiers and network ranges. | Mask every channel: not just prompts, but outputs, retrieved documents and tool results too. | Treat embeddings as sensitive. Research shows text can often be partly reconstructed from its embedding, so don’t ship raw vectors to the SIEM. | Test the masking regularly, because personal data detectors miss things, especially in free text and other languages. | And tier storage, keeping content for short periods and metadata for longer.' },
      { t: 'summary', items: ['Mask personal data and secrets at collection, before storage', 'Pick the technique by need: redact, tokenise, hash, generalise', 'Unmask only through an approved, logged, separated process', 'Keep masked data useful: consistent tokens, every channel, tested'],
        say: 'To recap. | Mask personal data and secrets at the point of collection, before they reach storage or analysis. | Choose the technique to fit the need: redact secrets, tokenise what may need reversing, hash for correlation and generalise for analysis. | Allow unmasking only through an approved, logged process, with keys held by a separate team. | And keep masked telemetry useful, with consistent tokens, coverage of every channel and regular testing.' } ] },
    { type: 'text', md: `### Why mask AI telemetry?
Prompts, outputs, retrieved documents and tool results routinely contain personal data, confidential business information and secrets. Copying all of that into a SIEM creates a second, widely accessible store of sensitive data, which breaches **data minimisation** and **purpose limitation** (GDPR Article 5) and becomes an attractive target. Module 3.5 covered privacy-preserving audit trails; this section applies the same thinking to the SOC’s telemetry pipeline.

### Choosing a technique
| Technique | Reversible? | Keeps correlation? | Typical use |
|---|---|---|---|
| **Redaction** | No | No | Secrets, passwords, full card numbers, special category data not needed for security |
| **Tokenisation** | Yes, through a vault | Yes | Customer and employee identifiers that investigators may need to resolve |
| **Keyed hashing (HMAC)** | No (without the key, only by guessing) | Yes | User IDs and email addresses for correlation; prompt and output fingerprints |
| **Format-preserving encryption** | Yes, with the key | Yes | Fields that downstream systems validate by format |
| **Generalisation** | No | Partly | IP addresses to network ranges, timestamps to hours, locations to regions |
| **Differential privacy** | No | No (aggregates only) | Usage and abuse statistics shared widely |

Pseudonymised data (tokens, keyed hashes) is **still personal data** under the GDPR, because it can be linked back to a person with additional information. Only properly anonymised data falls outside it.

### Designing the masking pipeline
- **Mask at the edge:** in the AI gateway, instrumentation library or log collector, before data is stored or forwarded. Masking later in the SIEM leaves raw copies in transit and in buffers.
- **Detect what to mask:** personal data detectors (named entity recognition plus patterns), **secret scanners** for keys and tokens, and custom detectors for business identifiers. When a secret is found, **remove it and trigger rotation**, because it has already been exposed to the AI system.
- **Cover every channel:** prompts, outputs, retrieved documents, tool arguments and results, agent memory and error messages.
- **Handle embeddings carefully:** **embedding inversion** research shows text can often be partly reconstructed from vectors, so treat them as sensitive. Log document or chunk IDs and similarity scores instead of raw vectors.
- **Separate the keys:** a different team (for example, privacy engineering) controls the token vault and hashing keys. Re-identification needs a case reference, a stated purpose and approval, and every request is logged.
- **Keep content selectively:** where full content is needed, such as for a flagged session or a high-risk application, keep it encrypted in a restricted store with short retention (Module 3.5).
- **Use built-in privacy defaults:** for example, OpenTelemetry’s generative AI conventions make prompt and response content capture opt-in.
- **Test regularly:** measure detector recall on realistic samples, including other languages and unusual formats, and fix gaps.` },
    { type: 'match', title: 'Which masking technique fits?', pairs: [
      ['An API key pasted into a prompt', 'Redaction, plus rotating the key'],
      ['Customer IDs investigators may need to resolve later', 'Tokenisation with a protected vault'],
      ['Linking one user’s activity across events, without identity', 'Keyed hashing'],
      ['Spotting abuse by network without exact addresses', 'Generalisation to network ranges'],
      ['Monthly usage statistics shared across the company', 'Differential privacy'] ] },
    { type: 'callout', kind: 'exam', title: 'Masking questions', md: `The best answers **mask at collection**, use **consistent pseudonyms** so detection still works, **remove secrets entirely** (and rotate them), and allow **controlled, logged re-identification** by a separate key holder. "Collect everything raw and restrict SIEM access" and "collect nothing" are both weak.` },
    { type: 'check', q: { q: 'A privacy review finds that full customer prompts, including health details, are copied into the SIEM, where 60 analysts can search them. The SOC says it needs the data to investigate abuse. What is the BEST approach?', o: ['Stop sending AI telemetry to the SIEM, so customer prompts are never exposed to analysts', 'Mask personal data at collection with consistent tokens; allow approved, logged re-identification', 'Keep sending full prompts, but ask every analyst to sign a confidentiality agreement', 'Move the full prompts to a separate SIEM that only the SOC manager is allowed to search'], a: 1, b: 4,
      why: 'Masking at collection with consistent tokens keeps correlation and detection working, while re-identification stays possible for genuine cases under control. Stopping telemetry blinds the SOC, agreements don’t reduce exposure, and a separate SIEM still holds raw data.' } }
  ]
};
