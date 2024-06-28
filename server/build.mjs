// client/build.mjs
import ejs from 'ejs';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Determine environment
const isDevelopment = process.env.NODE_ENV === 'development';

// Define paths
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templateDir = path.join(__dirname, './views');
const outputDir = path.join(__dirname, '../client/public');

// Ensure output directory exists
fs.ensureDirSync(outputDir);

// Read and compile the EJS template
const templatePath = path.join(templateDir, 'index.ejs');
const template = fs.readFileSync(templatePath, 'utf-8');
const data = {
   isDevelopment: isDevelopment, // Pass isDevelopment as data to EJS template
};

const compiled = ejs.render(template, data);

// Write the compiled HTML to the output directory
fs.writeFileSync(path.join(outputDir, 'index.html'), compiled);

console.log('EJS template compiled to HTML successfully.');
