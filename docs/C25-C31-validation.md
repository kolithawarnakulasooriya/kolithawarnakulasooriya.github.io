# C25–C31 implementation and validation

Validated November 1, 2026. Changes are local; no commit, publishing workflow or deployment was triggered.

## Outcome

| Task | Implemented and verified |
|---|---|
| C25 | Typed personal site/route metadata replaces demo identity. All eight exported pages have descriptions, trailing-slash canonicals, Open Graph/Twitter fields and factual Person JSON-LD. Existing portrait, Google verification, Inter/Roboto Mono and theme configuration remain. Disputed professional dates are omitted. |
| C26 | Eleven canonical project records have stable IDs, consistent names and explicit statuses. LIS variants are merged without losing either analyzer family. Three selected stories join by project ID, retaining their anchors; each project renders once. Missing URLs produce no active action and imply no private/released status. |
| C27 | Twenty-six media sources have source-hash-checked, oriented WebP derivatives at bounded 480/960/1440 widths. Static picture/srcset delivery works without an image server. Hero priority/sizes are explicit; below-fold media stays lazy, with reserved frames and true intrinsic dimensions. Originals remain unchanged. |
| C28 | Exported metadata/data/media checks, supporting-page tests, profiling and existing regression checks pass. CI now gates artifact upload on frozen-lockfile installation, media freshness, lint, types, build and exported content. Workflow YAML/commands were validated locally; GitHub execution was not triggered. |
| C29 | Existing native accordion behavior was retained rather than rewritten. Enter/Space, initial state, unique relationships, visible focus and collapsed-content Tab exclusion pass. |
| C30 | Four source-backed Blog cards retain source order and attribution. Previews mount only after a keyboard/touch-accessible request, can be hidden and keep source links usable when a provider refuses embedding. Titles are unique; YouTube encoding/player controls are corrected and autoplay is not enabled. Exact dates remain omitted. |
| C31 | All fifteen Gallery items retain order, inspected visible-subject alt text and contain frames. Responsive images decode at all tested widths/densities, with correct EXIF orientation and actual dimensions. Event/date/role captions remain absent pending evidence. |

See [primary-source review](C25-C31-sources.md) for Blog wording, project statuses and factual limits. Earlier C19/C20 access/manual-testing limits remain unchanged; this work does not complete broader professional-record reconciliation.

## Checks and evidence

- Node **20.20.2**, `yarn install --frozen-lockfile`, lint, TypeScript, production build/export and exported-content checks pass. Existing three lint warnings remain in GlitchFx and Logo. No dependency or lockfile changes; package script additions only expose media generation/checking.
- Media freshness validates source SHA-256, generator/config fingerprint, oriented dimensions, candidate counts, encoded WebP dimensions, bytes and existence. Project/media inventories must match.
- **56 shared browser scenarios:** all eight routes at 320, 375, 768, 1024 and 1440px, 812×375 landscape and doubled text. Zero failures, horizontal overflow or browser page errors. Prior navigation, footer, motion, CV and heading assertions remain.
- **16 accessibility audits:** zero violations. One mobile Projects contrast item was marked for review because its evidence link crossed the viewport edge. Centering that same link produced a focused contrast pass with zero incomplete items; geometry showed no overlap with its card/neighbors. Computed-color checks also pass against the conservative gradient bound. Raw audit findings were retained rather than silently removed.
- **90 Gallery decodes:** all fifteen images at 375/768/1440px and device-pixel ratios 1/2. Actual candidates, WebP MIME types, intrinsic dimensions, lazy state and contain fit pass; supported browsers fetched no original Gallery files. Project thumbnails and eager/high-priority portrait also decode from optimized candidates.
- Blog tests confirm zero initial iframe/third-party requests, native preview toggling, unique titles, 44px controls, focus retention and usable source links with simulated HTTP 403 providers. No exact publication dates were inferred.
- Accordion initial-state/focus/Tab tests pass at 375/1440px in addition to shared keyboard checks across all six viewports.
- Interaction checks preserve all five accessible identity lines during scrambling; five active timer chains become zero on SPA unmount and reduced-motion changes. Local assets and exact CV download bytes pass. Actual screen-reader/physical-device coverage is not inferred from automation.
- UI review confirms the original portrait framing, fonts, theme, cursor background and identity composition. Gallery orientation/framing/quality and Blog card wrapping/44px preview controls pass desktop/mobile comparison.

The user-owned development server was left running. A matching source snapshot at `/private/tmp/c25-c31-export` isolated production `.next` writes; source/script comparisons passed. Its final export is copied into this checkout's ignored `out/`, with default content checks rerun there. All implementation remains in the existing checkout, with no separate Git worktree.

## Measured loading and motion

Three cold-context runs per route/viewport used the same local server/browser setup: disabled cache, 4× CPU throttle, 40ms latency and 500,000/250,000 B/s download/upload limits. Initial observations use five seconds, followed by complete Gallery scrolling/decoding. Values below are medians of **image response-body bytes**, excluding HTTP headers.

| Observation | Before | After |
|---|---:|---:|
| Complete Gallery, 375px and 1440px at 1× | 16,491,345 B | 492,782 B |
| Gallery initial window, 375px | 11,436,881 B | 265,658 B |
| Gallery initial window, 1440px | 15,405,185 B | 492,782 B |
| Hero image, both widths at 1× | 304,957 B | 20,296 B |
| Blog initial third-party requests, both widths | 67 observed | 0 |

The measured complete-Gallery reduction is **97.0% for these 1× views**, not an assumed historical 90% result. Largest-per-image variants total 2,586,372 B; that is a file inventory, not the payload every client downloads. Keeping originals and multiple variants increases stored/exported assets while reducing supported-browser delivery.

Motion was sampled separately in normal/reduced modes after five seconds, with a three-second cursor window. Median initial long-task totals were 69/69ms before and 75/87ms after; settled-cursor totals were 54/0ms before and 0/0ms after. These are small local observational samples, not proof of a causal animation speed improvement. Gallery/Blog observed non-input layout-shift sums were zero; desktop Home recorded 0.039 before and 0.048 after. No zero-shift, Lighthouse or guaranteed production-performance claim is made.

Detailed medians, conditions and motion samples are in [measurements](C25-C31-measurements.json). Third-party network behavior and local timing vary. Gallery full-scroll duration differs between versions, so its total long-task duration is not presented as a fixed-window speed comparison.

## Remaining limits and artifacts

- Exact Blog dates and Gallery event/date/role captions need verified evidence and remain omitted. Historical source titles are attributed to their sources, not new current-degree claims.
- Some external destinations remain access-restricted under C19. Third-party iframe interiors are outside local accessibility assertions.
- Actual screen-reader and physical-touch sessions remain untested under C20. Browser touch emulation passes; the browser zoom shortcut had no effect, while doubled-text checks pass separately.
- No professional dates, awards, publication acceptance statuses or outcomes were invented. The GitHub workflow was edited but not run remotely or used to publish.

Rerun instructions: [tests README](../tests/README.md). Temporary artifacts:

- Final matrix/audits and all-route desktop/mobile previews: `/private/tmp/c25-c31-final-matrix/`
- Gallery/Blog/provider-blocking/accordion checks and previews: `/private/tmp/c25-c31-supporting-final/`
- Lifecycle, contrast, assets and full-home previews: `/private/tmp/c25-c31-interactions/`
- Before/after loading records: `/private/tmp/c25-c31-before/`, `/private/tmp/c25-c31-after-final/`
- Centered-link contrast review: `/private/tmp/c25-c31-centered-link-contrast.json`
- Final production build log: `/private/tmp/c25-c31-build.log`
