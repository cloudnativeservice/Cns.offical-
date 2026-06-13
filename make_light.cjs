const fs = require('fs');

let c = fs.readFileSync('src/App.jsx', 'utf-8');

// ─── 1. Set base background & section backgrounds ─────────────────────────────
c = c.replace(
  `const [activeSectionBg, setActiveSectionBg] = useState('#000000');`,
  `const [activeSectionBg, setActiveSectionBg] = useState('#f5f6f7');`
);

// ─── 2. All section data-dark-bg → #f5f6f7 or slightly varied ────────────────
c = c.replace(/data-light-bg="[^"]*" data-dark-bg="#000000"/g, 'data-light-bg="#f5f6f7" data-dark-bg="#f5f6f7"');
c = c.replace(/data-light-bg="[^"]*" data-dark-bg="#050505"/g, 'data-light-bg="#f0f1f2" data-dark-bg="#f0f1f2"');
c = c.replace(/data-light-bg="[^"]*" data-dark-bg="#080A08"/g, 'data-light-bg="#ffffff" data-dark-bg="#ffffff"');
c = c.replace(/data-light-bg="[^"]*" data-dark-bg="#0A0A0A"/g, 'data-light-bg="#f5f6f7" data-dark-bg="#f5f6f7"');

// ─── 3. Section class backgrounds ────────────────────────────────────────────
// Dark section wrappers → light
c = c.replace(/className="py-24 md:py-36 border-b border-white\/5 transition-colors duration-1000" id="features"/g,
  'className="py-24 md:py-36 border-b border-black/8 transition-colors duration-1000" id="features"');

// ─── 4. Card/container backgrounds ───────────────────────────────────────────
c = c.replace(/\bbg-\[#0A0A0A\]/g, 'bg-white');
c = c.replace(/\bbg-\[#111111\]/g, 'bg-white');
c = c.replace(/\bbg-\[#1A1A1A\]/g, 'bg-black/5');
c = c.replace(/hover:bg-\[#0A0A0A\]/g, 'hover:bg-black/5');
c = c.replace(/hover:bg-\[#1A1A1A\]/g, 'hover:bg-black/5');

// ─── 5. Text colors: white → dark ────────────────────────────────────────────
c = c.replace(/\btext-white\/5\b/g, 'text-black/5');
c = c.replace(/\btext-white\/\[0\.02\]/g, 'text-black/[0.02]');
c = c.replace(/\btext-white\/10\b/g, 'text-black/10');
c = c.replace(/\btext-white\/20\b/g, 'text-black/20');
c = c.replace(/\btext-white\/30\b/g, 'text-black/30');
c = c.replace(/\btext-white\/40\b/g, 'text-black/40');
c = c.replace(/\btext-white\/50\b/g, 'text-black/50');
c = c.replace(/\btext-white\/60\b/g, 'text-black/60');
c = c.replace(/\btext-white\/70\b/g, 'text-black/70');
c = c.replace(/\btext-white\/80\b/g, 'text-black/80');
c = c.replace(/\btext-white\/90\b/g, 'text-black/90');
// Keep navbar/hero text-white as-is (hero is always dark)
// We'll fix text-white on non-hero elements carefully
// Replace standalone text-white (not inside hero/navbar which are dark)
// Strategy: replace all then fix specific known-dark sections later
c = c.replace(/(?<!\/)text-white\b(?!\/)/g, 'text-[#111111]');

// ─── 6. Border colors ────────────────────────────────────────────────────────
c = c.replace(/border-white\/5\b/g, 'border-black/8');
c = c.replace(/border-white\/10\b/g, 'border-black/10');
c = c.replace(/border-white\/20\b/g, 'border-black/15');
c = c.replace(/hover:border-white\b/g, 'hover:border-black/50');

// ─── 7. Backgrounds with white opacity ───────────────────────────────────────
c = c.replace(/bg-white\/5\b/g, 'bg-black/5');
c = c.replace(/bg-white\/10\b/g, 'bg-black/10');
c = c.replace(/bg-white\/20\b/g, 'bg-black/10');
c = c.replace(/bg-white\/\[0\.02\]/g, 'bg-black/[0.02]');
c = c.replace(/bg-white\/\[0\.03\]/g, 'bg-black/[0.03]');
c = c.replace(/bg-white\/\[0\.04\]/g, 'bg-black/[0.04]');
c = c.replace(/group-hover:bg-white\/20/g, 'group-hover:bg-black/10');
c = c.replace(/group-hover:bg-black\/\[0\.04\]/g, 'group-hover:bg-black/[0.04]');

// ─── 8. Divide colors ────────────────────────────────────────────────────────
c = c.replace(/divide-black\/5/g, 'divide-black/8');

// ─── 9. Fix GSAP fill words (was white, now should be dark) ──────────────────
c = c.replace(
  /className="fill-word text-white opacity-20 inline-block mr-\[0\.25em\]"/g,
  'className="fill-word text-[#111111] opacity-20 inline-block mr-[0.25em]"'
);
c = c.replace(
  `gsap.to('.fill-word', {
      opacity: 1,`,
  `gsap.to('.fill-word', {
      opacity: 1,
      color: '#111111',`
);

// ─── 10. Images — switch to mix-blend-multiply for light bg ──────────────────
// mix-blend-lighten makes black transparent on dark bg
// mix-blend-multiply makes white transparent on light bg
// But our images have BLACK backgrounds, so on light we should invert them
// Actually best to just remove blend mode and let cropped images show naturally
c = c.replace(/mix-blend-lighten/g, '');

// ─── 11. Hero section stays dark always — restore white text for elements inside hero ──
// Hero has bg-black with video, everything inside should stay white
// The hero section ends at </section> after trust badges
// Re-add white text for known hero children patterns
c = c.replace(/className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-\[5\.5rem\] leading-\[1\.1\] md:leading-\[1\] tracking-tight mb-6 text-\[#111111\] mt-8"/g,
  'className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.1] md:leading-[1] tracking-tight mb-6 text-white mt-8"');
c = c.replace(/className="text-base sm:text-lg md:text-xl text-\[#111111\]\/80 mb-8 max-w-2xl mx-auto leading-relaxed font-medium"/g,
  'className="text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed font-medium"');
c = c.replace(/className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-12 text-xs sm:text-sm font-bold text-\[#111111\]\/60 uppercase tracking-widest"/g,
  'className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-12 text-xs sm:text-sm font-bold text-white/60 uppercase tracking-widest"');
c = c.replace(/className="bg-\[#111111\]\/10 backdrop-blur-xl border border-\[#111111\]\/10 text-\[#111111\]/g,
  'className="bg-white/10 backdrop-blur-xl border border-white/10 text-white');

// Navbar text stays white
c = c.replace(/transition-colors\}'\}\>CNS\<\/span\>/,
  "transition-colors}'}>CNS</span>");

// ─── 12. Footer should be dark ───────────────────────────────────────────────
c = c.replace(/<footer className="bg-\[#0A0A0A\]/g, '<footer className="bg-[#111111]');

// ─── 13. Hover/transition text on platform bar ───────────────────────────────
c = c.replace(/hover:text-\[#111111\]\b/g, 'hover:text-black');

// ─── 14. Remove leftover dark: prefixes ──────────────────────────────────────
c = c.replace(/dark:bg-[^\s"]+/g, '');
c = c.replace(/dark:text-[^\s"]+/g, '');
c = c.replace(/dark:border-[^\s"]+/g, '');

// Clean up double spaces
c = c.replace(/ {2,}/g, ' ');
c = c.replace(/className=" /g, 'className="');

fs.writeFileSync('src/App.jsx', c);
console.log('Done! Website is now #f5f6f7 light theme.');
