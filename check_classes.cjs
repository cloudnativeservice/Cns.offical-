const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf-8');
const matches = content.match(/class[Nn]ame=[\"\{][^\"\}]+[\"\}]/g);
if (matches) {
  const badClasses = matches.filter(m => 
    m.includes('dark:bg-[#050505]/') || 
    m.includes('dark:bg-[#0A0A0A]/') || 
    m.includes('dark:bg-[#111111]/') || 
    m.includes('dark:bg-[#000000]/') || 
    m.includes('dark:border-white/5/') || 
    m.includes('text-black dark:text-white/') ||
    m.includes('dark:text-black')
  );
  console.log(badClasses.slice(0, 30).join('\n'));
} else {
  console.log('No classes found');
}
