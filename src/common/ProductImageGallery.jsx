import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "./OptimizedImage";

const ProductImageGallery = ({ images = [], category = "", styleForImage = {} }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000); // Change image every 4 seconds

        return () => clearInterval(timer);
    }, [images.length]);

    if (!images || images.length === 0) return null;

    return (
        <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="w-full h-full"
                >
                    <OptimizedImage
                        src={images[currentIndex]}
                        alt={`Product view ${currentIndex + 1}`}
                        className="w-full h-full"
                        style={{
                            objectFit: (category === "Nettipattam" || category === "Craft") ? "contain" : "cover",
                            ...styleForImage
                        }}
                        priority={currentIndex === 0}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Progress Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
                    {images.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1 rounded-full transition-all duration-500 ${idx === currentIndex
                                    ? "bg-[var(--color-primary)] w-4"
                                    : "bg-white/20 w-1"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductImageGallery;
