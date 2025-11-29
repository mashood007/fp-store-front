import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import MobileProductGrid from "@/components/MobileProductGrid";
import { Suspense } from "react";
import Loading from "@/components/Loading";

interface SearchParams {
  category?: string;
  collection?: string;
  search?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { products, pagination } = await getProducts({
    category: searchParams.category,
    collection: searchParams.collection,
    search: searchParams.search,
  });

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="mb-2 font-luxury text-4xl font-bold text-[var(--gold)]">
            {searchParams.category
              ? `${searchParams.category.charAt(0).toUpperCase() + searchParams.category.slice(1)} Fragrances`
              : searchParams.search
                ? `Search Results for "${searchParams.search}"`
                : "All Products"}
          </h1>
        </div>

        <Suspense fallback={<Loading />}>
          {/* Mobile Grid */}
          <div className="block md:hidden">
            <MobileProductGrid products={products} />
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:block">
            <ProductGrid products={products} />
          </div>
        </Suspense>

        {products.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-xl text-white/70">
              No products found. Try adjusting your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
