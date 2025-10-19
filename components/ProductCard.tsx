import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatPrice, getImageUrl } from "@/lib/utils";
import { ShoppingBag, Heart, Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const primaryImage = product.images?.[0];
  const imageUrl = primaryImage ? getImageUrl(primaryImage.url) : "/placeholder.svg";

  return (
    <div className="group relative overflow-hidden rounded-2xl glass shadow-soft transition-all duration-300 hover:shadow-luxury hover:-translate-y-1">
      {/* Product Image */}
      <Link href={`/products/${product.friendlyId}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-[var(--gold)]/10 to-black">
          <Image
            src={imageUrl}
            alt={primaryImage?.alt || product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Category Badge */}
          {product.category && (
            <div className="absolute left-3 top-3">
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

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-[var(--gold)]">
              {formatPrice(product.price)}
            </span>
            <p className="text-xs text-white/50">Free Shipping</p>
          </div>

          {onAddToCart && (
            <button
              onClick={() => onAddToCart(product)}
              className="flex items-center justify-center gap-2 rounded-full luxury-button px-4 py-2.5 text-sm font-medium text-black shadow-md transition-all hover:gap-3 active:scale-95"
              aria-label="Add to cart"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Add</span>
            </button>
          )}
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-[var(--gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
    </div>
  );
}
