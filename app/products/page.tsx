import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import { Suspense } from "react";
import Loading from "@/components/Loading";

interface SearchParams {
  category?: string;
  search?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { products, pagination } = await getProducts({
    category: searchParams.category,
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
          <p className="text-white/70">
            {pagination.total} {pagination.total === 1 ? "product" : "products"} found
          </p>
        </div>

        <Suspense fallback={<Loading />}>
          <ProductGrid products={products} />
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
