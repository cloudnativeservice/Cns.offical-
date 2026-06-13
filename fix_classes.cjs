const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf-8');

// Fix the corrupted classes from the naive string replace
content = content.replace(/dark:text-black dark:text-white\/([0-9]+)/g, 'dark:text-white/$1');
content = content.replace(/dark:text-black dark:text-white(?![\/\w])/g, 'dark:text-white');
content = content.replace(/dark:border-black dark:border-white\/([0-9]+)/g, 'dark:border-white/$1');
content = content.replace(/dark:border-black dark:border-white(?![\/\w])/g, 'dark:border-white');
content = content.replace(/dark:bg-black\/([0-9]+) dark:bg-\[#1A1A1A\]/g, 'dark:bg-[#1A1A1A]');
content = content.replace(/dark:bg-black\/([0-9]+) dark:bg-white\/([0-9]+)/g, 'dark:bg-white/$2');
content = content.replace(/dark:hover:bg-white dark:hover:bg-\[#0A0A0A\]/g, 'dark:hover:bg-[#0A0A0A]');

// For the specific footer bug: 
// <p className="text-black/30 dark:text-white/30 text-xs font-bold tracking-[0.2em] uppercase">CNS Project</p>
// Is now correct, so we can search for it!

const footerTarget = '<p className="text-black/30 dark:text-white/30 text-xs font-bold tracking-[0.2em] uppercase">CNS Project</p>';
const footerButton = `
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-14 h-8 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 flex items-center p-1 relative transition-colors duration-500"
              >
                <div className={\`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-500 shadow-md \${theme === 'dark' ? 'translate-x-6 bg-[#0A0A0A]' : 'translate-x-0 bg-white'}\`}>
                  <span className="material-symbols-outlined text-[14px] text-black dark:text-primary">
                    {theme === 'dark' ? 'dark_mode' : 'light_mode'}
                  </span>
                </div>
              </button>
              <p className="text-black/30 dark:text-white/30 text-xs font-bold tracking-[0.2em] uppercase">CNS Project</p>
            </div>
`;

if (content.includes(footerTarget)) {
    content = content.replace(footerTarget, footerButton);
    console.log("Toggle button successfully injected!");
} else {
    console.log("Could not find footer target. Toggle not injected.");
}

fs.writeFileSync('src/App.jsx', content);
console.log('Cleanup completed.');
