const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'Boat Images', 'aaa');
const destDir = path.join(process.cwd(), 'public', 'images', 'fleet');

const files = fs.readdirSync(srcDir);

for (const file of files) {
  const srcPath = path.join(srcDir, file);
  // Clean the filename: lower case, replace newlines and spaces with hyphens, remove special chars
  let cleanedName = file.toLowerCase()
    .replace(/[\n\r]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-\.]/g, '') // remove non-word chars except hyphen and dot
    .replace(/-+/g, '-'); // replace multiple hyphens with single
    
  const destPath = path.join(destDir, cleanedName);
  
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied ${file} -> ${cleanedName}`);
}
