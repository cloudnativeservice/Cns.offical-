const fs = require('fs');

let c = fs.readFileSync('src/App.jsx', 'utf-8');

// ─── 1. Fix the initial background (white → dark) ───────────────────────────
c = c.replace(
  `const [activeSectionBg, setActiveSectionBg] = useState('#ffffff');`,
  `const [activeSectionBg, setActiveSectionBg] = useState('#000000');`
);

// ─── 2. Fix IntersectionObserver – it was watching wrong attribute name ───────
c = c.replace(
  `const sections = document.querySelectorAll('section[data-bg]');`,
  `const sections = document.querySelectorAll('section[data-dark-bg]');`
);

// ─── Fix theme observer to always use dark-bg ─────────────────────────────────
c = c.replace(
  `const isDark = document.documentElement.classList.contains('dark');
          const color = entry.target.getAttribute(isDark ? 'data-dark-bg' : 'data-light-bg');`,
  `const color = entry.target.getAttribute('data-dark-bg');`
);

// ─── 3. Strip ALL bg-white / bg-black variants → dark equivalents ─────────────
// Section backgrounds  
c = c.replace(/bg-white dark:bg-\[#0A0A0A\]/g, 'bg-[#0A0A0A]');
c = c.replace(/bg-white dark:bg-\[#111111\]/g, 'bg-[#111111]');
c = c.replace(/bg-white dark:bg-\[#0A0A0A\]/g, 'bg-[#0A0A0A]');

// Generic card backgrounds
c = c.replace(/bg-black\/5 dark:bg-\[#1A1A1A\]/g, 'bg-[#1A1A1A]');
c = c.replace(/bg-black\/5 dark:bg-white\/5/g, 'bg-white/5');
c = c.replace(/bg-black\/10 dark:bg-white\/10/g, 'bg-white/10');
c = c.replace(/bg-black\/\[0\.02\] dark:bg-white\/\[0\.02\]/g, 'bg-white/[0.02]');
c = c.replace(/bg-black\/\[0\.04\] dark:bg-white\/\[0\.04\]/g, 'bg-white/[0.04]');
c = c.replace(/bg-black\/\[0\.03\] dark:bg-white\/\[0\.03\]/g, 'bg-white/[0.03]');

// Hover backgrounds
c = c.replace(/hover:bg-black\/5 dark:bg-\[#1A1A1A\]/g, 'hover:bg-[#1A1A1A]');
c = c.replace(/hover:bg-white dark:bg-\[#0A0A0A\]/g, 'hover:bg-[#0A0A0A]');
c = c.replace(/hover:bg-black\/\[0\.02\] dark:bg-white\/\[0\.02\]/g, 'hover:bg-white/[0.02]');

// group-hover backgrounds
c = c.replace(/group-hover:bg-black\/\[0\.04\] dark:bg-white\/\[0\.04\]/g, 'group-hover:bg-white/[0.04]');
c = c.replace(/group-hover:bg-white\/20/g, 'group-hover:bg-white/20');

// ─── 4. Strip text-black → text-white ────────────────────────────────────────
c = c.replace(/text-black dark:text-white\b/g, 'text-white');
c = c.replace(/text-black\/30 dark:text-white\/30/g, 'text-white/30');
c = c.replace(/text-black\/40 dark:text-white\/40/g, 'text-white/40');
c = c.replace(/text-black\/50 dark:text-white\/50/g, 'text-white/50');
c = c.replace(/text-black\/60 dark:text-white\/60/g, 'text-white/60');
c = c.replace(/text-black\/70 dark:text-white\/70/g, 'text-white/70');
c = c.replace(/text-black\/80 dark:text-white\/80/g, 'text-white/80');
c = c.replace(/text-black\/5 dark:text-white\/5\b/g, 'text-white/5');
c = c.replace(/text-black\/\[0\.02\] dark:text-white\/\[0\.02\]/g, 'text-white/[0.02]');

// hover text
c = c.replace(/hover:text-black dark:hover:text-white\/90/g, 'hover:text-white');
c = c.replace(/hover:text-black dark:text-white\b/g, 'hover:text-white');

// ─── 5. Strip border-black → border-white ────────────────────────────────────
c = c.replace(/border-black\/5 dark:border-white\/5/g, 'border-white/5');
c = c.replace(/border-black\/10 dark:border-white\/10/g, 'border-white/10');
c = c.replace(/border-black\/10 dark:border-white\/20/g, 'border-white/20');
c = c.replace(/hover:border-black dark:hover:border-white/g, 'hover:border-white');

// ─── 6. GSAP fill words ──────────────────────────────────────────────────────
c = c.replace(
  /className="fill-word text-black dark:text-white opacity-20 inline-block mr-\[0\.25em\]"/g,
  'className="fill-word text-white opacity-20 inline-block mr-[0.25em]"'
);

// ─── 7. Section backgrounds - update data-light-bg to match dark bg ──────────
// Sections now always show their dark bg
c = c.replace(/data-light-bg="[^"]*" data-dark-bg="([^"]*)"/g, 'data-light-bg="$1" data-dark-bg="$1"');

// ─── 8. Fix footer/section wrapper backgrounds that are white ─────────────────
c = c.replace(/bg-white dark:bg-\[#0A0A0A\] border-t/g, 'bg-[#0A0A0A] border-t');

// ─── 9. Remaining isolated dark: prefixed cleanup ────────────────────────────
c = c.replace(/dark:bg-\[#0A0A0A\]/g, 'bg-[#0A0A0A]');
c = c.replace(/dark:bg-\[#1A1A1A\]/g, 'bg-[#1A1A1A]');
c = c.replace(/dark:bg-\[#111111\]/g, 'bg-[#111111]');
c = c.replace(/dark:bg-white\/5/g, 'bg-white/5');
c = c.replace(/dark:bg-white\/10/g, 'bg-white/10');
c = c.replace(/dark:text-white\b/g, 'text-white');
c = c.replace(/dark:text-primary/g, 'text-primary');
c = c.replace(/dark:border-white\/5/g, 'border-white/5');
c = c.replace(/dark:border-white\/10/g, 'border-white/10');
c = c.replace(/dark:border-white\/20/g, 'border-white/20');
c = c.replace(/dark:hover:border-white/g, 'hover:border-white');
c = c.replace(/dark:hover:text-white/g, 'hover:text-white');
c = c.replace(/dark:mix-blend-lighten/g, '');

// Fix invert that was added for light mode
c = c.replace(/dark:invert-0 invert mix-blend-multiply/g, '');
c = c.replace(/dark:mix-blend-lighten dark:invert-0 invert mix-blend-multiply/g, '');

// Clean double spaces from removed classes
c = c.replace(/  +/g, ' ');

fs.writeFileSync('src/App.jsx', c);
console.log('Done! App.jsx is now fully dark-themed.');
