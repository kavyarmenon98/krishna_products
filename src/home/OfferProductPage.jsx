import { useQuery } from "@tanstack/react-query";
import { getAllProductAPI } from "../services/service";
import PageLoader from "../common/PageLoader";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiTag, FiArrowRight } from "react-icons/fi";

export default function OfferProductPage() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProductAPI,
  });

  if (isLoading) return <PageLoader />;

  const offerProducts =
    data?.readproduct?.filter((product) => product.discountPercentage > 25) || [];

  if (offerProducts.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505] pt-32 px-6 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-500">
          <FiTag size={40} />
        </div>
        <h3 className="text-2xl font-serif text-white mb-2">No active offers right now</h3>
        <p className="text-gray-500 max-w-xs">Check back later for exclusive deals on our handcrafted collections.</p>
        <button
          onClick={() => navigate("/listProduct")}
          className="mt-8 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all font-medium"
        >
          View All Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-[0.3em] mb-4">Limited Time Deals</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">🔥 Hot Offers</h2>
          <div className="h-1 w-20 bg-[var(--color-primary)] mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {offerProducts.map((product, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={product._id}
              className="group relative bg-[#0f1219]/80 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden hover:border-[var(--color-primary)]/30 transition-all duration-500 cursor-pointer shadow-2xl"
              onClick={() => navigate(`/viewProduct/${product._id}`)}
            >
              {/* Image */}
              <div className="aspect-[4/5] sm:aspect-[3/4] overflow-hidden relative">
                <img
                  src={product.images?.[0] || product.image}
                  alt={product.pname}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              </div>

              {/* Discount Badge */}
              <div className="absolute top-6 left-6 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-xl">
                Save {product.discountPercentage}%
              </div>

              {/* Details */}
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">{product.pname}</h3>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-2xl font-bold text-[var(--color-primary)]">₹{product.discount}</span>
                  <span className="text-gray-500 line-through text-sm">₹{product.price}</span>
                </div>

                <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500">
                  View Detail <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
