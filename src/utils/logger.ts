/**
 * Environment-aware logging utility
 * Controls console output based on environment and log level
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  enabled: boolean;
  level: LogLevel;
  prefix?: string;
}

class Logger {
  private config: LoggerConfig;

  constructor() {
    // Determine if we're in development mode
    const isDev = import.meta.env.DEV;
    const isProduction = import.meta.env.PROD;
    
    // In production, only show errors and warnings
    // In development, show all logs
    this.config = {
      enabled: isDev || (isProduction && this.shouldLogInProduction()),
      level: isDev ? 'debug' : 'warn',
      prefix: isDev ? '[DEV]' : undefined
    };
  }

  private shouldLogInProduction(): boolean {
    // Only log errors and warnings in production
    // This can be controlled by environment variables if needed
    return true;
  }

  private shouldLog(level: LogLevel): boolean {
    if (!this.config.enabled) return false;
    
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3
    };
    
    return levels[level] >= levels[this.config.level];
  }

  private formatMessage(level: LogLevel, ...args: any[]): any[] {
    const prefix = this.config.prefix ? `${this.config.prefix} ` : '';
    const timestamp = new Date().toISOString().slice(11, 23);
    return [`${prefix}[${timestamp}] [${level.toUpperCase()}]`, ...args];
  }

  debug(...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.log(...this.formatMessage('debug', ...args));
    }
  }

  info(...args: any[]): void {
    if (this.shouldLog('info')) {
      console.info(...this.formatMessage('info', ...args));
    }
  }

  warn(...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(...this.formatMessage('warn', ...args));
    }
  }

  error(...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error(...this.formatMessage('error', ...args));
    }
  }

  // Convenience method for development-only logs
  dev(...args: any[]): void {
    if (import.meta.env.DEV) {
      console.log(...this.formatMessage('debug', ...args));
    }
  }

  // Method to completely disable logging (useful for production builds)
  disable(): void {
    this.config.enabled = false;
  }

  // Method to enable logging (useful for debugging in production)
  enable(): void {
    this.config.enabled = true;
  }
}

// Export a singleton instance
export const logger = new Logger();

// Export the class for custom instances if needed
export { Logger };
