import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiDroplet, FiTruck, FiInfo, FiHeart } from "react-icons/fi";

const categoryContent = {
    "cosmetics": {
        service: [
            "Handmade with pure, natural ingredients",
            "No harsh chemicals or artificial colors",
            "Batch-crafted to ensure maximum freshness",
            "Securely packed to maintain product integrity",
        ],
        care: [
            "Store in a cool, dry place away from direct sunlight",
            "Perform a patch test before regular use",
            "Keep container tightly closed when not in use",
            "Ensure hands/applicators are clean and dry before use",
        ]
    },
    "food": {
        service: [
            "Prepared using traditional recipes and fine ingredients",
            "Small-batch production for authentic homemade taste",
            "Hygienically processed and packed with care",
            "No artificial preservatives or taste enhancers",
        ],
        care: [
            "Use only a clean and dry spoon for pickles and powders",
            "Keep in an airtight container to retain freshness",
            "Store away from moisture and direct sunlight",
            "Check best before date and store appropriately",
        ]
    },
};

export default function ProductPolicies({ category }) {
    const [openIdx, setOpenIdx] = useState(0);

    // Normalize category for lookup
    const normalizedCategory = Object.keys(categoryContent).find(key =>
        category?.toLowerCase().includes(key.toLowerCase())
    ) || "cosmetics"; // Default to cosmetics

    const content = categoryContent[normalizedCategory];

    const policies = [];

    if (content.service) {
        policies.push({
            icon: <FiInfo />,
            title: "Service",
            content: content.service
        });
    }

    if (content.care) {
        policies.push({
            icon: <FiHeart />,
            title: "Care",
            content: content.care
        });
    }

    // Common Shipping Information
    policies.push({
        icon: <FiTruck />,
        title: "Shipping Information",
        content: [
            "Standard domestic shipping: 7-10 business days.",
            "Every product is packed with extra padding to ensure safe arrival.",
        ]
    });

    return (
        <div className="space-y-4 mt-12 pt-12 border-t border-white/5">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-500 mb-8">
                {normalizedCategory === "cosmetics" ? "Cosmetics & Beauty" : "Food Product"} Service & Care
            </h3>

            {policies.map((policy, idx) => {
                const isOpen = openIdx === idx;

                return (
                    <div
                        key={idx}
                        className={`border rounded-3xl transition-all duration-300 ${isOpen ? "bg-white/5 border-white/10" : "border-white/5 hover:border-white/10"
                            }`}
                    >
                        <button
                            onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                            className="w-full px-8 py-6 flex items-center justify-between text-left"
                        >
                            <div className="flex items-center gap-4 text-white">
                                <span className="text-[var(--color-primary)] text-lg">{policy.icon}</span>
                                <span className="font-serif text-lg tracking-tight">{policy.title}</span>
                            </div>
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                className="text-gray-500"
                            >
                                <FiChevronDown />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <ul className="px-8 pb-8 space-y-3">
                                        {policy.content.map((item, i) => (
                                            <li key={i} className="text-gray-400 text-sm flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]/40 mt-1.5 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
