/* 1.2 · Section 4: prompt engineering concepts */
module.exports = {
  title: 'Prompt engineering concepts', covers: [2],
  blocks: [
    { type: 'video', title: 'Talking to models', kicker: 'Module 1.2 · Video 4 of 7', scenes: [
      { t: 'title', kicker: 'Module 1.2 · Generative AI', title: 'Talking to models', sub: 'How prompts are built, the main techniques, and their limits', icon: 'chat',
        say: 'A prompt is the program you write for a language model, in natural language. | This video covers how prompts are structured, the techniques that make them work, and why a prompt can never be your only control.' },
      { t: 'code', title: 'Anatomy of a well-built prompt', file: 'support-assistant.prompt',
        code: `# system: developer instructions
You are Acme’s IT support assistant.
Answer only from the policy below.
If the policy doesn’t say, reply "I don’t know".
# context
<policy> 4.2 MFA resets use the portal </policy>
# example
Q: Can I reset MFA by email?
A: No. Use the self-service portal.
# user
How do I reset my MFA device?
# output format
JSON: {"answer": "...", "source": "4.2"}`,
        hl: [null, [1, 4], [5, 6], [7, 9], [10, 11], [12, 13]],
        notes: [{ h: 'Clear parts', d: 'Good prompts separate instructions, context, examples, input and format.' }, { h: 'System instructions', d: 'The role, rules and boundaries set by the developer.' }, { h: 'Context', d: 'Reference material the answer should rely on, clearly delimited.' }, { h: 'Examples', d: 'Show the pattern you want. This is few-shot prompting.' }, { h: 'The request', d: 'The user’s actual question.', k: 'human' }, { h: 'Output format', d: 'Structured output, such as JSON, lets code check the result.', k: 'control' }],
        say: 'A well-built prompt has distinct parts, clearly separated. | First, system instructions from the developer: the assistant’s role, its rules, and what to do when it does not know. | Then context, the reference material the answer should rely on, clearly marked off from everything else. | Then examples of the pattern you want. Showing the model an example or two is called few-shot prompting. | Then the user’s actual request. | And finally the output format. Asking for structured output, such as JSON, lets ordinary code check the answer before anyone relies on it.' },
      { t: 'compare', title: 'Three core techniques', cols: [{ h: 'Zero-shot', icon: 'arrow', k: 'neutral' }, { h: 'Few-shot', icon: 'copy', k: 'data' }, { h: 'Step-by-step', icon: 'list', k: 'model' }],
        labels: ['How', 'Best for', 'Watch for'], rows: [
          ['Just the instruction', 'Instruction plus a few examples', 'Ask the model to reason through steps'],
          ['Simple, common tasks', 'Consistent format and style', 'Multi-step problems and calculations'],
          ['Inconsistent formats', 'Examples bias the answers', 'Longer, costlier output'] ],
        say: 'Three techniques cover most prompting. | Zero-shot gives just the instruction. Few-shot adds a handful of examples. Step-by-step prompting asks the model to reason through the problem before answering, often called chain of thought. | Zero-shot suits simple, common tasks. Few-shot gives consistent format and style. Step-by-step helps with multi-step problems and calculations. | Each has a cost. Zero-shot output can vary in format, examples can bias answers towards themselves, and step-by-step reasoning produces longer, more expensive output.' },
      { t: 'bullets', title: 'Techniques that make prompts dependable', items: [
          { icon: 'user', h: 'Role and audience', d: 'Say who the assistant is and who it serves' },
          { icon: 'code', h: 'Delimiters', d: 'Mark where instructions end and data begins' },
          { icon: 'list', h: 'Structured output', d: 'Request JSON that matches a schema, then validate it' },
          { icon: 'pipeline', h: 'Prompt chaining', d: 'Split a big task into smaller, checkable steps' } ],
        say: 'A few more techniques make prompts dependable. | Define the role and the audience: who the assistant is, and who it is talking to. | Use delimiters, such as tags or markers, so it is clear where instructions end and data begins. | Request structured output that matches a schema, and validate it in code. | And chain prompts, splitting a large task into smaller steps whose results can each be checked.' },
      { t: 'chat', title: 'A grounded, structured assistant', app: 'Acme IT support',
        msgs: [
          { r: 'sys', t: 'Answer only from policy 4.2. Otherwise reply "I don’t know". Respond in JSON.' },
          { r: 'user', t: 'How do I reset my MFA device?' },
          { r: 'ai', t: '{"answer": "Use the self-service portal.", "source": "4.2"}' },
          { r: 'user', t: 'What’s the chief executive’s mobile number?' },
          { r: 'ai', t: '{"answer": "I don’t know.", "source": null}' } ],
        notes: [{ h: 'The rule', d: 'The developer limits answers to one policy and fixes the format.' }, { h: 'An in-scope question', d: 'Covered by the policy.' }, { h: 'Grounded and checkable', d: 'The answer cites its source, and code can validate the JSON.', k: 'control' }, { h: 'An out-of-scope question', d: 'Not covered by the policy at all.' }, { h: 'Usually handled', d: 'The rule works most of the time, but “usually” is not a security guarantee.', k: 'human' }],
        say: 'Here is that structure at work. The developer limits the assistant to one policy, and fixes the output format. | A user asks something the policy covers. | The answer is grounded in the policy, cites its source, and arrives as JSON that code can validate. | Then a user asks for something the policy does not cover. | The assistant declines, as instructed. But notice the word usually. A prompt shapes the model’s behaviour. It does not guarantee it.' },
      { t: 'compare', title: 'What prompts can and can’t do', cols: [{ h: 'Prompts can…', icon: 'check', k: 'control' }, { h: 'Prompts can’t…', icon: 'x', k: 'threat' }], rows: [
          ['Set the tone, role and format', 'Guarantee the model obeys'],
          ['Discourage off-topic answers', 'Keep a secret the model has been shown'],
          ['Ask for citations and structure', 'Enforce who may access which data'],
          ['Reduce some harmful output', 'Replace input, output and access controls'] ],
        say: 'That leads to the most important lesson in this section. | Prompts can set tone, role and format, but they cannot guarantee the model obeys. | They can discourage off-topic answers, but they cannot keep a secret the model has already been shown. Anything in a prompt should be assumed discoverable. | They can ask for citations, but they cannot enforce who may access which data. That belongs in the systems around the model. | And they can reduce some harmful output, but they never replace input validation, output checks and access controls.' },
      { t: 'quiz', q: 'A developer stores a database password in the system prompt and instructs the model never to reveal it. What is the BEST assessment?',
        o: ['Acceptable, because the instruction tells the model to keep it secret', 'Unacceptable: secrets should never be placed in prompts, as the model can be led to reveal them', 'Acceptable if the temperature is set to zero', 'Acceptable if the prompt is written in capital letters'], a: 1,
        why: 'Instructions are not controls. Anything in a model’s context can potentially be extracted, which is why OWASP lists system prompt leakage as a risk. Credentials belong in a secrets manager, used by code the model can’t read.' },
      { t: 'summary', items: [
          'Separate instructions, context, examples, input and output format',
          'Zero-shot, few-shot and step-by-step suit different tasks',
          'Delimiters, schemas and chaining make outputs checkable',
          'A prompt guides behaviour; it is never a security control' ],
        say: 'To recap. | Separate the instructions, context, examples, input and output format. | Zero-shot, few-shot and step-by-step prompting suit different tasks. | Delimiters, schemas and prompt chaining make outputs checkable. | And a prompt guides behaviour. It is never a security control on its own.' }
    ] },
    { type: 'text', md: `### What prompt engineering is

**Prompt engineering** is the practice of designing the input to a model so that it reliably produces the output you need. In applications, a prompt is usually assembled by code from several parts:

- **Instructions**: the task, the role the model should take, rules and constraints.
- **Context**: reference material such as policy text, retrieved documents or data to analyse.
- **Examples**: demonstrations of the desired input-output pattern.
- **Input**: the user’s request or the data to process.
- **Output format**: the structure the answer must take.

Chat APIs organise these into **message roles**. A **system** (or developer) message sets the overall behaviour. **User** messages carry requests. **Assistant** messages hold the model’s earlier replies, and **tool** messages return the results of function calls. Providers train models to give system messages more weight, but that weighting is learned behaviour, not an enforced boundary.

### Core techniques

- **Zero-shot prompting**: give the instruction only. It works for common, well-defined tasks.
- **Few-shot prompting** (in-context learning): include a few worked examples. The model infers the pattern without any retraining, which is powerful for consistent formats. Examples also bias the output, so choose representative ones.
- **Chain-of-thought (step-by-step) prompting**: ask the model to reason through intermediate steps before answering, which improves multi-step reasoning and arithmetic. Some newer "reasoning" models do this internally. Treat displayed reasoning as a helpful trace, not a guaranteed explanation of how the answer was reached.
- **Role prompting**: assign a persona and audience ("You are a security analyst explaining to the board").
- **Delimiters and tagging**: wrap data in clear markers, such as XML-style tags, so instructions and data are distinguishable to the model and to reviewers.
- **Structured output**: request JSON conforming to a schema. Many APIs can enforce a schema at generation time. Validate the result anyway before acting on it.
- **Prompt templates**: reusable prompts with variables filled in by code. They make prompts testable and versionable.
- **Prompt chaining and decomposition**: break a complex task into steps, each with its own prompt, feeding outputs forward. Each step can be validated.
- **Self-consistency**: sample several answers and take the most common, trading cost for reliability.

### Generation settings

Prompts work together with parameters such as **temperature**, **top-p**, **maximum tokens** and **stop sequences** (Section 1). For extraction or classification, low temperature and a schema give consistency. For drafting and ideas, higher temperature gives variety.` },
    { type: 'steps', title: 'Turning a prompt into a production asset', items: [
      ['Write it as a template', `Keep the prompt in version control with named variables for user input and context, never assembled ad hoc in code paths that are hard to review.`],
      ['Build an evaluation set', `Collect representative inputs, including edge cases and adversarial ones, with expected outputs or grading criteria.`],
      ['Test before every change', `Treat prompt edits like code changes: run the evaluation set, compare results, and review. Small wording changes can shift behaviour unexpectedly.`],
      ['Version and approve', `Record which prompt version is live, who approved it and why. Prompts are part of AI change management (Module 6.2).`],
      ['Monitor in production', `Log prompts and outputs with privacy safeguards (Module 5.2), watch for drift and failures, and feed findings back into the evaluation set.`] ] },
    { type: 'text', md: `### Prompts and security

Three principles follow from how models work.

**1. A prompt is guidance, not a control.** The model follows its instructions probabilistically. Most of the time it complies; sometimes, especially when inputs are unusual or adversarial, it doesn’t. Anything that *must* hold, such as who can see which data or which actions are allowed, has to be enforced by deterministic code, permissions and validation around the model.

**2. Never put secrets in prompts.** System prompts can be coaxed out of models, and OWASP lists **system prompt leakage (LLM07)** as a top-ten risk. API keys, passwords, connection strings and confidential business logic don’t belong there. Assume a determined user can read every instruction you give the model.

**3. Everything in the context can act as an instruction.** Because the model reads instructions and data in the same channel, text inside a document, a web page, an email or a tool result can be interpreted as a command. This is **prompt injection (LLM01)**. In *direct* prompt injection, a user types input meant to override the instructions. In *indirect* prompt injection, the instructions arrive hidden in content the system retrieves or processes. Well-structured prompts with clear delimiters make injection harder, but they don’t prevent it. Defences combine least privilege, isolating untrusted content, validating outputs, and requiring human approval for consequential actions, covered in Modules 4.4 and 6.6.` },
    { type: 'flip', title: 'Prompting terms', cards: [
      ['System prompt', 'Developer instructions that set a model’s role, rules and boundaries for a conversation.'],
      ['Few-shot prompting', 'Including worked examples in the prompt so the model infers the desired pattern.'],
      ['Chain-of-thought', 'Prompting the model to reason through intermediate steps before answering.'],
      ['Structured output', 'Requiring output in a defined format, such as JSON matching a schema, so code can validate it.'],
      ['Prompt chaining', 'Splitting a task into a sequence of prompts, each feeding the next.'],
      ['Prompt injection', 'Input, direct or hidden in processed content, that causes a model to deviate from its intended instructions.'] ] },
    { type: 'callout', kind: 'exam', title: 'The “prompt fix” distractor', md: `Many questions offer a prompt-based fix, such as "add an instruction telling the model not to reveal customer data", alongside a control-based one, such as "restrict the data the model can access to what the user is authorised to see". When the requirement is a security guarantee, the control-based option is almost always better. Prompt changes are useful hardening, not enforcement.` },
    { type: 'check', q: { q: 'An extraction pipeline asks an LLM to pull invoice fields into a database, but output formats vary from run to run. Which change BEST improves reliability?', o: ['Raise the temperature so the model explores more formats and settles on the best one', 'Request schema-defined JSON with two worked examples, and validate the output before insertion', 'Add a final instruction telling the model to be accurate and consistent in every response', 'Switch to a model with a larger context window so that whole invoice batches fit at once'], a: 1, b: 2, why: 'A schema plus few-shot examples constrains the format, and validation catches anything malformed before it reaches the database. Higher temperature increases variation; vague instructions and bigger windows don’t address the problem.' } }
  ]
};
