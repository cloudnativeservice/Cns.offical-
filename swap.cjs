const fs = require('fs');
const file = 'd:\\Cartoon movies app\\CNS offical website\\src\\pages\\Home.jsx';
let content = fs.readFileSync(file, 'utf8');

const featuresStartMarker = '{/* FEATURES - INTERLEAVED WITH APP GALLERY IMAGES */}';
const continueWatchingStartMarker = '{/* CONTINUE WATCHING */}';
const setupStartMarker = '{/* SETUP - REDESIGNED */}';

let indexFeatures = content.indexOf(featuresStartMarker);
let indexContinueWatching = content.indexOf(continueWatchingStartMarker);
let indexSetup = content.indexOf(setupStartMarker);

// Walk back to the start of the line for each marker
while (indexFeatures > 0 && content[indexFeatures - 1] !== '\n') indexFeatures--;
while (indexContinueWatching > 0 && content[indexContinueWatching - 1] !== '\n') indexContinueWatching--;
while (indexSetup > 0 && content[indexSetup - 1] !== '\n') indexSetup--;

if (indexFeatures !== -1 && indexContinueWatching !== -1 && indexSetup !== -1) {
    let beforeFeatures = content.substring(0, indexFeatures);
    let featuresSection = content.substring(indexFeatures, indexContinueWatching);
    let continueWatchingSection = content.substring(indexContinueWatching, indexSetup);
    let afterContinueWatching = content.substring(indexSetup);

    let newContent = beforeFeatures + continueWatchingSection + featuresSection + afterContinueWatching;
    fs.writeFileSync(file, newContent, 'utf8');
    console.log("Swapped successfully!");
} else {
    console.log("Could not find markers.", {
      features: indexFeatures !== -1,
      continue: indexContinueWatching !== -1,
      setup: indexSetup !== -1
    });
}
