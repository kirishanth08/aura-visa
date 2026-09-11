const fs = require('fs');
const https = require('https');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const usedIds = new Set();
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.matchAll(/src="https:\/\/images\.unsplash\.com\/([^?"']+)/g);
  for (const m of matches) {
    usedIds.add(m[1]);
  }
});

const techCandidates = [
  'photo-1480714378408-67cf0d13bc1b', // San Francisco skyline / skyscrapers
  'photo-1501594907352-04cda38ebc29', // Golden Gate bridge / California
  'photo-1518770660439-4636190af475', // Circuit technology
  'photo-1519389950473-47ba0277781c', // Tech team collaboration
  'photo-1451187580459-43490279c0fa', // Global network tech
  'photo-1504384308090-c894fdcc538d', // Tech innovation lab
  'photo-1498050108023-c5249f4df085', // Code / developer laptop
  'photo-1526374965328-7f61d4dc18c5'  // Cyber code
];

const authorCandidates = [
  'photo-1573496359142-b8d87734a5a2', // Professional woman portrait
  'photo-1580489944761-15a19d654956', // Professional woman smiling
  'photo-1573497019940-1c28c88b4f3e', // Business woman glasses
  'photo-1567532939604-b6b5b0db2604', // Professional female portrait
  'photo-1534528741775-53994a69daeb'  // Woman portrait
];

async function checkUrl(id) {
  const url = 'https://images.unsplash.com/' + id + '?w=600&auto=format&fit=crop&q=80';
  return new Promise(resolve => {
    https.get(url, { method: 'HEAD' }, res => {
      resolve({ id, status: res.statusCode, isUsed: usedIds.has(id) });
    }).on('error', e => resolve({ id, error: e.message, isUsed: usedIds.has(id) }));
  });
}

(async () => {
  console.log('--- Tech Candidates for EB-2 NIW ---');
  for (const id of techCandidates) {
    const res = await checkUrl(id);
    console.log(res.id, 'status:', res.status, 'used in project:', res.isUsed);
  }
  console.log('\n--- Author Candidates for Dr. Fatima Al-Zahra ---');
  for (const id of authorCandidates) {
    const res = await checkUrl(id);
    console.log(res.id, 'status:', res.status, 'used in project:', res.isUsed);
  }
})();
