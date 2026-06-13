import React from 'react';
import { motion } from 'framer-motion';

export default function Features() {
  const features = [
    {
      icon: 'devices',
      title: 'Stream Anywhere',
      benefit: 'Access your entire media library across desktop, mobile, tablet and smart TV from a single unified platform.',
      outcome: 'Continue watching exactly where you left off, regardless of device.',
      delay: 0.1
    },
    {
      icon: 'auto_awesome',
      title: 'Smart Library',
      benefit: 'Automatically organize movies, TV shows and music into a clean, searchable library.',
      outcome: 'Spend less time browsing folders and more time enjoying your content.',
      delay: 0.2
    },
    {
      icon: 'qr_code_scanner',
      title: 'Instant Device Pairing',
      benefit: 'Connect any device in seconds using secure QR code authentication.',
      outcome: 'No manual IP configuration, no complex setup, and no technical knowledge required.',
      delay: 0.3
    },
    {
      icon: 'cloud_off',
      title: 'Private Media Cloud',
      benefit: 'Your media stays under your absolute control.',
      outcome: 'Unlike traditional streaming platforms, CNS does not require uploading your content to third-party servers.',
      delay: 0.4
    },
    {
      icon: 'sync',
      title: 'Cross Platform Ecosystem',
      benefit: 'One library. Every device.',
      outcome: 'Access the same content seamlessly from desktop, mobile and tablet with synchronized playback and real-time updates.',
      delay: 0.5
    }
  ];

  return (
    <div className="bg-[#f5f6f7] min-h-screen pt-40 pb-32 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 bg-black/5 text-[#111111] text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-8">
            Why Choose CNS
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#111111] tracking-tighter mb-8 leading-tight">
            Engineered for <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-700">Flawless Playback.</span>
          </h1>
          <p className="text-xl md:text-2xl text-black/60 leading-relaxed max-w-3xl mx-auto font-medium">
            We built CNS to solve the most frustrating problems in local media streaming.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: feature.delay, duration: 0.6 }}
              className={`bg-white rounded-[2rem] p-10 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden ${idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              {/* Background gradient effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="w-16 h-16 rounded-[1.25rem] bg-[#111111] flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
                <span className="material-symbols-outlined text-white group-hover:text-black text-3xl transition-colors">{feature.icon}</span>
              </div>
              
              <h3 className="text-2xl font-black text-[#111111] mb-4 tracking-tight">{feature.title}</h3>
              
              <p className="text-lg text-black/80 font-semibold leading-snug mb-6">
                {feature.benefit}
              </p>
              
              <div className="w-full h-px bg-black/10 mb-6 group-hover:bg-primary/30 transition-colors" />
              
              <p className="text-black/60 leading-relaxed text-sm md:text-base font-medium">
                {feature.outcome}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-32 text-center bg-[#111111] rounded-[3rem] p-16 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h2 className="text-4xl font-black text-white tracking-tight mb-6">Ready to experience the difference?</h2>
          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">Join thousands of users who have already switched to the ultimate local media ecosystem.</p>
          <button onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('openWaitlist')); }} className="inline-block bg-primary text-black px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 hover:shadow-[0_0_40px_rgba(199,255,47,0.4)] transition-all duration-300">
            Download CNS Now
          </button>
        </motion.div>

      </div>
    </div>
  );
}
