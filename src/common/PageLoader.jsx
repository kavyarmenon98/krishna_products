import { motion } from "framer-motion";
import loaderIcon from "../assets/logo/icon_black2.png";

const PageLoader = () => (
  <div className="fixed inset-0 bg-black z-[20000] flex flex-col items-center justify-center">
    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="relative w-28 h-28 mb-8 flex items-center justify-center"
    >
      <img
        src={loaderIcon}
        alt="Loading..."
        className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(0,161,209,0.4)]"
      />
    </motion.div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 0.5 }}
      className="relative text-white text-[10px] font-bold uppercase tracking-[0.6em] animate-pulse"
    >
      Arts & Crafts By Kavya
    </motion.p>
  </div>
);

export default PageLoader;

