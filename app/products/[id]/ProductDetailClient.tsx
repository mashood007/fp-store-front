"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { getImageUrl } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Check, Minus, Plus, Heart, Share2, Shield, Truck, Package, Star, Ruler, Info, Tag, CheckCircle } from "lucide-react";
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
  const isOutOfStock = product.availableStock <= 0;

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
            <div className="group relative aspect-[2/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--gold)]/20 to-black shadow-soft">
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
                    className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all hover:scale-105 ${selectedImage === index
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
            {product.description}
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
                <div>
                  {product.originalPrice && (
                    <div className="mb-2">
                      <Price
                        amount={product.originalPrice}
                        className="text-2xl font-medium text-gray-400 line-through"
                        symbolClassName="text-gray-400"
                        symbolSize={20}
                      />
                    </div>
                  )}
                  <Price
                    amount={product.price}
                    className="text-4xl font-bold text-[var(--gold)]"
                    symbolClassName="text-[var(--gold)]"
                    symbolSize={32}
                  />
                </div>
                <span className={`rounded-full glass px-3 py-1 text-sm font-medium ${isOutOfStock ? 'text-red-400 bg-red-900/20' : 'text-[var(--gold)]'
                  }`}>
                  {isOutOfStock ? 'Out of Stock' : 'In Stock'}
                </span>
              </div>
            </div>

            {/* Description */}
            {product.notes && (
              <div className="border-y border-[var(--gold)]/20 py-6">
                <p className="leading-relaxed text-white/70">
                {product.notes}
                </p>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-white">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className={`flex items-center rounded-xl glass shadow-sm border-2 ${isOutOfStock ? 'border-gray-600' : 'border-[var(--gold)]/30'
                  }`}>
                  <button
                    onClick={isOutOfStock ? undefined : decrementQuantity}
                    disabled={isOutOfStock}
                    className={`p-4 transition-colors ${isOutOfStock
                        ? 'text-gray-500 cursor-not-allowed'
                        : 'text-white/70 hover:text-[var(--gold)]'
                      }`}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className={`min-w-[80px] px-6 py-4 text-center text-lg font-semibold ${isOutOfStock ? 'text-gray-500' : 'text-white'
                    }`}>
                    {quantity}
                  </span>
                  <button
                    onClick={isOutOfStock ? undefined : incrementQuantity}
                    disabled={isOutOfStock}
                    className={`p-4 transition-colors ${isOutOfStock
                        ? 'text-gray-500 cursor-not-allowed'
                        : 'text-white/70 hover:text-[var(--gold)]'
                      }`}
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
                onClick={isOutOfStock ? undefined : handleAddToCart}
                disabled={isAdded || isOutOfStock}
                className={`flex flex-1 items-center justify-center gap-3 rounded-xl py-4 text-lg font-semibold shadow-md transition-all ${isOutOfStock
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'luxury-button text-black disabled:opacity-90'
                  }`}
              >
                {isOutOfStock ? (
                  <>
                    <ShoppingBag className="h-5 w-5" />
                    Out of Stock
                  </>
                ) : isAdded ? (
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
            <div className="rounded-2xl glass p-6 border border-[var(--gold)]/20 shadow-luxury">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {product.category && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-black/30 border border-[var(--gold)]/10 hover:border-[var(--gold)]/30 transition-all">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--gold)]/20">
                      <Tag className="h-5 w-5 text-[var(--gold)]" />
                    </div>
                    <div className="flex-1">
                      <dt className="text-xs text-white/60 uppercase tracking-wider mb-1">Category</dt>
                      <dd className="font-semibold text-white capitalize">{product.category}</dd>
                    </div>
                  </div>
                )}

                {product.size && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-black/30 border border-[var(--gold)]/10 hover:border-[var(--gold)]/30 transition-all">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--gold)]/20">
                      <Ruler className="h-5 w-5 text-[var(--gold)]" />
                    </div>
                    <div className="flex-1">
                      <dt className="text-xs text-white/60 uppercase tracking-wider mb-1">Size</dt>
                      <dd className="font-semibold text-white">{product.size}</dd>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-4 rounded-xl bg-black/30 border border-[var(--gold)]/10 hover:border-[var(--gold)]/30 transition-all">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isOutOfStock ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                    <CheckCircle className={`h-5 w-5 ${isOutOfStock ? 'text-red-400' : 'text-green-400'}`} />
                  </div>
                  <div className="flex-1">
                    <dt className="text-xs text-white/60 uppercase tracking-wider mb-1">Availability</dt>
                    <dd className={`font-semibold ${isOutOfStock ? 'text-red-400' : 'text-green-400'}`}>
                      {isOutOfStock ? 'Out of Stock' : 'In Stock'}
                    </dd>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-black/30 border border-[var(--gold)]/10 hover:border-[var(--gold)]/30 transition-all">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--gold)]/20">
                    <Truck className="h-5 w-5 text-[var(--gold)]" />
                  </div>
                  <div className="flex-1">
                    <dt className="text-xs text-white/60 uppercase tracking-wider mb-1">Shipping</dt>
                    <dd className="font-semibold text-white">Free (3-5 days)</dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
