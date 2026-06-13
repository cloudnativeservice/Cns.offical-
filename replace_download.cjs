const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.jsx', 'utf-8');

// 1. Add AnimatePresence import
if (!content.includes('AnimatePresence')) {
  content = content.replace('import { motion, useScroll, useTransform } from \'framer-motion\';', 'import { motion, useScroll, useTransform, AnimatePresence } from \'framer-motion\';');
}

// 2. Find the start and end of the DOWNLOADS section
const downloadStartIdx = content.indexOf('{/* DOWNLOADS */}');
// the end is just before {/* FOOTER */}
const footerStartIdx = content.indexOf('{/* FOOTER */}');

if (downloadStartIdx !== -1 && footerStartIdx !== -1) {
  const faqSection = `
 {/* FAQ SECTION */}
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
     </motion.div>

     <div className="space-y-6">
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
`;

  content = content.substring(0, downloadStartIdx) + faqSection + content.substring(footerStartIdx);
  
  // We need to inject the FAQItem component.
  // We can just add it before `function Home() {`
  const faqItemComponent = `
const FAQItem = ({ faq, index }) => {
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
};

`;

  // Inject before `function Home()`
  content = content.replace('function Home() {', faqItemComponent + 'function Home() {');
  
  fs.writeFileSync('src/pages/Home.jsx', content);
  console.log('Replaced Download section with FAQ section.');
} else {
  console.error('Could not find DOWNLOADS or FOOTER sections.');
}
