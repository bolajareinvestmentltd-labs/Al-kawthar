import fs from 'fs';
import fetch from 'node-fetch';

const manifestPath = new URL('../data/rabbana-manifest.json', import.meta.url).pathname;

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: 'GET', headers: { Range: 'bytes=0-1024' }, redirect: 'follow' });
    if (!res.ok) return { ok: false, status: res.status };
    const contentType = res.headers.get('content-type') || '';
    return { ok: true, status: res.status, contentType };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

(async function main(){
  const raw = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(raw);
  let failed = 0;
  for (const item of manifest) {
    process.stdout.write(`Checking id=${item.id} url=${item.url} ... `);
    const r = await checkUrl(item.url);
    if (r.ok) {
      console.log(`OK (${r.status}) type=${r.contentType}`);
    } else {
      failed++;
      console.log(`FAIL (${r.status || r.error})`);
    }
  }

  if (failed > 0) {
    console.error(`Manifest validation failed for ${failed} items.`);
    process.exit(2);
  }
  console.log('All manifest items validated.');
})();
import fs from 'fs';
import fetch from 'node-fetch';

// Simple validator: for each manifest entry, try a small range request (first few bytes)
// and report availability. Exit non-zero on any failure so CI can catch it.

const manifestPath = new URL('../data/rabbana-manifest.json', import.meta.url).pathname;

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: 'GET', headers: { Range: 'bytes=0-1024' }, redirect: 'follow' });
    if (!res.ok) return { ok: false, status: res.status };
    const contentType = res.headers.get('content-type') || '';
    return { ok: true, status: res.status, contentType };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

(async function main(){
  const raw = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(raw);
  let failed = 0;
  for (const item of manifest) {
    process.stdout.write(`Checking id=${item.id} url=${item.url} ... `);
    const r = await checkUrl(item.url);
    if (r.ok) {
      console.log(`OK (${r.status}) type=${r.contentType}`);
    } else {
      failed++;
      console.log(`FAIL (${r.status || r.error})`);
    }
  }

  if (failed > 0) {
    console.error(`Manifest validation failed for ${failed} items.`);
    process.exit(2);
  }
  console.log('All manifest items validated.');
})();
