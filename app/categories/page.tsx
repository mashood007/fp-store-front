import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "LED Mirrors",
    slug: "mirrors",
    description: "Smart mirrors with ambient LED lighting",
    count: "50+ Products",
  },
  {
    name: "Decorative Lights",
    slug: "lights",
    description: "Modern lighting solutions for every room",
    count: "60+ Products",
  },
  {
    name: "Home Decor",
    slug: "decor",
    description: "Elegant accessories for modern spaces",
    count: "30+ Products",
  },
  {
    name: "Luxury Collection",
    slug: "luxury",
    description: "Premium and exclusive home accessories",
    count: "25+ Products",
  },
  {
    name: "Bathroom Fixtures",
    slug: "bathroom",
    description: "Contemporary bathroom lighting and decor",
    count: "40+ Products",
  },
  {
    name: "Smart Home",
    slug: "smart",
    description: "IoT-enabled lighting and mirrors",
    count: "35+ Products",
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-luxury text-5xl font-bold text-[var(--accent)]">
            Browse by Category
          </h1>
          <p className="text-lg text-gray-600">
            Find the perfect pieces to illuminate and enhance your space
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl glass border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-luxury"
            >
              <div className="relative z-10">
                <h2 className="mb-2 font-luxury text-2xl font-bold text-gray-900">
                  {category.name}
                </h2>
                <p className="mb-4 text-gray-600">{category.description}</p>
                <div className="mb-4 text-sm font-medium text-[var(--accent)]">
                  {category.count}
                </div>
                <span className="inline-flex items-center gap-2 text-[var(--accent)] font-medium">
                  Explore Collection
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-[var(--accent)]/10 opacity-50 transition-transform group-hover:scale-150"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
