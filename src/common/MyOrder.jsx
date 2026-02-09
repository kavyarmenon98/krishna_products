import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyOrderAPI, getUserInfoAPI, updateUserInfoAPI } from "../services/service";
import { FiBox, FiCalendar, FiMapPin, FiEdit2, FiX, FiCheck, FiArrowRight, FiStar } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import PageLoader from "./PageLoader";
import ReviewModal from "./ReviewModal";

// Address Modal Component
function EditAddressModal({ isOpen, onClose, currentAddress, onSave, isLoading }) {
  const [address, setAddress] = useState(currentAddress);

  useEffect(() => {
    setAddress(currentAddress);
  }, [currentAddress]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#161b26] border border-white/10 w-full max-w-lg p-10 rounded-[40px] shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-serif text-white">Update Location</h3>
            <p className="text-gray-500 text-sm mt-1">Where should we deliver your artworks?</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors">
            <FiX size={24} />
          </button>
        </div>

        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your full shipping address..."
          className="w-full h-40 bg-black/40 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-[var(--color-primary)] transition-all resize-none mb-8 leading-relaxed font-medium"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl text-gray-500 font-bold hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(address)}
            disabled={isLoading || !address.trim()}
            className="px-8 py-3 rounded-xl bg-[var(--color-primary)] text-black font-black tracking-widest hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2 shadow-xl shadow-[var(--color-primary)]/10"
          >
            {isLoading ? "UPDATING..." : "SAVE ADDRESS"}
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

export default function MyOrders() {
  const queryClient = useQueryClient();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedReviewItem, setSelectedReviewItem] = useState(null);

  // 1. Fetch Orders
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrderAPI,
  });

  // 2. Fetch User Profile (for Address)
  const { data: userData } = useQuery({
    queryKey: ["userBox"],
    queryFn: getUserInfoAPI,
  });

  // 3. Update Address Mutation
  const updateAddressMutation = useMutation({
    mutationFn: updateUserInfoAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["userBox"]);
      setIsAddressModalOpen(false);
    }
  });

  const handleSaveAddress = (newAddress) => {
    updateAddressMutation.mutate(newAddress);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "Shipped": return "text-indigo-400 bg-indigo-400/10 border-indigo-400/20";
      case "In Transit": return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "Delivered": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "Cancelled": return "text-red-400 bg-red-400/10 border-red-400/20";
      default: return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <PageLoader />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <div className="md:col-span-2">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl font-serif text-white tracking-tight mb-4"
            >
              Your Collection Journey
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg font-medium"
            >
              Tracking the arrival of your handcrafted treasures.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0f1219] border border-white/5 rounded-3xl p-6 relative group border-l-4 border-l-[var(--color-primary)]"
          >
            <div className="flex items-center gap-3 mb-4 text-[var(--color-primary)]">
              <FiMapPin size={20} />
              <h3 className="font-black text-xs uppercase tracking-widest">Shipping Destination</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed italic line-clamp-2 pr-8">
              {userData?.user?.address || "Please set a shipping destination."}
            </p>
            {/* <button
              onClick={() => setIsAddressModalOpen(true)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-gray-400 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-all"
            >
              <FiEdit2 size={16} />
            </button> */}
          </motion.div>
        </div>

        {/* Orders List */}
        {!data?.orders?.length ? (
          <div className="py-32 flex flex-col items-center justify-center text-center opacity-20">
            <FiBox size={80} className="mb-6" />
            <h3 className="text-2xl font-serif italic">Your journal of acquisitions is currently empty.</h3>
          </div>
        ) : (
          <div className="space-y-8">
            {data.orders.map((order, idx) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0f1219] border border-white/5 rounded-[40px] overflow-hidden group hover:border-white/10 transition-all shadow-2xl"
              >
                {/* Order Meta */}
                <div className="px-10 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl font-serif text-white tracking-widest font-black uppercase">#{order.orderId}</span>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-widest">
                      <FiCalendar /> {new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Total Valuation</p>
                    <p className="text-4xl font-serif font-black text-[var(--color-primary)] tracking-tighter">₹{order.totalAmount}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="px-10 py-10 space-y-8">
                  {order.items.map((item) => (
                    <div key={item._id} className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                      <div className="w-24 h-32 rounded-2xl overflow-hidden border border-white/5 bg-black shrink-0 relative group">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="text-2xl font-serif text-white mb-2 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                            {item.name}
                          </h3>
                          {order.status === "Delivered" && (
                            <button
                              onClick={() => setSelectedReviewItem(item)}
                              className="flex items-center gap-2 text-[10px] font-black text-[var(--color-primary)] uppercase tracking-widest bg-[var(--color-primary)]/10 px-4 py-2 rounded-xl hover:bg-[var(--color-primary)] hover:text-black transition-all"
                            >
                              <FiStar /> Rate Item
                            </button>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                          <span>Quantity {item.quantity}</span>
                          <span className="w-1 h-1 bg-gray-800 rounded-full" />
                          <span>₹{item.price} Unit Price</span>
                        </div>
                      </div>

                      <div className="text-xl font-serif font-medium text-white sm:text-right">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Track Footer */}
                <div className="px-10 py-6 bg-white/[0.02] flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 group-hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center gap-3 text-xs font-bold text-gray-500 uppercase tracking-widest overflow-hidden max-w-full">
                    <span className="shrink-0 text-[10px] text-gray-600 uppercase tracking-[0.3em]">Transaction ID</span>
                    <span className="font-mono text-gray-400 truncate">{order.paymentId || "Hand-Processed"}</span>
                  </div>

                  <button className="flex items-center gap-2 text-[10px] font-black text-[var(--color-primary)] uppercase tracking-[0.2em] group/btn">
                    Journal Detail <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          <EditAddressModal
            isOpen={isAddressModalOpen}
            onClose={() => setIsAddressModalOpen(false)}
            onSave={handleSaveAddress}
            currentAddress={userData?.user?.address || ""}
            isLoading={updateAddressMutation.isPending}
          />
        </AnimatePresence>

        <ReviewModal
          isOpen={!!selectedReviewItem}
          onClose={() => setSelectedReviewItem(null)}
          preFilledData={selectedReviewItem}
        />
      </div>
    </div>
  );
}
