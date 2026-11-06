import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(projectRoot, 'dist');
const imageDirectory = path.join(distRoot, 'images');
const imageExtension = /\.(?:avif|bmp|gif|jpe?g|jfif|png|svg|webp)$/i;
const textExtension = /\.(?:css|html|js|mjs)$/i;

const walkFiles = (directory) => {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(entryPath) : [entryPath];
  });
};

if (!fs.existsSync(distRoot)) {
  throw new Error(`dist directory not found at ${distRoot}. Run the production build first.`);
}

const files = walkFiles(distRoot);
const imageFiles = files.filter((file) => imageExtension.test(file));
const misplacedImages = imageFiles.filter(
  (file) => path.relative(distRoot, file).split(path.sep)[0] !== 'images'
);

if (imageFiles.length === 0) {
  throw new Error('No image files were emitted into dist.');
}

if (misplacedImages.length > 0) {
  throw new Error(`Images must be emitted under dist/images/: ${misplacedImages.map((file) => path.relative(distRoot, file)).join(', ')}`);
}

const imageNames = new Set(imageFiles.map((file) => path.relative(imageDirectory, file).split(path.sep).join('/')));
const missingReferences = new Set();
const imageReference = /\/images\/([^"'`\s)<>?#]+)/g;

for (const file of files.filter((candidate) => textExtension.test(candidate))) {
  const contents = fs.readFileSync(file, 'utf8');
  for (const match of contents.matchAll(imageReference)) {
    const relativeImagePath = decodeURIComponent(match[1]);
    if (!imageNames.has(relativeImagePath)) {
      missingReferences.add(`${path.relative(distRoot, file)} -> /images/${relativeImagePath}`);
    }
  }
}

if (missingReferences.size > 0) {
  throw new Error(`Built files reference missing images:\n${[...missingReferences].join('\n')}`);
}

console.log(`Verified ${imageFiles.length} image files in dist/images/ and all built image references.`);
