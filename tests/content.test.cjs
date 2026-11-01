// Check actual static-export content rather than matching implementation source.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = process.argv[2] || 'out';
const researchURL = fs.readFileSync(path.join(__dirname, '../src/app/config.ts'), 'utf8')
  .match(/research:\s*"([^"]+)"/)[1];
const routes = { '': 'Kolitha Warnakulasooriya', me: 'Who Am I', resume: 'Resume',
  publications: 'Publications', projects: 'Projects', gallery: 'Gallery', blog: 'Blog', research: 'Research' };
const text = html => html.replace(/<[^>]*>/g, '').trim();
for (const [route, title] of Object.entries(routes)) {
  const directory = path.join(root, route, 'index.html');
  assert(fs.existsSync(directory), `Missing directory-index export: /${route}`);
  const html = fs.readFileSync(directory, 'utf8');
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g)]
    .map(match => ({ level: Number(match[1]), text: text(match[2]) }));
  assert.deepEqual(headings.filter(h => h.level === 1).map(h => h.text), [title], route);
  let previous = 0;
  for (const heading of headings) {
    assert(heading.text, `Empty heading: ${route}`);
    assert(heading.level <= previous + 1, `Skipped heading: ${route}`);
    previous = heading.level;
  }
  const external = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
    .filter(match => match[1].includes('external site'));
  assert.equal(external.length, route === 'research' ? 2 : 1, route);
  for (const link of external) {
    assert(link[1].includes(`href="${researchURL}"`), route);
    assert.match(link[1], /target="_blank"/);
    assert.match(link[1], /rel="noopener noreferrer"/);
    assert.match(link[1], /opens in a new tab/);
    assert.match(link[2], /<svg\b/);
  }
}
console.log('C32 exported content checks passed for all eight routes.');
