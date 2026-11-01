"""Supplement browser-checks.py with lifecycle, emulated touch, contrast and assets.

Touch events here are browser emulation, not a physical-device or screen-reader test.
"""
import argparse
import hashlib
import json
import math
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import quote
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
ROUTES = ['/', '/me', '/resume', '/publications', '/projects', '/gallery', '/blog', '/research']


class Assets(HTMLParser):
    def __init__(self):
        super().__init__(); self.urls = set()
    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag in ('img', 'script') and attrs.get('src', '').startswith('/'):
            self.urls.add(attrs['src'])
        if tag == 'link' and attrs.get('rel') == 'stylesheet':
            self.urls.add(attrs['href'])


def luminance(rgb):
    values = [c / 255 for c in rgb]
    values = [v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4 for v in values]
    return sum(v * weight for v, weight in zip(values, [0.2126, 0.7152, 0.0722]))


def ratio(fg, bg):
    a, b = sorted([luminance(fg), luminance(bg)])
    return (b + 0.05) / (a + 0.05)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--url', default='http://127.0.0.1:8010')
    parser.add_argument('--output', default='/private/tmp/c09-c20-interactions')
    args = parser.parse_args()
    output = Path(args.output); output.mkdir(parents=True, exist_ok=True)
    results = {}
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        context = browser.new_context(viewport={'width':375,'height':812})
        context.add_init_script("""(() => {
            const set = window.setTimeout.bind(window), clear = window.clearTimeout.bind(window);
            window.__scrambleTimers = new Set();
            window.setTimeout = (callback, delay, ...args) => {
                if (delay !== 30 || typeof callback !== 'function') return set(callback, delay, ...args);
                let id = set(() => { window.__scrambleTimers.delete(id); callback(...args); }, delay);
                window.__scrambleTimers.add(id); return id;
            };
            window.clearTimeout = id => { window.__scrambleTimers.delete(id); clear(id); };
        })()""")
        page = context.new_page()
        page.goto(args.url, wait_until='domcontentloaded')
        page.wait_for_function('window.__scrambleTimers.size > 0')
        active = page.evaluate('window.__scrambleTimers.size')
        assert 0 < active <= 5, active
        snapshot = page.locator('section[aria-label="Introduction"]').aria_snapshot()
        for identity in ['I am a,','Curious Scientist','Motivated Researcher','Results Driven Software Engineer','AI & Robotics Lover']:
            assert snapshot.count(identity) == 1, snapshot
        results['stableAccessibleIdentityDuringScramble'] = 'all five original lines appear once in the accessibility tree'
        page.get_by_role('button', name='Menu', exact=True).click()
        page.locator('nav a[href="/projects/"],nav a[href="/projects"]').click()
        page.wait_for_url('**/projects/')
        page.wait_for_timeout(150)
        assert page.evaluate('window.__scrambleTimers.size') == 0
        page.locator('header a[href="/"]').click()
        page.wait_for_function('window.__scrambleTimers.size > 0')
        page.emulate_media(reduced_motion='reduce')
        page.wait_for_timeout(100)
        assert page.evaluate('window.__scrambleTimers.size') == 0
        results['animationLifecycle'] = {'activeChainsAtStart':active, 'afterSpaUnmount':0, 'afterReducedMotionChange':0}

        # Focus traversal starts at the skip link, then brand, then mobile menu.
        page.goto(args.url, wait_until='domcontentloaded')
        focus = []
        for _ in range(6):
            page.keyboard.press('Tab')
            focus.append(page.evaluate('document.activeElement.textContent.trim()'))
        assert focus == ['Skip to main content','Kolitha Warnakulasooriya','Menu','Download CV','Research','Contact'], focus
        assert page.locator(':focus-visible').count() == 1
        outline = page.locator(':focus-visible').evaluate('e => getComputedStyle(e).outlineStyle')
        assert outline != 'none'
        results['mobileKeyboardOrder'] = focus

        # Measure contrast conservatively over a fully white 15% gradient, brighter
        # than any actual theme gradient stop at the same opacity.
        contrast = []
        assets = Assets()
        for route in ROUTES:
            response = context.request.get(args.url + route)
            assert response.ok
            assets.feed(response.text())
            page.goto(args.url + route, wait_until='domcontentloaded')
            values = page.evaluate("""() => {
                const probe = document.createElement('i'); probe.style.color='var(--page-background)';
                document.body.append(probe); const base=getComputedStyle(probe).color; probe.remove();
                const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
                const pairs=new Map();
                while(walker.nextNode()) {
                    const node=walker.currentNode, e=node.parentElement;
                    if(!node.textContent.trim() || !e || e.closest('script,style,svg,.visually-hidden,.skip-link')) continue;
                    const style=getComputedStyle(e);
                    if(e.getClientRects().length && style.visibility!=='hidden') {
                        const backgrounds=[];
                        for(let current=e;current && current!==document.body;current=current.parentElement) {
                            const bg=getComputedStyle(current).backgroundColor;
                            if(bg!=='rgba(0, 0, 0, 0)' && bg!=='transparent') backgrounds.push(bg);
                        }
                        const item={color:style.color,backgrounds}; pairs.set(JSON.stringify(item),item);
                    }
                }
                return {base, pairs:[...pairs.values()], focus:getComputedStyle(document.documentElement).getPropertyValue('--brand-on-background-medium')};
            }""")
            import re
            base = [float(n) for n in re.findall(r'[\d.]+',values['base'])][:3]
            bound = [math.ceil(c * .85 + 255 * .15) for c in base]
            ratios = []
            for pair in values['pairs']:
                background = list(bound)
                for layer in reversed(pair['backgrounds']):
                    rgba = [float(n) for n in re.findall(r'[\d.]+',layer)]
                    alpha = rgba[3] if len(rgba)>3 else 1
                    background = [c * alpha + b * (1-alpha) for c,b in zip(rgba[:3],background)]
                rgba = [float(n) for n in re.findall(r'[\d.]+',pair['color'])]
                alpha = rgba[3] if len(rgba)>3 else 1
                foreground = [c * alpha + b * (1-alpha) for c,b in zip(rgba[:3],background)]
                ratios.append(ratio(foreground,background))
            minimum = min(ratios)
            assert minimum >= 4.5, (route,minimum,values)
            contrast.append({'route':route,'minimumTextRatioAgainstConservativeGradientBound':round(minimum,2),'boundRGB':bound})
        results['contrast'] = contrast
        failures = []
        for asset in sorted(assets.urls):
            response = context.request.head(args.url + quote(asset,safe='/%:?=&'))
            if not response.ok: failures.append([asset,response.status])
        assert not failures, failures
        results['localAssets'] = {'checked':len(assets.urls),'failures':failures}
        pdf = '/files/Kolitha_AI_Engineer.pdf'
        data = context.request.get(args.url+pdf).body()
        assert data == (ROOT/'public'/pdf.lstrip('/')).read_bytes()
        results['cvSHA256'] = hashlib.sha256(data).hexdigest()

        # Browser touch emulation, with actual trusted touch events, explicitly
        # separate from unavailable physical touch-device coverage.
        touch = browser.new_context(has_touch=True,is_mobile=True,viewport={'width':375,'height':812},reduced_motion='reduce')
        tp = touch.new_page(); tp.goto(args.url,wait_until='domcontentloaded')
        tp.get_by_role('button',name='Menu',exact=True).tap()
        tp.locator('nav a[href="/projects/"],nav a[href="/projects"]').tap()
        tp.wait_for_url('**/projects/')
        assert not tp.get_by_role('navigation',name='Main navigation').is_visible()
        tp.locator('header a[href="/"]').tap()
        tp.get_by_role('link',name='Download CV',exact=True).wait_for(state='visible')
        sizes = tp.locator('section[aria-label="Introduction"] a').evaluate_all('els => els.map(e => ({text:e.textContent.trim(),height:e.getBoundingClientRect().height,width:e.getBoundingClientRect().width}))')
        assert len(sizes)==3 and all(item['height']>=44 and item['width']>=44 for item in sizes), sizes
        with tp.expect_request('**/Kolitha_AI_Engineer.pdf'):
            tp.get_by_role('link',name='Download CV',exact=True).tap(no_wait_after=True)
        results['touchEmulation'] = {'menuNavigation':'passed','singleTapCVRequest':'passed','heroTargetSizes':sizes}
        page.set_viewport_size({'width':1440,'height':1000})
        page.goto(args.url,wait_until='domcontentloaded')
        before = page.evaluate('({ratio:devicePixelRatio,width:innerWidth})')
        page.keyboard.press('Meta+Equal'); page.wait_for_timeout(200)
        after = page.evaluate('({ratio:devicePixelRatio,width:innerWidth})')
        results['browserZoomAttempt'] = {'before':before,'after':after,'actualZoomChanged':before!=after}
        page.keyboard.press('Meta+0')
        for width,height in [(375,812),(1440,1000)]:
            page.set_viewport_size({'width':width,'height':height})
            page.goto(args.url,wait_until='domcontentloaded'); page.wait_for_timeout(2500)
            page.screenshot(path=str(output/f'home-full-{width}.png'),full_page=True)
        results['physicalTouch'] = 'not available; no physical touchscreen session'
        results['actualScreenReader'] = 'not available; accessibility-tree and keyboard checks only'
        browser.close()
    (output/'results.json').write_text(json.dumps(results,indent=2))
    print(json.dumps(results,indent=2))


if __name__=='__main__': main()
