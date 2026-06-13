import React from 'react';
import { motion } from 'framer-motion';

export default function Changelog() {
  const releases = [
    {
      version: 'v1.0.1',
      date: 'June 2026',
      latest: true,
      title: 'UI Polish & Performance',
      changes: {
        features: [
          'Added dynamic scrolling behaviors to MainLayout',
          'Added responsive history tables in Download page'
        ],
        improvements: [
          'Overhauled Download section with Linear-inspired design',
          'Optimized icon rendering and SVG pathways',
          'Enhanced FAQ accordion fluidity and animations'
        ],
        fixes: [
          'Fixed icon background contrast on light themes',
          'Resolved grid-overflow issues on mobile views'
        ],
        security: []
      }
    },
    {
      version: 'v1.0.0',
      date: 'May 2026',
      latest: false,
      title: 'Initial Public Release',
      changes: {
        features: [
          'Desktop Application Engine',
          'Mobile Application Engine',
          'Instant QR Device Pairing',
          'Smart Library Categorization',
          'Cross Device Streaming Ecosystem'
        ],
        improvements: [
          'High-speed Rust/Go hybrid backend integration',
          'Zero-latency local network streaming protocol'
        ],
        fixes: [],
        security: [
          'End-to-end device authentication via localized QR handshakes'
        ]
      }
    }
  ];

  const roadmap = [
    'Smart TV App (tvOS / Android TV)',
    'AI Media Recommendations',
    'Cloud Backup & Restore',
    'Shared Family Libraries',
    'Cross-Device Watch History Sync'
  ];

  const CategorySection = ({ title, items, colorClass }) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-8 last:mb-0">
        <h4 className={`text-lg font-bold flex items-center gap-2 mb-4 ${colorClass}`}>
          {title}
        </h4>
        <ul className="space-y-3 pl-8">
          {items.map((item, idx) => (
            <li key={idx} className="text-black/60 font-medium relative text-base">
              <span className={`absolute -left-5 top-2.5 w-1.5 h-1.5 rounded-full bg-current opacity-60 ${colorClass}`}></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="bg-[#f5f6f7] min-h-screen pt-28 md:pt-40 pb-16 md:pb-32 overflow-x-hidden selection:bg-primary/30 selection:text-[#111111]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-black/5 text-[#111111] text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2.5 rounded-full mb-8 shadow-sm">
            Changelog
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#111111] leading-tight tracking-tight mb-6">
            See what's <span className="text-black/30">new.</span>
          </h1>
          <p className="text-xl text-black/50 font-medium max-w-2xl mx-auto">
            Stay updated with the latest features, improvements, and fixes in CNS.
          </p>
        </motion.div>

        {/* Timeline Entries */}
        <div className="space-y-16">
          {releases.map((release, index) => (
            <motion.div 
              key={release.version}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              className="relative pl-0 md:pl-12"
            >
              {/* Timeline Connector */}
              <div className="hidden md:block absolute left-[15px] top-12 bottom-[-4rem] w-px bg-black/10 last:bg-transparent"></div>
              
              {/* Header / Date */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-8 relative">
                <div className="hidden md:flex absolute -left-12 w-8 h-8 rounded-full bg-[#f5f6f7] border-[3px] border-black/10 items-center justify-center z-10">
                  {release.latest && <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(199,255,47,0.5)]"></div>}
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-black tracking-widest ${release.latest ? 'bg-[#111111] text-white shadow-md' : 'bg-black/5 text-[#111111]'}`}>
                    {release.version}
                  </span>
                  <span className="text-black/40 font-bold tracking-widest text-sm uppercase flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">calendar_month</span> {release.date}
                  </span>
                </div>
              </div>

              {/* Release Card */}
              <div className={`bg-white border border-black/5 rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden ${release.latest ? 'ring-1 ring-black/5' : ''}`}>
                {release.latest && (
                  <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
                )}
                
                {release.title && (
                  <h3 className="text-2xl md:text-3xl font-black text-[#111111] mb-10 tracking-tight">{release.title}</h3>
                )}

                <CategorySection title="Features" items={release.changes.features} colorClass="text-[#10b981]" />
                <CategorySection title="Improvements" items={release.changes.improvements} colorClass="text-[#3b82f6]" />
                <CategorySection title="Fixes" items={release.changes.fixes} colorClass="text-[#ef4444]" />
                <CategorySection title="Security" items={release.changes.security} colorClass="text-[#8b5cf6]" />
                
              </div>
            </motion.div>
          ))}
        </div>

        {/* Future Roadmap */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mt-32 pt-16 border-t border-black/5"
        >
          <div className="bg-[#111111] rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <span className="inline-block bg-white/10 text-white text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6 relative z-10">
              Future Roadmap
            </span>
            <h2 className="text-4xl font-black text-white mb-12 tracking-tight relative z-10">Coming Soon</h2>
            
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              {roadmap.map((item, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 text-white/80 font-medium px-6 py-3 rounded-2xl flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                  {item}
                </div>
              ))}
            </div>
            
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
