/* 6.6 · Section 1: targeted mitigations (adversarial training, provenance tracking, data validation) */
module.exports = {
  title: 'Targeted mitigations', covers: [1],
  blocks: [
    { type: 'video', title: 'Matching the fix to the attack', kicker: 'Module 6.6 · Video 1 of 6', scenes: [
      { t: 'title', kicker: 'Module 6.6 · Mitigations', title: 'Matching the fix to the attack', sub: 'Targeted mitigations for AI threats', icon: 'target',
        say: 'A finding is only useful if it leads to the right fix. Generic controls help, but each class of AI attack has mitigations aimed at its root cause, and each has costs and limits. | This video covers targeted mitigations, including adversarial training, provenance tracking, data validation and design patterns that contain prompt injection.' },
      { t: 'compare', title: 'Attack class and targeted mitigation', labels: ['Evasion', 'Poisoning', 'Prompt injection', 'Jailbreaks', 'Extraction'],
        cols: [{ h: 'Targeted mitigation', icon: 'shieldcheck', k: 'control' }, { h: 'Limits', icon: 'alert', k: 'threat' }],
        rows: [
          ['Adversarial training; input preprocessing', 'Costs accuracy; new attacks still work'],
          ['Data validation; provenance tracking', 'Subtle poisons can pass the checks'],
          ['Isolation patterns; least-privilege tools', 'Limits capability; may need redesign'],
          ['Safety training; input and output classifiers', 'Extra cost; some over-refusal'],
          ['Rate limits; output minimisation; monitoring', 'Slows attackers rather than stopping them'] ],
        say: 'Each attack class has its own targeted mitigations, and each has limits. | Evasion: adversarial training, which adds attack examples to training, and preprocessing of inputs. Both cost some accuracy, and new attacks still work. | Poisoning: validating data and tracking its provenance, so only checked data from known sources reaches training. Subtle poisons can still pass the checks. | Prompt injection: design patterns that isolate untrusted content, and least-privilege tools. These limit what the system can do, and may need a redesign. | Jailbreaks: safety training, plus classifiers on inputs and outputs. These add cost and some over-refusal. | And extraction: rate limits, returning only what users need, and monitoring for probing. These slow attackers down rather than stopping them.' },
      { t: 'bullets', title: 'Design patterns that contain injection', layout: 'grid', cols: 2, items: [
          { icon: 'list', h: 'Action-selector', d: 'Acts, but never reads tool output', k: 'control' },
          { icon: 'flag', h: 'Plan-then-execute', d: 'Plan fixed before untrusted input', k: 'human' },
          { icon: 'split', h: 'Map-reduce', d: 'Isolated workers per untrusted item', k: 'data' },
          { icon: 'layers', h: 'Dual LLM', d: 'Quarantined model handles untrusted text', k: 'model' },
          { icon: 'code', h: 'Code-then-execute', d: 'Tracked data flow in a safe language', k: 'neutral' },
          { icon: 'filter', h: 'Context minimisation', d: 'Drop what later steps don’t need', k: 'threat' } ],
        say: 'Prompt injection can’t be filtered away reliably, so a 2025 paper by researchers from several companies and universities set out design patterns that contain it. The principle: once an agent has read untrusted input, that input must not be able to trigger consequential actions. | Action-selector: the agent can trigger actions, but never reads their output. | Plan-then-execute: the plan of tool calls is fixed before any untrusted content is read. | Map-reduce: each untrusted item is processed by an isolated worker, and only constrained results are combined. | Dual LLM: a privileged model coordinates, while a quarantined model handles untrusted text and returns only placeholders. | Code-then-execute: a privileged model writes a program in a restricted language, so the flow of tainted data can be tracked and checked. | And context minimisation: remove content that later steps don’t need, so it can’t influence them.' },
      { t: 'stat', kicker: 'Targeted, but not free', num: { v: 4.4, dec: 1, suf: '%', label: 'jailbreak success with classifiers (was 86%)' },
        def: 'Anthropic’s Constitutional Classifiers (2025): 0.38% more refusals and about 24% more compute.',
        ex: 'A public challenge still found one universal jailbreak.',
        say: 'Here is what a well-targeted mitigation can achieve. In 2025, Anthropic tested input and output classifiers trained against jailbreaks. Automated jailbreak success fell from eighty-six per cent to four point four per cent. | The cost was a small rise in refusals, about four tenths of a per cent, and about a quarter more compute. | And in a public challenge, one participant still found a universal jailbreak. Targeted mitigations reduce risk substantially, but rarely remove it, which is why they are layered and monitored.' },
      { t: 'summary', items: ['Match each mitigation to the attack’s root cause', 'Validate data and track provenance against poisoning', 'Contain prompt injection by design, not just filters', 'Every mitigation has costs and limits: layer and measure'],
        say: 'To recap. | Match each mitigation to the root cause of the attack it addresses. | Validate data and track its provenance to defend against poisoning. | Contain prompt injection by design, rather than relying on filters alone. | And remember that every mitigation has costs and limits, so layer them, and measure what they achieve.' } ] },
    { type: 'text', md: `### Choosing targeted mitigations
| Threat | Targeted mitigations | Notes |
|---|---|---|
| **Evasion** | Adversarial training; input transformation; ensembles; certified robustness for some models | Robustness to known attacks often costs accuracy (Module 6.1) |
| **Poisoning and backdoors** | Trusted, signed sources; provenance tracking; validation and quarantine; deduplication and outlier checks; backdoor scanning and testing | Combine with evaluation after training (Modules 3.3 and 6.3) |
| **Prompt injection** | Isolation design patterns; least-privilege tools; human approval for consequential actions; output validation | Filters help, but aren’t sufficient on their own |
| **Jailbreaks** | Safety training on red-team data; input and output classifiers; monitoring | Expect a trade-off with over-refusal |
| **Extraction and inversion** | Authentication, rate limits and quotas; returning only needed detail (no raw scores); differential privacy; watermarks for ownership evidence | Raises attackers’ costs (Module 3.6) |
| **Data leakage** | Data minimisation; permission-aware retrieval; DLP on outputs | Treat outputs as untrusted (Module 3.5) |

### Adversarial training
Adversarial training adds attack examples, with correct labels or safe responses, to training or fine-tuning, so the model learns to resist them. For language models, the equivalent is **safety fine-tuning on red-team data**, often paired with **classifiers** on inputs and outputs. Know its limits: it hardens the model against the attacks it has seen, new techniques can still succeed, it can reduce accuracy or helpfulness, and it needs repeating as attackers adapt. Validate it with held-out attacks, not the training examples (Section 4).

### Provenance tracking and data validation
- **Provenance tracking:** record where every dataset, document and model came from, with hashes, signatures and lineage, so only approved inputs reach training and retrieval, and a poisoned source can be traced and removed (Module 6.3).
- **Data validation gates:** schema and format checks, value ranges, label consistency, duplicate and outlier detection, and scanning for personal data and toxic or injected content, with suspicious items quarantined for review (Module 3.3).
- **Approved snapshots:** train only on versioned, validated and signed snapshots.

### Containing prompt injection by design
Module 4.4 introduced plan-then-execute and privileged and quarantined models. The 2025 paper *Design Patterns for Securing LLM Agents against Prompt Injections*, by researchers from organisations including IBM, Invariant Labs, ETH Zurich, Google and Microsoft, describes six patterns: **action-selector**, **plan-then-execute**, **LLM map-reduce**, **dual LLM**, **code-then-execute** and **context minimisation**. Google DeepMind’s research system **CaMeL** (2025) applies the same idea, separating control flow from data flow and attaching capabilities to data, so untrusted content can’t change what the agent does. Each pattern gives up some flexibility for security; choose by the agent’s risk tier.` },
    { type: 'match', title: 'Which mitigation targets the threat?', pairs: [
      ['A competitor queries an API at scale to copy the model', 'Rate limits, quotas and output minimisation'],
      ['Scraped web pages may contain planted training samples', 'Provenance tracking and data validation gates'],
      ['An email agent might act on instructions in incoming mail', 'Plan-then-execute, with approval for actions'],
      ['A fraud model is fooled by small changes to transactions', 'Adversarial training, validated on held-out attacks'],
      ['Users try role-play prompts to bypass content policy', 'Safety training plus input and output classifiers'] ] },
    { type: 'callout', kind: 'exam', title: 'Targeted mitigation questions', md: `Match the mitigation to the **root cause**: **provenance and data validation** for poisoning, **isolation patterns and least privilege** for prompt injection, **adversarial training** for evasion, **classifiers and safety training** for jailbreaks, and **rate limits and output minimisation** for extraction. Expect the best answers to acknowledge **trade-offs** and to **layer** controls rather than rely on one.` },
    { type: 'check', q: { q: 'An agent reads customer emails and can issue refunds. Which mitigation BEST addresses the root cause of prompt injection in this design?', o: ['A longer system prompt telling the agent to ignore instructions found in emails', 'Fixing the plan before reading emails, and requiring approval for refunds', 'A larger model, since bigger models are always better at spotting injection', 'Logging every email the agent reads, for review at the end of each month'], a: 1, b: 1,
      why: 'Plan-then-execute stops email content from changing which actions run, and human approval contains the consequential action. Instructions in prompts are weak, model size isn’t a control, and monthly reviews are too late.' } }
  ]
};
