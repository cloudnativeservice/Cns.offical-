const fs = require('fs');
const filePath = 'src/App.jsx';
let content = fs.readFileSync(filePath, 'utf-8');

const heroStart = content.indexOf('{/* 2. Hero Section (Always Dark) */}');
const heroEnd = content.indexOf('{/* 3. Built For (Trust Section) */}');

let preHero = '', hero = '', postHero = content;
if (heroStart !== -1 && heroEnd !== -1) {
    preHero = content.substring(0, heroStart);
    hero = content.substring(heroStart, heroEnd);
    postHero = content.substring(heroEnd);
}

function applyReplacements(t) {
    t = t.replace(/bg-\[\#050505\]\/95/g, 'bg-background/95');
    t = t.replace(/bg-\[\#050505\]/g, 'bg-background');
    t = t.replace(/bg-\[\#0A0A0A\]/g, 'bg-surface');
    t = t.replace(/text-white\/60/g, 'text-textMuted');
    t = t.replace(/text-white\/50/g, 'text-textMuted');
    t = t.replace(/text-white\/40/g, 'text-textMuted');
    t = t.replace(/text-white\/80/g, 'text-textMuted');
    t = t.replace(/text-white\/70/g, 'text-textMuted');
    t = t.replace(/text-white/g, 'text-textMain');
    t = t.replace(/border-white\/10/g, 'border-borderMain');
    t = t.replace(/border-white\/5/g, 'border-borderMain');
    t = t.replace(/border-white\/20/g, 'border-borderMain');
    t = t.replace(/border-white\/30/g, 'border-borderMain');
    t = t.replace(/text-primary/g, 'text-accent');
    t = t.replace(/bg-primary/g, 'bg-accent');
    t = t.replace(/border-primary/g, 'border-accent');
    t = t.replace(/from-primary/g, 'from-accent');
    t = t.replace(/via-primary/g, 'via-accent');
    t = t.replace(/to-primary/g, 'to-accent');
    return t;
}

const newContent = applyReplacements(preHero) + hero + applyReplacements(postHero);
fs.writeFileSync(filePath, newContent, 'utf-8');
console.log('Replaced');
