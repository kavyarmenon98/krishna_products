import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCartAPI,
  deleteProductByIdAPI,
  getProductByIdAPI,
} from "../services/service";
import { useNavigate, useParams } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinFill } from "react-icons/ri";
import Slider from "react-slick";
import PageLoader from "../common/PageLoader";
import { FaShoppingCart, FaWhatsapp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductPolicies from "./ProductPolicies";
import ProductReviewSection from "./ProductReviewSection";
import { toast } from 'react-hot-toast';

/* ---------- Delete Confirmation Modal ---------- */
function ConfirmDeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#161b26] border border-white/10 p-8 rounded-2xl w-full max-w-sm text-white shadow-2xl"
      >
        <h3 className="text-xl font-bold mb-3">Delete Product?</h3>
        <p className="text-gray-400 mb-8 leading-relaxed">
          This action will permanently remove this artwork from your gallery. This cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-3 px-4 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
            onClick={onConfirm}
          >
            Delete Item
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const CustomArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white hover:bg-[var(--color-primary)] hover:text-white transition-all backdrop-blur-md ${direction === "left" ? "left-4" : "right-4"
      }`}
  >
    {direction === "left" ? <FaChevronLeft /> : <FaChevronRight />}
  </button>
);

export default function ViewProduct() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductByIdAPI(id),
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProductByIdAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to remove item");
    }
  });

  const addToCartMutation = useMutation({
    mutationFn: addToCartAPI,
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add to collection");
    }
  });

  const addToCart = async (item) => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await addToCartMutation.mutateAsync({
        ...item,
        productId: item._id,
        quantity: 1,
      });
      navigate("/cart");
    } catch (error) {
      // Error handled by toast in service
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    dotsClass: "slick-dots custom-dots-pos",
    responsive: [
      {
        breakpoint: 768,
        settings: { arrows: false },
      },
    ],
  };

  const product = data?.product;

  if (isLoading) return <PageLoader />;

  return (
    <>
      <AnimatePresence>
        {showDeleteModal && (
          <ConfirmDeleteModal
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={() => deleteProductMutation.mutate(id)}
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#050505] pt-24 md:pt-32 pb-20 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto bg-[#0f1219] border border-white/5 rounded-[30px] md:rounded-[40px] overflow-hidden shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row">
            {/* LEFT: SLIDER */}
            <div className="w-full lg:w-[55%] relative h-[400px] md:h-[600px] bg-black">
              {/* DISCOUNT BADGE */}
              {product?.discountPercentage > 0 && (
                <span className="absolute top-8 left-8 z-30 bg-indigo-600/90 backdrop-blur-md px-5 py-2 text-xs rounded-full font-bold shadow-2xl tracking-widest uppercase">
                  {product.discountPercentage}% OFF
                </span>
              )}

              <Slider {...settings} className="h-full">
                {/* VIDEO */}
                {product?.video && (
                  <div className="h-full">
                    <div className="flex justify-center items-center h-[400px] md:h-[600px]">
                      <video
                        src={product.video}
                        controls
                        autoPlay
                        muted
                        loop
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* IMAGES */}
                {product?.images?.map((src, index) => (
                  <div key={index} className="h-full">
                    <div className="flex justify-center items-center h-[400px] md:h-[600px]">
                      <img
                        src={src}
                        alt={`Slide ${index + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            {/* RIGHT: CONTENT */}
            <div className="w-full lg:w-[45%] p-8 md:p-12 lg:p-16 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    {product?.category}
                  </span>
                  {product?.instock > 0 ? (
                    <span className="flex items-center gap-1.5 text-green-400 text-[10px] font-bold uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      In Stock
                    </span>
                  ) : (
                    <span className="text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-widest">
                      Custom Order
                    </span>

                  )}
                </div>

                <div className="flex justify-between items-start gap-6 mb-8">
                  <h1 className="text-3xl md:text-4xl font-serif font-medium text-white tracking-tight leading-tight">
                    {product?.pname}
                  </h1>

                  {isAdmin && (
                    <div className="flex gap-4 pt-2">
                      <button
                        onClick={() => navigate(`/editProduct/${id}`)}
                        className="p-3 bg-white/5 border border-white/5 text-gray-400 hover:text-[var(--color-primary)] rounded-full transition-all"
                      >
                        <GrEdit size={20} />
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        disabled={deleteProductMutation.isPending}
                        className="p-3 bg-white/5 border border-white/5 text-gray-400 hover:text-red-500 rounded-full transition-all disabled:opacity-50"
                      >
                        <RiDeleteBinFill size={20} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="mb-10 p-6 bg-white/5 border border-white/5 rounded-3xl inline-block">
                  {product?.discountPercentage > 0 && (
                    <p className="text-sm text-gray-500 line-through mb-1">Was ₹{product.price}</p>
                  )}
                  <p className="text-4xl font-bold text-white tracking-tighter flex items-baseline gap-2">
                    ₹{product?.discountPercentage > 0 ? product?.discount : product?.price}
                    <span className="text-xs text-gray-500 font-normal tracking-normal uppercase">Indian Rupee</span>
                  </p>
                </div>

                <div className="space-y-4 mb-12">
                  <h3 className="text-xs uppercase font-bold text-gray-500 tracking-[0.2em]">Artist's Description</h3>
                  <p className="text-gray-400 leading-relaxed italic text-lg opacity-90">
                    "{product?.description}"
                  </p>

                  <ProductPolicies category={product?.category} />
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-4">
                {product?.instock > 0 ? (
                  <button
                    onClick={() => addToCart(product)}
                    disabled={addToCartMutation.isPending}
                    className="w-full flex items-center justify-center gap-4 py-5 rounded-2xl bg-[var(--color-primary)] text-white font-extrabold text-base tracking-widest transition-all hover:opacity-90 active:scale-[0.98] shadow-2xl shadow-[var(--color-primary)]/20 uppercase disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {addToCartMutation.isPending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Adding to Collection...
                      </>
                    ) : (
                      <>
                        <FaShoppingCart size={20} />
                        Add to Collection
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      window.open(
                        `https://wa.me/919037009645?text=${encodeURIComponent(
                          `Hi, I'm interested in commissioning this artwork:\n\n${product?.pname}\nReference ID: ${id}`
                        )}`,
                        "_blank"
                      )
                    }
                    className="w-full flex items-center justify-center gap-4 py-5 rounded-2xl bg-[#25d366] text-white font-extrabold text-base tracking-widest transition-all hover:opacity-90 active:scale-[0.98] shadow-2xl shadow-green-500/20 uppercase"
                  >
                    <FaWhatsapp size={22} />
                    Enquire on WhatsApp
                  </button>
                )}

                <p className="text-center text-[10px] text-gray-600 font-medium uppercase tracking-widest">
                  Handcrafted with love by Kavya 🎨
                </p>
              </div>
            </div>
          </div>

          {/* REVIEWS SECTION - Full Width Below Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-6xl mx-auto"
          >
            <div className="bg-[#0f1219] border border-white/5 rounded-[30px] md:rounded-[40px] overflow-hidden shadow-2xl p-8 md:p-12">
              <div className="max-w-4xl mx-auto">
                <ProductReviewSection productId={id} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
