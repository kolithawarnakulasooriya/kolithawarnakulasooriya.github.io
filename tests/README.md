# C32 regression checks

Use Node 20 and the existing Yarn lockfile. No application dependencies were added.

```sh
yarn lint
yarn tsc --noEmit --incremental false
# Stop only the development server you started before building.
NEXT_TELEMETRY_DISABLED=1 yarn build
node tests/content.test.cjs
python3 -m http.server 8000 --directory out
```

In another terminal, with Python Playwright installed and Chrome available:

```sh
python3 tests/browser-checks.py --url http://127.0.0.1:8000 --output /tmp/c32-browser
```

The content check requires directory-index exports and checks all eight pages.
The browser check covers five required widths, short landscape, doubled root text
size, semantic/accessibility-tree heading names, Research destinations, icons,
external-link attributes and desktop keyboard access. It records normal/reduced
motion screenshots without asserting that the existing animation respects reduced
motion. `--baseline` records the existing site without C32 assertions.

Overflow, image failures and page errors are recorded separately in `results.json`;
they are not silently treated as passing C32 assertions. Screenshots are viewport
captures, not claims that all below-fold content is visible or usable. These checks
do not provide actual screen-reader, physical touch or browser-zoom coverage.

The browser defaults to installed Chrome; `--channel chromium` selects Playwright
Chromium when installed. An isolated export can be checked with
`node tests/content.test.cjs /absolute/path/to/out` and the same static-server flow.
