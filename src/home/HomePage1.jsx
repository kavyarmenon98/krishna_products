import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Import images properly for production
import gemini2 from "../assets/gemini2.png";
import gemini1 from "../assets/gemini1.png";

function HomePage1() {
  const navigate = useNavigate();
  const images = [gemini2, gemini1];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade: true,
    dotsClass: "slick-dots custom-dots-pos",
    customPaging: (i) => (
      <div className="w-3 h-3 bg-white/20 rounded-full hover:bg-[var(--color-primary)] transition-all" />
    ),
  };

  return (
    <section className="relative w-full h-[100dvh]  overflow-hidden bg-black">
      <Slider {...settings} className="h-full">
        {images.map((src, index) => (
          <div key={index} className="relative h-[100dvh] w-full outline-none">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5, ease: "linear" }}
              className="absolute inset-0"
            >
              <img
                src={src}
                alt={`Hero ${index + 1}`}
                className="w-full h-full object-cover opacity-70"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                onClick={() => navigate("/listProduct")}
                className="group relative px-12 py-5 bg-transparent overflow-hidden rounded-full border border-[var(--color-primary)]/50 transition-all hover:border-[var(--color-primary)] mt-12"
              >
                <div className="absolute inset-0 bg-[var(--color-primary)] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 text-white group-hover:text-black font-black uppercase tracking-[0.3em] text-sm">
                  Explore Gallery
                </span>
              </motion.button>
            </div>
          </div>
        ))}
      </Slider>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-primary)] to-transparent" />
      </motion.div>
    </section>
  );
}

export default HomePage1;