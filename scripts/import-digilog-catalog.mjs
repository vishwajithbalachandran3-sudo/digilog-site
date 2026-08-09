import { writeFile } from 'node:fs/promises';

const targetCount = 3510;
const pageSize = 250;
const products = [];
const usedImages = new Set();

function cleanTitle(title) {
  return title
    .replace(/\s+(?:in|for)\s+pakistan\b/gi, '')
    .replace(/\bpakistan\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([,.)])/g, '$1')
    .trim();
}

function typeFor(title, tags = []) {
  const text = `${title} ${tags.join(' ')}`.toLowerCase();
  if (/sensor|module|relay|display|lcd|oled|temperature|humidity|motion|ultrasonic|encoder/.test(text)) return 'sensors';
  if (/arduino|esp32|esp8266|raspberry|development board|microcontroller|stm32|starter kit|robot/.test(text)) return 'boards';
  return 'tools';
}

for (let page = 1; products.length < targetCount; page += 1) {
  const url = `https://digilog.pk/collections/all/products.json?limit=${pageSize}&page=${page}`;
  const response = await fetch(url, { headers: { 'User-Agent': 'DigilogMicroCatalogImporter/1.0' } });
  if (!response.ok) throw new Error(`Catalog request failed: ${response.status} ${url}`);
  const data = await response.json();
  if (!data.products?.length) break;

  for (const source of data.products) {
    const image = source.images?.[0]?.src;
    const variant = source.variants?.find(item => item.available) || source.variants?.[0];
    if (!image || !variant || usedImages.has(image)) continue;
    const sourcePrice = Number(variant.price || 0);
    const price = Math.max(0.5, Math.round((sourcePrice / 280) * 100) / 100);
    products.push({
      id: source.id,
      name: cleanTitle(source.title),
      price,
      old: null,
      type: typeFor(source.title, source.tags || []),
      rating: 0,
      badge: variant.available ? '' : 'OUT OF STOCK',
      image
    });
    usedImages.add(image);
    if (products.length >= targetCount) break;
  }
}

const output = `// Generated from the public Digilog product catalog.\nwindow.DIGILOG_CATALOG=${JSON.stringify(products)};\n`;
await writeFile(new URL('../catalog-data.js', import.meta.url), output, 'utf8');
console.log(`Imported ${products.length} products with ${new Set(products.map(item => item.image)).size} unique product images.`);
