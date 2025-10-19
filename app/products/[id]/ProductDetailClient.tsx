"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { getImageUrl } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Check, Minus, Plus, Heart, Share2, Shield, Truck, Package, Star } from "lucide-react";
import Link from "next/link";
import Price from "@/components/Price";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-black py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center space-x-2 text-sm">
          <Link href="/" className="text-white/60 transition-colors hover:text-[var(--gold)]">
            Home
          </Link>
          <span className="text-white/40">/</span>
          <Link href="/products" className="text-white/60 transition-colors hover:text-[var(--gold)]">
            Products
          </Link>
          <span className="text-white/40">/</span>
          <span className="font-medium text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--gold)]/20 to-black shadow-soft">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={getImageUrl(product.images[selectedImage].url)}
                  alt={product.images[selectedImage].alt || product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-white/40">
                  <Package className="h-24 w-24" />
                </div>
              )}
              
              {/* Category Badge */}
              {product.category && (
                <div className="absolute left-4 top-4">
                  <span className="rounded-full glass px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[var(--gold)] shadow-md">
                    {product.category}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all hover:scale-105 ${
                      selectedImage === index
                        ? "border-[var(--gold)] shadow-md"
                        : "border-white/20 hover:border-[var(--gold)]/50"
                    }`}
                  >
                    <Image
                      src={getImageUrl(image.url)}
                      alt={image.alt || `${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 12.5vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="mb-3 font-luxury text-4xl font-bold leading-tight text-white md:text-5xl">
                {product.name}
              </h1>
              
              {/* Rating (Mock) */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[var(--gold)] text-[var(--gold)]" />
                  ))}
                </div>
                <span className="text-sm text-white/60">(4.9/5 · 127 reviews)</span>
              </div>

              <div className="flex items-baseline gap-3">
                <Price 
                  amount={product.price}
                  className="text-4xl font-bold text-[var(--gold)]"
                  symbolClassName="text-[var(--gold)]"
                  symbolSize={32}
                />
                <span className="rounded-full glass px-3 py-1 text-sm font-medium text-[var(--gold)]">
                  In Stock
                </span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-y border-[var(--gold)]/20 py-6">
                <h2 className="mb-3 text-lg font-semibold text-white">
                  About This Fragrance
                </h2>
                <p className="leading-relaxed text-white/70">
                  {product.description}
                </p>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-white">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-xl border-2 border-[var(--gold)]/30 glass shadow-sm">
                  <button
                    onClick={decrementQuantity}
                    className="p-4 text-white/70 transition-colors hover:text-[var(--gold)]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="min-w-[80px] px-6 py-4 text-center text-lg font-semibold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="p-4 text-white/70 transition-colors hover:text-[var(--gold)]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className="flex flex-1 items-center justify-center gap-3 rounded-xl luxury-button py-4 text-lg font-semibold text-black shadow-md transition-all disabled:opacity-90"
              >
                {isAdded ? (
                  <>
                    <Check className="h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </button>

              <button className="flex items-center justify-center rounded-xl border-2 border-[var(--gold)]/30 glass p-4 transition-all hover:bg-[var(--gold)] hover:text-black">
                <Heart className="h-6 w-6" />
              </button>

              <button className="flex items-center justify-center rounded-xl border-2 border-[var(--gold)]/30 glass p-4 transition-all hover:bg-[var(--gold)] hover:text-black">
                <Share2 className="h-6 w-6" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 gap-4 rounded-2xl glass p-6 sm:grid-cols-3">
              {[
                { icon: Shield, text: "100% Authentic" },
                { icon: Truck, text: "Free Shipping" },
                { icon: Package, text: "Easy Returns" },
              ].map((badge, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full glass shadow-sm">
                    <badge.icon className="h-6 w-6 text-[var(--gold)]" />
                  </div>
                  <span className="text-sm font-medium text-white">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Product Details */}
            <div className="rounded-2xl glass p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">
                Product Details
              </h2>
              <dl className="space-y-3">
                <div className="flex justify-between border-b border-[var(--gold)]/20 pb-3">
                  <dt className="text-white/60">Product ID</dt>
                  <dd className="font-medium text-white">{product.friendlyId}</dd>
                </div>
                {product.category && (
                  <div className="flex justify-between border-b border-[var(--gold)]/20 pb-3">
                    <dt className="text-white/60">Category</dt>
                    <dd className="font-medium text-white">{product.category}</dd>
                  </div>
                )}
                <div className="flex justify-between border-b border-[var(--gold)]/20 pb-3">
                  <dt className="text-white/60">Availability</dt>
                  <dd className="font-medium text-[var(--gold)]">In Stock</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-white/60">Shipping</dt>
                  <dd className="font-medium text-white">Free (3-5 days)</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
