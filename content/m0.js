/* Course Introduction */
module.exports = {
  id: '0',
  intro: 'Start here. This short module explains how the course is built, what the pilot exam looks like, and how to study so the knowledge holds up under exam pressure.',
  objectives: [
    'Use the videos, interactive reading and knowledge checks the way they are designed to work together',
    'Describe the pilot exam format, domain weights and eligibility rules from the official outline',
    'Apply a repeatable method to ISC2-style questions that use BEST, MOST and FIRST',
    'Set a study plan that fits your pilot exam date'
  ],
  sections: [
    {
      title: 'How this course works', covers: [],
      blocks: [
        { type: 'video', title: 'How this course works', kicker: 'Course introduction · Video 1', scenes: [
          { t: 'title', kicker: 'Course introduction', title: 'How this course works', sub: 'Sixty hours, six domains, one exam', icon: 'compass',
            say: 'Welcome to AI Security Pilot Prep. | In the next few minutes you will see how the course is built, and how to get the most out of it.' },
          { t: 'bullets', title: 'What every module contains', items: [
            { icon: 'play', h: 'Animated video lessons', d: 'Narrated explainers that show how each idea actually works' },
            { icon: 'book', h: 'Interactive reading', d: 'Scenarios, flip cards, steps and tables that make you engage' },
            { icon: 'audit', h: 'A scored knowledge check', d: 'Exam-style questions with an explanation for every answer' },
            { icon: 'calendar', h: 'A study plan', d: 'A daily goal that adapts to your exam date and pace' } ],
            say: 'Every module follows the same rhythm. | First, short animated videos explain the idea and show the mechanism behind it. | Then interactive reading deepens it, with scenarios, flip cards and worked examples. | Each module ends with a scored knowledge check, so you know whether it stuck. | And the study plan turns all of this into a daily goal that fits your exam date.' },
          { t: 'stat', kicker: 'Knowledge points', num: { v: 3600, label: 'knowledge points across the whole course' }, def: 'One knowledge point is roughly one minute of focused study.', ex: 'A 75-point module takes about an hour and a quarter, including its knowledge check.',
            say: 'Progress is measured in knowledge points. | One point is roughly one minute of focused study, so the whole course is about sixty hours. | You earn points section by section, and the course home shows exactly where you stand.' },
          { t: 'flow', title: 'One colour code, every video',
            nodes: [
              { id: 'p', x: 270, y: 360, icon: 'user', label: 'Person', sub: 'users, operators, reviewers', k: 'human' },
              { id: 'm', x: 800, y: 360, icon: 'model', label: 'Model', sub: 'the AI system itself', k: 'model' },
              { id: 'd', x: 1330, y: 360, icon: 'database', label: 'Data', sub: 'inputs, context, training sets', k: 'data' },
              { id: 'a', x: 520, y: 700, icon: 'attacker', label: 'Attacker', sub: 'or anything they control', k: 'threat' },
              { id: 'c', x: 1080, y: 700, icon: 'shieldcheck', label: 'Control', sub: 'prevent, detect, limit', k: 'control' } ],
            edges: [
              { from: 'p', to: 'm', label: 'request', k: 'human' },
              { from: 'd', to: 'm', label: 'context', k: 'data' },
              { from: 'a', to: 'm', label: 'attack', k: 'threat' },
              { from: 'c', to: 'm', label: 'guards', k: 'control' } ],
            steps: [
              { show: 'p m d' },
              { hi: 'p', focus: true },
              { show: 'p-m d-m', flow: 'p-m d-m', hi: 'm d', focus: true },
              { show: 'a a-m', flow: 'a-m', hi: 'a', focus: true },
              { show: 'c c-m', hi: 'c', focus: true } ],
            say: 'The videos use one colour code throughout, so every diagram reads at a glance. | Amber is always a person: a user, an operator or a reviewer. | Violet is a model, and blue is data flowing through the system. | Red is an attacker, or anything an attacker controls. | Green is a control: something that prevents, detects or limits harm.' },
          { t: 'bullets', title: 'Getting the most from the player', items: [
            { icon: 'text', h: 'Captions and transcript', d: 'Captions run under every video; the full transcript sits below it' },
            { icon: 'clock', h: 'Speed and chapters', d: 'Change the speed, jump by chapter, or use the arrow keys' },
            { icon: 'image', h: 'Full screen', d: 'On a phone, turn it sideways and use full screen' },
            { icon: 'bulb', h: 'Quick checks', d: 'Some videos pause for a question; answer it to carry on' } ],
            say: 'A few controls make the videos easier to use. | Captions run under every video, and the full transcript sits underneath. | You can change the speed, skip by chapter, or step back a scene with the arrow keys. | On a phone, turn it sideways and use full screen for the clearest view. | Some videos pause for a quick check. Answer it to carry on.' },
          { t: 'summary', items: [
            'Watch, then read, then check yourself',
            'Knowledge points track study time: about one minute each',
            'Amber person, violet model, blue data, red attacker, green control',
            'Signed in, your progress follows you between devices' ],
            say: 'To recap. | Watch, then read, then check yourself. | Knowledge points track your study time. | Remember the colour code. | And when you are signed in, your progress follows you between your phone and your desktop.' }
        ] },
        { type: 'text', md: `There is no official course for the AI Security pilot exam yet, so this one is built directly from the **Pilot Exam Outline** that ISC2 issued, effective 26 October 2026. Every module maps to one numbered subdomain in that outline, and every section shows which outline topics it teaches. The **Blueprint map** page shows the whole outline with links to where each topic is covered and how many practice questions test it.

The course is sized at about sixty hours. That sounds like a lot, but it is spread across 37 modules, six domain tests, a final review and two full mock exams. Most modules take sixty to ninety minutes, and you can stop at the end of any section without losing your place.

### How a module works

Each module opens with an overview: what you will be able to do by the end, which outline topics it covers, and its sections. A section is one sitting’s worth of study, usually fifteen to thirty minutes. It starts with a video, continues with reading and interactive activities, and ends with a button that marks it complete and moves you on.

When every section is done, the **knowledge check** scores you on exam-style questions. Unlike the course this one is modelled on, the checks here are scored and kept, so the **Progress** page can tell you which modules and domains are weakest.` },
        { type: 'callout', kind: 'exam', title: 'Use the knowledge checks as diagnostics', md: `Take each knowledge check soon after finishing the module, before you look anything up. A low score straight after studying is useful information: it shows exactly which ideas didn’t land. Retake checks a few days later, because the gap between study and recall is what the exam measures.` },
        { type: 'accordion', title: 'Questions people ask before starting', items: [
          ['Do I have to watch the videos?', `No, but you should. The videos carry the mechanisms: how a retrieval pipeline moves data, where an injected instruction enters, how a model drifts. Many exam questions are scenarios that only make sense if you can picture those mechanisms. The reading assumes you’ve seen the video first.`],
          ['What if my device has no speech voice?', `The videos still play, with captions carrying the narration. On most phones and desktop browsers a natural-sounding voice is available. You can choose one, or test it, on the **Preferences** page.`],
          ['Can I study on my phone and my computer?', `Yes. When you’re signed in to Claude, progress, scores and review cards are saved to your account and follow you between devices. Without signing in, progress stays in the browser you’re using.`],
          ['How accurate is the content?', `The course follows the official outline topic by topic and draws on primary sources such as the NIST AI Risk Management Framework, the EU AI Act, ISO/IEC 42001, MITRE ATLAS and the OWASP Top 10 for LLM Applications. Standards and laws change, so where a detail is time-sensitive the course says so.`] ] }
      ]
    },
    {
      title: 'Inside the pilot exam', covers: [],
      blocks: [
        { type: 'video', title: 'Inside the pilot exam', kicker: 'Course introduction · Video 2', scenes: [
          { t: 'title', kicker: 'Course introduction', title: 'Inside the pilot exam', sub: '160 questions, three hours, six domains', icon: 'audit',
            say: 'Let us look at the exam itself: its format, how it is weighted, and what the word pilot means for you.' },
          { t: 'stat', kicker: 'The format', num: { v: 160, label: 'multiple-choice questions in three hours' }, def: 'That is about 67 seconds per question, with nothing left over for review.', ex: 'Pace check: be around question 53 at the one-hour mark and question 107 at two hours.',
            say: 'The pilot exam has one hundred and sixty multiple-choice questions, and you have three hours. | That works out at about sixty-seven seconds per question, with no spare time built in. | A useful pace check is to be around question fifty-three at the one-hour mark, and around question one hundred and seven at two hours.' },
          { t: 'chart', title: 'How the six domains are weighted', kind: 'bar', x: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'], yMin: 0, yMax: 20, ticks: 4, unit: '%',
            series: [{ v: [10, 17, 19, 18, 19, 17], cs: [1, 2, 3, 4, 5, 6] }],
            annot: [{ y: 17, text: '17–19% for five domains', k: 'human' }],
            notes: [null, { h: 'Domain 1 · 10%', d: 'AI concepts and security fundamentals: the foundation for everything else.' }, { h: 'Domains 2–6', d: 'Governance, data and model security, architecture and identity, operations and incident response, threats and testing.' }, { h: 'Breadth wins', d: 'No single domain dominates, so a weak domain costs you more than a strong one gains.' }],
            steps: [{}, { s: [0] }, {}, { a: [0] }],
            say: 'The six domains are not weighted equally, but they are close. | Domain one, AI concepts and security fundamentals, carries ten percent. | Domains two to six each carry between seventeen and nineteen percent. Data and model security, and operations and incident response, are the largest at nineteen. | So no single domain dominates. A weak domain will cost you more than a strong one can win back.' },
          { t: 'bullets', title: 'What “pilot” means for you', items: [
            { icon: 'search', h: 'Questions are being evaluated', d: 'A pilot tests new questions before the exam goes live' },
            { icon: 'alert', h: 'Some items may feel rough', d: 'Expect a few unfamiliar or awkwardly worded questions' },
            { icon: 'clock', h: 'Results can take longer', d: 'Items are analysed before scores are set; ISC2 will give its timeline' } ],
            say: 'Because this is a pilot, a few things are different. | A pilot exists to evaluate new questions before the exam goes live, so the question bank itself is under test. | That means some questions may feel unfamiliar or awkwardly worded. Do not let one strange question shake your pace. | And results can take longer than usual, because questions are analysed before scoring is finalised. Watch for ISC2’s own communications about timing.' },
          { t: 'flow', title: 'Experience requirements from the outline',
            nodes: [
              { id: 'y', x: 300, y: 330, icon: 'clock', label: '4 years', sub: 'paid, full-time, cumulative', k: 'neutral', w: 300 },
              { id: 'c', x: 800, y: 330, icon: 'shield', label: '2 in cybersecurity', sub: 'within the four', k: 'neutral', w: 320 },
              { id: 'd', x: 1300, y: 330, icon: 'layers', label: '1 across 2+ domains', sub: 'of this outline', k: 'neutral', w: 320 },
              { id: 's', x: 520, y: 680, icon: 'id', label: 'Credential waiver', sub: 'CISSP, ISSAP, ISSEP, ISSMP, CCSP or CSSLP', k: 'control', w: 420 },
              { id: 'g', x: 1110, y: 680, icon: 'cap', label: 'Degree waiver', sub: 'up to one year only', k: 'control', w: 360 } ],
            edges: [{ from: 'y', to: 'c', k: 'neutral' }, { from: 'c', to: 'd', k: 'neutral' }],
            steps: [{}, { show: 'y' }, { show: 'c y-c' }, { show: 'd c-d' }, { show: 's', hi: 's' }, { show: 'g', hi: 'g' }],
            say: 'The outline sets the experience bar. | You need at least four years of cumulative, paid, full-time experience in cybersecurity or AI-related fields. | Two of those years must be in cybersecurity. | And one year must span two or more of the domains in this outline. | An active CISSP, ISSAP, ISSEP, ISSMP, CCSP or CSSLP substitutes for the entire experience requirement. | A relevant degree can waive up to one year, but no more than one.' },
          { t: 'summary', items: [
            '160 questions, 3 hours: about 67 seconds each',
            'Domain 1 is 10%; the other five are 17–19% each',
            'Pilot questions are under evaluation: keep your pace',
            'Four years’ experience, or a qualifying ISC2 credential' ],
            say: 'To recap. | One hundred and sixty questions in three hours, about sixty-seven seconds each. | Domain one is ten percent and the other five are seventeen to nineteen percent each. | Pilot questions are under evaluation, so keep your pace when one feels odd. | And eligibility needs four years of experience, or a qualifying ISC2 credential.' }
        ] },
        { type: 'table', title: 'The six domains at a glance', head: ['Domain', 'Weight', 'About this many questions', 'Course time'], rows: [
          ['1. AI Concepts and Security Fundamentals', '10%', '16', '8 h'],
          ['2. AI Governance, Ethics, Risk, and Compliance', '17%', '27', '8.3 h'],
          ['3. AI Data Management, Privacy, and Model Security', '19%', '30', '9.2 h'],
          ['4. Secure AI Architecture, Engineering, and IAM', '18%', '29', '8.7 h'],
          ['5. Secure AI Operations and Incident Response', '19%', '30', '9.2 h'],
          ['6. AI Threats, Testing, and Lifecycle Management', '17%', '27', '8.2 h'] ] },
        { type: 'text', md: `The question counts are estimates: 160 multiplied by each weight, rounded. The real exam won’t tell you which domain a question belongs to, and many questions sit across two domains. A question about logging an agent’s tool calls, for example, touches identity (Domain 4) and operations (Domain 5).

Domain 1 gets a little more course time than its weight suggests. That is deliberate. It is the vocabulary for everything else: you can’t reason about poisoning a retrieval index if you’re unsure what an embedding is.

### The exam facts, from the outline

- **Length:** 3 hours
- **Items:** 160
- **Format:** multiple choice
- **Language:** English
- **Where:** Pearson Professional Centers (PPC)

The outline points to ISC2's supplementary references page and its exam policies page. Read the policies before you book: identification rules, rescheduling windows and what you can bring into the room are set there, not in the outline.` },
        { type: 'callout', kind: 'real', title: 'Why a pilot can feel harder than it is', md: `Pilot exams include questions that haven’t yet been statistically validated, so a few will turn out to be ambiguous or too hard and will be fixed or dropped before the exam goes live. You can’t tell which ones those are. Answer everything, flag anything you’re unsure of, and keep moving.` },
        { type: 'flip', title: 'Exam facts to know cold', cards: [
          ['Number of items', '160 multiple-choice items.'],
          ['Time allowed', 'Three hours, about 67 seconds per item.'],
          ['Heaviest domains', 'Domain 3 (data, privacy and model security) and Domain 5 (operations and incident response), at 19% each.'],
          ['Lightest domain', 'Domain 1, AI concepts and security fundamentals, at 10%.'],
          ['Credentials that waive all experience', 'An active CISSP, ISSAP, ISSEP, ISSMP, CCSP or CSSLP.'],
          ['Degree waiver', 'A relevant bachelor’s or master’s degree can waive up to one year of the four.'] ] }
      ]
    },
    {
      title: 'How to think like the exam', covers: [],
      blocks: [
        { type: 'video', title: 'Thinking like the exam', kicker: 'Course introduction · Video 3', scenes: [
          { t: 'title', kicker: 'Course introduction', title: 'Thinking like the exam', sub: 'How ISC2-style questions are built, and how to beat them', icon: 'target',
            say: 'Knowing the material is half the job. The other half is reading the question the way its writer intended.' },
          { t: 'bullets', title: 'Read every question for its shape', items: [
            { icon: 'user', h: 'Find your role', d: 'You are the security professional advising the organisation' },
            { icon: 'search', h: 'Find the qualifier', d: 'BEST, MOST, FIRST and LEAST change which answer is right' },
            { icon: 'filter', h: 'Find the constraint', d: 'Budget, regulation, deadline, or risk appetite' },
            { icon: 'check', h: 'Eliminate, then choose', d: 'Strike answers that are true but don’t answer this question' } ],
            say: 'Every question has a shape, and spotting it is a skill you can practise. | First, find your role. You are almost always the security professional advising the organisation, not the developer and not the attacker. | Second, find the qualifier. Words like best, most, first and least decide which of several reasonable answers is right. | Third, find the constraint. A budget limit, a regulation, a deadline or the stated risk appetite often rules options out. | Finally, eliminate. Strike every answer that is true in general but does not answer this question, then choose from what is left.' },
          { t: 'flow', title: 'When the question asks what to do FIRST',
            nodes: [
              { id: 'u', x: 210, y: 420, icon: 'search', label: 'Understand', sub: 'scope, data, owners', k: 'neutral', w: 250 },
              { id: 'a', x: 530, y: 420, icon: 'scale', label: 'Assess', sub: 'risk and impact', k: 'neutral', w: 250 },
              { id: 'd', x: 850, y: 420, icon: 'gavel', label: 'Decide', sub: 'treatment, authority', k: 'human', w: 250 },
              { id: 'i', x: 1170, y: 420, icon: 'shieldcheck', label: 'Implement', sub: 'controls', k: 'control', w: 250 },
              { id: 'm', x: 1430, y: 690, icon: 'eye', label: 'Monitor', sub: 'and review', k: 'data', w: 230 } ],
            edges: [{ from: 'u', to: 'a', k: 'neutral' }, { from: 'a', to: 'd', k: 'neutral' }, { from: 'd', to: 'i', k: 'neutral' }, { from: 'i', to: 'm', k: 'neutral' }],
            steps: [
              {},
              { show: 'u' },
              { show: 'a u-a', flow: 'u-a' },
              { show: 'd a-d', flow: 'a-d' },
              { show: 'i d-i m i-m', flow: 'd-i i-m' },
              { hi: 'u a', focus: true, note: { at: 'a', text: 'Technical fixes rarely come first', k: 'human' } } ],
            say: 'Questions that ask what to do first follow a predictable order. | You understand the situation before anything else: what is in scope, what data is involved, and who owns it. | Then you assess the risk and its impact. | Then someone with the right authority decides how to treat it. | Only then are controls implemented, and monitored afterwards. | So when an answer jumps straight to a technical fix, ask whether understanding and assessment have happened yet. Usually they have not.' },
          { t: 'compare', title: 'Why tempting answers lose', cols: [{ h: 'Looks right because…', icon: 'eye', k: 'human' }, { h: 'Loses because…', icon: 'x', k: 'threat' }], rows: [
            ['It is technically correct', 'It does not answer the question that was asked'],
            ['It fixes the visible symptom', 'The question wants the root cause or the first step'],
            ['It is the most secure option', 'It ignores the business need or the risk appetite'],
            ['It acts immediately', 'Nobody has assessed the risk or approved the action'] ],
            say: 'Most wrong answers are wrong in one of four familiar ways. | Some are technically correct statements that simply do not answer the question asked. | Some fix the visible symptom when the question wants the root cause, or the first step. | Some are the most secure option on paper, but ignore what the business needs or the risk it has chosen to accept. | And some act immediately, before anyone has assessed the risk or approved the action.' },
          { t: 'quiz', q: 'A business unit wants to launch a customer-facing chatbot next week. As the security professional, what should you do FIRST?',
            o: ['Commission a penetration test of the chatbot', 'Establish the use case, the data it will handle and the risks involved', 'Block the launch until a full audit is complete', 'Configure a content filter on the chatbot’s responses'], a: 1,
            why: 'You can’t choose the right tests or controls until you understand the use case and its data. Blocking the launch outright ignores the business need without assessing anything.' },
          { t: 'bullets', title: 'Study habits that make it stick', items: [
            { icon: 'cycle', h: 'Spaced repetition', d: 'Review cards little and often, as the review page schedules them' },
            { icon: 'audit', h: 'Retrieval practice', d: 'Test yourself before rereading; recall builds memory' },
            { icon: 'split', h: 'Interleaving', d: 'Mix domains in practice sessions instead of blocking them' },
            { icon: 'clock', h: 'Timed mocks', d: 'Two full mocks build the stamina for three hours' } ],
            say: 'Four study habits make the biggest difference. | Spaced repetition: review a few cards often, rather than many cards once. The review page schedules this for you. | Retrieval practice: test yourself before you reread. Pulling an answer out of memory strengthens it far more than reading it again. | Interleaving: mix domains in practice, because the exam will. | And timed mocks: three hours is long, and stamina is a skill.' },
          { t: 'summary', items: [
            'Find the role, the qualifier and the constraint',
            'FIRST usually means understand and assess before acting',
            'Strike answers that are true but beside the point',
            'Test yourself early and often; mix the domains' ],
            say: 'To recap. | Find the role, the qualifier and the constraint in every question. | First usually means understand and assess before acting. | Strike answers that are true but beside the point. | And test yourself early and often, mixing the domains.' }
        ] },
        { type: 'steps', title: 'A four-pass method for any question', items: [
          ['Read the last sentence first', `The final sentence holds the actual question and its qualifier: *What should the security manager do FIRST?* Reading it first tells you what to look for in the scenario above it.`],
          ['Read the scenario for constraints', `Underline, mentally, anything that limits the answer: a regulation, a budget, a deadline, a stated risk appetite, who you are and who you report to.`],
          ['Predict before you look at the options', `Form your own answer in a few words. If an option matches your prediction, it is probably right. If none does, re-read the stem; you may have missed the qualifier.`],
          ['Eliminate and decide', `Strike options that are false, then options that are true but don’t answer this question. Choose between what remains using the qualifier. Flag it and move on if you’re still split after about a minute.`] ] },
        { type: 'text', md: `### Time management on the day

At 160 items in 180 minutes you have about 67 seconds per question. Some will take ten seconds and some will take two minutes, so think in checkpoints rather than per-question timers. Around question 53 at one hour and question 107 at two hours keeps you on track with nothing to spare.

Use flags sparingly. Flag a question when you have narrowed it to two options and can’t separate them, choose your best guess anyway, and move on. Never leave a question blank: an unanswered item scores the same as a wrong one.

### Building your plan

Open the **Study plan** page and set your pilot exam date. The plan spreads the remaining knowledge points across the study days you choose and shows the next three weeks, item by item. If the daily goal comes out above about four hours, the plan will warn you: add study days or protect more time rather than skimming, because skimmed material doesn’t survive exam pressure.` },
        { type: 'scenario', title: 'Spot the qualifier', md: `An organisation has deployed a generative AI assistant for its HR team. A review finds the assistant can return details about employees' salaries when asked indirectly. Leadership wants the issue handled without withdrawing a tool the HR team relies on.`,
          q: { q: 'Which action BEST meets leadership’s requirement?', o: ['Withdraw the assistant immediately until it can be rebuilt with a new model', 'Restrict its access to salary data so it reaches only what each requester may see', 'Publish an acceptable use policy reminding staff not to ask the assistant about salaries', 'Retrain the underlying model on a smaller dataset that leaves out all HR records'], a: 1,
            why: 'The constraint is to keep the tool available, which rules out withdrawal. A policy alone doesn’t prevent the disclosure, and retraining doesn’t address access to the data. Limiting the assistant to data the requester is entitled to see fixes the cause while keeping the tool.' } }
      ]
    }
  ],
  quiz: [
    { q: 'What is the format of the ISC2 AI Security pilot exam?', o: ['125 multiple-choice items in three hours', '160 multiple-choice items in three hours', '150 multiple-choice items in four hours', '100 scenario items in two and a half hours'], a: 1, why: 'The pilot exam outline specifies 160 multiple-choice items with a three-hour time limit.' },
    { q: 'Which domains carry the largest weight on the pilot exam?', o: ['Domain 1 and Domain 2', 'Domain 3 and Domain 5', 'Domain 4 and Domain 6', 'Domain 2 and Domain 6'], a: 1, why: 'Domain 3 (data management, privacy and model security) and Domain 5 (secure operations and incident response) are each weighted at 19%.' },
    { q: 'Roughly how much time does the exam allow per question?', o: ['About 45 seconds', 'About 67 seconds', 'About 90 seconds', 'About two minutes'], a: 1, why: 'Three hours is 10,800 seconds; divided by 160 items that is 67.5 seconds per item.' },
    { q: 'Which credential substitutes for the entire experience requirement?', o: ['An active CISSP certification', 'CompTIA Security+', 'A cloud provider’s associate certification', 'Any bachelor’s degree in computing'], a: 0, why: 'The outline lists CISSP, ISSAP, ISSEP, ISSMP, CCSP and CSSLP as substitutes for the whole requirement. A degree can waive only one year.' },
    { q: 'A candidate holds a master’s degree in computer science. How much of the experience requirement can it waive?', o: ['None', 'Up to one year', 'Up to two years', 'All four years'], a: 1, why: 'A relevant post-secondary degree may satisfy up to one year; only one year can be waived this way.' },
    { q: 'A question asks what a security manager should do FIRST after learning that a new AI tool has been adopted by a department. Which answer pattern is MOST likely correct?', o: ['Deploy a monitoring agent on the tool immediately to see how it is used', 'Understand the use case, data and ownership before choosing controls', 'Ban the tool across the organisation until it can be fully assessed', 'Ask the vendor for its latest penetration test report and certifications'], a: 1, why: 'FIRST questions usually reward understanding and assessment before action. Monitoring, bans and vendor reports may follow, but only once the situation is understood.' },
    { q: 'Two answer options are both technically accurate. How should you choose between them?', o: ['Pick the longer, more detailed option, since it covers more ground', 'Pick the option that addresses the stated qualifier and constraint', 'Pick the more technical option, since this is a security exam', 'Pick the option that mentions a recognised framework by name'], a: 1, why: 'When more than one statement is true, the qualifier (BEST, FIRST, MOST) and the scenario’s constraints decide which one actually answers the question.' },
    { q: 'Which study technique strengthens long-term recall MOST effectively?', o: ['Rereading your notes several times in one sitting', 'Highlighting key passages and reviewing them later', 'Testing yourself on it before reviewing the material', 'Watching every video twice in a row, at normal speed'], a: 2, why: 'Retrieval practice, recalling information from memory, produces stronger long-term retention than rereading or highlighting.' }
  ],
  exam: [],
  glossary: [
    ['Knowledge point (KP)', 'The course’s unit of planned study time. One knowledge point is roughly one minute of focused study; the course totals 3,600.'],
    ['Pilot exam', 'An exam form used to evaluate new questions before an exam goes live. Some items may be revised or removed after analysis.'],
    ['Job Task Analysis (JTA)', 'The process ISC2 uses to determine the tasks practitioners actually perform, so the exam tests what the role really involves.'],
    ['Domain weight', 'The share of exam questions drawn from a domain. On this exam, Domain 1 is 10% and the others range from 17% to 19%.'],
    ['Qualifier', 'A word such as BEST, MOST, FIRST or LEAST that determines which of several reasonable answers is correct.'],
    ['Retrieval practice', 'Studying by recalling information from memory, for example with questions or flash cards, rather than rereading it.'],
    ['Spaced repetition', 'Reviewing material at increasing intervals so it moves into long-term memory.'],
    ['Pearson Professional Center (PPC)', 'The testing centre network where the AI Security pilot exam is delivered.']
  ]
};
