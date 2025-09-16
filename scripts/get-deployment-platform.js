#!/usr/bin/env node

/**
 * Get deployment platform from config file
 * This script reads the TypeScript config file and extracts the deployment platform
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getDeploymentPlatform() {
  try {
    const configPath = join(__dirname, '..', 'src', 'config.ts');
    const configContent = readFileSync(configPath, 'utf-8');
    
    // Extract deployment platform from config - look for the actual config value
    // Split by "Set your values HERE" to get only the config section, not the interface
    const configSections = configContent.split('// Set your values HERE');
    if (configSections.length > 1) {
      const configSection = configSections[1];
      const platformMatch = configSection.match(/platform:\s*"([^"]+)"/);
      if (platformMatch) {
        return platformMatch[1];
      }
    }
    
    // Fallback to netlify if not found
    return 'netlify';
  } catch (error) {
    console.warn('Warning: Could not read config file, defaulting to netlify');
    return 'netlify';
  }
}

// Export the platform
export default getDeploymentPlatform;
