const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf-8');

content = content.replace(/bg-\[\#050505\]/g, 'bg-black');
content = content.replace(/bg-\[\#0A0A0A\]/g, 'bg-black');
content = content.replace(/bg-\[\#020202\]/g, 'bg-black');
content = content.replace(/<div className="absolute inset-0 bg-\[radial-gradient\([^>]+><\/div>/g, '');

fs.writeFileSync('src/App.jsx', content, 'utf-8');
