import React, { useEffect, useRef, useState, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { editProductAPI, getProductByIdAPI } from "../services/service";
import { motion } from "framer-motion";
import { FiUpload, FiX, FiCheck, FiSave, FiCornerUpLeft } from "react-icons/fi";

/* ---------------- CONSTANTS ---------------- */
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VIDEO_TYPES = ["video/mp4", "video/webm"];
const MAX_FILES = 6;

/* ---------------- VALIDATION ---------------- */
const validationSchema = Yup.object({
  pname: Yup.string().required("Product name is required"),
  price: Yup.number().required("Price is required"),
  discount: Yup.number()
    .nullable()
    .lessThan(Yup.ref("price"), "Discount must be less than price"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  instock: Yup.number().required("Stock count is required"),
});

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductByIdAPI(id),
    enabled: !!id,
  });

  const [visibleImages, setVisibleImages] = useState([]);
  const [existingVideo, setExistingVideo] = useState(null);
  const [newVideoPreview, setNewVideoPreview] = useState(null);
  const deletedImagesRef = useRef([]);
  const deletedVideoRef = useRef(false);

  useEffect(() => {
    if (data?.product) {
      setVisibleImages(data.product.images || []);
      setExistingVideo(data.product.video || null);
    }
  }, [data]);

  const queryClient = useQueryClient();
  const editProductMutation = useMutation({
    mutationFn: editProductAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      queryClient.invalidateQueries(["product", id]);
      navigate("/listProduct");
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      pname: data?.product?.pname || "",
      price: data?.product?.price || "",
      discount: data?.product?.discount || "",
      category: data?.product?.category || "",
      description: data?.product?.description || "",
      instock: data?.product?.instock || "",
      images: [],
      video: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("pname", values.pname);
      formData.append("price", values.price);
      formData.append("discount", values.discount || "");
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("instock", values.instock);

      visibleImages.forEach((img) => formData.append("existingImages", img));
      deletedImagesRef.current.forEach((img) => formData.append("deletedImages", img));
      values.images.forEach((file) => formData.append("images", file));

      if (deletedVideoRef.current) formData.append("deleteVideo", "true");
      if (values.video) formData.append("video", values.video);

      try {
        await editProductMutation.mutateAsync({ id, formData });
      } catch (error) {
        console.error("Edit Product Error:", error);
        toast.error(error?.response?.data?.message ?? "Product Update Failed");
      }
    },
  });

  useEffect(() => {
    if (formik.values.video) {
      const url = URL.createObjectURL(formik.values.video);
      setNewVideoPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setNewVideoPreview(null);
    }
  }, [formik.values.video]);

  const newImagePreviews = useMemo(() => {
    return formik.values.images.map((file) => URL.createObjectURL(file));
  }, [formik.values.images]);

  const onFilesSelected = (e) => {
    const files = Array.from(e.target.files || []).filter((f) => ALLOWED_TYPES.includes(f.type));
    const merged = [...formik.values.images, ...files];
    formik.setFieldValue("images", merged.slice(0, MAX_FILES - visibleImages.length));
  };

  const removeExistingImage = (img, index) => {
    deletedImagesRef.current.push(img);
    setVisibleImages((prev) => prev.filter((_, i) => i !== index));
  };

  if (isLoading) return <div className="min-h-screen bg-[#050505] flex justify-center items-center h-screen"><p className="text-white font-serif italic animate-pulse">Loading Artwork...</p></div>;

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-serif text-white mb-2 tracking-tight">Refine Masterpiece</h2>
            <p className="text-gray-500 italic">Editing: {data?.product?.pname}</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <FiCornerUpLeft /> Go Back
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* MAIN INFO */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Product Name</label>
                <input className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-primary)] transition-all" {...formik.getFieldProps("pname")} />
                {formik.touched.pname && formik.errors.pname && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.pname}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Base Price (₹)</label>
                  <input type="number" className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-primary)] transition-all" {...formik.getFieldProps("price")} />
                  {formik.touched.price && formik.errors.price && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.price}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Discount Price (₹)</label>
                  <input type="number" className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-primary)] transition-all" {...formik.getFieldProps("discount")} />
                  {formik.touched.discount && formik.errors.discount && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.discount}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Category</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-primary)] transition-all appearance-none" {...formik.getFieldProps("category")}>
                    <option value="">Select Category</option>
                    <option value="Painting">Painting</option>
                    <option value="FabricPainting">Fabric Painting</option>
                    <option value="Craft">Craft Item</option>
                    <option value="Nettipattam">Nettipattam</option>
                    <option value="Resin">Resin Products</option>
                  </select>
                  {formik.touched.category && formik.errors.category && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.category}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Inventory Count</label>
                  <input type="number" className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-primary)] transition-all" {...formik.getFieldProps("instock")} />
                  {formik.touched.instock && formik.errors.instock && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.instock}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Description</label>
                <textarea rows="6" className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-primary)] transition-all resize-none italic" {...formik.getFieldProps("description")} />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.description}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={editProductMutation.isPending}
              className="w-full py-5 bg-[var(--color-primary)] text-black font-extrabold rounded-2xl tracking-widest hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-[var(--color-primary)]/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {editProductMutation.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  SAVING CHANGES...
                </>
              ) : (
                <>
                  <FiSave size={20} /> UPDATE COLLECTION
                </>
              )}
            </button>
          </div>

          {/* MEDIA ASSETS */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#111111] border border-white/5 rounded-3xl p-8">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Current Gallery</label>
              <div className="grid grid-cols-3 gap-3">
                {visibleImages.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                    <img src={img} className="w-full h-full object-cover" alt="" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(img, i)}
                      className="absolute top-1.5 right-1.5 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                ))}
                {visibleImages.length < MAX_FILES && (
                  <div className="relative aspect-square rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-gray-600 hover:border-white/30 transition-all cursor-pointer">
                    <input type="file" multiple accept={ALLOWED_TYPES.join(",")} className="absolute inset-0 opacity-0 cursor-pointer" onChange={onFilesSelected} />
                    <FiUpload />
                    <span className="text-[8px] mt-1 font-bold uppercase">Add New</span>
                  </div>
                )}
              </div>

              {newImagePreviews.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/5">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Queued for Upload</label>
                  <div className="grid grid-cols-4 gap-2">
                    {newImagePreviews.map((src, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-[var(--color-primary)]/30">
                        <img src={src} className="w-full h-full object-cover" alt="" />
                        <button
                          type="button"
                          onClick={() => {
                            const next = [...formik.values.images];
                            next.splice(i, 1);
                            formik.setFieldValue("images", next);
                          }}
                          className="absolute -top-1 -right-1 p-1 bg-black text-white rounded-full"
                        >
                          <FiX size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-[#111111] border border-white/5 rounded-3xl p-8">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Process Video</label>
              {existingVideo && !deletedVideoRef.current ? (
                <div className="relative rounded-2xl overflow-hidden border border-white/10">
                  <video src={existingVideo} controls className="w-full aspect-video object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setExistingVideo(null);
                      deletedVideoRef.current = true;
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full shadow-lg"
                  >
                    <FiX />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative border border-white/10 rounded-2xl p-6 text-center hover:bg-white/5 transition-all cursor-pointer">
                    <input type="file" accept={VIDEO_TYPES.join(",")} className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => formik.setFieldValue("video", e.target.files[0])} />
                    <p className="text-gray-500 text-sm font-medium">{formik.values.video ? formik.values.video.name : "Replace Process Video"}</p>
                  </div>
                  {newVideoPreview && (
                    <div className="relative rounded-2xl overflow-hidden border border-[var(--color-primary)]/30">
                      <video src={newVideoPreview} controls className="w-full aspect-video object-cover" />
                      <button
                        type="button"
                        onClick={() => formik.setFieldValue("video", null)}
                        className="absolute top-2 right-2 p-2 bg-black text-white rounded-full shadow-lg"
                      >
                        <FiX />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
