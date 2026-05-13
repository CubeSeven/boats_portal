const fs = require('fs');
const path = require('path');

const deprecatedDir = path.join(process.cwd(), 'src/content/deprecated_fleet');
const fleetDir = path.join(process.cwd(), 'src/content/fleet');

const updates = [
  {
    file: 'axopar-brabus.md',
    prefix: 'axopar-brabus-',
    name: 'Axopar Brabus'
  },
  {
    file: 'karel-pacific.md',
    prefix: 'karel-f19-pacific-2025-',
    name: 'Karel F19 Pacific 2025',
    slug: 'karel-f19-pacific-2025'
  },
  {
    file: 'karel-odussea.md',
    prefix: 'karel-odyssea-premium-2025-',
    name: 'Karel ODYSSEA Premium 2025',
    slug: 'karel-odyssea-premium-2025'
  },
  {
    file: 'karel-paxos.md',
    prefix: 'paxos-deluxe-2-',
    name: 'Paxos Deluxe 2',
    slug: 'paxos-deluxe-2'
  },
  {
    file: 'karel-sporades.md',
    prefix: 'karel-deluxe-2023-',
    name: 'Karel Deluxe 2023',
    slug: 'karel-deluxe-2023'
  },
  {
    file: 'kostadis.md',
    prefix: 'karel-luxury-edition-2024-',
    name: 'Karel Luxury Edition 2024',
    slug: 'karel-luxury-edition-2024'
  },
  {
    file: 'tiger-proline-740.md',
    prefix: 'tiger-marine-proline-740-23-',
    name: 'Tiger Marine Proline 740 23',
    slug: 'tiger-marine-proline-740-23'
  },
  {
    file: 'tiger-topline.md',
    prefix: 'tiger-topline-2024-',
    name: 'Tiger Topline 2024',
    slug: 'tiger-topline-2024'
  },
  {
    file: 'tiger-top-line-200.md',
    prefix: 'tiger-topline-limited-edition-',
    name: 'Tiger Topline Limited Edition',
    slug: 'tiger-topline-limited-edition'
  },
  {
    file: 'tomahawk-rib.md',
    prefix: 'tomahawk-rib-',
    name: 'Tomahawk Rib'
  }
];

const publicImagesDir = path.join(process.cwd(), 'public/images/fleet');
const allImages = fs.readdirSync(publicImagesDir);

for (const update of updates) {
  const srcPath = path.join(deprecatedDir, update.file);
  
  if (!fs.existsSync(srcPath)) {
    console.log(`Skipping ${update.file}, not found`);
    continue;
  }
  
  let content = fs.readFileSync(srcPath, 'utf8');
  
  // Find images matching the prefix
  const galleryImages = allImages
    .filter(img => img.startsWith(update.prefix))
    .sort()
    .map(img => `"/images/fleet/${img}"`);
    
  const mainImage = galleryImages.length > 0 ? galleryImages[0] : `"/images/fleet/placeholder.jpg"`;
  const galleryString = `[${galleryImages.join(', ')}]`;
  
  // Update frontmatter
  content = content.replace(/image: ".*"/, `image: ${mainImage}`);
  content = content.replace(/gallery: \[.*\]/, `gallery: ${galleryString}`);
  
  if (update.name) {
    content = content.replace(/name: ".*"/, `name: "${update.name}"`);
  }
  
  let destFilename = update.file;
  if (update.slug) {
    content = content.replace(/slug: ".*"/, `slug: "${update.slug}"`);
    destFilename = `${update.slug}.md`;
  }
  
  const destPath = path.join(fleetDir, destFilename);
  fs.writeFileSync(destPath, content);
  console.log(`Restored and updated ${destFilename} with ${galleryImages.length} images`);
  
  // Optionally remove the old file from deprecated
  fs.unlinkSync(srcPath);
}
