const fs = require('fs');

// 1. Update blog.html cards 4, 5, 6 image sources
let blogContent = fs.readFileSync('blog.html', 'utf8');
blogContent = blogContent.replace(
  'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600',
  'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=600'
);
blogContent = blogContent.replace(
  'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?w=600',
  'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=600'
);
blogContent = blogContent.replace(
  'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600',
  'https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600'
);
fs.writeFileSync('blog.html', blogContent, 'utf8');
console.log('Updated blog.html card thumbnails.');

// 2. Update each blog detail page:
// Replace hero author <img> with a clean icon badge so there is no duplicate img tag,
// and set a dedicated unique portrait in Section 4.

const blogConfigs = [
  {
    file: 'blog-details-australia.html',
    heroImg: 'photo-1520106212299-d99c443e4568',
    authorImg: 'photo-1501196354995-cbb51c65aaea'
  },
  {
    file: 'blog-details-uk.html',
    heroImg: 'photo-1486299267070-83823f5448dd',
    authorImg: 'photo-1573496799652-408c2ac9fe98'
  },
  {
    file: 'blog-details-golden-visa.html',
    heroImg: 'photo-1555881400-74d7acaacd8b',
    authorImg: 'photo-1534751516642-a171edd2521d'
  },
  {
    file: 'blog-details-germany.html',
    heroImg: 'photo-1560969184-10fe8719e047',
    authorImg: 'photo-1522529599102-193c0d76b5b6'
  },
  {
    file: 'blog-details-eb2-niw.html',
    heroImg: 'photo-1506146332389-18140dc7b2fb',
    authorImg: 'photo-1492562080023-ab3db95bfbce'
  },
  {
    file: 'blog-details-new-zealand.html',
    heroImg: 'photo-1507699622108-4be3abd695ad',
    authorImg: 'photo-1580894732444-8ecded7900cd'
  }
];

blogConfigs.forEach(cfg => {
  let content = fs.readFileSync(cfg.file, 'utf8');

  // Replace hero author img with an icon badge
  content = content.replace(
    /<div class="d-flex align-items-center gap-3">\s*<img[^>]*>\s*<div>\s*<div class="fw-bold">([^<]+)<\/div>\s*<small class="text-muted">([^<]+)<\/small>\s*<\/div>\s*<\/div>/,
    `<div class="d-flex align-items-center gap-3">
            <span class="badge-aura badge-aura-primary p-2 rounded-circle fs-5"><i class="bi bi-person-fill"></i></span>
            <div>
              <div class="fw-bold">$1</div>
              <small class="text-muted">$2</small>
            </div>
          </div>`
  );

  // In Section 4 author bio, set the author image
  content = content.replace(
    /<img src="https:\/\/images\.unsplash\.com\/[^?"]+\?w=150[^"]*"/,
    `<img src="https://images.unsplash.com/${cfg.authorImg}?w=150&auto=format&fit=crop&q=80"`
  );

  // Ensure hero image is correct
  content = content.replace(
    /<img src="https:\/\/images\.unsplash\.com\/[^?"]+\?w=1200[^"]*"/,
    `<img src="https://images.unsplash.com/${cfg.heroImg}?w=1200&auto=format&fit=crop&q=80"`
  );

  fs.writeFileSync(cfg.file, content, 'utf8');
  console.log(`Updated images for ${cfg.file}: Hero=${cfg.heroImg}, Author=${cfg.authorImg}`);
});

console.log('All image allocations completed!');
