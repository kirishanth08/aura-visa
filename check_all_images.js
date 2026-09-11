const fs = require('fs');
const https = require('https');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const imagesByUrl = new Map();

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.matchAll(/https:\/\/images\.unsplash\.com\/([^?"']+)(\?[^"']*)?/g);
  for (const m of matches) {
    const fullUrl = m[0];
    const id = m[1];
    if (!imagesByUrl.has(id)) {
      imagesByUrl.set(id, { id, fullUrl, files: [] });
    }
    imagesByUrl.get(id).files.push(file);
  }
});

console.log(`Found ${imagesByUrl.size} distinct image IDs across ${files.length} HTML files.`);

async function checkImage(item) {
  return new Promise((resolve) => {
    https.get(item.fullUrl, { method: 'HEAD' }, (res) => {
      resolve({ id: item.id, status: res.statusCode, files: item.files });
    }).on('error', (err) => {
      resolve({ id: item.id, error: err.message, files: item.files });
    });
  });
}

(async () => {
  const items = Array.from(imagesByUrl.values());
  const results = [];
  
  // Check in batches of 10 to avoid overwhelming network
  for (let i = 0; i < items.length; i += 10) {
    const batch = items.slice(i, i + 10);
    const batchRes = await Promise.all(batch.map(checkImage));
    results.push(...batchRes);
  }
  
  const broken = results.filter(r => r.status !== 200);
  console.log(`Checked ${results.length} images.`);
  console.log(`Broken images count: ${broken.length}`);
  if (broken.length > 0) {
    console.log('Broken images list:', JSON.stringify(broken, null, 2));
  } else {
    console.log('All images are 200 OK!');
  }
})();
