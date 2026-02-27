import { motion } from "framer-motion";
import { FiMessageSquare } from "react-icons/fi";
import giftImage from "../assets/WhatsApp Image 2026-02-09 at 9.35.30 PM.jpeg";

export default function BulkGifting() {
    return (
        <section className="bg-black py-12 md:py-20 px-4 md:px-6 mb-8 md:mb-0">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-[40px] overflow-hidden bg-[#0f1219] border border-white/5"
                >
                    <div className="flex flex-col lg:flex-row items-center">
                        {/* Image side */}
                        <div className="w-full lg:w-1/2 h-80 lg:h-[600px] overflow-hidden relative">
                            <img
                                src={giftImage}
                                alt="Gifting with Love"
                                className="w-full h-full object-cover opacity-70 hover:scale-110 transition-transform duration-[3s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:hidden" />
                        </div>

                        {/* Content side */}
                        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-20">
                            <span className="text-[var(--color-primary)] font-bold text-[10px] md:text-xs uppercase tracking-[0.4em] mb-6 block">
                                Celebrate Life's Every Moment
                            </span>
                            <h2 className="text-3xl lg:text-6xl font-serif text-white mb-8 tracking-tight leading-tight">
                              Nature’s Touch for Clear Skin <span className="italic text-[var(--color-primary)]">From Breakouts to Bright Skin</span>
                            </h2>
                            <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed font-medium">
                                Whether it's the nourishing touch of our handmade cosmetics or the authentic taste of our herbal delicacies, AK Products offers thoughtfully curated hampers perfect for any occasion. Share the gift of pure, natural wellness with those who matter most.
                            </p>

                            <button
                                onClick={() => window.open(`https://wa.me/918943072598?text=${encodeURIComponent("Hi, I'm interested in AK Products curated hampers.")}`, "_blank")}
                                className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold uppercase tracking-widest hover:bg-[var(--color-primary)] hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95"
                            >
                                <FiMessageSquare /> Start Customizing
                            </button>
                        </div>
                    </div>

                    {/* Subtle patterns/glows */}
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[var(--color-primary)]/10 blur-[100px] rounded-full" />
                </motion.div>
            </div>
        </section>
    );
}
