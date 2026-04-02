---
name: plan-feature-implementation
description: "Phase 2 of feature development. Takes the scoped spec from /scope-feature and creates a step-by-step implementation plan: (1) Human-first breakdown — admin setup tasks, code preparation, live behavior in plain language, (2) Concrete build steps with files, details, and verification. Output goes to OUTPUT-implementation-plan.md. Run after scoping, before building."
user-invocable: true
---

# Skill: Plan Feature Implementation

Phase 2 of the feature workflow. Takes the scoped spec from Phase 1 and creates a step-by-step implementation plan.

## Description

Phase 2 of the feature development process. Takes the scoped feature spec (from the `/scope-feature` skill) and turns it into a concrete, step-by-step implementation plan. No code gets written during this phase — only the plan.

The plan has two layers:
1. **Human-first breakdown** — describe the feature as if watching someone use it, in plain language
2. **Build steps** — translate that understanding into concrete file-level implementation steps

The human-first layer ensures everyone truly understands the feature before any code is written. The build steps make it actionable.

## When to Use

- After `/scope-feature` has been completed and the Extended Brief exists in `feature.md`
- Before writing any code for the feature

## Inputs

Read and understand:

1. **Feature spec** — `.claude/features/[feature-name]/feature.md` — the full spec including the Extended Brief
2. **Reference material** — `.claude/features/[feature-name]/reference/` — designs, screenshots, notes
3. **Project log** — `.claude/context/OUTPUT-project-log.md` — for context on past decisions
4. **Other feature summaries** — if dependencies were flagged during scoping, read the relevant OUTPUT files

## Process

1. Read the extended brief from `.claude/features/[feature-name]/feature.md`
2. Break the feature into small, ordered implementation steps
3. For each step, specify:
   - What to build
   - Which files to create or modify
   - Any dependencies or prerequisites
4. Identify risks, open questions, and things to watch for
5. Write the plan to `.claude/features/[feature-name]/OUTPUT-implementation-plan.md`

Group these tasks by purpose. Each group gets:
- A **headline** explaining what we're setting up
- A **brief explanation** of why — so the human understands the reason, not just the steps
- A **checklist** with specific instructions

Rules for the breakdown:
- Each step should be ONE single action
- Don't skip steps that feel obvious
- No code — just plain language
- Number every step within each phase

## Output Format

The implementation plan should include:
- **Summary** — Brief description of the feature (so other features can reference this without reading the full plan)
- **Steps** — Ordered list of implementation tasks
- **Files affected** — List of files to create or modify
- **Dependencies** — Any new packages or external requirements (must be approved before adding)
- **Risks & open questions** — Anything that could affect delivery
