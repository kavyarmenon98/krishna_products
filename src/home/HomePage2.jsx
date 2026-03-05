import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ProductImageGallery from "../common/ProductImageGallery";

// Import existing images properly for production
import cosmeticImg from "../assets/category/cosmetic.png";
import gemini1 from "../assets/gemini1.png";
import gemini2 from "../assets/gemini2.png";
import prod1 from "../assets/WhatsApp Image 2026-02-09 at 9.33.39 PM.jpeg";
import prod2 from "../assets/WhatsApp Image 2026-02-09 at 9.33.41 PM.jpeg";

function HomePage2() {
  const navigate = useNavigate();

  const data = [
    {
      title: "Handmade Cosmetics",
      subtitle: "Pure & Natural Beauty",
      description: "Nourish your skin and hair with our range of handmade beauty products. From our signature Krishna hair care oil and herbal shampoos to skin-brightening creams and herbal soaps, every product is crafted with love and natural ingredients to bring out your natural glow without harsh chemicals.",
      image: [gemini2],
      category: "Cosmetics"
    },
    {
      title: "Authentic Food Products",
      subtitle: "The Taste of Tradition",
      description: "Experience the authentic flavors of homemade delicacies. Our collection includes premium mango, lemon, and dates pickles, along with traditional sambar powder and specialized dry prawns powder. Prepared with traditional recipes and the finest ingredients, we bring the warmth of home-cooked taste to your table.",
      image: [gemini1],
      category: "Food"
    },
  ];

  return (
    <section className="bg-black py-12 md:py-20 px-4 md:px-6 relative overflow-hidden mb-8 md:mb-0">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--color-primary)]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[var(--color-primary)]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-[0.5em] mb-4 block"
          >
            Our Specialties
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-serif text-white tracking-tight"
          >
            Handcrafted <span className="italic">Excellence</span>
          </motion.h2>
        </div>

        {/* Featured Stories - Side by Side Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {data.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="relative rounded-[48px] overflow-hidden bg-gradient-to-b from-[#0f1219] to-[#0a0c10] border border-white/5 group flex flex-col h-full hover:border-[var(--color-primary)]/20 transition-all duration-500 shadow-2xl"
            >
              {/* Image side - Optimized for Gallery */}
              <div className="w-full h-[350px] md:h-[480px] overflow-hidden relative p-4">
                <div className="w-full h-full rounded-[32px] overflow-hidden">
                  <ProductImageGallery
                    images={item.image}
                    category={item.category}
                    styleForImage={{ borderRadius: '0px', objectPosition: 'top' }}
                  />
                </div>

                {/* Floating Label */}
                <div className="absolute top-8 left-8 z-30">
                  <span className="px-5 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-[var(--color-primary)] text-[10px] uppercase tracking-widest font-black shadow-2xl">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content side */}
              <div className="p-8 md:p-12 flex flex-col flex-1">
                <span className="text-[var(--color-primary)] font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block opacity-60">
                  {item.subtitle}
                </span>
                <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 tracking-tight leading-tight group-hover:text-[var(--color-primary)] transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-lg leading-relaxed font-light mb-10 border-l border-[var(--color-primary)]/30 pl-6 italic opacity-70 flex-1">
                  {item.description}
                </p>

                <div className="mt-auto">
                  <motion.button
                    onClick={() => navigate("/listProduct")}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-6 text-white group/btn"
                  >
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] group-hover/btn:text-[var(--color-primary)] transition-colors">Explore Collection</span>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 group-hover/btn:border-[var(--color-primary)] group-hover/btn:bg-[var(--color-primary)] group-hover/btn:text-black transition-all shadow-xl">
                      <FiArrowRight className="text-xl" />
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomePage2;
