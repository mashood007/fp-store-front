import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Shield, Truck, Award, Star } from "lucide-react";

export default async function HomePage() {
  const { products } = await getProducts({ limit: 8 });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-luxury">
        <div className="container relative mx-auto px-4 py-20 md:py-32 lg:py-40">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Hero Content */}
            <div className="animate-slide-up text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-2 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-[var(--gold)]" />
                <span className="text-sm font-medium text-[var(--gold)]">Luxury Fragrance Collection</span>
              </div>
              
              <h1 className="mb-6 font-luxury text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                Elevate Your Spirit with
                <span className="block gradient-text">Victory Scented Fragrances</span>
              </h1>
              
              <p className="mb-8 text-lg leading-relaxed text-white/70 md:text-xl">
                Shop now and embrace the sweet smell of victory with Flëur d&apos;Or.
                Discover our curated collection of premium perfumes from around the world.
              </p>
              
              <div className="flex flex-col gap-4 sm:flex-row justify-center lg:justify-start">
                <Link href="/products" className="btn-primary group">
                  Shop Now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/about" className="btn-secondary">
                  Learn More
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />
                    ))}
                  </div>
                  <span className="font-medium">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[var(--gold)]" />
                  <span className="font-medium">100% Authentic</span>
                </div>
              </div>
            </div>

            {/* Hero Image/Visual */}
            <div className="relative hidden lg:block">
              <div className="relative flex items-center justify-center">
                <Image
                  src="/bottle.png"
                  alt="Luxury Perfume Bottle"
                  width={500}
                  height={500}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="section-padding bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="mb-6 font-luxury text-4xl font-bold text-[var(--gold)] md:text-5xl">
              Welcome to Flëur d&apos;Or
            </h2>
            <p className="text-lg leading-relaxed text-white/70">
              Welcome to Flëur d&apos;Or Perfumes, where the spirit of victory and triumph come alive through our curated collection. Aptly named &quot;Victory Scented,&quot; our perfumes are more than just fragrances; they embody the sweet smell and taste of triumph, success, and achievement. At Flëur d&apos;Or, we believe every milestone deserves celebration with a scent that tells the tale of your achievements. Embrace luxury, celebrate victories, and let your fragrance narrate your tale of success!
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-gradient-to-b from-black to-[#0a0a0a]">
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

          <ProductGrid products={products} />

          <div className="mt-12 text-center">
            <Link href="/products" className="btn-secondary group">
              View All Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-black">
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

      {/* Newsletter/CTA Section */}
      <section className="section-padding bg-black">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-luxury text-4xl font-bold text-white md:text-5xl">
              Join Our Fragrance Community
            </h2>
            <p className="mb-8 text-lg text-white/70">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            
            <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-[var(--gold)]/30 bg-black/50 px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/30 backdrop-blur-sm"
              />
              <button type="submit" className="rounded-full bg-[var(--gold)] px-8 py-4 font-medium text-black transition-all hover:bg-[var(--gold-light)] hover:shadow-lg">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
