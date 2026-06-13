const fs = require('fs');

const appContent = fs.readFileSync('src/App.jsx', 'utf-8');

// We will write MainLayout.jsx
const mainLayoutContent = `import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Features', link: '/features' },
    { name: 'Setup', link: '/setup' },
    { name: 'Compare', link: '/compare' },
    { name: 'Download', link: '/download' },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6f7] selection:bg-primary/30 selection:text-[#111111]">
      <header className={\`fixed top-0 w-full z-50 transition-all duration-300 \${scrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'}\`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 z-50 group">
            <span className="material-symbols-outlined text-primary text-3xl group-hover:rotate-180 transition-transform duration-500">play_circle</span>
            <span className="text-2xl font-black tracking-tighter text-white">CNS</span>
          </Link>
          <nav className="hidden md:flex gap-8 items-center bg-[#111111]/50 backdrop-blur-md px-8 py-3 rounded-full border border-white/10">
            {navItems.map((item) => (
              <Link key={item.name} to={item.link} className="text-sm font-bold text-white/70 hover:text-white transition-colors">
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/download" className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-primary transition-colors hover:shadow-[0_0_20px_rgba(199,255,47,0.3)] text-sm">Get App</Link>
          </div>
          <button className="md:hidden z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className={\`w-6 h-0.5 bg-white transition-all \${isMenuOpen ? 'rotate-45 translate-y-2' : ''}\`}></span>
            <span className={\`w-6 h-0.5 bg-white transition-all \${isMenuOpen ? 'opacity-0' : ''}\`}></span>
            <span className={\`w-6 h-0.5 bg-white transition-all \${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}\`}></span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-40 bg-[#050505] flex flex-col pt-24 px-6 md:hidden">
            {navItems.map((item, i) => (
              <motion.a initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={item.name} href={item.link} onClick={() => setIsMenuOpen(false)} className="text-3xl font-black text-white border-b border-white/10 py-6">
                {item.name}
              </motion.a>
            ))}
            <Link to="/download" onClick={() => setIsMenuOpen(false)} className="mt-8 bg-primary text-black py-4 rounded-xl font-bold text-center text-lg">Get CNS Free</Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Outlet />
      </main>

      <footer className="bg-[#050505] text-white pt-24 pb-12 px-4 sm:px-8 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">play_circle</span>
              <span className="text-2xl font-black tracking-tighter">CNS</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">The high-performance local media server engineered for speed, privacy, and flawless playback across all your devices.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 tracking-widest text-xs text-white/40">PRODUCT</h4>
            <ul className="space-y-4">
              {['Download', 'Features', 'Changelog', 'Roadmap'].map(i => (
                <li key={i}><Link to={\`/\${i.toLowerCase()}\`} className="text-white/60 hover:text-white transition-colors text-sm">{i}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 tracking-widest text-xs text-white/40">DEVELOPERS</h4>
            <ul className="space-y-4">
              {['Documentation', 'API Reference', 'GitHub', 'Community'].map(i => (
                <li key={i}><Link to={\`/\${i.replace(' ', '').toLowerCase()}\`} className="text-white/60 hover:text-white transition-colors text-sm">{i}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 tracking-widest text-xs text-white/40">LEGAL</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'License', 'Contact Us'].map(i => (
                <li key={i}><Link to={\`/\${i.replace(/ /g, '').toLowerCase()}\`} className="text-white/60 hover:text-white transition-colors text-sm">{i}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">© 2026 CNS Media. Open source core.</p>
          <div className="flex gap-4">
            {['code', 'forum', 'play_circle'].map(icon => (
              <a key={icon} href="#" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white flex items-center justify-center text-white/50 transition-all">
                <span className="material-symbols-outlined text-sm">{icon}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
`;

fs.writeFileSync('src/layouts/MainLayout.jsx', mainLayoutContent);
console.log('MainLayout.jsx created');
