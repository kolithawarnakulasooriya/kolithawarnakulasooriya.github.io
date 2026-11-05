// Validate real static-export HTML. No source-shape snapshots.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = process.argv[2] || 'out';
const repo = path.join(__dirname, '..');
const loadData = file => {
  const sandbox = { exports: {} };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(repo, file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText, sandbox);
  return sandbox.exports;
};
const { Configs } = loadData('src/app/config.ts');
const { blogSources } = loadData('src/app/blog/sources.ts');
const mediaSources = JSON.parse(fs.readFileSync(path.join(repo, 'src/app/media-sources.json'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.join(repo, 'src/app/media-manifest.json'), 'utf8'));
assert.deepEqual(new Set(Configs.projects.map(project => project.image)), new Set(mediaSources.projects.map(image => image.src)), 'Project/media source lists diverged');
assert(manifest.assets[mediaSources.portrait.src], 'Portrait derivative entry missing');
const origin = 'https://kolithawarnakulasooriya.github.io';
const name = 'Kolitha Warnakulasooriya';
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1], decode(m[2])]));
assert.equal(new Set(Configs.projects.map(p => p.id)).size, Configs.projects.length, 'Duplicate project IDs');
assert.equal(new Set(Configs.projects.map(p => p.title)).size, Configs.projects.length, 'Duplicate canonical project titles');
for (const project of Configs.projects) {
  assert(project.id && project.title && project.status.trim(), 'Project identity/status missing');
  if (project.src) assert.match(project.src, /^https:\/\//);
}
assert.equal(Configs.projects.filter(p => p.id === 'lis-middleware').length, 1);
const lis = Configs.projects.find(p => p.id === 'lis-middleware');
for (const analyzer of ['Hitachi 911', '912', 'Mythic18', 'Mythic22']) assert(lis.heading.includes(analyzer));
assert.equal(new Set(Configs.selectedWork.map(p => p.projectId)).size, 3);
for (const work of Configs.selectedWork) assert(Configs.projects.some(p => p.id === work.projectId), 'Dangling selected-work reference');
assert.equal(new Set(blogSources.map(p => p.id)).size, blogSources.length);
for (const source of blogSources) {
  assert(source.title && source.attribution && source.summary);
  assert.match(source.sourceUrl, /^https:\/\//);
  if (source.previewKind) {
    assert.match(source.previewUrl, /^https:\/\//);
    assert(!source.previewUrl.includes('&amp;'), 'Literal HTML entity in preview URL');
  } else {
    assert.equal(source.previewUrl, '', 'Source without a preview must not have a preview URL');
  }
}
for (const source of [...mediaSources.gallery, ...mediaSources.projects, mediaSources.portrait]) {
  const asset = manifest.assets[source.src];
  assert(asset && asset.width > 0 && asset.height > 0 && asset.variants.length);
  assert.equal(new Set(asset.variants.map(v => v.width)).size, asset.variants.length);
  for (const variant of asset.variants) {
    assert(variant.width <= asset.width, 'Upscaled derivative');
    assert(variant.height > 0 && variant.bytes > 0);
    assert(fs.existsSync(path.join(repo, 'public', variant.src)), `Missing derivative ${variant.src}`);
  }
}
const researchURL = fs.readFileSync(path.join(__dirname, '../src/app/config.ts'), 'utf8').match(/research:\s*"([^"]+)"/)[1];
const routes = { '': 'Kolitha Warnakulasooriya', me: 'Who Am I', resume: 'Resume', publications: 'Publications',
  projects: 'Projects', gallery: 'Gallery', blog: 'Blog', research: 'Research' };
const text = html => html.replace(/<[^>]*>/g, '').trim();
for (const [route, title] of Object.entries(routes)) {
  const file = path.join(root, route, 'index.html');
  assert(fs.existsSync(file), `Missing directory-index export: /${route}`);
  const html = fs.readFileSync(file, 'utf8');
  assert(html.includes(`<title>${title}`), `Missing descriptive document title: ${route}`);
  const documentTitle = decode(html.match(/<title>([^<]+)<\/title>/)[1]);
  const metadata = [...html.matchAll(/<meta\b[^>]*>/g)].map(m => attributes(m[0]));
  const meta = key => metadata.filter(m => m.name === key || m.property === key);
  const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map(m => attributes(m[0])).filter(m => m.rel === 'canonical');
  const expectedURL = `${origin}/${route ? route + '/' : ''}`;
  assert.deepEqual(canonical.map(c => c.href), [expectedURL], route);
  for (const key of ['description', 'og:title', 'og:description', 'og:url', 'og:type', 'og:site_name', 'og:image', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) {
    assert.equal(meta(key).length, 1, `Missing/duplicate ${key}: ${route}`);
    assert(meta(key)[0].content, `Empty ${key}: ${route}`);
  }
  assert.equal(meta('og:url')[0].content, expectedURL);
  assert.equal(meta('og:title')[0].content, documentTitle);
  assert.equal(meta('twitter:title')[0].content, documentTitle);
  assert.equal(meta('og:site_name')[0].content, name);
  assert.equal(meta('og:type')[0].content, 'website');
  assert.equal(meta('twitter:card')[0].content, 'summary');
  assert.equal(meta('description')[0].content, meta('og:description')[0].content);
  assert.equal(meta('google-site-verification').length, 1);
  const structured = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  assert.equal(structured.length, 1, `Unexpected structured-data records: ${route}`);
  const person = structured[0];
  assert.equal(person['@type'], 'Person'); assert.equal(person.name, name);
  assert.equal(person['@id'], origin + '/#person'); assert.equal(person.url, origin + '/');
  assert.equal(person.image, origin + '/images/avatar.jpg');
  assert.equal(person.email, 'kolitha.warnakulasooriya@outlook.com');
  assert(person.sameAs.includes('https://github.com/kolithawarnakulasooriya'));
  assert(person.sameAs.includes('https://orcid.org/0000-0002-4619-7027'));
  assert(!/demo\.once-ui\.com|lorant@once-ui\.com|_onceui|linkedin\.com\/company\/once-ui|Once UI - Your/.test(JSON.stringify([metadata, structured])));
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g)].map(m => ({ level: Number(m[1]), text: text(m[2]) }));
  assert.deepEqual(headings.filter(h => h.level === 1).map(h => h.text), [title], route);
  let previous = 0;
  for (const h of headings) { assert(h.text, `Empty heading: ${route}`); assert(h.level <= previous + 1, `Skipped heading: ${route}`); previous = h.level; }
  assert.match(html, /<main\b[^>]*id="main-content"/);
  assert.match(html, /href="#main-content"/);
  assert.match(html, /<nav\b[^>]*aria-label="Main navigation"/);
  assert.match(html, /aria-controls="primary-navigation"/);
  assert.equal((html.match(/<footer\b/g) || []).length, 1);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length, `Duplicate IDs: ${route}`);
  const anchors = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
  for (const [, attrs] of anchors) {
    const href = attrs.match(/href="([^"]*)"/);
    assert(href && /^(https?:\/\/|\/|#|mailto:)/.test(href[1]), `Empty or malformed destination in ${route}`);
    assert(!href[1].includes('cloudfront.net'), `Expiring publication URL: ${route}`);
  }
  const researchLinks = anchors.filter(m => m[1].includes(`href="${researchURL}"`) && m[1].includes('external site'));
  assert(researchLinks.length >= 1, route);
  for (const [, attrs, content] of researchLinks) {
    assert.match(attrs, /target="_blank"/); assert.match(attrs, /rel="noopener noreferrer"/);
    assert.match(attrs, /opens in a new tab/); assert.match(content, /<svg\b/);
  }
  if (!route) {
    assert(!html.includes("Haven&#x27;t you found my resume yet?"));
    assert.match(html, />Download CV \(PDF\)</); assert.match(html, />Contact</);
    for (const identity of ['Curious Scientist', 'Motivated Researcher', 'Results Driven Software Engineer', 'AI &amp; Robotics Lover']) assert(html.includes(identity));
  }
  if (route === 'projects') {
    assert.equal((html.match(/data-selected-work=/g) || []).length, 3);
    assert.match(html, /Selected work/); assert.match(html, /More projects/);
    const workTitles = headings.filter(h => h.level === 3).map(h => h.text);
    for (const title of ['CODEX-Autocomplete', 'MockableExpress']) assert.equal(workTitles.filter(t => t === title).length, 1);
    assert.equal(workTitles.length, Configs.projects.length, 'Lost/duplicate rendered projects');
    assert.equal(workTitles.filter(t => t === 'LIS Middleware').length, 1);
    assert(workTitles.includes('Raven OS') && workTitles.includes('SwarmX'));
    assert(!workTitles.includes('Ravan OS') && !workTitles.includes('Swarm X'));
    const renderedIDs = [...html.matchAll(/data-project-id="([^"]+)"/g)].map(m => m[1]);
    assert.equal(renderedIDs.length, Configs.projects.length);
    assert.equal(new Set(renderedIDs).size, renderedIDs.length);
  }
  if (route === 'gallery') {
    assert.equal((html.match(/<picture\b/g) || []).length, mediaSources.gallery.length);
    for (const image of mediaSources.gallery) assert(html.includes(image.alt.replace(/&/g, '&amp;')), `Missing Gallery alt: ${image.src}`);
    assert.match(html, /type="image\/webp"/);
    assert.match(html, /srcSet="[^"]+480w/);
  }
  if (route === 'blog') {
    assert.equal((html.match(/<article\b/g) || []).length, blogSources.length);
    assert.equal((html.match(/<iframe\b/g) || []).length, 5, 'Blog iframe loaded before request');
    for (const source of blogSources) assert(html.includes(source.sourceUrl.replace(/&/g, '&amp;')));
  }
  if (route === 'me') {
    assert.match(html, />JavaScript</); assert.match(html, />React Native</);
    assert(!html.includes('aria-controls="accordion-content"'));
    assert.match(html, /<button[^>]*aria-expanded=/);
  }
}
console.log('Metadata, media, project/Blog data and existing exported content checks passed for all eight routes.');
