const Jimp = require('jimp');

Jimp.read('C:\\Users\\g4868\\.gemini\\antigravity-ide\\brain\\edae7a68-1fc2-4d7f-a8b6-e6861887cf6e\\media__1781339082475.png').then(image => {
  // Let's remove any dark color
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // The logo is bright green/yellow, background is black. 
    // We can also smooth the edges by making very dark colors partially transparent.
    const max = Math.max(r, g, b);
    if (max < 30) {
      this.bitmap.data[idx + 3] = 0; // completely transparent
    } else if (max < 60) {
      this.bitmap.data[idx + 3] = (max - 30) * 8; // semi-transparent
    }
  });
  
  // Crop empty space around it
  image.autocrop();
  
  // Resize to a sensible size for navbar
  image.resize(Jimp.AUTO, 100);
  
  image.write('public/logo.png', () => {
    console.log('Logo processed successfully.');
  });
}).catch(err => {
  console.error(err);
});
