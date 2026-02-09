import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import myPic1 from "../assets/me4.jpg";
import logo2 from "../assets/logo/main_logo.jpeg";

export default function HomeAbout() {
    const navigate = useNavigate();

    return (

        <section className="bg-black py-12 md:py-20 px-4 md:px-6 relative overflow-hidden mb-8 md:mb-0">
            {/* Intro Section */}
            <div className="flex flex-col items-center text-center mb-16 md:mb-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <img
                        src={logo2}
                        alt="Kavya Arts"
                        className="w-100 mb-8 drop-shadow-[0_0_40px_rgba(0,161,209,0.3)]"
                    />
                    <div className="absolute inset-0 bg-[var(--color-primary)]/10 blur-3xl rounded-full scale-150 -z-10" />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-2xl md:text-4xl font-serif text-white/90 leading-relaxed max-w-5xl italic font-light"
                >
                    "Enchanting you since 2019. Discover the refined and exclusive collection by <span className="text-[var(--color-primary)] not-italic">Kavya Arts & Craft</span> . Here art is thoughtfully created with emotion, patience, and precision, offering rare, elegant creations that transform spaces into experiences."
                </motion.p>

                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 120 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-[1px] bg-[var(--color-primary)] mt-16 opacity-60"
                />
            </div>
            <div className="max-w-6xl mx-auto">
                <div className="relative rounded-[40px] md:rounded-[60px] overflow-hidden bg-[#0f1219] border border-white/5 shadow-2xl">
                    <div className="flex flex-col lg:flex-row items-stretch min-h-[500px] md:min-h-[600px]">
                        {/* Image Section */}
                        <div className="lg:w-1/2 relative h-[400px] lg:h-auto overflow-hidden">
                            <img
                                src={myPic1}
                                alt="Kavya R Menon"
                                className="absolute inset-0 w-full h-full object-cover object-top"
                            />
                            {/* Overlay for better text contrast on small screens */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                        </div>

                        {/* Content Section */}
                        <div className="lg:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-center relative bg-gradient-to-br from-[#0f1219] to-[#050505]">
                            <div className="relative z-10">
                                <motion.span
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-[0.4em] mb-4 block"
                                >
                                    Founder
                                </motion.span>

                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-8 tracking-tighter leading-tight"
                                >
                                    Hey, I Am <span className="italic">Kavya R Menon</span>
                                </motion.h2>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed font-light mb-12"
                                >
                                    <p>
                                        Founder and creative force behind <span className="text-white font-medium italic">Arts & Crafts By Kavya</span>. As a passionate multitasker, I wear many hats—from software developer to artist—to bring you handcrafted pieces that are created with love, creativity, and an eye for detail.
                                    </p>
                                </motion.div>

                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    onClick={() => navigate("/about")}
                                    className="group flex items-center gap-4 px-8 py-4 rounded-full bg-[var(--color-primary)] text-white text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[var(--color-primary)]/20"
                                >
                                    More Detail
                                    <div className="w-6 h-[1px] bg-white group-hover:w-10 transition-all duration-300" />
                                </motion.button>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/5 blur-[100px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[100px] pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
