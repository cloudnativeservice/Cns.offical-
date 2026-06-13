const fs = require('fs');

try {
    let content = fs.readFileSync('src/App.jsx', 'utf-8');

    const heroEnd = content.indexOf(' {/* PLATFORM BAR */}');
    if (heroEnd === -1) {
        console.error("Could not find PLATFORM BAR");
        process.exit(1);
    }

    const part1 = content.substring(0, heroEnd);
    let part2 = content.substring(heroEnd);

    const replacements = [
        ['text-black', 'text-white'],
        ['text-white/60 text-white', 'text-white/60 text-black'], // if we accidentally double replaced
        ['bg-white', 'bg-[#0A0A0A]'],
        ['border-black/5', 'border-white/5'],
        ['border-black/10', 'border-white/10'],
        ['bg-black/5', 'bg-white/5'],
        ['bg-black/10', 'bg-white/10'],
        ['bg-black/[0.02]', 'bg-white/[0.02]'],
        ['bg-black/[0.03]', 'bg-white/[0.03]'],
        ['bg-black/[0.04]', 'bg-white/[0.04]'],
        ['bg-[#f8f9fa]', 'bg-[#111111]'],
        ['bg-[#F4F4F6]', 'bg-[#050505]'],
        ['bg-[#F3F4F0]', 'bg-[#050505]'],
        ['bg-[#FAEDE6]', 'bg-[#0A0A0A]'],
        ['bg-[#F0F4F8]', 'bg-[#000000]'],
        ['data-bg="#ffffff"', 'data-bg="#0A0A0A"'],
        ['data-bg="#FFFFFF"', 'data-bg="#0A0A0A"'],
        ['data-bg="#F4F4F6"', 'data-bg="#050505"'],
        ['data-bg="#FAEDE6"', 'data-bg="#080A08"'],
        ['data-bg="#F0F4F8"', 'data-bg="#000000"'],
        ['data-bg="#F3F4F0"', 'data-bg="#050505"'],
        ['bg-black', 'bg-[#1A1A1A]'],
        ['border-black', 'border-white'],
        ['hover:bg-black', 'hover:bg-[#1A1A1A]'],
        ['hover:border-black', 'hover:border-white'],
        ['hover:text-black', 'hover:text-white'],
        ['text-black/60', 'text-white/60'],
        ['text-black/50', 'text-white/50'],
        ['text-black/40', 'text-white/40'],
        ['text-black/30', 'text-white/30'],
        ['text-black/70', 'text-white/70']
    ];

    replacements.sort((a, b) => b[0].length - a[0].length);

    for (const [oldStr, newStr] of replacements) {
        part2 = part2.split(oldStr).join(newStr);
    }

    // Fix Hero section buttons and nav bar explicitly if they were caught in part2
    part2 = part2.split('bg-primary text-white').join('bg-primary text-black');
    part2 = part2.split('bg-[#0A0A0A] text-white font-bold px-8').join('bg-white text-black font-bold px-8');

    fs.writeFileSync('src/App.jsx', part1 + part2);
    console.log('App.jsx updated with dark theme!');
} catch (e) {
    console.error(e);
}
