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

- [ ] **C09 — Projects overflow.** Retain responsive grids and fluid images; verify no horizontal overflow at 320, 375, 768, 1024 and 1440px after theme restoration.
- [ ] **C10 — Mobile navigation.** Retain accessible menu semantics, active-page state, keyboard access and Escape behavior while restoring the original header identity.
- [ ] **C11 — Fluid hero.** Adapt the original portrait-and-animation composition to phones and enlarged text. Verify full name and actions fit without overlap.
- [ ] **C12 — Margins and scrolling.** Retain normal document flow, consistent gutters and a footer following content. Recheck short landscape heights and remove unnecessary nested scrolling.

### Reading and presentation — website designer / software engineer

- [ ] **C13 — Readability.** Keep the original fonts; use left-aligned biography paragraphs, comfortable line height and readable text width. Recheck long pages on desktop and phone.
- [ ] **C14 — Colors and contrast.** Use the existing Once UI theme and tokens. Verify text, controls and focus contrast without introducing a new palette or hiding the background.
- [ ] **C15 — Hierarchy.** Retain consistent headings and spacing within the original design. Verify one clear h1 per route and logical heading order.
- [ ] **C16 — Selected work.** Present three evidence-backed research/engineering stories using authentic assets and precise roles, contributions and statuses. Keep presentation consistent with existing Once UI styling.

### Accessibility and interaction — website designer / software engineer

- [ ] **C17 — Animation.** Preserve the recognizable ordinary-motion scramble. Recheck stable screen-reader text, reduced-motion behavior and timer cleanup in the restored hero.
- [ ] **C18 — Skills and controls.** Retain readable skill names, meaningful grouping, accessible action names and visible keyboard focus.
- [ ] **C19 — Destinations.** Partial: bare DOI/expiring link removed and unavailable actions made non-clickable. Verify remaining active destinations against their stated papers/projects when network access permits.
- [ ] **C20 — Keyboard and touch.** Recheck navigation, menu, CV, contact, cards, skip link, landmarks and focus order after restoration. Record actual screen-reader/touch coverage; do not infer it from desktop automation.

### CV-supported additions — Senior HR reviewer

- [ ] **C21 — Impact highlights.** Retain precise attribution: 21 algorithms compared, contribution to 34 stations, more than 10 engineers supervised. Place highlights unobtrusively in the original design and link to evidence.
- [ ] **C22 — Teaching and mentoring.** Retain supported courses, PrintSense advising and committee service. Do not invent teaching-term years or outcomes.
- [ ] **C23 — Support, awards and service.** Retain explicit distinctions between research credits, awarded support and pending proposals. Recheck amounts, roles and award labels against CV.
- [ ] **C24 — Publication statuses.** Partial: fields and CV records added. Preserve both 2027 papers and Vision Compass 2026 as status-unconfirmed until evidence is supplied; keep “Are We Safe?” under review.

### Reliability and supporting pages — both roles

- [ ] **C25 — Metadata.** Retain factual titles, descriptions, canonical URLs, social metadata and Person structured data. Recheck rendered metadata after restoring the original layout/fonts.
- [ ] **C26 — Project data.** Retain consistent naming, merged LIS variants and explicit statuses. Verify no unexplained duplicates or empty-link actions.
- [ ] **C27 — Loading.** Retain reserved image space, lazy below-fold media and optimized derivatives. Gallery bytes previously fell by 90%; profile the restored animation and record measurements without claiming an unmeasured before/after score.
- [ ] **C28 — Regression checks.** Retain meaningful content/browser tests; adjust design-specific assertions to the restored website. Run build/export and affected route checks before completion.
- [ ] **C29 — Accordions.** Retain native buttons, unique IDs and correct expanded/panel relationships. Recheck Enter, Space and focus visibility with original styles.
- [ ] **C30 — Blog.** Retain responsive cards, unique iframe titles, source links and optional lazy embeds. Richer article summaries/dates remain pending source verification.
- [ ] **C31 — Gallery.** Retain optimized images, reserved dimensions and descriptive alt. Exact event/date/role captions remain pending verification; do not guess them from filenames or photographs.
- [x] **C32 — Headings and icons.** Verified route-specific semantic headings, valid Research arrows and external/new-tab cues on all eight routes. Node 20 build/export, content checks and 48 browser viewport checks passed; eight enlarged-text observations recorded. No missing-icon warnings. See [validation and remaining limitations](docs/C32-validation.md).

## Validation and handoff

- [ ] Compare restored visuals with the original reference, including fonts, colors, portrait treatment, cursor background and landing animation.
- [ ] Run `yarn lint`, `yarn tsc --noEmit --incremental false` and `node tests/content.test.cjs`.
- [ ] Check all eight routes at the five required widths, short landscape, enlarged text and actual browser zoom where available.
- [ ] Stop the development server before `yarn build`; resolve font-network prerequisites without changing the requested design.
- [ ] Serve `out/` with a standard static server and verify actual page content, assets, directory-index routing and the exact CV download.
- [ ] Provide corrected desktop/mobile previews and a concise checklist status. Distinguish local changes from deployment; no public deployment has been performed.
