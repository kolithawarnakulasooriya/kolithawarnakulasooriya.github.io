"""Repeatable local loading/animation observations; not a historical Lighthouse score.

Use the same browser, cold contexts and CDP throttle for baseline and final exports.
Gallery is fully scrolled/decoded. Third-party iframe behavior is recorded separately.
"""
import argparse
import json
import statistics
from pathlib import Path
from playwright.sync_api import sync_playwright


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--url',required=True)
    parser.add_argument('--output',required=True)
    parser.add_argument('--repeats',type=int,default=3)
    args=parser.parse_args()
    output=Path(args.output);output.mkdir(parents=True,exist_ok=True)
    runs=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True)
        for width in (375,1440):
            for route in ('/gallery/','/blog/','/'):
                for repeat in range(args.repeats):
                    print(f'{width} {route} run {repeat+1}',flush=True)
                    context=browser.new_context(viewport={'width':width,'height':812 if width==375 else 1000})
                    context.add_init_script("""window.__loadingMetrics={longTasks:[],shifts:[],lcp:[]};
                        try { new PerformanceObserver(list=>window.__loadingMetrics.longTasks.push(...list.getEntries().map(e=>e.duration))).observe({type:'longtask',buffered:true}); } catch{}
                        try { new PerformanceObserver(list=>window.__loadingMetrics.shifts.push(...list.getEntries().filter(e=>!e.hadRecentInput).map(e=>e.value))).observe({type:'layout-shift',buffered:true}); } catch{}
                        try { new PerformanceObserver(list=>window.__loadingMetrics.lcp.push(...list.getEntries().map(e=>e.startTime))).observe({type:'largest-contentful-paint',buffered:true}); } catch{}
                    """)
                    page=context.new_page();page.set_default_timeout(90000)
                    cdp=context.new_cdp_session(page)
                    cdp.send('Network.enable')
                    cdp.send('Network.setCacheDisabled',{'cacheDisabled':True})
                    cdp.send('Network.emulateNetworkConditions',{'offline':False,'latency':40,'downloadThroughput':500000,'uploadThroughput':250000})
                    cdp.send('Emulation.setCPUThrottlingRate',{'rate':4})
                    responses=[]
                    page.on('response',lambda r:responses.append({'url':r.url,'type':r.request.resource_type,'status':r.status,
                        'bytes':int(r.headers.get('content-length','0')) if r.headers.get('content-length','0').isdigit() else 0}))
                    response=page.goto(args.url+route,wait_until='domcontentloaded',timeout=120000)
                    page.wait_for_timeout(5000)
                    initial=list(responses)
                    if route=='/gallery/':
                        for image in page.locator('main img').all():
                            image.scroll_into_view_if_needed()
                            image.evaluate('image => image.decode()')
                        page.wait_for_timeout(250)
                    values=page.evaluate("""() => ({...window.__loadingMetrics,
                        images:[...document.querySelectorAll('main img')].map(i=>({src:i.currentSrc,complete:i.complete,naturalWidth:i.naturalWidth})),
                        resources:performance.getEntriesByType('resource').map(e=>({url:e.name,bytes:e.encodedBodySize,transfer:e.transferSize,type:e.initiatorType}))
                    })""")
                    origin=args.url.rstrip('/')
                    localImages=[r for r in responses if r['type']=='image' and r['url'].startswith(origin)]
                    initialImages=[r for r in initial if r['type']=='image' and r['url'].startswith(origin)]
                    record={'width':width,'route':route,'repeat':repeat+1,'status':response.status,
                        'initialLocalImageBytes':sum(r['bytes'] for r in initialImages),
                        'allLocalImageBytes':sum(r['bytes'] for r in localImages),
                        'initialRequests':len(initial),'allRequests':len(responses),
                        'initialThirdPartyRequests':sum(not r['url'].startswith(origin) for r in initial),
                        'thirdPartyRequests':sum(not r['url'].startswith(origin) for r in responses),
                        'longTaskCount':len(values['longTasks']),'longTaskTotalMs':sum(values['longTasks']),
                        'largestLongTaskMs':max(values['longTasks'],default=0),
                        'observedLayoutShiftSum':sum(values['shifts']),
                        'lastLCPMs':values['lcp'][-1] if values['lcp'] else None,
                        'images':values['images']}
                    runs.append(record)
                    (output/'results.json').write_text(json.dumps({'conditions':{'cpuRate':4,'latencyMs':40,'downloadBytesPerSecond':500000,'uploadBytesPerSecond':250000,'repeats':args.repeats},'runs':runs},indent=2))
                    context.close()
        motion=[]
        for preference in ('no-preference','reduce'):
            for repeat in range(args.repeats):
                context=browser.new_context(viewport={'width':1440,'height':1000},reduced_motion=preference)
                context.add_init_script("""window.__longTasks=[];new PerformanceObserver(l=>window.__longTasks.push(...l.getEntries().map(e=>({start:e.startTime,duration:e.duration})))).observe({type:'longtask',buffered:true});""")
                page=context.new_page();cdp=context.new_cdp_session(page)
                cdp.send('Emulation.setCPUThrottlingRate',{'rate':4})
                page.goto(args.url,wait_until='domcontentloaded');page.wait_for_timeout(5000)
                settled=page.evaluate('performance.now()')
                for x,y in ((50,50),(500,300),(1200,800)):
                    page.mouse.move(x,y);page.wait_for_timeout(1000)
                values=page.evaluate('window.__longTasks')
                motion.append({'preference':preference,'repeat':repeat+1,
                    'initialLongTaskCount':len([e for e in values if e['start']<settled]),
                    'initialLongTaskTotalMs':sum(e['duration'] for e in values if e['start']<settled),
                    'settledCursorWindowLongTaskCount':len([e for e in values if e['start']>=settled]),
                    'settledCursorWindowLongTaskTotalMs':sum(e['duration'] for e in values if e['start']>=settled)})
                context.close()
        browser.close()
    data=json.loads((output/'results.json').read_text());data['motion']=motion
    summary=[]
    for width in (375,1440):
        for route in ('/gallery/','/blog/','/'):
            group=[r for r in runs if r['width']==width and r['route']==route]
            summary.append({'width':width,'route':route,**{key:statistics.median(r[key] for r in group) for key in ('initialLocalImageBytes','allLocalImageBytes','initialRequests','initialThirdPartyRequests','longTaskTotalMs','observedLayoutShiftSum')}})
    data['medians']=summary
    (output/'results.json').write_text(json.dumps(data,indent=2))
    print(json.dumps(summary,indent=2))


if __name__=='__main__':main()
