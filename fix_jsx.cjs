const fs = require('fs');
let c = fs.readFileSync('src/pages/Download.jsx', 'utf-8');
c = c.replace(/\\`/g, '`');
c = c.replace(/\\\$/g, '$');
fs.writeFileSync('src/pages/Download.jsx', c);
