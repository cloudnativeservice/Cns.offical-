import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const fadeInUp = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: { staggerChildren: 0.15 }
 }
};

const LazyVideo = ({ src, className }) => {
 const videoRef = useRef(null);

 useEffect(() => {
 const observer = new IntersectionObserver(
 (entries) => {
 entries.forEach((entry) => {
 if (entry.isIntersecting) {
 videoRef.current?.play().catch(e => console.log('Autoplay prevented:', e));
 } else {
 videoRef.current?.pause();
 }
 });
 },
 { threshold: 0.2 }
 );

 if (videoRef.current) {
 observer.observe(videoRef.current);
 }

 return () => {
 if (videoRef.current) {
 observer.unobserve(videoRef.current);
 }
 };
 }, []);

 return (
 <div className={`bg-black rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${className}`}>
 <video
 ref={videoRef}
 src={src}
 muted
 loop
 playsInline
 className="w-full h-full object-cover rounded-[24px]"
 />
 </div>
 );
};



const GsapTextFill = ({ text, className }) => {
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
 <span ref={containerRef} className={`inline-block ${className}`}>
 {words.map((w, i) => (
 <span key={i} className="fill-word text-[#111111] opacity-20 inline-block mr-[0.25em]">
 {w}
 </span>
 ))}
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
 <span ref={containerRef} className={`block overflow-hidden relative ${className}`}>
 <span className="flex">
 {chars.map((c, i) => (
 <span key={i} className="char-top block relative">
 {c === ' ' ? '\u00A0' : c}
 </span>
 ))}
 </span>
 <span className="flex absolute top-full left-0 text-primary">
 {chars.map((c, i) => (
 <span key={i} className="char-bottom block relative">
 {c === ' ' ? '\u00A0' : c}
 </span>
 ))}
 </span>
 </span>
 );
};

const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-black/10 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 md:py-8 flex justify-between items-center text-left focus:outline-none group gap-4"
      >
        <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-[#111111] group-hover:text-black/60'}`}>
          {faq.q}
        </h3>
        <span className={`material-symbols-outlined text-black/30 transition-transform duration-500 flex-shrink-0 ${isOpen ? 'rotate-180 text-primary' : ''}`}>
          expand_more
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="text-black/60 font-medium text-base md:text-lg pb-8 leading-relaxed max-w-3xl">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function Home() {
 const theme = 'dark';
 useEffect(() => {
 document.documentElement.classList.add('dark');
 }, []);

 const [scrolled, setScrolled] = useState(false);
 
 useEffect(() => {
 if (theme === 'dark') {
 document.documentElement.classList.add('dark');
 localStorage.setItem('theme', 'dark');
 } else {
 document.documentElement.classList.remove('dark');
 localStorage.setItem('theme', 'light');
 }
 // Re-trigger observer
 window.dispatchEvent(new Event('scroll'));
 }, [theme]);

 const [navbarVisible, setNavbarVisible] = useState(true);
 const [activeSectionBg, setActiveSectionBg] = useState('#f5f6f7');
 const lastScrollY = useRef(0);

 useEffect(() => {
 const handleScroll = () => {
 const currentScrollY = window.scrollY;
 
 setScrolled(currentScrollY > 50);
 
 if (currentScrollY > 50) {
 if (currentScrollY > lastScrollY.current) {
 setNavbarVisible(false); // scrolling down
 } else {
 setNavbarVisible(true); // scrolling up
 }
 } else {
 setNavbarVisible(true); // at the top
 }
 
 lastScrollY.current = currentScrollY;
 };

 window.addEventListener('scroll', handleScroll, { passive: true });
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 useEffect(() => {
 const observer = new IntersectionObserver(
 (entries) => {
 entries.forEach((entry) => {
 if (entry.isIntersecting) {
 const isDark = document.documentElement.classList.contains('dark');
 const color = entry.target.getAttribute(isDark ? 'data-dark-bg' : 'data-light-bg');
 if (color) {
 setActiveSectionBg(color);
 }
 }
 });
 },
 { threshold: 0.35 }
 );

 const sections = document.querySelectorAll('section[data-dark-bg]');
 sections.forEach((sec) => observer.observe(sec));

 return () => observer.disconnect();
 }, []);

 return (
 <div className="min-h-screen font-body overflow-x-hidden w-full transition-colors duration-1000 ease-in-out" style={{ backgroundColor: activeSectionBg }}>
 
 {/* 1. Navbar (Always Dark, Smart Scroll) */}
 

 <main>
 {/* 2. Hero Section (Always Dark) - WITH CSS MASK FADE */}
 <section style={{ WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)', paddingBottom: '15vh' }} data-light-bg="#f5f6f7" data-dark-bg="#f5f6f7" className="relative min-h-[115vh] flex flex-col items-center justify-center pt-24 overflow-hidden bg-black">
 {/* Cinematic Video Background */}
 <video 
 autoPlay loop muted playsInline
 className="absolute inset-0 w-full h-full object-cover z-0"
 src="/images/CNS_product_launch_film_202606121322.mp4"
 />

 <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.65), rgba(0,0,0,0.85))' }}></div>

 <motion.div 
 initial="hidden" animate="visible" variants={staggerContainer}
 className="relative z-10 w-full max-w-[1100px] mx-auto px-4 sm:px-6 text-center"
 >
 <motion.h1 variants={fadeInUp} className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.1] md:leading-[1] tracking-tight mb-6 text-white mt-8">
 Your Personal <br/>
 <span className="text-primary">Media Cloud.</span>
 </motion.h1>
 
 <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
 Stream your movies, shows, and music from your PC to any device in the world. No subscriptions. Enterprise-grade performance.
 </motion.p>
 
 {/* Download Pills */}
 <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-8">
 <button className="bg-primary text-black px-6 sm:px-8 py-3 rounded-2xl font-bold shadow-[0_0_40px_rgba(199,255,47,0.3)] hover:shadow-[0_0_60px_rgba(199,255,47,0.5)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
 <span className="material-symbols-outlined">desktop_windows</span> Windows
 </button>
 <button className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 sm:px-8 py-3 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2">
 <span className="material-symbols-outlined">android</span> Android
 </button>
 <button className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 sm:px-8 py-3 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2">
 <span className="material-symbols-outlined">terminal</span> Linux
 </button>
 </motion.div>

 {/* Trust Badges */}
 <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-12 text-xs sm:text-sm font-bold text-white/60 uppercase tracking-widest">
 <div className="flex items-center justify-center gap-2"><span className="material-symbols-outlined text-primary text-base sm:text-lg">gpp_good</span> Local First</div>
 <div className="flex items-center justify-center gap-2"><span className="material-symbols-outlined text-primary text-base sm:text-lg">4k</span> 4K Streaming</div>
 <div className="flex items-center justify-center gap-2"><span className="material-symbols-outlined text-primary text-base sm:text-lg">all_inclusive</span> Unlimited Library</div>
 </motion.div>
 </motion.div>
 </section>


 {/* PLATFORM BAR */}
 <section data-light-bg="#f5f6f7" data-dark-bg="#f5f6f7" className="py-10 border-b border-black/8 transition-colors duration-1000 -mt-[15vh] relative z-20 pt-[15vh]">
 <div className="max-w-[1200px] mx-auto px-6">
 <div className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-8 md:gap-x-12 gap-y-6">
 <span className="text-[10px] font-bold tracking-[0.35em] text-black/40 uppercase mr-4">Platforms</span>
 {[
 { label: 'Windows', icon: 'desktop_windows' },
 { label: 'macOS', icon: 'laptop_mac' },
 { label: 'Linux', icon: 'terminal' },
 { label: 'Android', icon: 'android' },
 { label: 'iOS', icon: 'phone_iphone' },
 { label: 'Web', icon: 'language' },
 ].map(({ label, icon }) => (
 <div key={label} className="flex items-center gap-2 text-black/40 hover:text-[#111111] transition-all duration-300 group">
 <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">{icon}</span>
 <span className="text-sm font-bold tracking-wide">{label}</span>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* FEATURES - INTERLEAVED WITH APP GALLERY IMAGES */}
 <section data-light-bg="#f0f1f2" data-dark-bg="#f0f1f2" className="py-16 md:py-36 border-b border-black/8 transition-colors duration-1000" id="features">
 <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
 <motion.div
 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
 className="mb-24 text-center"
 >
 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] leading-tight tracking-tight mt-4 max-w-4xl mx-auto">
 Built strictly for <span className="text-black/30">performance</span>.<br />
 Designed purely for <span className="text-black/30">you</span>.
 </h2>
 </motion.div>

 <div className="space-y-16 md:space-y-32">
 {/* Feature 1 */}
 <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-20">
 <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8 }} className="flex-1">
 <div className="w-14 h-14 rounded-2xl bg-[#111111] flex items-center justify-center mb-6 shadow-lg">
 <span className="material-symbols-outlined text-white text-2xl">bolt</span>
 </div>
 <div className="mb-3 inline-block text-[10px] font-bold tracking-[0.2em] text-black/50 border border-black/10 px-3 py-1 rounded-full uppercase">PERFORMANCE</div>
 <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111] tracking-tight mb-4">Zero Latency 4K</h3>
 <p className="text-black/60 leading-relaxed text-base sm:text-lg">Engineered in Rust & Go for bare-metal performance. Expect sub-10ms response times and flawless 4K HDR playback with full Dolby Vision support from your drive to any screen.</p>
 </motion.div>
 <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8 }} className="flex-1 w-full">
 <div className="relative flex items-center justify-center">
 <motion.img 
 animate={{ y: [0, -12, 0] }} 
 whileHover={{ scale: 1.05 }}
 transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut" }, scale: { duration: 0.8, ease: "easeOut" } }}
 src="ASSETS/stream anywhere cutout.png" 
 alt="Stream Anywhere" 
 className="w-full h-auto object-contain md:scale-[1.15] transform-gpu drop-shadow-[0_25px_35px_rgba(0,0,0,0.15)] hover:drop-shadow-[0_35px_45px_rgba(0,0,0,0.2)] transition-all duration-[1s]" 
 />
 </div>
 </motion.div>
 </div>

 {/* Feature 2 */}
 <div className="flex flex-col md:flex-row-reverse items-center gap-8 lg:gap-20">
 <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8 }} className="flex-1">
 <div className="w-14 h-14 rounded-2xl bg-[#111111] flex items-center justify-center mb-6 shadow-lg">
 <span className="material-symbols-outlined text-white text-2xl">auto_awesome</span>
 </div>
 <div className="mb-3 inline-block text-[10px] font-bold tracking-[0.2em] text-black/50 border border-black/10 px-3 py-1 rounded-full uppercase">ORGANIZATION</div>
 <h3 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight mb-4">Rich Automated Metadata</h3>
 <p className="text-black/60 leading-relaxed text-lg">Drop a file in your folder, and CNS does the rest. It automatically fetches gorgeous cinematic posters, cast details, ratings, and descriptions to turn a messy folder into a beautiful library.</p>
 </motion.div>
 <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8 }} className="flex-1 w-full">
 <div className="relative flex items-center justify-center">
 <motion.img 
 animate={{ y: [0, -15, 0] }} 
 whileHover={{ scale: 1.05 }}
 transition={{ y: { repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.2 }, scale: { duration: 0.8, ease: "easeOut" } }}
 src="ASSETS/smart librery.png" 
 alt="Smart Library" 
 className="w-full h-auto object-contain md:scale-[1.15] transform-gpu drop-shadow-[0_25px_35px_rgba(0,0,0,0.15)] hover:drop-shadow-[0_35px_45px_rgba(0,0,0,0.2)] transition-all duration-[1s]" 
 />
 </div>
 </motion.div>
 </div>

 {/* Feature 3 */}
 <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-20">
 <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8 }} className="flex-1">
 <div className="w-14 h-14 rounded-2xl bg-[#111111] flex items-center justify-center mb-6 shadow-lg">
 <span className="material-symbols-outlined text-white text-2xl">graphic_eq</span>
 </div>
 <div className="mb-3 inline-block text-[10px] font-bold tracking-[0.2em] text-black/50 border border-black/10 px-3 py-1 rounded-full uppercase">AUDIO</div>
 <h3 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight mb-4">Hi-Res Audio Support</h3>
 <p className="text-black/60 leading-relaxed text-lg">Don't compromise your sound system. CNS streams lossless FLAC, ALAC, and spatial audio formats directly to your receiver without crushing the bitrate.</p>
 </motion.div>
 <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8 }} className="flex-1 w-full">
 <div className="relative flex items-center justify-center">
 <motion.img 
 animate={{ y: [0, -10, 0] }} 
 whileHover={{ scale: 1.05 }}
 transition={{ y: { repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.4 }, scale: { duration: 0.8, ease: "easeOut" } }}
 src="ASSETS/your music everywhere.png" 
 alt="Your Music Everywhere" 
 className="w-full h-auto object-contain md:scale-[1.15] transform-gpu drop-shadow-[0_25px_35px_rgba(0,0,0,0.15)] hover:drop-shadow-[0_35px_45px_rgba(0,0,0,0.2)] transition-all duration-[1s]" 
 />
 </div>
 </motion.div>
 </div>

 {/* Feature 4 */}
 <div className="flex flex-col md:flex-row-reverse items-center gap-8 lg:gap-20">
 <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8 }} className="flex-1">
 <div className="w-14 h-14 rounded-2xl bg-[#111111] flex items-center justify-center mb-6 shadow-lg">
 <span className="material-symbols-outlined text-white text-2xl">lock</span>
 </div>
 <div className="mb-3 inline-block text-[10px] font-bold tracking-[0.2em] text-black/50 border border-black/10 px-3 py-1 rounded-full uppercase">SECURITY</div>
 <h3 className="text-3xl md:text-4xl font-bold text-[#111111] tracking-tight mb-4">E2E Encrypted Architecture</h3>
 <p className="text-black/60 leading-relaxed text-lg">Military-grade encryption ensures your media never reaches our relay servers unencrypted. Your data stays completely private within the CNS ecosystem.</p>
 </motion.div>
 <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8 }} className="flex-1 w-full">
 <div className="relative flex items-center justify-center">
 <motion.img 
 animate={{ y: [0, -12, 0] }} 
 whileHover={{ scale: 1.05 }}
 transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.6 }, scale: { duration: 0.8, ease: "easeOut" } }}
 src="ASSETS/The cns eco system.png" 
 alt="The CNS Ecosystem" 
 className="w-full h-auto object-contain md:scale-[1.15] transform-gpu drop-shadow-[0_25px_35px_rgba(0,0,0,0.15)] hover:drop-shadow-[0_35px_45px_rgba(0,0,0,0.2)] transition-all duration-[1s]" 
 />
 </div>
 </motion.div>
 </div>

 </div>
 </div>
 </section>

 {/* CONTINUE WATCHING */}
 <section data-light-bg="#ffffff" data-dark-bg="#ffffff" className="py-16 md:py-36 border-b border-black/8 transition-colors duration-1000" id="continue-watching">
 <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
 <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
 <motion.div
 initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
 >
 <div className="inline-flex items-center gap-2 bg-black/5 text-[#111111] text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-8">
 Seamless Sync
 </div>
 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] leading-tight tracking-tight mb-6 md:mb-8">
 <GsapTextFill text="Continue exactly where you left off." />
 </h2>
 <div className="space-y-6">
 {['Start a movie on your desktop.', 'Continue on your mobile device.', 'Everything syncs instantly.'].map((text, i) => (
 <motion.div key={text} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: false, amount: 0.1 }} transition={{ delay: 0.2 + i * 0.1 }}
 className="flex items-center gap-3 md:gap-4 text-black/70 font-medium text-base sm:text-lg group"
 >
 <span className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-300">{i + 1}</span>
 {text}
 </motion.div>
 ))}
 </div>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
 className="relative group"
 >
 <div className="absolute -inset-4 bg-black/[0.02] rounded-[2rem] group-hover:bg-black/[0.04] transition-colors duration-500"></div>
 <div className="relative rounded-3xl overflow-hidden shadow-xl border border-black/8">
 <LazyVideo src="ASSETS/new section videos/CNS_commercial_seamless_sync_202606121846.mp4" className="!rounded-none w-full aspect-video border-0 !shadow-none group-hover:scale-105 transition-transform duration-[2s]" />
 </div>
 
 {/* Floating Cutout Over the Video */}
 <motion.img 
 animate={{ y: [0, -15, 0] }} 
 transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
 src="ASSETS/contunue watching.png" 
 alt="Continue Watching Cutout" 
 className="absolute -bottom-8 -right-4 sm:-right-8 w-28 sm:w-40 md:w-56 h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] z-20 pointer-events-none group-hover:scale-110 transition-transform duration-[1s]" 
 />
 </motion.div>
 </div>
 </div>
 </section>

 {/* SETUP - REDESIGNED */}
 <section data-light-bg="#f5f6f7" data-dark-bg="#f5f6f7" className="py-16 md:py-36 border-b border-black/8 transition-colors duration-1000" id="setup">
 <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
 <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8 }} className="text-center mb-12 md:mb-20">
 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] leading-tight tracking-tight">
 <GsapTextFill text="Up and running in three steps." />
 </h2>
 <p className="text-black/50 text-base sm:text-lg mt-4 md:mt-6 max-w-2xl mx-auto leading-relaxed">No IT degree. No complex manuals. Just straightforward setup to get you streaming immediately.</p>
 </motion.div>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-24 relative z-10">
 {[
 { n: '01', icon: 'download', title: 'Install CNS Server', desc: "Grab the ultra-lightweight server app for Windows, macOS, or Linux. It installs in a single click." },
 { n: '02', icon: 'folder_open', title: 'Point at Your Library', desc: 'Select your media folders. CNS auto-indexes everything — movies, music, and photos — instantly.' },
 { n: '03', icon: 'qr_code_scanner', title: 'Scan & Stream', desc: "Open the CNS app on any device, scan the QR code from your desktop, and you're securely connected." },
 ].map(({ n, icon, title, desc }, i) => (
 <motion.div key={n}
 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.6, delay: i * 0.1 }}
 className="bg-white border border-black/8 rounded-[2rem] p-8 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group"
 >
 <div className="absolute top-6 right-8 text-7xl font-black text-black/5 select-none group-hover:text-primary/10 transition-colors duration-300">{n}</div>
 <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1.25rem] bg-[#111111] text-white flex items-center justify-center mb-5 md:mb-8 shadow-md group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-300">
 <span className="material-symbols-outlined text-2xl md:text-3xl">{icon}</span>
 </div>
 <h3 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4 text-[#111111]">{title}</h3>
 <p className="text-black/60 leading-relaxed text-sm sm:text-base relative z-10">{desc}</p>
 </motion.div>
 ))}
 </div>

 {/* Beautiful Central Desktop Image */}
 <motion.div 
 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8, delay: 0.2 }}
 className="relative max-w-5xl mx-auto group perspective-1000"
 >
 <div className="absolute -inset-10 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-1000"></div>
 <motion.img 
 animate={{ y: [0, -15, 0] }} 
 transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
 src="ASSETS/new section videos/image.png" 
 alt="Desktop UI" 
 className="w-full h-auto object-contain md:scale-[1.15] transform-gpu drop-shadow-[0_30px_50px_rgba(0,0,0,0.2)] group-hover:scale-[1.02] transition-transform duration-[1.5s] relative z-20 rounded-[2rem]"
 />
 </motion.div>
 </div>
 </section>

 {/* HOW IT WORKS */}
 <section data-light-bg="#f0f1f2" data-dark-bg="#f0f1f2" className="py-16 md:py-36 border-b border-black/8 transition-colors duration-1000" id="how-it-works">
 <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
 <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8 }}
 className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
 >
 <div>
 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] leading-tight tracking-tight">
 <GsapTextFill text="How CNS operates." />
 </h2>
 </div>
 <p className="text-black/50 text-base sm:text-lg max-w-sm leading-relaxed md:mb-2">A transparent look at how your media travels securely from your hard drive to any screen in the world.</p>
 </motion.div>

 <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
 className="relative mb-16"
 >
 <div className="relative rounded-[2rem] overflow-hidden border border-black/10 shadow-2xl">
 <LazyVideo src="ASSETS/new section videos/CNS_SaaS_explainer_video_202606121846.mp4" className="!rounded-none w-full aspect-video !shadow-none" />
 </div>
 </motion.div>

 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
 {[
 { n: '1', title: 'Add Media', icon: 'add_circle' },
 { n: '2', title: 'Index Library', icon: 'video_library' },
 { n: '3', title: 'Connect', icon: 'devices' },
 { n: '4', title: 'Stream', icon: 'stream' },
 ].map(({ n, title, icon }, i) => (
 <motion.div key={n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.5, delay: i * 0.1 }}
 className="bg-white rounded-[1.5rem] p-4 md:p-6 flex flex-col items-center text-center gap-3 md:gap-4 hover:bg-black/5 group transition-colors duration-300 shadow-sm border border-black/8"
 >
 <div className="w-12 h-12 rounded-xl bg-[#111111] group-hover:bg-primary flex items-center justify-center transition-colors">
 <span className="material-symbols-outlined text-white group-hover:text-black text-2xl transition-colors">{icon}</span>
 </div>
 <span className="text-black/40 group-hover:text-black/40 font-bold text-xs tracking-widest transition-colors">STEP {n}</span>
 <span className="text-[#111111] font-bold text-base group-hover:text-[#111111] transition-colors">{title}</span>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* QR PAIRING */}
 <section data-light-bg="#f5f6f7" data-dark-bg="#f5f6f7" className="py-16 md:py-36 border-b border-black/8 transition-colors duration-1000" id="qr-pairing">
 <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
 <div className="grid lg:grid-cols-2 gap-10 lg:gap-28 items-center">
 <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
 className="relative order-2 lg:order-1 group"
 >
 <div className="absolute -inset-4 bg-black/[0.02] rounded-[2rem] pointer-events-none group-hover:bg-black/[0.04] transition-colors duration-500"></div>
 
 {/* Floating Cutout Elegantly Over the Video */}
 <motion.img 
 animate={{ y: [0, -15, 0] }} 
 transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
 src="ASSETS/pair in seconds cutout.png" 
 alt="Pair in seconds cutout" 
 className="absolute -right-4 sm:-right-12 -bottom-8 sm:-bottom-10 w-32 sm:w-48 md:w-64 h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.3)] z-20 pointer-events-none group-hover:scale-110 transition-transform duration-[1s]" 
 />

 <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-black/8 z-10 bg-black/5">
 <LazyVideo src="ASSETS/new section videos/CNS_product_demonstration_202606121849.mp4" className="!rounded-none w-full aspect-video !shadow-none group-hover:scale-105 transition-transform duration-[2s]" />
 </div>
 </motion.div>

 <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
 className="order-1 lg:order-2"
 >
 <div className="inline-flex items-center gap-2 bg-black/5 text-[#111111] text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-8">Zero Friction</div>
 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] leading-tight tracking-tight mb-6 md:mb-8">
 Pair your devices in seconds.
 </h2>
 <div className="space-y-6">
 {[
 { icon: 'qr_code', text: 'Scan the QR code displayed on your server.' },
 { icon: 'verified_user', text: 'Secure authorization instantly completes.' },
 { icon: 'play_circle', text: 'Your library is ready to stream.' },
 ].map(({ icon, text }) => (
 <div key={text} className="flex items-center gap-5 group">
 <div className="w-12 h-12 rounded-xl bg-[#111111] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
 <span className="material-symbols-outlined text-white text-xl">{icon}</span>
 </div>
 <span className="text-black/70 font-medium text-base sm:text-lg">{text}</span>
 </div>
 ))}
 </div>
 </motion.div>
 </div>
 </div>
 </section>

 {/* COMPARISON */}
 <section data-light-bg="#f0f1f2" data-dark-bg="#f0f1f2" className="py-16 md:py-36 border-b border-black/8 transition-colors duration-1000" id="compare">
 <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
 <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8 }} className="mb-16 text-center"
 >
 <h2 className="text-3xl sm:text-4xl font-black text-[#111111] leading-tight tracking-tight">
 CNS vs. The Alternatives
 </h2>
 <p className="text-black/50 text-base sm:text-lg mt-4 max-w-xl mx-auto">We respect the competition, but we built CNS to solve the fundamental flaws in existing media servers.</p>
 </motion.div>

 <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.7 }}
 className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-xl"
 >
 <div className="overflow-x-auto w-full scrollbar-hide">
 <table className="w-full text-left min-w-[600px]">
 <thead>
 <tr className="bg-black/5 text-[#111111]">
 <th className="py-4 md:py-6 px-4 md:px-8 font-bold text-sm text-black/50 w-1/4">Feature</th>
 <th className="py-4 md:py-6 px-4 md:px-8 font-black text-sm text-primary">CNS</th>
 <th className="py-4 md:py-6 px-4 md:px-8 font-medium text-sm text-black/50 w-1/4">Plex</th>
 <th className="py-4 md:py-6 px-4 md:px-8 font-medium text-sm text-black/50 w-1/4">Jellyfin</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-black/8">
 {[
 { feat: 'Core Architecture', cns: 'Rust / Go', plex: 'C++ / Python', jelly: 'C#' },
 { feat: 'Memory Footprint', cns: '< 50 MB', plex: '500 MB+', jelly: '300 MB+' },
 { feat: 'Setup Process', cns: '1-Click Local', plex: 'Account Required', jelly: 'Manual Configuration' },
 { feat: 'E2E Encryption', cns: 'Yes', plex: 'No', jelly: 'No' },
 { feat: 'Open Source', cns: 'Yes', plex: 'No', jelly: 'Yes' },
 { feat: 'QR Pairing', cns: 'Yes', plex: 'No', jelly: 'No' },
 ].map(({ feat, cns, plex, jelly }) => (
 <tr key={feat} className="hover:bg-black/[0.02] transition-colors">
 <td className="py-5 px-8 text-black/60 text-sm font-medium">{feat}</td>
 <td className="py-5 px-8 text-[#111111] font-bold text-sm bg-black/[0.03]">{cns}</td>
 <td className="py-5 px-8 text-black/40 text-sm">{plex}</td>
 <td className="py-5 px-8 text-black/40 text-sm">{jelly}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </motion.div>
 </div>
 </section>

 
 {/* FAQ SECTION */}
 <section data-light-bg="#f5f6f7" data-dark-bg="#f5f6f7" className="py-16 md:py-36 bg-[#f5f6f7]" id="faq">
 <div className="max-w-3xl mx-auto px-4 sm:px-6">
 <div className="text-center mb-10 md:mb-16">
 <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] tracking-tight mb-3 md:mb-4">
 Questions?
 </h2>
 <p className="text-base sm:text-lg md:text-xl text-black/50 font-medium">
 Everything you need to know about CNS.
 </p>
 </div>

     <div className="border-t border-black/10">
       {[
         { q: 'Is CNS free to use?', a: 'Yes. The core CNS experience is completely free forever, with no hidden limits or premium paywalls for basic features.' },
         { q: 'Do I need an active internet connection?', a: 'No. CNS operates entirely on your local network. Internet is only required if you want to access your media remotely outside your home.' },
         { q: 'Is my media data private?', a: 'Absolutely. We never scan, index, or upload your media to third-party servers. Your data stays entirely on your hardware.' },
         { q: 'Can I stream to multiple devices simultaneously?', a: 'Yes. CNS is engineered in Rust and Go to handle multiple simultaneous 4K streams with zero latency.' }
       ].map((faq, i) => (
         <FAQItem key={i} faq={faq} index={i} />
       ))}
     </div>
   </div>
 </section>
 </main>
{/* FOOTER */}
 
 </div>
 );
}

export default Home;