"use client";

import { Product } from "@/types";
import MobileProductCard from "./MobileProductCard";
import { useCart } from "@/context/CartContext";

interface MobileProductGridProps {
    products: Product[];
}

export default function MobileProductGrid({ products }: MobileProductGridProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (product: Product) => {
        addToCart(product);
    };

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <p className="text-xl text-white/70">No products found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
                <MobileProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                />
            ))}
        </div>
    );
}
