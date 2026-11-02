/* 1.3 · Section 1: reliability limitations */
module.exports = {
  title: 'Model reliability limitations', covers: [1],
  blocks: [
    { type: 'video', title: 'When models get it wrong', kicker: 'Module 1.3 · Video 1 of 6', scenes: [
      { t: 'title', kicker: 'Module 1.3 · Limitations and performance', title: 'When models get it wrong', sub: 'Hallucination, non-determinism and uncertainty', icon: 'alert',
        say: 'Every AI system is wrong some of the time. The question is how, how often, and what happens next. | This video covers the three reliability limits you must design around: hallucination, non-determinism and uncertainty.' },
      { t: 'chat', title: 'Fluent, specific and wrong', app: 'Legal research assistant',
        msgs: [
          { r: 'user', t: 'Find me a precedent where an airline was held liable for wrong advice from its website chatbot.' },
          { r: 'ai', t: 'Certainly. In Harland v. Northern Skies Airways [2019] EWCA Civ 482, the Court of Appeal held the airline liable for its chatbot’s misstatement.' },
          { r: 'note', t: 'That case does not exist. The citation format is perfect; the content is invented.' } ],
        notes: [null, null, { h: 'Hallucination', d: 'Output that is fluent and plausible but false or unsupported. NIST calls it confabulation.', k: 'threat' }],
        say: 'A lawyer asks a research assistant for a precedent. | The answer looks perfect: a case name, a year, a court and a neutral citation in the right format. | But the case doesn’t exist. The model produced the most plausible-looking answer, not a verified one. This is hallucination, which the NIST generative AI profile calls confabulation.' },
      { t: 'bullets', title: 'Why hallucinations happen', items: [
          { icon: 'sparkle', h: 'Trained for plausibility', d: 'Models predict likely text; nothing checks it against reality', k: 'model' },
          { icon: 'clock', h: 'Gaps and stale knowledge', d: 'Facts missing from training, or newer than the cut-off', k: 'data' },
          { icon: 'target', h: 'Rewarded for guessing', d: 'Training and benchmarks often favour a guess over “I don’t know”', k: 'human' },
          { icon: 'search', h: 'Weak or missing context', d: 'Vague prompts, or retrieval that returns the wrong passages', k: 'neutral' },
          { icon: 'link', h: 'Errors that compound', d: 'One wrong step early in a long answer or agent task carries forward', k: 'threat' } ],
        say: 'Why does this happen? | First, models are trained to produce plausible continuations of text. Nothing in that process checks a claim against the real world. | Second, the facts may simply be missing: too rare in the training data, or newer than the training cut-off. | Third, training and many benchmarks reward a confident guess more than an honest “I don’t know”, so models learn to guess. | Fourth, a vague prompt, or retrieval that returns the wrong passages, leaves the model filling gaps. | And in long answers and multi-step agent tasks, one early error carries forward and compounds.' },
      { t: 'compare', title: 'Two kinds of hallucination', labels: ['What it is', 'Example', 'First defence'],
        cols: [{ h: 'Intrinsic', icon: 'doc', k: 'data' }, { h: 'Extrinsic', icon: 'globe', k: 'human' }],
        rows: [
          ['Output contradicts the source it was given', 'Output adds claims the source can’t support'],
          ['A summary says “approved” when the report says “rejected”', 'A summary adds a deadline that appears nowhere'],
          ['Faithfulness checks against the source', 'Require citations; verify or remove unsupported claims'] ],
        say: 'It helps to separate two kinds. | An intrinsic hallucination contradicts the source the model was given. An extrinsic hallucination adds something the source simply doesn’t contain. | For example, a summary that says a request was approved when the report says rejected is intrinsic. A summary that invents a deadline is extrinsic. | Intrinsic errors are caught by checking faithfulness to the source. Extrinsic errors are caught by requiring citations, and verifying or removing anything that has none.' },
      { t: 'bullets', title: 'Same prompt, different answers', items: [
          { icon: 'dice', h: 'Sampling', d: 'Temperature and top-p deliberately add randomness', k: 'model' },
          { icon: 'chip', h: 'Hardware and batching', d: 'Floating-point order varies, so even temperature 0 can differ', k: 'neutral' },
          { icon: 'cycle', h: 'Silent updates', d: 'A provider changes the model behind the same name', k: 'threat' },
          { icon: 'search', h: 'Changing context', d: 'Different retrieved passages, tool results or history', k: 'data' } ],
        say: 'The second limit is non-determinism: the same prompt can give different answers. | Sampling settings such as temperature and top-p add randomness on purpose. | Even at temperature zero, outputs can vary, because the order of floating-point operations changes with hardware and with how requests are batched together. | A hosted provider may update the model behind the same name. | And in RAG and agent systems, the retrieved passages, tool results and conversation history differ from run to run.' },
      { t: 'compare', title: 'Two kinds of uncertainty', labels: ['Source', 'Reducible?', 'Example', 'Good response'],
        cols: [{ h: 'Aleatoric', icon: 'wave', k: 'neutral' }, { h: 'Epistemic', icon: 'book', k: 'model' }],
        rows: [
          ['Noise or ambiguity in the data itself', 'Gaps in what the model has learned'],
          ['No: more data won’t remove it', 'Yes: better or more data can reduce it'],
          ['A smudged digit that could be a 1 or a 7', 'Inputs unlike anything seen in training'],
          ['Report a range or ask for clarification', 'Retrieve evidence, abstain, or escalate'] ],
        say: 'The third limit is uncertainty, and there are two kinds. | Aleatoric uncertainty comes from noise or ambiguity in the data itself. Epistemic uncertainty comes from gaps in what the model has learned. | More data can’t remove aleatoric uncertainty, but it can reduce epistemic uncertainty. | A smudged digit that could be a one or a seven is aleatoric. An input unlike anything in the training data, such as a new type of attack traffic, is epistemic. | So the responses differ: report a range or ask for clarification for the first, and retrieve evidence, abstain or escalate for the second.' },
      { t: 'chart', title: 'Confidence is not accuracy', kind: 'line', x: ['50%', '60%', '70%', '80%', '90%', '100%'], yMin: 40, yMax: 100, ticks: 6, unit: '%', yLabel: 'Actual accuracy at each stated confidence',
        series: [
          { n: 'Well calibrated', k: 'control', v: [50, 60, 70, 80, 90, 100] },
          { n: 'Overconfident', k: 'threat', v: [48, 53, 57, 61, 66, 70] } ],
        annot: [{ x: 4, text: 'Says 90%, right 66%', k: 'threat', at: 'bottom' }],
        notes: [{ h: 'Calibration', d: 'A calibrated model that says 80% is right about 80% of the time.', k: 'control' }, { h: 'Overconfidence', d: 'Deep networks, and LLMs stating confidence in words, are often overconfident.', k: 'threat' }, { h: 'Why it matters', d: 'Routing to humans by confidence only works if confidence means something.', k: 'human' }],
        steps: [{ s: [0] }, { s: [1] }, { a: [0] }],
        say: 'Models can report a confidence score, but is it trustworthy? A model is well calibrated when its stated confidence matches how often it is actually right. Eighty per cent confidence should mean right about eighty per cent of the time. | Many models are overconfident, and language models that state their confidence in words are often poorly calibrated. | Here, when the model says ninety per cent, it is right only two times in three. That matters, because any design that routes uncertain cases to a human depends on confidence meaning something.' },
      { t: 'bullets', title: 'Designing for unreliable output', items: [
          { icon: 'doc', h: 'Ground it', d: 'Answer from approved sources and cite them', k: 'data' },
          { icon: 'stop', h: 'Let it abstain', d: 'Make “I don’t know” an acceptable, tested answer', k: 'model' },
          { icon: 'check', h: 'Verify what matters', d: 'Check facts, code and figures before anyone relies on them', k: 'control' },
          { icon: 'hitl', h: 'Route by risk', d: 'Low confidence or high impact goes to a person', k: 'human' },
          { icon: 'shield', h: 'Never trust output blindly', d: 'Validate before it reaches a system, a customer or a tool', k: 'threat' } ],
        say: 'You can’t remove these limits, so you design around them. | Ground answers in approved sources, and require citations. | Make “I don’t know” an acceptable answer, and test that the system actually uses it. | Verify anything that matters, such as facts, figures and generated code, before anyone relies on it. | Route low-confidence or high-impact cases to a person. | And never pass model output straight into another system, a customer message or a tool call without validation. That is the heart of improper output handling and misinformation in the OWASP Top 10 for LLM applications.' },
      { t: 'summary', items: ['Hallucination: plausible but false; intrinsic or extrinsic', 'Non-determinism: sampling, hardware, updates, context', 'Uncertainty: aleatoric is noise, epistemic is a knowledge gap', 'Ground, abstain, verify, route by risk, validate output'],
        say: 'To recap. | Hallucination is plausible but false output. Intrinsic hallucinations contradict the source; extrinsic ones add unsupported claims. | Non-determinism comes from sampling, hardware and batching, silent updates and changing context. | Aleatoric uncertainty is noise in the data; epistemic uncertainty is a gap in the model’s knowledge, and only the second shrinks with more data. | And the design response is always similar: ground, allow abstention, verify, route by risk, and validate output before it is used.' } ] },
    { type: 'text', md: `### Hallucination: plausible is not the same as true
A language model generates the most probable continuation of its input. Most of the time, the most probable answer is also the correct one, because correct facts appear often in training data. When the model lacks the fact, it does not stop: it produces whatever *looks* most like a correct answer. The result is **hallucination**: output that is fluent and confident but false, fabricated or unsupported by the source material. The NIST Generative AI Profile (NIST AI 600-1) uses the term **confabulation** for the same risk.

Two real cases show why this is a business risk, not a curiosity:

- In 2023, lawyers in a US federal case, *Mata v. Avianca*, were sanctioned after filing a brief that cited court decisions a chatbot had invented. The citations looked genuine.
- In 2024, a Canadian tribunal held Air Canada liable after its website chatbot gave a customer wrong information about bereavement fares. The airline argued the chatbot was responsible for its own statements; the tribunal disagreed. **Organisations own what their AI tells people.**

Hallucination also creates security exposure. Code assistants sometimes recommend software packages that do not exist; in one large study, nearly a fifth of the package names suggested by the models tested were invented. Attackers can register those names and fill them with malicious code, an attack sometimes called **slopsquatting**. A reliability limitation becomes a supply-chain vulnerability the moment someone installs what the model suggested without checking.

### Why it happens
- **Objective:** training rewards plausible text, not verified truth.
- **Knowledge gaps:** rare facts, private facts and events after the training cut-off are missing.
- **Incentives:** many training signals and benchmarks score a wrong guess the same as, or better than, an abstention, so models learn to guess rather than say “I don’t know”.
- **Context failures:** ambiguous prompts, or retrieval that returns irrelevant passages, leave gaps that the model fills.
- **Compounding:** in long outputs and multi-step agent tasks, an early error becomes the premise for later steps.

### Intrinsic and extrinsic
An **intrinsic** hallucination contradicts the provided source: a summary reverses a decision, or misstates a number from the document. An **extrinsic** hallucination adds content that the source cannot support: an invented deadline, a fictional reference. Related terms you may see are **faithfulness** (does the output agree with its source?) and **factuality** (is it true in the world?). RAG improves factuality by supplying sources, but it does not guarantee faithfulness: the model can still misread or embellish what it retrieved.

### Non-determinism
Generative models usually *sample* from a probability distribution, so repeated runs can differ by design. Lowering temperature reduces variation but does not remove it: on GPUs, the order of floating-point operations can change with batch size and hardware, which can flip a close decision between two tokens. Hosted providers may also update models, safety filters or system components behind the same API name, and RAG or agent systems see different passages, tool results and histories on each run.

Non-determinism matters for security in three ways:
1. **Testing:** a single passing test proves little. Evaluate many runs and look at the distribution of outcomes, especially for safety tests.
2. **Reproducibility:** investigations need the exact model version, parameters, prompt, retrieved context and output, so log them.
3. **Consistency of decisions:** if two identical cases can receive different outcomes, the process may be unfair and hard to defend. Use low temperature, pinned versions and structured outputs for decision tasks, and keep a human or a deterministic rule as the authority where consistency is required.

### Uncertainty and calibration
**Aleatoric** uncertainty is inherent noise or ambiguity in the data; it can’t be reduced by more training data. **Epistemic** uncertainty reflects what the model doesn’t know; it is high for **out-of-distribution** inputs, such as a new fraud pattern or a language the model rarely saw, and it can be reduced with better data.

A model is **well calibrated** when its confidence matches its accuracy. Calibration is measured with reliability diagrams and the **expected calibration error (ECE)**, the average gap between confidence and accuracy. Modern deep networks tend to be overconfident, and a language model’s *stated* confidence (“I’m 95% sure”) is generated text, not a measurement. Better signals include agreement across several sampled answers (**self-consistency**), token probabilities where the provider exposes them, and verification against sources.`, },
    { type: 'match', title: 'Name the reliability problem', pairs: [
      ['An assistant invents a reference that appears in no source', 'Extrinsic hallucination'],
      ['A summary states the opposite of the report it summarises', 'Intrinsic hallucination'],
      ['Two analysts get different answers to an identical prompt', 'Non-determinism'],
      ['A model is 95% confident on traffic unlike anything it trained on, and wrong', 'Epistemic uncertainty with poor calibration'],
      ['A smudged scan could genuinely be read two ways', 'Aleatoric uncertainty'] ] },
    { type: 'accordion', title: 'Controls that reduce the impact of unreliable output', items: [
      ['Grounding and citations', 'Supply approved sources through retrieval and require the answer to cite them. Check that each claim maps to a cited passage; flag or remove claims that don’t. Grounding reduces extrinsic hallucination but needs a faithfulness check to catch misreadings.'],
      ['Abstention by design', 'Instruct and test the system to say when the sources don’t contain the answer. Include unanswerable questions in your evaluation set and measure how often the system correctly declines.'],
      ['Verification proportional to risk', 'Low-stakes drafting may need only spot checks. Legal, medical, financial and security content needs verification by a qualified person or a deterministic tool before use. Generated code should pass review, tests and dependency checks before it runs anywhere important.'],
      ['Consistency controls', 'Pin model versions, use low temperature and structured output for decision tasks, and record parameters so results can be reproduced. Re-run evaluations after any model, prompt or retrieval change.'],
      ['Output validation', 'Treat output as untrusted input to the next system: validate schemas, encode for the destination, check links and package names, and never let unvalidated output trigger an action.'] ] },
    { type: 'callout', kind: 'exam', title: 'Limitation or vulnerability?', md: `A hallucination is a **model limitation**: it happens without an attacker. It becomes a **security issue** when someone can exploit it (registering hallucinated package names) or when the output drives an action without validation. In findings and exam scenarios, ask: *is there an adversary or a missing control that turns this limitation into harm?* Domain 6 returns to this distinction.` },
    { type: 'check', q: { q: 'A bank’s assistant must answer customer questions about fees accurately. Which design MOST reduces the risk of confident but wrong answers reaching customers?', o: ['Raise the temperature so the model considers more possible answers before choosing the most likely one', 'Ground answers in the approved fee schedule, require citations, and decline when the schedule doesn’t cover it', 'Use the largest model available, because larger models hallucinate far less and can be trusted with fees', 'Add a clear disclaimer to every answer saying fee information may be wrong and should be checked with a branch first'], a: 1, b: 1,
      why: 'Grounding plus citations plus abstention attacks the causes of hallucination and makes errors visible. Larger models still hallucinate, higher temperature increases variation, and a disclaimer shifts blame without reducing harm.' } }
  ]
};
