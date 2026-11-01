"""Rendered C09–C20/C32 checks. --baseline only records the original site.

Checks page overflow, flow, semantics, menus, keyboard access, reduced motion and
selected work. Physical touch and actual screen-reader testing remain manual.
"""
import argparse
import json
import re
from pathlib import Path
from playwright.sync_api import sync_playwright, Error as PlaywrightError

ROUTES = {"/": "Kolitha Warnakulasooriya", "/me": "Who Am I", "/resume": "Resume",
          "/publications": "Publications", "/projects": "Projects", "/gallery": "Gallery",
          "/blog": "Blog", "/research": "Research"}
SIZES = [(320, 800), (375, 812), (768, 1024), (1024, 768), (1440, 1000), (812, 375)]
ROOT = Path(__file__).resolve().parents[1]
RESEARCH_URL = re.search(r'research:\s*"([^"]+)"', (ROOT / "src/app/config.ts").read_text()).group(1)
IDENTITIES = ['I am a,', 'Curious Scientist', 'Motivated Researcher', 'Results Driven Software Engineer', 'AI & Robotics Lover']


def metrics(page):
    return page.evaluate("""() => {
        const footer = document.querySelector('footer'), main = document.querySelector('main');
        const visible = e => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden';
        return {
            overflow: document.documentElement.scrollWidth > innerWidth + 1,
            scrollWidth: document.documentElement.scrollWidth,
            viewportWidth: innerWidth,
            font: getComputedStyle(document.body).fontFamily,
            theme: document.documentElement.dataset.theme,
            footerAfterMain: !main || !footer ? false : footer.getBoundingClientRect().top >= main.getBoundingClientRect().bottom - 1,
            brokenImages: [...document.images].filter(i => i.complete && !i.naturalWidth).map(i => i.src),
            clippedControls: [...document.querySelectorAll('a,button')].filter(visible).filter(e => {
                const r = e.getBoundingClientRect();
                return !e.classList.contains('skip-link') && (r.left < -1 || r.right > innerWidth + 1);
            }).map(e => e.textContent.trim() || e.getAttribute('aria-label')),
            nestedScrollers: [...document.querySelectorAll('main *')].filter(e => !(e instanceof HTMLIFrameElement)).filter(e => {
                const style = getComputedStyle(e);
                return ['auto','scroll'].includes(style.overflowY) && e.scrollHeight > e.clientHeight + 1;
            }).map(e => e.tagName + '.' + e.className)
        };
    }""")


def validate(page, title, route, data):
    assert not data['overflow'], f"Horizontal overflow: {data['scrollWidth']} > {data['viewportWidth']}"
    assert not data['clippedControls'], f"Clipped controls: {data['clippedControls']}"
    assert not data['nestedScrollers'], f"Nested page scrolling: {data['nestedScrollers']}"
    assert data['footerAfterMain'], 'Footer overlaps main content'
    assert not data['brokenImages'], data['brokenImages']
    assert 'Inter' in data['font'], data['font']
    assert page.get_by_role('main').count() == 1
    assert page.get_by_role('heading', name=title, exact=True, level=1).count() == 1
    assert page.locator('h1').count() == 1
    headings = page.locator('h1,h2,h3,h4,h5,h6').evaluate_all('els => els.map(e => [Number(e.tagName[1]), e.textContent.trim()])')
    previous = 0
    for level, text in headings:
        assert text, 'Empty heading'
        assert level <= previous + 1, headings
        previous = level
    assert page.locator('header h1').count() == 0
    links = page.locator('a').all()
    for link in links:
        href = link.get_attribute('href') or ''
        assert re.match(r'^(https?://|/|#|mailto:)', href), f'Malformed destination: {href}'
    research = page.locator('a').filter(has=page.locator('svg')).all()
    for link in research:
        if link.get_attribute('href') == RESEARCH_URL:
            assert link.get_attribute('target') == '_blank'
            assert {'noopener', 'noreferrer'} <= set((link.get_attribute('rel') or '').split())
            assert 'opens in a new tab' in (link.get_attribute('aria-label') or '')
    if route == '/projects':
        assert page.locator('[data-selected-work]').count() == 3
        assert page.get_by_role('heading', name='MockableExpress', exact=True).count() == 1
        assert page.locator('main a[aria-hidden="true"]').count() == 0
    if route == '/me':
        assert page.get_by_text('JavaScript', exact=True).count() == 1
        assert page.get_by_text('React Native', exact=True).count() == 1
    current = page.locator('header [aria-current="page"]')
    assert current.count() == (1 if route not in ('/research',) else 0)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--url', default='http://127.0.0.1:3000')
    parser.add_argument('--output', default='/private/tmp/c09-c20-browser')
    parser.add_argument('--baseline', action='store_true')
    parser.add_argument('--channel', default='chrome')
    parser.add_argument('--axe', help='Optional local axe-core JS for contrast/accessibility audit')
    args = parser.parse_args()
    output = Path(args.output)
    output.mkdir(parents=True, exist_ok=True)
    results, failures, audits = [], [], []
    with sync_playwright() as p:
        browser = p.chromium.launch(channel=args.channel, headless=True)
        context = browser.new_context()
        page = context.new_page()
        console, errors = [], []
        page.on('console', lambda msg: console.append(msg.text))
        page.on('pageerror', lambda error: errors.append(str(error)))
        for width, height in SIZES:
            print(f'Checking {width}x{height}', flush=True)
            page.set_viewport_size({'width': width, 'height': height})
            for route, title in ROUTES.items():
                console.clear(); errors.clear()
                response = page.goto(args.url + route, wait_until='domcontentloaded')
                page.wait_for_timeout(2300)
                # Audit the settled visual state, including finite reveal effects.
                # Infinite decorative animations must not block the test runner.
                page.evaluate("""async () => {
                    await document.fonts.ready;
                    await Promise.all(document.getAnimations()
                        .filter(animation => animation.effect?.getComputedTiming().iterations !== Infinity)
                        .map(animation => animation.finished.catch(() => {})));
                }""")
                data = metrics(page)
                results.append(dict(route=route, width=width, height=height, status=response.status, errors=list(errors), **data))
                if not args.baseline:
                    try:
                        assert response.ok, f'HTTP {response.status}'
                        assert not errors, errors
                        assert not any('does not exist in the library' in text for text in console)
                        validate(page, title, route, data)
                        toggle = page.locator('button[aria-controls="primary-navigation"]')
                        nav = page.get_by_role('navigation', name='Main navigation')
                        if width <= 1024:
                            assert toggle.is_visible()
                            assert not nav.is_visible()
                            toggle.focus(); page.keyboard.press('Enter')
                            assert toggle.get_attribute('aria-expanded') == 'true'
                            assert nav.is_visible()
                            assert not metrics(page)['overflow'], 'Open menu overflows'
                            page.keyboard.press('Tab')
                            assert nav.locator('a').first.evaluate('e => e === document.activeElement')
                            page.keyboard.press('Escape')
                            assert not nav.is_visible()
                            assert toggle.evaluate('e => e === document.activeElement')
                        else:
                            assert not toggle.is_visible()
                            assert nav.is_visible()
                            nav.locator('a').first.focus()
                            for _ in range(6): page.keyboard.press('Tab')
                            assert nav.locator('a').last.evaluate('e => e === document.activeElement')
                        if route in ('/me', '/resume'):
                            buttons = page.locator('main button[aria-controls]')
                            ids = buttons.evaluate_all('els => els.map(e => e.getAttribute("aria-controls"))')
                            assert len(ids) == len(set(ids)), ids
                            assert buttons.count() > 0
                            for button in buttons.all():
                                panel = page.locator('[id="' + button.get_attribute('aria-controls') + '"]')
                                assert panel.count() == 1
                                assert panel.get_attribute('aria-labelledby') == button.get_attribute('id')
                                before = button.get_attribute('aria-expanded')
                                button.focus(); page.keyboard.press('Space')
                                assert button.get_attribute('aria-expanded') != before
                                assert panel.is_visible() == (button.get_attribute('aria-expanded') == 'true')
                                page.keyboard.press('Enter')
                                assert button.get_attribute('aria-expanded') == before
                        if args.axe and width in (375, 1440):
                            page.add_script_tag(path=args.axe)
                            audit = page.evaluate("""async () => await axe.run(document, {
                                runOnly: {type:'tag', values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}, iframes:false
                            })""")
                            issues = [{ 'id': v['id'], 'impact': v['impact'], 'description': v['description'],
                                       'nodes': [n['html'] for n in v['nodes']] } for v in audit['violations']]
                            audits.append({'route':route, 'width':width, 'violations':issues,
                                           'incomplete': [v['id'] for v in audit['incomplete']]})
                            assert not issues, f'Accessibility audit: {issues}'
                            assert not any(v['id'] == 'aria-prohibited-attr' for v in audit['incomplete']), 'Unresolved ARIA naming review'
                    except (AssertionError, PlaywrightError) as error:
                        failures.append(f'{route} {width}x{height}: {error}'); print(f'FAIL {failures[-1]}', flush=True)
                if width in (375, 1440):
                    page.evaluate('document.activeElement.blur(); window.scrollTo(0, 0)')
                    page.screenshot(path=str(output / f'{route.strip("/") or "home"}-{width}.png'))
        if not args.baseline:
            try:
                # Skip link is the first keyboard target and moves focus into main.
                page.goto(args.url, wait_until='domcontentloaded')
                page.keyboard.press('Tab')
                assert page.get_by_role('link', name='Skip to main content').evaluate('e => e === document.activeElement')
                page.keyboard.press('Enter')
                assert page.locator('main').evaluate('e => e === document.activeElement')
                # Menu selection closes; resizing must not preserve stale open state.
                page.set_viewport_size({'width':375,'height':812})
                page.get_by_role('button',name='Menu',exact=True).click()
                page.locator('nav a[href="/me"], nav a[href="/me/"]').click()
                page.wait_for_url(re.compile(r'/me/?$'))
                assert not page.get_by_role('navigation',name='Main navigation').is_visible()
                page.get_by_role('button',name='Menu',exact=True).click()
                page.set_viewport_size({'width':1440,'height':1000}); page.wait_for_timeout(100)
                page.set_viewport_size({'width':375,'height':812}); page.wait_for_timeout(100)
                assert not page.get_by_role('navigation',name='Main navigation').is_visible()
            except (AssertionError, PlaywrightError) as error:
                failures.append(f'Keyboard/menu behavior: {error}')
        for route, title in ROUTES.items():
            page.set_viewport_size({'width':375,'height':812})
            page.goto(args.url + route, wait_until='domcontentloaded')
            page.emulate_media(reduced_motion='reduce')
            page.evaluate("document.documentElement.style.fontSize = `${2 * parseFloat(getComputedStyle(document.documentElement).fontSize)}px`")
            page.wait_for_timeout(300)
            data = metrics(page)
            results.append(dict(route=route, scenario='200% text', **data))
            if not args.baseline:
                try: validate(page, title, route, data)
                except (AssertionError, PlaywrightError) as error: failures.append(f'{route} 200% text: {error}')
        # Motion preference changes must take effect without reloading.
        for motion in ('no-preference', 'reduce'):
            page.set_viewport_size({'width':375,'height':812})
            page.emulate_media(reduced_motion=motion)
            page.goto(args.url, wait_until='domcontentloaded')
            page.wait_for_timeout(150)
            visual = page.locator('section[aria-label="Introduction"] span[aria-hidden="true"]')
            samples = []
            for _ in range(3):
                samples.append(visual.evaluate_all('els => els.map(e => e.textContent).filter(Boolean)')); page.wait_for_timeout(80)
            if not args.baseline:
                try:
                    if motion == 'reduce': assert all(sample == IDENTITIES for sample in samples), samples
                    else: assert any(sample != IDENTITIES for sample in samples), 'Ordinary scramble missing'
                    assert all(page.get_by_text(identity,exact=True).count() >= 1 for identity in IDENTITIES)
                except (AssertionError, PlaywrightError) as error: failures.append(f'Motion {motion}: {error}')
            page.wait_for_timeout(1800)
            page.screenshot(path=str(output / f'home-motion-{motion}.png'))
        if not args.baseline:
            try:
                page.emulate_media(reduced_motion='reduce')
                page.wait_for_timeout(100)
                background = page.locator('body > div[aria-hidden="true"]').first
                layer = background.locator('[style*="mask-image"]')
                assert layer.count() == 1
                assert layer.evaluate('e => getComputedStyle(e).opacity') == '0.15'
                before = background.evaluate('e => e.style.getPropertyValue("--cursor-x")')
                page.mouse.move(20,20); page.wait_for_timeout(300)
                assert background.evaluate('e => e.style.getPropertyValue("--cursor-x")') == before
                page.emulate_media(reduced_motion='no-preference'); page.wait_for_timeout(100)
                page.mouse.move(50,50); page.wait_for_timeout(400)
                assert background.evaluate('e => e.style.getPropertyValue("--cursor-x")') != before
            except (AssertionError, PlaywrightError) as error: failures.append(f'Background motion: {error}')
        browser.close()
    (output / 'results.json').write_text(json.dumps({'results':results,'audits':audits,'failures':failures},indent=2))
    print(f'Recorded {len(results)} scenarios; {len(failures)} failures. Results: {output}')
    if failures: raise SystemExit('\n'.join(failures))


if __name__ == '__main__': main()
