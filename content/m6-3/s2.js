/* 6.3 · Section 2: AI acquisition practices, data ownership, licensing and legal/regulatory considerations */
module.exports = {
  title: 'Acquiring AI: ownership, licences and legal duties', covers: [2],
  blocks: [
    { type: 'video', title: 'Who owns it, and what may you do with it?', kicker: 'Module 6.3 · Video 2 of 4', scenes: [
      { t: 'title', kicker: 'Module 6.3 · AI supply chain', title: 'Who owns it, and what may you do with it?', sub: 'Acquisition, data ownership, licensing and legal considerations', icon: 'gavel',
        say: 'Acquiring AI means acquiring rights as well as technology: rights over your data, outputs and customised models, and permission to use models and datasets the way you intend. Get these wrong, and a working product can become unusable overnight. | This video covers AI acquisition practices, data ownership, licensing, and the legal and regulatory considerations that shape them.' },
      { t: 'compare', title: 'Data ownership in AI deals', labels: ['Inputs', 'Outputs', 'Fine-tunes', 'Logs', 'Derived data'],
        cols: [{ h: 'Ask', icon: 'search', k: 'human' }, { h: 'Aim for', icon: 'check', k: 'control' }],
        rows: [
          ['Kept? Used for training?', 'Yours; no training without consent'],
          ['Who owns them?', 'Yours, with IP protection'],
          ['Exportable? Shared?', 'Yours, exportable, used only by you'],
          ['Who sees them, for how long?', 'Minimal, agreed retention, deletion'],
          ['Embeddings and analytics?', 'Treated as your data'] ],
        say: 'Start with data ownership, asset by asset. | Inputs: ask whether the vendor keeps your prompts and files, and trains on them. Aim for customer ownership, and no training without explicit consent. | Outputs: aim for customer ownership, backed by IP protection such as an indemnity. | Fine-tuned models and adapters built on your data: aim for exclusive use, and export on exit. | Logs: aim for minimal logging, agreed retention and certified deletion. | And derived data, such as embeddings and usage analytics, can reveal the source data, so treat it as your data too.' },
      { t: 'flow', title: 'Licences follow the pedigree',
        nodes: [
          { id: 'base', x: 230, y: 330, icon: 'model', label: 'Base model', sub: 'community licence, AUP', k: 'model', w: 300 },
          { id: 'ft', x: 700, y: 330, icon: 'gear', label: 'Fine-tune', sub: 'adds the data’s terms', k: 'neutral', w: 290 },
          { id: 'copy', x: 1200, y: 330, icon: 'copy', label: 'Quantised copy', sub: 'licence file dropped', k: 'data', w: 300 },
          { id: 'data', x: 230, y: 690, icon: 'database', label: 'Tuning dataset', sub: 'non-commercial licence', k: 'threat', w: 310 },
          { id: 'rev', x: 700, y: 690, icon: 'gavel', label: 'Licence review', sub: 'traces the pedigree', k: 'control', w: 300 },
          { id: 'prod', x: 1200, y: 690, icon: 'money', label: 'Your product', sub: 'commercial use', k: 'human', w: 280 } ],
        edges: [{ from: 'base', to: 'ft', k: 'model' }, { from: 'data', to: 'ft', k: 'threat' }, { from: 'ft', to: 'copy', k: 'neutral' }, { from: 'copy', to: 'prod', k: 'data' }, { from: 'prod', to: 'rev', k: 'human' }],
        steps: [
          { show: 'base', hi: 'base' },
          { show: 'ft base-ft', flow: 'base-ft', hi: 'ft' },
          { show: 'data data-ft', flow: 'data-ft', hi: 'data', mark: { data: 'warn' } },
          { show: 'copy ft-copy', flow: 'ft-copy', hi: 'copy' },
          { show: 'prod copy-prod', flow: 'copy-prod', hi: 'prod' },
          { show: 'rev prod-rev', flow: 'prod-rev', hi: 'rev', mark: { prod: 'alert' } } ],
        say: 'Licences range from permissive ones, such as Apache 2.0, to community licences with usage policies and user thresholds, responsible AI licences with use restrictions, and non-commercial terms. And obligations build up along a model’s pedigree. Here, a team starts from an open-weight base model under a community licence. | It fine-tunes the model for a specialist task. | But the tuning dataset is licensed for non-commercial use only, and its terms may now restrict the fine-tuned model too. | Someone publishes a quantised copy for easier deployment, without the licence files. | Another team builds a paid product on that copy, believing it to be unrestricted. | A licence review traces the pedigree, finds the non-commercial restriction and the base model’s usage policy, and stops the launch until both are resolved. Remember, too, that open weights aren’t open source.' },
      { t: 'bullets', title: 'Legal and regulatory checkpoints', layout: 'grid', cols: 2, items: [
          { icon: 'flag', h: 'Your AI Act role', d: 'Rebranding or modifying can make you the provider', k: 'threat' },
          { icon: 'doc', h: 'Upstream documentation', d: 'GPAI providers must inform integrators', k: 'model' },
          { icon: 'lock', h: 'Data protection', d: 'Roles, DPAs, transfers, DPIAs', k: 'data' },
          { icon: 'building', h: 'Sector rules', d: 'For example, DORA contract terms', k: 'human' },
          { icon: 'gavel', h: 'Public sector', d: 'For example, OMB M-25-22', k: 'neutral' },
          { icon: 'globe', h: 'Export controls', d: 'Chips, models, restricted parties', k: 'control' } ],
        say: 'Six legal and regulatory checkpoints shape AI acquisition. | Your EU AI Act role. Rebranding, substantially modifying or repurposing a high-risk system can make you its provider. | Upstream documentation. Providers of general-purpose AI models must inform the providers who integrate them, so ask for it. | Data protection: controller and processor roles, processing agreements, international transfers and impact assessments. | Sector rules. For example, the EU’s Digital Operational Resilience Act sets contract terms for financial entities’ ICT providers. | Public sector rules. For example, US federal guidance from April 2025 bars agency AI vendors from training on non-public agency data without consent. | And export controls and sanctions, covering advanced chips, some model technology and restricted parties.' },
      { t: 'summary', items: ['Settle ownership of inputs, outputs, fine-tunes, logs and derived data', 'Check every licence along the pedigree, verified at source', 'Know your regulatory role; get upstream documentation', 'Check data protection, sector, public sector and export rules'],
        say: 'To recap. | Settle ownership of inputs, outputs, fine-tunes, logs and derived data in the contract. | Check every licence along a model’s pedigree, verified at source. | Know your role under AI regulation, and get documentation from upstream providers. | And check data protection, sector, public sector and export rules before you commit.' } ] },
    { type: 'text', md: `### AI acquisition practices
Building on the due diligence and contract terms in Module 2.5:
- **Match depth to the use case’s tier** (Module 2.3), and **pilot** with synthetic or non-sensitive data.
- **Control feature creep:** require advance notice of new AI features in products you already use, with the right to keep them off.
- **Plan for portability:** open formats, exportable fine-tunes, documented prompts and evaluation sets, and transition help.
- **Keep testing rights** (Module 6.4) and **version pinning with deprecation notice** (Module 6.2), and **close out cleanly** with data return, certified deletion and revoked tokens.

### Data ownership
| Asset | Position to seek |
|---|---|
| **Inputs** (prompts, files) | Customer-owned; no training or product improvement without explicit consent; retention limits, or zero retention |
| **Outputs** | Customer-owned as far as the law allows; an IP indemnity whose conditions you understand (Module 2.4) |
| **Fine-tunes and adapters** | Exclusive use; exportable in a usable format; deleted on request |
| **Logs and monitoring data** | Defined purpose, retention and access; available to you for investigations |
| **Derived data** (embeddings, analytics) | Treated as customer data, because it can reveal the source |

### Licensing
| Type | Examples | Typical conditions |
|---|---|---|
| **Permissive** | Apache 2.0, MIT, CC BY | Keep notices; give attribution |
| **Community** | Several open-weight model families | Acceptable use policy; naming or attribution rules; a separate licence above a user threshold (700 million monthly active users in Meta’s Llama licences) |
| **Responsible AI (RAIL)** | OpenRAIL-M | Prohibited uses that must flow down to recipients |
| **Non-commercial** | CC BY-NC, research licences | No commercial use |
| **Share-alike** | CC BY-SA, copyleft licences | Derivatives under the same terms |
| **Provider terms** | Hosted model APIs | Limits such as no training of competing models on outputs |

- **Open weights aren’t open source.** The OSI’s **Open Source AI Definition 1.0** (October 2024) also requires the code and detailed information about the training data.
- **Licences follow the pedigree:** a fine-tune, merge or copy may carry the obligations of every parent and dataset. Record them in the AIBOM (Section 4).
- **Verify at source.** The Data Provenance Initiative’s audit of more than 1,800 text datasets (2024) found over 70% of licences on popular hosting sites unspecified, and about half of those given wrong, often more permissive than the original.

### Legal and regulatory considerations
| Area | Consideration |
|---|---|
| **EU AI Act** | **Article 25**: rebranding, substantially modifying or repurposing a system into high risk makes you its **provider**. **Article 53**: providers of general-purpose AI models must document capabilities and limitations for integrators, and publish a summary of training content |
| **Data protection** | Controller and processor roles; GDPR Article 28 agreements; transfer mechanisms; DPIAs (Module 3.1) |
| **Financial services** | **DORA** (applying since January 2025): a register of ICT arrangements, mandatory contract terms and exit strategies; the first critical ICT third-party providers were designated in November 2025 |
| **US federal** | **OMB M-25-22** (April 2025): contracts must set out IP rights, **permanently prohibit** training on non-public agency data without consent, and address portability |
| **Export controls** | Advanced chips, some model technology, restricted parties |` },
    { type: 'scenario', title: 'The model that looked free', md: `A retailer’s data science team found a fine-tuned model on a public hub that answers product questions well. Its model card says it was tuned from a popular open-weight base model “using publicly available datasets”, and the hub lists its licence as Apache 2.0. The team wants to use it in a paid, customer-facing service next month.`,
      q: { q: 'What should happen BEFORE the model is approved for commercial use?', o: ['Nothing more, because the hub lists the model under the permissive Apache 2.0 licence', 'Trace the pedigree: the base model’s licence and policy, and dataset licences at source', 'Rename the model in the product so that it can’t easily be linked back to its origin', 'Restrict it to internal staff, so that the licence conditions no longer apply to it'], a: 1, b: 2,
        why: 'A hub label is weak evidence, and a fine-tune may carry the obligations of its base model and its tuning data. Tracing the pedigree and verifying licences at source is the right step. Renaming would hide a possible breach, and internal use doesn’t make licence terms disappear.' } },
    { type: 'callout', kind: 'exam', title: 'Acquisition questions', md: `Look for answers that **settle rights before use**: customer ownership of inputs, outputs and fine-tunes; **no training on your data without consent**; **licence checks along the pedigree**, verified at source; and awareness of **role changes** under the EU AI Act. "It’s free to download" and "the hub says Apache 2.0" are traps.` },
    { type: 'check', q: { q: 'A company puts its own brand on a third-party high-risk AI system and sells it to customers in the EU. What is the MOST significant regulatory consequence?', o: ['The original provider’s obligations transfer automatically to the company’s customers', 'The company may take on all the provider’s obligations for the high-risk system', 'The system is reclassified as minimal risk once a distributor has rebranded it', 'The company only needs to update the marketing materials that describe the system'], a: 1, b: 2,
      why: 'Under Article 25 of the EU AI Act, putting your name or trademark on a high-risk system can make you its provider, with the full set of provider obligations. Obligations don’t pass to customers, rebranding doesn’t change the risk class, and marketing changes aren’t enough.' } }
  ]
};
