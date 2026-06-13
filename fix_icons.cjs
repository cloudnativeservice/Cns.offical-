const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf-8');

// Make all feature icon boxes black with white icons
c = c.replace(
  /className="w-14 h-14 rounded-2xl bg-black\/5 flex items-center justify-center mb-6 shadow-md"/g,
  'className="w-14 h-14 rounded-2xl bg-[#111111] flex items-center justify-center mb-6 shadow-lg"'
);

// Make the icons inside them white
c = c.replace(
  /className="material-symbols-outlined text-\[#111111\] text-2xl">bolt/g,
  'className="material-symbols-outlined text-white text-2xl">bolt'
);
c = c.replace(
  /className="material-symbols-outlined text-\[#111111\] text-2xl">auto_awesome/g,
  'className="material-symbols-outlined text-white text-2xl">auto_awesome'
);
c = c.replace(
  /className="material-symbols-outlined text-\[#111111\] text-2xl">graphic_eq/g,
  'className="material-symbols-outlined text-white text-2xl">graphic_eq'
);
c = c.replace(
  /className="material-symbols-outlined text-\[#111111\] text-2xl">lock/g,
  'className="material-symbols-outlined text-white text-2xl">lock'
);

fs.writeFileSync('src/App.jsx', c);
console.log('Done. Icon boxes are now black.');
