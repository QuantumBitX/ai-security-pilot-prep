/* 3.1 · Section 1: data ownership roles; sovereignty and cross-border residency */
module.exports = {
  title: 'Data ownership roles, sovereignty and residency', covers: [1, 2],
  blocks: [
    { type: 'video', title: 'Who owns the data, and where may it go?', kicker: 'Module 3.1 · Video 1 of 4', scenes: [
      { t: 'title', kicker: 'Module 3.1 · Data governance', title: 'Who owns the data, and where may it go?', sub: 'Ownership roles, controllers and processors, sovereignty and residency', icon: 'id',
        say: 'Every dataset that feeds an AI system needs someone accountable for it, and a clear answer to where it may be stored and processed. | This video covers the data ownership roles you must know, how controller and processor roles apply to AI, and the difference between sovereignty, residency and localisation.' },
      { t: 'bullets', title: 'Data roles', layout: 'grid', cols: 2, items: [
          { icon: 'id', h: 'Information (data) owner', d: 'Accountable: sets classification, approves access and use', k: 'human' },
          { icon: 'pen', h: 'Data steward', d: 'Day-to-day quality, metadata and standards', k: 'data' },
          { icon: 'server', h: 'Data custodian', d: 'Operates storage, backups and technical controls', k: 'neutral' },
          { icon: 'gavel', h: 'Controller', d: 'Decides the purposes and means of processing', k: 'model' },
          { icon: 'gear', h: 'Processor', d: 'Processes personal data on the controller’s behalf', k: 'control' },
          { icon: 'user', h: 'Data subject', d: 'The person the data is about', k: 'threat' } ],
        say: 'Six roles appear again and again. | The information owner, or data owner, is accountable for a dataset. They decide its classification and approve who may access it and for what. | The data steward looks after it day to day: quality, metadata and standards. | The data custodian operates the storage, backups and technical controls, usually in IT or a platform team. | Under privacy law, the controller decides the purposes and means of processing personal data. | The processor processes personal data on the controller’s behalf, following its instructions. | And the data subject is the person the data is about.' },
      { t: 'compare', title: 'Controller or processor in AI?', labels: ['Decides purpose', 'Key duties', 'AI example'],
        cols: [{ h: 'Controller', icon: 'gavel', k: 'model' }, { h: 'Processor', icon: 'gear', k: 'control' }],
        rows: [
          ['Yes: why and how data is processed', 'No: acts only on instructions'],
          ['Lawful basis, DPIA, rights, transparency', 'Security, confidentiality, assist, notify breaches'],
          ['A bank running an AI complaints assistant', 'A model provider that doesn’t use the data for itself'] ],
        say: 'Controller and processor roles apply to AI just as to any other processing. | The controller decides why and how personal data is processed. The processor acts only on the controller’s documented instructions. | The controller carries the main duties: lawful basis, impact assessments, individuals’ rights and transparency. The processor must keep data secure and confidential, assist the controller, and notify it of breaches. | A bank running an AI complaints assistant is the controller. A model provider that processes prompts only to serve the bank is its processor. But if the provider also uses those prompts to train its own models, it is deciding a purpose of its own, and becomes a controller for that processing.' },
      { t: 'bullets', title: 'Ownership questions AI raises', items: [
          { icon: 'database', h: 'Training data', d: 'Who owns, and may approve, each source?', k: 'data' },
          { icon: 'vector', h: 'Derived data', d: 'Who owns embeddings, features and labels?', k: 'model' },
          { icon: 'doc', h: 'Outputs', d: 'Who owns, checks and retains what the model produces?', k: 'human' },
          { icon: 'branch', h: 'New uses', d: 'Who approves reusing data for a new AI purpose?', k: 'threat' } ],
        say: 'AI raises ownership questions that traditional governance often leaves open. | Training data: who owns each source, and who may approve its use for training? | Derived data: who owns the embeddings, features and labels created from source data? They usually inherit the source’s classification and owner. | Outputs: who owns, checks and retains what the model produces? | And new uses: who approves reusing existing data for a new AI purpose? Purpose changes are where many privacy breaches begin.' },
      { t: 'layers', title: 'Sovereignty, residency and localisation',
        layers: [
          { icon: 'gavel', label: 'Data sovereignty', sub: 'Data is subject to the laws of the country where it is located or controlled', k: 'model' },
          { icon: 'globe', label: 'Data residency', sub: 'Where data is stored and processed: a policy or contractual choice', k: 'data' },
          { icon: 'lock', label: 'Data localisation', sub: 'A legal requirement that data stays within a country’s borders', k: 'threat' } ],
        say: 'Three terms are easily confused. | Data sovereignty means data is subject to the laws of the country where it is located, or of the country whose authorities can compel access to it. | Data residency is where data is physically stored and processed. It is usually a business, policy or contractual choice. | And data localisation is a legal requirement that certain data must stay within a country’s borders. Residency choices are often made to satisfy sovereignty concerns and localisation laws.' },
      { t: 'bullets', title: 'Cross-border questions for AI', layout: 'grid', cols: 2, items: [
          { icon: 'chat', h: 'Where is inference?', d: 'Prompts may be processed in another region', k: 'data' },
          { icon: 'gpu', h: 'Where is training?', d: 'Datasets move to wherever the compute is', k: 'model' },
          { icon: 'model', h: 'Where are the weights?', d: 'Models trained on regulated data may need to stay put', k: 'threat' },
          { icon: 'users', h: 'Who has remote access?', d: 'Support staff abroad can count as a transfer', k: 'human' },
          { icon: 'building', h: 'Which sub-processors?', d: 'Each may add another country', k: 'neutral' },
          { icon: 'doc', h: 'Which legal mechanism?', d: 'Adequacy, contractual clauses or binding rules', k: 'control' } ],
        say: 'AI creates new cross-border questions. | Where does inference happen? Some services route prompts to whichever region has capacity. | Where does training happen? Datasets tend to move to wherever the compute is. | Where are the model weights? A model trained on regulated data may itself need to stay within certain borders. | Who has remote access? Support or engineering staff in another country can count as a transfer. | Which sub-processors are involved? Each can add another country. | And which legal mechanism covers any transfer of personal data, such as an adequacy decision, standard contractual clauses or binding corporate rules?' },
      { t: 'summary', items: ['Owner accountable; steward manages; custodian operates', 'Controller decides purpose; processor follows instructions', 'Using customer data for your own training makes you a controller', 'Sovereignty is legal reach; residency is location; localisation is a mandate'],
        say: 'To recap. | The data owner is accountable, the steward manages day to day, and the custodian operates the technical controls. | The controller decides purposes and means; the processor follows instructions. | A provider that uses customer data to train its own models becomes a controller for that purpose. | And sovereignty is about legal reach, residency about location, and localisation about legal mandates to keep data in-country.' } ] },
    { type: 'text', md: `### Data ownership roles
| Role | Responsibilities | In AI programmes |
|---|---|---|
| **Information owner (data owner)** | Accountable for a dataset: classification, permitted uses, access approval, retention | Approves use of data for training, fine-tuning, evaluation and retrieval; accountable for derived data |
| **Data steward** | Day-to-day management: quality, definitions, metadata, standards | Maintains datasheets, quality checks, lineage metadata and labels |
| **Data custodian** | Technical operation: storage, backups, encryption, access enforcement | Operates data lakes, feature stores, vector databases and training data stores |
| **Data controller** (GDPR) | Determines purposes and means of processing personal data | The organisation deploying the AI system, or any party using data for its own purposes |
| **Data processor** (GDPR) | Processes personal data on behalf of, and on the instructions of, a controller | Model API providers, annotation vendors, hosting providers acting only on instructions |
| **Joint controllers** | Two or more parties jointly determine purposes and means | Partners co-developing a model on pooled data |
| **Data subject** | The identified or identifiable person | Customers, employees, patients and members of the public in datasets |

Two principles keep this workable:
- **Every dataset, derived dataset and model has a named owner.** Derived artefacts such as embeddings, features, labels and synthetic data usually inherit the classification and ownership of their source unless the owner decides otherwise.
- **Purpose changes need the owner’s approval** (and often a fresh privacy assessment). Reusing customer service transcripts to train a model is a new purpose, even if the data never leaves the organisation.

### Controllers and processors in AI
A provider is a **processor** when it processes personal data only to deliver the service on the customer’s documented instructions. If it uses customer data for its own purposes, such as **training or improving its models**, it acts as a **controller** for that processing and needs its own lawful basis. This is why enterprise AI contracts commit providers not to train on customer data, and why the role analysis must be documented in the **data processing agreement** (GDPR Article 28), which must cover subject matter, duration, purpose, data types, security measures, sub-processors and assistance with rights and breaches.

### Sovereignty, residency and localisation
- **Data sovereignty:** data is subject to the laws of the jurisdiction where it resides and, for some laws, of the jurisdiction of the company that controls it, wherever it is stored. Concerns about foreign government access drive demand for **sovereign cloud** and **sovereign AI** offerings, where data, models and operations stay under local control.
- **Data residency:** the geographic location where data is stored and processed, chosen to meet legal, contractual or customer requirements.
- **Data localisation:** laws requiring certain data, such as health, financial, government or “important” data, to stay within national borders, or restricting its export.

### Cross-border transfers and AI
Under the GDPR (Chapter V), personal data may leave the European Economic Area only with a valid mechanism: an **adequacy decision** (such as the EU–US Data Privacy Framework for certified US companies), **standard contractual clauses** or **binding corporate rules**, supported by transfer impact assessments where needed. Other countries have their own export rules. For AI, map and control:
1. **Inference location:** where prompts and outputs are processed, including failover regions and “global” routing options.
2. **Training and fine-tuning location:** where datasets are copied for training runs.
3. **Model location:** where weights trained on regulated data are stored and served.
4. **Logging and monitoring location:** abuse-monitoring logs and telemetry may be stored elsewhere.
5. **Human access:** remote support or annotation staff in other countries.
6. **Sub-processors:** each adds locations and legal exposure.

Most major AI providers now offer regional processing and data-residency options; selecting and contractually locking them is a governance decision for the data owner, not a default to assume.`, },
    { type: 'match', title: 'Name the role', pairs: [
      ['Decides that customer emails may be used to fine-tune a support model', 'Information (data) owner'],
      ['Maintains the dataset’s datasheet and quality checks', 'Data steward'],
      ['Runs the vector database backups and encryption', 'Data custodian'],
      ['A model API provider serving prompts only on the customer’s instructions', 'Processor'],
      ['The same provider using customer prompts to train its next model', 'Controller (for that purpose)'] ] },
    { type: 'callout', kind: 'exam', title: 'Accountability vs operation', md: `The **owner** is accountable and makes decisions (classification, access, use). The **custodian** implements and operates controls on the owner’s behalf. If a question asks who should approve using a dataset for model training, the answer is the **data owner**, not the custodian, the data scientist or the security team.` },
    { type: 'check', q: { q: 'A company’s AI provider processes prompts in its EU region by default but fails over to US data centres during peak demand. The company has committed to EU-only processing for a public-sector client. What is the BEST action?', o: ['Accept the failover, since it happens rarely and the provider’s data centres meet the same security standards', 'Contractually lock processing to EU regions with no cross-region failover, verify it, and confirm sub-processors', 'Ask users to avoid peak times, and monitor how often failover to the US data centres actually occurs', 'Encrypt all prompts in transit and at rest, so that data processed in the US remains protected from any access'], a: 1, b: 2,
      why: 'Residency commitments must hold in all conditions, including failover. Contractual and technical locking, verified configuration and sub-processor review deliver them. Encryption in transit doesn’t change where data is processed.' } }
  ]
};
