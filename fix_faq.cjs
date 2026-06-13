const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.jsx', 'utf-8');

const oldFAQItem = `const FAQItem = ({ faq, index }) => {
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

const newFAQItem = `const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-black/10 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 md:py-8 flex justify-between items-center text-left focus:outline-none group gap-4"
      >
        <h3 className={\`text-lg md:text-xl font-bold transition-colors duration-300 \${isOpen ? 'text-primary' : 'text-[#111111] group-hover:text-black/60'}\`}>
          {faq.q}
        </h3>
        <span className={\`material-symbols-outlined text-black/30 transition-transform duration-500 flex-shrink-0 \${isOpen ? 'rotate-180 text-primary' : ''}\`}>
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
};`;

const oldFAQSection = ` {/* FAQ SECTION */}
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
     </motion.div>

     <div className="space-y-6">`;

const newFAQSection = ` {/* FAQ SECTION */}
 <section data-light-bg="#f5f6f7" data-dark-bg="#f5f6f7" className="py-24 md:py-36 bg-[#f5f6f7]" id="faq">
   <div className="max-w-3xl mx-auto px-4 sm:px-6">
     <div className="text-center mb-12 md:mb-16">
       <h2 className="text-4xl md:text-5xl font-black text-[#111111] tracking-tight mb-4">
         Questions?
       </h2>
       <p className="text-lg md:text-xl text-black/50 font-medium">
         Everything you need to know about CNS.
       </p>
     </div>

     <div className="border-t border-black/10">`;

content = content.replace(oldFAQItem, newFAQItem);
content = content.replace(oldFAQSection, newFAQSection);

fs.writeFileSync('src/pages/Home.jsx', content);
console.log('Fixed FAQ responsiveness and modernized it.');
