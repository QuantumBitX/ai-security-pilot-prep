# Authoring guide

This guide explains how the course content is structured and the rules it follows. Read it before changing lessons, videos or questions.

## Content model

- **Outline:** `src/outline.js` defines the domains, modules, outline topics (bullets) and planned knowledge points (KP; 1 KP ≈ 1 minute). Module KP across the course sum to 3,000. Domain tests (6 × 40) and mock exams (2 × 180) bring the total to 3,600.
- **Module:** `content/m<id>.js` holds `id`, `intro`, `objectives`, `sections` (one `require` per section file), `quiz` (knowledge check, 10–17 items), `exam` (domain-test pool, harder scenario items) and `glossary` (`[term, definition]` pairs).
- **Section:** `content/m<id>/s<N>.js` exports `{ title, covers: [bullet numbers], blocks: [...] }`. `covers` uses 1-based outline bullet numbers. The build warns when a topic has no section or no questions.
- **Blocks:** `video`, `text` (Markdown: `###` headings, lists, **bold**, *italic*, `code`, links and pipe tables), `table`, `steps`, `flip`, `match`, `callout` (`kind: 'exam' | 'warn' | 'tip'`), `scenario` and `check`.
- **Questions:** `{ b, q, o: [4 options], a, why }`. `b` is the outline bullet. Write the correct option at index `a: 1`; options are shuffled at runtime. There is no "all of the above".
- **Mocks:** `content/mock/mockN.js` exports `{ questions: [{ m, q, o, a, why }] }`. A pool is used only when it covers every domain's share: D1 16, D2 27, D3 31, D4 29, D5 30, D6 27.

## Build

```bash
node tools/build.js            # dist/ (artifact page plus local.html)
OUT=docs node tools/build.js   # docs/ (standalone site)
```

The build validates content, estimates seat time (150 wpm reading, video × 1.15, 1.3 min per quiz item) and normalises KP to the outline. Aim for a "factor" (KP ÷ estimate) of about 1.1–1.25. It reports, per module:

- **long%:** the share of items where the answer is the uniquely longest option. Target 20–35%.
- **short%:** the share where the answer is the uniquely shortest option. Target 0%.
- **ratio:** the mean length of the answer relative to the other options. Target ≈ 1.0.

Run `QLEN=3.2 node tools/build.js` to list the flagged items for one module.

## Videos

A video is a list of scenes. Each scene has a template `t` and narration `say`, split into segments with `|`; segment *k* triggers beat *k*.

| Template | Beats (segments) |
|---|---|
| `title` | 1–2 |
| `bullets`, `summary`, `compare`, `timeline`, `matrix`, `shield` | intro + one per item or row (timeline: events + 1) |
| `cycle`, `layers` | intro + one per stage |
| `flow` | one per entry in `steps[]` (`{ show, hi, flow, mark }`) |
| `chart` | one per entry in `steps[]` (`{ s: [series], a: [annotations] }`, cumulative) |
| `chat` | one per message |
| `stat` | up to 3 |
| `code` | one per entry in `hl[]` |
| `neural`, `conv`, `attention`, `tokens`, `vector` | one per named step |

Layout rules:

- Flow nodes use x 100–1500 and y 190–860. Coordinates are node centres. Use widths of 230–320 and no more than 7 nodes, and keep labels to about 18 characters.
- Three-column compare headers should be about 12 characters or fewer.
- Title kickers should be 40 characters or fewer.
- Colour by meaning: data blue, model violet, human amber, threat red, control green, neutral grey.
- Review scene grids in the light theme: `node tools/harness.js shot m6-6 out.png 3 6` (module, file, columns, 1-based video index).
- Run `node tools/serve.js sh -c "node tools/harness.js && node tools/lint.js m6-6"` after every change. It flags off-stage text, overlaps and text overflowing its box.

Pronunciation hints `{Display~spoken}` are allowed in `say` only. Narration is recorded with `tools/tts/` (see the README). Only the spoken text is hashed, so layout edits don't need re-recording.

## Writing rules

- British spelling. Plain, direct sentences. Curly apostrophes (’) in prose.
- Exam angle: scenario stems with BEST, MOST or FIRST, from a manager's or adviser's perspective. Governance comes before technology, and containment and evidence come before eradication. Enforced controls outside the model beat instructions to the model.
- Options must be similar in length and equally plausible. Write distractors as specific, believable misconceptions. The correct option must not restate words from the stem.
- New mock questions must test something new. Check them against the module corpus and the other mock pool; similarity of 0.33 or more on stem and answer means rewrite.
- Cite dated facts carefully (laws, standards and research), and say "as of" where they may change.
- **Safety:** keep attack material conceptual and defensive: what it is, why it works at a high level, and how to detect and prevent it. Never write working payloads, jailbreak prompts, injection strings, exploit steps or attack code. In chat scenes, use neutral placeholders such as `[hidden instruction]`.
