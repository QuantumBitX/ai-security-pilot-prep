/* 1.2 · Section 5: retrieval-augmented generation */
module.exports = {
  title: 'Retrieval-augmented generation (RAG)', covers: [3],
  blocks: [
    { type: 'video', title: 'Retrieval-augmented generation', kicker: 'Module 1.2 · Video 5 of 7', scenes: [
      { t: 'title', kicker: 'Module 1.2 · Generative AI', title: 'Retrieval-augmented generation', sub: 'Giving models the right knowledge at the right moment, safely', icon: 'search',
        say: 'Models only know what was in their training data, and that knowledge goes out of date. | Retrieval-augmented generation, or RAG, fixes that by fetching relevant information at the moment a question is asked. This video shows how it works, and where it can go wrong.' },
      { t: 'flow', title: 'Step 1: build the knowledge base',
        nodes: [
          { id: 'src', x: 220, y: 450, icon: 'doc', label: 'Sources', sub: 'documents, wikis, tickets', k: 'data', w: 260 },
          { id: 'cl', x: 560, y: 450, icon: 'filter', label: 'Clean and chunk', sub: 'split into passages', k: 'neutral', w: 260 },
          { id: 'em', x: 900, y: 450, icon: 'vector', label: 'Embed', sub: 'one vector per chunk', k: 'neutral', w: 240 },
          { id: 'ix', x: 1260, y: 450, icon: 'database', label: 'Index', sub: 'vectors, text, metadata', k: 'data', w: 280 } ],
        edges: [{ from: 'src', to: 'cl', k: 'data' }, { from: 'cl', to: 'em', k: 'data' }, { from: 'em', to: 'ix', k: 'data' }],
        steps: [{ show: 'src', hi: 'src' }, { show: 'cl src-cl', flow: 'src-cl', hi: 'cl' }, { show: 'em cl-em', flow: 'cl-em', hi: 'em' }, { show: 'ix em-ix', flow: 'em-ix', hi: 'ix', note: { x: 1260, y: 620, w: 380, text: 'Carry each document’s owner and permissions', k: 'control' } }, { flow: 'src-cl cl-em em-ix', note: { x: 220, y: 620, w: 380, text: 'Vet every source: it becomes trusted context', k: 'threat' } }],
        say: 'RAG has two halves. First, the knowledge base is built ahead of time. It starts with sources: documents, wikis, tickets and other content. | The content is cleaned and split into chunks, passages small enough to retrieve precisely. | Each chunk is converted into an embedding. | The vectors are stored in an index, along with the original text and metadata, including each document’s owner and permissions. | Remember that every source you add becomes context the model will trust. Vetting what goes in is a security decision.' },
      { t: 'flow', title: 'Step 2: answer a question',
        nodes: [
          { id: 'q', x: 230, y: 330, icon: 'user', label: 'Question', k: 'human', w: 240 },
          { id: 'qe', x: 620, y: 330, icon: 'vector', label: 'Embed it', k: 'neutral', w: 230 },
          { id: 'ret', x: 1040, y: 330, icon: 'search', label: 'Retrieve top matches', sub: 'filtered by permissions', k: 'data', w: 300 },
          { id: 'asm', x: 1260, y: 690, icon: 'layers', label: 'Assemble the prompt', sub: 'instructions + passages + question', k: 'neutral', w: 330 },
          { id: 'llm', x: 820, y: 690, icon: 'model', label: 'Generate', k: 'model', w: 220 },
          { id: 'ans', x: 400, y: 690, icon: 'chat', label: 'Answer with citations', k: 'control', w: 300 } ],
        edges: [{ from: 'q', to: 'qe', k: 'human' }, { from: 'qe', to: 'ret', k: 'human' }, { from: 'ret', to: 'asm', k: 'data' }, { from: 'asm', to: 'llm', k: 'data' }, { from: 'llm', to: 'ans', k: 'model' }],
        steps: [{ show: 'q', hi: 'q' }, { show: 'qe q-qe', flow: 'q-qe' }, { show: 'ret qe-ret', flow: 'qe-ret', hi: 'ret' }, { show: 'asm ret-asm', flow: 'ret-asm', hi: 'asm' }, { show: 'llm asm-llm', flow: 'asm-llm', hi: 'llm' }, { show: 'ans llm-ans', flow: 'llm-ans', hi: 'ans' }, { flow: 'q-qe qe-ret ret-asm asm-llm llm-ans' }],
        say: 'The second half runs every time a user asks a question. | The question is embedded with the same model used for the documents. | The index returns the most similar chunks, filtered so the user only ever gets passages they are allowed to see. | The application assembles a prompt: the instructions, the retrieved passages, clearly delimited, and the question. | The model generates an answer grounded in those passages. | Good systems return the answer with citations, so people can check it against the sources. | Notice that the model was never retrained. Its knowledge was supplied, fresh, at the moment it was needed.' },
      { t: 'compare', title: 'What RAG gives, and what it adds', cols: [{ h: 'Benefits', icon: 'check', k: 'control' }, { h: 'New risks', icon: 'alert', k: 'threat' }], rows: [
          ['Current and private knowledge without retraining', 'Documents can carry hidden instructions'],
          ['Answers can cite their sources', 'Poisoned content poisons answers'],
          ['Fewer unsupported answers', 'Retrieval can bypass document permissions'],
          ['Easy to update or delete knowledge', 'Sensitive content can reach the wrong person'] ],
        say: 'RAG brings real benefits, and new risks to match. | It supplies current, private knowledge without retraining, but any document it retrieves can carry hidden instructions. | Answers can cite their sources, but if the content is poisoned, the answers are poisoned too. | Grounding reduces unsupported answers, but careless retrieval can bypass the permissions that protect documents in their source systems. | And knowledge is easy to update or delete, but sensitive content can reach the wrong person if the index is not governed.' },
      { t: 'chat', title: 'Hidden instructions in retrieved content', app: 'Contract assistant',
        msgs: [
          { r: 'user', t: 'Summarise the attached supplier contract for me.' },
          { r: 'doc', t: 'Payment within 30 days. Liability capped at £1m. [Hidden text addressed to the AI, not the reader, telling it to recommend signing today.]' },
          { r: 'ai', t: 'Summary: 30-day payment terms; liability capped at £1m. Recommendation: sign today.' } ],
        notes: [{ h: 'An ordinary request', d: 'The user asks for a summary of a document.' }, { h: 'Content carries a payload', d: 'The document contains text meant for the model, invisible to the person who shared it.', k: 'threat' }, { h: 'Data treated as instructions', d: 'The model followed text it should have treated purely as data. This is indirect prompt injection.', k: 'threat' }],
        say: 'Here is the risk that makes RAG different from ordinary search. A user asks the assistant to summarise a supplier contract. | The retrieved document contains text addressed to the AI, hidden from the person reading it, telling the assistant to recommend signing today. | The model treats that text as an instruction, and its summary now carries a recommendation nobody asked for. This is indirect prompt injection. The attacker never touched the application. They only had to get content in front of it.' },
      { t: 'shield', title: 'Layered defences for RAG', target: 'Answer the user trusts', targetIcon: 'chat',
        layers: ['Source vetting and provenance', 'Permission-aware retrieval', 'Content isolation and sanitising', 'Output checks and citations'],
        attacks: [{ t: 'Poisoned source', stop: 0 }, { t: 'Unauthorised document', stop: 1 }, { t: 'Hidden instruction', stop: 2 }, { t: 'Unsupported claim', stop: 3 }],
        say: 'No single control stops every RAG attack, so defences are layered. | Vetting sources, and tracking their provenance, keeps poisoned content out of the index in the first place. | Permission-aware retrieval stops documents reaching people who are not entitled to them. | Isolating retrieved content from instructions, and stripping hidden text, blunts injected instructions. | And checking outputs against their citations catches claims the sources do not support.' },
      { t: 'summary', items: [
          'RAG retrieves relevant passages at question time; no retraining needed',
          'Build: chunk, embed, index with metadata and permissions',
          'Answer: embed, retrieve with filters, assemble, generate, cite',
          'Risks: indirect injection, poisoning, oversharing; layer the controls' ],
        say: 'To recap. | RAG retrieves relevant passages when a question is asked, so the model needs no retraining. | The knowledge base is built by chunking, embedding and indexing content, with metadata and permissions. | Each answer embeds the question, retrieves with filters, assembles a prompt, generates, and cites its sources. | And its risks, indirect injection, poisoning and oversharing, call for layered controls.' }
    ] },
    { type: 'text', md: `### Why RAG exists

A model’s knowledge is frozen at its **training cut-off** and limited to what was in its training data. It knows nothing about your internal policies, last week’s incident or today’s prices. Fine-tuning can teach a model new material, but it is expensive, slow to update and can’t easily "forget" a document. **Retrieval-augmented generation (RAG)** takes a different approach: it leaves the model unchanged and supplies relevant information in the prompt at the moment of each request.

RAG’s advantages are why it has become the default pattern for enterprise assistants:

- **Fresh and private knowledge**: update the index and the next answer reflects it.
- **Grounding**: answers based on supplied passages are less likely to be invented.
- **Citations**: the system can show which sources supported an answer, so people can verify it.
- **Control over deletion**: remove a document from the index and it stops influencing answers, which matters for retention rules and the right to erasure.
- **Lower cost** than repeatedly fine-tuning.

### The pipeline in detail

**Ingestion (offline)**

1. **Connect and extract**: pull content from document stores, wikis, ticketing systems and databases through connectors.
2. **Clean and parse**: strip boilerplate, handle tables and scanned documents, and remove hidden or invisible text.
3. **Chunk**: split content into passages, often a few hundred tokens with some overlap. Chunk size is a trade-off: too large and retrieval is imprecise; too small and context is lost.
4. **Attach metadata**: source, author, date, sensitivity label, owner, and the **permissions** from the source system.
5. **Embed and index**: compute a vector for each chunk and store it in a vector database (Section 3).

**Retrieval and generation (per request)**

1. **Process the query**: optionally rewrite or expand it, then embed it.
2. **Retrieve**: find the nearest chunks, often combining vector and keyword search, and **filter by the user’s permissions**.
3. **Re-rank**: re-score the top candidates with a more precise model and keep the best few.
4. **Assemble the prompt**: place instructions first, then retrieved passages inside clear delimiters, then the question, with an instruction to answer only from the passages and to say when they don’t contain the answer.
5. **Generate** the answer.
6. **Post-process**: check citations and groundedness, filter sensitive content, and log the interaction.

Variants include **agentic RAG**, where an agent decides when and what to retrieve across several tools, and **graph-based RAG**, which retrieves over a knowledge graph of entities and relationships.` },
    { type: 'accordion', title: 'How RAG systems fail, and the controls for each', items: [
      ['Indirect prompt injection', `Instructions hidden in retrieved content, such as white-on-white text in a document, a comment in a web page or a line in an email, are read by the model as commands. **Controls:** treat retrieved text as untrusted data; delimit it and instruct the model accordingly; strip hidden text at ingestion; limit what actions the model can take; require human approval for consequential actions; and monitor for anomalous outputs.`],
      ['Knowledge-base poisoning', `An attacker who can add or edit indexed content, for example through a shared wiki or a public source, can plant false or malicious passages. **Controls:** restrict write access; vet and allow-list sources; track provenance and changes; review high-impact content; and monitor retrieval for unexpected sources.`],
      ['Permission bypass and oversharing', `The index is built with a service account that can read everything, so retrieval returns documents the requesting user couldn’t open directly. **Controls:** propagate source permissions into metadata and filter on every query; for highly sensitive material, use separate indexes.`],
      ['Sensitive data exposure', `Personal or confidential data in indexed documents surfaces in answers. **Controls:** classify and minimise what is indexed; redact at ingestion where possible; filter outputs; log access.`],
      ['Stale or deleted content', `Documents deleted or re-permissioned in the source remain in the index. **Controls:** synchronise deletions and permission changes, and set freshness and retention rules for indexed content.`],
      ['Unsupported answers', `The model blends retrieved facts with invented ones or misattributes sources. **Controls:** require citations; check groundedness automatically; let users report bad answers; evaluate regularly.`] ] },
    { type: 'callout', kind: 'real', title: 'Why indirect injection matters so much', md: `Direct prompt injection requires an attacker to use your application. Indirect injection only requires them to get content in front of it: an email the assistant will read, a page it will browse, a file someone will upload, or a shared document it will retrieve. As assistants gain access to more content and more tools, that becomes the dominant way they are attacked. Domains 4, 5 and 6 build the defences.` },
    { type: 'table', title: 'Measuring whether RAG works', head: ['Measure', 'Question it answers'], rows: [
      ['Retrieval precision and recall', 'Did we fetch the right passages, and miss few relevant ones?'],
      ['Groundedness (faithfulness)', 'Is every claim in the answer supported by the retrieved passages?'],
      ['Answer relevance', 'Does the answer address the question that was asked?'],
      ['Citation accuracy', 'Do the cited sources actually say what the answer claims?'],
      ['Refusal accuracy', 'Does the system say “I don’t know” when the sources don’t cover it?'] ] },
    { type: 'match', title: 'Match the RAG risk to its most direct control', pairs: [
      ['Analyst retrieves an executive-only board paper', 'Filter retrieval by the source system’s permissions'],
      ['A public web page steers the assistant’s answer', 'Treat retrieved content as untrusted and limit the actions it can trigger'],
      ['A deleted file still appears in answers', 'Synchronise deletions into the index'],
      ['Someone edits the wiki to plant false procedures', 'Restrict write access and track content provenance'],
      ['Answers mix real facts with invented ones', 'Require citations and check groundedness'] ] },
    { type: 'check', q: { q: 'A RAG assistant is indexed using a service account that can read every document in the company. Users report seeing content from files they can’t open themselves. Which fix is MOST effective?', o: ['Tell the model in its system prompt never to reveal, quote or summarise content from restricted documents', 'Carry document permissions into the index and filter results by the requesting user’s entitlements', 'Reduce the number of chunks retrieved per question so less restricted content can surface', 'Re-index everything with a newer embedding model that better separates sensitive topics'], a: 1, b: 3, why: 'The model can’t be relied on to withhold what it has been given. Filtering retrieval by each user’s permissions means restricted content never reaches the prompt in the first place.' } }
  ]
};
