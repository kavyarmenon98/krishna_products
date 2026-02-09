import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiStar, FiChevronRight, FiCheck } from "react-icons/fi";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReviewAPI } from "../services/service";

export default function ReviewModal({ isOpen, onClose, preFilledData = null, deliveredItems = [] }) {
    const queryClient = useQueryClient();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedItem, setSelectedItem] = useState(preFilledData);
    const [step, setStep] = useState(preFilledData ? 'review' : 'select');

    const addReviewMutation = useMutation({
        mutationFn: addReviewAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(["myReviews"]);
            onClose();
            // Reset state
            setRating(0);
            setComment("");
            setSelectedItem(null);
            setStep('select');
        }
    });

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (rating === 0) return;
        addReviewMutation.mutate({
            productId: selectedItem.productId,
            orderItemId: selectedItem._id || selectedItem.orderItemId,
            rating,
            comment
        });
    };

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-[#11141d] border border-white/5 w-full max-w-xl rounded-[40px] shadow-2xl relative overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-8 md:p-12">
                    <button onClick={onClose} className="absolute top-8 right-8 p-2 text-gray-500 hover:text-white transition-colors">
                        <FiX size={24} />
                    </button>

                    <AnimatePresence mode="wait">
                        {step === 'select' ? (
                            <motion.div
                                key="select-step"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                            >
                                <h3 className="text-3xl font-serif text-white mb-2">Share Your Experience</h3>
                                <p className="text-gray-500 text-sm mb-8">Select a masterpiece from your collection to review.</p>

                                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {deliveredItems?.length > 0 ? (
                                        deliveredItems.flatMap(order => order.items).map((item, idx) => (
                                            <button
                                                key={item._id}
                                                onClick={() => {
                                                    setSelectedItem(item);
                                                    setStep('review');
                                                }}
                                                className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-3xl hover:border-[var(--color-primary)]/30 hover:bg-white/[0.08] transition-all group"
                                            >
                                                <img src={item.image} className="w-16 h-20 object-cover rounded-xl" alt="" />
                                                <div className="flex-1 text-left">
                                                    <h4 className="text-white font-medium mb-1 line-clamp-1">{item.name}</h4>
                                                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-black">Delivered</p>
                                                </div>
                                                <FiChevronRight className="text-gray-600 group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all" />
                                            </button>
                                        ))
                                    ) : (
                                        <div className="py-12 text-center opacity-30">
                                            <p className="font-serif italic text-lg">Your collection is empty.</p>
                                            <p className="text-[10px] uppercase font-black tracking-widest mt-2">Only delivered items can be reviewed</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="review-step"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <div className="flex items-center gap-6 mb-10">
                                    <img src={selectedItem?.image} className="w-20 h-24 object-cover rounded-2xl shadow-xl" alt="" />
                                    <div>
                                        <button
                                            onClick={() => !preFilledData && setStep('select')}
                                            className="text-[var(--color-primary)] text-[10px] font-black uppercase tracking-widest mb-2 hover:opacity-70 disabled:opacity-30"
                                            disabled={!!preFilledData}
                                        >
                                            {preFilledData ? "Write a Review" : "← Change Selection"}
                                        </button>
                                        <h3 className="text-2xl font-serif text-white leading-tight">{selectedItem?.name}</h3>
                                    </div>
                                </div>

                                <div className="space-y-10">
                                    {/* Star Rating */}
                                    <div className="flex flex-col items-center">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-4">Rate Your Masterpiece</p>
                                        <div className="flex gap-3">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onMouseEnter={() => setHoverRating(star)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    onClick={() => setRating(star)}
                                                    className="text-4xl transition-all active:scale-90"
                                                >
                                                    <FiStar
                                                        fill={(hoverRating || rating) >= star ? "var(--color-primary)" : "none"}
                                                        className={(hoverRating || rating) >= star ? "text-[var(--color-primary)] drop-shadow-[0_0_10px_rgba(180,150,90,0.5)]" : "text-gray-700"}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Comment */}
                                    <div className="relative">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-4">Your Story</p>
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Tell us about the craftsmanship, the details, or how it looks in your space..."
                                            className="w-full h-32 bg-black/40 border border-white/10 rounded-[30px] p-6 text-white focus:outline-none focus:border-[var(--color-primary)] transition-all resize-none leading-relaxed text-sm font-medium"
                                        />
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={rating === 0 || addReviewMutation.isPending}
                                        className="w-full py-5 rounded-3xl bg-[var(--color-primary)] text-black font-black uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-3 shadow-xl shadow-[var(--color-primary)]/20"
                                    >
                                        {addReviewMutation.isPending ? (
                                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>SUBMIT REVIEW <FiCheck /></>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Aesthetic blur */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[var(--color-primary)]/10 blur-[100px] rounded-full pointer-events-none" />
            </motion.div>
        </div>
    );
}
