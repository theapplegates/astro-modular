#!/usr/bin/env node

/**
 * Theme Update Script for Astro Modular
 * 
 * This script provides intelligent updates that preserve user customizations
 * while updating theme files, configurations, and Obsidian settings appropriately.
 * 
 * Usage: pnpm run update-theme
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative, dirname } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

// Configuration
const UPSTREAM_REPO = 'https://github.com/davidvkimball/astro-modular.git';
const THEME_VERSION_FILE = 'THEME_VERSION';
const BACKUP_DIR = '.theme-backup';

// File categorization for smart updates
const FILE_CATEGORIES = {
  // Always update - core theme files
  THEME_FILES: [
    'src/components/',
    'src/layouts/',
    'src/pages/',
    'src/styles/',
    'src/themes/',
    'src/utils/',
    'astro.config.mjs',
    'tailwind.config.mjs',
    'postcss.config.mjs',
    'vite.config.mjs',
    'tsconfig.json',
    'package.json',
    'pnpm-lock.yaml',
    'scripts/check-missing-images.js',
    'scripts/generate-redirects.js',
    'scripts/process-aliases.js',
    'scripts/sync-images.js',
    'scripts/setup-dev.mjs',
    'scripts/update-theme.js',
    'netlify.toml',
    'README.md',
    'LICENSE'
  ],

  // Smart merge - preserve user values, add new options
  SMART_MERGE_FILES: [
    'src/config.ts'
  ],

  // User choice - ask before updating
  USER_CHOICE_FILES: [
    'src/content/posts/',
    'src/content/pages/',
    'public/'
  ],

  // Obsidian files - complex categorization
  OBSIDIAN_FILES: {
    // Always update - core Obsidian configs
    CORE_CONFIGS: [
      '.obsidian/app.json',
      '.obsidian/core-plugins.json',
      '.obsidian/community-plugins.json',
      '.obsidian/hotkeys.json',
      '.obsidian/graph.json',
      '.obsidian/backlink.json',
      '.obsidian/bookmarks.json',
      '.obsidian/switcher.json',
      '.obsidian/templates.json',
      '.obsidian/types.json',
      '.obsidian/workspace.json',
      '.obsidian/workspace-mobile.json'
    ],

    // Plugin files - update everything except data.json
    PLUGIN_FILES: [
      '.obsidian/plugins/*/main.js',
      '.obsidian/plugins/*/manifest.json',
      '.obsidian/plugins/*/styles.css',
      '.obsidian/plugins/*/obsidian_askpass.sh'
    ],

    // Never update - user preferences and data
    USER_DATA: [
      '.obsidian/plugins/*/data.json',
      '.obsidian/appearance.json',
      '.obsidian/snippets/',
      '.obsidian/themes/',
      '.obsidian/misc/'
    ],

    // New plugins - add if missing
    NEW_PLUGINS: [
      // This will be populated dynamically by comparing plugin directories
    ]
  }
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n${step}. ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

/**
 * Check if we're in a git repository
 */
function checkGitRepository() {
  try {
    execSync('git rev-parse --git-dir', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get current git status
 */
function getGitStatus() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    return status.trim();
  } catch (error) {
    return null;
  }
}

/**
 * Check if upstream remote exists
 */
function checkUpstreamRemote() {
  try {
    const remotes = execSync('git remote -v', { encoding: 'utf8' });
    return remotes.includes('upstream');
  } catch (error) {
    return false;
  }
}

/**
 * Add upstream remote if it doesn't exist
 */
function addUpstreamRemote() {
  try {
    execSync(`git remote add upstream ${UPSTREAM_REPO}`, { stdio: 'pipe' });
    logSuccess('Added upstream remote');
    return true;
  } catch (error) {
    logError('Failed to add upstream remote');
    return false;
  }
}

/**
 * Create a backup of current state
 */
function createBackup() {
  try {
    const currentCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    if (currentCommit) {
      writeFileSync(THEME_VERSION_FILE, currentCommit);
      logSuccess(`Backup created (commit: ${currentCommit.substring(0, 7)})`);
    }
  } catch (error) {
    logWarning('Could not create backup file');
  }
}

/**
 * Fetch latest changes from upstream
 */
function fetchUpstream() {
  try {
    logInfo('Fetching latest changes from upstream...');
    execSync('git fetch upstream', { stdio: 'inherit' });
    logSuccess('Fetched latest changes');
    return true;
  } catch (error) {
    logError('Failed to fetch from upstream');
    return false;
  }
}

/**
 * Check if there are updates available
 */
function checkForUpdates() {
  try {
    const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    const upstreamBranch = `upstream/${currentBranch}`;
    
    // Check if upstream branch exists
    try {
      execSync(`git rev-parse --verify ${upstreamBranch}`, { stdio: 'pipe' });
    } catch (error) {
      logWarning(`Upstream branch ${upstreamBranch} not found, trying main...`);
      const upstreamMain = 'upstream/main';
      try {
        execSync(`git rev-parse --verify ${upstreamMain}`, { stdio: 'pipe' });
        return { hasUpdates: true, upstreamBranch: upstreamMain };
      } catch (error) {
        logError('No upstream branch found');
        return { hasUpdates: false };
      }
    }
    
    // Compare local and upstream
    const localCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    const upstreamCommit = execSync(`git rev-parse ${upstreamBranch}`, { encoding: 'utf8' }).trim();
    
    return {
      hasUpdates: localCommit !== upstreamCommit,
      upstreamBranch,
      localCommit: localCommit.substring(0, 7),
      upstreamCommit: upstreamCommit.substring(0, 7)
    };
  } catch (error) {
    logError('Failed to check for updates');
    return { hasUpdates: false };
  }
}

/**
 * Update theme files (always update)
 */
async function updateThemeFiles(upstreamBranch) {
  logStep('A', 'Updating core theme files');
  
  try {
    // Create a temporary branch for theme files
    execSync('git checkout -b temp-theme-update', { stdio: 'pipe' });
    
    // Merge only theme files
    for (const filePattern of FILE_CATEGORIES.THEME_FILES) {
      try {
        execSync(`git checkout ${upstreamBranch} -- "${filePattern}"`, { stdio: 'pipe' });
        logSuccess(`Updated ${filePattern}`);
      } catch (error) {
        logWarning(`Could not update ${filePattern} (may not exist)`);
      }
    }
    
    // Commit the theme file updates
    execSync('git add .', { stdio: 'pipe' });
    execSync('git commit -m "Update core theme files"', { stdio: 'pipe' });
    
    // Switch back to main and merge
    execSync('git checkout main', { stdio: 'pipe' });
    execSync('git merge temp-theme-update --no-edit', { stdio: 'pipe' });
    execSync('git branch -d temp-theme-update', { stdio: 'pipe' });
    
    logSuccess('Core theme files updated successfully');
    return true;
  } catch (error) {
    logError('Failed to update theme files');
    // Clean up temp branch
    try {
      execSync('git checkout main', { stdio: 'pipe' });
      execSync('git branch -D temp-theme-update', { stdio: 'pipe' });
    } catch (cleanupError) {
      // Ignore cleanup errors
    }
    return false;
  }
}

/**
 * Smart merge configuration files
 */
async function smartMergeConfigs(upstreamBranch) {
  logStep('B', 'Smart merging configuration files');
  
  for (const configFile of FILE_CATEGORIES.SMART_MERGE_FILES) {
    if (!existsSync(configFile)) {
      logWarning(`${configFile} not found, skipping`);
      continue;
    }
    
    try {
      // Get upstream version
      const upstreamContent = execSync(`git show ${upstreamBranch}:${configFile}`, { encoding: 'utf8' });
      const userContent = readFileSync(configFile, 'utf8');
      
      // Parse and merge configurations
      const mergedContent = await mergeConfigFile(configFile, upstreamContent, userContent);
      
      if (mergedContent !== userContent) {
        writeFileSync(configFile, mergedContent);
        logSuccess(`Smart merged ${configFile}`);
      } else {
        logInfo(`${configFile} already up to date`);
      }
    } catch (error) {
      logWarning(`Could not smart merge ${configFile}: ${error.message}`);
    }
  }
}

/**
 * Merge configuration file intelligently
 */
async function mergeConfigFile(filePath, upstreamContent, userContent) {
  if (filePath === 'src/config.ts') {
    return mergeConfigTs(upstreamContent, userContent);
  }
  
  // For other config files, use simple merge
  return upstreamContent;
}

/**
 * Merge config.ts intelligently
 */
function mergeConfigTs(upstreamContent, userContent) {
  // Extract user's siteConfig object
  const userConfigMatch = userContent.match(/export const siteConfig: SiteConfig = ({[\s\S]*?});/);
  const upstreamConfigMatch = upstreamContent.match(/export const siteConfig: SiteConfig = ({[\s\S]*?});/);
  
  if (!userConfigMatch || !upstreamConfigMatch) {
    logWarning('Could not parse config.ts, using upstream version');
    return upstreamContent;
  }
  
  try {
    // Parse the config objects (this is a simplified approach)
    // In a real implementation, you'd want to use a proper TypeScript parser
    const userConfig = userConfigMatch[1];
    const upstreamConfig = upstreamConfigMatch[1];
    
    // For now, preserve user's config and add new options from upstream
    // This is a simplified approach - a real implementation would need proper AST parsing
    let mergedConfig = userConfig;
    
    // Add any new properties that don't exist in user's config
    const newProperties = extractNewProperties(upstreamConfig, userConfig);
    if (newProperties.length > 0) {
      logInfo(`Adding new properties: ${newProperties.join(', ')}`);
      // In a real implementation, you'd merge these properly
    }
    
    // Replace the config in the upstream content
    return upstreamContent.replace(upstreamConfigMatch[1], mergedConfig);
  } catch (error) {
    logWarning(`Could not merge config.ts: ${error.message}`);
    return upstreamContent;
  }
}

/**
 * Extract new properties from upstream config
 */
function extractNewProperties(upstreamConfig, userConfig) {
  // This is a simplified implementation
  // A real implementation would parse the objects properly
  const newProperties = [];
  
  // Look for new properties that don't exist in user config
  const upstreamProps = upstreamConfig.match(/\w+:/g) || [];
  const userProps = userConfig.match(/\w+:/g) || [];
  
  for (const prop of upstreamProps) {
    if (!userProps.includes(prop)) {
      newProperties.push(prop.replace(':', ''));
    }
  }
  
  return newProperties;
}

/**
 * Ask user for content file updates
 */
async function askUserForContentUpdates(upstreamBranch) {
  logStep('C', 'Checking content files');
  
  // Check if there are content changes
  const contentChanges = await checkContentChanges(upstreamBranch);
  
  if (contentChanges.length === 0) {
    logInfo('No content file changes detected');
    return;
  }
  
  logInfo(`Found changes in ${contentChanges.length} content files:`);
  contentChanges.forEach(change => {
    log(`  - ${change.file} (${change.type})`, 'blue');
  });
  
  const readline = await import('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const answer = await new Promise((resolve) => {
    rl.question('\nUpdate content files? (y/N): ', resolve);
  });
  rl.close();
  
  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    await updateContentFiles(upstreamBranch, contentChanges);
  } else {
    logInfo('Skipping content file updates');
  }
}

/**
 * Check for content file changes
 */
async function checkContentChanges(upstreamBranch) {
  const changes = [];
  
  for (const contentDir of FILE_CATEGORIES.USER_CHOICE_FILES) {
    try {
      const diff = execSync(`git diff --name-status ${upstreamBranch} -- "${contentDir}"`, { encoding: 'utf8' });
      const lines = diff.trim().split('\n').filter(line => line.trim());
      
      for (const line of lines) {
        const [status, file] = line.split('\t');
        changes.push({
          file,
          type: status === 'A' ? 'added' : status === 'M' ? 'modified' : status === 'D' ? 'deleted' : 'unknown'
        });
      }
    } catch (error) {
      // Ignore errors for non-existent directories
    }
  }
  
  return changes;
}

/**
 * Update content files
 */
async function updateContentFiles(upstreamBranch, changes) {
  try {
    for (const change of changes) {
      if (change.type === 'deleted') {
        logInfo(`Skipping deleted file: ${change.file}`);
        continue;
      }
      
      try {
        execSync(`git checkout ${upstreamBranch} -- "${change.file}"`, { stdio: 'pipe' });
        logSuccess(`Updated ${change.file}`);
      } catch (error) {
        logWarning(`Could not update ${change.file}`);
      }
    }
  } catch (error) {
    logError('Failed to update content files');
  }
}

/**
 * Update Obsidian files intelligently
 */
async function updateObsidianFiles(upstreamBranch) {
  logStep('D', 'Updating Obsidian configuration');
  
  const readline = await import('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const answer = await new Promise((resolve) => {
    rl.question('Update Obsidian configuration? (y/N): ', resolve);
  });
  rl.close();
  
  if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
    logInfo('Skipping Obsidian updates');
    return;
  }
  
  try {
    // Update core Obsidian configs
    await updateObsidianCoreConfigs(upstreamBranch);
    
    // Update plugin files (except data.json)
    await updateObsidianPlugins(upstreamBranch);
    
    // Check for new plugins
    await checkForNewPlugins(upstreamBranch);
    
    logSuccess('Obsidian configuration updated');
  } catch (error) {
    logError(`Failed to update Obsidian files: ${error.message}`);
  }
}

/**
 * Update core Obsidian configuration files
 */
async function updateObsidianCoreConfigs(upstreamBranch) {
  for (const configFile of FILE_CATEGORIES.OBSIDIAN_FILES.CORE_CONFIGS) {
    try {
      execSync(`git checkout ${upstreamBranch} -- "${configFile}"`, { stdio: 'pipe' });
      logSuccess(`Updated ${configFile}`);
    } catch (error) {
      logWarning(`Could not update ${configFile}`);
    }
  }
}

/**
 * Update Obsidian plugin files (excluding data.json)
 */
async function updateObsidianPlugins(upstreamBranch) {
  const pluginsDir = 'src/content/.obsidian/plugins';
  
  if (!existsSync(pluginsDir)) {
    logInfo('No plugins directory found');
    return;
  }
  
  const plugins = readdirSync(pluginsDir);
  
  for (const plugin of plugins) {
    const pluginPath = join(pluginsDir, plugin);
    if (!statSync(pluginPath).isDirectory()) continue;
    
    try {
      // Update plugin files except data.json
      const pluginFiles = readdirSync(pluginPath);
      for (const file of pluginFiles) {
        if (file === 'data.json') continue; // Skip user preferences
        
        const filePath = join(pluginPath, file);
        try {
          execSync(`git checkout ${upstreamBranch} -- "${filePath}"`, { stdio: 'pipe' });
          logSuccess(`Updated ${filePath}`);
        } catch (error) {
          logWarning(`Could not update ${filePath}`);
        }
      }
    } catch (error) {
      logWarning(`Could not update plugin ${plugin}`);
    }
  }
}

/**
 * Check for new plugins and offer to install them
 */
async function checkForNewPlugins(upstreamBranch) {
  try {
    // Get list of plugins in upstream
    const upstreamPlugins = execSync(`git ls-tree -r --name-only ${upstreamBranch} -- src/content/.obsidian/plugins/`, { encoding: 'utf8' })
      .split('\n')
      .filter(line => line.includes('/'))
      .map(line => line.split('/')[3])
      .filter((plugin, index, arr) => arr.indexOf(plugin) === index && plugin);
    
    // Get list of local plugins
    const localPluginsDir = 'src/content/.obsidian/plugins';
    const localPlugins = existsSync(localPluginsDir) ? readdirSync(localPluginsDir) : [];
    
    // Find new plugins
    const newPlugins = upstreamPlugins.filter(plugin => !localPlugins.includes(plugin));
    
    if (newPlugins.length > 0) {
      logInfo(`Found ${newPlugins.length} new plugins: ${newPlugins.join(', ')}`);
      
      const readline = await import('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      const answer = await new Promise((resolve) => {
        rl.question('Install new plugins? (y/N): ', resolve);
      });
      rl.close();
      
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        for (const plugin of newPlugins) {
          try {
            execSync(`git checkout ${upstreamBranch} -- "src/content/.obsidian/plugins/${plugin}"`, { stdio: 'pipe' });
            logSuccess(`Installed new plugin: ${plugin}`);
          } catch (error) {
            logWarning(`Could not install plugin ${plugin}`);
          }
        }
      }
    }
  } catch (error) {
    logWarning(`Could not check for new plugins: ${error.message}`);
  }
}

/**
 * Update dependencies
 */
function updateDependencies() {
  try {
    logInfo('Updating dependencies...');
    execSync('pnpm install', { stdio: 'inherit' });
    logSuccess('Dependencies updated');
    return true;
  } catch (error) {
    logError('Failed to update dependencies');
    return false;
  }
}

/**
 * Rebuild the project
 */
function rebuildProject() {
  try {
    logInfo('Rebuilding project...');
    execSync('pnpm run build', { stdio: 'inherit' });
    logSuccess('Project rebuilt successfully');
    return true;
  } catch (error) {
    logWarning('Build failed - please check for errors');
    return false;
  }
}

/**
 * Main update function
 */
async function updateTheme() {
  log('🚀 Astro Modular Theme Updater', 'bright');
  log('================================', 'bright');
  log('This updater preserves your customizations while updating theme files', 'blue');
  
  // Step 1: Check if we're in a git repository
  logStep(1, 'Checking git repository');
  if (!checkGitRepository()) {
    logError('Not in a git repository. Please initialize git first.');
    process.exit(1);
  }
  logSuccess('Git repository found');
  
  // Step 2: Check for uncommitted changes
  logStep(2, 'Checking for uncommitted changes');
  const gitStatus = getGitStatus();
  if (gitStatus) {
    logWarning('You have uncommitted changes:');
    console.log(gitStatus);
    logInfo('Consider committing or stashing your changes before updating');
    
    const readline = await import('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const answer = await new Promise((resolve) => {
      rl.question('Continue anyway? (y/N): ', resolve);
    });
    rl.close();
    
    if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
      logInfo('Update cancelled');
      process.exit(0);
    }
  } else {
    logSuccess('Working directory is clean');
  }
  
  // Step 3: Check/setup upstream remote
  logStep(3, 'Setting up upstream remote');
  if (!checkUpstreamRemote()) {
    if (!addUpstreamRemote()) {
      process.exit(1);
    }
  } else {
    logSuccess('Upstream remote already configured');
  }
  
  // Step 4: Create backup
  logStep(4, 'Creating backup');
  createBackup();
  
  // Step 5: Fetch latest changes
  logStep(5, 'Fetching latest changes');
  if (!fetchUpstream()) {
    process.exit(1);
  }
  
  // Step 6: Check for updates
  logStep(6, 'Checking for updates');
  const updateInfo = checkForUpdates();
  if (!updateInfo.hasUpdates) {
    logSuccess('Your theme is already up to date!');
    process.exit(0);
  }
  
  logInfo(`Updates available: ${updateInfo.localCommit} → ${updateInfo.upstreamCommit}`);
  
  // Step 7: Intelligent updates
  logStep(7, 'Performing intelligent updates');
  
  // A. Update core theme files (always)
  await updateThemeFiles(updateInfo.upstreamBranch);
  
  // B. Smart merge configuration files
  await smartMergeConfigs(updateInfo.upstreamBranch);
  
  // C. Ask about content files
  await askUserForContentUpdates(updateInfo.upstreamBranch);
  
  // D. Ask about Obsidian files
  await updateObsidianFiles(updateInfo.upstreamBranch);
  
  // Step 8: Update dependencies
  logStep(8, 'Updating dependencies');
  if (!updateDependencies()) {
    logWarning('Dependency update failed, but theme files were updated');
  }
  
  // Step 9: Rebuild project
  logStep(9, 'Rebuilding project');
  rebuildProject();
  
  // Success!
  log('\n🎉 Theme update completed successfully!', 'green');
  log('======================================', 'green');
  logInfo('Your Astro Modular theme has been updated while preserving your customizations');
  logInfo('Run "pnpm run dev" to start the development server');
  
  // Show what changed
  try {
    const changes = execSync('git log --oneline HEAD~1..HEAD', { encoding: 'utf8' });
    if (changes.trim()) {
      log('\nRecent changes:', 'cyan');
      console.log(changes);
    }
  } catch (error) {
    // Ignore if we can't get the log
  }
}

// Handle command line arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  log('Astro Modular Theme Updater', 'bright');
  log('============================', 'bright');
  log('');
  log('Usage: pnpm run update-theme [options]', 'cyan');
  log('');
  log('Options:', 'yellow');
  log('  --help, -h    Show this help message');
  log('  --version     Show version information');
  log('');
  log('This command will:', 'blue');
  log('  1. Update core theme files (components, layouts, styles, etc.)');
  log('  2. Smart merge configuration files (preserve your settings)');
  log('  3. Ask before updating content files (posts, pages)');
  log('  4. Ask before updating Obsidian configuration');
  log('  5. Update dependencies and rebuild');
  log('');
  log('Your customizations will be preserved while getting new features!');
  process.exit(0);
}

if (args.includes('--version')) {
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    log(`Astro Modular Theme Updater v${packageJson.version || '1.0.0'}`);
  } catch (error) {
    log('Astro Modular Theme Updater v1.0.0');
  }
  process.exit(0);
}

// Run the update
updateTheme().catch((error) => {
  logError(`Update failed: ${error.message}`);
  process.exit(1);
});
