"use client";

import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import Price from "./Price";

interface MobileProductCarouselProps {
    products: Product[];
}

import MobileProductCard from "./MobileProductCard";

export default function MobileProductCarousel({ products }: MobileProductCarouselProps) {
    const { addToCart } = useCart();
    const [currentSlide, setCurrentSlide] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Group products into pairs (2 items per slide)
    const groupedProducts: Product[][] = [];
    for (let i = 0; i < products.length; i += 2) {
        groupedProducts.push(products.slice(i, i + 2));
    }

    const totalSlides = groupedProducts.length;

    const handleAddToCart = (product: Product) => {
        addToCart(product);
    };

    const scrollToSlide = (slideIndex: number) => {
        if (scrollContainerRef.current) {
            const slideWidth = scrollContainerRef.current.offsetWidth;
            scrollContainerRef.current.scrollTo({
                left: slideWidth * slideIndex,
                behavior: "smooth",
            });
            setCurrentSlide(slideIndex);
        }
    };

    const nextSlide = () => {
        const next = (currentSlide + 1) % totalSlides;
        scrollToSlide(next);
    };

    const prevSlide = () => {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        scrollToSlide(prev);
    };

    // Handle scroll snap
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const slideWidth = container.offsetWidth;
            const newSlide = Math.round(container.scrollLeft / slideWidth);
            setCurrentSlide(newSlide);
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <p className="text-xl text-white/70">No products found</p>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Carousel Container */}
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {groupedProducts.map((group, slideIndex) => (
                    <div
                        key={slideIndex}
                        className="min-w-full snap-start px-2"
                    >
                        <div className="grid grid-cols-2 gap-3">
                            {group.map((product) => (
                                <MobileProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={handleAddToCart}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {totalSlides > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 backdrop-blur-sm text-white p-1.5 rounded-full hover:bg-black/50 transition-all"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 backdrop-blur-sm text-white p-1.5 rounded-full hover:bg-black/50 transition-all"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {totalSlides > 1 && (
                <div className="flex justify-center gap-1.5 mt-4">
                    {groupedProducts.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToSlide(index)}
                            className={`h-1.5 rounded-full transition-all ${currentSlide === index
                                ? "w-6 bg-[var(--gold)]"
                                : "w-1.5 bg-white/20"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
