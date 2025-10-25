import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--gold)]/20 bg-black">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-12 w-12">
                <Image
                  src="/logos/logo2.png"
                  alt="Flëur d'Or"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-luxury text-2xl font-bold text-[var(--gold)]">
                Flëur d&apos;Or
              </h3>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-white/70">
              Your destination for premium perfumes and luxury fragrances. 
              Discover authentic scents from the world&apos;s finest fragrance houses.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[var(--gold)]" />
                <a href="mailto:info@fleurdor.com" className="hover:text-[var(--gold)] transition-colors">
                  info@fleurdor.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[var(--gold)]" />
                <a href="tel:+1234567890" className="hover:text-[var(--gold)] transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[var(--gold)]" />
                <span>123 Fragrance St, New York, NY</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 font-semibold text-[var(--gold)]">Shop</h4>
            <ul className="space-y-2">
              {[
                { href: "/products", label: "All Products" },
                { href: "/categories", label: "Categories" },
                { href: "/products?category=men", label: "Men's Fragrances" },
                { href: "/products?category=women", label: "Women's Fragrances" },
                { href: "/products?category=unisex", label: "Unisex Fragrances" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-all hover:text-[var(--gold)] hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-4 font-semibold text-[var(--gold)]">Customer Service</h4>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/shipping", label: "Shipping Info" },
                { href: "/returns", label: "Returns" },
                { href: "/faq", label: "FAQ" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-all hover:text-[var(--gold)] hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold text-[var(--gold)]">Legal</h4>
            <ul className="space-y-2">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/cookies", label: "Cookie Policy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-all hover:text-[var(--gold)] hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="mb-3 font-semibold text-[var(--gold)]">Follow Us</h4>
              <div className="flex gap-2">
                {[
                  { Icon: Facebook, href: "#", label: "Facebook" },
                  { Icon: Instagram, href: "#", label: "Instagram" },
                  { Icon: Twitter, href: "#", label: "Twitter" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-[var(--gold)] transition-all hover:bg-[var(--gold)] hover:text-black hover:scale-110"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 border-t border-[var(--gold)]/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-sm text-white/70">
                © {new Date().getFullYear()} Flëur d&apos;Or. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="text-xs text-white/50">We Accept:</span>
              <div className="flex gap-2">
                {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((method) => (
                  <div
                    key={method}
                    className="flex h-8 items-center rounded border border-[var(--gold)]/30 bg-black/50 px-3 text-xs font-medium text-white/70"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
