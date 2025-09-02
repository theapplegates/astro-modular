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
  console.log(`🖼️ Syncing ${config.name} images...`);
  
  // Ensure target directory exists
  await ensureDir(config.target);
  
  try {
    // Check if source directory exists
    let sourceFiles = [];
    try {
      sourceFiles = await fs.readdir(config.source);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`📁 Source directory ${config.source} doesn't exist, skipping...`);
        return;
      }
      throw error;
    }
    
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
        console.log(`✅ Synced ${config.name}: ${file}`);
      } else {
        console.log(`⏭️ Skipped ${config.name}: ${file} (up to date)`);
      }
    }
    
    // Cleanup: Remove files from target that no longer exist in source
    console.log(`🧹 Cleaning up orphaned ${config.name} files...`);
    const targetFiles = await fs.readdir(config.target);
    const sourceFileSet = new Set(sourceFiles);
    
    for (const file of targetFiles) {
      if (!sourceFileSet.has(file)) {
        const targetPath = path.join(config.target, file);
        await fs.unlink(targetPath);
        console.log(`🗑️ Removed ${config.name}: ${file} (no longer exists in source)`);
      }
    }
  } catch (error) {
    console.error(`❌ Error syncing ${config.name} images:`, error);
    process.exit(1);
  }
}

async function syncAllImages() {
  console.log('🖼️ Syncing images from content to public directory...');
  
  for (const config of IMAGE_SYNC_CONFIGS) {
    await syncImagesForConfig(config);
  }
  
  console.log('🎉 Image sync complete!');
}

syncAllImages();