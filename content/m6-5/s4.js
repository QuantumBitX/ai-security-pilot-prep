/* 6.5 · Section 4: documentation of evidence and reproducibility steps */
module.exports = {
  title: 'Documenting evidence and reproducibility', covers: [4],
  blocks: [
    { type: 'video', title: 'If it can’t be reproduced, it can’t be fixed', kicker: 'Module 6.5 · Video 4 of 5', scenes: [
      { t: 'title', kicker: 'Module 6.5 · Findings and reporting', title: 'If it can’t be reproduced, it can’t be fixed', sub: 'Documenting evidence and reproducibility steps', icon: 'doc',
        say: 'A finding that can’t be reproduced is easy to dispute, hard to fix and impossible to retest. With AI, reproducibility takes extra care, because outputs vary and versions change underneath you. | This video covers how to document evidence and reproducibility steps for AI findings.' },
      { t: 'bullets', title: 'What to capture', layout: 'grid', cols: 2, items: [
          { icon: 'tag', h: 'Versions', d: 'Model, prompts, guardrails, tools', k: 'model' },
          { icon: 'sliders', h: 'Settings', d: 'Temperature, seed, parameters', k: 'neutral' },
          { icon: 'chat', h: 'Full transcript', d: 'Every turn, input and output', k: 'human' },
          { icon: 'pipeline', h: 'Traces', d: 'Retrieval, tool calls, actions', k: 'data' },
          { icon: 'chart', h: 'Rates', d: 'Successes out of attempts', k: 'threat' },
          { icon: 'hash', h: 'Integrity', d: 'Hashes, timestamps, custody', k: 'control' } ],
        say: 'Capture six kinds of evidence for every AI finding. | Versions: the exact model, system prompt, guardrail configuration and tool definitions in use. | Settings: temperature, random seed where the platform supports one, and other generation parameters. | The full transcript: every turn, input and output, not just the final response. | Traces: what was retrieved, which tools were called, and what actions resulted. | Rates: how many attempts succeeded, out of how many tried. | And integrity: hashes and timestamps for evidence files, with a record of who handled them.' },
      { t: 'code', title: 'A reproduction package', file: 'F-07-repro.yaml',
        code: `environment: staging, release 2026.11.2
model: support-llm 3.4; prompt: system v27
guardrails: policy v9; tools: crm, refund
settings: temperature 0.7, top-p 0.9
input: test email E-12 (stored, not pasted)
expected: summary only, no tool calls
observed: refund tool called, amount 40
rate: 31 of 100 runs, 2-4 Nov 2026
evidence: traces.jsonl sha256 9be1...`,
        hl: [null, [1, 3], [4, 5], [6, 7], [8, 8], [9, 9]],
        notes: [
          { h: 'Anyone can repeat it', d: 'Everything needed, in one place.' },
          { h: 'Where and what', d: 'Environment and exact versions.', k: 'model' },
          { h: 'How', d: 'Settings, and the stored input.', k: 'neutral' },
          { h: 'Expected and observed', d: 'What should happen, and what did.', k: 'threat' },
          { h: 'How often, and when', d: 'A rate, not an anecdote.', k: 'data' },
          { h: 'Fixed evidence', d: 'A hash ends disputes about what traces showed.', k: 'control' } ],
        say: 'Here is a reproduction package for finding F-07. Anyone with access should be able to repeat the test from it. | It records the environment and the exact versions: the release, model, system prompt, guardrail policy and tools. | It records the settings and the input. The test email is stored in the evidence folder, and the package refers to it by name rather than pasting the attack text. | It states what should have happened, a summary with no tool calls, and what actually happened: a refund. | It gives the success rate, thirty-one of a hundred runs, and when the runs took place. | And it fixes the evidence with a hash, so nobody can later dispute what the traces showed.' },
      { t: 'bullets', title: 'Handling sensitive evidence', layout: 'grid', cols: 2, items: [
          { icon: 'mask', h: 'Redact personal data', d: 'Mask what testers didn’t need', k: 'data' },
          { icon: 'text', h: 'Placeholders in reports', d: 'Refer to attack files by name', k: 'human' },
          { icon: 'lock', h: 'Restricted storage', d: 'Need-to-know access, logged', k: 'control' },
          { icon: 'clock', h: 'Retention limits', d: 'Until closure, plus a set period', k: 'neutral' },
          { icon: 'hash', h: 'Chain of custody', d: 'Hash on capture; log hand-offs', k: 'model' },
          { icon: 'link', h: 'Shareable versions', d: 'Sanitised packs for vendors', k: 'threat' } ],
        say: 'AI evidence is often sensitive. It can contain personal data, working attack text and harmful outputs, so handle it carefully. | Redact personal data that testers didn’t need to see. | Use placeholders in reports, referring to attack files by name, so a report forwarded by email doesn’t become an attack kit. | Keep raw evidence in restricted storage, with need-to-know access that is logged. | Set retention limits: keep evidence until the finding is closed, plus an agreed period. | Keep a chain of custody: hash evidence when it is captured, and log every hand-off, as Module 5.5 described. | And prepare sanitised packs for sharing with vendors through coordinated disclosure.' },
      { t: 'summary', items: ['Capture versions, settings, transcripts, traces, rates, integrity', 'Package findings so anyone can reproduce them', 'Report rates, pin versions, reset state between runs', 'Protect sensitive evidence; never paste attack text into reports'],
        say: 'To recap. | Capture versions, settings, full transcripts, traces, success rates and integrity data. | Package each finding so anyone with access can reproduce it. | Report rates, pin versions, and reset state between runs. | And protect sensitive evidence, never pasting working attack text into reports.' } ] },
    { type: 'text', md: `### Evidence checklist for AI findings
| Element | What to record |
|---|---|
| **Identification** | Finding ID, title, tester, dates, assessment reference |
| **Environment** | Environment name, release and region; the model, system prompt, guardrail, retrieval index and tool versions (the release manifest, Module 6.2) |
| **Settings** | Temperature, top-p, maximum tokens, seed (where the platform supports it), conversation state |
| **Steps** | Numbered steps from a clean start, referring to stored test inputs by name |
| **Expected and observed** | What should have happened, and what did |
| **Rate** | Successes out of attempts, over what period and with what settings |
| **Traces and artefacts** | Full transcripts, retrieved chunks, tool calls and parameters, logs, screenshots |
| **Impact** | What the result enables, in business terms |
| **Integrity** | Hashes and timestamps of evidence files; chain of custody (Module 5.5) |

### Reproducibility despite non-determinism
- **Report rates, not anecdotes:** "31 of 100 runs" is reproducible in a way that one screenshot isn’t.
- **Pin what you can:** fixed versions, settings and seeds. Hosted models may still vary between runs, and providers update models, so record the provider’s model version or snapshot identifier.
- **Reset state** between runs: memory, caches and planted index content can change results.
- **Keep a minimal case:** the shortest input and fewest steps that still reproduce the finding, which makes fixing and retesting faster.
- **Automate reruns:** store the case in the test harness, so the retest after a fix uses identical conditions (Module 6.6).

### Handling sensitive evidence
- **Redact** personal data that wasn’t needed, and **don’t paste working attack text into reports**: refer to stored files by name, so a forwarded report isn’t an attack kit.
- **Restrict and log access** to raw evidence, and set **retention** to closure plus an agreed period.
- **Prepare sanitised packs** for vendors and coordinated disclosure (Section 5).` },
    { type: 'scenario', title: 'The finding nobody could reproduce', md: `A red teamer reports that an HR assistant revealed another employee’s salary. The report contains one screenshot, with no model or prompt versions and no settings. Two weeks later, engineers can’t reproduce the finding, and the provider has updated the model in the meantime.`,
      q: { q: 'What would MOST have prevented this dispute?', o: ['A higher-resolution screenshot, showing the full conversation window clearly', 'A reproduction package: versions, settings, transcript, traces and success rate', 'A verbal briefing for the engineering team, given on the day of the test', 'A rule that only findings engineers can reproduce are recorded at all'], a: 1, b: 4,
        why: 'Versions, settings, full transcripts, traces and a success rate let engineers reproduce the conditions, or show that the model change affected the result. Screenshots and verbal briefings lack that detail, and refusing to record unreproduced findings hides risk.' } },
    { type: 'callout', kind: 'exam', title: 'Evidence questions', md: `Strong answers produce a **reproduction package**: exact **versions** (model, prompt, guardrails, tools), **settings**, the **full transcript and traces**, **expected versus observed** results, a **success rate**, and **hashed** evidence with a chain of custody. Sensitive evidence is **redacted and restricted**, and reports refer to attack inputs **by name**.` },
    { type: 'check', q: { q: 'Why should reports refer to stored attack inputs by name rather than pasting the full attack text?', o: ['Attack text is usually too long to fit into the report’s page layout', 'Reports get forwarded, and pasted attack text could be reused by others', 'Regulators require attack inputs to be stored in one specific file format', 'Named references make the report look more professional to executives'], a: 1, b: 4,
      why: 'Reports circulate widely. Keeping attack text in restricted evidence storage, referenced by name, stops a forwarded report from becoming a ready-made attack kit.' } }
  ]
};
