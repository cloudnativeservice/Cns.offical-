const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Replace src="/logo.png"
            if (content.includes('src="/logo.png"')) {
                content = content.replace(/src="\/logo\.png"/g, 'src={`${import.meta.env.BASE_URL}logo.png`}');
                modified = true;
            }

            // Replace src="/images/..."
            if (content.includes('src="/images/')) {
                content = content.replace(/src="\/images\/([^"]+)"/g, 'src={`${import.meta.env.BASE_URL}images/$1`}');
                modified = true;
            }

            // Replace src="ASSETS/..."
            if (content.includes('src="ASSETS/')) {
                content = content.replace(/src="ASSETS\/([^"]+)"/g, 'src={`${import.meta.env.BASE_URL}ASSETS/$1`}');
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
