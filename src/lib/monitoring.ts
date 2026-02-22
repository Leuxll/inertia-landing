/**
 * Error monitoring utilities.
 * 
 * Install: npm install @sentry/nextjs
 * Setup: Add NEXT_PUBLIC_SENTRY_DSN to your env
 */

interface ErrorContext {
  email?: string;
  ip?: string;
  userAgent?: string;
  extra?: Record<string, any>;
}

export function captureError(error: Error, context?: ErrorContext) {
  // Log to console for debugging
  console.error('API Error:', error, context);

  // If Sentry is configured, capture there too
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    try {
      const Sentry = require('@sentry/nextjs');
      
      if (context) {
        Sentry.withScope((scope: any) => {
          if (context.email) scope.setUser({ email: context.email });
          if (context.ip) scope.setTag('ip', context.ip);
          if (context.userAgent) scope.setTag('userAgent', context.userAgent);
          if (context.extra) scope.setContext('extra', context.extra);
          
          Sentry.captureException(error);
        });
      } else {
        Sentry.captureException(error);
      }
    } catch (sentryError) {
      console.warn('Sentry capture failed:', sentryError);
    }
  }
}

export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  console.log(`[${level.toUpperCase()}]`, message);

  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    try {
      const Sentry = require('@sentry/nextjs');
      Sentry.captureMessage(message, level);
    } catch (error) {
      console.warn('Sentry message capture failed:', error);
    }
  }
}