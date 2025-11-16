"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { getCartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const cartCount = getCartCount();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-80"
          >
            <img 
              src="/logos/logo-new.svg" 
              alt="SS Tech" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {[
              { href: "/", label: "Showcase" },
              { href: "/products", label: "Catalog" },
              { href: "/about", label: "Delivery" },
              { href: "/categories", label: "Rewards" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-6 py-2 text-sm font-medium transition-all rounded-md ${
                  isActive(item.href)
                    ? "bg-[#d4c5b0] text-gray-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Cart */}
          <div className="hidden md:flex items-center">
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 md:hidden">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-900 transition-colors hover:text-gray-700"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="animate-fade-in border-t border-gray-200 py-4 md:hidden">
            <div className="space-y-1">
              {[
                { href: "/", label: "Showcase" },
                { href: "/products", label: "Catalog" },
                { href: "/about", label: "Delivery" },
                { href: "/categories", label: "Rewards" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition-all ${
                    isActive(item.href)
                      ? "bg-[#d4c5b0] text-gray-900"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
