import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ShopByCategory({
  title,
  imageUrl,
  link,
}) {
  const navigate = useNavigate();

  const onNavigate = () => {
    if (link) navigate("/category/" + link);
  };

  const frontImage = imageUrl?.[0] || '';
  const backImage = imageUrl?.[1] || frontImage;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      onClick={onNavigate}
      className="group perspective-1000 relative h-[400px] w-full cursor-pointer rounded-3xl overflow-hidden"
    >
      <div className="relative h-full w-full transition-all duration-700 preserve-3d group-hover:rotate-y-180">
        {/* FRONT */}
        <div className="absolute inset-0 backface-hidden">
          <img
            src={frontImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute bottom-10 left-0 w-full text-center px-6">
            <h3 className="text-3xl font-serif text-white tracking-widest uppercase mb-1">{title}</h3>
            <div className="h-0.5 w-12 bg-[var(--color-primary)] mx-auto rounded-full" />
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0f1219]">
          <img
            src={backImage}
            alt={title}
            className="h-full w-full object-cover opacity-30 blur-[2px]"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <h3 className="text-2xl font-serif text-[var(--color-primary)] tracking-widest uppercase mb-4">{title}</h3>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">Explore the full collection</p>
            <div className="px-6 py-2 rounded-full border border-[var(--color-primary)] text-[var(--color-primary)] text-[10px] font-black tracking-[0.3em] uppercase group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
              Enter Gallery
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
