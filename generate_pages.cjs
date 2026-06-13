const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'Features.jsx', title: 'Features', name: 'Features' },
  { file: 'Setup.jsx', title: 'Setup Guide', name: 'Setup' },
  { file: 'Compare.jsx', title: 'Compare Plans', name: 'Compare' },
  { file: 'Download.jsx', title: 'Download CNS', name: 'Download' },
  { file: 'Changelog.jsx', title: 'Changelog', name: 'Changelog' },
  { file: 'Roadmap.jsx', title: 'Roadmap', name: 'Roadmap' },
  { file: 'Documentation.jsx', title: 'Documentation', name: 'Documentation' },
  { file: 'ApiReference.jsx', title: 'API Reference', name: 'ApiReference' },
  { file: 'Github.jsx', title: 'GitHub', name: 'Github' },
  { file: 'Community.jsx', title: 'Community', name: 'Community' },
  { file: 'PrivacyPolicy.jsx', title: 'Privacy Policy', name: 'PrivacyPolicy' },
  { file: 'TermsOfService.jsx', title: 'Terms of Service', name: 'TermsOfService' },
  { file: 'License.jsx', title: 'License', name: 'License' },
  { file: 'ContactUs.jsx', title: 'Contact Us', name: 'ContactUs' },
];

const template = (name, title) => `import React from 'react';
import { motion } from 'framer-motion';

export default function ${name}() {
  return (
    <div className="bg-[#f5f6f7] min-h-screen pt-32 pb-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] p-10 md:p-16 shadow-xl border border-black/5"
        >
          <h1 className="text-4xl md:text-5xl font-black text-[#111111] tracking-tight mb-6">${title}</h1>
          <p className="text-xl text-black/60 leading-relaxed max-w-3xl">
            This is the placeholder page for ${title}. Content will be added here shortly.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
`;

pages.forEach(p => {
  fs.writeFileSync(path.join('src', 'pages', p.file), template(p.name, p.title));
});
console.log('Pages created successfully.');
