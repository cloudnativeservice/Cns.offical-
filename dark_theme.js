const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf-8');

// Replace standard colors to dark mode colors
const replacements = [
    ['text-black', 'text-white'],
    ['bg-white', 'bg-[#0A0A0A]'],
    ['border-black/5', 'border-white/5'],
    ['border-black/10', 'border-white/10'],
    ['bg-black/5', 'bg-white/5'],
    ['bg-black/10', 'bg-white/10'],
    ['bg-black/[0.02]', 'bg-white/[0.02]'],
    ['bg-black/[0.03]', 'bg-white/[0.03]'],
    ['bg-black/[0.04]', 'bg-white/[0.04]'],
    ['bg-[#f8f9fa]', 'bg-[#111]'],
    ['bg-[#F4F4F6]', 'bg-[#050505]'],
    ['bg-[#F3F4F0]', 'bg-[#050505]'],
    ['bg-[#FAEDE6]', 'bg-[#0A0A0A]'],
    ['bg-[#F0F4F8]', 'bg-[#000000]'],
    ['#F4F4F6', '#050505'],
    ['#ffffff', '#0A0A0A'],
    ['#FFFFFF', '#0A0A0A'],
    ['#FAEDE6', '#080A08'],
    ['#F0F4F8', '#000000'],
    ['#F3F4F0', '#050505'],
    ['bg-black', 'bg-[#1A1A1A]'],
    ['border-black', 'border-white'],
    ['hover:bg-black', 'hover:bg-[#1A1A1A]'],
    ['hover:border-black', 'hover:border-white'],
    ['hover:text-black', 'hover:text-white'],
];

replacements.sort((a, b) => b[0].length - a[0].length);

for (const [oldStr, newStr] of replacements) {
    content = content.split(oldStr).join(newStr);
}

// Fix Hero section buttons and nav bar explicitly
content = content.split('bg-primary text-white').join('bg-primary text-black');
content = content.split('bg-[#0A0A0A] text-white font-bold px-8').join('bg-white text-black font-bold px-8');

// Add MASK to the hero section transition!
// Find the hero section declaration: <section data-bg="#000000" className="relative min-h-[100vh]
const heroFind = '<section data-bg="#000000" className="relative min-h-[100vh] flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden bg-[#1A1A1A]">';
const heroReplace = '<section style={{ WebkitMaskImage: \\'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)\\', maskImage: \\'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)\\', paddingBottom: \\'10vh\\' }} data-bg="#000000" className="relative min-h-[110vh] flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden bg-[#1A1A1A]">';
content = content.replace(heroFind, heroReplace);

// The platform bar needs a negative margin to go UNDER the faded hero section!
const platformFind = '<section data-bg="#0A0A0A" className="py-10 border-b border-white/5 transition-colors duration-1000">';
const platformReplace = '<section data-bg="#0A0A0A" className="py-10 border-b border-white/5 transition-colors duration-1000 -mt-[10vh] relative z-[-1] pt-[15vh]">';
content = content.replace(platformFind, platformReplace);

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx updated!');
