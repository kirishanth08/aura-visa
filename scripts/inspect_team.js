const fs = require('fs');
const path = require('path');

const auraAbout = fs.readFileSync(path.resolve(__dirname, '../about.html'), 'utf8');
const teamSection = auraAbout.match(/<section[^>]*id="about-team"[\s\S]*?<\/section>/);
console.log('--- AURAVISA TEAM SECTION ---');
if (teamSection) {
  console.log(teamSection[0].slice(0, 1500));
}

const lexAboutPath = path.resolve(__dirname, '../../lex-Vanguard/about.html');
if (fs.existsSync(lexAboutPath)) {
  const lexAbout = fs.readFileSync(lexAboutPath, 'utf8');
  console.log('\n--- LEX-VANGUARD TEAM SECTION ---');
  const lexTeam = lexAbout.match(/<section[^>]*class="[^"]*team[^"]*"[\s\S]*?<\/section>/) || lexAbout.match(/team-card[\s\S]{1,1500}/);
  if (lexTeam) {
    console.log(lexTeam[0].slice(0, 1500));
  }
}
