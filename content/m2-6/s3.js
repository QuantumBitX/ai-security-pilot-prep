/* 2.6 · Section 3: governance artefacts; AI interaction labelling */
module.exports = {
  title: 'Governance artefacts and AI interaction labelling', covers: [4, 5],
  blocks: [
    { type: 'video', title: 'The paper trail, and the label', kicker: 'Module 2.6 · Video 3 of 4', scenes: [
      { t: 'title', kicker: 'Module 2.6 · Accountability and audit', title: 'The paper trail, and the label', sub: 'Governance artefacts, and telling people when AI is involved', icon: 'doc',
        say: 'Accountability needs evidence. If it isn’t written down, it didn’t happen, at least as far as an auditor or regulator is concerned. And people affected by AI deserve to know when it is involved. | This video covers the core governance artefacts, and how AI interactions and synthetic content should be labelled.' },
      { t: 'bullets', title: 'Core governance artefacts', layout: 'grid', cols: 2, items: [
          { icon: 'model', h: 'Model card', d: 'Purpose, training data, performance by group, limits', k: 'model' },
          { icon: 'layers', h: 'System documentation', d: 'The whole system: components, safeguards, oversight', k: 'data' },
          { icon: 'database', h: 'Datasheet for a dataset', d: 'Provenance, composition, collection, permitted uses', k: 'data' },
          { icon: 'audit', h: 'Assessments', d: 'Risk, impact, DPIA and test reports', k: 'human' },
          { icon: 'list', h: 'Decision logs', d: 'Who decided what, when, on what evidence', k: 'control' },
          { icon: 'flag', h: 'Exception records', d: 'Waived requirements, compensating controls, expiry', k: 'threat' } ],
        say: 'Six artefacts form the core of an AI paper trail. | A model card describes a model’s purpose, training data, performance across groups and known limitations. | System documentation describes the whole system around the model: components, safeguards and oversight. | A datasheet for a dataset records its provenance, composition, collection method and permitted uses. | Assessments include risk and impact assessments, DPIAs and test reports. | Decision logs record who decided what, when, and on what evidence, from approvals to individual overrides. | And exception records capture any policy requirement that was waived, with compensating controls and an expiry date.' },
      { t: 'compare', title: 'Decision logs and exception records', labels: ['Records', 'Must include', 'Review'],
        cols: [{ h: 'Decision log', icon: 'list', k: 'control' }, { h: 'Exception record', icon: 'flag', k: 'threat' }],
        rows: [
          ['Significant decisions about the system', 'A departure from policy or a standard'],
          ['Decision, maker, date, evidence, rationale', 'Requirement waived, reason, controls, approver, expiry'],
          ['Sampled by audit; used in investigations', 'Before expiry; tracked in a register'] ],
        say: 'Two artefacts are often confused. | A decision log records significant decisions about the system. An exception record documents a departure from policy or a standard. | A decision log entry captures the decision, who made it, when, the evidence considered and the rationale. An exception record captures which requirement was waived, why, the compensating controls, who approved it and when it expires. | Decision logs are sampled by auditors and used in investigations. Exceptions are tracked in a register and reviewed before they expire, so temporary exceptions don’t quietly become permanent.' },
      { t: 'bullets', title: 'When people must be told (EU AI Act Article 50)', items: [
          { icon: 'chat', h: 'Talking to AI', d: 'Disclose AI interaction unless it is obvious', k: 'model' },
          { icon: 'tag', h: 'Synthetic content', d: 'Providers mark outputs in machine-readable form', k: 'data' },
          { icon: 'mask', h: 'Deepfakes', d: 'Deployers disclose manipulated or generated likenesses', k: 'threat' },
          { icon: 'text', h: 'Public-interest text', d: 'Disclose AI text unless a human took editorial responsibility', k: 'human' },
          { icon: 'eye', h: 'Emotion and biometric categorisation', d: 'Inform the people exposed to it', k: 'neutral' } ],
        say: 'The EU AI Act’s transparency rules, which have applied since August twenty twenty-six, set out when people must be told. | Providers must design systems that interact with people so they know they are talking to AI, unless that is obvious. | Providers of generative systems must mark outputs in a machine-readable, detectable way. | Deployers must disclose deepfakes: images, audio or video that resemble real people, places or events. | Deployers publishing AI-generated text on matters of public interest must disclose it, unless a person reviewed it and took editorial responsibility. | And people exposed to emotion recognition or biometric categorisation must be informed.' },
      { t: 'bullets', title: 'Ways to mark synthetic content', layout: 'grid', cols: 2, items: [
          { icon: 'tag', h: 'Visible labels', d: 'Clear to people; easily cropped or removed', k: 'human' },
          { icon: 'wave', h: 'Invisible watermarks', d: 'Embedded signals; need a detector; can be degraded', k: 'model' },
          { icon: 'fingerprint', h: 'Provenance metadata', d: 'Signed history such as C2PA; often stripped', k: 'data' },
          { icon: 'search', h: 'Detection classifiers', d: 'No cooperation needed; error-prone', k: 'threat' } ],
        say: 'There are four main ways to mark synthetic content, and none is perfect on its own. | Visible labels are clear to people, but easily cropped or removed. | Invisible watermarks embed a signal in the content itself. They need a detector, and editing or compression can degrade them. | Provenance metadata, such as C2PA content credentials, records a signed history of how content was made and edited, but many platforms strip metadata. | And detection classifiers try to spot synthetic content without any cooperation from its creator, but they make errors in both directions. So combine methods: label for people, and mark for machines.' },
      { t: 'summary', items: ['Model cards, system docs, datasheets, assessments, decision logs, exceptions', 'Exceptions need compensating controls and an expiry date', 'Disclose AI interaction, deepfakes and public-interest text', 'Combine visible labels, watermarks and provenance'],
        say: 'To recap. | The core artefacts are model cards, system documentation, datasheets, assessments, decision logs and exception records. | Every exception needs compensating controls, an approver and an expiry date. | Tell people when they are interacting with AI, and disclose deepfakes and AI-generated public-interest text. | And mark synthetic content in layers: visible labels for people, watermarks and provenance metadata for machines.' } ] },
    { type: 'text', md: `### Governance artefacts
Artefacts are how an organisation **demonstrates** accountability: to auditors, regulators, customers, courts and its own staff. ISO/IEC 42001 requires documented information; the EU AI Act requires technical documentation, logs and records for high-risk systems; and every audit starts by asking for evidence.

| Artefact | Purpose | Typical contents |
|---|---|---|
| **Model card** | Transparency about a model | Intended use and out-of-scope uses, training data overview, evaluation results including performance across groups, limitations, ethical considerations |
| **System card / AI system documentation** | Transparency about the deployed system | Architecture, components and third parties, safeguards and guardrails, human oversight design, monitoring, known risks |
| **Datasheet for datasets** | Accountability for data | Motivation, composition, collection process, preprocessing, consent and licensing, recommended and prohibited uses, maintenance |
| **Risk and impact assessments** | Evidence of due diligence | Risk register entries, impact assessments, DPIAs, FRIAs, tier decisions |
| **Test and evaluation reports** | Evidence of fitness | Accuracy, robustness, bias, security and red-team results, with versions tested |
| **Decision logs** | Traceability of decisions | Design choices, approvals and sign-offs, risk acceptances, model change approvals, and records of overrides and interventions |
| **Exception records** | Control of deviations | Requirement waived, justification, compensating controls, risk owner, approver, **expiry date**, review |
| **Operational logs** | Traceability of system behaviour | Inputs, outputs, model versions, tool calls and human actions, retained according to policy (Domain 5) |

Good artefacts are **versioned** (tied to specific model and system versions), **owned** (someone keeps them current), **accessible** to those who need them, and **retained** according to legal and policy requirements. Model cards and datasheets also make excellent procurement requests (Module 2.5).

### AI interaction labelling
People have a reasonable interest, and increasingly a legal right, to know when AI is involved. Under **Article 50 of the EU AI Act** (applying from 2 August 2026):
- **Providers** must ensure systems intended to interact directly with people inform them they are interacting with AI, unless obvious from the context.
- **Providers** of systems generating synthetic audio, images, video or text must ensure outputs are **marked in a machine-readable format and detectable** as artificially generated or manipulated. Systems already on the market before 2 August 2026 had until 2 December 2026 to comply with this marking duty.
- **Deployers** of emotion recognition or biometric categorisation must inform the people exposed.
- **Deployers** must disclose **deepfakes**, with a lighter touch for evidently artistic, creative, satirical or fictional works.
- **Deployers** publishing AI-generated or manipulated **text on matters of public interest** must disclose it, unless it underwent human review and a person holds editorial responsibility.

A voluntary EU **Code of Practice on the transparency of AI-generated content**, with common labelling icons, and Commission guidelines published in July 2026, support implementation. Other jurisdictions have their own rules; China, for example, introduced mandatory labelling of AI-generated content in 2025.

### Marking techniques
| Technique | Strengths | Weaknesses |
|---|---|---|
| **Visible labels and icons** | Understandable by people; simple | Removable by cropping or editing; can be ignored |
| **Invisible watermarks** | Survive some transformations; machine-detectable | Need the right detector; can be degraded or removed by determined actors; robustness varies, especially for text |
| **Provenance metadata (C2PA content credentials)** | Cryptographically signed history of creation and edits; supports trust in authentic content too | Often stripped by platforms and screenshots; relies on adoption |
| **Detection classifiers** | Work without the creator’s cooperation | False positives and negatives; easily fooled; shouldn’t be the sole basis for accusations |

The practical answer is **layered**: label clearly for humans at the point of interaction, embed machine-readable marks and provenance where possible, log what was generated, and never rely on detection alone for consequential decisions (such as accusing a student or employee of using AI). Organisations should also protect themselves against **impersonation**: deepfake voices and videos of executives are used in fraud, so payment and access requests need out-of-band verification regardless of how convincing the request appears.`, },
    { type: 'flip', title: 'Artefact vocabulary', cards: [
      ['Model card', 'A document describing a model’s intended use, data, performance across groups and limitations.'],
      ['Datasheet for datasets', 'A document recording a dataset’s motivation, composition, collection, licensing and appropriate uses.'],
      ['Decision log', 'A record of significant decisions: what, who, when, evidence and rationale.'],
      ['Exception record', 'A documented, approved and time-limited departure from a policy or standard, with compensating controls.'],
      ['C2PA content credentials', 'An open standard for signed provenance metadata describing how content was created and edited.'],
      ['Deepfake', 'AI-generated or manipulated image, audio or video that resembles real people, objects, places or events.'] ] },
    { type: 'scenario', title: 'The permanent exception', md: `Two years ago, a team received an exception allowing its customer-facing chatbot to launch without bias testing “for three months” while a testing tool was procured. Nobody tracked the expiry. The chatbot now handles 40% of customer contacts, and the exception has never been reviewed.`,
      q: { q: 'Which control MOST directly prevents this situation?', o: ['A policy banning all exceptions to AI security requirements, with no further approvals permitted', 'An exception register with owners, compensating controls, expiry dates and review before expiry', 'A reminder in the team’s calendar asking the project lead to remember the deadline for the fix', 'Annual staff training on the exception process, refreshed whenever the AI policy is updated'], a: 1, b: 4,
        why: 'Exceptions are legitimate when controlled. A register with owners and expiry-driven review stops temporary exceptions becoming permanent, unmanaged risk. Banning exceptions would push deviations underground.' } },
    { type: 'check', q: { q: 'A company deploys a customer-service chatbot in the EU. Under Article 50 of the AI Act, what must happen?', o: ['Nothing, because chatbots are classed as minimal risk and have no specific obligations', 'People must be told they are interacting with AI, unless that is obvious from the context', 'The chatbot must be registered in the EU database as a high-risk system before launch', 'Every response must be approved by a trained human before it is sent to the customer'], a: 1, b: 5,
      why: 'Article 50 requires systems that interact directly with people to disclose that they are AI unless it is obvious. It is a transparency duty, not a high-risk classification.' } }
  ]
};
