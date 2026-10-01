const fs = require('fs');
const path = require('path');

// 1. Update style.css in lex-Vanguard
const cssPath = path.resolve(__dirname, '../../lex-Vanguard/assets/css/style.css');
if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');

  // Replace .team-card block
  const oldTeamCardBlock = `.team-card {
  background-color: var(--surface-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  text-align: center;
}`;

  const newTeamCardBlock = `.team-card {
  background-color: var(--surface-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
}`;

  // Replace .team-body
  const oldTeamBody = `.team-body {
  padding: 1.8rem 1.5rem;
}`;

  const newTeamBody = `.team-body {
  padding: 1.8rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}`;

  // Replace .team-role
  const oldTeamRole = `.team-role {
  font-family: var(--font-mono);
  font-size: 0.84rem;
  color: var(--accent-color);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 0.85rem;
}`;

  const newTeamRole = `.team-role {
  font-family: var(--font-mono);
  font-size: 0.84rem;
  color: var(--accent-color);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 0.85rem;
  min-height: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}`;

  // Replace .team-bio
  const oldTeamBio = `.team-bio {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1.2rem;
}`;

  const newTeamBio = `.team-bio {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1.2rem;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}`;

  // Replace .team-socials
  const oldTeamSocials = `.team-socials {
  display: flex;
  justify-content: center;
  gap: 0.65rem;
}`;

  const newTeamSocials = `.team-socials {
  display: flex;
  justify-content: center;
  gap: 0.65rem;
  margin-top: auto;
}`;

  css = css.replace(oldTeamCardBlock, newTeamCardBlock);
  css = css.replace(oldTeamBody, newTeamBody);
  css = css.replace(oldTeamRole, newTeamRole);
  css = css.replace(oldTeamBio, newTeamBio);
  css = css.replace(oldTeamSocials, newTeamSocials);

  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Successfully updated lex-Vanguard style.css');
} else {
  console.error('File not found: ' + cssPath);
}

// 2. Update about.html in lex-Vanguard
const htmlPath = path.resolve(__dirname, '../../lex-Vanguard/about.html');
if (fs.existsSync(htmlPath)) {
  let html = fs.readFileSync(htmlPath, 'utf8');

  // Add h-100 d-flex flex-column to cards, d-flex flex-column flex-grow-1 to body, mt-auto to socials
  html = html.replace(
    /<div class="team-card">([\s\S]*?)<div class="team-body">([\s\S]*?)<div class="team-socials">/g,
    '<div class="team-card h-100 d-flex flex-column">$1<div class="team-body d-flex flex-column flex-grow-1">$2<div class="team-socials mt-auto">'
  );

  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Successfully updated lex-Vanguard about.html');
} else {
  console.error('File not found: ' + htmlPath);
}
