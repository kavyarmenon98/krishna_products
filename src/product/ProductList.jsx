import { getAllProductAPI } from "../services/service";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import PageLoader from "../common/PageLoader";

export default function ProductList() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProductAPI(),
  });

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="w-full px-4 sm:px-8 py-10 max-w-7xl mx-auto">
      {/* Informational Banner Card */}
      <div className="mb-12 relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-primary)] to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-[#0f1219] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-2xl overflow-hidden">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-serif text-white mb-3 tracking-tight">
              Handcrafted Just for You
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">
              <span className="text-[var(--color-primary)] font-bold">In-stock items</span> are available for immediate purchase and will be delivered in <span className="text-white font-medium">10–15 days</span>. For custom orders or specific details, please feel free to WhatsApp me.
            </p>
          </div>
          <a
            href="https://wa.me/919037009645"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-[#25d366] text-white rounded-full font-bold text-sm tracking-widest hover:scale-105 transition-all shadow-lg shadow-green-500/20 whitespace-nowrap"
          >
            WHATSAPP ME
          </a>

          {/* Decorative side element */}
          <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-[var(--color-primary)]/5 to-transparent pointer-none -z-10" />
        </div>
      </div>

      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2
          lg:grid-cols-4
          xl:grid-cols-4
          gap-6
        "
      >
        <ProductCard details={data} />
      </div>
    </div>
  );
}
