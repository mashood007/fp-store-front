import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Flëur d'Or | Luxury Perfume Brand Story UAE",
  description: "Discover the story behind Flëur d'Or, UAE's premium perfume brand. Learn about our commitment to authentic fragrances, luxury scents, and exceptional customer experience.",
  keywords: [
    "about Fleur d'Or",
    "luxury perfume brand UAE",
    "perfume brand story",
    "authentic fragrances UAE",
    "premium perfume boutique",
    "Fleur d'Or story",
    "luxury perfume UAE",
    "perfume brand Dubai"
  ],
  openGraph: {
    title: "About Flëur d'Or | Luxury Perfume Brand Story UAE",
    description: "Discover the story behind Flëur d'Or, UAE's premium perfume brand. Learn about our commitment to authentic fragrances and luxury scents.",
    url: "https://www.fleurdorparfums.com/about",
    siteName: "Flëur d'Or Perfumes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Flëur d'Or | Luxury Perfume Brand Story UAE",
    description: "Discover the story behind Flëur d'Or, UAE's premium perfume brand.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 font-luxury text-5xl font-bold text-[var(--gold)]">
            About Flëur d&apos;Or
          </h1>

          <div className="space-y-8">
            <section id="story">
              <h2 className="mb-4 font-luxury text-3xl font-bold text-white">
                Our Story
              </h2>
              <p className="mb-4 text-lg text-white/70 leading-relaxed">
                Every great brand begins with a moment of inspiration. For Azizia International, that defining moment came from the heart of its founder and CEO guided by an enduring love for fragrances and the unforgettable memories they evoke.
              </p>
              <p className="mb-4 text-lg text-white/70 leading-relaxed">
                After 18 years of professional experience with Gulf International LLC, one of the UAE&apos;s leading companies, Mohammed Anshid Moosapy was inspired to pursue a path beyond the ordinary, driven by a profound passion to create something uniquely his own.
              </p>
              <p className="mb-4 text-lg text-white/70 leading-relaxed">
                From a young age, he believed that every scent tells a story. A single fragrance can carry emotions, moments and memories that stay with us forever. Guided by this belief, he took a courageous step, leaving behind the familiar to pursue a vision that had been growing quietly within him.
              </p>
              <p className="mb-4 text-lg text-white/70 leading-relaxed">
                A year before launching his company, he immersed himself in the world of perfumery, studying fragrance notes, understanding industry craftsmanship and exploring how luxury scents are brought to life. This deep curiosity soon transformed into purpose.
              </p>
              <p className="mb-4 text-lg text-white/70 leading-relaxed">
                In honour of the two people who shaped his life, he founded Azizia International, named lovingly after his parents, P Abdul Azeez and Shuhaiba Moosapy. With a commitment to creating a luxury, quality-driven perfume brand, he launched the brand&apos;s first signature line, Fleur D&apos;or in {`10/10/2025`}.
              </p>
              <p className="mb-4 text-lg text-white/70 leading-relaxed">
                Fleur D&apos;or meaning &apos;Golden Flower&apos; in French, embodies the timeless beauty of the orange blossom, a fragrance that awakens joy, stirs nostalgia and celebrates life&apos;s most cherished moments.
              </p>
              <p className="mb-4 text-lg text-white/70 leading-relaxed">
                Guided by vision, passion and a commitment to excellence, Mohammed Anshid Moosapy continues to lead with purpose, building a brand that reflects both his creativity and his dedication to making a lasting impact.
              </p>
              <p className="text-lg text-white/70 leading-relaxed font-semibold italic">
                &quot;<span className="text-[var(--gold)]">Rooted in love, inspired by memories and driven by passion</span>&quot; — this is the story of Fleur D&apos;or.
              </p>
            </section>

            <section className="border-t border-[var(--gold)]/20 pt-8">
              <h2 className="mb-4 font-luxury text-3xl font-bold text-white">
                Our Mission
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                We&apos;re committed to providing an exceptional shopping experience by
                offering only authentic, high-quality fragrances that embody victory and
                triumph. Our team of fragrance experts is dedicated to helping you discover
                scents that perfectly match your style and celebrate your achievements.
              </p>
            </section>

            <section className="border-t border-[var(--gold)]/20 pt-8">
              <h2 className="mb-6 font-luxury text-3xl font-bold text-white">
                Why Choose Us
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="glass rounded-xl p-6">
                  <h3 className="mb-2 text-xl font-semibold text-[var(--gold)]">
                    Authenticity Guaranteed
                  </h3>
                  <p className="text-white/70">
                    Every perfume in our collection is 100% authentic and sourced
                    directly from authorized distributors and brands.
                  </p>
                </div>
                <div className="glass rounded-xl p-6">
                  <h3 className="mb-2 text-xl font-semibold text-[var(--gold)]">
                    Expert Curation
                  </h3>
                  <p className="text-white/70">
                    Our team carefully selects each fragrance to ensure we offer
                    only the finest scents for our customers.
                  </p>
                </div>
                <div className="glass rounded-xl p-6">
                  <h3 className="mb-2 text-xl font-semibold text-[var(--gold)]">
                    Fast Shipping
                  </h3>
                  <p className="text-white/70">
                    We offer quick and secure shipping to ensure your perfumes
                    arrive safely and promptly.
                  </p>
                </div>
                <div className="glass rounded-xl p-6">
                  <h3 className="mb-2 text-xl font-semibold text-[var(--gold)]">
                    Customer Satisfaction
                  </h3>
                  <p className="text-white/70">
                    Your satisfaction is our priority.
                  </p>
                </div>
              </div>
            </section>

            <section className="border-t border-[var(--gold)]/20 pt-8">
              <h2 className="mb-4 font-luxury text-3xl font-bold text-white">
                Contact Us
              </h2>
              <p className="mb-4 text-lg text-white/70">
                Have questions or need assistance? We&apos;re here to help!
              </p>
              <div className="space-y-2 text-white/70">
                <p>Email: admin@fleurdor.com</p>
                <p>Phone: +971 56 9298 916</p>
                <p>Hours: Monday - Friday, 9AM - 5PM GST</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
