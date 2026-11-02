/* 6.1 · Section 4a: threats specific to GenAI and RAG */
module.exports = {
  title: 'Threats specific to generative AI and RAG', covers: [4],
  blocks: [
    { type: 'video', title: 'New attack surfaces in language and retrieval', kicker: 'Module 6.1 · Video 4 of 7', scenes: [
      { t: 'title', kicker: 'Module 6.1 · AI threat modelling', title: 'New attack surfaces in language and retrieval', sub: 'Threats specific to generative AI and RAG', icon: 'chat',
        say: 'Generative AI changes the attack surface. Instructions and data travel in the same channel, outputs are generated rather than templated, and retrieval pulls in content nobody reviewed. | This video covers threats specific to generative AI and retrieval-augmented generation.' },
      { t: 'compare', title: 'Why generative AI is different', labels: ['Input', 'Logic', 'Output', 'Data access'],
        cols: [{ h: 'Traditional app', icon: 'code', k: 'neutral' }, { h: 'GenAI app', icon: 'sparkle', k: 'model' }],
        rows: [
          ['Structured fields, validated', 'Free text, files, images'],
          ['Deterministic code', 'A model that follows text'],
          ['Templated and predictable', 'Generated; may hold code or links'],
          ['Specific database queries', 'Whole documents retrieved'] ],
        say: 'Generative AI applications differ from traditional ones in four ways. | Traditional inputs are structured fields that can be validated. Generative AI takes free text, files and images. | Traditional logic is deterministic code. Here, a model follows whatever text it is given, including text an attacker wrote. | Traditional outputs are templated. Generated outputs can contain code, links or markup that downstream systems might execute. | And instead of specific database queries, retrieval pulls whole documents into the model’s context.' },
      { t: 'bullets', title: 'Core generative AI threats', layout: 'grid', cols: 2, items: [
          { icon: 'chat', h: 'Prompt injection', d: 'Direct and indirect', k: 'threat' },
          { icon: 'eye', h: 'Sensitive data disclosure', d: 'Training data, context, prompts', k: 'data' },
          { icon: 'code', h: 'Improper output handling', d: 'Outputs executed downstream', k: 'human' },
          { icon: 'box', h: 'Package hallucination', d: 'Invented dependencies registered by attackers', k: 'model' },
          { icon: 'alert', h: 'Misinformation', d: 'Confident errors relied upon', k: 'neutral' },
          { icon: 'bolt', h: 'Unbounded consumption', d: 'Cost and capacity abuse', k: 'control' } ],
        say: 'Six threats stand out for generative AI. | Prompt injection, direct from users or indirect through content the model reads. | Sensitive data disclosure: training data, retrieved context or system prompts appearing in outputs. | Improper output handling, where generated code, links or markup are executed by downstream systems. | Package hallucination: models invent software packages that don’t exist, and attackers register those names with malicious code. | Misinformation: confident errors that people or systems rely on. | And unbounded consumption: abuse of cost and capacity, covered later in this module.' },
      { t: 'chat', title: 'A hallucinated package', app: 'Coding assistant',
        msgs: [
          { r: 'user', t: 'Which Python package should I use to parse CSV files safely?' },
          { r: 'ai', t: 'Use securecsv-parse. Install it with pip, then call its safe_read function.' },
          { r: 'doc', t: 'Package registry: securecsv-parse was registered last week by an unknown account.' } ],
        notes: [{ h: 'A normal question', d: 'A developer asks for a library recommendation.' }, { h: 'An invented name', d: 'The model recommends a package that never existed. Models often repeat the same invented names.', k: 'threat' }, { h: 'Someone registered it', d: 'Attackers watch for repeated hallucinated names and publish malicious packages under them. Verify packages before installing.', k: 'threat' }],
        say: 'Here is package hallucination in action. A developer asks a coding assistant which package to use for parsing CSV files safely. | The assistant confidently recommends a package that never existed. Models often repeat the same invented names, so they are predictable. | Attackers watch for those names and register them, with malicious code inside. The defence is simple but essential: verify that recommended packages exist, are established and come from an approved registry, before anyone installs them.' },
      { t: 'flow', title: 'Attacks specific to RAG',
        nodes: [
          { id: 'src', x: 230, y: 330, icon: 'doc', label: 'Knowledge poisoning', sub: 'a few crafted documents', k: 'threat', w: 330 },
          { id: 'rank', x: 700, y: 330, icon: 'target', label: 'Retrieval manipulation', sub: 'written to rank first', k: 'human', w: 330 },
          { id: 'inj', x: 1200, y: 330, icon: 'chat', label: 'Injection carriers', sub: 'instructions in documents', k: 'data', w: 320 },
          { id: 'acl', x: 1200, y: 690, icon: 'lock', label: 'Permission bypass', sub: 'retrieval ignores access', k: 'control', w: 320 },
          { id: 'inv', x: 700, y: 690, icon: 'vector', label: 'Embedding inversion', sub: 'vectors leak their text', k: 'model', w: 330 },
          { id: 'cit', x: 230, y: 690, icon: 'book', label: 'Citation spoofing', sub: 'false authority', k: 'neutral', w: 300 } ],
        edges: [{ from: 'src', to: 'rank', k: 'threat' }, { from: 'rank', to: 'inj', k: 'human' }, { from: 'inj', to: 'acl', k: 'data' }, { from: 'acl', to: 'inv', k: 'control' }, { from: 'inv', to: 'cit', k: 'model' }],
        steps: [
          { show: 'src', hi: 'src', mark: { src: 'alert' } },
          { show: 'rank src-rank', flow: 'src-rank', hi: 'rank' },
          { show: 'inj rank-inj', flow: 'rank-inj', hi: 'inj' },
          { show: 'acl inj-acl', flow: 'inj-acl', hi: 'acl' },
          { show: 'inv acl-inv', flow: 'acl-inv', hi: 'inv' },
          { show: 'cit inv-cit', flow: 'inv-cit', hi: 'cit' } ],
        say: 'RAG systems add six specific attacks. Knowledge poisoning: research presented in 2025, called PoisonedRAG, showed that five crafted documents per target question, hidden among millions, could steer answers about ninety per cent of the time. | Retrieval manipulation: documents written to rank first for common queries. | Injection carriers: retrieved documents that contain instructions for the model. | Permission bypass: retrieval that ignores document access controls, exposing content users shouldn’t see. | Embedding inversion: vectors that leak much of the text they were made from. | And citation spoofing: planted sources that lend false authority to an answer.' },
      { t: 'summary', items: ['GenAI mixes instructions and data, and generates its outputs', 'Injection, disclosure, output handling, package hallucination, misinformation', 'RAG: poisoning, rank manipulation, carriers, permission bypass, inversion', 'A few crafted documents can steer a large knowledge base'],
        say: 'To recap. | Generative AI mixes instructions and data in one channel, and generates outputs that may be executed downstream. | Key threats include prompt injection, sensitive data disclosure, improper output handling, package hallucination and misinformation. | RAG adds knowledge poisoning, retrieval manipulation, injection carriers, permission bypass, embedding inversion and citation spoofing. | And remember that a handful of crafted documents can steer answers from a very large knowledge base.' } ] },
    { type: 'text', md: `### The OWASP Top 10 for LLM Applications (2025)
| ID | Risk | In brief |
|---|---|---|
| LLM01 | Prompt Injection | Inputs, direct or indirect, alter the model’s behaviour or output |
| LLM02 | Sensitive Information Disclosure | Personal data, secrets or confidential data exposed through outputs |
| LLM03 | Supply Chain | Compromised models, datasets, packages and platforms (Module 6.3) |
| LLM04 | Data and Model Poisoning | Manipulated pre-training, fine-tuning or embedding data |
| LLM05 | Improper Output Handling | Outputs passed to other systems without validation |
| LLM06 | Excessive Agency | Too much functionality, permission or autonomy (Section 5) |
| LLM07 | System Prompt Leakage | Instructions or secrets in system prompts exposed |
| LLM08 | Vector and Embedding Weaknesses | Weaknesses in how embeddings are generated, stored or retrieved |
| LLM09 | Misinformation | False or misleading outputs relied upon |
| LLM10 | Unbounded Consumption | Excessive use causing denial of service or cost (Section 6) |

### RAG-specific threats
- **Knowledge poisoning:** PoisonedRAG (USENIX Security 2025) injected five malicious texts per target question into knowledge bases of millions of texts and achieved around 90% attack success; the existing defences it tested were insufficient.
- **Retrieval manipulation:** content optimised to be retrieved, including hidden text and keyword stuffing.
- **Indirect injection:** retrieved documents carrying instructions (Module 5.3).
- **Permission bypass and cross-tenant leakage:** retrieval must enforce the user’s permissions **before** content reaches the model (Module 4.1).
- **Embedding inversion:** embeddings can reveal much of their source text, so they deserve the same protection (Module 5.2).
- **Stale or tampered indexes:** outdated content and unlogged changes (Module 5.3).

### Package hallucination
Code assistants sometimes recommend packages that don’t exist. Research has found that hallucinated names recur across prompts, so attackers can predict and register them ("slopsquatting"). In 2024, a researcher who uploaded an empty package under a name models kept hallucinating saw it downloaded thousands of times. Controls: verify packages exist and are established, use internal mirrors with allow-lists, and scan dependencies (Module 6.3).` },
    { type: 'match', title: 'Which OWASP LLM risk is this?', pairs: [
      ['Generated SQL is run against the database without validation', 'LLM05 Improper Output Handling'],
      ['A user extracts the assistant’s instructions, which contain an API key', 'LLM07 System Prompt Leakage'],
      ['Retrieval returns documents from another customer’s tenant', 'LLM08 Vector and Embedding Weaknesses'],
      ['A fine-tuning dataset includes planted examples that change behaviour', 'LLM04 Data and Model Poisoning'],
      ['Staff act on a confidently wrong legal answer from an assistant', 'LLM09 Misinformation'] ] },
    { type: 'callout', kind: 'exam', title: 'GenAI threat questions', md: `Know the **OWASP Top 10 for LLM Applications (2025)** by name and example. For RAG, remember that **a few poisoned documents can be enough**, that permissions must be enforced **before retrieval results reach the model**, and that **embeddings are sensitive**. Package hallucination is a supply chain risk: **verify before installing**.` },
    { type: 'check', q: { q: 'A RAG assistant indexes every document in a shared drive, then filters out restricted documents from its answers after the model has generated them. What is the MAIN weakness?', o: ['Indexing every document makes retrieval slower than it needs to be', 'Restricted content has already reached the model, so it can leak in outputs', 'Shared drives can’t legally be used as sources for retrieval systems', 'Filtering answers afterwards uses too many tokens for each request'], a: 1, b: 4,
      why: 'Permissions must be enforced before retrieval results reach the model. Once restricted content is in the context, output filtering is unreliable, and the model may paraphrase or summarise it. Speed, legality and token cost aren’t the main issue.' } }
  ]
};
