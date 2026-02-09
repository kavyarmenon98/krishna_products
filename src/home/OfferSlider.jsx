import { useQuery } from "@tanstack/react-query";
import { getAllProductAPI } from "../services/service";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiTag } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function OfferSlider() {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getAllProductAPI,
    });

    const offerProducts =
        data?.readproduct?.filter((product) => product.discountPercentage > 30) || [];

    // Handle Resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const itemsPerPage = isMobile ? 1 : 3;

    // Auto-play timer
    useEffect(() => {
        if (offerProducts.length === 0) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => {
                const next = prev + itemsPerPage;
                return next >= offerProducts.length ? 0 : next;
            });
        }, 3000);

        return () => clearInterval(timer);
    }, [offerProducts.length, itemsPerPage]);

    if (isLoading || offerProducts.length === 0) return null;

    const visibleProducts = offerProducts.slice(currentIndex, currentIndex + itemsPerPage);

    return (
        <section className="bg-black py-12 md:py-20 px-4 md:px-6 relative overflow-hidden mb-8 md:mb-0">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 md:mb-12 gap-8 text-center md:text-left">
                    <div>
                        <span className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-[0.4em] mb-4 block">
                            Exclusive Deals
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
                            🔥 Hot <span className="italic text-[var(--color-primary)]">Offers</span>
                        </h2>
                    </div>
                    <motion.button
                        whileHover={{ x: 5 }}
                        onClick={() => navigate("/offer")}
                        className="flex items-center gap-2 text-white/60 hover:text-[var(--color-primary)] transition-colors text-xs font-bold uppercase tracking-widest"
                    >
                        View All Offers <FiArrowRight />
                    </motion.button>
                </div>

                <div className="relative min-h-[520px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {visibleProducts.map((product) => (
                                <motion.div
                                    key={product._id}
                                    whileHover={{ y: -10 }}
                                    className="group relative bg-[#0f1219]/60 backdrop-blur-md border border-white/5 rounded-[40px] overflow-hidden hover:border-[var(--color-primary)]/20 transition-all duration-500 cursor-pointer shadow-2xl h-[520px] flex flex-col"
                                    onClick={() => navigate(`/viewProduct/${product._id}`)}
                                >
                                    {/* Image */}
                                    <div className="h-[60%] overflow-hidden relative">
                                        <img
                                            src={product.images?.[0] || product.image}
                                            alt={product.pname}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1219] via-transparent to-transparent opacity-80" />

                                        {/* Discount Badge */}
                                        <div className="absolute top-6 left-6 bg-red-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-tighter shadow-xl flex items-center gap-2">
                                            <FiTag /> Save {product.discountPercentage}%
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col justify-between h-[40%]">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-3 line-clamp-1">{product.pname}</h3>
                                            <p className="text-gray-500 text-sm line-clamp-2 font-light">
                                                {product.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex flex-col">
                                                <span className="text-gray-600 line-through text-xs font-bold">₹{product.price}</span>
                                                <span className="text-2xl font-black text-[var(--color-primary)] tracking-tighter">₹{product.discount}</span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-all">
                                                <FiArrowRight />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Dots indicator */}
                    <div className="flex justify-center gap-2 mt-12">
                        {Array.from({ length: Math.ceil(offerProducts.length / itemsPerPage) }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i * itemsPerPage)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${Math.floor(currentIndex / itemsPerPage) === i
                                        ? "bg-[var(--color-primary)] w-8"
                                        : "bg-white/20 hover:bg-white/40"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
