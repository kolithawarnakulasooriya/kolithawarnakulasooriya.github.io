"""C25–C31 browser checks beyond the shared responsive/accessibility matrix."""
import argparse
import json
import re
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--url',default='http://127.0.0.1:8026')
    parser.add_argument('--output',default='/private/tmp/c25-c31-supporting')
    args=parser.parse_args();out=Path(args.output);out.mkdir(parents=True,exist_ok=True)
    manifest=json.loads((ROOT/'src/app/media-manifest.json').read_text())
    sources=json.loads((ROOT/'src/app/media-sources.json').read_text())
    results={'images':[],'blog':[],'accordions':[]}
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True)
        for width in (375,768,1440):
            for dpr in (1,2):
                context=browser.new_context(viewport={'width':width,'height':900},device_scale_factor=dpr,reduced_motion='reduce')
                page=context.new_page();requested=[]
                page.on('request',lambda req:requested.append(req.url) if req.resource_type=='image' else None)
                page.goto(args.url+'/gallery/',wait_until='domcontentloaded')
                images=page.locator('main img');assert images.count()==len(sources['gallery'])
                for image in images.all():
                    image.scroll_into_view_if_needed();image.evaluate('image=>image.decode()')
                    value=image.evaluate("""image=>({source:image.getAttribute('src'),current:image.currentSrc,
                        width:Number(image.getAttribute('width')),height:Number(image.getAttribute('height')),
                        alt:image.alt,loading:image.loading,naturalWidth:image.naturalWidth,fit:getComputedStyle(image).objectFit})""")
                    record=manifest['assets'][value['source']]
                    path=urlparse(value['current']).path
                    assert path in [variant['src'] for variant in record['variants']], value
                    assert value['width']==record['width'] and value['height']==record['height'],value
                    assert value['alt'] and value['naturalWidth']>0 and value['loading']=='lazy' and value['fit']=='contain',value
                    response=context.request.head(value['current'])
                    assert response.ok and response.headers['content-type'].startswith('image/webp')
                    results['images'].append(dict(viewport=width,dpr=dpr,**value))
                originals={item['src'] for item in sources['gallery']}
                assert not any(urlparse(url).path in originals for url in requested), 'Original Gallery image fetched despite WebP support'
                assert page.evaluate('document.documentElement.scrollWidth <= innerWidth+1')
                if width in (375,1440) and dpr==1:
                    page.evaluate('scrollTo(0,0)');page.screenshot(path=str(out/f'gallery-{width}.png'))
                # All project thumbnails use the same real responsive candidates.
                if width in (375,1440) and dpr==2:
                    page.goto(args.url+'/projects/',wait_until='domcontentloaded')
                    assert page.locator('[data-project-id]').count()==11
                    assert page.get_by_role('heading',name='LIS Middleware',exact=True).count()==1
                    for image in page.locator('main img').all():
                        image.scroll_into_view_if_needed();image.evaluate('image=>image.decode()')
                        value=image.evaluate('i=>({source:i.getAttribute("src"),current:i.currentSrc,naturalWidth:i.naturalWidth})')
                        assert value['naturalWidth']>0
                        assert urlparse(value['current']).path in [v['src'] for v in manifest['assets'][value['source']]['variants']]
                page.goto(args.url,wait_until='domcontentloaded')
                portrait=page.locator('section[aria-label="Introduction"] img');portrait.evaluate('image=>image.decode()')
                assert portrait.get_attribute('loading')=='eager'
                assert portrait.get_attribute('fetchpriority')=='high'
                assert '/optimized/' in portrait.evaluate('i=>i.currentSrc')
                context.close()
        for width in (375,1440):
            context=browser.new_context(viewport={'width':width,'height':900},reduced_motion='reduce')
            # Reproduce an embedding provider refusing access. Local source actions
            # and preview controls must stay usable independently of that provider.
            external=[]
            def route_request(route):
                if route.request.url.startswith(args.url):route.continue_()
                else:
                    external.append(route.request.url)
                    route.fulfill(status=403,content_type='text/html',body='<p>Provider unavailable in test</p>')
            context.route('**/*',route_request)
            page=context.new_page();page.goto(args.url+'/blog/',wait_until='domcontentloaded');page.wait_for_timeout(500)
            assert page.locator('main article').count()==4
            assert page.locator('main iframe').count()==0 and not external
            assert page.locator('main time').count()==0
            buttons=page.locator('main button[aria-controls]')
            assert buttons.count()==4
            titles=[]
            for button in buttons.all():
                assert button.bounding_box()['height'] >= 44, 'Preview control is too small for touch'
                panel=page.locator('[id="'+button.get_attribute('aria-controls')+'"]')
                assert button.get_attribute('aria-expanded')=='false' and not panel.is_visible()
                button.focus();page.keyboard.press('Enter')
                assert button.get_attribute('aria-expanded')=='true' and panel.is_visible()
                iframe=panel.locator('iframe');assert iframe.count()==1
                title=iframe.get_attribute('title');assert title and title not in titles;titles.append(title)
                src=iframe.get_attribute('src');assert src.startswith('https://') and '&amp;' not in src
                page.wait_for_timeout(300)
                assert src in external, f'Preview request was not dispatched: {src}'
                source=button.locator('xpath=ancestor::article').get_by_role('link')
                assert source.is_visible() and source.get_attribute('target')=='_blank'
                assert {'noopener','noreferrer'}<=set(source.get_attribute('rel').split())
                assert page.evaluate('document.documentElement.scrollWidth <= innerWidth+1')
                page.keyboard.press('Space')
                assert button.get_attribute('aria-expanded')=='false' and not panel.is_visible()
                assert panel.locator('iframe').count()==0 and button.evaluate('e=>e===document.activeElement')
            page.evaluate('document.activeElement.blur();scrollTo(0,0)')
            page.screenshot(path=str(out/f'blog-{width}.png'),full_page=width==375)
            results['blog'].append({'viewport':width,'initialIframeRequests':0,'previewTitles':titles,'blockedProviderFallback':'source links and hide controls remain usable'})
            # Existing accordion API/behavior remains intact; verify rather than rewrite.
            for route in ('/me/','/resume/'):
                page.goto(args.url+route,wait_until='domcontentloaded')
                buttons=page.locator('main button[aria-controls]')
                expected=[value=='true' for value in re.findall(r'isOpen:\s*(true|false)',(ROOT/'src/app/config.ts').read_text())] if route=='/me/' else [False]*buttons.count()
                assert buttons.count()==len(expected) and buttons.count()>0
                ids=[]
                for index,button in enumerate(buttons.all()):
                    panelID=button.get_attribute('aria-controls');ids.append(panelID)
                    panel=page.locator('[id="'+panelID+'"]')
                    assert panel.count()==1 and panel.get_attribute('aria-labelledby')==button.get_attribute('id')
                    assert (button.get_attribute('aria-expanded')=='true')==expected[index]
                    button.focus();page.keyboard.press('Space')
                    assert button.evaluate('e=>e.matches(":focus-visible")')
                    assert button.evaluate('e=>getComputedStyle(e).outlineStyle')!='none'
                    assert float(button.evaluate('e=>getComputedStyle(e).outlineWidth').replace('px',''))>=2
                    if button.get_attribute('aria-expanded')=='true':page.keyboard.press('Enter')
                    assert panel.get_attribute('hidden') is not None and not panel.is_visible()
                    page.keyboard.press('Tab')
                    assert panel.evaluate('e=>!e.contains(document.activeElement)')
                    button.focus()
                    if expected[index]:page.keyboard.press('Enter')
                    assert panel.is_visible()==expected[index]
                assert len(ids)==len(set(ids))
                results['accordions'].append({'route':route,'viewport':width,'count':len(ids),'initialStateFocusAndCollapsedTabChecks':'passed'})
            context.close()
        browser.close()
    (out/'results.json').write_text(json.dumps(results,indent=2))
    print(f"Decoded {len(results['images'])} Gallery candidates across widths/DPRs; Blog and Accordion checks passed. {out}")


if __name__=='__main__':main()
