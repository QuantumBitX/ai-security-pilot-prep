/* 1.2 · Section 2: NLP building blocks and token management */
module.exports = {
  title: 'NLP building blocks, tokens and token management', covers: [6, 8],
  blocks: [
    { type: 'video', title: 'From text to tokens', kicker: 'Module 1.2 · Video 2 of 7', scenes: [
      { t: 'title', kicker: 'Module 1.2 · Generative AI', title: 'From text to tokens', sub: 'How machines read language, and why tokens are the unit of cost and risk', icon: 'token',
        say: 'Models do not read words the way we do. They read tokens. | This video covers the classic building blocks of natural language processing, how modern tokenisers work, and how to manage tokens as a resource.' },
      { t: 'flow', title: 'The classic NLP pipeline',
        nodes: [
          { id: 'raw', x: 200, y: 430, icon: 'doc', label: 'Raw text', sub: 'emails, tickets, logs', k: 'data', w: 240 },
          { id: 'norm', x: 480, y: 430, icon: 'filter', label: 'Normalise', sub: 'case, Unicode, noise', k: 'neutral', w: 240 },
          { id: 'tok', x: 760, y: 430, icon: 'token', label: 'Tokenise', sub: 'split into units', k: 'neutral', w: 240 },
          { id: 'tag', x: 1040, y: 430, icon: 'tag', label: 'Analyse', sub: 'parts of speech, entities', k: 'neutral', w: 240 },
          { id: 'task', x: 1330, y: 430, icon: 'model', label: 'Task', sub: 'classify, extract, answer', k: 'model', w: 240 } ],
        edges: [{ from: 'raw', to: 'norm', k: 'data' }, { from: 'norm', to: 'tok', k: 'data' }, { from: 'tok', to: 'tag', k: 'data' }, { from: 'tag', to: 'task', k: 'data' }],
        steps: [
          { show: 'raw', hi: 'raw' },
          { show: 'norm raw-norm', flow: 'raw-norm', hi: 'norm' },
          { show: 'tok norm-tok', flow: 'norm-tok', hi: 'tok' },
          { show: 'tag tok-tag', flow: 'tok-tag', hi: 'tag', note: { x: 1040, y: 600, w: 440, text: 'Named entity recognition finds names, emails and account numbers', k: 'control' } },
          { show: 'task tag-task', flow: 'tag-task', hi: 'task' } ],
        say: 'Natural language processing turns raw text, such as emails, tickets and logs, into something a machine can work with. | Normalisation cleans it up: consistent case, consistent Unicode characters, and noise removed. | Tokenisation splits the text into units. | Analysis then tags each unit, with its part of speech, or as a named entity, such as a person, an email address or an account number. Named entity recognition is how many data loss prevention tools find personal data. | Finally a task model classifies, extracts or answers. Modern language models fold most of these steps into one network, but the vocabulary still matters.' },
      { t: 'tokens', title: 'How a modern tokeniser splits text', text: 'Tokenisation splits unfamiliar words into pieces.',
        toks: ['Token', 'isation', ' splits', ' unf', 'amiliar', ' words', ' into', ' pieces', '.'], ids: [3404, 8082, 41211, 9662, 1855, 4339, 1139, 9863, 13],
        window: { size: 16 }, notes: [null, 'Common words are single tokens', 'Every token is a number in the vocabulary', '9 tokens of a 16-token window'],
        steps: ['text', 'split', 'ids', 'window'],
        say: 'Modern models use subword tokenisers, such as byte-pair encoding. | Common words become a single token, and rarer words are split into familiar pieces, so the model can handle words it has never seen. | Each token is really a number, an index into the model’s vocabulary. The model only ever sees these numbers. | And every model can only consider a fixed number of tokens at once. That limit is its context window.' },
      { t: 'stat', kicker: 'Rule of thumb', num: { v: 4, label: 'characters per token, on average, in English text' },
        def: 'About 100 tokens for every 75 English words. Code, numbers and most other languages take more tokens per word.',
        ex: 'A 10,000-word report is roughly 13,000 tokens.',
        say: 'A useful rule of thumb. | In English, a token averages about four characters, so a hundred tokens is roughly seventy-five words. Code, numbers and many other languages need more tokens for the same content. | So a ten-thousand-word report is roughly thirteen thousand tokens.' },
      { t: 'tokens', title: 'When the context window overflows', text: 'System rules come first, then a long chat history, then the newest question.',
        toks: ['System', ' rules', ' come', ' first', ',', ' then', ' a', ' long', ' chat', ' history', ',', ' then', ' the', ' newest', ' question', '.'],
        window: { size: 12 }, notes: [null, '16 tokens, but room for only 12', 'Naive truncation drops the oldest tokens: the rules'],
        steps: ['split', 'window', 'overflow'],
        say: 'Here is why the window matters for security. | This conversation needs sixteen tokens, but the window holds only twelve. | If an application simply drops the oldest tokens to make room, it drops the system rules that were meant to govern the whole conversation. Good applications keep instructions pinned, and trim or summarise the history instead.' },
      { t: 'bullets', title: 'Managing tokens as a resource', items: [
          { icon: 'sliders', h: 'Budgets', d: 'Cap input and output tokens on every request' },
          { icon: 'clock', h: 'Rate limits', d: 'Tokens and requests per minute, per user and per key' },
          { icon: 'bars', h: 'Accounting', d: 'Track usage by user, application and purpose' },
          { icon: 'layers', h: 'Smart truncation', d: 'Summarise history; never drop the instructions' } ],
        say: 'Because tokens drive both cost and risk, they need managing. | Set budgets: cap the input and output tokens allowed on each request. | Apply rate limits on tokens and requests per minute, per user and per key, so one caller cannot exhaust shared capacity. | Account for usage by user, application and purpose. That supports cost control, abuse detection and audit. | And truncate intelligently: summarise or trim old history, but keep the instructions in place.' },
      { t: 'quiz', q: 'A public chatbot lets anonymous users paste unlimited text and request unlimited output length. Which risk does this MOST directly create?',
        o: ['Model inversion', 'Unbounded consumption of compute and cost', 'Training data poisoning', 'Non-repudiation failure'], a: 1,
        why: 'Unlimited input and output lets any user consume large amounts of compute and money, the risk OWASP calls unbounded consumption. Token caps, rate limits and quotas address it.' },
      { t: 'summary', items: [
          'NLP: normalise, tokenise, analyse, then solve the task',
          'Subword tokenisers split rare words into pieces; models see token numbers',
          'About 4 characters, or 0.75 words, per English token',
          'Budget, rate-limit and account for tokens; keep instructions pinned' ],
        say: 'To recap. | Classic natural language processing normalises, tokenises and analyses text before solving a task. | Subword tokenisers split rare words into pieces, and the model sees only token numbers. | An English token is about four characters, or three quarters of a word. | And tokens need budgets, rate limits and accounting, with instructions kept pinned when the context fills up.' }
    ] },
    { type: 'text', md: `### The building blocks of natural language processing

Natural language processing (NLP) is the branch of AI concerned with understanding and generating human language. Long before LLMs, NLP systems were built from a pipeline of distinct steps, and those steps still appear inside security tools such as data loss prevention, email filtering and log analysis.

- **Normalisation** makes text consistent: lowercasing, removing accents or punctuation where appropriate, and **Unicode normalisation** (such as NFKC), which converts equivalent forms, such as full-width letters, ligatures and stylised letters, to a standard one. Look-alike letters from other alphabets, such as Cyrillic letters that resemble Latin ones, also need **confusable-character mapping** (Unicode Technical Standard #39). Without these steps, a filter looking for a blocked word can be bypassed with look-alike characters.
- **Tokenisation** splits text into units: words, subwords or characters.
- **Stop-word removal** discards very common words such as "the" and "of" in classic pipelines.
- **Stemming and lemmatisation** reduce words to a root form: stemming chops suffixes crudely ("running" to "run"), while lemmatisation uses vocabulary and grammar ("better" to "good").
- **Part-of-speech tagging** labels each word as a noun, verb and so on, and **parsing** works out sentence structure.
- **Named entity recognition (NER)** finds and classifies entities such as people, organisations, locations, dates, email addresses and account numbers. NER is a workhorse of PII detection and redaction.
- **Sentiment analysis** and **text classification** assign labels to whole passages: positive or negative, phishing or legitimate, urgent or routine.

Text was once represented as **bag-of-words** counts or **TF-IDF** weights, which ignore word order. **Word embeddings** such as word2vec captured meaning as vectors, and transformers then produced **contextual embeddings**, in which the same word gets a different vector depending on its surroundings. Section 3 covers embeddings in depth.

### How modern tokenisers work

LLMs use **subword tokenisation**, which balances vocabulary size against coverage. **Byte-pair encoding (BPE)** starts from individual characters or bytes and repeatedly merges the most frequent adjacent pairs into new tokens, building a vocabulary of common words and word pieces. Related schemes include **WordPiece** and **SentencePiece**. Any text, including misspellings, new words and code, can be represented, because unfamiliar words break down into known pieces.

The model never sees letters, only token IDs. That explains several quirks: models can struggle to count letters in a word or reverse a string, because those characters may be hidden inside a single token. It also means the same content can cost very different amounts depending on language, and that content filters must consider how text will actually be tokenised and normalised, not just how it looks.` },
    { type: 'table', title: 'What a token budget looks like', head: ['Content', 'Approximate size', 'Approximate tokens'], rows: [
      ['One English sentence', '15–20 words', '20–27'],
      ['A typical email', '200 words', '~270'],
      ['A 10-page policy', '5,000 words', '~6,700'],
      ['A 300-page technical book', '100,000 words', '~133,000'],
      ['1,000 lines of source code', 'varies with language', 'often 10,000+'] ] },
    { type: 'text', md: `### Token management

Tokens are the unit in which models are measured, priced and limited. Providers charge per input and output token, often at different rates. Context windows limit how many tokens fit in one request. Throughput is limited in **tokens per minute** and **requests per minute**. Managing tokens is therefore part of cost control, performance and security at once.

Good token management includes:

- **Per-request limits** on input size and maximum output tokens, set by the application rather than by the user.
- **Rate limits and quotas** per user, per API key and per tenant, with alerts when spend or usage spikes.
- **Token accounting** that attributes usage to users, applications and purposes. It supports chargeback, detects abuse and provides audit evidence. Module 4.7 returns to auditing resource use.
- **Context strategies** for long conversations: summarising older turns, sliding windows that keep the most recent exchanges, and retrieval that brings in only what is relevant. Whatever the strategy, the system instructions should be pinned so they are never truncated away.
- **Caching** of repeated prompt prefixes and responses, where the provider supports it, which reduces cost and latency. Cached content must respect the same access rules as the original.

The security failure modes are concrete. Attackers can submit inputs designed to maximise token use, from very long prompts to requests that trigger long or recursive outputs, to exhaust capacity or run up costs. OWASP lists this as **LLM10: Unbounded Consumption**. Truncation that drops instructions can silently remove safeguards. And because token counts differ between languages and encodings, limits enforced on characters or words rather than tokens can be miscalibrated.` },
    { type: 'match', title: 'Match the NLP technique to its use', pairs: [
      ['Named entity recognition', 'Finding email addresses and account numbers for redaction'],
      ['Unicode normalisation', 'Making full-width and stylised letters match a filter'],
      ['Lemmatisation', 'Reducing “better” to its dictionary form “good”'],
      ['Byte-pair encoding', 'Splitting rare words into common subword pieces'],
      ['Sentiment analysis', 'Labelling customer feedback as positive or negative'] ] },
    { type: 'callout', kind: 'warn', title: 'Don’t let truncation remove your safeguards', md: `Many early chat applications kept conversations within the context window by dropping the oldest messages first. The oldest message is usually the system prompt. Long conversations then lost their instructions and guardrails entirely. Pin instructions, summarise history, and test long-conversation behaviour explicitly.` },
    { type: 'check', q: { q: 'A DLP tool scans prompts for a list of banned terms, but users bypass it by typing the terms in full-width or stylised Unicode letters that look normal. Which NLP step should be added BEFORE matching?', o: ['Stop-word removal', 'Unicode normalisation', 'Sentiment analysis', 'Part-of-speech tagging'], a: 1, b: 6, why: 'Unicode normalisation (such as NFKC) converts full-width, stylised and other equivalent forms to standard characters, so the banned terms match again. Look-alikes from other alphabets also need confusable-character mapping.' } }
  ]
};
