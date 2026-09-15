const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Clean up residual metadata block
  content = content.replace(/\s*=>\s*\(\{[\s\S]*?\}\);/m, '');

  // Remove createFileRoute from react-router-dom imports
  content = content.replace(/createFileRoute,\s*/g, '');
  content = content.replace(/import\s+{\s*createFileRoute\s*}\s+from\s+["']react-router-dom["'];?\n/g, '');

  fs.writeFileSync(filePath, content);
}
console.log('Cleanup done');
