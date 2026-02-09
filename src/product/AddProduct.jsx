import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addProductAPI } from "../services/service";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-hot-toast';
import { motion } from "framer-motion";
import { FiUpload, FiX, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

/* ---------------- CONSTANTS ---------------- */
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VIDEO_TYPES = ["video/mp4", "video/webm"];
const MAX_FILES = 6;

/* ---------------- VALIDATION ---------------- */
const validationSchema = Yup.object({
  name: Yup.string().required("Product Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  discount: Yup.number()
    .nullable()
    .lessThan(Yup.ref("price"), "Discount must be less than price"),
  category: Yup.string()
    .required("Please select a Category")
    .notOneOf([""], "Please select a Category"),
  description: Yup.string().required("Description is required"),
  instock: Yup.number().required("Stock count is required"),
  images: Yup.array()
    .min(1, "At least one image is required")
    .max(MAX_FILES, `You can upload up to ${MAX_FILES} images`),
});

/* ---------------- COMPONENT ---------------- */
function AddProduct() {
  const [previews, setPreviews] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const addProductMutation = useMutation({
    mutationFn: addProductAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      discount: "",
      category: "",
      description: "",
      instock: "",
      images: [],
      video: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("pname", values.name);
        formData.append("price", values.price);
        formData.append("discount", values.discount || "");
        formData.append("category", values.category);
        formData.append("description", values.description);
        formData.append("instock", values.instock);

        values.images.forEach((file) => {
          formData.append("images", file, file.name);
        });

        if (values.video) {
          formData.append("video", values.video);
        }
        console.log(values);
        await addProductMutation.mutateAsync(formData);
        resetForm();
        setPreviews([]);
        navigate("/listProduct");
      } catch (error) {
        console.error("Add Product Error:", error);
        toast.error(error?.response?.data?.message ?? "Product Add Failed");
      }
    },
  });

  useEffect(() => {
    const files = formik.values.images || [];
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [formik.values.images]);

  useEffect(() => {
    if (formik.values.video) {
      const url = URL.createObjectURL(formik.values.video);
      setVideoPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setVideoPreview(null);
    }
  }, [formik.values.video]);

  const onFilesSelected = (e) => {
    const files = Array.from(e.currentTarget.files || []).filter((f) => ALLOWED_TYPES.includes(f.type));
    const merged = [...formik.values.images, ...files];
    formik.setFieldValue("images", merged.slice(0, MAX_FILES));
  };

  const removeImageAt = (index) => {
    const next = [...formik.values.images];
    next.splice(index, 1);
    formik.setFieldValue("images", next);
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-serif text-white mb-2 tracking-tight">Expand the Gallery</h2>
          <p className="text-gray-500">Add a new masterpiece to the Arts & Craft collection.</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT: FORM FIELDS */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Artwork Title</label>
                <input
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-primary)] transition-all"
                  placeholder="e.g. Mural of Serenity"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Price (₹)</label>
                  <input
                    type="number"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-primary)] transition-all"
                    placeholder="0.00"
                    {...formik.getFieldProps("price")}
                  />
                  {formik.touched.price && formik.errors.price && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.price}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Discount Price (₹)</label>
                  <input
                    type="number"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-primary)] transition-all"
                    placeholder="Optional"
                    {...formik.getFieldProps("discount")}
                  />
                  {formik.touched.discount && formik.errors.discount && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.discount}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Category</label>
                <select
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-primary)] transition-all appearance-none"
                  {...formik.getFieldProps("category")}
                >
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
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Stock Count</label>
                <input
                  type="number"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-primary)] transition-all"
                  placeholder="0 for Custom-Only items"
                  {...formik.getFieldProps("instock")}
                />
                {formik.touched.instock && formik.errors.instock && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.instock}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Story/Description</label>
                <textarea
                  rows="5"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-primary)] transition-all resize-none"
                  placeholder="Describe the inspiration behind this piece..."
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: MEDIA UPLOAD */}
          <div className="space-y-8">
            <div className="bg-[#111111] border border-white/5 rounded-3xl p-8">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Gallery Images</label>

              <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-8 text-center group hover:border-[var(--color-primary)]/50 transition-all cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept={ALLOWED_TYPES.join(",")}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={onFilesSelected}
                />
                <FiUpload className="mx-auto text-3xl text-gray-500 mb-4 group-hover:text-[var(--color-primary)] transition-colors" />
                <p className="text-gray-400 text-sm font-medium">Select up to {MAX_FILES} images</p>
                <p className="text-gray-600 text-[10px] uppercase mt-2">JPG, PNG, WebP</p>
              </div>
              {formik.touched.images && formik.errors.images && (
                <p className="text-red-500 text-xs mt-2 text-center">{formik.errors.images}</p>
              )}

              {previews.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {previews.map((src, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                      <img src={src} className="w-full h-full object-cover" alt="" />
                      <button
                        type="button"
                        onClick={() => removeImageAt(idx)}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[#111111] border border-white/5 rounded-3xl p-8">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Process Video (Optional)</label>
              {!formik.values.video ? (
                <div className="relative border border-white/10 rounded-2xl p-6 text-center hover:bg-white/5 transition-all cursor-pointer">
                  <input
                    type="file"
                    accept={VIDEO_TYPES.join(",")}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => formik.setFieldValue("video", e.target.files[0])}
                  />
                  <p className="text-gray-500 text-sm font-medium">Add video link or file</p>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-white/10">
                  <video
                    src={videoPreview}
                    className="w-full aspect-video object-cover"
                    controls
                  />
                  <button
                    type="button"
                    onClick={() => formik.setFieldValue("video", null)}
                    className="absolute top-2 right-2 p-2 bg-black/60 text-white rounded-full"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* BUTTONS: ALWAYS AT THE BOTTOM */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={addProductMutation.isPending}
                className="flex-1 py-4 bg-[var(--color-primary)] text-black font-extrabold rounded-2xl tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-[var(--color-primary)]/10 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {addProductMutation.isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    CURATING...
                  </>
                ) : (
                  "PUBLISH ARTWORK"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/listProduct")}
                className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl tracking-widest border border-white/10 hover:bg-white/10 transition-all"
              >
                DISCARD
              </button>
            </div>
          </div>
        </form >
      </div >
    </div >
  );
}

export default AddProduct;
