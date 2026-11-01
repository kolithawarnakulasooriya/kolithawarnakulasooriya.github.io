# Website regression checks

Use Node 20 and Yarn. Install application dependencies only when needed with
`yarn install --frozen-lockfile`; do not regenerate either lockfile.

```sh
yarn lint
yarn tsc --noEmit --incremental false
# Stop only the development server you started before building.
NEXT_TELEMETRY_DISABLED=1 yarn build
node tests/content.test.cjs
python3 -m http.server 8000 --directory out
```

In another terminal, using a Python environment with Playwright and Chrome:

```sh
python3 tests/browser-checks.py --url http://127.0.0.1:8000 --output /tmp/site-browser
python3 tests/interaction-checks.py --url http://127.0.0.1:8000 --output /tmp/site-interactions
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
