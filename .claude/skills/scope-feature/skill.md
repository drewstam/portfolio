---
name: scope-feature
description: "Phase 1 of feature development. Takes a rough brief through a 3-round conversation (approach analysis, scoping questions, extended brief) to produce a validated spec. Output is written back into feature.md. Run before /plan-feature-implementation."
user-invocable: true
---

# Skill: Scope Feature

## Description

Phase 1 of the feature development process. Takes a rough brief and turns it into a detailed, validated spec through a structured 3-round conversation. The output is written back into the same `feature.md` file — below the divider in the Extended Brief section. The user's original brief is never modified.

The 3 rounds ensure we don't jump straight into building without questioning the approach first.

## When to Use

- When a new feature folder has been created with a `feature.md`
- Before running `/plan-feature-implementation`
- When a feature request feels vague or has unanswered questions

## Inputs

Read and understand:

1. **Feature spec** — `.claude/features/[feature-name]/feature.md` — the user's rough brief
2. **Reference material** — `.claude/features/[feature-name]/reference/` — any designs, screenshots, notes, or images the user uploaded. If images exist, analyze them carefully — they often contain more information than the written brief.
3. **Project log** — `.claude/context/OUTPUT-project-log.md` — for decisions that might affect this feature
4. **Other feature summaries** — if relevant, scan the summary section at the top of other `OUTPUT-implementation-plan.md` files to check for dependencies or overlap

## Pre-Flight Check

Before starting the rounds, check the current git branch. If the user is on `main` (or `master`), flag it:

**"You're currently on the `main` branch. Want me to create a feature branch (e.g. `feature/[feature-name]`) before we start? This keeps main clean and makes it easy to review changes via pull request later."**

- If the user says yes → create the branch and switch to it
- If the user says no or says they'll handle it → continue normally. It's fine to create files and work on local main — just never push to remote main unless the user explicitly asks.

This check only applies when starting a new feature. If the user is already on a feature branch, skip this and move on.

## Process

Work through this in 3 rounds. Complete one round at a time. Wait for the user's answers before moving to the next round.

---

### Round 1 — Approach Analysis
- Read the feature brief in `.claude/features/[feature-name]/feature.md`
- Analyze the request and identify possible approaches
- Present trade-offs for each approach
- Recommend a preferred approach with reasoning

Present **2-4 approaches**, ordered by your recommendation. For each:

- **What it is** — one sentence
- **Pros**
- **Cons**
- **Estimated complexity** — low / medium / high

Then ask: **"Which approach do you want to go with?"**

Wait for the user's answer before continuing.

---

### Round 2 — Scoping Questions
Based on the chosen approach, identify everything that's unclear or ambiguous. Focus on the most important decisions — don't overwhelm.

**Write the questions directly into `feature.md`** below the `---` divider, under a `## Scoping Questions` heading. This persists the questions so they're not lost if the conversation closes, and lets the user answer at their own pace.

Use this format in the file:

```markdown
## Scoping Questions

Generated: [date]
Chosen approach: [the approach picked in Round 1]

### Q1: [Question]

[If relevant: your recommendation or context for this question]

- [ ] a) [Option]
- [ ] b) [Option]
- [ ] c) [Option]

**Notes:**  
[Add any client clarification, follow-up questions, or additional context here]

### Q2: [Question]

[If relevant: your recommendation or context for this question]

- [ ] a) [Option]
- [ ] b) [Option]

**Notes:**  
[Add any client clarification, follow-up questions, or additional context here]

---

### Recommendations

[Your proactive recommendations based on the theme analysis, edge cases you spotted, patterns you'd reuse, risks to flag. This is where you add value as the technical lead.]
```

The user fills in their answers by:
- Checking the box of their choice (`[x]`)
- Writing `needs client clarification` into notes if they can't decide yet
- Adding any extra notes or context directly below a question if needed

After writing the questions, tell the user: **"I've written the scoping questions into your feature.md. Fill in your answers there, then let me know when you're ready for me to continue."**

Wait for the user to confirm they've answered before moving to Round 3.

---

### Round 3 — Extended Brief
Read the user's answers from the `## Scoping Questions` section in `feature.md`. Take all answers — including any notes the user added — and write a clean, updated feature spec.

Present it back to the user first in conversation:

- All decisions baked in
- Any user notes or ideas incorporated
- Items marked "needs client clarification" flagged clearly
- No ambiguity left (except flagged items)

Ask: **"Does this match what you have in mind? Anything I'm missing?"**

Only after the user confirms, **append** the `## Extended Brief` section below the `## Scoping Questions` section in `feature.md`. Keep the Scoping Questions — they serve as a decision log showing what was asked and what was decided.

---
## Output

Write below the `Extended Brief` heading in `.claude/features/[feature-name]/feature.md`:

```markdown
## Extended Brief

Generated: [date]

### Chosen Approach

[Which approach was selected and why — one sentence summary of the decision]

### Requirements

[Clear bullet list of everything this feature must do — confirmed through conversation]

### Where It Lives

[Exact location: which page(s), which section, relationship to existing components]

### Data Sources

[Where the feature gets its data: metafields, collections, settings, API, hardcoded, etc.]

### User Interaction

[How users interact with it — triggers, states, transitions]

### Admin / Configuration Settings

[What should be configurable by an admin or via environment config — and what should NOT be configurable]

### Decisions Made

[Everything that was discussed and decided during Rounds 1-2, with reasoning]

### Edge Cases to Handle

[Empty states, missing data, too many items, mobile behavior, error states, accessibility]

### Out of Scope

[What this feature explicitly does NOT include — prevents scope creep during build]

### Dependencies

[Other features, theme components, or third-party tools this depends on]

### Notes

[Anything else relevant — client preferences, priority, open questions]

### Needs Client Clarification

[Any items the user couldn't answer during scoping. Remove this section if everything is resolved.]
```

## Important Notes

- Don't assume — if something is unclear, ask. Even if you think you know the answer.
- The user is the decision-maker. You inform the decisions with technical expertise. Don't just execute — think, recommend, flag risks.
- If the feature is genuinely tiny and the brief is already crystal clear, say so. Not everything needs all 3 rounds — use judgment. A small CSS tweak doesn't need an approach analysis.
- After writing the Extended Brief, suggest running `/plan-feature-implementation` as the next step.

