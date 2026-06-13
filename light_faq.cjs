const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.jsx', 'utf-8');

const oldFAQItem = `const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
      className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-md hover:bg-white/10 transition-colors duration-300"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-8 py-8 flex justify-between items-center group"
      >
        <h3 className={\`text-2xl font-bold transition-colors duration-300 \${isOpen ? 'text-primary' : 'text-white group-hover:text-white/80'}\`}>
          {faq.q}
        </h3>
        <div className={\`w-12 h-12 rounded-full flex items-center justify-center bg-white/5 transition-all duration-500 \${isOpen ? 'rotate-180 bg-primary/20 text-primary' : 'text-white/50 group-hover:bg-white/10'}\`}>
          <span className="material-symbols-outlined text-2xl">
            expand_more
          </span>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-8 pb-8 pt-0">
              <p className="text-white/60 text-lg leading-relaxed font-medium">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};`;

const newFAQItem = `const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
      className="bg-white border border-black/5 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-8 py-8 flex justify-between items-center group"
      >
        <h3 className={\`text-2xl font-bold transition-colors duration-300 \${isOpen ? 'text-primary' : 'text-[#111111] group-hover:text-black/60'}\`}>
          {faq.q}
        </h3>
        <div className={\`w-12 h-12 rounded-full flex items-center justify-center bg-black/5 transition-all duration-500 \${isOpen ? 'rotate-180 bg-primary/20 text-primary' : 'text-black/50 group-hover:bg-black/10'}\`}>
          <span className="material-symbols-outlined text-2xl">
            expand_more
          </span>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-8 pb-8 pt-0">
              <p className="text-black/60 text-lg leading-relaxed font-medium">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};`;

const oldFAQSection = ` {/* FAQ SECTION */}
 <section data-light-bg="#111111" data-dark-bg="#111111" className="py-24 md:py-36 overflow-hidden relative transition-colors duration-1000 bg-[#111111]" id="faq">
   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
   
   <div className="max-w-[1000px] mx-auto px-6 relative z-10">
     <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8 }} className="mb-20 text-center"
     >
       <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight tracking-tight mb-6">
         Questions? <br/> <span className="text-primary">We've got answers.</span>
       </h2>
       <p className="text-white/50 text-xl max-w-2xl mx-auto">Everything you need to know about the most advanced local media server.</p>
     </motion.div>`;

const newFAQSection = ` {/* FAQ SECTION */}
 <section data-light-bg="#f5f6f7" data-dark-bg="#f5f6f7" className="py-24 md:py-36 overflow-hidden relative transition-colors duration-1000 bg-[#f5f6f7]" id="faq">
   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
   
   <div className="max-w-[1000px] mx-auto px-6 relative z-10">
     <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8 }} className="mb-20 text-center"
     >
       <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#111111] leading-tight tracking-tight mb-6">
         Questions? <br/> <span className="text-black/30">We've got answers.</span>
       </h2>
       <p className="text-black/50 text-xl max-w-2xl mx-auto">Everything you need to know about the most advanced local media server.</p>
     </motion.div>`;

content = content.replace(oldFAQItem, newFAQItem);
content = content.replace(oldFAQSection, newFAQSection);

fs.writeFileSync('src/pages/Home.jsx', content);
console.log('Converted FAQ section to light theme.');
