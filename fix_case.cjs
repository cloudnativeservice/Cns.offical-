const fs = require('fs');
const path = require('path');

// 1. Rename public/ASSETS to public/media
try {
    fs.renameSync(path.join(__dirname, 'public', 'ASSETS'), path.join(__dirname, 'public', 'media'));
    console.log("Renamed public/ASSETS to public/media");
} catch(e) {
    // If locked, we can copy and delete
    try {
        fs.cpSync(path.join(__dirname, 'public', 'ASSETS'), path.join(__dirname, 'public', 'media'), {recursive: true});
        fs.rmSync(path.join(__dirname, 'public', 'ASSETS'), {recursive: true, force: true});
        console.log("Copied and deleted public/ASSETS to public/media");
    } catch(err) {
        console.error("Could not rename or copy/delete:", err);
    }
}

// 2. Replace all instances of import.meta.env.BASE_URL}ASSETS/ with import.meta.env.BASE_URL}media/ in src/
function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            if (content.includes('import.meta.env.BASE_URL}ASSETS/')) {
                content = content.replaceAll('import.meta.env.BASE_URL}ASSETS/', 'import.meta.env.BASE_URL}media/');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDir(path.join(__dirname, 'src'));
