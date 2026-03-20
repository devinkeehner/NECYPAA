/**
 * Web Vitals Performance Monitoring
 * Tracks Core Web Vitals and reports to analytics
 */

import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('[Web Vitals]', {
      name: metric.name,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      rating: metric.rating,
      delta: Math.round(metric.delta),
    });
  }

  // Send to Vercel Analytics in production
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('event', {
      name: metric.name,
      data: {
        value: metric.value,
        rating: metric.rating,
      },
    });
  }
}

export function reportWebVitals() {
  try {
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  } catch (err) {
    console.error('[Web Vitals] Error:', err);
  }
}
