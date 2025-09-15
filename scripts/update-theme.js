#!/usr/bin/env node

/**
 * Update Theme Script for Astro Modular
 * 
 * This script helps users update their Astro Modular theme installation
 * by pulling the latest changes from the upstream repository.
 * 
 * Usage: pnpm run update-theme
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Configuration
const UPSTREAM_REPO = 'https://github.com/davidvkimball/astro-modular.git';
const THEME_VERSION_FILE = 'THEME_VERSION';
const BACKUP_DIR = '.theme-backup';

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
 * Get current commit hash
 */
function getCurrentCommit() {
  try {
    return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
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
    const currentCommit = getCurrentCommit();
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
 * Merge upstream changes
 */
function mergeUpstream(upstreamBranch) {
  try {
    logInfo(`Merging changes from ${upstreamBranch}...`);
    execSync(`git merge ${upstreamBranch} --no-edit`, { stdio: 'inherit' });
    logSuccess('Successfully merged upstream changes');
    return true;
  } catch (error) {
    logError('Merge failed - there may be conflicts to resolve');
    logInfo('Please resolve conflicts manually and run: git add . && git commit');
    return false;
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
    
    // Ask user if they want to continue
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
  
  // Step 7: Merge changes
  logStep(7, 'Merging changes');
  if (!mergeUpstream(updateInfo.upstreamBranch)) {
    logError('Update failed due to merge conflicts');
    logInfo('Please resolve conflicts and run the update command again');
    process.exit(1);
  }
  
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
  log('================================', 'green');
  logInfo('Your Astro Modular theme has been updated to the latest version');
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
  log('  1. Check for uncommitted changes');
  log('  2. Fetch latest changes from upstream');
  log('  3. Merge updates into your local copy');
  log('  4. Update dependencies');
  log('  5. Rebuild the project');
  log('');
  log('Make sure you have committed or stashed your changes before running this command.');
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
