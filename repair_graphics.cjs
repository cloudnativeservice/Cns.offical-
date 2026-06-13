const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf-8');

// 1. Fix GsapTextFill
const gsapTextFillOld = `const GsapTextFill = ({ text, className }) => {
  const containerRef = useRef();
  const words = text.split(' ');
  
  useGSAP(() => {
    gsap.to('.fill-word', {
      color: '#FFFFFF',
      stagger: 0.15,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        end: 'bottom 50%',
        scrub: 1,
      }
    });
  }, { scope: containerRef });

  return (
    <span ref={containerRef} className={\`inline-block \${className}\`}>
      {words.map((w, i) => (
        <span key={i} className="fill-word text-white/20 inline-block mr-[0.25em]">
          {w}
        </span>
      ))}
    </span>
  );
};`;

const gsapTextFillNew = `const GsapTextFill = ({ text, className }) => {
  const containerRef = useRef();
  const words = text.split(' ');
  
  useGSAP(() => {
    gsap.to('.fill-word', {
      opacity: 1,
      stagger: 0.15,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        end: 'bottom 50%',
        scrub: 1,
      }
    });
  }, { scope: containerRef });

  return (
    <span ref={containerRef} className={\`inline-block \${className}\`}>
      {words.map((w, i) => (
        <span key={i} className="fill-word text-black dark:text-white opacity-20 inline-block mr-[0.25em]">
          {w}
        </span>
      ))}
    </span>
  );
};`;

content = content.replace(gsapTextFillOld, gsapTextFillNew);

// 2. Fix corrupted tailwind classes
content = content.replace(/hover:text-black dark:text-white\/90/g, 'hover:text-black dark:hover:text-white/90');
content = content.replace(/text-black dark:text-white\/5(?!0)/g, 'text-black/5 dark:text-white/5');
content = content.replace(/hover:border-black dark:border-white/g, 'hover:border-black dark:hover:border-white');
content = content.replace(/border-black dark:border-white\/8/g, 'border-black/10 dark:border-white/10');
content = content.replace(/text-black dark:text-white\/80/g, 'text-black/80 dark:text-white/80');
content = content.replace(/text-black dark:text-white\/\[0\.02\]/g, 'text-black/[0.02] dark:text-white/[0.02]');

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx repaired.');
