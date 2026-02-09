import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ProductImageGallery from "../common/ProductImageGallery";

// Import all images properly for production
import logo2 from "../assets/logo2.png";
import image2 from "../assets/image2.jpg";
import image4 from "../assets/image4.jpg";
import image13 from "../assets/image13.png";
import image7 from "../assets/image7.jpg";
import image5 from "../assets/image5.jpg";
import image9 from "../assets/image9.jpg";
import image19 from "../assets/image19.jpg";
import image11 from "../assets/image11.webp";
import image10 from "../assets/image10.jpg";
import nettipattam3 from "../assets/nettipattam3.jpg";
import nettippatam4 from "../assets/nettippatam5.jpg";

function HomePage2() {
  const navigate = useNavigate();

  const data = [
    {
      title: "Kerala Mural Paintings",
      subtitle: "A Timeless Heritage",
      description: "Step into a world of celestial beauty with Kerala's iconic mural art. Rooted in the 7th century, these masterpieces capture the essence of temple antiquity through vibrant hues and intricate detailing. Heavily influenced by Pallava aesthetics and perfected over generations, each stroke tells a legendary story of divinity and grace, bringing a sacred elegance to any space.",
      image: [image2, image4, image13],
      category: "Painting"
    },
    {
      title: "Traditional Nettipattam",
      subtitle: "The Golden Elephant Caparison",
      description: "Embrace the symbol of prosperity and grand heritage with the Traditional Nettipattam. Meticulously crafted from copper and gold-plated spheres, this 'elephants' forehead ornament' is a testament to Kerala's regal festivities. Whether as a housewarming gift or a statement piece for your living room, it brings the grandeur of the temple festivals right into your modern home.",
      image: [image5, nettipattam3],
      category: "Nettipattam"
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
        {/* Featured Stories - Side by Side Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 md:mt-16">
          {data.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="relative rounded-[32px] overflow-hidden bg-[#0f1219] border border-white/5 group flex flex-col h-full shadow-lg"
            >
              {/* Image side - Optimized for Artworks */}
              <div className="w-full h-[420px] md:h-[520px] overflow-hidden relative bg-neutral-900/40 p-4">
                <ProductImageGallery
                  images={item.image}
                  category={item.category}
                  styleForImage={{ borderRadius: '16px' }}
                />

                {/* Floating Label */}
                <div className="absolute top-6 left-6 z-30">
                  <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[var(--color-primary)] text-[10px] uppercase tracking-widest font-bold shadow-xl">
                    Featured Collection
                  </span>
                </div>
              </div>

              {/* Content side - Enhanced typography and spacing */}
              <div className="p-6 md:p-10 flex flex-col flex-1">
                <span className="text-[var(--color-primary)] font-bold text-[10px] uppercase tracking-[0.4em] mb-3 block">
                  {item.subtitle}
                </span>
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 tracking-tight leading-tight group-hover:text-[var(--color-primary)] transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light mb-8 border-l-2 border-[var(--color-primary)]/20 pl-6 italic opacity-80 flex-1 line-clamp-5">
                  {item.description}
                </p>

                <div className="mt-auto">
                  <motion.button
                    onClick={() => navigate("/listProduct")}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-5 text-white hover:text-[var(--color-primary)] transition-all group/btn"
                  >
                    <span className="text-[11px] font-black uppercase tracking-[0.3em]">Explore Full Collection</span>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 group-hover/btn:border-[var(--color-primary)] group-hover/btn:bg-[var(--color-primary)] group-hover/btn:text-black transition-all shadow-lg">
                      <FiArrowRight className="text-lg" />
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
