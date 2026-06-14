const fs = require('fs');
const file = 'd:\\Cartoon movies app\\CNS offical website\\src\\pages\\Home.jsx';
let content = fs.readFileSync(file, 'utf8');

const featuresMarker = '{/* FEATURES - INTERLEAVED WITH APP GALLERY IMAGES */}';
const qrMarker = '{/* QR PAIRING */}';
const compareMarker = '{/* COMPARISON */}';

let indexFeatures = content.indexOf(featuresMarker);
let indexQR = content.indexOf(qrMarker);
let indexCompare = content.indexOf(compareMarker);

// Find line start for each
while (indexFeatures > 0 && content[indexFeatures - 1] !== '\n') indexFeatures--;
while (indexQR > 0 && content[indexQR - 1] !== '\n') indexQR--;
while (indexCompare > 0 && content[indexCompare - 1] !== '\n') indexCompare--;

if (indexFeatures !== -1 && indexQR !== -1 && indexCompare !== -1) {
    // We want to extract the QR block [indexQR, indexCompare)
    let qrSection = content.substring(indexQR, indexCompare);
    
    // And remove it from where it is
    let contentWithoutQR = content.substring(0, indexQR) + content.substring(indexCompare);
    
    // Now we need to re-find the featuresMarker index in contentWithoutQR, because indices shifted
    let newIndexFeatures = contentWithoutQR.indexOf(featuresMarker);
    while (newIndexFeatures > 0 && contentWithoutQR[newIndexFeatures - 1] !== '\n') newIndexFeatures--;
    
    // Insert QR section before Features
    let finalContent = contentWithoutQR.substring(0, newIndexFeatures) + qrSection + contentWithoutQR.substring(newIndexFeatures);
    
    fs.writeFileSync(file, finalContent, 'utf8');
    console.log("Moved QR section successfully!");
} else {
    console.log("Could not find markers.", {
        features: indexFeatures !== -1,
        qr: indexQR !== -1,
        compare: indexCompare !== -1
    });
}
