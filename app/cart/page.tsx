"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Shield, Truck, Package, Tag } from "lucide-react";
import Price from "@/components/Price";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full glass p-12 shadow-luxury">
                <ShoppingBag className="h-20 w-20 text-[var(--gold)]/50" />
              </div>
            </div>
            <h1 className="mb-4 font-luxury text-4xl font-bold text-white">
              Your cart is empty
            </h1>
            <p className="mb-8 text-lg text-white/70">
              Discover our collection of premium perfumes and find your signature scent.
            </p>
            <Link href="/products" className="btn-primary group">
              Start Shopping
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-luxury text-4xl font-bold text-[var(--gold)] md:text-5xl">
              Shopping Cart
            </h1>
            <p className="mt-2 text-white/70">
              {items.length} {items.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <Link href="/products" className="group flex items-center gap-2 text-[var(--gold)] transition-colors hover:text-[var(--gold-light)]">
            <ArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const primaryImage = item.product.images?.[0];
              const imageUrl = primaryImage
                ? getImageUrl(primaryImage.url)
                : "/placeholder.svg";

              return (
                <div
                  key={item.product.id}
                  className="group relative overflow-hidden rounded-2xl glass p-4 shadow-soft transition-all hover:shadow-luxury md:p-6"
                >
                  <div className="flex gap-4 md:gap-6">
                    {/* Product Image */}
                    <Link
                      href={`/products/${item.product.friendlyId}`}
                      className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[var(--gold)]/20 to-black shadow-sm md:h-32 md:w-32"
                    >
                      <Image
                        src={imageUrl}
                        alt={primaryImage?.alt || item.product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="128px"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link
                          href={`/products/${item.product.friendlyId}`}
                          className="block font-semibold text-white transition-colors hover:text-[var(--gold)] md:text-lg"
                        >
                          {item.product.name}
                        </Link>
                        {item.product.category && (
                          <p className="mt-1 text-sm text-white/50">
                            <Tag className="mr-1 inline h-3 w-3" />
                            {item.product.category}
                          </p>
                        )}
                        <div className="mt-2">
                          <Price 
                            amount={item.product.price}
                            className="text-xl font-bold text-[var(--gold)]"
                            symbolClassName="text-[var(--gold)]"
                            symbolSize={20}
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center rounded-xl border-2 border-[var(--gold)]/30 glass shadow-sm">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-3 text-white/70 transition-colors hover:text-[var(--gold)]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-[60px] px-4 py-3 text-center font-semibold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-3 text-white/70 transition-colors hover:text-[var(--gold)]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Subtotal and Remove */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-xs text-white/50">Subtotal</p>
                            <Price 
                              amount={item.product.price * item.quantity}
                              className="text-xl font-bold text-white"
                              symbolClassName="text-white"
                              symbolSize={20}
                            />
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="rounded-full p-2 text-red-500 transition-all hover:bg-red-500/20 hover:text-red-400"
                            aria-label="Remove from cart"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Summary Card */}
              <div className="rounded-2xl glass p-6 shadow-soft">
                <h2 className="mb-6 font-luxury text-2xl font-bold text-white">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotal ({items.length} items)</span>
                    <Price 
                      amount={getCartTotal()}
                      className="font-semibold text-white"
                      symbolClassName="text-white"
                      symbolSize={16}
                    />
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Shipping</span>
                    <span className="font-semibold text-[var(--gold)]">Free</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Tax</span>
                    <span className="font-medium text-white/50">At checkout</span>
                  </div>

                  <div className="border-t-2 border-[var(--gold)]/20 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-white">Total</span>
                      <Price 
                        amount={getCartTotal()}
                        className="text-2xl font-bold text-[var(--gold)]"
                        symbolClassName="text-[var(--gold)]"
                        symbolSize={24}
                      />
                    </div>
                  </div>
                </div>

                <Link href="/checkout" className="btn-primary mt-6 w-full group">
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/products"
                  className="mt-4 block text-center text-sm font-medium text-[var(--gold)] transition-colors hover:text-[var(--gold-light)]"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="rounded-2xl glass p-6 shadow-soft">
                <h3 className="mb-4 font-semibold text-white">Why Shop With Us</h3>
                <div className="space-y-4">
                  {[
                    { icon: Shield, text: "Secure Payment" },
                    { icon: Truck, text: "Free Shipping" },
                    { icon: Package, text: "Easy Returns" },
                  ].map((badge, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full glass shadow-sm">
                        <badge.icon className="h-5 w-5 text-[var(--gold)]" />
                      </div>
                      <span className="text-sm font-medium text-white/70">{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
