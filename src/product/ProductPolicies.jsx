import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiDroplet, FiTruck, FiInfo, FiHeart } from "react-icons/fi";

const categoryContent = {
    "fabric": {
        service: [
            "Meticulously hand-painted on premium fabric surfaces",
            "Custom patterns and personalized themes available",
            "Wash-tested for durability and color fastness",
        ],
        care: [
            "Gentle hand wash in cold water for later washes",
            "Avoid machine wash, bleach, or wringing",
            "Dry in shade to preserve artwork and fabric",
            "Iron on low heat inside out",
        ]
    },
    "nettipattam": {
        service: [
            "Handcrafted with premium materials and intricate detailing",
            "Custom sizes and design variations available",
            "Carefully packed to preserve shape and finish during transit",
        ],
        care: [
            "Keep away from water and humidity",
            "Clean gently with a dry or slightly soft brush",
            "Avoid pressure or folding to maintain structure",
            "Store in a dry place when not in use",
        ]
    },
    "resin": {
        service: [
            "Handcrafted using high-quality, durable resin",
            "Custom designs, colors, and personalization available",
            "Each piece is carefully finished and securely packed",
        ],
        care: [
            "Clean gently using a soft, dry or slightly damp cloth",
            "Avoid direct sunlight and extreme heat exposure",
            "Do not use harsh chemicals or abrasive materials",
            "Handle with care to prevent scratches or cracks",
        ]
    },
    "painting": {
        service: [
            "Handcrafted using high-quality paints and traditional techniques",
            "Custom size, theme, and color palette available on request",
            "Secure packaging provided for safe delivery",
        ],
        care: [
            "Keep away from direct sunlight and moisture",
            "Clean gently using a soft, dry cloth",
            "Avoid water, chemicals, or abrasive cleaning",
            "Display in a well-ventilated, dry indoor space",
        ]
    },
    "craft": {
        service: [
           "All artworks are 100% handmade and carefully crafted with attention to detail.",
           "Each piece is securely packed to ensure safe transit and delivered with utmost care.",
           "Customization support is available for selected products to match your preferences.",
           "Every order is created with patience and artistry, not mass-produced or machine-made.",
        ],
        care: [
           "Keep away from direct sunlight, excessive heat, and moisture.",
           "Clean gently using a soft, dry cloth. Avoid water, chemicals, or abrasive cleaners.",
           "Handle with care to avoid scratches or accidental impact.",
           "Display indoor artworks in a stable, dust-free environment.",
        ]
    },
};

export default function ProductPolicies({ category }) {
    const [openIdx, setOpenIdx] = useState(0);

    // Normalize category for lookup
    const normalizedCategory = Object.keys(categoryContent).find(key =>
        category?.toLowerCase().includes(key.toLowerCase())
    ) || "fabric"; // Default to Fabric as requested or generic

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
            "Every piece is packed with extra padding to ensure safe arrival.",
        ]
    });

    return (
        <div className="space-y-4 mt-12 pt-12 border-t border-white/5">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-500 mb-8">
                {normalizedCategory === "fabric" ? "Fabric Painting" :
                    normalizedCategory === "nettipattam" ? "Nettipattam" :
                        normalizedCategory === "resin" ? "Resin Product" :
                            normalizedCategory === "painting" ? "Mural Painting" : "Artwork"} Service & Care
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
