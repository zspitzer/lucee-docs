const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

async function generateIndex() {
  const recipesDir = path.join(__dirname, '../../docs/recipes');
  const outputPath = path.join(recipesDir, 'index.json');
  const readmePath = path.join(recipesDir, 'README.md');
  const files = await fs.readdir(recipesDir);
  const index = [];
  let readmeContent = '# Recipes\n\n';

  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(recipesDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : 'Untitled';
      const hash = crypto.createHash('md5').update(content).digest('hex');

      // Extract metadata from the comment block
      const metadataMatch = content.match(/<!--\s*({[^]*?})\s*-->/);
      let description = 'No description available.';
      if (metadataMatch) {
        const metadata = JSON.parse(metadataMatch[1]);
        if (metadata.description) {
          description = metadata.description;
        }
      }

      index.push({
        file: file,
        title: title,
        path: `/docs/recipes/${file}`,
        hash: hash,
      });

      readmeContent += `## [${title}](/docs/recipes/${file})\n\n${description}\n\n`;
    }
  }

  await fs.writeJson(outputPath, index, { spaces: 2 });
  await fs.writeFile(readmePath, readmeContent, 'utf-8');
  console.log(`Index written to ${outputPath}`);
  console.log(`README written to ${readmePath}`);
}

generateIndex().catch(err => {
  console.error(err);
  process.exit(1);
});