import { searchProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import { Product } from "@/types";

// Force dynamic rendering for search results
export const dynamic = 'force-dynamic';

interface SearchParams {
  q?: string;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = searchParams.q || "";
  
  // Fetch products with error handling
  let products: Product[] = [];
  let pagination = { total: 0, limit: 0, offset: 0 };
  
  try {
    const result = await searchProducts(query);
    products = result.products;
    pagination = result.pagination;
  } catch (error) {
    console.error("Error fetching search results:", error);
    // Continue rendering with empty results
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="mb-2 font-luxury text-4xl font-bold text-[var(--gold)]">
            {query ? `Search Results for "${query}"` : "Search"}
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
            <p className="mb-4 text-xl text-white/70">
              No products found for your search.
            </p>
            <p className="text-white/40">
              Try different keywords or browse our collection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
