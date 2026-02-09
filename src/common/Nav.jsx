import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { logoutAction } from "../redux/authSlice";
import { FiLogOut, FiUserPlus, FiMenu, FiX, FiChevronDown, FiShoppingCart, FiInstagram } from "react-icons/fi";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";

// Import logo properly for production
import logo3 from "../assets/logo/main_logo.jpeg";

function Nav() {
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [menuOpen, setMenuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeAllMenus = () => {
    setMenuOpen(false);
    setProductOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    queryClient.clear()
    closeAllMenus();
    navigate("/");
  };

  const navLinks = user?.role === "admin"
    ? [
      { name: "Home", path: "/home" },
      { name: "Add Products", path: "/addProduct" },
      { name: "List Products", path: "/listProduct" },
      { name: "Orders", path: "/order" },
      { name: "Reviews", path: "/admin/reviews" },
      { name: "Offers", path: "/offer" },
      { name: "About", path: "/about" },

    ]
    : [
      { name: "Home", path: "/home" },
      { name: "Orders", path: "/myorder" },
      { name: "Offers", path: "/offer" },
      { name: "About", path: "/about" },

    ];

  const categories = [
    { name: "All Products", path: "/listProduct" },
    { name: "Nettipattam", path: "/category/Nettipattam" },
    { name: "Resin Products", path: "/category/Resin" },
    { name: "Paintings", path: "/category/Painting" },
    { name: "Craft Items", path: "/category/Craft" },
    { name: "Fabric Painting", path: "/category/FabricPainting" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 border-b ${scrolled
        ? "bg-black/80 backdrop-blur-xl border-white/10 py-3"
        : "bg-transparent border-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/home" className="flex-shrink-0" onClick={closeAllMenus}>
          <img
            src={logo3}
            alt="Logo"
            className="h-9 md:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105 drop-shadow-[0_0_8px_rgba(0,161,209,0.4)]"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-[var(--color-primary)] ${isActive(link.path) ? "text-[var(--color-primary)]" : "text-gray-400"
                }`}
            >
              {link.name}
            </Link>
          ))}

          {user?.role !== "admin" && (
            <div className="relative">
              <button
                className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors hover:text-[var(--color-primary)] ${location.pathname.startsWith("/category") || location.pathname === "/listProduct" ? "text-[var(--color-primary)]" : "text-gray-400"
                  }`}
                onClick={() => setProductOpen(!productOpen)}
              >
                Our Products <FiChevronDown className={`transition-transform duration-300 ${productOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {productOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 mt-3 w-56 bg-[#161b26] border border-white/10 rounded-2xl shadow-2xl p-2 z-[1001] overflow-hidden backdrop-blur-3xl"
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat.path}
                        to={cat.path}
                        onClick={() => setProductOpen(false)}
                        className="block px-4 py-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          {user?.role !== "admin" && (
            <Link
              to="/cart"
              className="relative p-2 text-gray-400 hover:text-[var(--color-primary)] transition-colors"
              onClick={closeAllMenus}
            >
              <FiShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-black">
                  {cartItems.length}
                </span>
              )}
            </Link>
          )}

          <a
            href="https://www.instagram.com/arts_n_crafts_by_kavya/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-[var(--color-primary)] transition-colors hidden sm:block"
            title="Follow on Instagram"
          >
            <FiInstagram size={22} />
          </a>

          <div className="hidden md:block">
            {user ? (
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-[var(--color-primary)] hover:text-white transition-all"
                title="Logout"
              >
                <FiLogOut size={18} />
              </button>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 rounded-full bg-[var(--color-primary)] text-white font-bold text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <FiUserPlus size={18} /> Sign In
              </Link>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden p-2 text-[var(--color-primary)] focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#0a0a0a] border-t border-white/5 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeAllMenus}
                  className={`text-lg font-medium ${isActive(link.path) ? "text-[var(--color-primary)]" : "text-gray-400"}`}
                >
                  {link.name}
                </Link>
              ))}

              {user?.role !== "admin" && (
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Collections</p>
                  <div className="grid grid-cols-1 gap-3">
                    {categories.map((cat) => (
                      <Link
                        key={cat.path}
                        to={cat.path}
                        onClick={closeAllMenus}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 font-medium"
                  >
                    <FiLogOut /> Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={closeAllMenus}
                    className="flex items-center gap-2 text-[var(--color-primary)] font-medium"
                  >
                    <FiUserPlus /> Sign In
                  </Link>
                )}

                <a
                  href="https://www.instagram.com/arts_n_crafts_by_kavya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[var(--color-primary)] transition-colors"
                >
                  <FiInstagram size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Nav;
