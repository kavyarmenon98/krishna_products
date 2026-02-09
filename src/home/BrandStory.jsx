import { motion } from "framer-motion";
import { FiUsers, FiStar, FiTruck, FiBox, FiGlobe, FiAward, FiGift, FiEdit3, FiSun, FiCheckCircle, FiInfo, FiInstagram, FiFacebook, FiMessageCircle } from "react-icons/fi";

const artisanalPledges = [
    {
        icon: <FiTruck />,
        title: "Free shipping all over india ",
        description:
            "Carefully packed and shipped across India . From our Kerala studio to your doorstep, every artwork is securely packed to arrive safely and beautifully.",
    },
    {
        icon: <FiEdit3 />,
        title: "100% Hand-Painted & Fade-Resistant Colors",
        description: "Every masterpiece is created with precision and care—no machines, no printing, just pure artisanal soul.We use high-grade, durable pigments that maintain their vibrancy for decades",
    },
    {
        icon: <FiInfo />,
        title: "Natural Handmade Variations",
        description:
            "As each piece is handcrafted, subtle variations such as tiny air bubbles, texture differences, or slight color shifts may occur due to weather and manual techniques. Exact replicas are not possible. Please place your order only if you appreciate the beauty of these natural variations.",
    },
    {
        icon: <FiCheckCircle />,
        title: "Premium Quality Resin",
        description: "Our resin art features non-toxic, food-grade materials that are crystal clear and highly durable.",
    },
];

const metrics = [
    { value: "100+", label: "Happy Customers" },
    { value: "180+", label: "Products Sold" },
    { value: "4.5/5", label: "Avg. Artist Rating" },
];

export default function BrandStory() {
    return (
        <section className="bg-black py-12 md:py-20 px-4 md:px-6 relative overflow-hidden">
            {/* Background Aesthetic */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--color-primary)]/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-primary)]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[var(--color-primary)] font-bold text-[10px] md:text-xs uppercase tracking-[0.6em] mb-4 block"
                    >
                        Arts & Crafts By Kavya
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-serif text-white tracking-tighter"
                    >
                        Why Trust Us !!!
                    </motion.h2>
                </div>

                {/* Main Content Area */}
                <div className="bg-[#0f1219] border border-white/5 rounded-[40px] md:rounded-[60px] p-6 md:p-12 lg:p-20 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/5 blur-[100px] pointer-events-none" />

                    <div className="flex flex-col xl:flex-row gap-16 items-start">
                        {/* Summary Column - Sticky only on Desktop */}
                        <div className="xl:w-1/3 w-full xl:sticky xl:top-32">
                            <h3 className="text-4xl font-serif text-white mb-8 border-b border-white/5 pb-6">Our Artisanal <span className="italic text-[var(--color-primary)]">Commitments</span></h3>
                            <p className="text-gray-400 text-base leading-relaxed font-medium mb-12 opacity-80">
                                Beyond aesthetics, we pledge absolute quality and transparency in every brushstroke and pour. Our work mirrors our heritage and passion.
                            </p>

                            {/* Metrics inside the commitment box */}
                            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-1 gap-4 md:gap-8 mb-12">
                                {metrics.map((m, i) => (
                                    <div key={i} className="flex items-center gap-3 md:gap-4 group p-4 rounded-3xl bg-black/20 border border-white/5 hover:border-[var(--color-primary)]/30 transition-all">
                                        <div className="text-2xl md:text-3xl font-serif font-black text-white italic group-hover:text-[var(--color-primary)] transition-colors">{m.value}</div>
                                        <div className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-gray-500 border-l border-white/10 pl-3 md:pl-4">{m.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Razorpay Trusted Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="p-6 md:p-8 rounded-[30px] md:rounded-[40px] bg-gradient-to-br from-[var(--color-primary)]/10 via-black/40 to-black/20 border border-[var(--color-primary)]/20 shadow-xl"
                            >
                                <div className="flex items-center gap-4 md:gap-6">
                                    <div className="w-14 h-14 md:w-20 md:h-20 bg-[var(--color-primary)] rounded-[15px] md:rounded-[20px] flex items-center justify-center shadow-xl shadow-[var(--color-primary)]/20 rotate-3 group-hover:rotate-0 transition-transform flex-shrink-0">
                                        <svg width="28" height="28" className="md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="text-white font-serif text-lg md:text-xl block leading-tight font-bold mb-1">Razorpay Trusted</span>
                                        <span className="text-[var(--color-primary)] text-[9px] md:text-xs font-black uppercase tracking-widest opacity-80">Secure Partner</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Detailed Features Column */}
                        <div className="xl:w-2/3 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-8">
                            {artisanalPledges.map((pledge, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex flex-col md:flex-row gap-6 md:gap-8 p-8 md:p-10 rounded-[30px] md:rounded-[40px] bg-black/40 border border-white/5 hover:border-[var(--color-primary)]/20 hover:shadow-2xl transition-all group overflow-hidden relative"
                                >
                                    <div className="absolute -bottom-8 -right-8 text-white/[0.02] text-7xl md:text-9xl font-serif pointer-events-none group-hover:text-[var(--color-primary)]/[0.05] transition-colors">
                                        {idx + 1}
                                    </div>
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-[var(--color-primary)]/5 flex items-center justify-center text-[var(--color-primary)] text-2xl md:text-3xl flex-shrink-0 group-hover:scale-110 group-hover:bg-[var(--color-primary)]/10 transition-all border border-white/5">
                                        {pledge.icon}
                                    </div>
                                    <div className="flex-1 relative z-10">
                                        <h4 className="text-xl md:text-2xl font-serif text-white mb-3 md:mb-4 group-hover:text-[var(--color-primary)] transition-colors tracking-tight">{pledge.title}</h4>
                                        <p className="text-gray-400 text-xs md:text-base leading-relaxed font-medium opacity-70 group-hover:opacity-100 transition-opacity whitespace-pre-line">
                                            {pledge.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center mt-16 pt-10 border-t border-white/5 gap-8">
                    <div className="flex flex-col items-center gap-6">
                        <h4 className="text-white font-serif text-2xl">Follow us:</h4>
                        <div className="flex gap-4">
                            <a
                                href="https://www.facebook.com/kavyarmenon.kavyarmenon/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-300 shadow-lg"
                                title="Facebook"
                            >
                                <FiFacebook size={18} />
                            </a>
                            <a
                                href="https://www.instagram.com/arts_n_crafts_by_kavya/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent transition-all duration-300 shadow-lg"
                                title="Instagram"
                            >
                                <FiInstagram size={18} />
                            </a>
                            <a
                                href="https://wa.me/919037009645"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300 shadow-lg"
                                title="WhatsApp"
                            >
                                <FiMessageCircle size={18} />
                            </a>
                        </div>
                    </div>
                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.5em]">
                        Arts & Crafts By Kavya ⋅ Focused on Artisanal Excellence
                    </p>
                </div>
            </div>
        </section>
    );
}

