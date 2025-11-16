import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { getImageUrl } from "@/lib/utils";
import { ShoppingBag, Heart, Eye } from "lucide-react";
import Price from "./Price";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const primaryImage = product.images?.[0];
  const imageUrl = primaryImage ? getImageUrl(primaryImage.url) : "/placeholder.svg";

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 transition-all duration-300 hover:shadow-lg bg-white">
      {/* Product Image */}
      <Link href={`/products/${product.friendlyId}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5]">
          <Image
            src={imageUrl}
            alt={primaryImage?.alt || product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Category Badge */}
          {product.category && (
            <div className="absolute left-3 top-3">
              <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase text-gray-900">
                {product.category}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Quick Action Buttons */}
      <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 z-10">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-900 shadow-md transition-all hover:bg-gray-900 hover:text-white"
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4" />
        </button>
        <Link
          href={`/products/${product.friendlyId}`}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-900 shadow-md transition-all hover:bg-gray-900 hover:text-white"
          aria-label="Quick view"
        >
          <Eye className="h-4 w-4" />
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-5 bg-white">
        <Link href={`/products/${product.friendlyId}`}>
          <h3 className="mb-2 font-semibold text-gray-900 line-clamp-1 transition-colors hover:text-gray-700">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="mb-4 text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <Price 
              amount={product.price}
              className="text-xl font-bold text-gray-900"
              symbolClassName="text-gray-900"
              symbolSize={20}
            />
            <p className="text-xs text-gray-500">Free Shipping</p>
          </div>

          {onAddToCart && (
            <button
              onClick={() => onAddToCart(product)}
              className="flex items-center justify-center gap-2 rounded-full bg-black hover:bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition-all active:scale-95"
              aria-label="Add to cart"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
