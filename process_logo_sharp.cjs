const sharp = require('sharp');
const path = require('path');

async function processImage() {
  const input = 'C:\\Users\\g4868\\.gemini\\antigravity-ide\\brain\\edae7a68-1fc2-4d7f-a8b6-e6861887cf6e\\media__1781339082475.png';
  const output = path.join('public', 'logo.png');

  try {
    const { data, info } = await sharp(input)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      const max = Math.max(r, g, b);
      if (max < 30) {
        data[i + 3] = 0; // Transparent
      } else if (max < 60) {
        data[i + 3] = Math.min(255, (max - 30) * 8); // Anti-aliasing / smoothing
      }
    }

    await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .trim()
      .resize(null, 100)
      .toFile(output);
      
    console.log('Logo processed with Sharp successfully.');
  } catch (err) {
    console.error('Error processing with sharp:', err);
  }
}

processImage();
