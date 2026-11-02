/* 6.5 · Section 5: risk communication strategies for technical and non-technical stakeholders */
module.exports = {
  title: 'Communicating AI risk to stakeholders', covers: [5],
  blocks: [
    { type: 'video', title: 'Same finding, different audiences', kicker: 'Module 6.5 · Video 5 of 5', scenes: [
      { t: 'title', kicker: 'Module 6.5 · Findings and reporting', title: 'Same finding, different audiences', sub: 'Communicating AI risk to technical and non-technical stakeholders', icon: 'megaphone',
        say: 'The same finding needs telling differently to an engineer, a product owner, a lawyer and a board. Get it wrong, and engineers lack the detail to fix it, while executives either panic or shrug. | This video covers risk communication strategies for technical and non-technical stakeholders.' },
      { t: 'compare', title: 'What each audience needs', labels: ['Wants', 'Format', 'Language'],
        cols: [{ h: 'Engineers', icon: 'code', k: 'data' }, { h: 'Leaders', icon: 'building', k: 'human' }, { h: 'Legal and risk', icon: 'gavel', k: 'neutral' }],
        rows: [
          ['Root cause, repro steps, fix options', 'Business impact, decisions, cost', 'Obligations, exposure, deadlines'],
          ['Tickets, traces, test cases', 'One-page summary, trends', 'Register entries, memos'],
          ['Technical and precise', 'Plain, quantified, no jargon', 'Exact about facts and duties'] ],
        say: 'Each audience needs something different. | Engineers want the root cause, reproduction steps and fix options. Leaders want the business impact, the decisions needed, and the cost of acting or not acting. Legal and risk teams want obligations, exposure and deadlines. | Engineers work from tickets, traces and test cases. Leaders need a one-page summary and trends. Legal and risk teams need register entries and memos. | And the language changes: technical and precise for engineers; plain and quantified for leaders; and exact about facts and duties for legal teams.' },
      { t: 'code', title: 'An executive summary', file: 'exec-summary.md',
        code: `Bottom line: delay launch 1 week (2 fixes)
Risk: customers can trigger unapproved refunds
Likelihood: worked in 31 of 100 attempts
Impact: direct loss; possible regulator interest
Options: A) fix first, 5 days; B) no refund tool
Ask: approve option A by Friday
Not urgent: 6 low findings, fix this quarter`,
        hl: [null, [1, 1], [2, 4], [5, 6], [7, 7]],
        notes: [
          { h: 'One page, plain words', d: 'The same finding, told for leaders.' },
          { h: 'Bottom line up front', d: 'The decision and its cost, first.', k: 'human' },
          { h: 'Risk in business terms', d: 'Honest numbers, real consequences.', k: 'threat' },
          { h: 'Options and a clear ask', d: 'A decision, a deadline.', k: 'control' },
          { h: 'Proportion', d: 'Say what isn’t urgent.', k: 'neutral' } ],
        say: 'Here is an executive summary of the same refund finding, on one page, in plain words. | It starts with the bottom line: delay the launch by a week to fix two problems. | It states the risk in business terms, with honest numbers: customers can trigger unapproved refunds, it worked in thirty-one of a hundred attempts, and the impact is direct loss and possible regulatory interest. | It offers options, fixing first or launching without the refund tool, and makes a clear request with a deadline. | And it keeps proportion, saying what isn’t urgent, so the serious finding stands out without alarm.' },
      { t: 'bullets', title: 'Principles for AI risk communication', layout: 'grid', cols: 2, items: [
          { icon: 'flag', h: 'Bottom line first', d: 'Decision and impact up front', k: 'human' },
          { icon: 'chart', h: 'Quantify honestly', d: 'Rates, ranges and uncertainty', k: 'data' },
          { icon: 'money', h: 'Speak business', d: 'Loss, customers, law, reputation', k: 'model' },
          { icon: 'scale', h: 'No hype, no dismissal', d: 'A calm tone and consistent ratings', k: 'neutral' },
          { icon: 'split', h: 'Offer options', d: 'Fix, mitigate, accept or avoid', k: 'control' },
          { icon: 'eye', h: 'Show, don’t shock', d: 'No raw harmful outputs', k: 'threat' } ],
        say: 'Six principles make AI risk communication work. | Bottom line first: lead with the decision needed, and the impact. | Quantify honestly: success rates, ranges and uncertainty, rather than "it can be hacked". | Speak business: loss, customers, legal exposure and reputation. | No hype and no dismissal: keep a calm tone, and use the same rating scale every time. | Offer options: fix, mitigate, accept or avoid, each with its cost and residual risk. | And show, don’t shock: describe harmful outputs, or show redacted examples, rather than pasting them into slides.' },
      { t: 'summary', items: ['Tailor content and format to each audience', 'Lead with the bottom line, in business terms', 'Quantify honestly; state what testing can’t show', 'Offer options; disclose third-party flaws responsibly'],
        say: 'To recap. | Tailor the content and the format to each audience. | Lead with the bottom line, in business terms. | Quantify honestly, and say what testing can’t show. | And offer options, disclosing flaws in third-party products responsibly, through the vendor’s programme.' } ] },
    { type: 'text', md: `### Tailoring the message
| Audience | Needs | Format |
|---|---|---|
| **Engineers and model owners** | Root cause, reproduction package, affected components, fix options, retest criteria | Tickets with evidence links; test cases in the harness |
| **Security leadership** | Severity, trends, framework mapping, coverage, detection gaps | Findings register; dashboards |
| **Executives and the board** | Business impact, decisions needed, options with cost and residual risk, position against risk appetite | One-page summary; trend charts; risk register extracts |
| **Legal, privacy and compliance** | Personal data involved, regulatory duties (such as GDPR breach notification or AI Act serious incident reporting), disclosure decisions | Memo with facts, timeline and options |
| **Product owners** | User impact, launch implications, workarounds | Briefing with options and timelines |
| **Vendors** | A reproducible, sanitised report of a flaw in their product | Coordinated disclosure through their programme |

### Structuring an assessment report
1. **Executive summary:** the bottom line, top risks in business terms, and the decisions needed.
2. **Scope and method:** what was tested, how and when, and what was out of scope, so readers know the limits of the conclusions.
3. **Findings:** each with its rating, evidence, framework mapping and recommendation.
4. **Positive observations:** controls that held, which helps decision-makers and teams.
5. **Recommendations and roadmap:** prioritised fixes, owners and retest plans.
6. **Appendices:** reproduction packages and the coverage matrix, with restricted access.

### Communicating uncertainty and residual risk
- Use **rates and confidence**, such as "31 of 100 attempts" or "below 1% in 2,000 attempts", not "rarely".
- State what testing **can’t show**: passing tests reduce uncertainty, but don’t prove the absence of vulnerabilities.
- Describe the **residual risk** after fixes, and who has accepted it (Module 6.6).

### Coordinated disclosure
Report flaws in third-party products to the vendor privately, through its vulnerability disclosure or bug bounty programme, with reasonable time to fix before anything is published. **ISO/IEC 29147** covers vulnerability disclosure, and **ISO/IEC 30111** covers vendors’ vulnerability handling. Check the vendor’s scope first, because some programmes handle content issues separately from security flaws (Section 2).` },
    { type: 'scenario', title: 'The board slide', md: `A security lead plans to show the board a slide listing all 47 findings from a red team exercise, each with a severity score and a MITRE ATLAS technique ID, plus a screenshot of the most offensive output the red team produced.`,
      q: { q: 'What is the BEST improvement to the board presentation?', o: ['Add full reproduction steps for each finding, so board members can verify them', 'Lead with business impact and the decisions needed, with trends and no raw outputs', 'Remove every finding rated below critical, so the board only sees the worst five', 'Replace the screenshot with an even more shocking example, to help secure budget'], a: 1, b: 5,
        why: 'Boards need business impact, decisions and trends, in plain language. Technical detail belongs in appendices and tickets, hiding lower findings misleads, and shocking content distracts and may cause harm.' } },
    { type: 'callout', kind: 'exam', title: 'Risk communication questions', md: `Match the message to the **audience**: technical detail for engineers; **business impact, options and decisions** for leaders; **obligations and facts** for legal teams. Lead with the **bottom line**, **quantify honestly**, avoid both **hype and dismissal**, and disclose third-party flaws through **coordinated disclosure**.` },
    { type: 'check', q: { q: 'Which statement BEST communicates a red team result to executives?', o: ['"The model is fundamentally insecure, and anyone could hack it at any moment"', '"Customers triggered unapproved refunds in 31% of tests; we advise a week’s delay"', '"We found an AML.T0051.001 issue mapping to LLM01 and LLM06, with a high score"', '"Testing found a few problems, but AI always has issues, so no action is needed"'], a: 1, b: 5,
      why: 'It states the business impact with an honest number and a clear recommendation. The others are alarmist, too technical for the audience, or dismissive.' } }
  ]
};
