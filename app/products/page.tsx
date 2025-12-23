import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import MobileProductGrid from "@/components/MobileProductGrid";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import type { Metadata } from "next";

interface SearchParams {
  category?: string;
  collection?: string;
  search?: string;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const category = searchParams.category;
  const collection = searchParams.collection;
  const search = searchParams.search;

  let title = "Premium Perfumes & Fragrances | Flëur d'Or UAE";
  let description = "Shop authentic luxury perfumes and fragrances in UAE. Premium men's and women's scents, oud, and fragrance collections at Flëur d'Or.";
  let keywords = [
    "perfumes UAE",
    "fragrances UAE",
    "luxury perfume UAE",
    "men's perfume UAE",
    "women's perfume UAE",
    "buy perfumes online UAE",
    "perfume shop UAE",
    "authentic perfumes UAE"
  ];

  if (category) {
    if (category === "men") {
      title = "Men's Fragrances & Perfumes | Luxury Scents for Men UAE";
      description = "Discover premium men's fragrances and colognes in UAE. Authentic luxury scents, oud, and masculine perfumes at Flëur d'Or.";
      keywords = [
        "men's perfume UAE",
        "men's fragrance UAE",
        "men's cologne UAE",
        "luxury men's perfume",
        "men's oud UAE",
        "masculine fragrances UAE"
      ];
    } else if (category === "women") {
      title = "Women's Fragrances & Perfumes | Luxury Scents for Women UAE";
      description = "Explore elegant women's fragrances and perfumes in UAE. Premium scents, floral perfumes, and luxury fragrances at Flëur d'Or.";
      keywords = [
        "women's perfume UAE",
        "women's fragrance UAE",
        "luxury women's perfume",
        "floral perfume UAE",
        "elegant women's fragrance",
        "premium women's scents UAE"
      ];
    } else if (category === "unisex") {
      title = "Unisex Fragrances & Perfumes | Versatile Scents UAE";
      description = "Shop unisex fragrances and perfumes in UAE. Versatile luxury scents suitable for everyone at Flëur d'Or.";
      keywords = [
        "unisex perfume UAE",
        "unisex fragrance UAE",
        "versatile perfume",
        "gender neutral fragrance UAE"
      ];
    }
  } else if (collection) {
    title = `${collection} Collection | Luxury Perfumes UAE`;
    description = `Explore our ${collection} fragrance collection. Premium perfumes and scents in UAE at Flëur d'Or.`;
  } else if (search) {
    title = `Search Results for "${search}" | Perfumes UAE`;
    description = `Find "${search}" perfumes and fragrances in UAE. Shop authentic luxury scents at Flëur d'Or.`;
  }

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://www.fleurdorparfums.com/products${category ? `?category=${category}` : collection ? `?collection=${collection}` : search ? `?search=${search}` : ''}`,
      siteName: "Flëur d'Or Perfumes",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
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
