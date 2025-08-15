/**
 * Performance monitoring utility
 * Tracks key metrics for optimization
 */
export const performanceMonitor = {
  // Track component render times
  measureRender: (componentName: string, callback: () => void) => {
    if (process.env.NODE_ENV === 'development') {
      const startTime = performance.now();
      callback();
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      if (renderTime > 16) { // More than one frame (60fps)
      }
    } else {
      callback();
    }
  },
  // Track API call times
  measureApiCall: async <T>(apiName: string, apiCall: Promise<T>): Promise<T> => {
    if (process.env.NODE_ENV === 'development') {
      const startTime = performance.now();
      try {
        const result = await apiCall;
        const endTime = performance.now();
        const callTime = endTime - startTime;
        if (callTime > 1000) { // More than 1 second
        }
        return result;
      } catch (error) {
        const endTime = performance.now();
        const callTime = endTime - startTime;
        throw error;
      }
    } else {
      return apiCall;
    }
  },
  // Log performance metrics
  logMetrics: () => {
    if ('performance' in window && 'memory' in performance) {
      const memory = (performance as any).memory;
        usedJSHeapSize: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
        totalJSHeapSize: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
        jsHeapSizeLimit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`,
      });
    }
  }
};