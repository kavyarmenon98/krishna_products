import { getAllProductByCategoryAPI } from "../services/service";
import { useQuery } from "@tanstack/react-query";
import PageLoader from "../common/PageLoader";
import { useParams } from "react-router-dom";
import ProductCard from "../product/ProductCard";
import { motion } from "framer-motion";

export default function Category() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getAllProductByCategoryAPI(id),
    enabled: !!id,
  });

  if (isLoading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-l-4 border-[var(--color-primary)] pl-6 py-2"
        >
          <span className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-[0.3em] mb-2 block">Collection</span>
          <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight capitalize">
            {id}
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <ProductCard details={data} />
        </div>

        {data?.readproduct?.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-500 italic font-serif text-xl underline decoration-zinc-800 underline-offset-8 decoration-2">
              Our curators are still preparing this collection...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}