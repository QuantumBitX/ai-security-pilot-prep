/* 1.2 · Section 8: case study pulling the module together */
module.exports = {
  title: 'Case study: one assistant, end to end', covers: [1, 2, 3, 4, 5, 8, 9],
  blocks: [
    { type: 'video', title: 'One request, end to end', kicker: 'Module 1.2 · Case study', scenes: [
      { t: 'title', kicker: 'Module 1.2 · Case study', title: 'One request, end to end', sub: 'Every idea in this module, inside one HR assistant', icon: 'compass',
        say: 'This module has covered a lot of moving parts. | This case study follows a single request through a realistic assistant, so you can see where each part sits, and where each risk and control belongs.' },
      { t: 'flow', title: 'Following one request',
        nodes: [
          { id: 'user', x: 190, y: 330, icon: 'user', label: 'Employee', k: 'human', w: 230 },
          { id: 'app', x: 560, y: 330, icon: 'code', label: 'Assistant app', sub: 'identity, session, prompt', k: 'neutral', w: 290 },
          { id: 'ret', x: 950, y: 330, icon: 'search', label: 'Retrieval', sub: 'filtered by the user’s rights', k: 'data', w: 290 },
          { id: 'llm', x: 1330, y: 330, icon: 'model', label: 'Model', sub: 'hosted, version pinned', k: 'model', w: 260 },
          { id: 'out', x: 1330, y: 700, icon: 'filter', label: 'Output checks', sub: 'grounding, personal data, format', k: 'control', w: 290 },
          { id: 'gate', x: 950, y: 700, icon: 'shieldcheck', label: 'Policy gate', sub: 'a person approves bookings', k: 'control', w: 290 },
          { id: 'hr', x: 560, y: 700, icon: 'database', label: 'HR system', sub: 'least-privilege API', k: 'neutral', w: 270 } ],
        edges: [{ from: 'user', to: 'app', k: 'human' }, { from: 'app', to: 'ret', k: 'data' }, { from: 'ret', to: 'llm', k: 'data' }, { from: 'llm', to: 'out', k: 'model' }, { from: 'out', to: 'gate', k: 'control' }, { from: 'gate', to: 'hr', k: 'control' }],
        steps: [
          { show: 'user app user-app', flow: 'user-app', hi: 'user' },
          { show: 'user app user-app', hi: 'app', note: { x: 90, y: 560, w: 290, text: 'The assistant acts for this user, never with its own unlimited rights.' } },
          { show: 'ret app-ret', flow: 'app-ret', hi: 'ret', note: { x: 90, y: 560, w: 290, text: 'Only passages this employee is entitled to read.' } },
          { show: 'llm ret-llm', flow: 'ret-llm', hi: 'llm', note: { x: 90, y: 560, w: 290, text: 'Instructions, delimited passages, then the question.' } },
          { show: 'out llm-out', flow: 'llm-out', hi: 'out', note: { x: 90, y: 560, w: 290, text: 'The output is untrusted until it has been checked.' } },
          { show: 'gate out-gate', flow: 'out-gate', hi: 'gate', note: { x: 90, y: 560, w: 290, text: 'The model only asked. Code checks, and a person approves.' } },
          { show: 'hr gate-hr', flow: 'gate-hr', hi: 'hr', mark: { hr: 'ok' } },
          { note: { x: 90, y: 560, w: 290, text: 'Every arrow is a trust boundary: limit it, log it, test it.' } } ],
        say: 'An employee asks the HR assistant two things: what the carry-over rule is for unused leave, and to book three days off next month. | The assistant app signs the user in and keeps the session. Crucially, it acts on behalf of this user, with this user’s rights, not with a powerful account of its own. | It retrieves relevant policy passages from the vector index, filtered so that only content this employee is entitled to read can come back. | It assembles the prompt: instructions first, then the passages inside clear delimiters, then the question, and sends it to a hosted model whose version is pinned. | The model’s answer is treated as untrusted. Output checks confirm the answer is grounded in the passages, strip personal data that shouldn’t be there, and validate the structured format. | The model has also requested a tool call to book the leave. A policy gate checks that the request is valid for this user, and because it changes a record, a person approves it. | Only then does the HR system receive the booking, through an API scoped to exactly that action. | Notice that every arrow crosses a trust boundary. Each one needs limits, logging and testing.' },
      { t: 'compare', title: 'Matching each need to a technique', labels: ['Friendly, on-brand tone', 'Current leave policy', 'Book leave', 'Answer in many languages'],
        cols: [{ h: 'Best fit', icon: 'check', k: 'control' }, { h: 'Why', icon: 'bulb', k: 'neutral' }],
        rows: [
          ['A system prompt; fine-tune only if that fails', 'Tone is behaviour, and prompting is cheapest'],
          ['RAG over the policy library', 'Policies change: update the index, not the weights'],
          ['An agent tool behind a policy gate', 'It is an action, so it needs limits and approval'],
          ['The base model, tested per language', 'Most large models are multilingual; check quality'] ],
        say: 'The design team matched each requirement to the simplest technique that meets it. | A friendly, on-brand tone is behaviour, so they started with a system prompt. Fine-tuning stays in reserve if prompting can’t deliver it consistently. | Leave policy changes every year, so it belongs in retrieval. Updating a document in the index changes answers immediately, with no retraining. | Booking leave is an action, not an answer. That makes it an agent capability, exposed as a narrow tool behind a policy gate. | And for many languages, a large multilingual model is usually enough, provided quality is tested in each language before launch.' },
      { t: 'bullets', title: 'Five questions for any GenAI design', items: [
          { icon: 'database', h: 'Where does the knowledge come from?', d: 'Sources, owners, freshness and who can edit them', k: 'data' },
          { icon: 'users', h: 'Who can see what?', d: 'Permissions carried from source to index to answer', k: 'human' },
          { icon: 'tool', h: 'What can it do?', d: 'Tools, scopes, limits and approvals', k: 'model' },
          { icon: 'audit', h: 'How do we know it is right?', d: 'Evaluation, grounding checks and monitoring', k: 'control' },
          { icon: 'siren', h: 'What happens when it fails?', d: 'Fallbacks, rollback, kill switch and incident response', k: 'threat' } ],
        say: 'You can review almost any generative AI design with five questions. | Where does its knowledge come from, who owns those sources, how fresh are they, and who can change them? | Who can see what? Permissions must survive the journey from the source system, through the index, into the answer. | What can it do? List every tool, the scope of each credential, the limits on volume and value, and the actions that need approval. | How do we know it is right? That means evaluation before launch, grounding checks at run time, and monitoring afterwards. | And what happens when it fails? There should be a safe fallback, a way to roll back, a kill switch, and an incident process that already knows about AI. Later domains of this course answer each of these questions in depth.' },
      { t: 'summary', items: ['Act with the user’s rights, never the assistant’s own', 'Retrieve with permission filters; delimit passages', 'Treat output as untrusted; gate every action', 'Pick the simplest technique that meets each need'],
        say: 'To sum up the case. | The assistant acts with the user’s rights, never with broad rights of its own. | Retrieval is permission-filtered, and retrieved passages are clearly separated from instructions. | Output is checked before use, and every action passes through a policy gate. | And each requirement gets the simplest technique that meets it: prompting, retrieval, fine-tuning or agency.' } ] },
    { type: 'text', md: `### The scenario
Harbour Logistics employs about 6,000 people across four countries. Its HR team answers the same questions every day: how much leave can be carried over, how parental leave works, which expenses are claimable. Leadership wants an assistant that answers these questions from the official policy library, in the employee’s own language, and can also *do* simple things, starting with booking leave.

A small team of an HR lead, two engineers, a security architect and a privacy officer has six weeks to design a pilot. Their choices illustrate nearly every topic in this module.

### Choosing the model
The team compared a hosted model from a major provider with a self-hosted open-weight model. Hosting was faster to launch and avoided buying GPUs, but sent prompts to a third party. The privacy officer confirmed that the provider’s enterprise terms excluded customer data from training, offered regional processing, and set retention limits. The team chose the hosted model, **pinned to a specific version**, so that a silent provider update could not change behaviour mid-pilot. They recorded a plan to re-evaluate before accepting any new version.

### Tokens and context
The full policy library is about 1.2 million tokens, far too large to send with every question, and expensive even if it fitted. Long prompts also make it more likely that the model misses details in the middle. The team therefore used retrieval and capped each request at a budget of about 6,000 tokens of passages. They also set per-user rate limits and monthly token budgets per department, which supports cost control and makes unusual consumption visible.

### Retrieval that respects permissions
The first prototype indexed everything with a service account that could read the whole HR drive, including disciplinary procedures and salary bands that only managers may see. In testing, an ordinary employee asked about pay and received a passage from the confidential salary guidance. The fix was not a better prompt. The team carried each document’s access list into the index as metadata and **filtered every search by the requesting user’s entitlements** before anything reached the model. Confidential collections went into a separate index that only authorised roles can query.

### Prompt design
The system prompt sets the role, tone and rules: answer only from the supplied passages, cite the policy section, and say “I don’t know” when the passages don’t contain the answer. Retrieved passages sit inside clear delimiters and are labelled as reference material, not instructions. Answers come back as structured output that the application validates. The team was explicit in its design record that **the prompt guides behaviour but enforces nothing**; every hard rule is enforced in code.

### Fine-tuning: considered, then deferred
Some stakeholders wanted to fine-tune a model on past HR emails “so it sounds like us”. The team noted that those emails contain personal data, that fine-tuning can erode a model’s safety behaviour, and that tone was already acceptable with prompting. They deferred fine-tuning, with a rule that any future tuning must use a curated, approved dataset and pass the same safety evaluation as the base model.

### The booking agent
Booking leave turned the assistant into an agent. The model can request a single tool, \`book_leave\`, with typed parameters. The application, not the model, executes it, using the employee’s own delegated token, scoped to leave records only. A policy gate rejects requests that exceed the employee’s balance or touch another person’s record, and the employee confirms every booking before it is submitted. Each step, from prompt to tool call to result, is logged with the user’s identity.

### Evaluation before launch
Before the pilot, the team built a test set of 300 real questions with approved answers, including tricky cases: outdated policies, questions with no answer in the library, requests for colleagues’ data, and documents containing embedded instructions. They measured grounded accuracy, correct refusals and leakage, and repeated the tests in each supported language.`, },
    { type: 'tabs', title: 'Design review, component by component', items: [
      ['Model', 'Hosted, enterprise terms checked (no training on customer data, regional processing, retention limits). Version pinned, with a re-evaluation gate before upgrades. **Main risks:** provider changes, data handling, outages. **Controls:** contract terms, version pinning, fallback message when the service is unavailable.'],
      ['Data and retrieval', 'Policy library indexed with source permissions as metadata; confidential collections in a separate index. **Main risks:** oversharing, poisoned or outdated documents. **Controls:** permission-filtered search, controlled publishing of source documents, freshness metadata, re-indexing when policies change.'],
      ['Prompt and output', 'Role, rules and citation requirement in the system prompt; passages delimited; structured output validated. **Main risks:** indirect prompt injection, hallucinated answers, leaked personal data. **Controls:** delimiting, grounding checks, output filtering, “I don’t know” behaviour.'],
      ['Agent capability', 'One narrow tool, executed by the application with the user’s delegated rights, behind a policy gate and user confirmation. **Main risks:** excessive agency, manipulation into wrong actions. **Controls:** least privilege, validation of every parameter, confirmation, logging.'],
      ['Operations', 'Per-user rate limits and departmental token budgets; full logging of prompts, retrievals and tool calls with identity. **Main risks:** cost blow-outs, misuse, slow detection. **Controls:** budgets, alerts on unusual use, a documented kill switch.'] ] },
    { type: 'callout', kind: 'exam', title: 'Look for the control that enforces', md: `Many exam options sound protective but only *ask* the model to behave: “add an instruction”, “tell the model not to”, “use a stronger system prompt”. When another option enforces the same goal outside the model (a permission filter, a scoped credential, an approval step, an output check), that option is almost always the better answer.` },
    { type: 'scenario', title: 'The salary passage', md: `During testing of Harbour’s assistant, an employee without management rights asks about pay bands and receives a passage from confidential salary guidance. The engineers propose three fixes: a stronger system prompt telling the model never to discuss salaries, a filter that blocks answers containing currency amounts, or carrying document permissions into the index and filtering retrieval by the user’s entitlements.`,
      q: { q: 'Which fix BEST addresses the root cause?', o: ['A stronger system prompt that forbids discussing salaries, bonuses or any other compensation data with anyone', 'An output filter that blocks any answer containing a currency amount or a pay grade', 'Carrying document permissions into the index and filtering retrieval by each user’s entitlements', 'Switching to a larger, more capable model that better understands confidentiality'], a: 2, b: 9,
        why: 'The root cause is that retrieval returned content the user is not authorised to read. Permission-aware retrieval stops it reaching the model at all. Prompt rules can be bypassed, and a currency filter is both over-broad and easy to evade.' } },
    { type: 'scenario', title: 'Make it sound like us', md: `A senior manager asks the team to fine-tune the model on five years of HR email threads so the assistant “sounds like Harbour”. The emails include employee names, medical absences and disciplinary matters. Prompt-based tone is already rated acceptable by pilot users.`,
      q: { q: 'What is the BEST response from the security and privacy perspective?', o: ['Fine-tune on the full email archive, because more examples give a more accurate house tone', 'Defer fine-tuning; if needed later, use a curated, minimised dataset and re-run safety and privacy tests', 'Fine-tune on the archive, and tell the model in its system prompt never to repeat any personal data it has seen', 'Skip fine-tuning and paste a large sample of archived emails into every request as examples'], a: 1, b: 4,
        why: 'The goal is already met by prompting, and the proposed data is highly sensitive. Fine-tuning on it risks memorisation and leakage and can erode safety behaviour. If tuning is ever justified, it should use minimised, approved data and pass the same evaluations as the base model.' } },
    { type: 'check', q: { q: 'Harbour’s assistant books leave through a tool. Which design MOST reduces the impact if a manipulated document convinces the model to request a booking for someone else?', o: ['The model calls the booking tool directly using a shared HR administrator account, with every call logged in full', 'The app runs the tool with the employee’s delegated, leave-only token, after a policy check and their confirmation', 'The system prompt firmly instructs the model never to book leave on behalf of anyone else', 'Every tool call is logged in full, and HR reviews the booking log for anomalies each week'], a: 1, b: 5,
      why: 'Executing with the user’s own narrowly scoped rights means the tool physically cannot touch another person’s record, and the gate and confirmation add further checks. Prompts don’t enforce, and logging alone only detects after the fact.' } }
  ]
};
