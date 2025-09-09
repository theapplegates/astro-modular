#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define content directories to process
const CONTENT_DIRS = [
  'src/content/pages',
  'src/content/posts'
];

// Function to parse frontmatter from markdown content
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: null, content: content };
  }
  
  const frontmatterText = match[1];
  const body = match[2];
  
  // Parse YAML-like frontmatter (simple parser)
  const frontmatter = {};
  const lines = frontmatterText.split('\n');
  let currentKey = null;
  let currentValue = [];
  let inArray = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed === '' || trimmed.startsWith('#')) {
      continue;
    }
    
    if (trimmed.includes(':') && !inArray) {
      // Save previous key-value pair
      if (currentKey) {
        if (currentValue.length === 1) {
          frontmatter[currentKey] = currentValue[0];
        } else {
          frontmatter[currentKey] = currentValue;
        }
      }
      
      // Start new key-value pair
      const colonIndex = trimmed.indexOf(':');
      currentKey = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();
      
      if (value.startsWith('[')) {
        // Array value
        inArray = true;
        currentValue = [];
        if (value !== '[') {
          // Single line array
          const arrayContent = value.substring(1, value.endsWith(']') ? value.length - 1 : value.length);
          if (arrayContent.trim()) {
            currentValue = arrayContent.split(',').map(item => item.trim().replace(/^["']|["']$/g, ''));
          }
          inArray = false;
        }
      } else if (value) {
        // Single value
        currentValue = [value.replace(/^["']|["']$/g, '')];
      } else {
        // Empty value, might be start of array
        currentValue = [];
        inArray = true;
      }
    } else if (inArray && trimmed.startsWith('-')) {
      // Array item
      const item = trimmed.substring(1).trim().replace(/^["']|["']$/g, '');
      currentValue.push(item);
    } else if (inArray && trimmed === ']') {
      // End of array
      inArray = false;
    } else if (currentKey && !inArray) {
      // Continuation of single value
      currentValue = [currentValue[0] + ' ' + trimmed];
    }
  }
  
  // Save last key-value pair
  if (currentKey) {
    if (currentValue.length === 1) {
      frontmatter[currentKey] = currentValue[0];
    } else {
      frontmatter[currentKey] = currentValue;
    }
  }
  
  return { frontmatter, content: body };
}

// Function to convert frontmatter back to YAML string
function frontmatterToString(frontmatter) {
  const lines = ['---'];
  
  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) {
        lines.push(`  - ${item}`);
      }
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  
  lines.push('---');
  return lines.join('\n');
}

// Function to process a single markdown file
async function processMarkdownFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const { frontmatter, content: body } = parseFrontmatter(content);
    
    if (!frontmatter || !frontmatter.aliases) {
      return false; // No aliases to process
    }
    
    // Convert aliases to redirect_from format
    const redirectFrom = frontmatter.aliases.map(alias => 
      alias.startsWith('/') ? alias : `/${alias}`
    );
    
    // Update frontmatter
    frontmatter.redirect_from = redirectFrom;
    delete frontmatter.aliases;
    
    // Rebuild the file content
    const newFrontmatter = frontmatterToString(frontmatter);
    const newContent = `${newFrontmatter}\n${body}`;
    
    // Write back to file
    await fs.writeFile(filePath, newContent, 'utf-8');
    
    return { processed: true, aliases: redirectFrom.length };
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return { processed: false, aliases: 0 };
  }
}

// Function to process all markdown files in a directory
async function processDirectory(dirPath) {
  try {
    const files = await fs.readdir(dirPath);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    let processedCount = 0;
    let totalAliases = 0;
    
    for (const file of markdownFiles) {
      const filePath = path.join(dirPath, file);
      const result = await processMarkdownFile(filePath);
      if (result.processed) {
        processedCount++;
        totalAliases += result.aliases;
      }
    }
    
    return { processedCount, totalAliases };
  } catch (error) {
    console.error(`❌ Error processing directory ${dirPath}:`, error.message);
    return { processedCount: 0, totalAliases: 0 };
  }
}

// Main function
async function processAllAliases() {
  console.log('🔄 Processing aliases and converting to redirect_from...');
  
  const projectRoot = path.join(__dirname, '..');
  let totalProcessed = 0;
  let totalAliases = 0;
  
  for (const dir of CONTENT_DIRS) {
    const fullPath = path.join(projectRoot, dir);
    
    try {
      await fs.access(fullPath);
      const result = await processDirectory(fullPath);
      totalProcessed += result.processedCount;
      totalAliases += result.totalAliases;
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`❌ Error accessing directory ${dir}:`, error.message);
      }
    }
  }
  
  if (totalProcessed > 0) {
    console.log(`📁 Processing pages directory...`);
    console.log(`📁 Processing posts directory...`);
    console.log(`   Processed ${totalProcessed} files with ${totalAliases} aliases`);
  }
  
  console.log(`🎉 Alias processing complete! Processed ${totalProcessed} files.`);
}

// Run the script
processAllAliases();
