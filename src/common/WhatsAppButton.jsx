import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppButton = ({
  phone = "919037009645", // countrycode + number
  message = "Hello, I’m interested in your products.",
  showOnMobileOnly = false,
  position = "right", // "right" | "left"
  themeColor = "#25D366",
}) => {
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  const handleClick = () => {
    if (window.gtag) {
      window.gtag("event", "whatsapp_click", {
        event_category: "engagement",
        event_label: "WhatsApp Floating Button",
      });
    }
  };

  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed z-[9999] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:shadow-green-500/20 group bottom-24 md:bottom-8 ${position === "right" ? "right-5 md:right-8" : "left-5 md:left-8"
        } ${showOnMobileOnly ? "hidden md:hidden lg:hidden flex" : "flex"}`}
      style={{ backgroundColor: themeColor }}
      onClick={handleClick}
    >
      <AnimatePresence>
        <motion.span
          initial={{ opacity: 0, x: position === 'right' ? 10 : -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className={`absolute ${position === 'right' ? 'right-full mr-4' : 'left-full ml-4'} px-3 py-1.5 bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg pointer-events-none whitespace-nowrap border border-white/10 opacity-0 group-hover:opacity-100 transition-all`}
        >
          Chat with us
        </motion.span>
      </AnimatePresence>

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="w-7 h-7"
      />
    </motion.a>
  );
};

export default WhatsAppButton;
