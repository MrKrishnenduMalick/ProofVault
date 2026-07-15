import { env } from '@/lib/config/env';

export interface LogEntry {
  timestamp: string;
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  request_id?: string;
  user_id?: string;
  route?: string;
  method?: string;
  status?: number;
  duration?: number;
  error?: {
    name?: string;
    message?: string;
    stack?: string;
  };
  [key: string]: any;
}

export class Logger {
  static log(level: 'error' | 'warn' | 'info' | 'debug', message: string, meta: Omit<LogEntry, 'timestamp' | 'level' | 'message'> = {}) {
    // Only log if the level is greater than or equal to the configured log level
    const levels = { error: 0, warn: 1, info: 2, debug: 3 };
    const currentLevelIndex = levels[env.LOG_LEVEL];
    const messageLevelIndex = levels[level];
    
    if (messageLevelIndex <= currentLevelIndex) {
      const logEntry: LogEntry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        ...meta,
      };
      
      // Never log sensitive information
      const sanitizedEntry = this.sanitizeLogEntry(logEntry);
      
      console.log(JSON.stringify(sanitizedEntry));
    }
  }

  static info(message: string, meta: Omit<LogEntry, 'timestamp' | 'level' | 'message'> = {}) {
    this.log('info', message, meta);
  }

  static warn(message: string, meta: Omit<LogEntry, 'timestamp' | 'level' | 'message'> = {}) {
    this.log('warn', message, meta);
  }

  static error(message: string, meta: Omit<LogEntry, 'timestamp' | 'level' | 'message'> = {}) {
    this.log('error', message, meta);
  }

  static debug(message: string, meta: Omit<LogEntry, 'timestamp' | 'level' | 'message'> = {}) {
    this.log('debug', message, meta);
  }

  private static sanitizeLogEntry(entry: LogEntry): LogEntry {
    // Remove potentially sensitive information
    const sanitized = { ...entry };
    
    // Remove any field that might contain sensitive data
    if (sanitized.password) delete sanitized.password;
    if (sanitized.token) delete sanitized.token;
    if (sanitized.authorization) delete sanitized.authorization;
    if (sanitized.cookie) delete sanitized.cookie;
    if (sanitized.secrets) delete sanitized.secrets;
    if (sanitized.api_key) delete sanitized.api_key;
    
    // Sanitize error stack traces
    if (sanitized.error?.stack) {
      sanitized.error.stack = sanitized.error.stack
        .split('\n')
        .filter(line => !line.includes('SECRET') && !line.includes('PASSWORD') && !line.includes('TOKEN'))
        .join('\n');
    }
    
    return sanitized;
  }
}

export const logger = Logger;