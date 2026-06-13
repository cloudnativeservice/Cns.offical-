const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf-8');

// 1. Restore Light Mode Backgrounds
content = content.replace(/data-light-bg="#050505"/g, 'data-light-bg="#F4F4F6"');
content = content.replace(/data-light-bg="#080A08"/g, 'data-light-bg="#FAEDE6"');

// 2. Make images magically adapt to Light/Dark Mode
// In dark mode: mix-blend-lighten makes black transparent.
// In light mode: invert turns black to white (and UI becomes light mode UI!), and mix-blend-multiply makes white transparent!
content = content.replace(/className="w-full h-auto object-contain mix-blend-lighten scale-\[1\.1\] md:scale-\[1\.3\] transform-gpu"/g, 'className="w-full h-auto object-contain scale-[1.1] md:scale-[1.3] transform-gpu dark:mix-blend-lighten dark:invert-0 invert mix-blend-multiply"');

// 3. Fix the Theme Toggle not updating background immediately
// We need to keep track of the currently intersecting section.
const observerLogicOld = `  useEffect(() => {
    const sections = document.querySelectorAll('section[data-light-bg]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const isDark = document.documentElement.classList.contains('dark');
          const bg = isDark ? entry.target.dataset.darkBg : entry.target.dataset.lightBg;
          setActiveSectionBg(bg);
        }
      });
    }, { threshold: 0.5 });`;

const observerLogicNew = `  const [activeSectionRef, setActiveSectionRef] = useState(null);

  useEffect(() => {
    if (activeSectionRef) {
      const isDark = theme === 'dark';
      setActiveSectionBg(isDark ? activeSectionRef.dataset.darkBg : activeSectionRef.dataset.lightBg);
    }
  }, [theme, activeSectionRef]);

  useEffect(() => {
    const sections = document.querySelectorAll('section[data-light-bg]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSectionRef(entry.target);
        }
      });
    }, { threshold: 0.5 });`;

content = content.replace(observerLogicOld, observerLogicNew);

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx repaired: toggle fixed, light mode restored, magic blending applied.');
