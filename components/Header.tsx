"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Search, Menu, X, User, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const { getCartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const cartCount = getCartCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--gold)]/20 bg-black/95 backdrop-blur-lg shadow-luxury">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold)] py-2 text-center text-xs text-black font-medium md:text-sm">
        <p>Free Shipping on Orders Over $50 | 30-Day Returns</p>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-all hover:opacity-80"
          >
            <div className="relative h-10 w-10 md:h-12 md:w-12">
              <Image
                src="/logos/logo2.png"
                alt="Flëur d'Or"
                fill
                className="object-contain transition-transform group-hover:scale-110"
              />
            </div>
            <span className="hidden font-luxury text-2xl font-bold text-[var(--gold)] md:inline">
              Flëur d&apos;Or
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Shop" },
              { href: "/categories", label: "Categories" },
              { href: "/about", label: "About" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? "text-[var(--gold)]"
                    : "text-white/80 hover:text-[var(--gold)]"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-[var(--gold)]" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Search & Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search perfumes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 rounded-full border border-[var(--gold)]/30 bg-white/5 py-2 pl-4 pr-10 text-sm text-white transition-all placeholder:text-white/50 focus:w-64 focus:border-[var(--gold)] focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/30 lg:w-64"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-[var(--gold)] transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            {/* Wishlist Icon */}
            <button
              className="relative flex items-center justify-center rounded-full p-2.5 text-white/80 transition-all hover:bg-white/5 hover:text-[var(--gold)]"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </button>

            {/* Account Icon */}
            <button
              className="relative flex items-center justify-center rounded-full p-2.5 text-white/80 transition-all hover:bg-white/5 hover:text-[var(--gold)]"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </button>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center rounded-full bg-[var(--gold)] p-2.5 text-black shadow-md transition-all hover:bg-[var(--gold-light)] hover:shadow-lg hover:scale-105"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-md animate-scale-in">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Cart */}
            <Link href="/cart" className="relative">
              <ShoppingBag className="h-6 w-6 text-[var(--gold)]" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white transition-colors hover:text-[var(--gold)]"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="animate-fade-in border-t border-[var(--gold)]/20 py-4 md:hidden">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search perfumes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-[var(--gold)]/30 bg-white/5 py-2.5 pl-4 pr-10 text-sm text-white transition-all placeholder:text-white/50 focus:border-[var(--gold)] focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/30"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Shop" },
                { href: "/categories", label: "Categories" },
                { href: "/about", label: "About" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition-all ${
                    isActive(item.href)
                      ? "bg-[var(--gold)]/20 text-[var(--gold)]"
                      : "text-white/80 hover:bg-white/5 hover:text-[var(--gold)]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="mt-4 flex gap-3 border-t border-[var(--gold)]/20 pt-4">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--gold)]/30 py-3 text-sm font-medium text-[var(--gold)] transition-all hover:bg-white/5">
                <User className="h-4 w-4" />
                Account
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--gold)]/30 py-3 text-sm font-medium text-[var(--gold)] transition-all hover:bg-white/5">
                <Heart className="h-4 w-4" />
                Wishlist
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
