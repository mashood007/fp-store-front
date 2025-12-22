"use client";

import { Product } from "@/types";
import { ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import Price from "./Price";
import { useCart } from "@/context/CartContext";
import ProductImageCarousel from "./ProductImageCarousel";

interface MobileProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export default function MobileProductCard({ product, onAddToCart }: MobileProductCardProps) {
    const { items, updateQuantity, removeFromCart } = useCart();
    const isOutOfStock = product.availableStock <= 0;

    // Check if product is in cart and get its quantity
    const cartItem = items.find(item => item.product.id === product.id);
    const cartQuantity = cartItem?.quantity || 0;

    return (
        <div className={`group relative overflow-hidden rounded-xl glass shadow-sm ${isOutOfStock ? 'opacity-60' : ''}`}>
            {/* Product Image */}
            <Link href={`/products/${product.friendlyId}`} className="block">
                <div className="relative">
                    <ProductImageCarousel
                        images={product.images || []}
                        productName={product.name}
                        className="group"
                    />

                    {/* Out of Stock Overlay */}
                    {isOutOfStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                            <span className="text-white font-medium text-sm bg-black/70 px-3 py-1 rounded">
                                Out of Stock
                            </span>
                        </div>
                    )}
                </div>
            </Link>

            {/* Product Info - Compact */}
            <div className="p-3 bg-black/40 backdrop-blur-sm">
                <Link href={`/products/${product.friendlyId}`}>
                    <h3 className="mb-1 text-sm font-medium text-white line-clamp-1">
                        {product.name}
                    </h3>
                </Link>

                {/* Price and Cart Controls */}
                <div className="flex items-center justify-between gap-2">
                    <Price
                        amount={product.price}
                        className="text-sm font-bold text-[var(--gold)]"
                        symbolClassName="text-[var(--gold)]"
                        symbolSize={12}
                    />

                    {cartQuantity > 0 ? (
                        // Quantity controls when item is in cart
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => updateQuantity(product.id, cartQuantity - 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white text-xs transition-all hover:bg-white/20 active:scale-95"
                                aria-label="Decrease quantity"
                            >
                                <Minus className="h-3 w-3" />
                            </button>

                            <span className="min-w-[1.5rem] text-center text-xs font-medium text-white">
                                {cartQuantity}
                            </span>

                            <button
                                onClick={() => updateQuantity(product.id, cartQuantity + 1)}
                                disabled={cartQuantity >= product.availableStock}
                                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs transition-all active:scale-95 ${
                                    cartQuantity >= product.availableStock
                                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                        : 'bg-[var(--gold)] text-black'
                                }`}
                                aria-label="Increase quantity"
                            >
                                <Plus className="h-3 w-3" />
                            </button>

                            <button
                                onClick={() => removeFromCart(product.id)}
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20 text-red-400 text-xs transition-all hover:bg-red-500/30 active:scale-95"
                                aria-label="Remove from cart"
                            >
                                <Trash2 className="h-3 w-3" />
                            </button>
                        </div>
                    ) : (
                        // Add to cart button when item is not in cart
                        <button
                            onClick={() => !isOutOfStock && onAddToCart(product)}
                            disabled={isOutOfStock}
                            className={`flex h-8 w-8 items-center justify-center rounded-full shadow-sm active:scale-95 ${
                                isOutOfStock ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-[var(--gold)] text-black'
                            }`}
                            aria-label={isOutOfStock ? "Out of stock" : "Add to cart"}
                        >
                            <ShoppingBag className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
