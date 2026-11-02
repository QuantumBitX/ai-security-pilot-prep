/* 2.7 · Section 1: skills assessments, gap analyses and role-based training */
module.exports = {
  title: 'Skills, gaps and role-based AI training', covers: [1, 2],
  blocks: [
    { type: 'video', title: 'Building AI-ready people', kicker: 'Module 2.7 · Video 1 of 2', scenes: [
      { t: 'title', kicker: 'Module 2.7 · Education and awareness', title: 'Building AI-ready people', sub: 'Skills assessments, gap analysis and role-based training', icon: 'cap',
        say: 'Almost every control in this course depends on people: reviewers who can spot a bad output, developers who design securely, and staff who know what not to paste into a chatbot. | This video covers how to assess AI skills, find the gaps, and build training that fits each role.' },
      { t: 'bullets', title: 'Why AI skills are a security control', items: [
          { icon: 'hitl', h: 'People are the oversight', d: 'Reviewers must recognise errors and bias', k: 'human' },
          { icon: 'drop', h: 'Everyday data handling', d: 'What staff paste into AI tools', k: 'data' },
          { icon: 'mask', h: 'AI-enabled deception', d: 'Deepfake voices, convincing phishing', k: 'threat' },
          { icon: 'code', h: 'Secure building', d: 'Developers integrating models, tools and agents', k: 'model' },
          { icon: 'gavel', h: 'A legal expectation', d: 'The EU AI Act requires measures to support AI literacy', k: 'control' } ],
        say: 'AI skills are a security control in their own right. | Human oversight only works if reviewers can recognise errors, hallucinations and bias. | Everyday data handling decides what flows into AI tools, sanctioned or not. | Staff must recognise AI-enabled deception, such as cloned voices and highly convincing phishing. | Developers integrating models, tools and agents need to know how these systems are attacked. | And there is a legal expectation: the EU AI Act requires providers and deployers to take measures supporting the AI literacy of their staff and others using AI on their behalf.' },
      { t: 'flow', title: 'Running a skills gap analysis',
        nodes: [
          { id: 'roles', x: 210, y: 330, icon: 'users', label: 'Define roles', sub: 'and required competencies', k: 'human', w: 280 },
          { id: 'ass', x: 600, y: 330, icon: 'audit', label: 'Assess skills', sub: 'tests, practicals, self-rating', k: 'data', w: 290 },
          { id: 'gap', x: 990, y: 330, icon: 'chart', label: 'Map the gaps', sub: 'by role and team', k: 'threat', w: 260 },
          { id: 'pri', x: 1360, y: 330, icon: 'target', label: 'Prioritise', sub: 'by risk and exposure', k: 'model', w: 250 },
          { id: 'plan', x: 1360, y: 690, icon: 'list', label: 'Close the gaps', sub: 'train, hire, partner', k: 'control', w: 270 },
          { id: 're', x: 960, y: 690, icon: 'cycle', label: 'Reassess', sub: 'as tools and threats change', k: 'neutral', w: 300 } ],
        edges: [{ from: 'roles', to: 'ass', k: 'human' }, { from: 'ass', to: 'gap', k: 'data' }, { from: 'gap', to: 'pri', k: 'threat' }, { from: 'pri', to: 'plan', k: 'model' }, { from: 'plan', to: 're', k: 'control' }],
        steps: [
          { show: 'roles', hi: 'roles' },
          { show: 'ass roles-ass', flow: 'roles-ass', hi: 'ass' },
          { show: 'gap ass-gap', flow: 'ass-gap', hi: 'gap' },
          { show: 'pri gap-pri', flow: 'gap-pri', hi: 'pri' },
          { show: 'plan pri-plan', flow: 'pri-plan', hi: 'plan' },
          { show: 're plan-re', flow: 'plan-re', hi: 're' } ],
        say: 'A skills gap analysis has six steps. First, define the roles that interact with AI, and the competencies each needs, ideally in a competency framework. | Assess current skills, using knowledge tests and, better, practical exercises, rather than self-rating alone. | Map the gaps by role and team, so you can see where the shortfalls are. | Prioritise by risk: a gap among people who approve high-impact AI decisions matters more than one among occasional users. | Close the gaps by training, hiring or partnering with specialists. | And reassess regularly, because AI tools and threats change faster than most skills frameworks.' },
      { t: 'compare', title: 'Typical competencies and gaps by role', labels: ['Executives and board', 'Developers and ML engineers', 'Security operations', 'All staff'],
        cols: [{ h: 'Key competencies', icon: 'cap', k: 'control' }, { h: 'Common gap', icon: 'alert', k: 'threat' }],
        rows: [
          ['AI risk, accountability, risk appetite', 'Treating AI risk as purely technical'],
          ['Secure AI design, threat modelling, LLM risks', 'Trusting model output; over-broad agent permissions'],
          ['AI telemetry, AI incident response', 'No playbooks for prompt injection or poisoning'],
          ['Acceptable use, data handling, spotting deception', 'Pasting sensitive data into public tools'] ],
        say: 'Competencies and gaps differ by role. | Executives and boards need to understand AI risk, accountability and risk appetite. A common gap is treating AI risk as a purely technical matter. | Developers and machine learning engineers need secure AI design, threat modelling and knowledge of LLM-specific risks. Common gaps are trusting model output and giving agents over-broad permissions. | Security operations teams need to read AI telemetry and respond to AI incidents. A common gap is having no playbooks for prompt injection or data poisoning. | And all staff need acceptable use, data handling and the ability to spot AI-enabled deception. The most common gap is pasting sensitive data into public tools.' },
      { t: 'bullets', title: 'Role-based training programme', layout: 'grid', cols: 2, items: [
          { icon: 'building', h: 'Board and executives', d: 'Briefings on AI risk, duties and appetite', k: 'neutral' },
          { icon: 'code', h: 'Builders', d: 'Secure AI engineering, labs, threat modelling', k: 'model' },
          { icon: 'database', h: 'Data teams', d: 'Data governance, privacy, bias, poisoning', k: 'data' },
          { icon: 'siren', h: 'Security operations', d: 'AI detection, response and red teaming', k: 'threat' },
          { icon: 'gavel', h: 'Procurement and legal', d: 'AI contracts, due diligence, IP', k: 'human' },
          { icon: 'users', h: 'All staff and reviewers', d: 'Safe use, oversight duties, reporting', k: 'control' } ],
        say: 'A role-based programme might look like this. | Short, scenario-based briefings for the board and executives on AI risk, legal duties and appetite. | Hands-on secure AI engineering for builders, with labs and threat modelling. | Data governance, privacy, bias and poisoning for data teams. | Detection, response and red-teaming skills for security operations. | AI contracts, due diligence and intellectual property for procurement and legal. | And for all staff, safe use and reporting, plus deeper training for anyone with human oversight duties.' },
      { t: 'bullets', title: 'Training that changes behaviour', items: [
          { icon: 'target', h: 'Specific to the role and tools', d: 'Use the systems and policies people actually work with', k: 'human' },
          { icon: 'play', h: 'Practical and scenario-based', d: 'Exercises beat slides', k: 'model' },
          { icon: 'clock', h: 'Short, frequent, just in time', d: 'Prompts and tips at the point of use', k: 'data' },
          { icon: 'cycle', h: 'Refreshed often', d: 'AI changes in months, not years', k: 'control' } ],
        say: 'Training that actually changes behaviour shares four features. | It is specific to the role, and uses the tools and policies people actually work with. | It is practical and scenario-based: a realistic exercise teaches more than a slide deck. | It is short, frequent and delivered just in time, for example a reminder inside the AI tool when someone is about to paste sensitive data. | And it is refreshed often, because AI tools and threats change in months, not years.' },
      { t: 'summary', items: ['People are the control: oversight, data handling, secure building', 'Gap analysis: roles, assess, map, prioritise, close, reassess', 'Train by role: board, builders, data, SecOps, legal, all staff', 'Practical, specific, frequent and refreshed'],
        say: 'To recap. | People are a control: they provide oversight, handle data and build systems. | A gap analysis defines roles, assesses skills, maps and prioritises gaps by risk, closes them and reassesses. | Train by role: board, builders, data teams, security operations, procurement and legal, and all staff. | And make training practical, specific, frequent and regularly refreshed.' } ] },
    { type: 'text', md: `### AI literacy as an obligation and a control
Article 4 of the **EU AI Act** requires providers and deployers to take measures to support the **AI literacy** of their staff and other people operating or using AI systems on their behalf, taking into account their technical knowledge, experience, education and training and the context of use. The 2026 Digital Omnibus softened the wording (organisations must support literacy rather than guarantee a sufficient level), but it still applies, and national authorities enforce it. ISO/IEC 42001 similarly requires the organisation to determine and ensure the **competence** of people doing AI-related work (clause 7.2) and to make people **aware** of the AI policy and their contribution (clause 7.3).

From a security perspective, skills matter because people are part of most AI controls: they configure systems, approve outputs, review decisions, handle data, respond to incidents and recognise deception.

### Skills assessments and gap analysis
1. **Define roles and competencies.** Identify every role that builds, buys, operates, oversees or uses AI, and the competencies each needs. A simple competency framework might have levels (aware, practitioner, expert) across areas such as AI concepts, AI risk and governance, secure AI engineering, data protection, AI threat detection and response, and responsible AI.
2. **Assess current capability** using a mix of methods: knowledge assessments; practical exercises (for example, reviewing AI outputs for errors, threat-modelling a RAG design, triaging a simulated AI incident); work-product review; certifications; and self-assessment (useful but optimistic).
3. **Map gaps** in a role-by-competency heat map, by team.
4. **Prioritise by risk:** gaps among people who approve high-impact AI decisions, build agents with tool access, or handle sensitive data are urgent; gaps among occasional low-risk users are less so.
5. **Close gaps** through training, coaching, hiring, rotation or specialist partners, with owners and deadlines.
6. **Reassess** at least annually and when tools, threats or responsibilities change.

### Role-based training
| Audience | Focus | Format |
|---|---|---|
| Board and executives | AI strategy and risk, accountability, risk appetite, regulatory duties, questions to ask management | Short briefings, tabletop scenarios |
| AI governance committee, risk and compliance | Frameworks (EU AI Act, NIST AI RMF, ISO/IEC 42001), assessments, tiering | Workshops, case studies |
| Developers and ML engineers | Secure AI architecture, OWASP Top 10 for LLM Applications, threat modelling, secure use of agents and tools, supply-chain hygiene | Hands-on labs, code reviews, secure patterns |
| Data scientists and data engineers | Data governance and lineage, privacy techniques, bias evaluation, poisoning and integrity | Labs and checklists |
| Security operations | AI telemetry, detection use cases, AI incident playbooks, forensics, red teaming | Simulations, purple-team exercises |
| Procurement, legal and privacy | AI due diligence, contract terms, IP and data rights, DPIAs and FRIAs | Guides, templates, case reviews |
| Human overseers and reviewers | System capabilities and limits, automation bias, when and how to override or escalate | Scenario practice on real cases |
| All staff | Acceptable use, data classification, approved tools, verifying outputs, recognising AI-enabled scams and deepfakes, reporting | Short modules, nudges, campaigns |

### Making training effective
- **Role-specific and contextual:** use the organisation’s own tools, policies and examples.
- **Practical:** exercises and simulations change behaviour more than lectures.
- **Little and often:** microlearning and just-in-time prompts (for example, a warning in the browser when sensitive data is pasted into an AI tool) beat a single annual course.
- **Current:** refresh content as tools, attacks and regulations change, and brief people on emerging threats such as new deepfake scams.
- **Linked to consequences and support:** clear policies, accessible AI champions, and a no-blame route for reporting mistakes.`, },
    { type: 'match', title: 'Match the audience to the training', pairs: [
      ['Board members', 'Briefings on AI risk appetite, accountability and regulatory duties'],
      ['ML engineers building agents', 'Hands-on labs on threat modelling and least-privilege tool design'],
      ['SOC analysts', 'Simulations of AI incident triage and response'],
      ['Claims reviewers overseeing an AI model', 'Practice spotting model errors and automation bias, and using override'],
      ['All employees', 'Acceptable use, data handling and recognising deepfake scams'] ] },
    { type: 'callout', kind: 'exam', title: 'Prioritise by risk', md: `When a question asks which group to train **first**, choose the one whose AI-related decisions carry the **highest risk**: people with human oversight duties over high-impact systems, builders of agents with tool access, or staff handling regulated data, rather than the largest group or the most senior.` },
    { type: 'check', q: { q: 'A gap analysis shows that reviewers approving AI-recommended loan decisions can’t explain the model’s limitations and approve 99% of recommendations. What should be prioritised?', o: ['Generic AI awareness training for the whole company, so everyone shares the same baseline knowledge', 'Targeted training for reviewers on the model’s limits, automation bias and when to override, then reassessment', 'Replacing the human reviewers with a second model that checks the first model’s recommendations', 'Postponing training until the annual cycle, when reviewers can attend a full certification course'], a: 1, b: 1,
      why: 'Reviewers provide oversight of high-impact decisions, so their gap is the highest risk. Targeted, practical training with reassessment addresses it directly.' } }
  ]
};
