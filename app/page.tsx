import { getProducts, getCollections } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import MobileProductCarousel from "@/components/MobileProductCarousel";
import MobileCollectionCarousel from "@/components/MobileCollectionCarousel";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Shield, Truck, Award, Star } from "lucide-react";

export default async function HomePage() {
  const { products } = await getProducts({ limit: 8 });
  const { collections } = await getCollections({ limit: 6 });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
            poster="/bottle.png"
          >
            <source src="/animations/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
          <div className="animate-slide-up max-w-4xl mx-auto">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-[var(--gold)]" />
              <span className="text-sm font-medium text-[var(--gold)]">Luxury Fragrance Collection</span>
            </div>

            <h6 className="mb-6 font-luxury text-xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              Elevate Your Spirit with
              <span className="block gradient-text">Victory Scented Fragrances</span>
            </h6>

            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <Link href="/products" className="btn-primary group text-[var(--gold)]">
                Shop Now
              </Link>
              <Link href="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-[var(--gold)]" />
                <span className="font-medium">100% Authentic</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* collections */}
      {collections.length > 0 && (
        <section className="mt-2 section-padding bg-gradient-to-b from-black to-[#0a0a0a]">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
                Curated Collections
              </span>
              <h2 className="mb-4 font-luxury text-md-4xl font-bold text-white md:text-5xl">
                Explore Our Collections
              </h2>
              <p className="mx-auto max-w-2xl text-md-lg text-white/70">
                Discover carefully curated fragrance collections for every occasion
              </p>
            </div>

            {/* Mobile Carousel - Shows 2 items per slide */}
            <div className="block md:hidden">
              <MobileCollectionCarousel collections={collections} />
            </div>

            {/* Desktop Grid - Shows normal grid layout */}
            <div className="hidden md:grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/products?collection=${collection.id}`}
                  className="group relative overflow-hidden rounded-2xl glass shadow-soft transition-all hover:shadow-luxury hover:-translate-y-1"
                >
                  {collection.imageUrl && (
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={collection.imageUrl}
                        alt={collection.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>
                  )}

                  <div className={`relative z-10 p-6 ${!collection.imageUrl ? 'min-h-[200px] flex flex-col justify-center' : 'absolute bottom-0 left-0 right-0'}`}>
                    <h3 className="mb-2 font-luxury text-2xl font-bold text-white transition-colors group-hover:text-[var(--gold)]">
                      {collection.name}
                    </h3>
                    {collection.description && (
                      <p className="mb-4 text-white/70 line-clamp-2">
                        {collection.description}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-2 text-[var(--gold)] font-medium">
                      View Collection
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="section-padding bg-gradient-to-b from-[#0a0a0a] to-black mt-12 md:mt-0">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
              Best Selling Products
            </span>
            <h2 className="mb-4 font-luxury text-4xl font-bold text-white md:text-5xl">
              Featured Collection
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Handpicked perfumes from the world&apos;s finest fragrance houses
            </p>
          </div>

          {/* Mobile Carousel - Shows 2 items per slide */}
          <div className="block md:hidden">
            <MobileProductCarousel products={products} />
          </div>

          {/* Desktop Grid - Shows normal grid layout */}
          <div className="hidden md:block">
            <ProductGrid products={products} />
          </div>

          <div className="mt-12 text-center">
            <Link href="/products" className="btn-secondary group">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-black mt-12">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
              Collections
            </span>
            <h2 className="mb-4 font-luxury text-4xl font-bold text-white md:text-5xl">
              Shop by Category
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                href: "/products?category=men",
                title: "Men's Fragrances",
                description: "Bold and sophisticated scents",
                gradient: "from-[var(--gold)]/20 to-[var(--gold)]/5",
              },
              {
                href: "/products?category=women",
                title: "Women's Fragrances",
                description: "Elegant and captivating perfumes",
                gradient: "from-[var(--gold)]/20 to-[var(--gold)]/5",
              },
              {
                href: "/products?category=unisex",
                title: "Unisex Fragrances",
                description: "Versatile scents for everyone",
                gradient: "from-[var(--gold)]/20 to-[var(--gold)]/5",
              },
            ].map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl glass p-8 shadow-soft transition-all hover:shadow-luxury hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 transition-opacity group-hover:opacity-100`}></div>

                <div className="relative z-10">
                  <h3 className="mb-2 font-luxury text-2xl font-bold text-white transition-colors group-hover:text-[var(--gold)]">
                    {category.title}
                  </h3>
                  <p className="mb-4 text-white/70">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[var(--gold)] font-medium">
                    Explore Collection
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gradient-to-b from-[#0a0a0a] to-black">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
              Our Promise
            </span>
            <h2 className="mb-4 font-luxury text-4xl font-bold text-white md:text-5xl">
              Why Choose Flëur d&apos;Or
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: "100% Authentic",
                description: "Genuine perfumes from authorized distributors only",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description: "Quick and secure shipping to your doorstep",
              },
              {
                icon: Sparkles,
                title: "Luxury Quality",
                description: "Premium fragrances that embody victory and success",
              },
              {
                icon: Award,
                title: "Quality Guarantee",
                description: "30-day return policy on all purchases",
              },
            ].map((feature, index) => (
              <div key={index} className="group text-center">
                <div className="mb-6 flex justify-center">
                  <div className="rounded-2xl glass p-6 shadow-soft transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                    <feature.icon className="h-10 w-10 text-[var(--gold)]" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-white/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
