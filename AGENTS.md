# Personal Website- Kolitha Warnakulasooriya
## User intent

Improve Kolitha Warnakulasooriya's existing biography website according to the selected requirements in the Website Review and Change Checklist. Make targeted corrections and usability improvements while preserving the site's existing visual identity.

The user explicitly rejected the previous broad redesign because it changed the theme, fonts and Once UI background. Do not interpret "eye-catching" or "more attractive" as permission to replace those elements.

## Preserve the original design

- Preserve the original Inter and Roboto Mono fonts, Once UI theme/tokens and cursor-responsive Once UI Background.
- Preserve the landing-page animation, its recognizable scramble effect and original identity lines. Retain the original portrait treatment and general landing composition; adjust dimensions and spacing only where needed for responsiveness or a selected requirement.
- Keep existing Once UI components and styling conventions where practical. Do not substitute a new branding system, wordmark, color palette, terminal-style hero or unrelated card treatment.
- Use Once UI tokens for colors, surfaces, borders and typography. Do not introduce a replacement global theme or opaque backgrounds that hide the original background effect.
- Accessibility improvements may provide stable screen-reader text and respect reduced-motion preferences while preserving the ordinary-motion visual effect.

## Requirements and factual authority

- Reconcile titles, dates, institutions, degree completion, publication authors/venues/years and contribution claims across pages and metadata.
- Preserve overlapping appointments without inventing explanations.
- Do not invent Blog summaries or Gallery event/date/role captions. Descriptive image alt text may describe what is visibly present.

## Roles

1. **Senior HR reviewer:** Reconcile professional claims with the CV, review new copy and identify factual uncertainties.
2. **Software developer:** implement selected requirements within the existing design, then verify responsiveness, accessibility and functionality.
3. **UI-Designer:** Check the UI conflicts and implementations

## Implementation approach

- Read the `Tasks.md` File
- Pick the latest pending task
- Keep useful existing routes and assets. Avoid unnecessary dependencies or lockfile changes.
- Deligate the task and implement the feature
- Once the agents complete the task, Change the Status.

## Development and validation

This repository uses Next.js 15 with a static export for GitHub Pages. CI uses Node 20 and Yarn. Use the existing checkout; a worktree is unnecessary unless requested.

Use `yarn install --frozen-lockfile`. Both lockfiles exist, but the npm lockfile is out of sync with the manifest; do not switch to npm installation or regenerate lockfiles incidentally.

Typical commands, from the repository root:

```bash
export NEXT_TELEMETRY_DISABLED=1
yarn dev --hostname 0.0.0.0 --port 3000
yarn lint
yarn tsc --noEmit --incremental false
node tests/content.test.cjs
python tests/browser-checks.py
```

The Python browser checks require Playwright and Chromium. Read the scripts before running them; keep their assertions aligned with the user's approved design and actual requirements.

Stop only the dev server you started before running `yarn build`, because development and production share `.next`. The build exports `out/`; use a static server to validate it. Do not use `next start` or the obsolete `next export` command for this configuration. Retain directory-index exports where needed to prevent the Gallery route colliding with its public image directory.

Verify affected routes at 320, 375, 768, 1024 and 1440px, plus short landscape and enlarged text. Check keyboard navigation, mobile menu, CV access, accordion behavior, normal/reduced-motion animation, headings, footer flow, image loading and horizontal overflow. Compare the result visually against the original theme as well as checking behavior.

Google Fonts requests require access to `fonts.googleapis.com` and `fonts.gstatic.com`. Publisher verification may require additional network access. A blocked request does not prove a link is broken or verified. Report limitations accurately; do not change the user's design to conceal an environment problem.
