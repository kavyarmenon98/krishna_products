import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changeOrderStatusAPI,
  getAdminOrderListAPI,
} from "../services/service";
import { useState } from "react";
import { FiSettings, FiPackage, FiClock, FiCheckCircle, FiTruck, FiXCircle, FiFilter } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function OrdersList() {
  const queryClient = useQueryClient();
  const [activeOrder, setActiveOrder] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getAdminOrderListAPI,
  });

  const changeOrderStatusMutation = useMutation({
    mutationFn: changeOrderStatusAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const handleStatusChange = async (orderId, status) => {
    await changeOrderStatusMutation.mutateAsync({
      id: orderId,
      status,
    });
    setActiveOrder(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[var(--color-primary)]/20 border-t-[var(--color-primary)] rounded-full animate-spin" />
          <p className="text-gray-500 font-serif italic tracking-widest">Gathering Orders...</p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-serif text-white mb-3 tracking-tight">Order Management</h1>
            <p className="text-gray-500 font-medium">Tracking the journey of every masterpiece.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white/5 border border-white/5 rounded-full text-xs font-bold text-gray-400 hover:text-white transition-all flex items-center gap-2">
              <FiFilter /> All Orders
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {data?.orders?.map((order, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={order._id}
              className="bg-[#0f1219] border border-white/5 rounded-[32px] overflow-hidden hover:border-white/10 transition-all duration-300 shadow-2xl"
            >
              <div className="p-8">
                {/* Status & Settings */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex flex-col gap-1">
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <p className="text-sm font-mono text-gray-500 mt-2">#{order.orderId}</p>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => setActiveOrder(activeOrder === order._id ? null : order._id)}
                      disabled={changeOrderStatusMutation.isPending && activeOrder === order._id}
                      className={`p-3 rounded-full transition-all ${activeOrder === order._id ? "bg-[var(--color-primary)] text-black" : "bg-white/5 text-gray-400 hover:text-white"} disabled:opacity-50`}
                    >
                      {changeOrderStatusMutation.isPending && activeOrder === order._id ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <FiSettings size={20} />
                      )}
                    </button>

                    <AnimatePresence>
                      {activeOrder === order._id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          className="absolute right-0 mt-3 w-56 bg-[#161b26] border border-white/10 rounded-2xl shadow-2xl z-20 overflow-hidden backdrop-blur-3xl"
                        >
                          <div className="p-2 space-y-1">
                            {["Processing", "Shipped", "In Transit", "Delivered", "Cancelled"].map((status) => (
                              <button
                                key={status}
                                onClick={() => handleStatusChange(order._id, status)}
                                className="w-full text-left px-4 py-3 text-xs font-bold text-gray-400 hover:bg-[var(--color-primary)] hover:text-black rounded-xl transition-all uppercase tracking-widest"
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 pt-8 border-t border-white/5">
                  {order.items.map((item) => (
                    <div key={item._id} className="flex gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <img src={item.image} className="w-16 h-20 object-cover rounded-lg shrink-0" alt="" />
                      <div className="min-w-0">
                        <h4 className="text-white font-semibold text-sm truncate mb-1">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.quantity} Unit · ₹{item.price}</p>
                        <p className="text-[10px] text-[var(--color-primary)] font-bold mt-2">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Info Footer */}
                <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-6 pt-6 border-t border-white/5">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Ordered On</p>
                      <p className="text-sm text-gray-300 font-medium">{new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Customer</p>
                      <p className="text-sm text-gray-300 font-medium">{order.userId?.name || "Guest"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Contact</p>
                      <p className="text-sm text-[var(--color-primary)] font-bold">{order.phonenumber || order.userId?.phonenumber || "N/A"}</p>
                    </div>
                    <div className="max-w-[200px]">
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Address</p>
                      <p className="text-[10px] text-gray-400 font-medium leading-relaxed italic">{order.userId?.address || "N/A"}</p>
                    </div>
                  </div>


                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Total Revenue</p>
                    <p className="text-3xl font-serif font-black text-white tracking-tighter">₹{order.totalAmount}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!data?.orders?.length && (
          <div className="h-96 flex flex-col items-center justify-center text-center opacity-30">
            <FiPackage size={60} className="mb-4" />
            <h3 className="text-2xl font-serif">The logbook is empty.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
