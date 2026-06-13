const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf-8');

const heroEnd = content.indexOf(' {/* PLATFORM BAR */}');
const part1 = content.substring(0, heroEnd);
let part2 = content.substring(heroEnd);

// Simple global replaces using strings to avoid regex/escaping issues!
const mapping = [
    ['text-white/60 text-black', 'text-white/60 text-black'], // safety
    ['text-white/70', 'text-black/70 dark:text-white/70'],
    ['text-white/60', 'text-black/60 dark:text-white/60'],
    ['text-white/50', 'text-black/50 dark:text-white/50'],
    ['text-white/40', 'text-black/40 dark:text-white/40'],
    ['text-white/30', 'text-black/30 dark:text-white/30'],
    ['text-white/20', 'text-black/20 dark:text-white/20'],
    ['text-white/10', 'text-black/10 dark:text-white/10'],
    ['text-white', 'text-black dark:text-white'], // this has to come after the /50, /60 etc
    
    ['bg-[#0A0A0A]', 'bg-white dark:bg-[#0A0A0A]'],
    ['bg-[#000000]', 'bg-white dark:bg-[#000000]'],
    ['bg-[#1A1A1A]', 'bg-black/5 dark:bg-[#1A1A1A]'],
    ['bg-[#111111]', 'bg-white dark:bg-[#111111]'],
    ['bg-[#050505]', 'bg-[#F4F4F6] dark:bg-[#050505]'],
    
    ['bg-white/5', 'bg-black/5 dark:bg-white/5'],
    ['bg-white/10', 'bg-black/10 dark:bg-white/10'],
    ['bg-white/[0.02]', 'bg-black/[0.02] dark:bg-white/[0.02]'],
    ['bg-white/[0.03]', 'bg-black/[0.03] dark:bg-white/[0.03]'],
    ['bg-white/[0.04]', 'bg-black/[0.04] dark:bg-white/[0.04]'],
    
    ['border-white/5', 'border-black/5 dark:border-white/5'],
    ['border-white/10', 'border-black/10 dark:border-white/10'],
    ['border-white/20', 'border-black/10 dark:border-white/20'],
    ['border-white', 'border-black dark:border-white'],
    
    ['hover:bg-[#1A1A1A]', 'hover:bg-black/5 dark:hover:bg-[#1A1A1A]'],
    ['hover:bg-[#0A0A0A]', 'hover:bg-white dark:hover:bg-[#0A0A0A]'],
    ['hover:text-white', 'hover:text-black dark:hover:text-white'],
    ['hover:border-white', 'hover:border-black dark:hover:border-white'],
];

for (const [darkVal, dualVal] of mapping) {
    part2 = part2.split(darkVal).join(dualVal);
}

// Fix buttons that were originally bg-white text-black in part2
part2 = part2.split('bg-white dark:bg-[#0A0A0A] text-black dark:text-white font-bold px-8').join('bg-black dark:bg-white text-white dark:text-black font-bold px-8');

// Update data-bg to data-light-bg and data-dark-bg
part2 = part2.split('data-bg="#0A0A0A"').join('data-light-bg="#ffffff" data-dark-bg="#0A0A0A"');
part2 = part2.split('data-bg="#050505"').join('data-light-bg="#F4F4F6" data-dark-bg="#050505"');
part2 = part2.split('data-bg="#080A08"').join('data-light-bg="#FAEDE6" data-dark-bg="#080A08"');
part2 = part2.split('data-bg="#000000"').join('data-light-bg="#F0F4F8" data-dark-bg="#000000"');

let finalContent = part1 + part2;

// Add useEffect and State using pure base64 replacement!
function base64Decode(str) { return Buffer.from(str, 'base64').toString('utf8'); }

const appStartFind = base64Decode('ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKCkgew==');
const appStartReplace = base64Decode('ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKCkgewogIGNvbnN0IFt0aGVtZSwgc2V0VGhlbWVdID0gdXNlU3RhdGUoKCkgPT4gewogICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7CiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGhlbWUnKSB8fCAnZGFyayc7CiAgICB9CiAgICByZXR1cm4gJ2RhcmsnOwogIH0pOwo=');
finalContent = finalContent.replace(appStartFind, appStartReplace);

const scrollEffectFind = base64Decode('Y29uc3QgW3Njcm9sbGVkLCBzZXRTY3JvbGxlZF0gPSB1c2VTdGF0ZShmYWxzZSk7');
const scrollEffectReplace = base64Decode('Y29uc3QgW3Njcm9sbGVkLCBzZXRTY3JvbGxlZF0gPSB1c2VTdGF0ZShmYWxzZSk7CiAgCiAgdXNlRWZmZWN0KCgpID0+IHsKICAgIGlmICh0aGVtZSA9PT0gJ2RhcmsnKSB7CiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkYXJrJyk7CiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0aGVtZScsICdkYXJrJyk7CiAgICB9IGVsc2UgewogICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGFyaycpOwogICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGhlbWUnLCAnbGlnaHQnKTsKICAgIH0KICAgIC8vIFJlLXRyaWdnZXIgb2JzZXJ2ZXIKICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnc2Nyb2xsJykpOwogIH0sIFt0aGVtZV0pOwo=');
finalContent = finalContent.replace(scrollEffectFind, scrollEffectReplace);

const observerFind = base64Decode('Y29uc3QgY29sb3IgPSBlbnRyeS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWJnJyk7CiAgICAgICAgICAgIGlmIChjb2xvcikgewogICAgICAgICAgICAgIHNldEFjdGl2ZVNlY3Rpb25CZyhjb2xvcik7CiAgICAgICAgICAgIH0=');
const observerReplace = base64Decode('Y29uc3QgaXNEYXJrID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGFyaycpOwogICAgICAgICAgICBjb25zdCBjb2xvciA9IGVudHJ5LnRhcmdldC5nZXRBdHRyaWJ1dGUoaXNEYXJrID8gJ2RhdGEtZGFyay1iZycgOiAnZGF0YS1saWdodC1iZycpOwogICAgICAgICAgICBpZiAoY29sb3IpIHsKICAgICAgICAgICAgICBzZXRBY3RpdmVTZWN0aW9uQmcoY29sb3IpOwogICAgICAgICAgICB9');
finalContent = finalContent.replace(observerFind, observerReplace);

// Update Hero to have both bgs
finalContent = finalContent.replace('data-bg="#000000"', 'data-light-bg="#000000" data-dark-bg="#000000"');

// Add Footer toggle button
const footerTarget = base64Decode('PHAgY2xhc3NOYW1lPSJ0ZXh0LWJsYWNrLzMwIGRhcms6dGV4dC13aGl0ZS8zMCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFja2luZy1bMC4yZW1dIHVwcGVyY2FzZSI+Q05TIFByb2plY3Q8L3A+');
const footerButton = base64Decode('PGRpdiBjbGFzc05hbWU9ImZsZXggaXRlbXMtY2VudGVyIGdhcC00Ij4KICAgICAgICAgICAgICA8YnV0dG9uIAogICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0VGhlbWUodGhlbWUgPT09ICdkYXJrJyA/ICdsaWdodCcgOiAnZGFyaycpfQogICAgICAgICAgICAgICAgY2xhc3NOYW1lPSJ3LTE0IGgtOCByb3VuZGVkLWZ1bGwgYmctYmxhY2svNSBkYXJrOmJnLXdoaXRlLzEwIGJvcmRlciBib3JkZXItYmxhY2svMTAgZGFyazpib3JkZXItd2hpdGUvMjAgZmxleCBpdGVtcy1jZW50ZXIgcC0xIHJlbGF0aXZlIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTUwMCIKICAgICAgICAgICAgICA+CiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHctNiBoLTYgcm91bmRlZC1mdWxsIGZsZXgvaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTUwMCBzaGFkb3ctbWQgJHt0aGVtZSA9PT0gJ2RhcmsnID8gJ3RyYW5zbGF0ZS14LTYgYmctWyMwQTBBMEFdJyA6ICd0cmFuc2xhdGUteC0wIGJnLXdoaXRlJ31gfT4KICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE0cHhdIHRleHQtYmxhY2sgZGFyazp0ZXh0LXByaW1hcnkiPgogICAgICAgICAgICAgICAgICAgIHt0aGVtZSA9PT0gJ2RhcmsnID8gJ2RhcmtfbW9kZScgOiAnbGlnaHRfbW9kZSd9CiAgICAgICAgICAgICAgICAgIDwvc3Bhbj4KICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgIDwvYnV0dG9uPgogICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0idGV4dC1ibGFkay8zMCBkYXJrOnRleHQtd2hpdGUvMzAgdGV4dC14cyBmb250LWJvbGQgdHJhY2tpbmctWzAuMmVtXSB1cHBlcmNhc2UiPkNOUyBQcm9qZWN0PC9wPgogICAgICAgICAgICA8L2Rpdj4=');
finalContent = finalContent.replace(footerTarget, footerButton);

fs.writeFileSync('src/App.jsx', finalContent);
console.log('Done mapping classes and inserting toggle!');
