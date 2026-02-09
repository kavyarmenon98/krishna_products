import { GrEdit } from "react-icons/gr";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEye, FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import ProductImageGallery from "../common/ProductImageGallery";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCartAPI, deleteProductByIdAPI } from "../services/service";
import { useSelector } from "react-redux";
import { toast } from 'react-hot-toast';

function ProductCard({ details }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  const queryClient = useQueryClient();
  const deleteProductMutation = useMutation({
    mutationFn: deleteProductByIdAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete masterpiece");
    }
  });

  const addToCartMutation = useMutation({
    mutationFn: addToCartAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add to cart");
    }
  });

  const truncate = (text, len = 90) =>
    text?.length > len ? text.slice(0, len) + "..." : text;

  return (
    <>
      {details?.readproduct?.map((item) => {
        const hasDiscount = Boolean(
          item.discount > 0 &&
          item.discount < item.price &&
          item.discountPercentage > 0
        );

        const stockLabel =
          item.instock > 0 ? "In Stock" : "Custom Made";

        const stockBadgeColor =
          item.instock > 0 ? "bg-green-600" : "bg-purple-600";

        return (
          <div
            key={item._id}
            className="w-full bg-[#121212] border border-white/5 text-white rounded-2xl shadow-xl flex flex-col group transition-all duration-300 hover:border-white/10 hover:shadow-2xl overflow-hidden"
          >
            {/* IMAGE - Edge to Edge */}
            <div
              className="relative w-full aspect-square cursor-pointer overflow-hidden group-hover:opacity-95 transition-opacity bg-neutral-900/40"
              onClick={() => navigate(`/viewProduct/${item._id}`)}
            >
              <div className="w-full h-full overflow-hidden flex items-center justify-center p-2">
                <ProductImageGallery
                  images={item.images}
                  category={item.category}
                  styleForImage={{
                    borderRadius: "12px",
                  }}
                />
              </div>

              {/* DISCOUNT BADGE */}
              {hasDiscount && (
                <span className="absolute top-6 left-6 bg-indigo-600/90 backdrop-blur-md px-3 py-1 text-[10px] rounded-full font-bold uppercase tracking-wider z-10 shadow-lg">
                  {item.discountPercentage}% OFF
                </span>
              )}

              {/* STOCK / CUSTOM MADE BADGE */}
              <span
                className={`absolute top-6 right-6 ${stockBadgeColor}/90 backdrop-blur-md px-3 py-1 text-[10px] rounded-full font-bold uppercase tracking-wider z-10 shadow-lg`}
              >
                {stockLabel}
              </span>
            </div>

            {/* CONTENT */}
            <div className="flex flex-col flex-1 p-5 gap-4">
              {/* TITLE + PRICE */}
              <div className="flex justify-between items-start gap-4">
                <h3 className="font-semibold text-base md:text-lg line-clamp-2 leading-tight flex-1">
                  {item.pname}
                </h3>

                <div className="text-right shrink-0">
                  {hasDiscount ? (
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-500 line-through">
                        ₹{item.price}
                      </span>
                      <span className="text-[var(--color-primary)] font-bold text-lg">
                        ₹{item.discount}
                      </span>
                    </div>
                  ) : (
                    <div className="font-bold text-lg">₹{item.price}</div>
                  )}
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-400 leading-relaxed min-h-[40px] line-clamp-2">
                {truncate(item.description, 80)}
              </p>

              {/* CATEGORY + ICONS */}
              <div className="flex justify-between items-center py-2 border-y border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  {item.category}
                </span>

                <div className="flex gap-4 text-gray-400">
                  <button
                    title="Quick View"
                    className="p-1.5 hover:text-blue-400 transition-colors"
                    onClick={() => navigate(`/viewProduct/${item._id}`)}
                  >
                    <FaEye size={18} />
                  </button>

                  {isAdmin && (
                    <>
                      <button
                        title="Edit"
                        className="p-1.5 hover:text-[var(--color-primary)] transition-colors"
                        onClick={() => navigate(`/editProduct/${item._id}`)}
                      >
                        <GrEdit size={16} />
                      </button>
                      <button
                        title="Delete"
                        className="p-1.5 hover:text-red-500 transition-colors"
                        onClick={() => deleteProductMutation.mutateAsync(item._id)}
                      >
                        <RiDeleteBinFill size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-auto">
                {item.instock > 0 ? (
                  <button
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold text-sm transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-[var(--color-primary)]/10 disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={addToCartMutation.isPending}
                    onClick={() => {
                      if (!user) {
                        navigate("/login");
                        return;
                      }
                      addToCartMutation.mutate(item);
                    }}
                  >
                    {addToCartMutation.isPending ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FaShoppingCart />
                    )}
                    {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
                  </button>
                ) : (
                  <button
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25d366] text-white font-bold text-sm transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-green-500/10"
                    onClick={() =>
                      window.open(
                        `https://wa.me/919037009645?text=${encodeURIComponent(
                          `Hi, I'm interested in ${item.pname}`
                        )}`,
                        "_blank"
                      )
                    }
                  >
                    <FaWhatsapp /> Enquire on WhatsApp
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ProductCard;
