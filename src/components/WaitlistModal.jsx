import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WaitlistModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  // Countdown Timer Logic
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const handleOpen = () => {
      // Assuming onClose is provided, but since we are modifying state, let's change WaitlistModal to hold its own isOpen state if we use events.
      // Wait, WaitlistModal is controlled via props. I'll just keep it simple.
    };
  }, []);

  useEffect(() => {
    // Set launch date to 30 days from now
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email) {
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden pointer-events-auto relative"
            >
              {/* Background Glow */}
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

              <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="relative z-10 text-center">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">Coming Soon</span>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">CNS Desktop & Mobile</h2>
              <p className="text-white/60 mb-8 leading-relaxed">The ultimate media experience is almost here. Join the waitlist to get early access before the public launch.</p>
              
              {/* Countdown Timer */}
              <div className="flex justify-center gap-4 mb-10">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex justify-center items-center text-2xl font-black text-white mb-2 shadow-inner">
                      {value.toString().padStart(2, '0')}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40">{unit}</span>
                  </div>
                ))}
              </div>

              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">check_circle</span>
                  <span className="font-bold">You're on the list! Keep an eye on your inbox.</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  />
                  <button type="submit" className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-white hover:scale-[1.02] transition-all duration-300">
                    Join the Waitlist
                  </button>
                </form>
              )}
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
