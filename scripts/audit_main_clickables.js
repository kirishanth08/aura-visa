const fs = require('fs');

const files = fs.readdirSync('.').filter(f => (f.startsWith('admin-') || f.startsWith('client-')) && f.endsWith('.html'));

const unhandled = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  
  // Find all buttons inside <main>
  const mainMatch = content.match(/<main[\s\S]*?<\/main>/);
  if (!mainMatch) return;
  const mainContent = mainMatch[0];

  const buttons = mainContent.match(/<button[^>]*>[\s\S]*?<\/button>/g) || [];
  buttons.forEach(btn => {
    const text = btn.replace(/<[^>]+>/g, '').trim();
    const hasOnclick = btn.includes('onclick');
    const hasBs = btn.includes('data-bs-');
    const isSubmit = btn.includes('type="submit"');
    const isDisabled = btn.includes('disabled');
    if (!hasOnclick && !hasBs && !isSubmit && !isDisabled) {
      unhandled.push({ file: f, type: 'button', text: text || 'icon-button', html: btn.slice(0, 100) });
    }
  });

  const links = mainContent.match(/<a[^>]*>[\s\S]*?<\/a>/g) || [];
  links.forEach(a => {
    const hrefMatch = a.match(/href="([^"]*)"/);
    const href = hrefMatch ? hrefMatch[1] : '';
    const text = a.replace(/<[^>]+>/g, '').trim();
    const hasOnclick = a.includes('onclick');
    const hasBs = a.includes('data-bs-');
    if (href === '#' || href === '' || href.startsWith('javascript:')) {
      unhandled.push({ file: f, type: 'link', text: text || 'icon-link', href, html: a.slice(0, 100) });
    }
  });
});

console.log('Total unhandled interactive elements in <main>:', unhandled.length);
unhandled.forEach(u => {
  console.log(`[${u.file}] ${u.type} (${u.text}): ${u.html}`);
});
