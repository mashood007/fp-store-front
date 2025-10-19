import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

// Get price as number string without currency symbol for custom formatting
export function formatPriceNumber(price: number): string {
  return new Intl.NumberFormat("en-AE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function getImageUrl(url: string): string {
  if (url.startsWith("http")) {
    return url;
  }
  // Assuming images are served from the admin backend
  return `http://localhost:3000${url}`;
}

