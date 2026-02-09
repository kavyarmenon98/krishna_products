import { createPortal } from "react-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCartAPI,
  updateCartQtyAPI,
  clearCartAPI,
  createOrderAPI,
  verifyPaymentAPI,
  deleteCartItemAPI,
  getUserInfoAPI,
  updateUserInfoAPI,
} from "../services/service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiShoppingBag, FiMapPin, FiTruck, FiArrowRight, FiTrash2, FiShield, FiPackage, FiCheck } from "react-icons/fi";
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";

/* ---------- Full Screen Processing Loader ---------- */
const FullScreenLoader = ({ message }) => (
  createPortal(
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505]/95 backdrop-blur-xl">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-white/10 border-t-[var(--color-primary)] rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <FiShoppingBag className="text-white text-2xl animate-pulse" />
        </div>
      </div>
      <h2 className="mt-8 text-2xl font-serif text-white tracking-wide animate-pulse">{message}</h2>
      <p className="mt-2 text-gray-500 text-sm tracking-widest uppercase">Please do not close this window</p>
    </div>,
    document.body
  )
);

/* ---------- Skeleton Loader ---------- */
function CartSkeleton() {
  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="h-12 w-64 bg-white/5 rounded-2xl animate-pulse" />
          {[1, 2].map((i) => (
            <div key={i} className="h-48 w-full bg-white/5 rounded-3xl animate-pulse" />
          ))}
        </div>
        <div className="h-[500px] w-full bg-white/5 rounded-[40px] animate-pulse" />
      </div>
    </div>
  );
}

/* ---------- Address Modal ---------- */
function AddressModal({ isOpen, onClose, onSave, input, setInput, isLoading }) {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-lg bg-[#12141c] border border-white/10 rounded-[30px] p-8 md:p-10 shadow-2xl relative overflow-hidden"
      >
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/10 blur-[50px] pointer-events-none" />

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[var(--color-primary)]">
            <FiMapPin size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-serif text-white">Delivery Address</h3>
            <p className="text-gray-500 text-sm">Where should we create magic?</p>
          </div>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your full shipping address (House No, Street, City, Pincode)..."
          rows={5}
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white placeholder-gray-600 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all resize-none text-base leading-relaxed"
        />

        <div className="flex gap-4 mt-8">
          <button
            className="flex-1 py-4 px-6 rounded-2xl border border-white/10 text-gray-400 font-medium hover:text-white hover:bg-white/5 transition-all active:scale-[0.98]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-purple-600 text-white font-bold tracking-wide hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-purple-900/20"
            disabled={isLoading}
            onClick={() => onSave(input)}
          >
            {isLoading ? "Saving..." : "Save Address"}
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}


export default function CartPage() {
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [loadingItemId, setLoadingItemId] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInput, setModalInput] = useState("");
  const [processingMessage, setProcessingMessage] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartAPI,
  });

  const { data: userData } = useQuery({
    queryKey: ["userBox"],
    queryFn: getUserInfoAPI,
  });

  const updateAddressMutation = useMutation({
    mutationFn: updateUserInfoAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["userBox"]);
      setIsModalOpen(false);
      toast.success("Address updated successfully");
    }
  });

  const handleSaveAddress = (newAddress) => {
    if (!newAddress.trim()) {
      toast.error("Address cannot be empty");
      return;
    }
    updateAddressMutation.mutate(newAddress);
  };

  const updateCartQtyMutation = useMutation({
    mutationFn: updateCartQtyAPI,
    onMutate: ({ id }) => setLoadingItemId(id),
    onSettled: () => {
      setLoadingItemId(null);
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const deleteCartItemMutation = useMutation({
    mutationFn: deleteCartItemAPI,
    onMutate: (id) => setLoadingItemId(id),
    onSettled: () => {
      setLoadingItemId(null);
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: clearCartAPI,
    onMutate: () => setClearLoading(true),
    onSettled: () => {
      setClearLoading(false);
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrderAPI,
  });

  const calculateTotal = () =>
    data?.cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) ||
    0;

  const changeQty = (item, delta) => {
    updateCartQtyMutation.mutate({
      id: item._id,
      action: delta === 1 ? "increase" : "decrease",
    });
  };

  const handleCheckout = async () => {
    if (!userData?.user?.address) {
      toast.error("Please add a delivery address before checkout");
      openModal();
      return;
    }

    try {
      setCheckoutLoading(true);
      setProcessingMessage("Preparing Your Order...");

      const { order } = await createOrderMutation.mutateAsync({
        cartItems: data.cart,
        userId: user.id,
      });



      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Arts & Craft By Kavya",
        description: "Handcrafted with Love",
        order_id: order.id,
        handler: async (res) => {
          try {
            setProcessingMessage("Verifying Payment and Notifying Artist...");
            await verifyPaymentAPI(res);

            // Construct WhatsApp message after verification
            const orderDetails = data.cart.map(item => `- ${item.name} (Qty: ${item.quantity}, Price: ₹${item.price})`).join('\n');
            const total = calculateTotal();
            const whatsappMsg = `Hi Kavya, I've just placed an order! 🎉\n\n🆔 *Order ID:* ${order.id}\n\n🛍️ *Order Details:*\n${orderDetails}\n\n💰 *Total Amount:* ₹${total}\n📍 *Shipping Address:* ${userData?.user?.address}\n\nPlease check the admin panel for details.`;
            const whatsappUrl = `https://wa.me/919037009645?text=${encodeURIComponent(whatsappMsg)}`;

            // Attempt to open WhatsApp
            window.open(whatsappUrl, '_blank');

            toast.success("Order confirmed! Artist notified.");
            navigate("/myorder");
            queryClient.invalidateQueries(["cart"]);
            setProcessingMessage(null);
          } catch (error) {
            console.error("Payment verification failed", error);
            toast.error("Payment verification failed. Please contact the artist.");
            setProcessingMessage(null);
          }
        },
        modal: {
          ondismiss: function () {
            setCheckoutLoading(false);
            setProcessingMessage(null);
          }
        },
        theme: { color: "#D4AF37" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error(error?.message || "Checkout failed");
      setCheckoutLoading(false);
      setProcessingMessage(null);
    }
  };

  if (isLoading) return <CartSkeleton />;

  const openModal = () => {
    setModalInput(userData?.user?.address || "");
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 md:px-8 bg-grid-white/[0.02]">
      {/* Show full screen loader if processing */}
      {processingMessage && <FullScreenLoader message={processingMessage} />}

      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/5 pb-8">
          <div>
            <h5 className="text-[var(--color-primary)] font-bold tracking-[0.2em] text-xs uppercase mb-2">Shopping Cart</h5>
            <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
              Your <span className="italic text-gray-500">Collection</span>
            </h1>
          </div>

          {data?.cart?.length > 0 && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <FiPackage />
                <span>{data.cart.length} Items</span>
              </div>
              <button
                disabled={clearCartMutation.isPending}
                onClick={() => clearCartMutation.mutate()}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <FiTrash2 /> Empty Cart
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {!data?.cart?.length ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#0f1219] border border-white/5 rounded-[40px] p-16 text-center shadow-inner"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full flex items-center justify-center mx-auto mb-8 border border-white/5">
                    <FiShoppingBag size={40} className="text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-2">Your Bag is Empty</h3>
                  <p className="text-gray-500 mb-10 max-w-sm mx-auto leading-relaxed">
                    Discover our handcrafted masterpieces and add a touch of elegance to your life.
                  </p>
                  <button
                    onClick={() => navigate("/listProduct")}
                    className="px-10 py-4 rounded-full bg-[var(--color-primary)] text-black font-bold uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-[var(--color-primary)]/20"
                  >
                    Explore Collection
                  </button>
                </motion.div>
              ) : (
                data.cart.map((item) => {
                  const discount = item.isDiscounted
                    ? Math.round(
                      ((item.originalPrice - item.price) / item.originalPrice) *
                      100
                    )
                    : 0;
                  const isItemLoading = loadingItemId === item._id;

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      key={item._id}
                      className="group relative flex flex-col md:flex-row gap-6 bg-[#0f1219] border border-white/5 p-4 rounded-[32px] hover:border-white/10 transition-all duration-300 pr-6 md:pr-8"
                    >
                      {/* Image */}
                      <div className="relative w-full md:w-32 h-40 rounded-2xl overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        {item.isDiscounted && (
                          <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wide">
                            -{discount}%
                          </span>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-center py-2">
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <h3 className="text-lg md:text-xl font-medium text-white leading-tight font-serif tracking-tight pr-8">
                            {item.name}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl font-bold text-[var(--color-primary)] tracking-tight">₹{item.price}</span>
                          {item.isDiscounted && (
                            <span className="text-gray-600 line-through text-sm">₹{item.originalPrice}</span>
                          )}
                        </div>

                        <div className="flex items-end justify-between mt-auto">
                          {/* Qty Control */}
                          <div className="flex items-center bg-black border border-white/10 rounded-xl p-1">
                            <button
                              disabled={isItemLoading || item.quantity <= 1}
                              onClick={() => changeQty(item, -1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-white font-bold text-sm">{item.quantity}</span>
                            <button
                              disabled={isItemLoading}
                              onClick={() => changeQty(item, 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <p className="text-white font-medium">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest mr-2">Subtotal</span>
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>

                      {/* Delete Button (Absolute) */}
                      <button
                        disabled={isItemLoading}
                        onClick={() => deleteCartItemMutation.mutate(item._id)}
                        className="absolute top-4 right-4 p-2 text-gray-600 hover:text-red-500 transition-colors bg-transparent border border-transparent hover:border-white/5 rounded-full"
                      >
                        {isItemLoading ? (
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <FiTrash2 size={18} />
                        )}
                      </button>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>

          {/* SUMMARY SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-[#0f1219] border border-white/10 rounded-[40px] p-8 shadow-2xl sticky top-32 lg:min-h-[500px] flex flex-col">
              <h3 className="text-xl font-serif text-white mb-8 pb-4 border-b border-white/5">Order Summary</h3>

              <div className="space-y-4 mb-8 flex-1">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Shipping</span>
                  <span className="text-green-400 font-bold uppercase text-[10px] tracking-widest pt-1">Free</span>
                </div>

                {/* Shipping Widget */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <div className="flex justify-between items-start mb-3">
                      <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#00a1d1]">
                        <FiMapPin /> Delivery To
                      </span>
                      <button
                        onClick={openModal}
                        className="text-gray-500 text-[10px] underline hover:text-white transition-colors"
                      >
                        Edit
                      </button>
                    </div>

                    <p className="text-sm text-gray-300 leading-relaxed mb-3 line-clamp-3">
                      {userData?.user?.address ? userData.user.address : <span className="text-gray-500 italic">No address selected</span>}
                    </p>

                    {userData?.user?.phonenumber && (
                      <div className="text-xs text-gray-500 font-mono">
                        +91 {userData.user.phonenumber}
                      </div>
                    )}
                  </div>

                  {!userData?.user?.address && (
                    <button
                      onClick={openModal}
                      className="w-full mt-2 py-2 text-xs text-[var(--color-primary)] font-bold border border-[var(--color-primary)]/20 rounded-xl hover:bg-[var(--color-primary)]/10 transition-colors"
                    >
                      + Add Address
                    </button>
                  )}
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 mt-4">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-gray-400 font-medium text-sm uppercase tracking-widest">Total</span>
                  <span className="text-3xl font-serif font-black text-white tracking-tighter">₹{calculateTotal()}</span>
                </div>

                <button
                  className="group w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[#c59d5f] text-black font-extrabold text-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[var(--color-primary)]/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={checkoutLoading || createOrderMutation.isPending || !data?.cart?.length}
                  onClick={handleCheckout}
                >
                  {checkoutLoading || createOrderMutation.isPending ? "Processing..." : "Place Order"}
                  {!(checkoutLoading || createOrderMutation.isPending) && (
                    <span className="group-hover:translate-x-1 transition-transform">
                      <FiArrowRight />
                    </span>
                  )}
                </button>

                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest">
                  <FiShield className="text-green-500" /> Secure Payments via Razorpay
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <AddressModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveAddress}
            input={modalInput}
            setInput={setModalInput}
            isLoading={updateAddressMutation.isPending}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
