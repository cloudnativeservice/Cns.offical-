const fs = require('fs');
let c = fs.readFileSync('src/pages/Changelog.jsx', 'utf-8');
c = c.replace(/\\`/g, '`');
c = c.replace(/\\\$/g, '$');
fs.writeFileSync('src/pages/Changelog.jsx', c);
