const fs = require('fs');

try {
    let content = fs.readFileSync('src/App.jsx', 'utf-8');

    // 1. Add imports for GSAP
    if (!content.includes("import gsap from 'gsap';")) {
        const importIndex = content.indexOf('import { motion');
        const gsapImports = `import gsap from 'gsap';\nimport { useGSAP } from '@gsap/react';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';\n\ngsap.registerPlugin(ScrollTrigger);\n\n`;
        content = content.substring(0, importIndex) + gsapImports + content.substring(importIndex);
    }

    // 2. Change viewport={{ once: true }} to viewport={{ once: false, amount: 0.2 }}
    content = content.replace(/once:\s*true/g, 'once: false, amount: 0.1');

    // 3. Add GSAP Components
    const componentsCode = `
const GsapTextFill = ({ text, className }) => {
  const containerRef = useRef();
  
  useGSAP(() => {
    gsap.to('.text-fill-layer', {
      backgroundPositionX: '0%',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        end: 'bottom 40%',
        scrub: 1,
      }
    });
  }, { scope: containerRef });

  return (
    <span ref={containerRef} className={\`relative inline-block \${className}\`}>
      <span className="text-white/20">{text}</span>
      <span 
        className="absolute top-0 left-0 text-white text-fill-layer"
        style={{
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundImage: 'linear-gradient(90deg, #C7FF2F 50%, transparent 50%)',
          backgroundSize: '200% 100%',
          backgroundPositionX: '100%',
          width: '100%',
          height: '100%',
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        }}
        aria-hidden="true"
      >
        {text}
      </span>
    </span>
  );
};

const GsapHoverStagger = ({ text, className }) => {
  const containerRef = useRef();
  const chars = text.split('');

  useGSAP(() => {
    const el = containerRef.current;
    const topChars = el.querySelectorAll('.char-top');
    const bottomChars = el.querySelectorAll('.char-bottom');
    
    el.addEventListener('mouseenter', () => {
      gsap.to(topChars, { yPercent: -100, stagger: 0.02, duration: 0.3, ease: 'power2.inOut', overwrite: 'auto' });
      gsap.to(bottomChars, { yPercent: -100, stagger: 0.02, duration: 0.3, ease: 'power2.inOut', overwrite: 'auto' });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(topChars, { yPercent: 0, stagger: 0.02, duration: 0.3, ease: 'power2.inOut', overwrite: 'auto' });
      gsap.to(bottomChars, { yPercent: 0, stagger: 0.02, duration: 0.3, ease: 'power2.inOut', overwrite: 'auto' });
    });
  }, { scope: containerRef });

  return (
    <span ref={containerRef} className={\`block overflow-hidden relative cursor-pointer \${className}\`}>
      <span className="flex">
        {chars.map((c, i) => (
          <span key={i} className="char-top block relative">
            {c === ' ' ? '\\u00A0' : c}
          </span>
        ))}
      </span>
      <span className="flex absolute top-full left-0 text-primary">
        {chars.map((c, i) => (
          <span key={i} className="char-bottom block relative">
            {c === ' ' ? '\\u00A0' : c}
          </span>
        ))}
      </span>
    </span>
  );
};
`;

    if (!content.includes("const GsapTextFill")) {
        const appExportIndex = content.indexOf('export default function App');
        content = content.substring(0, appExportIndex) + componentsCode + content.substring(appExportIndex);
    }

    // 4. Implement GsapTextFill and GsapHoverStagger
    // Navbar links:
    content = content.replace(
        /<a href="#features".*?>Features<\/a>/,
        '<a href="#features"><GsapHoverStagger text="Features" className="text-sm font-semibold text-white/60 hover:text-white transition-colors" /></a>'
    );
    content = content.replace(
        /<a href="#setup".*?>Setup<\/a>/,
        '<a href="#setup"><GsapHoverStagger text="Setup" className="text-sm font-semibold text-white/60 hover:text-white transition-colors" /></a>'
    );
    content = content.replace(
        /<a href="#compare".*?>Compare<\/a>/,
        '<a href="#compare"><GsapHoverStagger text="Compare" className="text-sm font-semibold text-white/60 hover:text-white transition-colors" /></a>'
    );

    // Navbar download button:
    const navBtnRegex = /<button className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 bg-primary text-black shadow-\[0_0_20px_rgba\(199,255,47,0\.2\)\] hover:shadow-\[0_0_30px_rgba\(199,255,47,0\.4\)\]">\s*Download\s*<\/button>/;
    const navBtnReplacement = '<button className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 bg-primary text-black shadow-[0_0_20px_rgba(199,255,47,0.2)] hover:shadow-[0_0_30px_rgba(199,255,47,0.4)]"><GsapHoverStagger text="Download" className="" /></button>';
    content = content.replace(navBtnRegex, navBtnReplacement);

    // Replace some large headings with GsapTextFill
    // "Media, without the middleman."
    content = content.replace(
        /<h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">\s*Media, without the middleman.\s*<\/h2>/,
        '<h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">\n                  <GsapTextFill text="Media, without the middleman." />\n                </h2>'
    );
    // "Up and running in three steps."
    content = content.replace(
        /<h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">\s*Up and running in three steps.\s*<\/h2>/,
        '<h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">\n                <GsapTextFill text="Up and running in three steps." />\n              </h2>'
    );
    // "Continue exactly where you left off."
    content = content.replace(
        /<h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-8">\s*Continue exactly where you left off.\s*<\/h2>/,
        '<h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-8">\n                  <GsapTextFill text="Continue exactly where you left off." />\n                </h2>'
    );
    
    // "How CNS operates."
    content = content.replace(
        /<h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">\s*How CNS operates.\s*<\/h2>/,
        '<h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">\n                  <GsapTextFill text="How CNS operates." />\n                </h2>'
    );

    fs.writeFileSync('src/App.jsx', content);
    console.log('App.jsx updated with GSAP components and once: false!');
} catch (e) {
    console.error(e);
}
