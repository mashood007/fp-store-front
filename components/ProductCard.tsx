import Link from "next/link";
import { Product } from "@/types";
import { ShoppingBag, Heart, Eye, Plus, Minus, Trash2 } from "lucide-react";
import Price from "./Price";
import { useCart } from "@/context/CartContext";
import ProductImageCarousel from "./ProductImageCarousel";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { items, updateQuantity, removeFromCart } = useCart();
  const isOutOfStock = product.availableStock <= 0;

  // Check if product is in cart and get its quantity
  const cartItem = items.find(item => item.product.id === product.id);
  const cartQuantity = cartItem?.quantity || 0;

  return (
    <div className={`group relative overflow-hidden rounded-2xl glass shadow-soft transition-all duration-300 ${isOutOfStock ? 'opacity-60' : 'hover:shadow-luxury hover:-translate-y-1'}`}>
      {/* Product Image */}
      <Link href={`/products/${product.friendlyId}`} className="block">
        <div className="relative">
          <ProductImageCarousel
            images={product.images || []}
            productName={product.name}
            className="group"
          />

          {/* Gradient Overlay on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent ${isOutOfStock ? 'opacity-100' : 'opacity-0 transition-opacity duration-300 group-hover:opacity-100'}`} />

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
              <span className="text-white font-semibold text-lg bg-black/70 px-4 py-2 rounded">
                Out of Stock
              </span>
            </div>
          )}

          {/* Category Badge */}
          {product.category && (
            <div className="absolute left-3 top-3 z-20">
              <span className="rounded-full glass px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--gold)]">
                {product.category}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Quick Action Buttons */}
      <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 z-10">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full glass text-white shadow-md transition-all hover:bg-[var(--gold)] hover:text-black hover:scale-110"
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4" />
        </button>
        <Link
          href={`/products/${product.friendlyId}`}
          className="flex h-10 w-10 items-center justify-center rounded-full glass text-white shadow-md transition-all hover:bg-[var(--gold)] hover:text-black hover:scale-110"
          aria-label="Quick view"
        >
          <Eye className="h-4 w-4" />
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-5 bg-black/40 backdrop-blur-sm">
        <Link href={`/products/${product.friendlyId}`}>
          <h3 className="mb-2 font-semibold text-white line-clamp-1 transition-colors hover:text-[var(--gold)]">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="mb-4 text-sm text-white/70 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price and Cart Controls */}
        <div className="flex items-center justify-between">
          <div>
            <Price
              amount={product.price}
              className="text-xl font-bold text-[var(--gold)]"
              symbolClassName="text-[var(--gold)]"
              symbolSize={20}
            />
            <p className="text-xs text-white/50">Free Shipping</p>
          </div>

          {cartQuantity > 0 ? (
            // Quantity controls when item is in cart
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(product.id, cartQuantity - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 active:scale-95"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="min-w-[2rem] text-center text-sm font-medium text-white">
                {cartQuantity}
              </span>

              <button
                onClick={() => updateQuantity(product.id, cartQuantity + 1)}
                disabled={cartQuantity >= product.availableStock}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-all active:scale-95 ${
                  cartQuantity >= product.availableStock
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-[var(--gold)] text-black hover:bg-[var(--gold)]/90'
                }`}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>

              <button
                onClick={() => removeFromCart(product.id)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20 text-red-400 transition-all hover:bg-red-500/30 active:scale-95"
                aria-label="Remove from cart"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ) : (
            // Add to cart button when item is not in cart
            onAddToCart && (
              <button
                onClick={() => !isOutOfStock && onAddToCart(product)}
                disabled={isOutOfStock}
                className={`flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium shadow-md transition-all active:scale-95 ${
                  isOutOfStock
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'luxury-button text-black hover:gap-3'
                }`}
                aria-label={isOutOfStock ? "Out of stock" : "Add to cart"}
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden sm:inline">{isOutOfStock ? 'Out of Stock' : 'Add'}</span>
              </button>
            )
          )}
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-[var(--gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
    </div>
  );
}
