import { useNavigate, useLocation } from "react-router-dom";
import { FiHome, FiShoppingBag, FiShoppingCart, FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileFooter() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cart } = useSelector((state) => state.cart || { cart: [] });

    const cartCount = Array.isArray(cart) ? cart.length : 0;

    const navItems = [
        { label: "Home", icon: <FiHome size={20} />, path: "/" },
        { label: "Products", icon: <FiShoppingBag size={20} />, path: "/listProduct" },
        { label: "Cart", icon: <FiShoppingCart size={20} />, path: "/cart", count: cartCount },
        { label: "About", icon: <FiUser size={20} />, path: "/about" },
    ];

    const isActive = (path) => {
        if (path === "/" && location.pathname === "/") return true;
        if (path !== "/" && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[9999] bg-black/40 backdrop-blur-2xl border-t border-white/5 px-4 pb-6 pt-3 safe-area-bottom">
            <div className="flex justify-around items-center max-w-md mx-auto">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        className={`flex flex-col items-center gap-1.5 transition-all duration-500 relative flex-1 ${isActive(item.path) ? "text-[var(--color-primary)]" : "text-gray-500"
                            }`}
                    >
                        <div className="relative">
                            <motion.div
                                animate={{
                                    scale: isActive(item.path) ? 1.1 : 1,
                                    opacity: isActive(item.path) ? 1 : 0.7
                                }}
                            >
                                {item.icon}
                            </motion.div>
                            {item.label === "Cart" && cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-widest transition-all duration-500 ${isActive(item.path) ? "opacity-100 scale-100" : "opacity-40 scale-90"
                            }`}>
                            {item.label}
                        </span>

                        {isActive(item.path) && (
                            <motion.div
                                layoutId="activeTabGlow"
                                className="absolute -bottom-1 w-12 h-1 bg-[var(--color-primary)]/20 blur-sm rounded-full"
                            />
                        )}
                    </button>
                ))}
            </div>

            <style jsx="true">{`
                .safe-area-bottom {
                    padding-bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
                }
            `}</style>
        </div>
    );
}
