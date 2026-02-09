import { useQuery } from "@tanstack/react-query";

import { FiStar, FiUser, FiPackage, FiMessageCircle, FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";
import PageLoader from "../common/PageLoader";
import { getAllReviewsAPI } from "../services/service";

export default function AdminReviews() {
    const { data, isLoading } = useQuery({
        queryKey: ["allReviews"],
        queryFn: getAllReviewsAPI,
    });

    if (isLoading) return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center">
            <PageLoader />
        </div>
    );

    const reviews = data?.reviews || [];

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl font-serif text-white tracking-tight mb-4"
                    >
                        User <span className="italic">Feedback</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 text-lg font-medium"
                    >
                        Monitoring the voices of our artisanal community.
                    </motion.p>
                </div>

                {!reviews.length ? (
                    <div className="py-32 flex flex-col items-center justify-center text-center opacity-20 border border-white/5 rounded-[40px]">
                        <FiMessageCircle size={80} className="mb-6" />
                        <h3 className="text-2xl font-serif italic">No stories have been shared yet.</h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {reviews.map((review, idx) => (
                            <motion.div
                                key={review?._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-[#0f1219] border border-white/5 rounded-[40px] p-8 hover:border-white/10 transition-all shadow-2xl group"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] shadow-inner">
                                            <FiUser size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold leading-tight uppercase tracking-widest text-xs">
                                                {review?.userId?.name || 'Anonymous Artist'}
                                            </h4>
                                            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">
                                                <FiCalendar size={10} />
                                                {new Date(review?.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 text-[var(--color-primary)]">
                                        {[...Array(5)].map((_, i) => (
                                            <FiStar
                                                key={i}
                                                size={14}
                                                fill={i < review?.rating ? "currentColor" : "none"}
                                                className={i < review?.rating ? "drop-shadow-[0_0_5px_rgba(180,150,90,0.3)]" : "text-gray-800"}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-[var(--color-primary)] text-[8px] font-black uppercase tracking-[0.3em]">Direct Quote</span>
                                        <div className="h-[1px] flex-1 bg-white/5" />
                                    </div>
                                    <p className="text-gray-300 italic leading-relaxed text-sm opacity-90 indent-4">
                                        "{review?.comment}"
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                                    <div className="w-12 h-16 rounded-lg overflow-hidden border border-white/5 bg-black">
                                        <img
                                            src={review?.productId?.image || "/placeholder.jpg"}
                                            alt={review?.productId?.pname}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1">Reviewed Masterpiece</p>
                                        <h5 className="text-white font-serif text-lg truncate leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                                            {review?.productId?.pname || 'Unnamed Treasure'}
                                        </h5>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
