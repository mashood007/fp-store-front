import { getProducts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Product } from "@/types";

// Force dynamic rendering since we need real-time product data
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Fetch products with error handling
  let products: Product[] = [];
  try {
    const result = await getProducts({ limit: 8 });
    products = result.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    // Continue rendering with empty products array
  }

  const categories = [
    {
      title: "Ruang Tamu",
      items: "18,309 items",
      image: "/images/IMG_8363.JPG",
      href: "/products?category=living-room",
    },
    {
      title: "Kamar Anak-Anak",
      items: "837 items",
      image: "/images/IMG_8364.JPG",
      href: "/products?category=kids-room",
    },
    {
      title: "Dekorasi",
      items: "77,392 items",
      image: "/images/IMG_8376.JPG",
      href: "/products?category=decoration",
    },
    {
      title: "Kamar Tidur",
      items: "22,094 items",
      image: "/images/IMG_8391.JPG",
      href: "/products?category=bedroom",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#f5f5f5] py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Hero Content */}
            <div className="text-left">
              <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                Berbagai Macam Furniture Tersedia disini
              </h1>
              
              <p className="mb-8 text-lg text-gray-700">
                Disini, kalian dapat melihat Semua Furniture yang sangat cocok buat anda!
              </p>
              
              <Link 
                href="/search" 
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 font-medium text-white transition-all hover:bg-gray-800"
              >
                Cari disini
              </Link>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <Image
                src="/images/IMG_8366.JPG"
                alt="Modern Furniture"
                width={600}
                height={600}
                className="object-contain rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse The All Furniture
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              That We Designed For You
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl bg-[#f5f5f5] transition-all hover:shadow-lg"
              >
                <div className="aspect-[3/4] relative">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.items}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
