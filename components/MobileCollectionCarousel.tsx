"use client";

import { Collection } from "@/types";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface MobileCollectionCarouselProps {
    collections: Collection[];
}

export default function MobileCollectionCarousel({ collections }: MobileCollectionCarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Group collections into pairs (2 items per slide)
    const groupedCollections: Collection[][] = [];
    for (let i = 0; i < collections.length; i += 2) {
        groupedCollections.push(collections.slice(i, i + 2));
    }

    const totalSlides = groupedCollections.length;

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

    if (collections.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <p className="text-xl text-white/70">No collections found</p>
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
                {groupedCollections.map((group, slideIndex) => (
                    <div
                        key={slideIndex}
                        className="min-w-full snap-start px-2"
                    >
                        <div className="grid grid-cols-2 gap-3">
                            {group.map((collection) => (
                                <Link
                                    key={collection.id}
                                    href={`/products?collection=${collection.id}`}
                                    className="group relative overflow-hidden rounded-xl glass shadow-soft transition-all hover:shadow-luxury hover:-translate-y-1"
                                >
                                    {collection.imageUrl && (
                                        <div className="relative h-40 w-full overflow-hidden">
                                            <Image
                                                src={collection.imageUrl}
                                                alt={collection.name}
                                                fill
                                                className="object-cover transition-transform group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                        </div>
                                    )}

                                    <div className={`relative z-10 p-4 ${!collection.imageUrl ? 'min-h-[160px] flex flex-col justify-center' : 'absolute bottom-0 left-0 right-0'}`}>
                                        <h3 className="mb-1 font-luxury text-lg font-bold text-white transition-colors group-hover:text-[var(--gold)] line-clamp-1">
                                            {collection.name}
                                        </h3>
                                        {collection.description && (
                                            <p className="mb-2 text-sm text-white/70 line-clamp-2">
                                                {collection.description}
                                            </p>
                                        )}
                                        <span className="inline-flex items-center gap-1 text-xs text-[var(--gold)] font-medium">
                                            View Collection
                                            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </div>
                                </Link>
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
                    {groupedCollections.map((_, index) => (
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
