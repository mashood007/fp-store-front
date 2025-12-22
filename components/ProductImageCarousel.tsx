"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ProductImage } from "@/types";
import { getImageUrl } from "@/lib/utils";

interface ProductImageCarouselProps {
  images: ProductImage[];
  productName: string;
  className?: string;
  aspectRatio?: string;
}

export default function ProductImageCarousel({
  images,
  productName,
  className = "",
  aspectRatio = "aspect-[3/4]"
}: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Auto-run carousel every 3 seconds when not hovering
  useEffect(() => {
    if (images.length <= 1 || isHovering) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isHovering]);

  const handleNext = () => {
    if (isTransitioning) return;
    setSlideDirection('right');
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);

    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setSlideDirection('left');
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);

    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const handleGoToIndex = (index: number) => {
    if (isTransitioning || index === currentIndex) return;

    setSlideDirection(index > currentIndex ? 'right' : 'left');
    setIsTransitioning(true);
    setCurrentIndex(index);

    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // If only one image, just show it without carousel
  if (images.length <= 1) {
    const image = images[0];
    const imageUrl = image ? getImageUrl(image.url) : "/placeholder.svg";

    return (
      <div className={`relative ${aspectRatio} overflow-hidden bg-gradient-to-br from-[var(--gold)]/10 to-black ${className}`}>
        <Image
          src={imageUrl}
          alt={image?.alt || productName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  const currentImage = images[currentIndex];
  const imageUrl = getImageUrl(currentImage.url);

  return (
    <div
      className={`relative ${aspectRatio} overflow-hidden bg-gradient-to-br from-[var(--gold)]/10 to-black ${className} transition-all duration-400 ${
        isHovering ? 'scale-[1.01]' : 'scale-100'
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main Image Container with Slide Animation */}
      <div className="relative w-full h-full">
        <Image
          src={imageUrl}
          alt={currentImage?.alt || productName}
          fill
          className={`object-cover transition-all duration-600 ease-out group-hover:scale-105 ${
            isTransitioning
              ? `${slideDirection === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'} animate-gentle-fade`
              : 'scale-100'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Subtle fade overlay for smooth transitions */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/10 to-transparent transition-opacity duration-400 ${
            isTransitioning ? 'opacity-40' : 'opacity-0'
          }`}
        />
      </div>

      {/* Carousel Indicators with Enhanced Animation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              handleGoToIndex(index);
            }}
            className={`relative transition-all duration-400 ease-out transform ${
              index === currentIndex
                ? "w-6 h-2 bg-[var(--gold)] rounded-full scale-110 shadow-lg shadow-[var(--gold)]/20 animate-indicator-pulse"
                : "w-2 h-2 bg-white/40 hover:bg-white/70 hover:scale-110 rounded-full"
            } ${isTransitioning && index === currentIndex ? 'animate-pulse-glow' : ''}`}
            aria-label={`Go to image ${index + 1}`}
          >
            {/* Active indicator glow effect */}
            {index === currentIndex && (
              <div className="absolute inset-0 bg-[var(--gold)] rounded-full animate-ping opacity-30" />
            )}
          </button>
        ))}
      </div>

      {/* Navigation Arrows with Gentle Animation */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-400 z-10 ${
        isHovering ? 'opacity-100' : 'opacity-0'
      }`}>
        <button
          onClick={(e) => {
            e.preventDefault();
            handlePrev();
          }}
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-300 hover:bg-black/70 hover:scale-105 hover:shadow-md hover:shadow-black/30 ${
            isHovering ? 'translate-x-0 animate-arrow-slide' : '-translate-x-1'
          }`}
          aria-label="Previous image"
        >
          <svg className="w-4 h-4 transition-transform duration-200 hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            handleNext();
          }}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-300 hover:bg-black/70 hover:scale-105 hover:shadow-md hover:shadow-black/30 ${
            isHovering ? 'translate-x-0 animate-arrow-slide' : 'translate-x-1'
          }`}
          aria-label="Next image"
        >
          <svg className="w-4 h-4 transition-transform duration-200 hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Progress Bar with Smooth Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/20 z-10">
        <div
          className="h-full bg-[var(--gold)] transition-all duration-500 ease-out"
          style={{
            width: `${((currentIndex + 1) / images.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
