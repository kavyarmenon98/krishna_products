import { motion } from "framer-motion";
import { FiMapPin, FiAward, FiStar, FiHeart, FiCode, FiCornerDownRight, FiInstagram, FiMessageCircle, FiEdit3, FiFacebook } from "react-icons/fi";

// Import profile image properly for production
import myPic1 from "../assets/myPic1.jpg";
// Import India Book of Records images
import me1 from "../assets/me1.jpg";
import me2 from "../assets/me3.jpg";
import logo2 from "../assets/logo/main_logo.jpeg";

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
                                alt="Kavya R Menon"
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
                            The Artist Behind The Craft
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif mb-8 tracking-tighter leading-tight">
                            Hi, I'm <span className="font-bold italic text-[var(--color-primary)]">Kavya R Menon</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-light leading-relaxed mb-8 italic">
                            "A software developer by profession and an artist by passion."
                        </p>
                        <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                            <p>
                                Proudly from Edappal, Malappuram district, Kerala, I have always held art close to my heart, while technology remains my strength.
                            </p>
                            <p>
                                Through this platform, I bring both worlds together—combining my creative passion with my professional expertise to build an e-commerce space where art meets innovation.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-6">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
                                    <FiCode /> Software Developer
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
                                    <FiHeart /> Artist
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
                        </div>
                    </motion.div>
                </div>


                {/* Core Philosophy Section - Merged Journey info here */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[40px] bg-[#0f1219] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/5 blur-2xl rounded-full" />
                        <FiStar className="text-3xl text-[var(--color-primary)] mb-6" />
                        <h3 className="text-2xl font-serif text-white mb-4">The Artisanal Edge</h3>
                        <p className="text-gray-400 leading-relaxed font-light">
                            Every creation is handcrafted with extreme patience. I specialize in bespoke artworks, thoughtfully tailored to your unique story and space requirements. No two pieces are ever identical, ensuring your art is truly yours.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[40px] bg-[#0f1219] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--color-primary)]/5 blur-2xl rounded-full" />
                        <FiAward className="text-3xl text-[var(--color-primary)] mb-6" />
                        <h3 className="text-2xl font-serif text-white mb-4">Heritage & Modernity</h3>
                        <p className="text-gray-400 leading-relaxed font-light">
                            Whether it's the traditional Kerala Mural Painting or contemporary Resin Art, I strive to bring the sacred elegance of our heritage into modern homes.
                        </p>
                    </motion.div>
                </div>

                {/* India Book of Records Achievement - Compact & Clean Design */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <FiAward className="text-4xl text-[var(--color-primary)]" />
                            <span className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-[0.6em]">Achievement</span>
                        </div>
                        <h2 className="text-3xl md:text-6xl font-serif text-white mb-4 tracking-tight">
                            India Book of <span className="italic text-[var(--color-primary)]">Records</span>
                        </h2>
                        <div className="h-1 w-24 bg-[var(--color-primary)] mx-auto rounded-full" />
                    </div>

                    {/* Content Card */}
                    <div className="bg-gradient-to-br from-[#0f1219] to-black border border-[var(--color-primary)]/20 rounded-[40px] p-8 md:p-12 shadow-2xl">
                        <div className="flex flex-col lg:flex-row gap-8 items-start">

                            {/* Left Side - Certificate Image (Larger, More Focused) */}
                            <div className="w-full lg:w-1/2">
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    className="relative rounded-3xl overflow-hidden border-2 border-[var(--color-primary)]/30 shadow-2xl group"
                                >
                                    <img
                                        src={me2}
                                        alt="India Book of Records Certificate - Kavya R Menon"
                                        className="w-full h-[405px] md:h-[450px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />


                                </motion.div>
                            </div>

                            {/* Right Side - Info & Small Drawing */}
                            <div className="w-full lg:w-1/2 space-y-6">
                                {/* Title */}
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 leading-tight">
                                        <span className="text-[var(--color-primary)] font-bold">10 Cricket Players</span> Portraits in <span className="text-[var(--color-primary)] font-bold">12 Hours</span>
                                    </h3>
                                    <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                                        Achieved a remarkable feat by creating detailed <span className="text-white font-semibold">pencil drawings</span> of 10 cricket players' portraits within just 12 hours, earning official recognition in the <span className="text-[var(--color-primary)] font-semibold">India Book of Records</span>.
                                    </p>
                                </div>

                                {/* Drawing Thumbnail - Smaller */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="relative rounded-2xl overflow-hidden border border-white/10 shadow-lg group cursor-pointer"
                                >
                                    <img
                                        src={me1}
                                        alt="Cricket Players Pencil Drawings"
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                </motion.div>

                                {/* Stats Grid - Compact */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-center hover:border-[var(--color-primary)]/30 transition-all">
                                        <div className="text-3xl font-black text-[var(--color-primary)] mb-1">10</div>
                                        <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Portraits</div>
                                    </div>
                                    <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-center hover:border-[var(--color-primary)]/30 transition-all">
                                        <div className="text-3xl font-black text-[var(--color-primary)] mb-1">12</div>
                                        <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Hours</div>
                                    </div>
                                    <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-center hover:border-[var(--color-primary)]/30 transition-all">
                                        <div className="flex items-center justify-center h-8 mb-1">
                                            <FiEdit3 className="text-2xl text-[var(--color-primary)]" />
                                        </div>
                                        <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Pencil</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Expertise Table/Grid - More compact */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4 italic">The <span className="text-[var(--color-primary)]">Collection</span> Scope</h2>
                        <div className="h-[1px] w-20 bg-[var(--color-primary)] mx-auto opacity-40" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Nettipattam", desc: "Golden elephant caparisons." },
                            { title: "Mural Paintings", desc: "Vibrant traditional temple art." },
                            { title: "Resin Art", desc: "Jewellery & keepsake preservation." },
                            { title: "Fusion Art", desc: "Blending Mural & Nettipattam styles." },
                            { title: "Fabric Painting", desc: "Custom art on sarees & wearables." },
                            { title: "Home Décor", desc: "Dream catchers & 3D moon art." }
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
                        "Each piece is carefully handcrafted to tell a story. Whether you're looking for a meaningful gift, a traditional art form, or a personalized creation, I'm happy to bring your ideas to life."
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
                        alt="Kavya Arts"
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
