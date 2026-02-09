import { useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import loaderIcon from "../assets/logo/icon_black2.png";

/**
 * OptimizedImage Component
 * Uses native lazy loading with a blur-up effect/placeholder
 */
function OptimizedImage({
    src,
    alt,
    className = "",
    style = {},
    placeholderColor = "#0f1219",
    priority = false, // If true, eager load
    onLoad,
    onError
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const containerRef = useRef(null);

    const handleLoad = (e) => {
        setIsLoaded(true);
        if (onLoad) onLoad(e);
    };

    const handleError = (e) => {
        setHasError(true);
        setIsLoaded(true); // Stop loading animation
        if (onError) onError(e);
    };

    if (!src) {
        return (
            <div
                className={`flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 ${className}`}
                style={style}
            >
                <div className="text-center p-4">
                    <p className="text-xs text-gray-500">No Image</p>
                </div>
            </div>
        );
    }

    if (hasError) {
        return (
            <div
                className={`flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 ${className}`}
                style={style}
            >
                <div className="text-center p-4">
                    <svg
                        className="w-12 h-12 mx-auto mb-2 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <p className="text-xs text-gray-500">Image unavailable</p>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`} style={style}>
            {/* Placeholder / Loader */}
            {!isLoaded && (
                <div
                    className="absolute inset-0 z-10 flex items-center justify-center"
                    style={{ backgroundColor: placeholderColor }}
                >
                    <motion.div
                        animate={{
                            scale: [0.8, 1, 0.8],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-8 h-8"
                    >
                        <img
                            src={loaderIcon}
                            alt="Loading"
                            className="w-full h-full object-contain grayscale opacity-50"
                        />
                    </motion.div>
                </div>
            )}

            {/* Actual image */}
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                style={style}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                onLoad={handleLoad}
                onError={handleError}
            />
        </div>
    );
}

export default OptimizedImage;
