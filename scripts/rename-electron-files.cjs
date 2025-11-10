// Simple script to rename .js files to .cjs in dist-electron
const fs = require('fs');
const path = require('path');

const distElectronDir = path.join(__dirname, 'dist-electron');

if (fs.existsSync(distElectronDir)) {
  const files = fs.readdirSync(distElectronDir);
  
  files.forEach(file => {
    if (file.endsWith('.js')) {
      const oldPath = path.join(distElectronDir, file);
      const newPath = path.join(distElectronDir, file.replace('.js', '.cjs'));
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed ${file} to ${path.basename(newPath)}`);
    }
  });
}
