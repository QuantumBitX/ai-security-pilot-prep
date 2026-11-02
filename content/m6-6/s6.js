/* 6.6 · Section 6: deep dive — robustness defences and guardrail models */
module.exports = {
  title: 'Deep dive: robustness defences and guardrail models', covers: [1, 2],
  blocks: [
    { type: 'video', title: 'Hardening models and guarding them', kicker: 'Module 6.6 · Video 6 of 6', scenes: [
      { t: 'title', kicker: 'Module 6.6 · Deep dive', title: 'Hardening models and guarding them', sub: 'Adversarial training, certified robustness and guardrail models', icon: 'shield',
        say: 'Section one matched each attack class to a targeted mitigation. This deep dive looks inside two of the most important: making the model itself more robust, and wrapping it in separate guardrail models that check what goes in and what comes out. | For each, you will see what it really guarantees, what it costs, and how to evaluate it.' },
      { t: 'compare', title: 'Empirical or certified robustness?', labels: ['How it is shown', 'Main methods', 'Strength', 'Limitation'],
        cols: [{ h: 'Empirical', icon: 'target', k: 'control' }, { h: 'Certified', icon: 'shieldcheck', k: 'model' }],
        rows: [
          ['Survives the strongest known attacks', 'A proof within a set radius'],
          ['PGD adversarial training, TRADES', 'Randomised smoothing, verifiers'],
          ['Scales to large, practical models', 'Holds against any attack in range'],
          ['A new attack may still break it', 'Small radii; may abstain'] ],
        say: 'Robustness comes in two kinds. | Empirical robustness is shown by surviving the strongest known attacks. Certified robustness is proved mathematically, for any change within a set radius. | The main empirical method is adversarial training with PGD, and variants such as TRADES. Certified methods include randomised smoothing and formal verifiers. | Empirical methods scale to large, practical models. A certificate holds against any attack within its range, including attacks not yet invented. | But an empirical defence can fall to a new attack, while certificates cover only small radii, cost more to compute, and sometimes abstain rather than answer.' },
      { t: 'flow', title: 'Randomised smoothing: a provable answer, or none',
        nodes: [
          { id: 'in', x: 225, y: 510, icon: 'image', label: 'Input', sub: 'one image', k: 'data', w: 230 },
          { id: 'nz', x: 550, y: 510, icon: 'dice', label: 'Add noise', sub: 'hundreds of copies', k: 'control', w: 280 },
          { id: 'bc', x: 880, y: 510, icon: 'model', label: 'Classify', sub: 'label every copy', k: 'model', w: 260 },
          { id: 'vt', x: 1170, y: 510, icon: 'bars', label: 'Count votes', sub: 'top label, margin', k: 'model', w: 240 },
          { id: 'ct', x: 1400, y: 300, icon: 'shieldcheck', label: 'Certified', sub: 'safe within R', k: 'control', w: 200 },
          { id: 'ab', x: 1400, y: 720, icon: 'hitl', label: 'Abstain', sub: 'too close', k: 'human', w: 200 } ],
        edges: [{ from: 'in', to: 'nz', k: 'data' }, { from: 'nz', to: 'bc', k: 'control' }, { from: 'bc', to: 'vt', k: 'model' }, { from: 'vt', to: 'ct', k: 'control' }, { from: 'vt', to: 'ab', k: 'human', dash: true }],
        steps: [
          { show: 'in', hi: 'in' },
          { show: 'nz in-nz', flow: 'in-nz', hi: 'nz' },
          { show: 'bc nz-bc', flow: 'nz-bc', hi: 'bc' },
          { show: 'vt bc-vt', flow: 'bc-vt', hi: 'vt' },
          { show: 'ct vt-ct', flow: 'vt-ct', hi: 'ct' },
          { show: 'ab vt-ab', flow: 'vt-ab', hi: 'ab', mark: { ab: 'warn' } } ],
        say: 'Randomised smoothing, introduced by Cohen and colleagues in 2019, turns an ordinary classifier into one with a provable guarantee. It starts with the input to be classified. | It makes many copies of the input, each with random Gaussian noise added. | The ordinary, base classifier labels every noisy copy. | The votes are counted, and the smoothed classifier returns the most common label. | If that label wins clearly, the answer comes with a certificate: no change within a radius R, measured in the L-two norm, can alter it. More noise gives larger radii, but lower accuracy. | If the vote is too close to call, the classifier abstains rather than guessing, so the system needs a fallback, such as human review.' },
      { t: 'bullets', title: 'Guardrail models and services', layout: 'grid', cols: 2,
        items: [
          { icon: 'shieldcheck', h: 'Llama Guard', d: 'Meta: labels prompts and responses', k: 'control' },
          { icon: 'alert', h: 'Llama Prompt Guard 2', d: 'Meta: small injection detector', k: 'control' },
          { icon: 'shield', h: 'ShieldGemma', d: 'Google: policy-based classifiers', k: 'control' },
          { icon: 'filter', h: 'Prompt Shields', d: 'Azure: prompt and document attacks', k: 'control' },
          { icon: 'gear', h: 'NeMo Guardrails', d: 'NVIDIA: programmable rails', k: 'control' },
          { icon: 'check', h: 'Guardrails AI', d: 'Open-source output validators', k: 'control' },
          { icon: 'cloud', h: 'Bedrock Guardrails', d: 'AWS: filters, PII, grounding', k: 'control' },
          { icon: 'book', h: 'Constitutional Classifiers', d: 'Anthropic: trained from principles', k: 'control' } ],
        say: 'Guardrail models are separate classifiers that check what goes into and comes out of the main model. Here are eight you may meet. | Meta’s Llama Guard is an open-weight model that labels prompts and responses against a hazard taxonomy. Version four also handles images. | Llama Prompt Guard two is a small, fast classifier that flags prompt injection and jailbreak attempts. | Google’s ShieldGemma models judge content against a written safety policy. | Microsoft’s Prompt Shields, in Azure AI Content Safety, detect attacks both in user prompts and in documents the model reads. | NVIDIA’s NeMo Guardrails is an open-source toolkit for programmable rails on inputs, dialogue, retrieval and outputs. | Guardrails AI is an open-source framework of validators that check and correct model outputs. | Amazon Bedrock Guardrails combines content and prompt-attack filters, denied topics, personal data filters and grounding checks. | And Anthropic’s Constitutional Classifiers are trained on synthetic data generated from a set of principles. A twenty twenty-six update cut their extra compute to about one per cent.' },
      { t: 'layers', title: 'A guardrail stack, defence in depth',
        layers: [
          { icon: 'filter', label: 'Input checks', sub: 'injection and jailbreak detection; personal data redaction', k: 'control' },
          { icon: 'lock', label: 'Context controls', sub: 'retrieval permissions, tool allowlists, least privilege', k: 'control' },
          { icon: 'model', label: 'Safety-trained model', sub: 'refusal behaviour learned in training', k: 'model' },
          { icon: 'shieldcheck', label: 'Output checks', sub: 'harm classifiers, grounding and data leakage checks', k: 'control' },
          { icon: 'eye', label: 'Monitoring', sub: 'conversation-level signals, rates and alerts', k: 'human' } ],
        say: 'No single guardrail is enough, so they are stacked. | Input checks screen prompts and documents for injection and jailbreak attempts, and redact personal data. | Context controls limit what the model can reach: retrieval permissions, tool allowlists and least privilege, which still work when a classifier misses. | The model’s own safety training is the middle layer. | Output checks catch harmful content, ungrounded claims and data leakage before anything reaches a user or a tool. | And monitoring watches whole conversations and the rates of blocks and alerts, to catch slow, multi-turn attacks and drift.' },
      { t: 'summary', items: ['Adversarial training resists known attacks, at a cost', 'Certificates prove robustness, but only within a radius', 'Guardrail models check inputs and outputs independently', 'Test guardrails for misses, false blocks and evasion'],
        say: 'To recap. | Adversarial training makes a model resist the attacks it was trained against, at a cost in compute and clean accuracy. | Certified methods prove robustness, but only within a small radius, and may abstain. | Guardrail models check inputs and outputs independently of the main model. | And every guardrail must be tested for misses, for false blocks of legitimate use, and for deliberate evasion.' } ] },
    { type: 'text', md: `### Adversarial training in practice
**PGD adversarial training** (Madry et al., 2018) generates adversarial examples on the fly and trains on them at every step. Know its costs and limits:
- **Compute:** each training step runs several attack iterations, so training costs several times more. Cheaper single-step variants must be watched for **catastrophic overfitting**, where robustness suddenly collapses.
- **Accuracy:** clean accuracy usually falls. **TRADES** (Zhang et al., 2019) makes the trade-off between clean accuracy and robustness an explicit, tunable term.
- **Scope:** robustness holds mainly for the threat model used in training, such as L∞ at 8/255, not for other norms, patches or new kinds of attack.
- **Robust overfitting:** robust accuracy on test data can peak and then decline during training, so stop early using a robust validation set.

For language models, the equivalent is safety training on red-team data, including optimised attacks, combined with classifiers.

### Certified robustness
- **Randomised smoothing** (Cohen, Rosenfeld and Kolter, 2019) classifies many Gaussian-noised copies of an input and returns the majority label, with a certified L2 radius that grows with the noise level and the winning margin. It abstains when the vote is too close.
- **Bound propagation and formal verification** prove that no input within a region can change the output, but scale poorly to large models.

Certificates cover a stated norm and radius only, usually smaller than the changes attackers can make in practice. They are most valuable for smaller, high-stakes models where a provable bound matters.

### Guardrail models and services
| Tool | Provider | What it does |
|---|---|---|
| **Llama Guard 3 and 4** | Meta | Open-weight classifiers that label prompts and responses against the MLCommons hazard taxonomy; version 4 (12B) also handles images |
| **Llama Prompt Guard 2** | Meta | Small classifiers (86M and 22M parameters) that flag prompt injection and jailbreak attempts, with a 512-token window |
| **ShieldGemma** | Google | Open-weight safety classifiers that judge content against a written policy |
| **Prompt Shields** | Microsoft Azure | Detects attacks in user prompts and in documents the model processes |
| **NeMo Guardrails** | NVIDIA | Open-source toolkit for programmable input, dialogue, retrieval and output rails, written in Colang |
| **Guardrails AI** | Open source | Validators that check and correct outputs for format, personal data, toxicity and more |
| **Bedrock Guardrails** | AWS | Content and prompt-attack filters, denied topics, personal data filters and contextual grounding checks |
| **Constitutional Classifiers** | Anthropic | Input and output classifiers trained on synthetic data generated from a constitution (Section 1). A 2026 version screens traffic with a cheap probe of the model’s internal activations, escalating flagged exchanges, for about 1% extra compute |

### Evaluating a guardrail
- **Misses and false blocks:** measure detection on your own attack sets, and false positives on realistic benign traffic, in every language you support.
- **Evasion:** Hackett and colleagues (2025) evaded six prompt injection and jailbreak detectors, including Azure Prompt Shield and Meta’s Prompt Guard, using character injection and adversarial machine learning techniques, in some cases with up to 100% success. Test obfuscated variants, not just known attacks.
- **Coverage:** check context limits (long inputs may need splitting), every modality, and whether indirect content such as retrieved documents and tool results is screened.
- **Operations:** latency, cost, whether failures block or allow traffic (fail closed or fail open), and logging for monitoring (Section 5).

A guardrail is one layer. Pair it with least privilege, sandboxing and human approval for high-impact actions, which still protect the system when a classifier misses.` },
    { type: 'flip', title: 'Robustness and guardrail terms', cards: [
      ['Empirical robustness', 'Resistance shown by surviving the strongest known attacks; a new attack may still break it.'],
      ['Certified robustness', 'A mathematical guarantee that no change within a stated radius can alter the output.'],
      ['Randomised smoothing', 'Classifying many noisy copies of an input and returning the majority label, with a certified radius or an abstention.'],
      ['TRADES', 'An adversarial training method that tunes the trade-off between clean accuracy and robustness.'],
      ['Guardrail model', 'A separate classifier that screens a model’s inputs or outputs against a safety or security policy.'],
      ['Fail closed', 'When a guardrail errors or times out, traffic is blocked rather than allowed through.'] ] },
    { type: 'steps', title: 'Evaluating a guardrail before relying on it', items: [
      ['Build the test sets', 'Assemble attack prompts for each family in Module 6.4, plus a realistic benign set from your own traffic.'],
      ['Measure both errors', 'Record the detection rate on attacks and the false positive rate on benign inputs, per language and channel.'],
      ['Try to evade it', 'Test obfuscated, encoded and character-level variants, and indirect content such as documents and tool results.'],
      ['Check the operations', 'Measure latency and cost, confirm the failure mode, and make sure decisions are logged for monitoring.'],
      ['Layer and retest', 'Keep least privilege and approvals behind the guardrail, and rerun the tests whenever either side changes.'] ] },
    { type: 'check', q: { q: 'A medical imaging model is protected by randomised smoothing. On some scans, it returns no diagnosis at all. What is the MOST likely explanation?', o: ['The base classifier has failed and must be retrained before further use', 'The noisy votes were too close to call, so the classifier abstained', 'An attacker has disabled the model through a denial of service attack', 'The certified radius was set to zero, disabling all predictions'], a: 1, b: 1,
      why: 'Randomised smoothing abstains when the most common label among noisy copies doesn’t win by a clear margin. That is designed behaviour, so the system needs a fallback such as human review, not evidence of failure or attack.' } }
  ]
};
