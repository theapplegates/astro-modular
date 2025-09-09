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

// Function to get the final URL for a content file
function getContentUrl(filePath, isPost = false) {
  const relativePath = path.relative(process.cwd(), filePath);
  const fileName = path.basename(filePath, '.md');
  
  if (isPost) {
    return `/posts/${fileName}`;
  } else {
    if (fileName === 'index') {
      return '/';
    }
    return `/${fileName}`;
  }
}



// Function to process a single markdown file
async function processMarkdownFile(filePath, isPost = false) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const { frontmatter } = parseFrontmatter(content);
    
    if (!frontmatter || !frontmatter.redirect_from) {
      return []; // No redirects to process
    }
    
    const targetUrl = getContentUrl(filePath, isPost);
    const redirects = [];
    
    for (const alias of frontmatter.redirect_from) {
      const cleanAlias = alias.startsWith('/') ? alias.substring(1) : alias;
      
      redirects.push({
        from: `/${cleanAlias}`,
        to: targetUrl,
        alias: cleanAlias
      });
    }
    
    return redirects;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return [];
  }
}

// Function to process all markdown files in a directory
async function processDirectory(dirPath, isPost = false) {
  try {
    const files = await fs.readdir(dirPath);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    let allRedirects = [];
    let processedFiles = 0;
    
    for (const file of markdownFiles) {
      const filePath = path.join(dirPath, file);
      const redirects = await processMarkdownFile(filePath, isPost);
      allRedirects = allRedirects.concat(redirects);
      if (redirects.length > 0) {
        processedFiles++;
      }
    }
    
    return { redirects: allRedirects, processedFiles };
  } catch (error) {
    console.error(`❌ Error processing directory ${dirPath}:`, error.message);
    return { redirects: [], processedFiles: 0 };
  }
}

// Function to update astro.config.mjs with redirects
async function updateAstroConfig(redirects) {
  const astroConfigPath = 'astro.config.mjs';
  
  try {
    let astroContent = await fs.readFile(astroConfigPath, 'utf-8');
    
    // Create redirects object
    const redirectsObj = {};
    for (const redirect of redirects) {
      redirectsObj[redirect.from] = redirect.to;
    }
    
    // Find and replace the redirects section
    const redirectsRegex = /redirects:\s*\{[^}]*\}/s;
    const newRedirectsSection = `redirects: ${JSON.stringify(redirectsObj, null, 2).replace(/"/g, "'")}`;
    
    if (redirectsRegex.test(astroContent)) {
      // Replace existing redirects
      astroContent = astroContent.replace(redirectsRegex, newRedirectsSection);
    } else {
      // Add redirects after site config
      const siteRegex = /(site:\s*siteConfig\.site,)/;
      astroContent = astroContent.replace(siteRegex, `$1\n  ${newRedirectsSection},`);
    }
    
    await fs.writeFile(astroConfigPath, astroContent, 'utf-8');
    console.log(`📝 Updated astro.config.mjs with ${redirects.length} redirects`);
  } catch (error) {
    console.error(`❌ Error updating astro.config.mjs:`, error.message);
  }
}

// Function to update netlify.toml with redirects
async function updateNetlifyToml(redirects) {
  const netlifyTomlPath = 'netlify.toml';
  
  try {
    let netlifyContent = await fs.readFile(netlifyTomlPath, 'utf-8');
    
    // Find the end of the file before any redirects
    const lines = netlifyContent.split('\n');
    let endOfConfig = lines.length;
    
    // Find where redirects start
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('[[redirects]]')) {
        endOfConfig = i;
        break;
      }
    }
    
    // Keep everything before redirects
    const configLines = lines.slice(0, endOfConfig);
    
    // Build new redirects section
    const redirectLines = [];
    
    if (redirects.length > 0) {
      redirectLines.push('');
      redirectLines.push('# Generated redirects from content aliases');
      
      for (const redirect of redirects) {
        redirectLines.push('[[redirects]]');
        redirectLines.push(`  from = "${redirect.from}"`);
        redirectLines.push(`  to = "${redirect.to}"`);
        redirectLines.push(`  status = 301`);
        redirectLines.push('');
      }
    }
    
    // Always add the catch-all 404 redirect at the end
    redirectLines.push('[[redirects]]');
    redirectLines.push('  from = "/*"');
    redirectLines.push('  to = "/404"');
    redirectLines.push('  status = 404');
    
    const newContent = configLines.join('\n') + redirectLines.join('\n');
    await fs.writeFile(netlifyTomlPath, newContent, 'utf-8');
    
    console.log(`📝 Updated netlify.toml with ${redirects.length} redirects`);
  } catch (error) {
    console.error(`❌ Error updating netlify.toml:`, error.message);
  }
}

// Main function
async function generateRedirects() {
  console.log('🔄 Generating redirects from content aliases...');
  
  const projectRoot = path.join(__dirname, '..');
  let allRedirects = [];
  let totalProcessedFiles = 0;
  
  // Process pages
  const pagesPath = path.join(projectRoot, 'src/content/pages');
  try {
    await fs.access(pagesPath);
    const pageResult = await processDirectory(pagesPath, false);
    allRedirects = allRedirects.concat(pageResult.redirects);
    totalProcessedFiles += pageResult.processedFiles;
  } catch (error) {
    // Pages directory doesn't exist, skipping
  }
  
  // Process posts
  const postsPath = path.join(projectRoot, 'src/content/posts');
  try {
    await fs.access(postsPath);
    const postResult = await processDirectory(postsPath, true);
    allRedirects = allRedirects.concat(postResult.redirects);
    totalProcessedFiles += postResult.processedFiles;
  } catch (error) {
    // Posts directory doesn't exist, skipping
  }
  
  if (allRedirects.length > 0) {
    console.log(`📁 Processing pages directory...`);
    console.log(`📁 Processing posts directory...`);
    console.log(`   Processed ${totalProcessedFiles} files with redirects`);
    await updateAstroConfig(allRedirects);
    await updateNetlifyToml(allRedirects);
  }
  
  console.log(`🎉 Redirect generation complete! Created ${allRedirects.length} redirects.`);
}

// Run the script
generateRedirects();
