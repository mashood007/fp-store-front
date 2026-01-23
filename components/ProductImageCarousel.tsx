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
  // Always show only the first image
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
