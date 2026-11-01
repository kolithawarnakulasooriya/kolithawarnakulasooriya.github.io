// Validate real static-export HTML. No source-shape snapshots.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = process.argv[2] || 'out';
const researchURL = fs.readFileSync(path.join(__dirname, '../src/app/config.ts'), 'utf8').match(/research:\s*"([^"]+)"/)[1];
const routes = { '': 'Kolitha Warnakulasooriya', me: 'Who Am I', resume: 'Resume', publications: 'Publications',
  projects: 'Projects', gallery: 'Gallery', blog: 'Blog', research: 'Research' };
const text = html => html.replace(/<[^>]*>/g, '').trim();
for (const [route, title] of Object.entries(routes)) {
  const file = path.join(root, route, 'index.html');
  assert(fs.existsSync(file), `Missing directory-index export: /${route}`);
  const html = fs.readFileSync(file, 'utf8');
  assert(html.includes(`<title>${title}`), `Missing descriptive document title: ${route}`);
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
    assert.match(html, />Download CV</); assert.match(html, />Contact</);
    for (const identity of ['Curious Scientist', 'Motivated Researcher', 'Results Driven Software Engineer', 'AI &amp; Robotics Lover']) assert(html.includes(identity));
  }
  if (route === 'projects') {
    assert.equal((html.match(/data-selected-work=/g) || []).length, 3);
    assert.match(html, /Selected work/); assert.match(html, /More projects/);
    const workTitles = headings.filter(h => h.level === 3).map(h => h.text);
    for (const title of ['CODEX-Autocomplete', 'MockableExpress']) assert.equal(workTitles.filter(t => t === title).length, 1);
  }
  if (route === 'me') {
    assert.match(html, />JavaScript</); assert.match(html, />React Native</);
    assert(!html.includes('aria-controls="accordion-content"'));
    assert.match(html, /<button[^>]*aria-expanded=/);
  }
}
console.log('C09–C20 and C32 exported content checks passed for all eight routes.');
