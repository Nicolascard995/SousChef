export const measurePerformance = () => {
  // LCP (Largest Contentful Paint)
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      console.log('LCP:', entry.startTime);
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // FID (First Input Delay)
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      console.log('FID:', entry.processingStart - entry.startTime);
    }
  }).observe({ entryTypes: ['first-input'] });

  // CLS (Cumulative Layout Shift)
  new PerformanceObserver((entryList) => {
    let cls = 0;
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        cls += (entry as any).value;
      }
    }
    console.log('CLS:', cls);
  }).observe({ entryTypes: ['layout-shift'] });
};

export const measurePageLoadTime = () => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navigation) {
    console.log('Page Load Time:', navigation.loadEventEnd - navigation.loadEventStart);
    console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
  }
};

export const measureResourceTiming = () => {
  const resources = performance.getEntriesByType('resource');
  const slowResources = resources.filter(resource => 
    resource.duration > 1000
  );
  
  if (slowResources.length > 0) {
    console.warn('Slow resources detected:', slowResources);
  }
};
