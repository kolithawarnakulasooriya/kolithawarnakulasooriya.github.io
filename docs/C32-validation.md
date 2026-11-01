# C32 validation — October 31, 2026

This records the earlier C32 handoff. See [C09–C20 validation](C09-C20-validation.md) for subsequent improvements and current limitations.

C32 is complete. Other checklist items remain unchecked. No deployment was performed.

## Implemented

- One route-specific h1 on all eight pages, with an accessible visually hidden home title.
- Original header branding retained as non-heading text, including its original size and weight.
- Skills, Resume and publication heading hierarchy corrected; headerless accordions no longer emit empty headings.
- Research uses the configured destination, registered external-arrow icon, accessible external/new-tab names and safe link attributes. The Research page retains its embed and adds a source link.
- Directory-index exports enabled. Before this correction, a standard static server returned 404 for `/me` and a directory listing for `/gallery`; all eight routes now serve their intended pages.

The HR reviewer approved the new labels without adding professional claims. The UI reviewer compared desktop/mobile previews and confirmed preservation of the original font appearance, theme, header identity, portrait and hero composition. The layout fonts, Once UI theme, Background component and animation implementation were not changed.

## Checks

| Check | Result |
|---|---|
| `yarn install --frozen-lockfile` | Passed; no manifest or lockfile changes |
| Node 20.20.2 lint and TypeScript | Passed; four existing lint warnings in GlitchFx, LetterFx and Logo |
| Production `yarn build` | Passed in an isolated source snapshot |
| Exported content regression test | Passed for all eight directory-index pages |
| Chrome browser matrix | 56 recorded scenarios, zero C32 failures |
| Browser errors / broken images / missing-icon warnings | None recorded in final matrix |
| Static routes and local assets | All eight routes and 111 local image/JS/CSS assets passed |
| Existing CV download | Served bytes match `public/files/Kolitha_AI_Engineer.pdf` |

The matrix includes all eight routes at 320, 375, 768, 1024 and 1440px, short landscape at 812×375, and doubled root text size at 375px. Assertions cover nonempty ordered headings, accessibility-tree heading names, the original brand size/weight, Research URL/icon/attributes and keyboard focus. Normal/reduced-motion home screenshots were recorded separately.

The separately running terminal development server was left running. Its writes to the shared `.next` directory caused incomplete build manifests, so production verification used `/private/tmp/c32-export-check`, with matching source/configuration and shared existing dependencies. The verified export was copied to this checkout's `out/`, and the default content-test command passed there too. No separate Git worktree or dependency changes were introduced. The earlier development pass had one transient chunk-loading failure; final production checks had none.

## Remaining limitations

- Baseline overflow affected 34 of 56 scenarios; final overflow affects 33. No new overflow scenario was observed. The project-layout improvement coincides with concurrent user edits to project grouping and is not attributed to C32.
- Existing mobile hero clipping, hidden navigation, footer overlap, content-height constraints and the timed CV toast remain outside C32.
- Motion screenshots do not establish reduced-motion compliance. The existing animation implementation remains unchanged. Actual screen-reader announcements, physical touch and browser-level zoom were not tested; accessibility-tree and keyboard checks do not substitute for them.
- The Background component was preserved, but its current default display flags emit no visible background layers; cursor-responsive visual behavior was not established by this pass.
- Research destination URLs and link behavior were checked; external research/publication claims were not independently verified.
- Existing user PDF changes, configuration edits and project regrouping were preserved. The full-repository whitespace check flags user-owned trailing whitespace in configuration; C32 source changes pass the whitespace check.

## Artifacts and rerunning

See [test instructions](../tests/README.md). Temporary validation artifacts:

- Final desktop/mobile previews and browser results: `/private/tmp/c32-final/`
- Baseline previews and measurements: `/private/tmp/c32-baseline/`
- Production output: `/private/tmp/c32-export-check/out/`
- Static route/asset/CV evidence: `/private/tmp/c32-static-assets.json`
- Production build log: `/private/tmp/c32-isolated-build.log`

CV SHA-256: `b13c63b4562ef057e50ec163c6fd9978b56960d128c629b2fc33b867dc820f04`.
