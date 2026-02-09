import { useEffect } from 'react';

/**
 * Preload critical images and resources
 * This helps reduce perceived loading time for important assets
 */
function usePreloadImages(imageUrls = []) {
    useEffect(() => {
        if (!imageUrls || imageUrls.length === 0) return;

        const preloadImage = (url) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(url);
                img.onerror = () => reject(url);
                img.src = url;
            });
        };

        // Preload all images
        const preloadPromises = imageUrls.map(url => preloadImage(url));

        Promise.allSettled(preloadPromises).then(results => {
            const successful = results.filter(r => r.status === 'fulfilled').length;
            console.log(`Preloaded ${successful}/${imageUrls.length} images`);
        });

    }, [imageUrls]);
}

/**
 * Preload fonts
 */
function usePreloadFonts(fontUrls = []) {
    useEffect(() => {
        if (!fontUrls || fontUrls.length === 0) return;

        fontUrls.forEach(fontUrl => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            link.href = fontUrl;
            document.head.appendChild(link);
        });
    }, [fontUrls]);
}

/**
 * Prefetch resources for next navigation
 */
function usePrefetchResources(resourceUrls = []) {
    useEffect(() => {
        if (!resourceUrls || resourceUrls.length === 0) return;

        resourceUrls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        });
    }, [resourceUrls]);
}

export { usePreloadImages, usePreloadFonts, usePrefetchResources };
