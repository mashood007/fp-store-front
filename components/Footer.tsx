import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img 
                src="/logos/logo-new.svg" 
                alt="SS Tech" 
                className="h-12 w-auto"
              />
            </div>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">
              Your destination for premium home furniture and modern decor solutions.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@homedecor.com" className="hover:text-gray-900 transition-colors">
                  info@homedecor.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+1234567890" className="hover:text-gray-900 transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Dubai, UAE</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Shop</h4>
            <ul className="space-y-2">
              {[
                { href: "/products", label: "All Products" },
                { href: "/categories", label: "Categories" },
                { href: "/products?category=living-room", label: "Living Room" },
                { href: "/products?category=bedroom", label: "Bedroom" },
                { href: "/products?category=decoration", label: "Decoration" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Customer Service</h4>
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
                    className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Legal</h4>
            <ul className="space-y-2 mb-6">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/cookies", label: "Cookie Policy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">Follow Us</h4>
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
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all hover:bg-gray-900 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} SS Tech. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">We Accept:</span>
              <div className="flex gap-2">
                {["Visa", "Mastercard", "PayPal"].map((method) => (
                  <div
                    key={method}
                    className="flex h-8 items-center rounded border border-gray-300 bg-white px-3 text-xs font-medium text-gray-700"
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
