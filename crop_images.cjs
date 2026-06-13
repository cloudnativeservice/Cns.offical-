const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const dir = 'D:/Cartoon movies app/cns images';

async function processImages() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
  
  for (const file of files) {
    const p = path.join(dir, file);
    try {
      const img = await Jimp.read(p);
      console.log(`Original ${file}: ${img.bitmap.width}x${img.bitmap.height}`);
      
      // Auto-crop based on top-left pixel (which is the black background)
      // tolerance of 0.05
      img.autocrop(0.05);
      
      console.log(`Cropped ${file}: ${img.bitmap.width}x${img.bitmap.height}`);
      
      // Now, to handle the Light Mode issue:
      // We can make the cropped image's black background transparent!
      // But only replace the background color. 
      // Actually, if we just crop it, it's a huge improvement.
      // Let's also do a simple flood-fill to make the black background transparent!
      
      // Let's just save the cropped image for now.
      await img.writeAsync(p);
      console.log('Saved:', file);
    } catch (e) {
      console.error('Failed processing', file, e.message);
    }
  }
}

processImages();
