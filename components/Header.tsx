"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Search, Menu, X, User, Heart, LogOut, Package, Settings, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const { getCartCount } = useCart();
  const { customer, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const cartCount = getCartCount();
  
  const accountDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsAccountDropdownOpen(false);
    router.push("/");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--gold)]/20 bg-black/95 backdrop-blur-lg shadow-luxury">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold)] py-2 text-center text-xs text-black font-medium md:text-sm">
        <p>Free Shipping on Orders Over AED 180 | 30-Day Returns</p>
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
                className="w-48 rounded-full border border-[var(--gold)]/30 bg-black/50 py-2 pl-4 pr-10 text-sm text-white transition-all placeholder:text-white/50 focus:w-64 focus:border-[var(--gold)] focus:bg-black/70 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/30 lg:w-64"
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
              className="relative flex items-center justify-center rounded-full p-2.5 text-white/80 transition-all hover:bg-black/50 hover:text-[var(--gold)]"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </button>

            {/* Account Icon/Dropdown */}
            <div className="relative" ref={accountDropdownRef}>
              {isAuthenticated ? (
                <button
                  onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                  className="relative flex items-center gap-2 rounded-full px-3 py-2 text-white/80 transition-all hover:bg-black/50 hover:text-[var(--gold)]"
                  aria-label="Account menu"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden lg:block text-sm font-medium">
                    {customer?.name?.split(' ')[0] || 'Account'}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isAccountDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="relative flex items-center justify-center rounded-full p-2.5 text-white/80 transition-all hover:bg-black/50 hover:text-[var(--gold)]"
                  aria-label="Login"
                >
                  <User className="h-5 w-5" />
                </Link>
              )}

              {/* Account Dropdown */}
              {isAuthenticated && isAccountDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-lg glass border border-[var(--gold)]/20 shadow-xl z-50">
                  <div className="p-4 border-b border-[var(--gold)]/20">
                    <p className="text-sm font-medium text-white">{customer?.name}</p>
                    <p className="text-xs text-white/60 truncate">{customer?.email}</p>
                  </div>
                  <div className="py-2">
                    <Link
                      href="/account/profile"
                      onClick={() => setIsAccountDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-white/80 hover:bg-black/50 hover:text-[var(--gold)] transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      Profile Settings
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setIsAccountDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-white/80 hover:bg-black/50 hover:text-[var(--gold)] transition-colors"
                    >
                      <Package className="h-4 w-4" />
                      Order History
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-white/80 hover:bg-black/50 hover:text-red-400 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

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
                  className="w-full rounded-full border border-[var(--gold)]/30 bg-black/50 py-2.5 pl-4 pr-10 text-sm text-white transition-all placeholder:text-white/50 focus:border-[var(--gold)] focus:bg-black/70 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/30"
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
                      : "text-white/80 hover:bg-black/50 hover:text-[var(--gold)]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="mt-4 border-t border-[var(--gold)]/20 pt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="mb-3 p-3 rounded-lg bg-black/50 border border-[var(--gold)]/20">
                    <p className="text-sm font-medium text-white">{customer?.name}</p>
                    <p className="text-xs text-white/60 truncate">{customer?.email}</p>
                  </div>
                  <Link
                    href="/account/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white/80 hover:bg-black/50 hover:text-[var(--gold)] transition-all"
                  >
                    <Settings className="h-4 w-4" />
                    Profile Settings
                  </Link>
                  <Link
                    href="/account/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white/80 hover:bg-black/50 hover:text-[var(--gold)] transition-all"
                  >
                    <Package className="h-4 w-4" />
                    Order History
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white/80 hover:bg-black/50 hover:text-red-400 transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                  <button className="flex w-full items-center justify-center gap-2 rounded-full border border-[var(--gold)]/30 py-3 text-sm font-medium text-[var(--gold)] transition-all hover:bg-black/50 mt-4">
                    <Heart className="h-4 w-4" />
                    Wishlist
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] py-3 text-sm font-medium text-black transition-all hover:bg-[var(--gold-light)]"
                  >
                    <User className="h-4 w-4" />
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full border border-[var(--gold)]/30 py-3 text-sm font-medium text-[var(--gold)] transition-all hover:bg-black/50"
                  >
                    Create Account
                  </Link>
                  <button className="flex w-full items-center justify-center gap-2 rounded-full border border-[var(--gold)]/30 py-3 text-sm font-medium text-[var(--gold)] transition-all hover:bg-black/50">
                    <Heart className="h-4 w-4" />
                    Wishlist
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
