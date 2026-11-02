/* 3.7 · Section 3: risks associated with foundation and pre-trained models */
module.exports = {
  title: 'Risks of foundation and pre-trained models', covers: [3],
  blocks: [
    { type: 'video', title: 'What you inherit from a foundation model', kicker: 'Module 3.7 · Video 3 of 3', scenes: [
      { t: 'title', kicker: 'Module 3.7 · AI supply chain', title: 'What you inherit from a foundation model', sub: 'Risks of foundation and pre-trained models', icon: 'layers',
        say: 'Few organisations train large models from scratch. They start from a foundation model, and inherit everything that came with it: the good, the flawed and the hidden. | This video covers the risks of building on foundation and pre-trained models, and how to manage them.' },
      { t: 'layers', title: 'What a foundation model passes on',
        layers: [
          { icon: 'database', label: 'Unknown training data', sub: 'Copyright, personal data, poisoning, bias', k: 'data' },
          { icon: 'bug', label: 'Hidden behaviours', sub: 'Backdoors and triggers that survive fine-tuning', k: 'threat' },
          { icon: 'shield', label: 'Fragile safeguards', sub: 'Safety training that fine-tuning can undo', k: 'control' },
          { icon: 'gavel', label: 'Licence terms', sub: 'Use restrictions and obligations downstream', k: 'human' },
          { icon: 'cloud', label: 'Provider dependence', sub: 'Updates, deprecation, outages, lock-in', k: 'neutral' } ],
        say: 'A foundation model passes on five kinds of risk. | Its training data is largely unknown to you, and may include copyrighted works, personal data, poisoned content and biased samples. | It may carry hidden behaviours, such as backdoors with triggers that survive your fine-tuning. | Its safety training can be fragile: research has shown that fine-tuning, even on a small number of examples, can undo it. | Its licence may restrict how you use it, and pass obligations on to your customers. | And if it is hosted, you depend on the provider for updates, version availability and uptime, which risks lock-in.' },
      { t: 'chart', title: 'Fine-tuning can erode safety training', kind: 'line', x: ['Base', '10', '50', '100', '500', '1,000'], yMin: 0, yMax: 100, ticks: 4, unit: '%', yLabel: 'Illustrative refusal rate on harmful requests, by number of fine-tuning examples', legend: true,
        series: [
          { n: 'Fine-tuned on harmful examples', k: 'threat', v: [95, 40, 18, 10, 6, 5] },
          { n: 'Fine-tuned on benign task data', k: 'human', v: [95, 92, 88, 85, 80, 78] } ],
        steps: [{ s: [0] }, { s: [1] }, {}],
        say: 'Here is why fine-tuning needs its own safety testing. In this illustrative chart, a model that refused almost all harmful requests is fine-tuned on a small number of harmful examples, and its refusals collapse. Researchers showed in 2023 that around ten such examples could be enough. | Even fine-tuning on ordinary, benign task data can gradually weaken safety behaviour. | So treat every fine-tuned model as a new model: re-run safety and security evaluations before it is approved.' },
      { t: 'compare', title: 'Open weights and hosted APIs', labels: ['You control', 'Main inherited risks', 'Key controls'],
        cols: [{ h: 'Open-weight model', icon: 'unlock', k: 'human' }, { h: 'Hosted model API', icon: 'cloud', k: 'data' }],
        rows: [
          ['Weights, hosting, updates', 'Prompts and integration'],
          ['Backdoors, unsafe files, licences', 'Silent changes, outages, data use'],
          ['Verify, scan, evaluate, pin', 'Pin versions, contract, fallbacks'] ],
        say: 'Your risks depend on how you consume the model. | With open weights, you control the weights, the hosting and when you update. With a hosted API, you control only your prompts and integration. | Open weights bring risks such as backdoors, unsafe file formats and licence terms. Hosted models bring silent behaviour changes, outages and questions about how your data is used. | So for open weights: verify, scan, evaluate and pin. For hosted APIs: pin versions, secure the contract and plan fallbacks.' },
      { t: 'bullets', title: 'Managing foundation model risk', items: [
          { icon: 'list', h: 'Select deliberately', d: 'Provenance, documentation, licence, track record', k: 'neutral' },
          { icon: 'search', h: 'Evaluate for your use', d: 'Capability, safety, bias, security', k: 'control' },
          { icon: 'shield', h: 'Load and run safely', d: 'Safe formats, sandboxes, least privilege', k: 'threat' },
          { icon: 'cycle', h: 'Re-test after changes', d: 'Fine-tunes and new versions', k: 'model' },
          { icon: 'split', h: 'Plan an exit', d: 'Abstraction layer, approved alternatives', k: 'human' } ],
        say: 'Five practices manage most of this risk. | Select models deliberately, considering provenance, documentation, licence terms and the provider’s security track record. | Evaluate the model for your own use case: capability, safety, bias and security, not just public benchmark scores. | Load and run it safely: safe file formats, sandboxed environments and least privilege for anything it can call. | Re-test after every fine-tune and every version change. | And plan an exit: an abstraction layer and pre-approved alternatives, so a deprecation, licence change or outage doesn’t strand you.' },
      { t: 'summary', items: ['You inherit unknown data, hidden behaviours and licence terms', 'Fine-tuning can undo safety training: re-test every change', 'Open weights: verify, scan, pin; hosted: pin, contract, fallback', 'Select deliberately, evaluate for your use, plan an exit'],
        say: 'To recap. | Building on a foundation model means inheriting unknown training data, possible hidden behaviours and licence terms. | Fine-tuning can undo safety training, so re-test every fine-tuned model and every version change. | For open weights, verify, scan and pin. For hosted APIs, pin versions, secure the contract and plan fallbacks. | And select models deliberately, evaluate them for your own use, and always have an exit plan.' } ] },
    { type: 'text', md: `### Inherited risks in detail
| Risk | What it means | Example controls |
|---|---|---|
| **Unknown training data** | Possible copyrighted works, personal data, poisoned or biased content, and benchmark contamination that inflates scores | Provider documentation and training data summaries; your own evaluations; legal review; indemnities where available (Module 2.4) |
| **Backdoors and hidden triggers** | Behaviour that activates only on specific inputs. Anthropic’s 2024 *Sleeper Agents* research showed that deliberately trained backdoors could persist through standard safety training | Trusted sources, provenance checks, behavioural testing, monitoring in production; accept that testing can’t prove absence |
| **Unsafe artefacts** | Pickle-based files that run code on load; malicious loading code | Safe formats, scanning, sandboxed loading, remote code disabled (Module 3.6) |
| **Fragile safety alignment** | Qi and colleagues (2023) showed that fine-tuning on as few as 10 harmful examples could largely remove a model’s safety behaviour, and benign fine-tuning could also degrade it | Re-run safety evaluations after every fine-tune; control who can fine-tune and on what data |
| **Inherited vulnerabilities** | Jailbreaks and adversarial inputs that work on the base model often transfer to its derivatives | Track advisories for the base model; test derivatives against known attacks |
| **Licence restrictions** | Acceptable use policies, user thresholds, field-of-use limits, attribution and pass-through obligations | Licence review before adoption; record licences in the AIBOM |
| **Provider dependence** | Silent updates behind aliases, deprecations, outages, changes to terms or data use | Version pinning, contractual notice periods, fallbacks, exit plans (Modules 2.5 and 3.6) |
| **Concentration risk** | Many organisations relying on a few models, so one flaw or outage spreads widely | Diversity where critical; business continuity planning (Module 5.7) |

### Regulatory context
Under the EU AI Act, providers of **general-purpose AI models** must keep technical documentation, give downstream providers the information they need to understand the model’s capabilities and limitations, have a copyright policy, and publish a summary of training content (Article 53). Providers of models with **systemic risk** have further duties, including model evaluation, adversarial testing, incident reporting and cybersecurity protection (Article 55). If you build a high-risk system on a general-purpose model, you remain responsible for that system’s compliance, so ask for, and use, the provider’s documentation.

### A foundation model adoption checklist
1. **Need and alternatives:** is a foundation model necessary, and which options exist?
2. **Source and provenance:** official publisher, signatures, model card, training data summary, AIBOM.
3. **Licence and terms:** permitted uses, restrictions, data use by hosted providers, indemnities.
4. **Security review:** file formats, loading code, dependencies, hosting architecture, data flows.
5. **Evaluation:** task performance, safety, bias, robustness and security testing on your own data and threat model.
6. **Approval:** risk tier, conditions and owner (Module 3.5), with an inventory and AIBOM entry.
7. **Operation:** pinned version, monitoring, re-testing after changes, and an exit plan.` },
    { type: 'callout', kind: 'exam', title: 'Foundation model questions', md: `Remember three ideas. **Accountability stays with you**: using a vendor’s model doesn’t transfer responsibility for your system. **Every change is a new model**: fine-tunes and version upgrades need re-evaluation. **Testing can’t prove the absence of backdoors**, so combine trusted provenance, testing, least privilege and monitoring.` },
    { type: 'scenario', title: 'The quiet upgrade', md: `A retailer’s returns assistant calls a hosted foundation model through the provider’s “latest” alias. One Monday, replies start arriving in a slightly different format, a downstream parser fails, and testers notice the assistant now agrees to requests it used to refuse. The provider had released a new model version over the weekend and moved the alias to it.`,
      q: { q: 'Which control would MOST likely have prevented this disruption?', o: ['Asking the provider to email the team whenever it plans to release a new model', 'Pinning a dated model version, and re-testing before moving to any new one', 'Switching to a different provider whose releases are usually less frequent', 'Adding more examples to the system prompt to make the reply format stricter'], a: 1, b: 3,
        why: 'Pinning stops the provider changing the model underneath the application, and re-testing before an upgrade catches format and safety changes. Emails and release frequency don’t give control, and prompt tweaks don’t address the safety change.' } },
    { type: 'check', q: { q: 'A team fine-tunes an approved open-weight model on 2,000 internal support tickets. The base model passed the organisation’s safety evaluations last quarter. What should happen before the fine-tuned model is deployed?', o: ['Nothing further, because the base model already passed the organisation’s safety evaluations', 'Re-run safety and security evaluations on the fine-tuned model, and approve it as a new version', 'Ask the base model’s publisher to confirm that fine-tuning won’t have changed its behaviour', 'Deploy it to all users at once, and check customer complaints for safety problems afterwards'], a: 1, b: 3,
      why: 'Fine-tuning can weaken safety behaviour, even on benign data, so the fine-tuned model is a new model that needs its own evaluation and approval. The publisher can’t vouch for your fine-tune, and relying on complaints means users find the problems first.' } }
  ]
};
