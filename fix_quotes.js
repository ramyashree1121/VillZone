const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('frontend/src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // The previous error was that single quotes were used around the URL. 
    // fetch('${import.meta.env.VITE_API_URL}/api/xyz')
    // We want to replace it with:
    // fetch(`${import.meta.env.VITE_API_URL}/api/xyz`)

    // We can search for: '\$\{import\.meta\.env\.VITE_API_URL\}([^']*)' 
    // and replace with: `\$\{import.meta.env.VITE_API_URL\}${p1}`
    const regex = /'\$\{import\.meta\.env\.VITE_API_URL\}([^']*)'/g;
    
    let newContent = content.replace(regex, (match, p1) => {
        return `\`\$\{import.meta.env.VITE_API_URL\}${p1}\``;
    });

    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Updated ' + file);
    }
});
