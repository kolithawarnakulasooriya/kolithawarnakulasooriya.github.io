# Website regression checks

Use Node 20 and Yarn. Install application dependencies only when needed with
`yarn install --frozen-lockfile`; do not regenerate either lockfile.

```sh
yarn lint
yarn tsc --noEmit --incremental false
# Stop only the development server you started before building.
NEXT_TELEMETRY_DISABLED=1 yarn build
node tests/content.test.cjs
```

In another terminal, using a Python environment with Playwright and Chrome:

```sh
python3 tests/browser-checks.py --url http://127.0.0.1:8000 --output /tmp/site-browser
python3 tests/interaction-checks.py --url http://127.0.0.1:8000 --output /tmp/site-interactions
python3 tests/supporting-pages.py --url http://127.0.0.1:8000 --output /tmp/site-supporting
```

The main browser script defaults to installed Chrome. Use `--channel chromium`
with an installed Playwright Chromium instead. `--baseline` records the original
site without acceptance assertions. `--axe /absolute/path/to/axe.min.js` enables
axe-core checks on desktop/mobile across all routes; this tooling does not need to
become an application dependency.

- **Content:** eight directory-index exports, document titles, ordered headings,
  landmarks, navigation, valid destinations, Research cues, selected stories and labels.
- **Browser:** five widths, short landscape, doubled text, no page overflow/clipped
  controls, footer flow, native accordion keyboard behavior, mobile menu/Escape,
  active links, focus return, motion preferences and cursor-background behavior.
- **Interactions:** cancellable scramble timers after SPA unmount/preference change,
  keyboard order/focus, conservative gradient contrast, actual local asset responses,
  exact CV bytes and single-tap CV request, browser-emulated touch navigation, action
  target sizes and an attempted browser zoom shortcut.

Artifacts include JSON results and desktop/mobile screenshots. External iframe
contents are outside local accessibility/overflow assertions; their titles and
wrappers are checked. External destination evidence is in the separate review ledger.
Physical touch and actual screen-reader coverage are recorded explicitly and cannot
be inferred from touch emulation, axe or the accessibility tree. A zoom shortcut that
does not change browser metrics is reported as unavailable, not as a passing zoom test.

An isolated source snapshot can be built when another development server is writing
`.next`; pass its output directory to the content test and static server. Verify the
snapshot matches the checkout before treating its results as evidence.

## Metadata, media and supporting pages (C25–C31)

The content test parses exported canonical/social metadata and Person JSON-LD,
checks canonical project identities/statuses/LIS consolidation, and validates media
and Blog records. The supporting-page browser test decodes every Gallery image at
375/768/1440px and device-pixel ratios 1 and 2, checks actual WebP candidates/MIME
types and intrinsic dimensions, verifies click-to-load Blog previews with a blocked
provider, and checks accordion initial states, focus and collapsed Tab exclusion.

Media originals are preserved. After changing a source image or media inventory:

```sh
yarn media:generate
yarn media:check
```

Commit the generated derivatives and `src/app/media-manifest.json` with the source
change. Freshness checks compare source hashes, generator settings, actual encoded
dimensions, file sizes and candidates; they do not require cross-platform re-encoding.
CI uses frozen-lockfile Yarn installation, media freshness, lint, TypeScript, build
and exported-content gates before artifact upload. Browser checks are run separately.

For loading measurements, serve baseline and updated exports separately and run the
same command against each, with the same Chrome version and machine conditions:

```sh
python3 tests/profile-loading.py --url http://127.0.0.1:8000 --output /tmp/site-profile --repeats 3
```

This uses cold contexts, cache disabling, 4× CPU throttling, 40ms latency and
500,000/250,000 B/s download/upload limits. It records a five-second initial window,
then scrolls and decodes the complete Gallery. Motion observations use five seconds
to settle and a three-second cursor window. Image transfer, request counts, long
tasks, LCP observations and the sum of observed non-input layout shifts are local
measurements—not Lighthouse scores or guaranteed production timings. Gallery full
scroll duration varies; do not compare its total long-task duration as a fixed-window
speed benchmark. Third-party request counts are observed, not guaranteed constants.
