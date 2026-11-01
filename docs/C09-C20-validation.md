# C09–C20 implementation and validation

Validated October 31, 2026. Local changes only; no deployment or commit was performed.

## Outcome and task status

**C09–C18 are verified. C19 and C20 remain partial**, with the limits below recorded in `Tasks.md`. C32 remains complete and its headings/icons were rechecked.

| Requirements | Implemented behavior / evidence |
|---|---|
| C09, C12 | Fluid project/Gallery layouts, stacked Resume, bounded embeds, consistent gutters and normal document scrolling. Footer follows content; no page overflow or unnecessary nested page scrollers in any of 56 scenarios. |
| C10, C11 | Original header identity retained, accessible inline mobile menu at 1024px and below, active state, Escape/focus return, navigation/resize close. Original portrait/identity composition remains on desktop and stacks on mobile; persistent CV/Research/Contact actions replace the timed prompt. |
| C13–C15 | Left-aligned biography paragraphs with 65ch maximum width and 1.7 line height. Original fonts/theme retained; subtle token-based cursor gradient enabled as approved. Logical headings, descriptive document titles and token spacing verified on all routes. |
| C16 | Three selected-work stories at the top of Projects only, with existing inspected assets, supported contributions, explicit status limits and CV/repository evidence. Selected projects appear once; unrelated project order is preserved. |
| C17 | Original identity lines, scramble characters and timing retained. Changing text has a stable accessible equivalent. Reduced motion gives immediate final text and a stationary background; reveals do not hide meaningful accessible content. Five timer chains become zero on SPA unmount and motion-preference changes. |
| C18 | Explicit labels for skill icons, meaningful groups, named native controls and visible focus. Hero action targets measured at 44px high; Menu, navigation, footer and details controls also use a 44px minimum. |
| C19 — partial | Two incorrect paper destinations/adjacent citation fields corrected from publisher deposits; expiring CloudFront URL replaced by stable Bhumi DOI. Other restricted destinations remain unverified rather than labelled broken. See the [source ledger](C09-C20-destinations.md). |
| C20 — partial | Automated keyboard/menu/accordion/landmark/focus checks and browser-emulated touch navigation/CV request pass. Actual screen-reader and physical-touch sessions were not performed. These observations do not establish complete manual accessibility coverage. |

The limited C05/C29 overlaps were necessary for predictable hero actions and keyboard access. Their separate checklist statuses were not changed. Gallery now has descriptions of visible subjects, with no inferred event/date/role captions. No broad professional-date or biography-claim reconciliation was attempted; existing CV/task/configuration conflicts remain separate work.

## Validation results

- **Node 20.20.2:** production build/export, `yarn lint`, `yarn tsc --noEmit --incremental false` and `node tests/content.test.cjs` pass. Lint retains three existing warnings: GlitchFx hook dependencies and two Logo image warnings. No package or lockfile changes.
- **56 browser scenarios:** eight routes at 320, 375, 768, 1024 and 1440px, 812×375 landscape, and doubled root text at 375px. Zero horizontal overflow, clipped controls, page errors or missing images recorded. The baseline had overflow in 33 scenarios.
- **16 axe-core 4.14.0 audits:** all eight routes at 375/1440px, zero violations and zero incomplete items. A manual-review naming issue was corrected by assigning supported group roles to profile/evidence containers. This is an automated audit result, not a blanket accessibility-conformance claim.
- **Interaction checks:** keyboard order starts skip link → name → Menu → Download CV → Research → Contact. Native accordion Enter/Space relationships, focus indicators, mobile menu selection/Escape/resize and animation lifecycle pass. Browser-emulated touch navigation and a single-tap CV request pass.
- **Contrast:** computed text colors meet 4.5:1 even with a conservative fully white 15% gradient bound behind transparent content, while opaque controls use their actual surfaces. Minimum measured ratio: **11.44:1**. Cursor movement and stationary reduced-motion behavior were checked independently.
- **Static export:** all eight directory-index routes serve intended pages, including Gallery; 109 local image/JS/CSS assets respond successfully. Existing PDF bytes match SHA-256 `b13c63b4562ef057e50ec163c6fd9978b56960d128c629b2fc33b867dc820f04`.
- **Visual review:** the UI reviewer compared desktop/mobile views with the original reference and confirmed fonts, dark/cyan token identity, circular 330px desktop portrait, original identity lines, subtle background, readable cards and footer flow. Additional enlarged-text/landscape previews were inspected.

The user-owned development server was left running. To prevent shared `.next` corruption, builds and static browser checks used a matching temporary source snapshot at `/private/tmp/c09-c20-export`. The verified export was copied to this checkout's ignored `out/`; content checks pass there too. The previous export was preserved separately. Application dependencies were already installed from the frozen Yarn lockfile.

## Limits and remaining evidence

- Access restrictions prevent completion of C19 for some publisher/profile/project destinations. HTTP failures alone were not treated as proof of broken links; exact verdicts and primary sources are in the ledger.
- Physical-device touch and actual screen-reader announcements are **untested**. Touch emulation, accessibility-tree checks and axe do not substitute for them; C20 stays unchecked.
- The browser zoom shortcut did not change viewport or device-pixel metrics in headless Chrome. Actual browser zoom is unverified; doubled root text is a separate passing test.
- Third-party iframe interiors are outside local layout/accessibility assertions. Their wrappers, titles and source actions were checked.
- No publication-status, professional-date, Gallery event or Blog-summary facts were invented. No loading score or unmeasured performance improvement is claimed.

## Artifacts and rerunning

See [test instructions](../tests/README.md). Temporary artifacts:

- Final matrix, audits and desktop/mobile previews: `/private/tmp/c09-c20-complete/`
- Lifecycle/touch/contrast/assets/CV evidence and full home previews: `/private/tmp/c09-c20-interactions-final/`
- Enlarged-text and landscape previews: `/private/tmp/c09-c20-extra-previews/`
- Baseline captures: `/private/tmp/c09-c20-baseline/`
- Final build log: `/private/tmp/c09-c20-build.log`

All implementation files remain in the existing checkout; no Git worktree, replacement theme or new application dependency was introduced.
