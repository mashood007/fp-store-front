import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Men's Fragrances",
    slug: "men",
    description: "Bold and sophisticated scents for men",
    count: "50+ Products",
  },
  {
    name: "Women's Fragrances",
    slug: "women",
    description: "Elegant and captivating perfumes for women",
    count: "60+ Products",
  },
  {
    name: "Unisex Fragrances",
    slug: "unisex",
    description: "Versatile scents for everyone",
    count: "30+ Products",
  },
  {
    name: "Luxury Collection",
    slug: "luxury",
    description: "Premium and exclusive fragrances",
    count: "25+ Products",
  },
  {
    name: "Fresh & Citrus",
    slug: "fresh",
    description: "Light and refreshing scents",
    count: "40+ Products",
  },
  {
    name: "Woody & Spicy",
    slug: "woody",
    description: "Warm and earthy fragrances",
    count: "35+ Products",
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-luxury text-5xl font-bold text-[var(--gold)]">
            Browse by Category
          </h1>
          <p className="text-lg text-white/70">
            Find your perfect scent in our curated collections
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl glass p-8 shadow-sm transition-all hover:shadow-luxury border border-[var(--gold)]/20"
            >
              <div className="relative z-10">
                <h2 className="mb-2 font-luxury text-2xl font-bold text-white">
                  {category.name}
                </h2>
                <p className="mb-4 text-white/70">{category.description}</p>
                <div className="mb-4 text-sm font-medium text-[var(--gold)]">
                  {category.count}
                </div>
                <span className="inline-flex items-center gap-2 text-[var(--gold)] font-medium">
                  Explore Collection
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-[var(--gold)]/10 opacity-50 transition-transform group-hover:scale-150"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
