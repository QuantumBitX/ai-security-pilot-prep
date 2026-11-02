/* 1.2 · Section 3: embeddings, context windows and vector databases */
module.exports = {
  title: 'Embeddings, context windows and vector databases', covers: [7, 9],
  blocks: [
    { type: 'video', title: 'Meaning as numbers', kicker: 'Module 1.2 · Video 3 of 7', scenes: [
      { t: 'title', kicker: 'Module 1.2 · Generative AI', title: 'Meaning as numbers', sub: 'Embeddings, context windows and vector databases', icon: 'vector',
        say: 'To search by meaning, and to feed models the right information, AI systems turn text into numbers. | This video explains embeddings, the context window that limits what a model can see, and the vector databases that store and search embeddings.' },
      { t: 'vector', title: 'An embedding space', seed: 31,
        clusters: [
          { label: 'Network access', k: 'data', cx: 0.25, cy: 0.32, n: 11, sp: 0.06 },
          { label: 'Expenses and payments', k: 'human', cx: 0.72, cy: 0.3, n: 11, sp: 0.06 },
          { label: 'HR policies', k: 'model', cx: 0.5, cy: 0.76, n: 11, sp: 0.06, ly: 0.97 } ],
        query: { x: 0.33, y: 0.42, label: '“How do I fix my VPN login?”', k: 3 },
        notes: [{ h: 'Text becomes a point', d: 'An embedding model maps each passage to a vector with hundreds or thousands of dimensions.' }, { h: 'Meaning clusters', d: 'Passages about similar things land near each other, even with no shared words.' }, { h: 'A question is a point too', d: 'The user’s question is embedded with the same model.' }, { h: 'Nearest neighbours', d: 'The closest passages are the most relevant. This is semantic search.', k: 'human' }],
        steps: ['points', 'labels', 'query', 'knn'],
        say: 'An embedding turns a piece of text into a list of numbers, a point in a space with hundreds or thousands of dimensions. | Texts with similar meaning land close together, even when they share no words at all. Here, passages about network access, expenses and HR policy form their own neighbourhoods. | A question becomes a point too, embedded with the same model. | The passages nearest to it are the most relevant. That is semantic search, and it is the engine inside retrieval-augmented generation.' },
      { t: 'stat', kicker: 'Measuring closeness', big: 'Cosine similarity', def: 'Compares the direction of two vectors. Close to 1 means very similar meaning; close to 0 means unrelated.',
        ex: '“I can’t sign in” and “reset my password” score highly, though they share no words.',
        say: 'Closeness is usually measured with cosine similarity. | It compares the direction of two vectors. A score near one means very similar meaning, and a score near zero means unrelated. | So, I can not sign in, and reset my password, score highly, even though they share no words. Keyword search would miss that connection.' },
      { t: 'layers', title: 'What fills the context window',
        layers: [
          { icon: 'gear', label: 'System instructions', sub: 'set by the developer', k: 'control' },
          { icon: 'chat', label: 'Conversation history', sub: 'earlier turns', k: 'neutral' },
          { icon: 'doc', label: 'Retrieved documents', sub: 'from search or a knowledge base', k: 'data' },
          { icon: 'tool', label: 'Tool and API results', sub: 'from systems the model calls', k: 'data' },
          { icon: 'user', label: 'The user’s message', sub: 'the current request', k: 'human' },
          { icon: 'text', label: 'Room for the answer', sub: 'output shares the same window', k: 'model' } ],
        ann: [
          { h: 'System instructions', d: 'Usually trusted, but a prompt is guidance to the model, not an enforced control.' },
          { h: 'Conversation history', d: 'Grows with every exchange, so it must be trimmed or summarised.' },
          { h: 'Retrieved documents', threats: ['May contain hidden instructions or stale facts'], d: 'Treat as untrusted unless the source is verified.' },
          { h: 'Tool and API results', threats: ['Content from systems the model doesn’t control'] },
          { h: 'The user’s message', d: 'Untrusted input by definition.' },
          { h: 'Room for the answer', d: 'Output tokens count against the same limit, so leave space.' } ],
        intro: 'Everything the model considers must fit in one window, and it all mixes together as tokens.',
        say: 'The context window is everything the model can consider in one request, and several things compete for it. | System instructions from the developer usually come first. They are trusted, but a prompt is guidance, not an enforced control. | The conversation history grows with every exchange, so it has to be trimmed or summarised. | Retrieved documents bring in knowledge, and they can also bring stale facts or hidden instructions. | Tool and API results carry content from systems the model does not control. | The user’s message is untrusted input by definition. | And the answer itself must fit in the same window, so applications leave room for it.' },
      { t: 'chart', title: 'Position in the context matters', kind: 'line', x: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'], yMin: 40, yMax: 90, ticks: 5, unit: '%', yLabel: 'Illustrative accuracy by where the key passage sits',
        series: [{ n: 'Accuracy', k: 'model', v: [80, 71, 63, 57, 61, 69, 78] }],
        annot: [{ x: 3, text: 'The middle is easiest to miss', k: 'human' }],
        notes: [{ h: 'Long isn’t the same as perfect', d: 'A model can hold a long context without using all of it equally well.' }, { h: 'Lost in the middle', d: 'Research found information at the start and end is used more reliably than information in the middle.' }, { h: 'Design for it', d: 'Put key instructions and evidence where they count, and retrieve less but better.', k: 'control' }],
        steps: [{}, { s: [0] }, { a: [0] }],
        say: 'Bigger context windows help, but a model does not use every part of a long context equally well. | Research has found that models use information at the beginning and end of a long context more reliably than information buried in the middle. This chart shows the typical shape. | So good systems retrieve less, but better, and place the most important instructions and evidence where they count.' },
      { t: 'flow', title: 'Inside a vector database',
        nodes: [
          { id: 'docs', x: 230, y: 330, icon: 'doc', label: 'Documents', sub: 'policies, tickets, wikis', k: 'data', w: 270 },
          { id: 'chunk', x: 630, y: 330, icon: 'split', label: 'Chunk and embed', k: 'neutral', w: 270 },
          { id: 'store', x: 1030, y: 485, icon: 'database', label: 'Vector database', sub: 'vectors, text and metadata', k: 'data', w: 290 },
          { id: 'q', x: 230, y: 650, icon: 'user', label: 'Question', k: 'human', w: 240 },
          { id: 'qe', x: 630, y: 650, icon: 'vector', label: 'Embed the question', k: 'neutral', w: 280 },
          { id: 'res', x: 1385, y: 485, icon: 'list', label: 'Top matches', k: 'model', w: 220 } ],
        edges: [{ from: 'docs', to: 'chunk', k: 'data' }, { from: 'chunk', to: 'store', k: 'data' }, { from: 'q', to: 'qe', k: 'human' }, { from: 'qe', to: 'store', label: 'similarity search', k: 'human', lx: -70, ly: 26 }, { from: 'store', to: 'res', k: 'model' }],
        steps: [{}, { show: 'docs chunk docs-chunk', flow: 'docs-chunk' }, { show: 'store chunk-store', flow: 'chunk-store', hi: 'store' }, { show: 'q qe q-qe', flow: 'q-qe' }, { show: 'qe-store', flow: 'qe-store' }, { show: 'res store-res', flow: 'store-res', hi: 'res', note: { x: 1330, y: 640, w: 340, text: 'Apply the user’s permissions here', k: 'control' } }],
        say: 'A vector database is built for exactly this kind of search. | Documents are split into chunks, and each chunk is converted into an embedding. | The database stores the vectors alongside the original text and metadata, such as source, owner and classification. | When a question arrives, it is embedded with the same model. | The database finds the stored vectors nearest to it, using fast approximate search so it can scale to millions of chunks. | It returns the top matches. This is the point where access control belongs: a user should only ever get back chunks they are allowed to see.' },
      { t: 'bullets', title: 'Securing vector stores', layout: 'grid', cols: 2, items: [
          { icon: 'filter', h: 'Permission-aware retrieval', d: 'Filter every query by what the user may see', k: 'control' },
          { icon: 'split', h: 'Tenant isolation', d: 'Separate indexes or namespaces per tenant', k: 'control' },
          { icon: 'lock', h: 'Embeddings are sensitive', d: 'They can be inverted to recover much of the text', k: 'data' },
          { icon: 'shieldcheck', h: 'Index integrity', d: 'Control what gets in; poisoned entries poison answers', k: 'threat' } ],
        say: 'Vector stores need the same care as any database, plus some new thinking. | Retrieval must be permission-aware, filtering every query by what that user is allowed to see. | Multi-tenant systems need hard isolation, with separate indexes or namespaces, so one customer’s data never surfaces for another. | Embeddings themselves are sensitive. Research has shown they can be inverted to recover much of the original text, so encrypt and restrict them like the source data. | And control what gets into the index, because a poisoned entry will be retrieved and trusted like any other.' },
      { t: 'summary', items: [
          'Embeddings map meaning to vectors; similar meaning sits close together',
          'Cosine similarity measures closeness; it powers semantic search',
          'The context window holds instructions, history, documents, tools, input and output',
          'Vector stores need permission-aware retrieval, isolation and integrity controls' ],
        say: 'To recap. | Embeddings map meaning to vectors, so similar meaning sits close together. | Cosine similarity measures that closeness, and powers semantic search. | The context window must hold instructions, history, documents, tool results, the user’s input and the answer. | And vector stores need permission-aware retrieval, isolation and integrity controls.' }
    ] },
    { type: 'text', md: `### Embeddings

An **embedding** is a vector, a list of numbers, that represents the meaning of a piece of content. An **embedding model** is trained so that items with similar meaning produce vectors that point in similar directions. Text embeddings typically have hundreds to a few thousand dimensions, and images, audio and code can be embedded too, sometimes into a shared space so that a picture and its caption land close together.

Similarity between embeddings is measured with:

- **Cosine similarity**, the cosine of the angle between two vectors: about 1 for the same meaning, about 0 for unrelated. It is the most common choice.
- **Dot product**, which also accounts for vector length.
- **Euclidean distance**, the straight-line distance between points.

Embeddings power **semantic search** (finding passages by meaning rather than keywords), **clustering**, **deduplication**, **classification**, **recommendation** and **anomaly detection**, as well as retrieval-augmented generation. One practical rule: the same embedding model must be used to index documents and to embed queries. Vectors from different models live in different spaces and can’t be compared, so changing the embedding model means re-indexing.

Embeddings feel abstract, but they are derived from the source data and carry much of its information. Researchers have shown that text can be substantially reconstructed from its embeddings, a technique called **embedding inversion**. Treat a vector store with the same classification as the documents it was built from.

### Context windows

The **context window** is the maximum number of tokens a model can process in one request, counting both input and output. Windows have grown from a few thousand tokens in early models to hundreds of thousands, and in some models more than a million.

A larger window lets a model consider whole documents or long conversations, but it isn’t free:

- **Cost and latency** rise with the number of tokens processed, and attention computation grows faster than linearly with length.
- **Memory** for the key-value cache grows with context length and the number of concurrent users (Module 1.1).
- **Quality** can drop. Research describing models as getting "lost in the middle" found that information placed in the middle of a long context is used less reliably than information at the beginning or end.
- **Attack surface** grows. More context means more places for misleading or malicious content to hide.

Because of this, putting *everything* into the context is rarely the best design. Retrieving a small number of highly relevant passages often gives better, cheaper and safer results than stuffing the window. That is the case for retrieval-augmented generation, covered in Section 5.` },
    { type: 'tabs', title: 'Vector databases in practice', items: [
      ['What they store', `Each record holds a **vector**, the **original chunk** of text (or a reference to it), and **metadata** such as source document, owner, sensitivity label, creation date and tenant. Metadata is what makes access control and freshness rules possible at query time.`],
      ['How they search', `Exact nearest-neighbour search compares the query with every vector, which is too slow at scale. Vector databases use **approximate nearest neighbour (ANN)** indexes, such as HNSW graphs or inverted-file indexes, trading a little recall for large speed gains. **Hybrid search** combines vector similarity with keyword matching, and a **re-ranker** can re-score the top results for precision.`],
      ['Where you find them', `Dedicated vector databases, vector extensions to existing databases (such as a PostgreSQL extension), and vector features in search engines and cloud platforms. The security questions are the same whichever you use.`],
      ['Security questions to ask', `Who can query it, and are results filtered per user? Are tenants isolated? Is data encrypted at rest and in transit? Who can write to it, and how is new content validated? Are queries and access logged? What happens to vectors when a source document is deleted or its permissions change?`] ] },
    { type: 'table', title: 'Vector and embedding weaknesses (OWASP LLM08) and their controls', head: ['Weakness', 'What goes wrong', 'Control'], rows: [
      ['Unauthorised access', 'Retrieval returns chunks the user isn’t entitled to see', 'Enforce document permissions as metadata filters on every query'],
      ['Cross-tenant leakage', 'One customer’s data appears in another’s answers', 'Separate indexes or namespaces; test isolation'],
      ['Embedding inversion', 'Vectors are used to reconstruct sensitive text', 'Encrypt, restrict access, classify vectors like source data'],
      ['Data poisoning', 'Malicious or false content is indexed and retrieved', 'Validate and vet sources; control write access; monitor changes'],
      ['Stale permissions', 'Deleted or re-permissioned documents remain retrievable', 'Sync deletions and permission changes into the index'] ] },
    { type: 'flip', title: 'Embedding and retrieval terms', cards: [
      ['Embedding', 'A vector of numbers representing the meaning of content, produced by an embedding model.'],
      ['Cosine similarity', 'A measure of how closely two vectors point in the same direction; about 1 means very similar.'],
      ['Semantic search', 'Finding content by meaning, using embeddings, rather than by matching keywords.'],
      ['Chunking', 'Splitting documents into passages before embedding, so retrieval returns focused pieces.'],
      ['Approximate nearest neighbour (ANN)', 'Index techniques that find close vectors quickly at scale, trading a little accuracy for speed.'],
      ['Embedding inversion', 'Reconstructing original text from its embeddings, showing that vectors are sensitive data.'] ] },
    { type: 'callout', kind: 'exam', title: 'Where access control goes in retrieval', md: `If a question asks how to stop a retrieval system exposing documents to the wrong people, the strongest answer enforces permissions **at retrieval time**, filtering results by the requesting user’s entitlements, rather than relying on instructions in the prompt or on the model to withhold information. The model can’t be trusted to keep a secret it has already been shown.` },
    { type: 'scenario', title: 'The leaky knowledge base', md: `An internal assistant answers staff questions using a vector database built from the company’s document management system. A junior analyst asks about upcoming restructuring and receives details from a confidential board paper. In the document system, that paper is restricted to executives.`,
      q: { q: 'What is the MOST likely root cause?', o: ['The embedding model is too small to separate confidential from public documents', 'Retrieval does not enforce the source system’s document-level access permissions', 'The context window is too short, so the model loses track of its access rules', 'The model’s temperature is set too high, making it reveal more than intended'], a: 1, b: 9,
        why: 'The index holds restricted content, and retrieval returned it to someone without access. Permissions from the source system must travel into the index as metadata and be applied as filters on every query.' } }
  ]
};
