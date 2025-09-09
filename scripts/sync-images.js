#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';

// Define source and target directories for both posts and pages
const IMAGE_SYNC_CONFIGS = [
  {
    source: 'src/content/posts/images',
    target: 'public/posts/images',
    name: 'posts'
  },
  {
    source: 'src/content/pages/images',
    target: 'public/pages/images',
    name: 'pages'
  }
];

async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function syncImagesForConfig(config) {
  // Ensure target directory exists
  await ensureDir(config.target);

  try {
    // Check if source directory exists
    let sourceFiles = [];
    try {
      sourceFiles = await fs.readdir(config.source);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return { synced: 0, skipped: 0, removed: 0 };
      }
      throw error;
    }

    let synced = 0;
    let skipped = 0;

    for (const file of sourceFiles) {
      const sourcePath = path.join(config.source, file);
      const targetPath = path.join(config.target, file);

      // Check if file needs updating
      let needsUpdate = true;
      try {
        const sourceStats = await fs.stat(sourcePath);
        const targetStats = await fs.stat(targetPath);

        // Only update if source is newer or different size
        needsUpdate = sourceStats.mtime > targetStats.mtime || sourceStats.size !== targetStats.size;
      } catch {
        // Target doesn't exist, definitely needs update
        needsUpdate = true;
      }

      if (needsUpdate) {
        await fs.copyFile(sourcePath, targetPath);
        synced++;
      } else {
        skipped++;
      }
    }

    // Cleanup: Remove files from target that no longer exist in source
    const targetFiles = await fs.readdir(config.target);
    const sourceFileSet = new Set(sourceFiles);
    let removed = 0;

    for (const file of targetFiles) {
      if (!sourceFileSet.has(file)) {
        const targetPath = path.join(config.target, file);
        await fs.unlink(targetPath);
        removed++;
      }
    }

    return { synced, skipped, removed };
  } catch (error) {
    console.error(`❌ Error syncing ${config.name} images:`, error);
    process.exit(1);
  }
}

async function syncAllImages() {
  console.log('🖼️ Syncing images from content to public directory...');

  for (const config of IMAGE_SYNC_CONFIGS) {
    const result = await syncImagesForConfig(config);
    if (result.synced > 0 || result.skipped > 0 || result.removed > 0) {
      console.log(`📁 Syncing ${config.name} images...`);
      if (result.synced > 0) console.log(`   Synced ${result.synced} files`);
      if (result.skipped > 0) console.log(`   Skipped ${result.skipped} files that were unchanged`);
      if (result.removed > 0) console.log(`   Cleaned up ${result.removed} orphaned ${config.name} files`);
    }
  }

  console.log('🎉 Image sync complete!');
}

syncAllImages();