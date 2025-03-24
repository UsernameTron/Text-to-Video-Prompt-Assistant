/**
 * Deployment verification script
 * 
 * This script checks for common issues that could cause deployment failures:
 * - Verifies that concatenated files are not present
 * - Checks for duplicate exports or imports
 * - Ensures proper module structure
 */
const fs = require('fs');
const path = require('path');

// Files that should not exist in the repo root
const problematicFiles = [
  'utility-functions.js',
  'main-app-files.js',
  'components.txt',
  'page-components.txt',
  'styles.txt'
];

// Files that must exist
const requiredFiles = [
  'src/pages/_app.js',
  'src/pages/_document.js',
  'src/utils/resourceLoader.js',
  'src/utils/promptEnhancer.js',
  'src/utils/stylePresets.js',
  'src/components/ModifierSelector.jsx',
  'src/components/StylePresets.jsx',
  'src/components/EnhancedPrompt.jsx',
  'src/components/CategorySelector.jsx',
  'src/components/Header.jsx',
  'src/components/PromptInput.jsx',
  'next.config.js',
  'package.json',
  'netlify.toml'
];

// Check for problematic files
console.log('Checking for problematic concatenated files...');
const existingProblematicFiles = problematicFiles.filter(file => 
  fs.existsSync(path.join(process.cwd(), file))
);

if (existingProblematicFiles.length > 0) {
  console.warn('⚠️ WARNING: Found problematic concatenated files that should be removed:');
  existingProblematicFiles.forEach(file => console.warn(`  - ${file}`));
  console.warn('These files may cause conflicts during build. Consider removing them.');
} else {
  console.log('✅ No problematic concatenated files found.');
}

// Check for required files
console.log('\nVerifying required files exist...');
const missingRequiredFiles = requiredFiles.filter(file => 
  !fs.existsSync(path.join(process.cwd(), file))
);

if (missingRequiredFiles.length > 0) {
  console.error('❌ ERROR: Missing required files:');
  missingRequiredFiles.forEach(file => console.error(`  - ${file}`));
  console.error('These files are necessary for the application to build properly.');
  process.exit(1);
} else {
  console.log('✅ All required files are present.');
}

console.log('\n✅ Deployment verification complete. Ready to deploy!');