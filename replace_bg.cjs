const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Add State
code = code.replace(
  'const [navbarVisible, setNavbarVisible] = useState(true);',
  'const [navbarVisible, setNavbarVisible] = useState(true);\n  const [activeSectionBg, setActiveSectionBg] = useState(\'#000000\');'
);

// 2. Add Intersection Observer and change root div
code = code.replace(
  '  return (\n    <div className="min-h-screen font-body overflow-x-hidden">',
  `  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const color = entry.target.getAttribute('data-bg');
            if (color) {
              setActiveSectionBg(color);
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    const sections = document.querySelectorAll('section[data-bg]');
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className="min-h-screen font-body overflow-x-hidden transition-colors duration-[1500ms] ease-in-out"
      style={{ backgroundColor: activeSectionBg }}
    >`
);

// 3. Add data-bg and remove bg-* classes from sections
code = code.replace('<section className="relative min-h-[100vh] flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden bg-black">', '<section data-bg="#000000" className="relative min-h-[100vh] flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden bg-black">');

code = code.replace('<section className="bg-white py-8 border-b border-black/10">', '<section data-bg="#ffffff" className="py-8 border-b border-black/10 transition-colors duration-1000">');
code = code.replace('<section className="bg-white py-28 md:py-40 border-b border-black/5" id="features">', '<section data-bg="#e0f2fe" className="py-28 md:py-40 border-b border-black/5 transition-colors duration-1000" id="features">');
code = code.replace('<section className="bg-[#f5f5f5] py-28 md:py-40 border-b border-black/5" id="continue-watching">', '<section data-bg="#ffedd5" className="py-28 md:py-40 border-b border-black/5 transition-colors duration-1000" id="continue-watching">');
code = code.replace('<section className="bg-white py-28 md:py-40 border-b border-black/5">', '<section data-bg="#f3e8ff" className="py-28 md:py-40 border-b border-black/5 transition-colors duration-1000">');
code = code.replace('<section className="bg-[#f5f5f5] py-28 md:py-40 border-b border-black/5" id="how-it-works">', '<section data-bg="#ccfbf1" className="py-28 md:py-40 border-b border-black/5 transition-colors duration-1000" id="how-it-works">');
code = code.replace('<section className="bg-white py-28 md:py-40 border-b border-black/5" id="showcase">', '<section data-bg="#fee2e2" className="py-28 md:py-40 border-b border-black/5 transition-colors duration-1000" id="showcase">');
code = code.replace('<section className="bg-[#f5f5f5] py-28 md:py-40 border-b border-black/5" id="qr-pairing">', '<section data-bg="#fef9c3" className="py-28 md:py-40 border-b border-black/5 transition-colors duration-1000" id="qr-pairing">');
code = code.replace('<section className="bg-white py-28 md:py-40 border-b border-black/5" id="compare">', '<section data-bg="#f1f5f9" className="py-28 md:py-40 border-b border-black/5 transition-colors duration-1000" id="compare">');
code = code.replace('<section className="bg-[#f5f5f5] py-28 md:py-40 overflow-hidden relative">', '<section data-bg="#ffffff" className="py-28 md:py-40 overflow-hidden relative transition-colors duration-1000">');
code = code.replace('<footer className="bg-white border-t border-black/10 pt-20 pb-12">', '<footer className="bg-transparent border-t border-black/10 pt-20 pb-12 transition-colors duration-1000">');

fs.writeFileSync('src/App.jsx', code);
console.log('Successfully updated App.jsx with scroll-linked backgrounds!');
