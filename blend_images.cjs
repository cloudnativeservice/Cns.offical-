const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf-8');

// Add mix-blend-mode to images so their black background becomes transparent against the dark section background
content = content.replace(/className="w-full h-auto object-contain/g, 'className="w-full h-auto object-contain mix-blend-lighten scale-[1.1] md:scale-[1.3] transform-gpu');

// Force the feature sections to be dark so the black backgrounds blend perfectly
content = content.replace(/data-light-bg="#F4F4F6" data-dark-bg="#050505"/g, 'data-light-bg="#050505" data-dark-bg="#050505"');
content = content.replace(/data-light-bg="#FAEDE6" data-dark-bg="#080A08"/g, 'data-light-bg="#080A08" data-dark-bg="#080A08"');

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx adjusted for black-background images.');
