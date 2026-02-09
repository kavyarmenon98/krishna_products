import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Import images properly for production
import gemini2 from "../assets/gemini2.png";
import gemini3 from "../assets/gemini3.png";
import gemini4 from "../assets/gemini4.png";

function HomePage1() {
  const navigate = useNavigate();
  const images = [gemini2, gemini3, gemini4];

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
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <Slider {...settings} className="h-full">
        {images.map((src, index) => (
          <div key={index} className="relative h-screen w-full">
            <img
              src={src}
              alt={`Exquisite Art ${index + 1}`}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-[0.5em] mb-6"
              >
                Since 2019
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-4xl md:text-8xl font-serif text-white tracking-tighter mb-6 max-w-5xl"
              >
                Color your world with <span className="italic">handmade magic</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-white/60 text-lg md:text-xl font-medium tracking-wide mb-10 max-w-2xl"
              >
                Personalized art pieces crafted to reflect your story and style.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
                onClick={() => navigate("/listProduct")}
                className="px-10 py-4 bg-[var(--color-primary)] text-black font-black uppercase tracking-[0.2em] rounded-full shadow-2xl shadow-[var(--color-primary)]/20 hover:opacity-90 transition-all active:scale-95"
              >
                Explore Gallery
              </motion.button>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default HomePage1;