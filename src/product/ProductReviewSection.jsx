import { useQuery } from "@tanstack/react-query";
import { getProductReviewsAPI } from "../services/service";
import { FaStar, FaUserCircle } from "react-icons/fa";
import { useState } from "react";

function ProductReviewSection({ productId }) {
    const [showAll, setShowAll] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["productReviews", productId],
        queryFn: () => getProductReviewsAPI(productId),
        enabled: !!productId,
    });

    const reviews = data?.reviews || [];
    const displayedReviews = showAll ? reviews : reviews.slice(0, 2);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-4">
                <div className="w-5 h-5 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!reviews || reviews.length === 0) {
        return null;
    }

    // Calculate average rating
    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
        : 0;

    return (
        <div className="w-full">
            {/* Reviews Header */}
            <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-3 mb-3">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-primary)]" />
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                        Customer Reviews
                    </h2>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-primary)]" />
                </div>

                <div className="flex items-center justify-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-full border border-amber-500/30">
                        <FaStar className="text-amber-400 text-lg" />
                        <span className="text-xl font-bold text-amber-400">{averageRating}</span>
                        <span className="text-sm text-gray-400">out of 5</span>
                    </div>
                    <span className="text-sm text-gray-400">
                        Based on <span className="font-bold text-white">{reviews.length}</span> {reviews.length === 1 ? 'review' : 'reviews'}
                    </span>
                </div>
            </div>

            {/* Reviews List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayedReviews.map((review) => (
                    <div
                        key={review._id}
                        className="relative bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-[var(--color-primary)]/30 hover:shadow-lg hover:shadow-[var(--color-primary)]/5 transition-all duration-300 group overflow-hidden flex flex-col"
                    >
                        {/* Subtle gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/0 to-[var(--color-primary)]/0 group-hover:from-[var(--color-primary)]/5 group-hover:to-transparent transition-all duration-300 rounded-xl pointer-events-none" />

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Review Header */}
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 flex items-center justify-center shrink-0 border border-white/10">
                                        <FaUserCircle className="text-[var(--color-primary)] text-lg" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-bold text-white truncate">
                                            {review.userId?.name || "Anonymous"}
                                        </p>
                                        <p className="text-[10px] text-gray-400">
                                            {new Date(review.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* Star Rating */}
                                <div className="flex items-center gap-0.5 shrink-0 bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/20">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`text-[10px] transition-all ${i < review.rating
                                                ? "text-amber-400 drop-shadow-[0_0_3px_rgba(251,191,36,0.5)]"
                                                : "text-gray-600"
                                                }`}
                                        />
                                    ))}
                                    <span className="text-xs font-bold text-amber-400 ml-1">{review.rating}</span>
                                </div>
                            </div>

                            {/* Review Comment */}
                            {review.comment && (
                                <div className="bg-black/20 rounded-lg p-2.5 border border-white/5">
                                    <p className="text-xs text-gray-200 leading-relaxed">
                                        "{review.comment}"
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Show More/Less Button */}
            {reviews.length > 2 && (
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/30 transition-all duration-300"
                    >
                        {showAll ? "Show Less Reviews" : `View All ${reviews.length} Reviews`}
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProductReviewSection;
