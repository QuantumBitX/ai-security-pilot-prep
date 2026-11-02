/* F · Section 1: the principles behind the best answers, and exam-week strategy */
module.exports = {
  title: 'The principles behind the best answers', covers: [],
  blocks: [
    { type: 'video', title: 'Thinking like the exam, one last time', kicker: 'Final review · Video 1 of 4', scenes: [
      { t: 'title', kicker: 'Final review', title: 'Thinking like the exam, one last time', sub: 'The principles behind the best answers, and exam-week strategy', icon: 'compass',
        say: 'You have covered six domains and thirty-seven modules. The exam won’t ask you to recite them; it will ask you to judge situations. A handful of principles sit behind almost every best answer. | This video draws those principles together, and covers how to use your final week and exam day.' },
      { t: 'bullets', title: 'Six principles behind the best answers', layout: 'grid', cols: 2, items: [
          { icon: 'gavel', h: 'Govern first', d: 'Ownership, policy and risk before tools', k: 'human' },
          { icon: 'users', h: 'People before systems', d: 'Safety and rights come first', k: 'threat' },
          { icon: 'lock', h: 'Least privilege, always', d: 'People, agents, pipelines, tokens', k: 'control' },
          { icon: 'filter', h: 'Untrusted by default', d: 'Inputs, retrieved content, outputs', k: 'data' },
          { icon: 'check', h: 'Evidence over assurance', d: 'Test, verify, record', k: 'model' },
          { icon: 'scale', h: 'Proportionate to risk', d: 'Tier first, then scale the controls', k: 'neutral' } ],
        say: 'Six principles sit behind most best answers. | Govern first: establish ownership, policy and risk assessment before choosing tools. | People before systems: when safety or people’s rights are at stake, protecting them comes first. | Least privilege, always: for people, agents, pipelines and tokens alike. | Untrusted by default: treat inputs, retrieved content and model outputs as untrusted until checked. | Evidence over assurance: test, verify and record, rather than relying on claims, logos or a single passing test. | And proportionate to risk: tier the use case first, then scale the controls to match.' },
      { t: 'compare', title: 'Tempting answer, best answer', labels: ['Incident', 'New AI tool', 'Vendor', 'Finding'],
        cols: [{ h: 'Tempting', icon: 'alert', k: 'threat' }, { h: 'Best', icon: 'check', k: 'control' }],
        rows: [
          ['Wipe and rebuild straight away', 'Contain, preserve evidence, then eradicate'],
          ['Ban it, or buy a product', 'Assess, tier, then enable with controls'],
          ['Trust the certificate logo', 'Read its scope, verify, then contract'],
          ['Block the reported input', 'Fix the root cause; add regression tests'] ],
        say: 'The same pattern appears in every domain: a tempting answer that acts too fast or trusts too much, and a best answer that follows the process. | In an incident, wiping and rebuilding destroys evidence. Contain first, preserve evidence, then eradicate. | Faced with a new AI tool, banning it drives use underground, and buying a product skips the thinking. Assess it, tier it, then enable it with controls. | With a vendor, a certificate logo proves little. Read its scope, verify the evidence, then contract for what is missing. | And with a test finding, blocking the reported input fixes nothing. Fix the root cause, and add regression tests.' },
      { t: 'timeline', title: 'Pacing 160 questions in three hours', events: [
          { y: '0:00', h: 'Start', d: 'Read each stem for its qualifier' },
          { y: '0:45', h: 'Question 40', d: 'On pace? Flag doubts and move on' },
          { y: '1:30', h: 'Question 80', d: 'Halfway: breathe, reset' },
          { y: '2:15', h: 'Question 120', d: 'Keep to about a minute each' },
          { y: '2:55', h: 'Question 160', d: 'Revisit flagged items if time allows' } ],
        say: 'Pacing matters, because three hours for a hundred and sixty questions leaves little slack. | At the start, read each stem for its qualifier: best, most, first or least. | Aim to reach question forty at about forty-five minutes. If a question stalls you, choose your best answer, flag it and move on. | At question eighty, around the ninety-minute mark, take a breath and reset. | Keep to about a minute per question through question one hundred and twenty. | And aim to finish with a few minutes to spare, to revisit flagged items if time allows. Never leave a question unanswered.' },
      { t: 'summary', items: ['Govern first; people before systems; least privilege', 'Untrusted by default; evidence over assurance; proportionate to risk', 'Prefer process over impulse: contain, assess, verify, fix causes', 'Pace by checkpoints; answer everything'],
        say: 'To recap. | Govern first, put people before systems, and apply least privilege everywhere. | Treat content as untrusted by default, prefer evidence over assurance, and keep controls proportionate to risk. | Choose process over impulse: contain, assess, verify, and fix root causes. | And pace yourself with checkpoints, answering every question.' } ] },
    { type: 'text', md: `### Six principles, across the domains
| Principle | What it looks like in questions |
|---|---|
| **Govern first** | Inventory, ownership, policy and risk tiering come before tools or technical fixes (Domain 2) |
| **People before systems** | Protect people’s safety and rights first: stop harm, notify where required, keep humans able to intervene (Modules 2.6, 5.5) |
| **Least privilege, always** | Narrow tools and scopes for agents; no standing admin for people; short-lived tokens; separate duties (Modules 4.6, 4.7) |
| **Untrusted by default** | Inputs, retrieved documents, tool results and model outputs are checked, isolated or validated before they can act (Modules 4.4, 6.6) |
| **Evidence over assurance** | Read assurance reports’ scope; verify signatures and provenance; test repeatedly and record results (Modules 6.3, 6.4) |
| **Proportionate to risk** | Tier the use case, then match the depth of assessment, testing and oversight (Module 2.3) |

### Traps to recognise
- **The technically impressive answer** that skips governance, ownership or risk assessment.
- **The absolute answer:** ban all AI, block everything, guarantee zero risk.
- **The premature fix:** wiping, retraining or patching before containing and preserving evidence.
- **The trust shortcut:** a certificate, a vendor’s word, a signature or one passing test taken as proof.
- **The instruction-as-control answer:** "tell the model not to do it" in place of an enforced control outside the model.
- **The right action at the wrong time:** a good step that isn’t the FIRST step the question asks for.

### Your final week
| When | What |
|---|---|
| **Days 7 to 6** | Take Mock Exam 1 under exam conditions; review every miss by domain |
| **Days 5 to 4** | Revisit the weakest domains’ summaries, videos and knowledge checks; use smart practice |
| **Day 3** | Take Mock Exam 2; review misses, looking for patterns in the traps you fall for |
| **Day 2** | Light review: the four recap sections and exam callouts |
| **Day 1** | Rest. Confirm the test centre location, time and identification requirements |

On exam day, arrive early, read each stem and every option fully, look for the qualifier, eliminate clearly wrong options, and choose the answer that best fits the principles above.` },
    { type: 'scenario', title: 'The first step, again', md: `A security manager learns that an internal AI agent, connected to the finance system, has made several unexpected payments overnight. The agent’s developer wants to retrain the model immediately, and the finance director wants the incident kept quiet until the cause is known.`,
      q: { q: 'What should the security manager do FIRST?', o: ['Retrain the model straight away, so the faulty behaviour is removed', 'Contain the agent and preserve evidence, then follow the incident plan', 'Keep the incident quiet for now, as the finance director has asked you to', 'Ask the agent itself to explain why it made the overnight payments'], a: 1, b: 1,
        why: 'Containment with evidence preservation comes first: stop further payments, keep logs and traces, and follow the incident process, including legal and notification steps. Retraining destroys evidence and may not address the cause, secrecy can breach obligations, and a model’s self-explanation isn’t evidence.' } },
    { type: 'check', q: { q: 'Which answer pattern is MOST often a trap in ISC2-style AI security questions?', o: ['Establishing ownership and assessing risk before any controls are chosen', 'Telling the model in its prompt not to misbehave, instead of an enforced control', 'Containing an incident, and preserving evidence before eradication starts', 'Reading the scope of an assurance report before relying on its conclusions'], a: 1, b: 1,
      why: 'Instructions to a model are guidance, not controls. Enforced controls outside the model, such as permissions, isolation and approvals, are what the best answers rely on.' } }
  ]
};
