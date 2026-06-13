const fs = require('fs');
let c = fs.readFileSync('src/pages/Download.jsx', 'utf-8');

// Remove onClick from cards
c = c.replace(/onClick=\{\(\) => handleCardClick\('windows'\)\}/g, '');
c = c.replace(/onClick=\{\(\) => handleCardClick\('apple'\)\}/g, '');
c = c.replace(/onClick=\{\(\) => handleCardClick\('android'\)\}/g, '');
c = c.replace(/onClick=\{\(\) => handleCardClick\('linux'\)\}/g, '');
c = c.replace(/onClick=\{\(\) => handleCardClick\('docker'\)\}/g, '');

// Remove cursor-pointer from cards
c = c.replace(/cursor-pointer /g, '');

// Add onClick to Windows button
c = c.replace(
  /Download Setup \(\.exe\) <span className="material-symbols-outlined">arrow_forward<\/span>/g,
  \`Download Setup (.exe) <span className="material-symbols-outlined">arrow_forward</span>\`
);
// Wait, I need to replace the button tags themselves.

// Windows Button
c = c.replace(
  /<button className="inline-flex items-center gap-3 bg-white text-black font-bold px-8 py-4 rounded-xl text-base hover:bg-primary hover:scale-105 transition-all shadow-lg ">/g,
  '<button onClick={() => handleCardClick(\\\'windows\\\')} className="inline-flex items-center gap-3 bg-white text-black font-bold px-8 py-4 rounded-xl text-base hover:bg-primary hover:scale-105 transition-all shadow-lg cursor-pointer">'
);

// Apple macOS button
c = c.replace(
  /<button className="w-full flex items-center justify-center gap-2 bg-black\/5 text-\[#111111\] font-bold py-4 rounded-xl text-sm hover:bg-black\/10 transition-colors ">/g,
  '<button onClick={() => handleCardClick(\\\'apple\\\')} className="w-full flex items-center justify-center gap-2 bg-black/5 text-[#111111] font-bold py-4 rounded-xl text-sm hover:bg-black/10 transition-colors cursor-pointer">'
);

// Apple App Store button
c = c.replace(
  /<button className="w-full flex items-center justify-center gap-2 border border-black\/10 text-\[#111111\] font-bold py-4 rounded-xl text-sm hover:border-black\/20 hover:bg-black\/5 transition-all ">/g,
  '<button onClick={() => handleCardClick(\\\'apple\\\')} className="w-full flex items-center justify-center gap-2 border border-black/10 text-[#111111] font-bold py-4 rounded-xl text-sm hover:border-black/20 hover:bg-black/5 transition-all cursor-pointer">'
);

// Android button
c = c.replace(
  /<button className="mt-8 w-full flex items-center justify-center gap-2 bg-\[#22c55e\] text-white font-bold py-4 rounded-xl text-sm hover:brightness-110 transition-all shadow-md ">/g,
  '<button onClick={() => handleCardClick(\\\'android\\\')} className="mt-8 w-full flex items-center justify-center gap-2 bg-[#22c55e] text-white font-bold py-4 rounded-xl text-sm hover:brightness-110 transition-all shadow-md cursor-pointer">'
);

// Linux button
c = c.replace(
  /<button className="mt-8 w-full flex items-center justify-center gap-2 border border-black\/10 text-\[#111111\] font-bold py-4 rounded-xl text-sm hover:border-black\/20 hover:bg-black\/5 transition-all ">/g,
  '<button onClick={() => handleCardClick(\\\'linux\\\')} className="mt-8 w-full flex items-center justify-center gap-2 border border-black/10 text-[#111111] font-bold py-4 rounded-xl text-sm hover:border-black/20 hover:bg-black/5 transition-all cursor-pointer">'
);

// Docker - wait, it's a div not a button. I'll make it a button.
c = c.replace(
  /<div className="mt-auto bg-black\/5 border border-black\/10 rounded-xl px-5 py-4 flex items-center justify-between transition-all shadow-inner ">/g,
  '<div onClick={() => handleCardClick(\\\'docker\\\')} className="mt-auto bg-black/5 border border-black/10 rounded-xl px-5 py-4 flex items-center justify-between transition-all shadow-inner cursor-pointer hover:bg-black/10">'
);

fs.writeFileSync('src/pages/Download.jsx', c);
