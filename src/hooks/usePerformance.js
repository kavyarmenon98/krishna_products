import { useEffect } from 'react';

/**
 * Performance monitoring hook
 * Tracks and logs performance metrics for the application
 */
function usePerformanceMonitor(componentName = 'Component') {
    useEffect(() => {
        // Only run in development
        if (import.meta.env.MODE !== 'development') return;

        // Measure component mount time
        const mountStart = performance.now();

        return () => {
            const mountEnd = performance.now();
            const mountTime = mountEnd - mountStart;

            if (mountTime > 100) {
                console.warn(
                    `⚠️ ${componentName} took ${mountTime.toFixed(2)}ms to mount (>100ms)`
                );
            }
        };
    }, [componentName]);

    useEffect(() => {
        // Only run in development
        if (import.meta.env.MODE !== 'development') return;

        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint (LCP)
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('📊 LCP:', lastEntry.renderTime || lastEntry.loadTime);
            });

            // First Input Delay (FID)
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    console.log('📊 FID:', entry.processingStart - entry.startTime);
                });
            });

            // Cumulative Layout Shift (CLS)
            const clsObserver = new PerformanceObserver((list) => {
                let clsScore = 0;
                list.getEntries().forEach((entry) => {
                    if (!entry.hadRecentInput) {
                        clsScore += entry.value;
                    }
                });
                console.log('📊 CLS:', clsScore);
            });

            try {
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                fidObserver.observe({ entryTypes: ['first-input'] });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                // Browser doesn't support some metrics
            }

            return () => {
                lcpObserver.disconnect();
                fidObserver.disconnect();
                clsObserver.disconnect();
            };
        }
    }, []);
}

/**
 * Image loading performance tracker
 */
function useImageLoadTracker(imageUrl, imageName = 'Image') {
    useEffect(() => {
        if (!imageUrl || import.meta.env.MODE !== 'development') return;

        const startTime = performance.now();

        const img = new Image();
        img.onload = () => {
            const loadTime = performance.now() - startTime;
            if (loadTime > 500) {
                console.warn(
                    `⚠️ ${imageName} took ${loadTime.toFixed(2)}ms to load (>500ms)`
                );
            }
        };
        img.src = imageUrl;
    }, [imageUrl, imageName]);
}

/**
 * API call performance tracker
 */
function useAPICallTracker(apiName, isLoading, data) {
    useEffect(() => {
        if (import.meta.env.MODE !== 'development') return;

        let startTime;

        if (isLoading && !data) {
            startTime = performance.now();
        } else if (!isLoading && data) {
            if (startTime) {
                const duration = performance.now() - startTime;
                if (duration > 1000) {
                    console.warn(
                        `⚠️ API call "${apiName}" took ${duration.toFixed(2)}ms (>1s)`
                    );
                } else {
                    console.log(`✅ API call "${apiName}" completed in ${duration.toFixed(2)}ms`);
                }
            }
        }
    }, [apiName, isLoading, data]);
}

export { usePerformanceMonitor, useImageLoadTracker, useAPICallTracker };
