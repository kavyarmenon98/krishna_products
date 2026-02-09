import { motion, AnimatePresence } from "framer-motion";
import { FiStar } from "react-icons/fi";
import { useState, useEffect } from "react";
import ReviewModal from "../common/ReviewModal";
import { useQuery } from "@tanstack/react-query";
import { getMyOrderAPI } from "../services/service";

const reviews = [
    {
        name: "Keerthana",
        location: "Paravoor, Cochin",
        rating: 5,
        text: "Chechi painting thuran nokiyitoo, veetila ellavarakum ishtamayi nalla bhangiyayittind, ellavaraum mugathin nalla aishwaryam ulla pola ind, vicharichathinalum bhangi ayitund chechi photo ayachapo kandathinalum bhangi ayitt neritt kandapo,Eni athe frame cheythitulla photo nian ayakatto...",
        initials: "KK",
        productImage: "https://res.cloudinary.com/dibwknecl/image/upload/v1768994137/product_uploads/w9k2ba6acm1qrss6mcd0.jpg"
    },
    {
        name: "Aparna Roy",
        location: "Delhi, Uttar Pradesh",
        rating: 5,
        text: "Lovely work—you've done a beautiful job. I'll be putting these up on the wall. You're an amazing artist; keep going. Thank you for making my home beautiful!",
        initials: "AR",
        productImage: "https://res.cloudinary.com/dibwknecl/image/upload/v1768997332/product_uploads/eskcweqiin8q4h7geotm.jpg"
    },
    {
        name: "Archana",
        location: "Australia",
        rating: 5,
        text: "Received the courier. Beautiful painting! Thank you so much—keep in touch 😊",
        initials: "AN",
        productImage: "https://res.cloudinary.com/dibwknecl/image/upload/v1768997064/product_uploads/efkppavfenlifjcacfq3.jpg"
    },
    {
        name: "Rajesh Gopalakrishnan",
        location: "Tambaram, Chennai",
        rating: 5,
        text: "I've received it, madam. It's beautiful—thank you. I collected it from the gate as I was at the office. I felt the flowers could have been slightly bigger, as they look a little small. Overall, it's very elegant.",
        initials: "RG",
        productImage: "https://res.cloudinary.com/dibwknecl/image/upload/v1768992245/product_uploads/knzysyfl9ipro3rcossl.jpg"
    },
    {
        name: "Reshma Nagesh",
        location: "Kuripuzha, kollam",
        rating: 4,
        text: "Received the parcel. Thank you, dear. Eniyum enthelum ullappol parayam, kettto. Enikku ente molude oru baby keepsake cheyyanam. Njaan naatil varumbo ayachu tharaam",
        initials: "RN",
        productImage: "https://res.cloudinary.com/dibwknecl/image/upload/v1769010708/product_uploads/nhbevr1bc38bitt1m0nm.jpg"
    },
    {
        name: "Julia Joseph",
        location: "Kakkanad, Kochi",
        rating: 4,
        text: "It truly means a lot to me. You did everything so quickly, and it looks absolutely beautiful ✨💕 I showed it to my friend, and she loved it too 😍 ,Thank you for taking time in between your work and even at midnight 🌙🙏 You’ve helped me so much, and your work is truly amazing ❤️🎨",
        initials: "JJ",
        productImage: "https://res.cloudinary.com/dibwknecl/image/upload/v1768222824/product_uploads/xkbqev7foc2ca7hz6lsu.jpg"
    },
];

export default function Review() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    const { data: orderData } = useQuery({
        queryKey: ["orders"],
        queryFn: getMyOrderAPI,
        enabled: isModalOpen
    });

    const deliveredOrders = orderData?.orders?.filter(order => order.status === "Delivered") || [];

    // Handle Resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const itemsPerPage = isMobile ? 1 : 3;

    // Auto-play timer
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => {
                const next = prev + itemsPerPage;
                return next >= reviews.length ? 0 : next;
            });
        }, 3000);

        return () => clearInterval(timer);
    }, [itemsPerPage]);

    const visibleReviews = reviews.slice(currentIndex, currentIndex + itemsPerPage);

    return (
        <section className="bg-black py-12 md:py-20 px-4 md:px-6 relative overflow-hidden mb-8 md:mb-0">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col items-center text-center mb-16 md:mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-[0.5em] mb-4"
                    >
                        Customer Reviews
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif text-white tracking-tight"
                    >
                        What Our Customers <span className="italic text-[var(--color-primary)]">Say About Us</span>
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="h-1 bg-[var(--color-primary)] mt-8 rounded-full"
                    />
                </div>

                <div className="relative min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {visibleReviews.map((review, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -10 }}
                                    className="bg-[#0f1219] rounded-[40px] border border-white/5 h-[500px] flex flex-col relative overflow-hidden group shadow-2xl transition-all duration-500 hover:border-[var(--color-primary)]/30 p-6 md:p-8"
                                >
                                    {/* Product Image */}
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 shadow-xl mb-6 shrink-0 bg-black/40">
                                        <img src={review.productImage} alt="product" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                                    </div>

                                    {/* Stars */}
                                    <div className="flex gap-1 mb-6 text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <FiStar key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-700"} />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <div className="relative mb-8 flex-1">
                                        <span className="absolute -top-4 -left-2 text-6xl text-[var(--color-primary)] opacity-10 font-serif leading-none">"</span>
                                        <p className="text-gray-300 text-sm md:text-base leading-relaxed italic opacity-90 relative z-10">
                                            {review.text}
                                        </p>
                                    </div>

                                    <div className="mt-auto flex items-center gap-4 pt-6 border-t border-white/5">
                                        <div className="w-12 h-12 rounded-full border-2 border-[var(--color-primary)]/20 p-0.5 shrink-0">
                                            <div className="w-full h-full rounded-full bg-gradient-to-br from-[var(--color-primary)] to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                                {review.initials}
                                            </div>
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-white font-bold text-base tracking-tight truncate">{review.name}</h4>
                                            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest truncate">{review.location}</p>
                                        </div>
                                    </div>

                                    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[var(--color-primary)]/5 blur-3xl rounded-full group-hover:bg-[var(--color-primary)]/10 transition-colors" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Dots indicator */}
                    <div className="flex justify-center gap-2 mt-12">
                        {Array.from({ length: Math.ceil(reviews.length / itemsPerPage) }).map((_, i) => (
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

                <div className="mt-20 flex flex-col items-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsModalOpen(true)}
                        className="group relative px-10 py-4 rounded-full bg-transparent overflow-hidden border border-[var(--color-primary)] transition-all"
                    >
                        <div className="absolute inset-0 bg-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10 text-[var(--color-primary)] group-hover:text-black text-xs font-black uppercase tracking-widest transition-colors font-serif">
                            Share Your Story
                        </span>
                    </motion.button>
                    <p className="mt-6 text-gray-600 text-[10px] uppercase font-bold tracking-widest opacity-60">
                        Join our community of art enthusiasts
                    </p>
                </div>

                <ReviewModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    deliveredItems={deliveredOrders}
                />
            </div>
        </section>
    );
}
