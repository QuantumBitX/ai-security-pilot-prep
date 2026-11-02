/* F · Section 2: high-yield review of Domains 1 and 2 */
module.exports = {
  title: 'Domains 1 and 2: high-yield review', covers: [],
  blocks: [
    { type: 'video', title: 'Foundations and governance, revisited', kicker: 'Final review · Video 2 of 4', scenes: [
      { t: 'title', kicker: 'Final review', title: 'Foundations and governance, revisited', sub: 'High-yield review of Domains 1 and 2', icon: 'book',
        say: 'Domain one, AI concepts, is ten per cent of the exam. Domain two, governance, ethics, risk and compliance, is seventeen per cent. Together they are more than a quarter of your score, and they underpin everything else. | This video revisits the ideas from both domains that questions return to most often.' },
      { t: 'bullets', title: 'Domain 1: AI concepts', layout: 'grid', cols: 2, items: [
          { icon: 'layers', h: 'AI, ML, deep learning, GenAI', d: 'Nested fields; all deployed AI is narrow', k: 'model' },
          { icon: 'branch', h: 'Learning paradigms', d: 'Supervised, unsupervised, reinforcement', k: 'data' },
          { icon: 'network', h: 'Transformers', d: 'Attention over tokens; context windows', k: 'neutral' },
          { icon: 'search', h: 'RAG and agents', d: 'Retrieval, tools, memory, autonomy', k: 'human' },
          { icon: 'alert', h: 'Limitations', d: 'Hallucination, drift, non-determinism', k: 'threat' },
          { icon: 'chart', h: 'Metrics', d: 'Precision, recall, thresholds by cost', k: 'control' } ],
        say: 'Domain one in six ideas. | AI contains machine learning, which contains deep learning, which contains generative AI. Every deployed system is narrow AI, however general it seems. | Supervised learning needs labels; unsupervised learning finds structure without them; reinforcement learning optimises actions for reward. Language models learn by self-supervised pre-training. | Transformers use attention over tokens, within a limited context window that holds instructions, history, retrieved documents and tool results together. | RAG adds retrieval at question time; agents add tools, memory and autonomy, and with them new attack surface. | Limitations matter for security: hallucination, drift and non-determinism. | And metrics: precision measures alert quality, recall measures threats caught, and the threshold is set by the cost of each kind of error.' },
      { t: 'bullets', title: 'Domain 2: governance, ethics, risk, compliance', layout: 'grid', cols: 2, items: [
          { icon: 'gavel', h: 'Laws, frameworks, standards', d: 'EU AI Act, NIST AI RMF, ISO/IEC 42001', k: 'human' },
          { icon: 'list', h: 'Inventory and ownership', d: 'Every AI use found, owned and tiered', k: 'neutral' },
          { icon: 'scale', h: 'Responsible AI', d: 'Fairness, transparency, accountability', k: 'model' },
          { icon: 'target', h: 'Risk and impact', d: 'Tiers, registers, DPIAs, residual risk', k: 'threat' },
          { icon: 'lock', h: 'Privacy, IP, third parties', d: 'Lawful basis, licences, contracts', k: 'data' },
          { icon: 'eye', h: 'Oversight and audit', d: 'Human authority, records, assurance', k: 'control' } ],
        say: 'Domain two in six ideas. | Laws bind, frameworks guide, and standards can be certified: the EU AI Act’s risk tiers and roles, the NIST AI Risk Management Framework’s govern, map, measure and manage, and the ISO/IEC 42001 management system. | Governance starts with an inventory: every AI use found, owned and risk-tiered, with clear roles across the three lines. | Responsible AI turns principles such as fairness, transparency and accountability into requirements, controls and evidence. | Risk management tiers use cases, records risks with owners, uses impact assessments such as DPIAs, and has residual risk formally accepted. | Privacy, intellectual property and third parties: lawful basis and minimisation, licences and provenance, and contracts that make your own compliance possible. | And oversight: clear human authority to intervene and stop, good records, and independent audit.' },
      { t: 'summary', items: ['Know the AI family tree, paradigms, transformers, RAG and agents', 'Limitations and metrics drive security decisions', 'Laws, frameworks and standards: who must do what', 'Inventory, tiering, ownership, oversight and evidence'],
        say: 'To recap. | Know the AI family tree, the learning paradigms, transformers, RAG and agents. | Remember that limitations and metrics drive security decisions. | Know which laws, frameworks and standards apply, and who must do what. | And build governance on an inventory, risk tiers, named owners, human oversight and evidence.' } ] },
    { type: 'text', md: `### Domain 1: AI concepts and security fundamentals (10%)
| Topic | Remember |
|---|---|
| **AI landscape** | AI ⊃ ML ⊃ deep learning ⊃ generative AI; all deployed AI is narrow; AI is a supply chain of trust boundaries (Module 1.1) |
| **Paradigms** | Supervised (labels), unsupervised (structure), reinforcement (reward), self-supervised pre-training for LLMs |
| **Architectures** | CNNs for grids, RNNs for sequences, transformers with attention; hardware (GPUs, TPUs, memory) as attack surface |
| **GenAI** | Token-by-token generation; temperature and top-p; embeddings and vector search; context windows that mix instructions and data (Module 1.2) |
| **RAG and agents** | Retrieval adds untrusted content; agents add tools, memory and autonomy; permission-aware retrieval and least-privilege tools |
| **Limitations** | Hallucination, non-determinism, uncertainty, drift and model collapse; ground, verify and monitor (Module 1.3) |
| **Metrics** | Confusion matrix; precision versus recall; accuracy misleads on rare events; set thresholds by cost |

### Domain 2: governance, ethics, risk and compliance (17%)
| Topic | Remember |
|---|---|
| **Regulation and frameworks** | EU AI Act tiers (prohibited, high, limited, minimal, plus GPAI) and roles (provider, deployer); NIST AI RMF (Govern, Map, Measure, Manage); ISO/IEC 42001 certifiable management system (Module 2.1) |
| **Governance structures** | AI inventory, named owners, risk tiers, committee and CAIO, three lines model; policy → standard → procedure → guideline |
| **Responsible AI** | Principles → requirements → controls → evidence; fairness metrics conflict, so choosing one is a policy decision; transparency, explainability, interpretability (Module 2.2) |
| **Risk management** | Qualitative and quantitative methods (ALE = SLE × ARO); impact assessments (DPIA, FRIA); blast radius and autonomy; treat, then formally accept residual risk (Module 2.3) |
| **Privacy and IP** | Sensitive data hides in prompts, indexes, logs and weights; deletion from models is hard, so prevent; licences and copyright exceptions vary (Module 2.4) |
| **Third parties** | Due diligence by tier; contract for data use, notice, audit and exit; AIBOMs; shared responsibility (Module 2.5) |
| **Oversight and audit** | HITL approves before, HOTL supervises during; authority to intervene and stop; shadow AI discovery; documentation; internal and external audit (Module 2.6) |
| **Awareness** | Role-based training; measure behaviour, not completion; encourage reporting (Module 2.7) |` },
    { type: 'match', title: 'Which framework or concept?', pairs: [
      ['Govern, Map, Measure, Manage', 'NIST AI Risk Management Framework'],
      ['A certifiable AI management system with Annex A controls', 'ISO/IEC 42001'],
      ['Prohibited, high, limited and minimal risk tiers', 'EU AI Act'],
      ['Share of real threats that an alert rule actually catches', 'Recall'],
      ['A person approves each decision before it takes effect', 'Human in the loop (HITL)'] ] },
    { type: 'check', q: { q: 'A business unit is already using several unapproved AI tools. What should the AI governance lead do FIRST?', o: ['Block every AI tool at the network level until a full policy is written', 'Discover and inventory the AI use, then assess and tier each one', 'Buy an enterprise AI platform and require everyone to switch to it', 'Ask the business unit to stop using AI until next year’s budget'], a: 1, b: 2,
      why: 'Governance starts with visibility: discover and inventory the AI use, then assess, tier and decide. Blanket bans drive use underground, and buying a platform skips the assessment.' } }
  ]
};
