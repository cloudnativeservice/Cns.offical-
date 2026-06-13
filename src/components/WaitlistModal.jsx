import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, onSnapshot } from 'firebase/firestore';

export default function WaitlistModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Countdown Timer Logic
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [targetDate, setTargetDate] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'config', 'waitlist'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().targetDate) {
        const dateStr = docSnap.data().targetDate;
        const timeStr = docSnap.data().targetTime || '00:00';
        setTargetDate(new Date(`${dateStr}T${timeStr}`));
      } else {
        // Fallback to 30 days
        const fallback = new Date();
        fallback.setDate(fallback.getDate() + 30);
        setTargetDate(fallback);
      }
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'emails'), {
        email: email,
        timestamp: serverTimestamp()
      });
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setEmail('');
      }, 3000);
    } catch (error) {
      console.error("Error adding email to waitlist:", error);
      alert("Failed to join waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
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

              {isSuccess ? (
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
                  <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-white hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2">
                    {isSubmitting ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : null}
                    {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
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
