import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * useDebounce - Debounce a value
 * Useful for search inputs, API calls, etc.
 * 
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default: 500ms)
 * @returns {any} - Debounced value
 */
export function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

/**
 * useThrottle - Throttle a value
 * Limits how often a value can update
 * 
 * @param {any} value - The value to throttle
 * @param {number} limit - Time limit in milliseconds (default: 500ms)
 * @returns {any} - Throttled value
 */
export function useThrottle(value, limit = 500) {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastRan = useRef(Date.now());

    useEffect(() => {
        const handler = setTimeout(() => {
            if (Date.now() - lastRan.current >= limit) {
                setThrottledValue(value);
                lastRan.current = Date.now();
            }
        }, limit - (Date.now() - lastRan.current));

        return () => {
            clearTimeout(handler);
        };
    }, [value, limit]);

    return throttledValue;
}

/**
 * useDebouncedCallback - Debounce a callback function
 * Useful for event handlers
 * 
 * @param {Function} callback - The function to debounce
 * @param {number} delay - Delay in milliseconds (default: 500ms)
 * @returns {Function} - Debounced callback
 */
export function useDebouncedCallback(callback, delay = 500) {
    const timeoutRef = useRef(null);

    const debouncedCallback = useCallback(
        (...args) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return debouncedCallback;
}

/**
 * useIntersectionObserver - Detect when element enters viewport
 * Useful for lazy loading, infinite scroll, etc.
 * 
 * @param {Object} options - IntersectionObserver options
 * @returns {[Function, Boolean]} - [ref setter, isIntersecting]
 */
export function useIntersectionObserver(options = {}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [node, setNode] = useState(null);

    useEffect(() => {
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                ...options,
            }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [node, options]);

    return [setNode, isIntersecting];
}

/**
 * useWindowSize - Track window dimensions
 * Useful for responsive behavior
 * 
 * @returns {Object} - { width, height }
 */
export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Debounce resize events
        let timeoutId;
        const debouncedResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(handleResize, 150);
        };

        window.addEventListener('resize', debouncedResize);

        return () => {
            window.removeEventListener('resize', debouncedResize);
            clearTimeout(timeoutId);
        };
    }, []);

    return windowSize;
}

/**
 * useLocalStorage - Persist state in localStorage
 * Useful for user preferences, cart data, etc.
 * 
 * @param {string} key - localStorage key
 * @param {any} initialValue - Initial value
 * @returns {[any, Function]} - [value, setValue]
 */
export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error loading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = useCallback(
        (value) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.error(`Error setting localStorage key "${key}":`, error);
            }
        },
        [key, storedValue]
    );

    return [storedValue, setValue];
}
