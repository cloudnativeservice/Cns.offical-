import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import WaitlistModal from '../components/WaitlistModal';

export default function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
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

  useEffect(() => {
    const openWaitlist = () => setIsWaitlistModalOpen(true);
    window.addEventListener('openWaitlist', openWaitlist);
    return () => window.removeEventListener('openWaitlist', openWaitlist);
  }, []);

  const isHome = location.pathname === '/';
  const isNavbarDetached = scrolled || !isHome;

  const navItems = [
    { name: 'Features', link: '/features', icon: 'auto_awesome' },
    { name: 'Setup', link: '/setup', icon: 'build' },
    { name: 'Compare', link: '/compare', icon: 'compare_arrows' },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6f7] selection:bg-primary/30 selection:text-[#111111]">
      <header className={`fixed z-50 transition-all duration-500 pointer-events-none ${isNavbarDetached ? 'top-4 md:top-6 left-4 right-4 max-w-5xl mx-auto' : 'top-0 left-0 right-0 w-full'}`}>
        <div className={`pointer-events-auto px-6 md:px-8 flex justify-between items-center transition-all duration-500 ${isNavbarDetached ? 'rounded-[2rem] border border-white/10 bg-[#050505]/95 backdrop-blur-2xl py-3 shadow-[0_20px_40px_rgba(0,0,0,0.5)]' : 'rounded-none border-b border-transparent bg-transparent py-5'}`}>
          <Link to="/" className="flex items-center gap-3 z-50 group">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="CNS Logo" className="h-8 w-auto group-hover:scale-110 transition-transform duration-500" />
            <span className="text-2xl font-black tracking-tighter text-white">CNS</span>
          </Link>
          <nav className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <Link key={item.name} to={item.link} className="flex items-center gap-1.5 text-sm font-bold text-white/70 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                {item.name}
              </Link>
            ))}
            <button onClick={() => setIsWaitlistModalOpen(true)} className="flex items-center gap-1.5 text-sm font-bold text-white/70 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Download
            </button>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => setIsWaitlistModalOpen(true)} className="flex items-center gap-1.5 bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-primary transition-colors hover:shadow-[0_0_20px_rgba(199,255,47,0.3)] text-sm">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Download
            </button>
          </div>
          <button className="md:hidden z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-40 bg-[#050505] flex flex-col pt-24 px-6 md:hidden">
            {navItems.map((item, i) => (
              <motion.a initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={item.name} href={item.link} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-3xl font-black text-white border-b border-white/10 py-6">
                <span className="material-symbols-outlined text-[32px] text-primary">{item.icon}</span>
                {item.name}
              </motion.a>
            ))}
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                setIsWaitlistModalOpen(true);
              }} 
              className="mt-8 flex items-center justify-center gap-2 bg-primary text-black py-4 rounded-xl font-bold text-center text-lg w-full"
            >
              <span className="material-symbols-outlined">download</span>
              Download
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Outlet />
      </main>

      <footer className="bg-[#050505] text-white pt-16 md:pt-24 pb-12 px-4 sm:px-8 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="CNS Logo" className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300" />
              <span className="text-2xl font-black tracking-tighter">CNS</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">The high-performance local media server engineered for speed, privacy, and flawless playback across all your devices.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 tracking-widest text-xs text-white/40">PRODUCT</h4>
            <ul className="space-y-4">
              {['Features', 'Changelog', 'Roadmap'].map(i => (
                <li key={i}><Link to={`/${i.toLowerCase()}`} className="text-white/60 hover:text-white transition-colors text-sm">{i}</Link></li>
              ))}
              <li><button onClick={() => setIsWaitlistModalOpen(true)} className="text-white/60 hover:text-white transition-colors text-sm text-left">Download</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 tracking-widest text-xs text-white/40">DEVELOPERS</h4>
            <ul className="space-y-4">
              {['Documentation', 'API Reference', 'GitHub', 'Community'].map(i => (
                <li key={i}><Link to={`/${i.replace(' ', '').toLowerCase()}`} className="text-white/60 hover:text-white transition-colors text-sm">{i}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 tracking-widest text-xs text-white/40">LEGAL</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'License', 'Contact Us'].map(i => (
                <li key={i}><Link to={`/${i.replace(/ /g, '').toLowerCase()}`} className="text-white/60 hover:text-white transition-colors text-sm">{i}</Link></li>
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

      <WaitlistModal 
        isOpen={isWaitlistModalOpen} 
        onClose={() => setIsWaitlistModalOpen(false)} 
      />
    </div>
  );
}
