"""C32 rendered checks. Requires Playwright; accepts --baseline to record before edits.

Run against the dev server or a standard static server serving out/.
Overflow, image errors and page errors are recorded separately from C32 assertions.
"""
import argparse
import json
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

ROUTES = {"/": "Kolitha Warnakulasooriya", "/me": "Who Am I", "/resume": "Resume",
          "/publications": "Publications", "/projects": "Projects", "/gallery": "Gallery",
          "/blog": "Blog", "/research": "Research"}
SIZES = [(320, 800), (375, 812), (768, 1024), (1024, 768), (1440, 1000), (812, 375)]
RESEARCH_URL = re.search(r'research:\s*"([^"]+)"',
                         (Path(__file__).resolve().parents[1] / "src/app/config.ts").read_text()).group(1)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default="http://127.0.0.1:3000")
    parser.add_argument("--output", default="/private/tmp/c32-browser")
    parser.add_argument("--baseline", action="store_true")
    parser.add_argument("--channel", default="chrome")
    args = parser.parse_args()
    output = Path(args.output)
    output.mkdir(parents=True, exist_ok=True)
    results, failures = [], []
    with sync_playwright() as p:
        browser = p.chromium.launch(channel=args.channel, headless=True)
        page = browser.new_page()
        console, errors = [], []
        page.on("console", lambda msg: console.append(msg.text))
        page.on("pageerror", lambda error: errors.append(str(error)))
        for width, height in SIZES:
            print(f"Checking {width}x{height}", flush=True)
            page.set_viewport_size({"width": width, "height": height})
            for route, title in ROUTES.items():
                console.clear()
                errors.clear()
                response = page.goto(args.url + route, wait_until="domcontentloaded")
                page.wait_for_timeout(1500)
                headings = page.locator("h1,h2,h3,h4,h5,h6").evaluate_all(
                    "els => els.map(e => ({level: Number(e.tagName[1]), text: e.textContent.trim()}))")
                data = page.evaluate("""() => ({
                    overflow: document.documentElement.scrollWidth > innerWidth,
                    scrollWidth: document.documentElement.scrollWidth,
                    font: getComputedStyle(document.body).fontFamily,
                    theme: document.documentElement.dataset.theme,
                    brokenImages: [...document.images].filter(i => i.complete && !i.naturalWidth).map(i => i.src)
                })""")
                record = dict(route=route, width=width, height=height, status=response.status,
                              headings=headings, console=list(console), errors=list(errors), **data)
                results.append(record)
                if not args.baseline:
                    try:
                        assert response.ok, f"HTTP {response.status}"
                        assert [h["text"] for h in headings if h["level"] == 1] == [title], headings
                        assert page.get_by_role("heading", name=title, exact=True, level=1).count() == 1
                        previous = 0
                        for heading in headings:
                            assert heading["text"], "Empty heading"
                            assert heading["level"] <= previous + 1, headings
                            previous = heading["level"]
                        assert not any('does not exist in the library' in text for text in console), console
                        brand = page.locator('header a[href="/"]')
                        assert brand.locator('h1,h2,h3,h4,h5,h6').count() == 0
                        assert brand.locator('span').first.evaluate("""e => {
                            const style = getComputedStyle(e);
                            return parseFloat(style.fontSize) === 2 * parseFloat(getComputedStyle(e.parentElement).fontSize)
                                && style.fontWeight === '700';
                        }"""), "Header brand appearance changed"
                        links = page.locator('a[aria-label*="external site"]')
                        assert links.count() == (2 if route == "/research" else 1)
                        for link in links.all():
                            assert link.get_attribute("href") == RESEARCH_URL
                            assert link.get_attribute("target") == "_blank"
                            assert {"noopener", "noreferrer"} <= set(link.get_attribute("rel").split())
                            assert "opens in a new tab" in link.get_attribute("aria-label")
                            assert link.locator('svg').count() == 1
                        if route == "/research":
                            assert links.nth(0).get_attribute("href") == links.nth(1).get_attribute("href")
                            assert page.locator("iframe").get_attribute("src") == links.nth(1).get_attribute("href")
                            page.locator('a[aria-label^="Open Research site"]').focus()
                            assert page.locator('a[aria-label^="Open Research site"]').evaluate(
                                "e => e === document.activeElement")
                        if width == 1440:
                            brand.focus()
                            assert brand.evaluate("e => e === document.activeElement")
                            # The last header link is Research and must remain reachable by Tab.
                            for _ in range(7):
                                page.keyboard.press("Tab")
                            assert links.first.evaluate("e => e === document.activeElement")
                    except AssertionError as error:
                        failures.append(f"{route} {width}x{height}: {error}")
                if width in (375, 1440):
                    page.screenshot(path=str(output / f'{route.strip("/") or "home"}-{width}.png'))
        # Record enlarged text and reduced-motion observations without claiming C17 repairs.
        for motion in ("no-preference", "reduce"):
            page.emulate_media(reduced_motion=motion)
            page.set_viewport_size({"width": 375, "height": 812})
            page.goto(args.url, wait_until="domcontentloaded")
            page.wait_for_timeout(1500)
            page.screenshot(path=str(output / f"home-motion-{motion}.png"))
        for route in ROUTES:
            page.goto(args.url + route, wait_until="domcontentloaded")
            page.evaluate("""document.documentElement.style.fontSize =
                `${2 * parseFloat(getComputedStyle(document.documentElement).fontSize)}px`""")
            page.wait_for_timeout(300)
            results.append({"route": route, "scenario": "200% text", "overflow": page.evaluate(
                "document.documentElement.scrollWidth > innerWidth")})
        browser.close()
    (output / "results.json").write_text(json.dumps({"results": results, "failures": failures}, indent=2))
    print(f"Recorded {len(results)} scenarios; {len(failures)} C32 failures. Results: {output}")
    if failures:
        raise SystemExit("\n".join(failures))


if __name__ == "__main__":
    main()
