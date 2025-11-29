"use client";

import { Product } from "@/types";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import Price from "./Price";

interface MobileProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export default function MobileProductCard({ product, onAddToCart }: MobileProductCardProps) {
    const primaryImage = product.images?.[0];
    const imageUrl = primaryImage ? getImageUrl(primaryImage.url) : "/placeholder.svg";

    return (
        <div className="group relative overflow-hidden rounded-xl glass shadow-sm">
            {/* Product Image */}
            <Link href={`/products/${product.friendlyId}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-[var(--gold)]/10 to-black">
                    <Image
                        src={imageUrl}
                        alt={primaryImage?.alt || product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw"
                    />
                </div>
            </Link>

            {/* Product Info - Compact */}
            <div className="p-3 bg-black/40 backdrop-blur-sm">
                <Link href={`/products/${product.friendlyId}`}>
                    <h3 className="mb-1 text-sm font-medium text-white line-clamp-1">
                        {product.name}
                    </h3>
                </Link>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between gap-2">
                    <Price
                        amount={product.price}
                        className="text-sm font-bold text-[var(--gold)]"
                        symbolClassName="text-[var(--gold)]"
                        symbolSize={12}
                    />

                    <button
                        onClick={() => onAddToCart(product)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--gold)] text-black shadow-sm active:scale-95"
                        aria-label="Add to cart"
                    >
                        <ShoppingBag className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
