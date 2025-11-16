export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 font-luxury text-5xl font-bold text-[var(--accent)]">
            About SS Tech
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="mb-4 font-luxury text-3xl font-bold text-gray-900">
                Our Story
              </h2>
              <p className="mb-4 text-lg text-gray-600 leading-relaxed">
                SS Tech was founded with a passion for bringing innovative home decor solutions 
                to modern homeowners. We believe that great design is more than aesthetics—it&apos;s 
                about creating spaces that enhance your daily life, reflect your personality, 
                and bring joy to every moment at home.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our carefully curated collection of LED mirrors, decorative lights, and home 
                accessories represents the perfect blend of form and function. Each product 
                is selected for its quality, design excellence, and ability to transform 
                ordinary spaces into extraordinary living environments.
              </p>
            </section>

            <section className="border-t border-gray-200 pt-8">
              <h2 className="mb-4 font-luxury text-3xl font-bold text-gray-900">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We&apos;re committed to providing an exceptional shopping experience by 
                offering only premium, high-quality home decor products that enhance modern living. 
                Our team of design enthusiasts is dedicated to helping you discover products 
                that perfectly match your style and elevate your home&apos;s ambiance.
              </p>
            </section>

            <section className="border-t border-gray-200 pt-8">
              <h2 className="mb-6 font-luxury text-3xl font-bold text-gray-900">
                Why Choose Us
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="glass border border-gray-200 rounded-xl p-6 bg-white">
                  <h3 className="mb-2 text-xl font-semibold text-[var(--accent)]">
                    Premium Quality
                  </h3>
                  <p className="text-gray-600">
                    Every product in our collection meets the highest quality standards 
                    and is sourced from trusted manufacturers.
                  </p>
                </div>
                <div className="glass border border-gray-200 rounded-xl p-6 bg-white">
                  <h3 className="mb-2 text-xl font-semibold text-[var(--accent)]">
                    Expert Curation
                  </h3>
                  <p className="text-gray-600">
                    Our design team carefully selects each product to ensure we offer 
                    only the finest home decor solutions.
                  </p>
                </div>
                <div className="glass border border-gray-200 rounded-xl p-6 bg-white">
                  <h3 className="mb-2 text-xl font-semibold text-[var(--accent)]">
                    Fast Delivery
                  </h3>
                  <p className="text-gray-600">
                    We offer quick and secure shipping across UAE to ensure your products 
                    arrive safely and promptly.
                  </p>
                </div>
                <div className="glass border border-gray-200 rounded-xl p-6 bg-white">
                  <h3 className="mb-2 text-xl font-semibold text-[var(--accent)]">
                    Customer Satisfaction
                  </h3>
                  <p className="text-gray-600">
                    Your satisfaction is our priority. We offer easy returns and 
                    dedicated customer support.
                  </p>
                </div>
              </div>
            </section>

            <section className="border-t border-gray-200 pt-8">
              <h2 className="mb-4 font-luxury text-3xl font-bold text-gray-900">
                Contact Us
              </h2>
              <p className="mb-4 text-lg text-gray-600">
                Have questions or need assistance? We&apos;re here to help!
              </p>
              <div className="space-y-2 text-gray-600">
                <p>Email: info@sstech.com</p>
                <p>Phone: +971 (0) 123-4567</p>
                <p>Hours: Sunday - Thursday, 9AM - 6PM GST</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
