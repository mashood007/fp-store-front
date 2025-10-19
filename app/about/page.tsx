export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 font-luxury text-5xl font-bold text-[var(--gold)]">
            About Flëur d&apos;Or
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="mb-4 font-luxury text-3xl font-bold text-white">
                Our Story
              </h2>
              <p className="mb-4 text-lg text-white/70 leading-relaxed">
                Flëur d&apos;Or was founded with a passion for bringing the finest perfumes 
                and fragrances to discerning customers around the world. We believe that 
                a signature scent is more than just a fragrance—it&apos;s an expression of 
                personality, style, and the sweet taste of victory and success.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                Our carefully curated &quot;Victory Scented&quot; collection embodies the spirit of 
                triumph and achievement. Each fragrance tells a story of success, elegance, 
                and sophistication, celebrating your milestones and accomplishments.
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
                    Your satisfaction is our priority. We offer easy returns and 
                    dedicated customer support.
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
                <p>Email: support@fleurdor.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Hours: Monday - Friday, 9AM - 6PM EST</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
