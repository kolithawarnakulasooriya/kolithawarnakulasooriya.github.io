import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, 'src/app/media-manifest.json');
const sources = JSON.parse(await readFile(path.join(root, 'src/app/media-sources.json'), 'utf8'));
const config = { format: 'webp', quality: 80, widths: [480, 960, 1440], autoOrient: true, withoutEnlargement: true };
const sha = value => createHash('sha256').update(value).digest('hex');
const fingerprint = sha(JSON.stringify(config) + sha(await readFile(fileURLToPath(import.meta.url))));
const urls = [...new Set([...sources.gallery, ...sources.projects, sources.portrait].map(item => item.src))];
const checking = process.argv.includes('--check');
const existing = checking ? JSON.parse(await readFile(manifestPath, 'utf8')) : null;
if (checking && existing.fingerprint !== fingerprint) throw new Error('Media generator/config changed; run node scripts/generate-media.mjs');
const assets = {};

for (const url of urls) {
    if (!/^\/(gallery|images)\/[\w.\/-]+$/.test(url) || url.includes('..')) throw new Error(`Invalid source path: ${url}`);
    const original = await readFile(path.join(root, 'public', url));
    const metadata = await sharp(original).metadata();
    const rotated = metadata.orientation >= 5 && metadata.orientation <= 8;
    const width = rotated ? metadata.height : metadata.width;
    const height = rotated ? metadata.width : metadata.height;
    if (!width || !height) throw new Error(`Missing dimensions: ${url}`);
    const sourceSha256 = sha(original);
    const widths = [...new Set(config.widths.map(size => Math.min(size, width)))];
    const name = path.basename(url, path.extname(url)).replace(/[^a-zA-Z0-9_-]/g, '-');
    const outputDir = path.posix.join(path.posix.dirname(url), 'optimized');
    const entry = { sourceSha256, sourceBytes: original.length, width, height, variants: [] };
    const previous = existing?.assets[url];
    if (checking && (!previous || previous.sourceSha256 !== sourceSha256 || previous.width !== width || previous.height !== height || previous.sourceBytes !== original.length)) throw new Error(`Stale source: ${url}`);
    for (const outputWidth of widths) {
        const src = `${outputDir}/${name}-${sourceSha256.slice(0, 12)}-${outputWidth}.webp`;
        const output = path.join(root, 'public', src);
        if (!checking) {
            await mkdir(path.dirname(output), { recursive: true });
            await sharp(original).rotate().resize({ width: outputWidth, withoutEnlargement: true }).webp({ quality: config.quality }).toFile(output);
        }
        const actual = await sharp(output).metadata();
        const bytes = (await stat(output)).size;
        const expectedHeight = Math.round(height * outputWidth / width);
        if (actual.format !== 'webp' || actual.width !== outputWidth || actual.height !== expectedHeight || bytes === 0) throw new Error(`Invalid derivative: ${src}`);
        const variant = { src, width: actual.width, height: actual.height, bytes };
        if (checking) {
            const saved = previous.variants.find(item => item.width === outputWidth);
            if (!saved || JSON.stringify(saved) !== JSON.stringify(variant)) throw new Error(`Stale derivative: ${src}`);
        }
        entry.variants.push(variant);
    }
    if (checking && previous.variants.length !== entry.variants.length) throw new Error(`Variant count changed: ${url}`);
    assets[url] = entry;
}
if (checking && JSON.stringify(Object.keys(existing.assets)) !== JSON.stringify(urls)) throw new Error('Media source list changed; regenerate manifest');
if (!checking) await writeFile(manifestPath, JSON.stringify({ version: 1, config, fingerprint, assets }, null, 2) + '\n');
const galleryOriginalBytes = sources.gallery.reduce((sum, item) => sum + assets[item.src].sourceBytes, 0);
const galleryLargestBytes = sources.gallery.reduce((sum, item) => sum + assets[item.src].variants.at(-1).bytes, 0);
console.log(`${checking ? 'Checked' : 'Generated'} ${urls.length} media sources. Gallery originals: ${galleryOriginalBytes} bytes; largest derivatives: ${galleryLargestBytes} bytes.`);
