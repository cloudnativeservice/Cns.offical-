import React from 'react';
import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <div className="bg-[#f5f6f7] min-h-screen pt-32 pb-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] p-10 md:p-16 shadow-xl border border-black/5"
        >
          <h1 className="text-4xl md:text-5xl font-black text-[#111111] tracking-tight mb-6">Terms of Service</h1>
          <p className="text-xl text-black/60 leading-relaxed max-w-3xl">
            This is the placeholder page for Terms of Service. Content will be added here shortly.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
