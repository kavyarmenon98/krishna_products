import { motion } from "framer-motion";
import { FiMapPin, FiAward, FiStar, FiHeart, FiCode, FiCornerDownRight, FiInstagram, FiMessageCircle, FiEdit3, FiFacebook } from "react-icons/fi";

// Import profile image properly for production
import myPic1 from "../assets/me4.jpeg";
import logo2 from "../assets/logo/main_logo_png.png";

export default function AboutMe() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4 md:px-6 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden select-none">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--color-primary)]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[var(--color-primary)]/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Hero Section - Restored previous wording & layout */}
                <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="relative z-10 rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                            <img
                                src={myPic1}
                                alt="Rathika Nair"
                                className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-primary)]/10 blur-3xl rounded-full" />
                        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[var(--color-primary)]/5 blur-3xl rounded-full" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2"
                    >
                        <span className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-[0.6em] mb-4 block">
                            The Heart Behind AK Products
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif mb-8 tracking-tighter leading-tight">
                            Hi, I'm <span className="font-bold italic text-[var(--color-primary)]">Rathika Nair</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-light leading-relaxed mb-8 italic">
                            "Bringing the purity of nature to your home through handmade goodness."
                        </p>
                        <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                            <p>
                                Proudly from Edappal, Malappuram district, Kerala, I have always believed in the power of natural ingredients and traditional recipes.
                            </p>
                            <p>
                                Through AK Products, I bring you a curated collection of handmade beauty essentials and authentic food products—combining traditional wisdom with modern quality standards to ensure you get nothing but the best.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-6">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
                                    <FiHeart /> Handmade with Love
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
                                    <FiStar /> 100% Natural
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-6">
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
                                        href="https://www.instagram.com/krishna_handmade_products/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent transition-all duration-300 shadow-lg"
                                        title="Instagram"
                                    >
                                        <FiInstagram size={18} />
                                    </a>
                                    <a
                                        href="https://wa.me/918943072598"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300 shadow-lg"
                                        title="WhatsApp"
                                    >
                                        <FiMessageCircle size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>


                {/* Core Philosophy Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[40px] bg-[#0f1219] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/5 blur-2xl rounded-full" />
                        <FiStar className="text-3xl text-[var(--color-primary)] mb-6" />
                        <h3 className="text-2xl font-serif text-white mb-4">Natural Beauty</h3>
                        <p className="text-gray-400 leading-relaxed font-light">
                            Our beauty range, including the signature Krishna Hair Care Oil and herbal soaps, is made using time-tested herbal ingredients. We focus on purity and effectiveness, ensuring your skin and hair receive the nourishment they deserve.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[40px] bg-[#0f1219] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--color-primary)]/5 blur-2xl rounded-full" />
                        <FiHeart className="text-3xl text-[var(--color-primary)] mb-6" />
                        <h3 className="text-2xl font-serif text-white mb-4">Homemade Purity</h3>
                        <p className="text-gray-400 leading-relaxed font-light">
                            From Sun-dried powders to authentic pickles, our food products are made in small batches to preserve their natural flavor and nutritional value. No artificial preservatives, just the pure taste of home.
                        </p>
                    </motion.div>
                </div>

                {/* Achievement Section remains as is if still relevant, but I'll skip editing it for now unless needed. 
                   Actually the user said they want to "totally change this project", 
                   but usually personal achievements might still stay if it's the same owner. 
                   However, I'll update the Collection Scope as requested. */}

                {/* Expertise Table/Grid - Updated with new products */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4 italic">Our <span className="text-[var(--color-primary)]">Offerings</span></h2>
                        <div className="h-[1px] w-20 bg-[var(--color-primary)] mx-auto opacity-40" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Krishna Hair Care Oil", desc: "Expertly blended for hair health." },
                            { title: "Herbal Soaps & Shampoo", desc: "Gentle, natural cleansing." },
                            { title: "Skin Brightening Care", desc: "Creams and oils for radiant skin." },
                            { title: "Authentic Pickles", desc: "Mango, Lemon, and Dates pickels." },
                            { title: "Traditional Powders", desc: "Sambar and Dry Prawns powder." },
                            { title: "Natural Oils", desc: "Rosemary and Virgin Coconut oil." }
                        ].map((work, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[var(--color-primary)]/20 transition-all"
                            >
                                <FiCornerDownRight className="text-[var(--color-primary)] shrink-0" />
                                <div>
                                    <h4 className="text-white font-serif text-lg leading-tight">{work.title}</h4>
                                    <p className="text-xs text-gray-500 mt-1 font-light tracking-wide">{work.desc}</p>
                                </div>
                            </motion.div>

                        ))}
                    </div>
                </div>

                {/* Closing - Perfectly aligned */}

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto border-t border-white/5 pt-16"
                >
                    <p className="text-xl font-serif text-white/80 leading-relaxed mb-10 italic">
                        "Each product is carefully prepared to bring the goodness of nature to your lifestyle. Whether you're looking for natural beauty care or authentic homemade flavors, I'm happy to serve you the best."
                    </p>

                </motion.div>
                <div className="flex flex-col items-center text-center mb-5 md:mb-20">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <img
                            src={logo2}
                            alt="AK Products"
                            className="w-80 mb-5 drop-shadow-[0_0_40px_rgba(0,161,209,0.3)]"
                        />
                        <div className="absolute inset-0 bg-[var(--color-primary)]/10 blur-3xl rounded-full scale-150 -z-10" />
                    </motion.div>
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20">
                        <FiMapPin className="text-[var(--color-primary)] text-sm" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-primary)]">Edappal, Malappuram - Kerala</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
