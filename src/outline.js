/* Course outline: transcribed from the ISC2 AI Security Pilot Exam Outline (effective 26 Oct 2026).
   KP (knowledge points) = minutes of planned study time. Total 3,600 KP = 60 hours. */
window.OUTLINE = {
  exam: { items: 160, minutes: 180, format: 'Multiple choice', centre: 'Pearson Professional Center (PPC)', language: 'English', effective: '2026-10-26' },
  totalKP: 3600,
  intro: { id: '0', title: 'Course Introduction', kp: 40 },
  final: { id: 'F', title: 'Final Review and Exam Readiness', kp: 60 },
  mocks: [
    { id: 'mock1', title: 'Mock Exam 1', kp: 180, items: 160, minutes: 180 },
    { id: 'mock2', title: 'Mock Exam 2', kp: 180, items: 160, minutes: 180 }
  ],
  domains: [
    { n: 1, title: 'AI Concepts and Security Fundamentals', short: 'AI Concepts', weight: 10, testKP: 40, modules: [
      { id: '1.1', title: 'AI Concepts and Security Fundamentals', kp: 140, bullets: [
        'AI types, evolution, and the broader AI ecosystem',
        'ML paradigms (e.g., supervised, unsupervised, reinforcement)',
        'Deep learning and evolutionary computation',
        'Neural networks (e.g., CNN, RNN, transformers)',
        'AI hardware infrastructure (e.g., GPU, TPU, memory)' ] },
      { id: '1.2', title: 'Analyze Generative AI (GenAI) and Modern Architectures', kp: 170, bullets: [
        'GenAI, language, and multi-modal models',
        'Prompt engineering concepts',
        'Retrieval-Augmented Generation (RAG)',
        'Model fine-tuning techniques (e.g., LoRA, PEFT)',
        'Autonomous systems, agents, and Agentic AI (e.g., agent-to-agent, session persistence, memory)',
        'Natural Language Processing (NLP) building blocks',
        'Embeddings and context windows',
        'Token management',
        'Vector databases' ] },
      { id: '1.3', title: 'Evaluate AI Limitations and Performance', kp: 110, bullets: [
        'Model reliability limitations (e.g., hallucinations, non-determinism, uncertainty)',
        'Lifecycle degradation (e.g., model, data, and behavioral drift)',
        'Model collapse',
        'Standard evaluation metrics and benchmarks',
        'Operational modes (e.g., Human-in-the-Loop (HITL) vs. automated execution)' ] }
    ]},
    { n: 2, title: 'AI Governance, Ethics, Risk, and Compliance', short: 'Governance & Risk', weight: 17, testKP: 40, modules: [
      { id: '2.1', title: 'Establish AI Governance, Frameworks, and Policies', kp: 75, bullets: [
        'Core AI regulations and standards (e.g., EU AI Act, NIST AI RMF, ISO/IEC 42001, GDPR)',
        'Differences between AI governance and traditional IT governance',
        'AI policies, standards, and procedures',
        'Centralized AI use-case inventories',
        'Organizational roles (e.g., Chief AI Officer, AI Champions, AI Ethics Officer)' ] },
      { id: '2.2', title: 'Apply Responsible AI Principles and Ethics', kp: 65, bullets: [
        'Core Responsible AI principles (e.g., fairness, reliability, safety, privacy, inclusiveness, transparency)',
        'Algorithmic bias mitigation and fairness across protected groups',
        'AI transparency and explainability',
        'Systemic impacts, sustainability, and societal tradeoffs of AI deployments' ] },
      { id: '2.3', title: 'Implement AI Risk Management and Assessments', kp: 75, bullets: [
        'AI-specific risk quantification and mapping',
        'Impact assessments (e.g., algorithmic risk, blast radius, autonomous actions)',
        'Use-case risk tiers based on human impact and technical complexity',
        'Risk treatments for AI components',
        'Reassessment triggers (e.g., model updates, behavioral drift, vulnerability disclosures)' ] },
      { id: '2.4', title: 'Ensure Data Privacy, Protection, and Intellectual Property (IP) Rights', kp: 65, bullets: [
        'Regulated and sensitive data types (e.g., PII, PHI, financial, export-controlled)',
        'IP, copyright compliance, and fair use of training data',
        'Risks of data derivation and regulatory contamination',
        'Data retention and deletion management',
        'Consent mechanisms for data collection and public data usage' ] },
      { id: '2.5', title: 'Manage Third-Party and AI Supply Chain Risks', kp: 65, bullets: [
        'Third-party AI due diligence and provider security controls',
        'Procurement controls, security Service-Level Agreements (SLA), and incident notification rights',
        'AI component dependency tracking (e.g., SBOM, AIBOM)',
        'Shared responsibility models',
        'Data center security considerations (e.g., Trusted Execution Environments, confidential computing)' ] },
      { id: '2.6', title: 'Enforce Accountability, Human Oversight, and Auditing', kp: 70, bullets: [
        'Human-in-the-Loop (HITL) and Human-on-the-Loop (HOTL) oversight',
        'Intervention, override, and sign-off authorities',
        'Shadow AI detection and management',
        'Governance artifacts (e.g., model documentation, decision logs, exception records)',
        'AI interaction labeling (e.g., synthetic content, deepfake disclosure)',
        'Internal and external audits for compliance, bias, drift, and business outcomes' ] },
      { id: '2.7', title: 'Develop AI Security Education and Awareness', kp: 40, bullets: [
        'Skills assessments and gap analyses for AI operator competence',
        'Role-based AI security and ethics training programs',
        'Metrics for training program effectiveness and risk-aware culture' ] }
    ]},
    { n: 3, title: 'AI Data Management, Privacy, and Model Security', short: 'Data & Model Security', weight: 19, testKP: 40, modules: [
      { id: '3.1', title: 'Establish AI Data Governance, Lineage, and Accountability', kp: 70, bullets: [
        'Data ownership roles (e.g., information owner, steward, controller)',
        'Data sovereignty and cross-border residency requirements',
        'Data classification, tagging, and sensitive data impact assessments',
        'Data provenance, lineage, and sourcing (e.g., real vs. synthetic)',
        'Chain-of-custody controls',
        'AI data lifecycle (e.g., collection, validation, transformation, retention, archiving, deletion)' ] },
      { id: '3.2', title: 'Implement Data Privacy and Compliance Controls', kp: 110, bullets: [
        'Privacy by Design principles (e.g., consent, purpose limitation, lawful usage, data minimization)',
        'Data protection techniques (e.g., tokenization, anonymization, differential privacy, masking, noise injection)',
        'Global privacy regulations (e.g., GDPR, HIPAA, PCI DSS)',
        'AI-specific privacy challenges (e.g., unintentional bias, right to erasure)' ] },
      { id: '3.3', title: 'Secure AI Training Data and Datasets', kp: 70, bullets: [
        'Training data integrity',
        'Mitigation of data poisoning, backdoors, and extraction threats',
        'Protection against unauthorized label modification and malicious datasets',
        'Dataset tampering and versioning',
        'Recursive training data security and synthetic data trustworthiness' ] },
      { id: '3.4', title: 'Apply Cryptographic and Data Protection Solutions', kp: 75, bullets: [
        'Data Security Posture Management (DSPM)',
        'Data Loss Prevention (DLP) and semantic filtering on AI inputs/outputs',
        'Encryption for data states (e.g., in use, in transit, at rest)',
        'Key management lifecycle (e.g., KMS, BYOK, secret management, key rotation)',
        'Purpose-based and restricted data access controls (e.g., Agentic AI data catalogs)',
        'Media sanitization on high-density AI storage (e.g., cryptographic erasure, micro-shredding)' ] },
      { id: '3.5', title: 'Manage AI Model Lifecycle and Security Governance', kp: 70, bullets: [
        'Model governance (e.g., ownership, risk classification, approval workflows)',
        'Model documentation and approved model registries (e.g., model cards)',
        'Model deployment pipeline security (e.g., validation, packaging, serving, credential management)',
        'Input/output sanitization, updates, and rollback procedures',
        'Security lifecycle monitoring (e.g., model drift, bias tracking, anomaly detection)',
        'Privacy-preserving audit trails for AI data events' ] },
      { id: '3.6', title: 'Ensure Model Confidentiality, Integrity, and Availability', kp: 70, bullets: [
        'Model confidentiality (e.g., secure model weights, algorithms, IP)',
        'Model extraction prevention',
        'Model watermarking and fingerprinting',
        'Model integrity (e.g., model signing, hashing, version control)',
        'Model availability controls (e.g., rate limiting, quota enforcement, graceful degradation)' ] },
      { id: '3.7', title: 'Assess AI Data and Model Supply Chain Risks', kp: 55, bullets: [
        'Supply chain risk assessments for third-party, open, and public datasets',
        'Provenance and authenticity verification for third-party vendors',
        'Risks associated with foundation and pre-trained models' ] }
    ]},
    { n: 4, title: 'Secure AI Architecture, Engineering, and Identity and Access Management (IAM)', short: 'Architecture & IAM', weight: 18, testKP: 40, modules: [
      { id: '4.1', title: 'Apply AI Architecture and Secure Design Principles', kp: 80, bullets: [
        'AI-specific security strategies (e.g., Zero Trust, Defense-in-Depth, Privacy-by-Design, Secure Defaults)',
        'AI threat modeling across architectural components (e.g., RAG, vector databases, inference)',
        'Architectural trade-offs (e.g., latency vs. explainability vs. cost)',
        'Build vs. buy evaluations (e.g., hosted vs. self-managed)',
        'Secure integration for tools, APIs, and plugins (e.g., Model Context Protocol (MCP), Agent-to-Agent (A2A))' ] },
      { id: '4.2', title: 'Architect Secure AI Infrastructure and Platforms', kp: 70, bullets: [
        'Hardening of cloud, on-premises, and hybrid AI deployments',
        'Isolation and sandboxing for AI training and inference workloads',
        'Availability controls against resource exhaustion (e.g., rate limiting, compute throttling)',
        'Isolated accelerator capacity',
        'Physical and environmental security (e.g., data center power, cooling, rack security, fire suppression)' ] },
      { id: '4.3', title: 'Secure Data and Model Deployment Pipelines (MLOps/LLMOps)', kp: 70, bullets: [
        'Secure CI/CD and model deployment pipelines (e.g., packaging, containerization)',
        'Integrity and confidentiality controls for data ingestion and transformation',
        'Lineage tracking for fine-tuning',
        'Validation checkpoints and pipeline gating patterns',
        'Data unlearning capabilities for trained artifacts' ] },
      { id: '4.4', title: 'Design and Implement AI Guardrails and Controls', kp: 70, bullets: [
        'AI input/output handling (e.g., prompt sanitization, content filtering, context boundary validation)',
        'Architectural guardrails for autonomous AI behavior (e.g., harness, orchestration)',
        'Functional, performance, and load testing',
        'Stress testing and exception handling validation' ] },
      { id: '4.5', title: 'Implement AI Identification and Authentication Strategies', kp: 65, bullets: [
        'Classification of human vs. non-human identities (e.g., workloads, agents, services, tools)',
        'Identity architectures for non-repudiation and verified accountability',
        'Machine-to-Machine (M2M) authentication protocols and API tokens',
        'Federated identities, Multi-Factor Authentication (MFA), and Single Sign-On (SSO)',
        'Secrets and key management for AI platforms' ] },
      { id: '4.6', title: 'Design and Enforce AI Authorization and Access Controls', kp: 70, bullets: [
        'Principle of Least Privilege (PoLP) and Separation of Duties (SoD) across AI models and agentic workflows',
        'Authorization methodologies and Just-in-Time (JIT) access (e.g., RBAC, ABAC, PBAC)',
        'Execution boundaries and API scope limitations',
        'Prevention of excessive agency, over-delegation, and lateral movement by autonomous agents' ] },
      { id: '4.7', title: 'Manage Identity Lifecycle and Auditing', kp: 55, bullets: [
        'AI identity inventories (e.g., human, non-human)',
        'Provisioning and deprovisioning transitions',
        'Periodic access reviews and Identity Security Posture Management (ISPM)',
        'Audit of AI resource utilization (e.g., token accounting, rate limits, session time-outs)' ] }
    ]},
    { n: 5, title: 'Secure AI Operations and Incident Response (IR)', short: 'Operations & IR', weight: 19, testKP: 40, modules: [
      { id: '5.1', title: 'Establish AI SecOps Foundations and Operational Readiness', kp: 65, bullets: [
        'Core security principles in AI operations (e.g., PoLP, SoD)',
        'AI operational roles and responsibilities (e.g., model owners, data owners)',
        'Release requirements (e.g., human override baselines, reject rate thresholds)',
        'Operational playbooks, runbooks, and tabletop simulations (e.g., data poisoning, model tampering)',
        'Configuration Management (CM), automated model updates, and configuration drift tracking' ] },
      { id: '5.2', title: 'Monitor, Log, and Collect AI Security Telemetry', kp: 75, bullets: [
        'AI telemetry data (e.g., prompts, completions, embeddings, tool calls, API traffic)',
        'AI event correlation across SIEM, SOAR, and threat intelligence pipelines',
        'Log integrity and evidence documentation',
        'Privacy-preserving telemetry masking',
        'Real-time monitoring of AI behavior, performance drift, and agent actions' ] },
      { id: '5.3', title: 'Detect Runtime Threats, Misuse, and Compromises', kp: 75, bullets: [
        'Runtime threat detection (e.g., inputs, prompts, retrieval chains, outputs, resource consumption)',
        'AI access and agency misuse (e.g., unauthorized identities, over-privileged agents)',
        'Secret exposure and tool execution anomalies',
        'AI asset and lifecycle integrity (e.g., data, knowledge bases, models, deployment pipelines)',
        'AI-driven security operations (e.g., UEBA, automated alert triage, threat hunting)' ] },
      { id: '5.4', title: 'Manage AI Vulnerabilities and Asset Posture', kp: 70, bullets: [
        'Model vulnerability and exposure registers',
        'Context and consequence prioritization',
        'Patch management for AI pipelines, dependencies, and open-source components',
        'Compensating controls and strict usage restrictions for legacy models',
        'Continuous AI security reviews and posture assurance metrics' ] },
      { id: '5.5', title: 'Respond to and Contain AI Security Incidents', kp: 75, bullets: [
        'AI-specific triage taxonomy (e.g., prompt injection, jailbreaking, data poisoning, model theft)',
        'Multi-disciplinary escalation paths (e.g., SecOps, MLOps, data science, legal, compliance)',
        'AI-specific containment actions (e.g., model rollback, endpoint isolation, rate limiting)',
        'Pipeline suspension and agent termination',
        'Preservation of investigative artifacts (e.g., model states, weights, configurations, dataset snapshots)' ] },
      { id: '5.6', title: 'Investigate, Eradicate, and Perform Forensics on AI Incidents', kp: 75, bullets: [
        'Attack kill chain reconstruction (e.g., data poisoning, untrusted tool outputs)',
        'Root Cause Analysis (RCA), forensics, and timeline tracking',
        'Threat actor attribution',
        'Threat eradication (e.g., data sanitization, model retraining, patching vulnerabilities)',
        'Safety regression testing prior to production reintroduction' ] },
      { id: '5.7', title: 'Execute Recovery, Business Continuity (BC), and Post-Incident Reviews', kp: 70, bullets: [
        'Recovery strategies (e.g., trusted model rollback, clean checkpoint restoration, vector-store recovery)',
        'AI circuit breakers and kill switches',
        'BC/DR plans and critical AI dependency mapping',
        'Post-incident reviews, lessons learned, and TTP register updates',
        'Secure decommissioning, disposal, and remediation (e.g., machine unlearning, model termination)' ] }
    ]},
    { n: 6, title: 'AI Threats, Testing, and Lifecycle Management', short: 'Threats & Testing', weight: 17, testKP: 40, modules: [
      { id: '6.1', title: 'Conduct AI Threat Modeling and Intelligence', kp: 115, bullets: [
        'Threat modeling methodologies for AI/ML pipelines (e.g., STRIDE, PASTA, MAESTRO)',
        'AI threat actors, objectives, and insider threats (e.g., human, non-human)',
        'Adversarial ML attacks (e.g., evasion, poisoning, model extraction, model inversion, backdoors)',
        'Threats specific to GenAI, RAG, agentic workflows, and multimodal systems',
        'Availability attacks (e.g., compute, token exhaustion)' ] },
      { id: '6.2', title: 'Manage Secure AI Development Lifecycle (AIDLC) and Change Management', kp: 70, bullets: [
        'Security integration across the AI/ML pipeline and CI/CD environments (e.g., MLOps/LLMOps)',
        'Environmental control adaptations (e.g., separation, PoLP, secure API integration)',
        'AI-specific change management (e.g., model, dataset, retrieval versioning)',
        'Staged rollouts and rollback procedures (e.g., canary deployments)' ] },
      { id: '6.3', title: 'Secure AI Supply Chain, Procurement, and Provenance', kp: 70, bullets: [
        'Third-party vendor risks, certifications, and assessment reports',
        'AI acquisition practices, data ownership, licensing, and legal/regulatory considerations',
        'Pedigree and provenance verification (e.g., cryptographic hashing, digital signatures)',
        'AI Bill of Materials (AIBOM) for hardware, software, and data dependencies' ] },
      { id: '6.4', title: 'Design and Execute AI Security Testing and Red Teaming', kp: 100, bullets: [
        'Scope, objectives, and test scenarios for AI security assessments',
        'Adversarial testing targeting GenAI, RAG, and Agentic AI architectures',
        'AI red teaming methodologies',
        'AI-assisted security tools for evaluating AI controls and novel attack paths' ] },
      { id: '6.5', title: 'Evaluate, Validate, and Report Assessment Findings', kp: 70, bullets: [
        'Triage of assessment findings (e.g., severity, exploitability, reproducibility, business impact)',
        'Differentiation between security vulnerabilities and model limitations (e.g., hallucinations)',
        'Correlation of findings against industry frameworks (e.g., MITRE ATLAS, OWASP LLM Top 10)',
        'Documentation of evidence and reproducibility steps',
        'Risk communication strategies for stakeholders (e.g., technical vs. non-technical)' ] },
      { id: '6.6', title: 'Define, Implement, and Validate Mitigations', kp: 95, bullets: [
        'Targeted mitigations (e.g., adversarial training, provenance tracking, data validation)',
        'Filtering, sandboxing, rate limiting, and watermarking',
        'Mitigation prioritization based on risk feasibility and business context',
        'Mitigation validation via regression testing',
        'Continuous monitoring for residual risks' ] }
    ]}
  ]
};
