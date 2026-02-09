import ShopByCategory from "../product/ShopByCategory";
import { motion } from "framer-motion";

// Import category images properly for production
import resin1 from "../assets/category/resin1.jpg";
import resin2 from "../assets/category/resin2.jpg";
import mural1 from "../assets/category/mural1.jpg";
import image14 from "../assets/image14.jpg";
import image8 from "../assets/image8.webp";
import image9 from "../assets/image9.jpg";
import craft2 from "../assets/category/craft2.jpg";
import craft1 from "../assets/category/craft1.jpg";

function HomePage3() {
  const categories = [
    {
      title: "Resin Product",
      imageUrl: [resin1, resin2],
      link: "Resin",
    },
    {
      title: "Mural Paintings",
      imageUrl: [mural1, image14],
      link: "Painting",
    },
    {
      title: "Nettipattam",
      imageUrl: [image8, image9],
      link: "Nettipattam",
    },
    {
      title: "Craft Works",
      imageUrl: [craft2, craft1],
      link: "Craft",
    },
  ];

  return (
    <section className="bg-black py-12 md:py-20 px-4 md:px-6 mb-8 md:mb-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12 md:mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-[0.4em] mb-4"
          >
            Curated Collections
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-6xl font-serif text-white tracking-tight"
          >
            Shop by <span className="italic">Category</span>
          </motion.h2>
          <div className="h-1 w-20 bg-[var(--color-primary)] mt-6 md:mt-8 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((c, idx) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <ShopByCategory
                title={c.title}
                imageUrl={c.imageUrl}
                link={c.link}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomePage3;
