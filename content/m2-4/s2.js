/* 2.4 · Section 2: IP, copyright compliance and fair use of training data */
module.exports = {
  title: 'Intellectual property, copyright and training data', covers: [2],
  blocks: [
    { type: 'video', title: 'Who owns what goes in and what comes out?', kicker: 'Module 2.4 · Video 2 of 3', scenes: [
      { t: 'title', kicker: 'Module 2.4 · Privacy, protection and IP', title: 'Who owns what goes in, and what comes out?', sub: 'Copyright, fair use, licences and AI outputs', icon: 'gavel',
        say: 'Generative AI is built on enormous amounts of other people’s work, and it produces new content at scale. Both ends raise intellectual property questions that courts are still answering. | This video covers the main IP risks, how copyright exceptions differ between jurisdictions, what courts have decided so far, and how to manage the risk.' },
      { t: 'bullets', title: 'Five IP questions for any AI system', items: [
          { icon: 'database', h: 'Training data rights', d: 'Was it lawful to copy this content for training?', k: 'data' },
          { icon: 'doc', h: 'Model licences', d: 'Do open-weight licence terms allow your use?', k: 'model' },
          { icon: 'copy', h: 'Infringing outputs', d: 'Could outputs reproduce protected works or trademarks?', k: 'threat' },
          { icon: 'pen', h: 'Owning outputs', d: 'Can AI-generated content be protected at all?', k: 'human' },
          { icon: 'lock', h: 'Trade secrets', d: 'Is confidential information leaking into tools?', k: 'neutral' } ],
        say: 'Ask five questions of any AI system. | Training data rights: was it lawful to copy this content for training, under copyright law and the source’s terms? | Model licences: open-weight models come with licences that may restrict commercial use, user numbers or certain applications. | Infringing outputs: could the system reproduce copyrighted text, code, images or trademarks? | Owning outputs: can the content your system generates be protected at all? In the US, works need human authorship. | And trade secrets: are staff pasting confidential information into tools that might retain it or train on it?' },
      { t: 'bullets', title: 'Copyright exceptions differ by country', layout: 'grid', cols: 2, items: [
          { icon: 'flag', h: 'United States: fair use', d: 'Four factors, decided case by case, including market harm', k: 'data' },
          { icon: 'globe', h: 'European Union: TDM exceptions', d: 'Research exception; commercial use unless the rightsholder opts out', k: 'model' },
          { icon: 'book', h: 'United Kingdom', d: 'Text and data mining exception for non-commercial research', k: 'human' },
          { icon: 'compass', h: 'Elsewhere', d: 'Some countries, such as Japan, permit broad analysis', k: 'neutral' } ],
        say: 'Whether training is lawful depends heavily on where it happens. | In the United States, the question is fair use, judged case by case on four factors: the purpose and character of the use, the nature of the work, the amount used, and the effect on the market for the original. | In the European Union, the copyright directive has a text and data mining exception for research, and a broader one for any purpose, including commercial, unless the rightsholder has reserved their rights in a machine-readable way. | The United Kingdom’s exception covers non-commercial research only. | And some countries, such as Japan, permit broad use of works for data analysis. A model trained in one country may be used in many others.' },
      { t: 'timeline', title: 'Some key decisions so far', events: [
          { y: 'Feb 2025', h: 'Thomson Reuters v. Ross', d: 'US: not fair use (non-generative tool)' },
          { y: 'Jun 2025', h: 'Bartz v. Anthropic', d: 'US: training fair use; pirated copies not' },
          { y: 'Jun 2025', h: 'Kadrey v. Meta', d: 'US: fair use on that record' },
          { y: 'Nov 2025', h: 'Getty v. Stability AI', d: 'UK: model not an infringing copy' },
          { y: 'Nov 2025', h: 'GEMA v. OpenAI', d: 'Germany: memorised lyrics infringe' },
          { y: 'Sep 2026', h: 'Ross appeal', d: 'US appeals court affirms Ross' } ],
        say: 'Courts have reached different conclusions on different facts, so the law remains unsettled. | In February twenty twenty-five, a US court found that copying legal headnotes to build a competing, non-generative research tool was not fair use. | In June twenty twenty-five, another US court held that training a model on lawfully acquired books was fair use, but keeping pirated copies in a central library was not. That case later settled. | Days later, a third court found fair use on the record before it, because the authors hadn’t shown harm to their market. | In November twenty twenty-five, the UK High Court found that an image model did not itself store the works it was trained on, so it was not an infringing copy. | The same month, a German court held that song lyrics memorised by a model, and reproduced in its outputs, infringed copyright. | And in September twenty twenty-six, a US appeals court affirmed the first of these decisions. Expect more rulings, and appeals.' },
      { t: 'bullets', title: 'Managing IP risk', layout: 'grid', cols: 2, items: [
          { icon: 'archive', h: 'Record provenance and licences', d: 'For every dataset and model you use', k: 'data' },
          { icon: 'stop', h: 'Honour opt-outs', d: 'Machine-readable rights reservations and robots rules', k: 'threat' },
          { icon: 'doc', h: 'Review model licences', d: 'Use restrictions, attribution, commercial limits', k: 'model' },
          { icon: 'filter', h: 'Check outputs', d: 'Similarity and code-licence scanning where it matters', k: 'control' },
          { icon: 'shield', h: 'Negotiate indemnities', d: 'Vendor IP protection, and its conditions', k: 'human' },
          { icon: 'lock', h: 'Protect secrets', d: 'Approved tools only; no training on your data', k: 'neutral' } ],
        say: 'You can manage IP risk even while the law evolves. | Record the provenance and licence of every dataset and model you use. | Honour opt-outs, such as machine-readable rights reservations, and robots exclusion rules when collecting data. | Review open-weight model licences for use restrictions, attribution requirements and commercial limits. | Check outputs where it matters, for example scanning generated code for licensed snippets, or checking images for similarity to known works. | Negotiate IP indemnities from vendors, and read their conditions, which often require you to keep their safety features switched on. | And protect your own secrets: use approved tools with contractual commitments not to train on your data.' },
      { t: 'summary', items: ['IP risks: training rights, licences, outputs, ownership, secrets', 'Fair use, TDM exceptions and opt-outs vary by country', 'Courts disagree on different facts; the law is unsettled', 'Provenance, licence review, output checks, indemnities'],
        say: 'To recap. | AI raises IP risks at both ends: training rights, model licences, infringing outputs, ownership of outputs and trade secrets. | Fair use in the US, text and data mining exceptions in the EU, and narrower rules elsewhere mean jurisdiction matters. | Courts have disagreed on different facts, so treat the law as unsettled. | And manage the risk with provenance records, licence reviews, output checks, indemnities and approved tools.' } ] },
    { type: 'text', md: `### The main IP risks
1. **Training data rights.** Training typically involves copying works. Whether that is lawful depends on the jurisdiction, any applicable exception, the source’s terms of service, and how the data was obtained. How data was *acquired* matters: in one 2025 US decision, training on lawfully purchased books was fair use, but downloading and keeping pirated copies was not.
2. **Model licences.** “Open” models are released under licences that range from permissive (such as Apache 2.0) to custom licences with **acceptable use policies**, attribution requirements, restrictions on using outputs to train competing models, or thresholds above which a separate commercial licence is needed. Using a model outside its licence is an IP and contractual breach, and part of supply-chain risk (Module 2.5).
3. **Infringing outputs.** Models can reproduce memorised training content, such as song lyrics, passages of text, code under restrictive open-source licences, or recognisable characters and trademarks. A November 2025 German decision held that lyrics memorised in a model and reproduced in its outputs infringed copyright.
4. **Ownership of outputs.** In the United States, copyright requires **human authorship**: material generated by AI is not protected, although human selection, arrangement and modification can be. A US federal appeals court confirmed the human-authorship requirement in 2025. Other jurisdictions differ (the UK has a provision for computer-generated works, under review). If your business depends on owning generated content, plan for meaningful human contribution.
5. **Trade secrets and confidentiality.** Entering confidential information into AI tools that retain or train on inputs may destroy trade-secret protection or breach NDAs.

### Copyright exceptions for training
| Jurisdiction | Approach to training |
|---|---|
| **United States** | **Fair use** (17 U.S.C. §107), four factors: purpose and character (including whether the use is transformative), nature of the work, amount used, and effect on the market. Decided case by case. |
| **European Union** | Digital Single Market Directive: **Article 3** permits text and data mining (TDM) for scientific research by research organisations; **Article 4** permits TDM for any purpose unless the rightsholder has expressly reserved rights, for online content in a **machine-readable** way. The AI Act requires GPAI model providers to have a policy to comply with EU copyright law, including identifying and respecting these reservations, and to publish a sufficiently detailed **summary of training content**. |
| **United Kingdom** | TDM exception for non-commercial research only (CDPA section 29A); reform for AI training has been consulted on. |
| **Japan** | Article 30-4 of the Copyright Act broadly permits use of works for data analysis, subject to not unreasonably prejudicing rightsholders’ interests. |

### What courts have decided so far
| Date | Case | Outcome |
|---|---|---|
| Feb 2025 | *Thomson Reuters v. Ross Intelligence* (US, D. Del.) | Copying Westlaw headnotes to train a competing, non-generative legal research tool was **not fair use**. Affirmed by the Third Circuit in September 2026. |
| Jun 2025 | *Bartz v. Anthropic* (US, N.D. Cal.) | Training on lawfully acquired books was **fair use**; retaining pirated library copies was **not**. The case subsequently settled. |
| Jun 2025 | *Kadrey v. Meta* (US, N.D. Cal.) | **Fair use** on the record presented, because the plaintiffs had not shown market harm; the court limited its ruling to those facts. |
| Nov 2025 | *Getty Images v. Stability AI* (UK High Court) | The trained model did not store or reproduce the works, so it was **not an infringing copy** for secondary infringement purposes; limited trademark findings. |
| Nov 2025 | *GEMA v. OpenAI* (Munich Regional Court) | Lyrics **memorised** in the model and reproduced in outputs **infringed** copyright. |

Major cases, including claims by news publishers against AI developers, remain undecided. The direction of travel is not uniform, which is itself the key governance message: **document provenance, assess jurisdictional exposure and avoid unlicensed sources**.

### Practical controls
- **Data provenance register:** source, licence or legal basis, acquisition method, opt-out checks, and permitted uses for every dataset (links to AIBOM, Module 2.5).
- **Respect rights reservations:** honour robots.txt and machine-readable TDM opt-outs when collecting web data; avoid known infringing sources such as shadow libraries.
- **Licence review gate** for models and datasets before use, including downstream obligations.
- **Output controls:** filters for verbatim reproduction, code-licence scanners, similarity checks for images and text in high-exposure uses, and human review of published content.
- **Contracts:** IP indemnities from providers (check conditions such as using built-in filters and not modifying outputs to infringe), warranties on training data, and no-training commitments for your inputs.
- **Policy:** acceptable use rules for confidential information and for publishing AI-generated content, including disclosure where required.`, },
    { type: 'tabs', title: 'IP scenarios', items: [
      ['The scraped dataset', 'A team finds a large text corpus online that includes content from paywalled news sites and a known pirated-books collection. **Risk:** infringement claims; tainted model. **Action:** don’t use it. Source data with clear rights, record provenance, and honour opt-outs.'],
      ['The open-weight model', 'A product team wants to embed an open-weight model in a commercial app with millions of users. **Risk:** licence breach if the licence caps users, bans certain uses or restricts training other models on outputs. **Action:** legal review of the licence before adoption; record obligations in the AIBOM.'],
      ['The code assistant', 'Developers accept large code suggestions without review. **Risk:** inclusion of snippets under copyleft licences, creating disclosure obligations. **Action:** enable duplicate-detection filters, scan for licensed code, and require review.'],
      ['The marketing images', 'Marketing wants to trademark a logo generated entirely by an image model. **Risk:** the output may not be protectable by copyright, and may resemble existing marks. **Action:** significant human design work, clearance searches, and legal advice before relying on it.'] ] },
    { type: 'callout', kind: 'exam', title: 'What the exam is likely to test', md: `You are unlikely to need case names. You should know that **fair use (US)** is a case-by-case defence, the **EU TDM exception allows rightsholders to opt out**, **GPAI providers must respect opt-outs and summarise training content**, **AI-generated output may not be copyrightable** without human authorship, and the safest governance answer is **documented provenance and licence compliance** rather than assuming everything public is free to use.` },
    { type: 'check', q: { q: 'A company wants to train a model on web content collected in the EU for a commercial product. Which practice BEST manages copyright risk?', o: ['Collect everything publicly accessible, since content published openly online is free to use for training', 'Honour machine-readable opt-outs, avoid infringing sources, and record each dataset’s provenance and legal basis', 'Train first and remove specific content only if rightsholders complain after the product has launched', 'Rely on the model’s training process to avoid memorising copyrighted text, so that its outputs never reproduce it'], a: 1, b: 2,
      why: 'The EU commercial TDM exception applies only where rightsholders haven’t reserved their rights. Honouring opt-outs, avoiding infringing sources and documenting provenance is the defensible approach; public availability is not permission.' } }
  ]
};
