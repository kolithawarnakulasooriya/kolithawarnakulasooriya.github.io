# Website tasks

## Scope and status

Follow [AGENTS.md](AGENTS.md).

Status meanings: **Implemented** means code exists; **Pending** means work remains; **Partial** means some work exists but acceptance criteria remain unmet. Check a task only when its stated acceptance criteria have been verified against the corrected website.

### Professional record — Senior HR reviewer

- [ ] **C01 — Degree and appointment.** Implemented in current content; retain and recheck biography, timeline and metadata: completed Ph.D. in May 2025, appointment from January 2025.
- [ ] **C02 — Industry chronology.** Implemented; retain official Lead/Senior Software Engineer (Associate) titles and CV dates, including Lead through December 2025. Preserve overlaps without explanations invented by the website.
- [ ] **C03 — 4ONSE.** Implemented; verify Research Assistant, Moratuwa/SUPSI, October 2016–January 2018 and supported embedded-monitoring contributions. No copied booking-system bullet.
- [ ] **C04 — Publications.** Partial: CV metadata reconciled. Independently verify publisher records, author order and title-to-DOI correspondence. Network access currently blocks publisher checks; do not mark links verified.

### First visit — both roles

- [ ] **C05 — CV access.** Supplied PDF is retained and its bytes were verified. Keep persistent Academic CV, Research and Contact actions in the restored design; remove the timed CV prompt. Recheck one-click access.
- [ ] **C06 — Role and specialty.** Keep a stable Visiting Assistant Professor / University of South Alabama line and a concise CV-supported specialty without replacing the animated identity.
- [ ] **C07 — Biography.** Retain concise paragraphs and supported contributions. Verify removal of unsupported publication/incident claims and correct WOMAPF workshop attribution.
- [ ] **C08 — Proofreading.** Retain corrected labels and consistent Raven/SwarmX terminology; remove or explain ambiguous country flags. Recheck visible copy across routes.

### Responsive structure — website designer / software engineer

- [x] **C09 — Projects overflow.** Verified responsive project grids and fluid images with no horizontal overflow across all required widths, short landscape and doubled text.
- [x] **C10 — Mobile navigation.** Verified native mobile menu, active-page states, keyboard access, Escape/focus return and resize/navigation close behavior; original header identity retained.
- [x] **C11 — Fluid hero.** Verified original portrait/identity composition on desktop, stacked mobile layout, full name and persistent CV/Research/Contact actions without clipping or overlap.
- [x] **C12 — Margins and scrolling.** Verified normal document flow, consistent gutters, footer after content and removal of unnecessary nested page scrolling across all eight routes.

### Reading and presentation — website designer / software engineer

- [x] **C13 — Readability.** Preserved fonts and existing factual copy; biography now has left-aligned paragraphs, bounded reading width and comfortable line height, verified on phone/desktop.
- [x] **C14 — Colors and contrast.** Existing Once UI palette/tokens retained; approved subtle cursor gradient restored. Contrast, focus visibility and reduced-motion background behavior verified.
- [x] **C15 — Hierarchy.** Retained C32 heading hierarchy, standardized spacing and added descriptive browser titles. All routes pass heading and accessibility checks.
- [x] **C16 — Selected work.** Added three CV-supported stories on Projects only: heterogeneous UAV research, CODEX-Autocomplete and MockableExpress, with inspected assets, precise contributions, status limits and evidence links.

### Accessibility and interaction — website designer / software engineer

- [x] **C17 — Animation.** Ordinary scramble/identity preserved; stable screen-reader text, immediate reduced-motion text, reveal accessibility and timer cleanup verified. Five timer chains stop on SPA unmount and preference changes.
- [x] **C18 — Skills and controls.** Added readable names to existing grouped skills; verified named native controls, visible focus and minimum 44px action targets.
- [ ] **C19 — Destinations.** Partial: corrected two mismatched paper destinations and the expiring Bhumi URL using publisher evidence. Remaining access-restricted destinations stay explicitly unverified; see [destination ledger](docs/C09-C20-destinations.md).
- [ ] **C20 — Keyboard and touch.** Partial: navigation/menu, CV/contact, cards, skip link, landmarks, focus order and browser-emulated touch verified. Actual screen-reader and physical-touch coverage remain pending; browser zoom shortcut had no effect. See [validation report](docs/C09-C20-validation.md).

### CV-supported additions — Senior HR reviewer

- [ ] **C21 — Impact highlights.** Retain precise attribution: 21 algorithms compared, contribution to 34 stations, more than 10 engineers supervised. Place highlights unobtrusively in the original design and link to evidence.
- [ ] **C22 — Teaching and mentoring.** Retain supported courses, PrintSense advising and committee service. Do not invent teaching-term years or outcomes.
- [ ] **C23 — Support, awards and service.** Retain explicit distinctions between research credits, awarded support and pending proposals. Recheck amounts, roles and award labels against CV.
- [ ] **C24 — Publication statuses.** Partial: fields and CV records added. Preserve both 2027 papers and Vision Compass 2026 as status-unconfirmed until evidence is supplied; keep “Are We Safe?” under review.

### Reliability and supporting pages — both roles

- [x] **C25 — Metadata.** Verified personal titles/descriptions, trailing-slash canonicals, Open Graph/Twitter fields and factual Person JSON-LD on all eight exports. Removed demo identity; preserved fonts/theme and Google verification.
- [x] **C26 — Project data.** Verified eleven canonical IDs/statuses, consistent names, one merged LIS record and selected-work references by ID. Each project renders once; unavailable URLs produce no active action.
- [x] **C27 — Loading.** Verified static responsive WebP derivatives, oriented intrinsic dimensions, reserved frames, lazy below-fold media and eager portrait. Measured full-Gallery image body bytes fell from 16,491,345 to 492,782 at tested 1× views; motion observations recorded without a Lighthouse/speed-score claim.
- [x] **C28 — Regression checks.** Node 20 frozen install, media freshness, lint, types, build/export, content, 56 browser scenarios and supporting-page checks pass. CI static gates precede artifact upload; no workflow/deployment triggered. See [validation report](docs/C25-C31-validation.md).
- [x] **C29 — Accordions.** Existing native triggers retained; verified unique IDs/relationships, initial states, Enter/Space, visible focus and collapsed-content exclusion from Tab navigation.
- [x] **C30 — Blog.** Verified responsive source-backed cards, unique titled click-to-load/hide previews, source links, keyboard focus and blocked-provider fallback. Supported summaries/attributions added; exact dates remain omitted pending evidence.
- [x] **C31 — Gallery.** Verified fifteen ordered, optimized responsive images, true oriented dimensions, reserved contain frames and descriptive alt. Ninety width/density selections decode correctly; exact event/date/role captions remain absent pending evidence.
- [x] **C32 — Headings and icons.** Verified route-specific semantic headings, valid Research arrows and external/new-tab cues on all eight routes. Node 20 build/export, content checks and 48 browser viewport checks passed; eight enlarged-text observations recorded. No missing-icon warnings. See [validation and remaining limitations](docs/C32-validation.md).

## Validation and handoff

- [ ] Compare restored visuals with the original reference, including fonts, colors, portrait treatment, cursor background and landing animation.
- [ ] Run `yarn lint`, `yarn tsc --noEmit --incremental false` and `node tests/content.test.cjs`.
- [ ] Check all eight routes at the five required widths, short landscape, enlarged text and actual browser zoom where available.
- [ ] Stop the development server before `yarn build`; resolve font-network prerequisites without changing the requested design.
- [ ] Serve `out/` with a standard static server and verify actual page content, assets, directory-index routing and the exact CV download.
- [ ] Provide corrected desktop/mobile previews and a concise checklist status. Distinguish local changes from deployment; no public deployment has been performed.
