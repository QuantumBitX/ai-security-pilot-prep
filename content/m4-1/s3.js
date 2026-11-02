/* 4.1 · Section 3: architectural trade-offs (latency vs explainability vs cost) */
module.exports = {
  title: 'Architectural trade-offs: latency, explainability and cost', covers: [3],
  blocks: [
    { type: 'video', title: 'Every control has a price', kicker: 'Module 4.1 · Video 3 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.1 · Secure AI design', title: 'Every control has a price', sub: 'Trading latency, explainability, cost and security', icon: 'scale',
        say: 'Every architectural choice in an AI system trades something away: speed, cost, transparency or security. | This video looks at the most common trade-offs, latency, explainability and cost, and at how to make them deliberately and record why.' },
      { t: 'chart', title: 'What each check adds to response time', kind: 'bar', x: ['Pattern rules', 'Small classifier', 'Retrieval step', 'Moderation API', 'LLM-as-judge'], yMin: 0, yMax: 1200, ticks: 4, unit: '', yLabel: 'Illustrative extra latency per request, in milliseconds',
        series: [{ n: 'Added latency', k: 'control', v: [5, 35, 180, 150, 1100], ck: ['control', 'control', 'data', 'data', 'threat'] }],
        steps: [{ s: [0] }, {}, {}],
        say: 'Security controls take time. In this illustrative chart, pattern-based rules add almost nothing, and a small classifier adds a few tens of milliseconds. | A retrieval step, or a call to a separate moderation service, adds more, typically well under a quarter of a second each. | Asking a second large model to judge every answer can add a second or more. So put cheap checks on every request, and save expensive ones for higher-risk requests or for sampled, after-the-fact review.' },
      { t: 'compare', title: 'Common design choices and their costs', labels: ['Larger model', 'Retrieval with citations', 'Interpretable model', 'Streaming replies'],
        cols: [{ h: 'Latency', icon: 'clock', k: 'data' }, { h: 'Explainability', icon: 'search', k: 'human' }, { h: 'Cost', icon: 'money', k: 'control' }],
        rows: [
          ['Slower', 'No better', 'Higher'],
          ['Slower', 'Better: shows sources', 'Moderate'],
          ['Often faster', 'Much better', 'Lower; may lose accuracy'],
          ['Feels faster', 'Unchanged', 'Unchanged'] ],
        say: 'Here are four common choices, and what each costs. | A larger model is usually more capable, but it is slower and more expensive, and no easier to explain. | Retrieval with citations adds latency and some cost, but it makes answers far easier to check, because users can see the sources. | A simpler, interpretable model is often faster and cheaper, and much easier to explain, but it may be less accurate on complex tasks. | And streaming replies word by word feels faster without changing cost or explainability, but it makes output filtering harder, because text appears before the full reply can be checked.' },
      { t: 'bullets', title: 'Security trade-offs to decide explicitly', layout: 'grid', cols: 2, items: [
          { icon: 'wave', h: 'Streaming or filtering', d: 'Buffer, filter in chunks, or don’t stream', k: 'data' },
          { icon: 'memory', h: 'Caching or privacy', d: 'Never share cached personal answers', k: 'human' },
          { icon: 'users', h: 'Review or throughput', d: 'Human review where risk demands it', k: 'control' },
          { icon: 'audit', h: 'Logging or privacy', d: 'Metadata broadly, content selectively', k: 'neutral' },
          { icon: 'lock', h: 'Confidential computing', d: 'Protection in use, at some overhead', k: 'model' },
          { icon: 'layers', h: 'Bigger context', d: 'More content, more injection surface', k: 'threat' } ],
        say: 'Some trade-offs are specifically about security, and deserve an explicit decision. | Streaming versus output filtering: buffer a little before display, filter chunk by chunk, or don’t stream high-risk replies. | Caching versus privacy: caching saves cost, but a cached answer containing personal data must never be served to someone else. | Human review versus throughput: review where risk demands it, not everywhere. | Logging versus privacy: record metadata broadly and content selectively. | Confidential computing protects data in use, but adds overhead and cost. | And bigger context windows let you include more content, which also means more surface for injected instructions, and higher cost.' },
      { t: 'matrix', title: 'Match assurance to risk and latency', rows: ['High risk', 'Low risk'], cols: ['Needs a fast reply', 'Can wait'], xLabel: 'Latency need', yLabel: 'Risk',
        items: [{ t: 'Fast checks, async review', r: 0, c: 0, k: 'human' }, { t: 'Full checks + approval', r: 0, c: 1, k: 'threat' }, { t: 'Rules + sampled review', r: 1, c: 0, k: 'control' }, { t: 'Batch checks', r: 1, c: 1, k: 'data' }],
        say: 'A simple grid helps match assurance to risk and latency. | High risk, but a fast reply is needed: run fast inline checks, narrow what the system can do, and review in depth asynchronously. | High risk, and the reply can wait: apply full checks and human approval before anything is released. | Low risk with a fast reply: lightweight rules, plus sampled review afterwards. | Low risk that can wait: batch checks and periodic review are enough.' },
      { t: 'summary', items: ['Every control costs latency, money or transparency', 'Cheap checks everywhere; expensive checks where risk is high', 'Streaming, caching, logging and context size are security decisions', 'Record decisions and residual risk in architecture decision records'],
        say: 'To recap. | Every control costs something: latency, money or transparency. | Use cheap checks on every request, and expensive ones where risk is high. | Treat streaming, caching, logging and context size as security decisions, not just performance tuning. | And record each decision, its reasons and its residual risk, so it can be revisited.' } ] },
    { type: 'text', md: `### The dimensions
| Dimension | What drives it | Security relevance |
|---|---|---|
| **Latency** | Model size, retrieval steps, guardrail calls, network hops, queueing | Tight budgets tempt teams to remove checks; streaming makes output filtering harder |
| **Explainability** | Model type, retrieval with citations, decision logging, explanation tools | Needed for oversight, appeals, audits and incident investigation |
| **Cost** | Tokens, GPU hours, guardrail calls, storage, staff | Cost limits double as protection against denial of wallet; under-funded controls get switched off |
| **Capability and accuracy** | Model choice, data, fine-tuning | Inaccurate systems create safety and liability risk of their own |
| **Privacy and security** | Data flows, retention, isolation, controls | Each control adds latency or cost; each shortcut adds risk |

### Explainability requirements
Explainability is sometimes a requirement rather than a preference. Under the GDPR, people subject to solely automated decisions with legal or similarly significant effects are entitled to meaningful information about the logic involved (Articles 13–15 and 22). The EU AI Act requires high-risk systems to be transparent enough for deployers to interpret their output and to support human oversight. US credit rules require lenders to give specific reasons for adverse decisions. Where these apply, they can rule out an opaque model, or require explanation techniques and decision logs (Module 1.3).

### Patterns that ease the tension
- **Risk-based routing:** cheap checks on every request; expensive checks (a second model as judge, human review) only for high-risk intents, users or actions.
- **Asynchronous assurance:** sample outputs for deep review after delivery, with fast correction or rollback when problems are found.
- **Small specialised guardrail models**, which are faster and cheaper than general-purpose models used as judges.
- **Parallel checks:** run input screening alongside retrieval, or moderation alongside generation, and hold the reply until both finish.
- **Streaming safely:** buffer the first part of the reply, moderate chunk by chunk, stop and retract when a check fails, or don’t stream high-risk replies at all.
- **Safe caching:** cache only non-personal answers, key caches per user or tenant, and expire them.
- **Right-sized models:** the smallest model that meets the requirement is usually faster, cheaper and easier to evaluate.

### Recording the decision
Capture significant trade-offs in an **architecture decision record**: context, options considered, the decision, its consequences (including security and privacy effects), residual risk and who accepted it, and the triggers for revisiting it, such as new regulations, incidents or model changes. Link it to the risk register and the model’s approval record (Module 3.5).` },
    { type: 'callout', kind: 'exam', title: 'Trade-off questions', md: `The best answer rarely removes a control to save time or money, and rarely applies the most expensive control to everything. Look for **risk-proportionate** designs: layered, cheap controls everywhere, stronger controls where impact is high, and decisions documented with accepted residual risk.` },
    { type: 'scenario', title: 'The judge that cost too much', md: `A legal research assistant sends every answer to a second, larger model that checks for invented case citations. Accuracy improves, but monthly costs triple and answers now take four seconds. Leadership proposes removing the check entirely to save money.`,
      q: { q: 'What is the BEST recommendation?', o: ['Remove the check, because cost and speed matter more than citation accuracy', 'Keep the check for answers that cite authorities or go to clients, and sample the rest', 'Keep checking every answer, and ask leadership for a bigger budget to cover it', 'Replace the check with a disclaimer warning that citations may be inaccurate'], a: 1, b: 3,
        why: 'Risk-based routing keeps the check where an invented citation would cause real harm, while sampling gives assurance on the rest at far lower cost. Removing it ignores a serious risk, checking everything ignores the cost, and a disclaimer doesn’t prevent harm.' } },
    { type: 'check', q: { q: 'A bank’s voice assistant must reply within one second. Compliance wants every reply checked by a second LLM acting as a judge, which adds about a second. What is the BEST design?', o: ['Skip the checks altogether, because the latency requirement comes from the business owner', 'Run fast inline checks on every reply, route high-risk intents to fuller checks, and sample the rest', 'Run the LLM judge on every single reply, and simply accept response times of around two seconds each', 'Replace the voice channel with a web form, so there is no longer any latency requirement'], a: 1, b: 3,
      why: 'Risk-based routing keeps fast replies for low-risk requests while applying stronger checks where impact is high, and sampling provides ongoing assurance. Removing checks ignores the risk, judging everything breaks the requirement, and replacing the channel avoids the problem rather than solving it.' } }
  ]
};
