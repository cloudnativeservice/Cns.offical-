import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Download() {
  const [activePlatform, setActivePlatform] = useState(null);

  const platforms = [
    { id: 'windows', title: 'Windows Server' },
    { id: 'apple', title: 'Apple ecosystem' },
    { id: 'android', title: 'Android' },
    { id: 'linux', title: 'Linux' },
    { id: 'docker', title: 'Docker' }
  ];

  const versionHistory = {
    windows: [
      { version: '2.0.1', date: 'Oct 24, 2026', changes: 'Faster hardware transcoding, improved UI.', link: 'Download .exe' },
      { version: '2.0.0', date: 'Sep 15, 2026', changes: 'Major 2.0 release. Complete rewrite.', link: 'Download .exe' },
      { version: '1.9.5', date: 'Jul 10, 2026', changes: 'Bug fixes for Windows 11 24H2.', link: 'Download .exe' },
      { version: '1.9.0', date: 'May 05, 2026', changes: 'Added HDR tone mapping.', link: 'Download .exe' },
    ],
    apple: [
      { version: '2.0.1', date: 'Oct 24, 2026', changes: 'Native Apple Silicon optimizations.', link: 'Download .dmg' },
      { version: '2.0.0', date: 'Sep 15, 2026', changes: 'Major 2.0 release. Universal binary.', link: 'Download .dmg' },
      { version: '1.9.5', date: 'Jul 10, 2026', changes: 'iOS app widget support.', link: 'App Store' },
      { version: '1.9.0', date: 'May 05, 2026', changes: 'tvOS native player rewrite.', link: 'App Store' },
    ],
    android: [
      { version: '2.0.1', date: 'Oct 24, 2026', changes: 'Android TV 14 support.', link: 'Download APK' },
      { version: '2.0.0', date: 'Sep 15, 2026', changes: 'Major 2.0 release. Material You redesign.', link: 'Download APK' },
      { version: '1.9.5', date: 'Jul 10, 2026', changes: 'Fixed ExoPlayer buffering issues.', link: 'Download APK' },
      { version: '1.9.0', date: 'May 05, 2026', changes: 'Added PiP (Picture in Picture) mode.', link: 'Download APK' },
    ],
    linux: [
      { version: '2.0.1', date: 'Oct 24, 2026', changes: 'Wayland support improvements.', link: 'Download .deb' },
      { version: '2.0.0', date: 'Sep 15, 2026', changes: 'Major 2.0 release. New AppImage format.', link: 'Download AppImage' },
      { version: '1.9.5', date: 'Jul 10, 2026', changes: 'Fixed VA-API hardware acceleration.', link: 'Download .deb' },
      { version: '1.9.0', date: 'May 05, 2026', changes: 'Ubuntu 24.04 LTS compatibility.', link: 'Download .rpm' },
    ],
    docker: [
      { version: '2.0.1', date: 'Oct 24, 2026', changes: 'Alpine base image updated to 3.20.', link: 'cns/server:2.0.1' },
      { version: '2.0.0', date: 'Sep 15, 2026', changes: 'Major 2.0 release. Multi-arch manifests.', link: 'cns/server:2.0.0' },
      { version: '1.9.5', date: 'Jul 10, 2026', changes: 'Reduced image size by 40%.', link: 'cns/server:1.9.5' },
      { version: '1.9.0', date: 'May 05, 2026', changes: 'NVIDIA container toolkit integration.', link: 'cns/server:1.9.0' },
    ]
  };

  const handleCardClick = (platformId) => {
    setActivePlatform(activePlatform === platformId ? null : platformId);
    
    // Smooth scroll to history section if opening
    if (activePlatform !== platformId) {
      setTimeout(() => {
        document.getElementById('version-history')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  return (
    <div className="bg-[#f5f6f7] min-h-screen pt-28 md:pt-40 pb-16 md:pb-32 selection:bg-primary/30 selection:text-[#111111] overflow-x-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#111111] leading-tight tracking-tight">
            Start streaming <span className="text-black/30">today.</span>
          </h1>
          <p className="text-xl text-black/40 font-medium mt-6">Select your platform to download or view version history.</p>
        </motion.div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 md:gap-6">
          
          {/* Windows */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className={`md:col-span-12 lg:col-span-8 bg-black/5 rounded-[2rem] p-10 md:p-14 relative overflow-hidden group border-2 transition-all ${activePlatform === 'windows' ? 'border-primary shadow-2xl' : 'border-transparent hover:border-black/10 hover:shadow-xl'}`}
          >
            <div className="absolute -right-8 -bottom-8 text-black/[0.03] w-72 h-72 group-hover:scale-110 transition-transform duration-1000 pointer-events-none">
              <svg viewBox="0 0 448 512" fill="currentColor"><path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"/></svg>
            </div>
            <span className="inline-block bg-black/10 text-[#111111] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6">Recommended</span>
            <h3 className="text-4xl md:text-5xl font-black text-[#111111] mb-4">Windows Server</h3>
            <p className="text-black/50 text-lg mb-10 max-w-sm font-medium">Full hardware transcoding. 4K HDR support. Zero latency local streaming.</p>
            <button onClick={() => handleCardClick('windows')} className="inline-flex items-center gap-3 bg-white text-black font-bold px-8 py-4 rounded-xl text-base hover:bg-primary hover:scale-105 transition-all shadow-lg cursor-pointer">
              Download Setup (.exe) <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </motion.div>

          {/* Apple */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className={`md:col-span-6 lg:col-span-4 bg-white rounded-[2rem] p-8 flex flex-col border-2 transition-all ${activePlatform === 'apple' ? 'border-primary shadow-2xl' : 'border-white hover:border-black/5 hover:shadow-xl'}`}
          >
            <h4 className="text-2xl font-black text-[#111111] mb-1">Apple ecosystem</h4>
            <p className="text-black/40 font-medium text-sm mb-auto">macOS · iOS · iPadOS</p>
            <div className="mt-8 space-y-3">
              <button onClick={() => handleCardClick('apple')} className="w-full flex items-center justify-center gap-2 bg-black/5 text-[#111111] font-bold py-4 rounded-xl text-sm hover:bg-black/10 transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-lg">laptop_mac</span> macOS Universal
              </button>
              <button onClick={() => handleCardClick('apple')} className="w-full flex items-center justify-center gap-2 border border-black/10 text-[#111111] font-bold py-4 rounded-xl text-sm hover:border-black/20 hover:bg-black/5 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-lg">phone_iphone</span> App Store
              </button>
            </div>
          </motion.div>

          {/* Android */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className={`md:col-span-6 lg:col-span-4 bg-white rounded-[2rem] p-8 flex flex-col border-2 transition-all ${activePlatform === 'android' ? 'border-primary shadow-2xl' : 'border-white hover:border-black/5 hover:shadow-xl'}`}
          >
            <h4 className="text-2xl font-black text-[#111111] mb-1">Android</h4>
            <p className="text-black/40 font-medium text-sm mb-auto">Mobile · Tablet · TV</p>
            <button onClick={() => handleCardClick('android')} className="mt-8 w-full flex items-center justify-center gap-2 bg-[#22c55e] text-white font-bold py-4 rounded-xl text-sm hover:brightness-110 transition-all shadow-md cursor-pointer">
              <span className="material-symbols-outlined text-lg">android</span> Download APK
            </button>
          </motion.div>

          {/* Linux */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className={`md:col-span-6 lg:col-span-4 bg-white rounded-[2rem] p-8 flex flex-col border-2 transition-all ${activePlatform === 'linux' ? 'border-primary shadow-2xl' : 'border-white hover:border-black/5 hover:shadow-xl'}`}
          >
            <h4 className="text-2xl font-black text-[#111111] mb-1">Linux</h4>
            <p className="text-black/40 font-medium text-sm mb-auto">Debian · Ubuntu · Arch</p>
            <button onClick={() => handleCardClick('linux')} className="mt-8 w-full flex items-center justify-center gap-2 border border-black/10 text-[#111111] font-bold py-4 rounded-xl text-sm hover:border-black/20 hover:bg-black/5 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-lg">terminal</span> Download .deb
            </button>
          </motion.div>

          {/* Docker */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className={`md:col-span-6 lg:col-span-4 bg-white rounded-[2rem] p-8 flex flex-col border-2 transition-all ${activePlatform === 'docker' ? 'border-primary shadow-2xl' : 'border-white hover:border-black/5 hover:shadow-xl'}`}
          >
            <h4 className="text-2xl font-black text-[#111111] mb-1">Docker</h4>
            <p className="text-black/40 font-medium text-sm mb-6">Containerized Server</p>
            <div onClick={() => handleCardClick('docker')} className="mt-auto bg-black/5 border border-black/10 rounded-xl px-5 py-4 flex items-center justify-between transition-all shadow-inner cursor-pointer hover:bg-black/10">
              <code className="text-black/80 font-mono text-sm">docker pull cns</code>
              <span className="material-symbols-outlined text-black/40 text-sm transition-colors">content_copy</span>
            </div>
          </motion.div>
        </div>

        {/* Version History Table */}
        <AnimatePresence>
          {activePlatform && (
            <motion.div
              id="version-history"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 overflow-hidden"
            >
              <div className="bg-white rounded-[2rem] border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
                <div className="bg-[#111111] px-8 py-6 flex items-center justify-between">
                  <h3 className="text-white font-black text-2xl tracking-tight">
                    {platforms.find(p => p.id === activePlatform)?.title} Versions
                  </h3>
                  <button onClick={() => setActivePlatform(null)} className="text-white/50 hover:text-white transition-colors bg-white/10 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[700px]">
                    <thead>
                      <tr className="bg-[#f5f6f7] border-b border-black/5">
                        <th className="py-5 px-8 font-bold text-sm text-black/40 uppercase tracking-widest w-[15%]">Version</th>
                        <th className="py-5 px-8 font-bold text-sm text-black/40 uppercase tracking-widest w-[20%]">Release Date</th>
                        <th className="py-5 px-8 font-bold text-sm text-black/40 uppercase tracking-widest w-[45%]">Changelog</th>
                        <th className="py-5 px-8 font-bold text-sm text-black/40 uppercase tracking-widest w-[20%]">Link</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {versionHistory[activePlatform].map((v, i) => (
                        <motion.tr 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + (i * 0.05) }}
                          key={i} 
                          className="hover:bg-black/[0.02] transition-colors group"
                        >
                          <td className="py-5 px-8">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${i === 0 ? 'bg-primary/20 text-black/80' : 'bg-black/5 text-black/60'}`}>
                              {v.version}
                            </span>
                          </td>
                          <td className="py-5 px-8 text-black/60 font-medium text-sm">{v.date}</td>
                          <td className="py-5 px-8 text-[#111111] font-medium text-sm">{v.changes}</td>
                          <td className="py-5 px-8">
                            <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('openWaitlist')); }} className="text-primary font-bold hover:underline flex items-center gap-1 text-sm">
                              {v.link}
                              <span className="material-symbols-outlined text-xs">download</span>
                            </a>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
