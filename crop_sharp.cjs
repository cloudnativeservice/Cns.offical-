const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = 'D:/Cartoon movies app/cns images';

async function processImages() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
  
  for (const file of files) {
    const p = path.join(dir, file);
    // Don't process already processed
    if (file.startsWith('processed_')) continue;
    
    try {
      const metadata = await sharp(p).metadata();
      console.log(`Original ${file}: ${metadata.width}x${metadata.height}`);
      
      // Trim removes borders of similar color, based on the top-left pixel.
      const outPath = path.join(dir, 'processed_' + file);
      const info = await sharp(p)
        .trim({ threshold: 10 }) // Threshold for black noise
        .toFile(outPath);
      
      console.log(`Cropped ${file} to: ${info.width}x${info.height}`);
      
      // Overwrite the original
      fs.copyFileSync(outPath, p);
      
    } catch (e) {
      console.error('Failed processing', file, e.message);
    }
  }
}

processImages();
